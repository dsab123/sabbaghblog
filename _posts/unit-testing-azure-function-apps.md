---
title: Unit Test Azure Function Apps with Handwritten Mocks
description: Unit testing function apps is hard, but not anymore!
date: '2023-05-27'
modified_date: '2023-05-27'
image: /assets/images/posts/mimicry.jpeg
tags: 'azure, unit testing, handwritten, function, jest'
---

![Mimicry](/assets/images/posts/mimicry.jpeg)
_Thanks to Worachat Sosdri for making this [photo](https://unsplash.com/photos/nCz_ZgnbtaE) available freely on [unsplash](www.unsplash.com) 🎁_

<br />

I wrote previously about [setting up jest with typescript on an express backend](). Recently, I retrofitted one of our long-running, not-often-touched function apps with some sweet unit tests. 

The app is a typescript function, triggered off of an Azure Storage Queue, and simply processes and upserts an array of [Operation](https://learn.microsoft.com/en-us/javascript/api/@azure/cosmos/operation?view=azure-node-latest) records to Cosmos.

<br />

The approach was pretty simple, consisting of three pieces:
- doing some light refactoring of the app code for testability (and readibilty),
- using a pretty sweet npm helper package to configure the function app's runtime, and
- delving into Cosmos's type definitions and stitching together a handwritten mock.

<br />

My hope for this post is two-fold: 
- to give you a template for handwriting mocks, when you need to, and
- to expose you to the `stub-azure-function-context` npm package for unit testing Azure Function Apps.

-----------------------
## Some Light Refactoring 🚧

I won't go into depth on the refactor since it was pretty straightforward. 

The single exported function's pseudocode looked like:

```js
const ingestThings = (Thing[]) => {
  // dedupe and group all the thing items

  // iterate through groupedThings, creating either a PATCH or POST for each
}
```
<br />

The obvious thing was to break these up into two functions:

<br />

```js

const dedupeAndGroup();

const ingestThings = (Thing[]) => {
  const groupedThings = dedupeAndGroup();

  // iterate through groupedThings, creating either a PATCH or POST for each
}
```

<br />

This allowed me to test both `dedupeAndGroup` and `ingestThings` independently. 

If you're working with a function app that processes arrays you might have a similar optimization to make, if you haven't done so already.

-----------------------
## Mocking Cosmos 🪐

`@azure/cosmos` exposes a [Container]() class through which you interact with, well, a Cosmos container.

If you remember your Cosmos NoSQL hierarchy, you'll recall that the container is inside a database - the database handle you retrieve by instantiating a `CosmosClient`[www.cosmos.com]. This requires several chained calls, which look like this:

```js
import { Container, CosmosClient, Database } from "@azure/cosmos"

const thingsContainer = new CosmosClient({
  endpoint: endpoint, 
  key: key
})
.database(databaseName)
.container(thingsContainerName);
```

<br />

If we want to unit test our `ingestThings`, we'll need to mock out this cosmos container so that a) we're not reaching out to an actual database in our unit test, and b) so that we can assert against it in our test. 

<br />

_I chose to mock and not stub, the difference being that you don't assert against stubs (at least for die-hard [TAOUT](https://www.artofunittesting.com/) followers). And in Jest, you can spy on mocks._


<br />

In order to mock the container, in our app code we wrapped the nested calls above into a helper method, `getThingsContainer`. And in our unit test, we used Jest's `mockReturnValue` as the seam through which to insert our handwritten mock.

<br />

```js
// we needed to import all the named exports here so that we can provide an object to jest's spyOn function.
import * as cosmosHelperLib from '../shared/cosmos';

...

jest.spyOn(cosmosHelperLib, 'getThingsContainer').mockReturnValue(({
  // handwritten mock goes here; we need to return a Container-shaped mock
}))
```

_Thanks to [this blog post from Chak Shun Yu](https://www.chakshunyu.com/blog/how-to-spy-on-a-named-import-in-jest/) for the glob import hint, by the way._

<br />

What does this `Container` class look like? We can look at the type definitions in `@azure/cosmos` to discern the shape to which it needs to conform. The whole class is pretty large, so we'll restrict our mock to include just the properties and methods that our code touches.

<br />

Our app code makes these method calls on `Container`:

```js

await container.item(thing.id, thing.id).read<Thing>()

...

await container.items.bulk(cosmosOperations, { continueOnError: true });

```

<br />

In the Container definition we see the method signatures:

<br />

```js
// cosmos.d.ts in @azure/cosmos

export declare class Container {
  readonly items: Items;

  ...

  items(): Items;

  ...

  item(id: string, partitionKeyValue?: PartitionKey): Item;

}

```

<br />

Both of these return yet other nested classes, `Item` and `Items`, so our mock will need to handle those too. The type definitions for those two classes are below (again, only looking at the relevant portions for our app code):

<br />

```js

export declare class Item {

  read<T extends ItemDefinition = any>(options?: RequestOptions): Promise<ItemResponse<T>>;

}

...

export declare class Items {

  bulk(operations: OperationInput[], bulkOptions?: BulkOptions, options?: RequestOptions): Promise<OperationResponse[]>

}

```

<br />

Now we can realize the structure of our handwritten mock:

<br />

```js

jest.spyOn(sharedCosmosLib, 'getThingsContainer').mockReturnValue(({
  item: (id: string, partitionKey: string) => {
    return {
      read: () => {
        return {};
      }
    }
  },
  items: {
    bulk: (operations: any[], bulkOptions: any) => {
      return [];
    }
  }
} as unknown) as Container);

```

<br />

You'll notice that this mock is only returning an empty object and array. What it returns will depend on your app code and how you want to test your function.

<br />

For my purposes, I want to ensure that the methods I've mocked (`container.item.read` and `container.items.bulk`) are called with certain arguments. Jest has a matcher just for that, <a href="https://jestjs.io/docs/expect#tohavebeencalledwitharg1-arg2-" target="_blank">`expect().toHaveBeenCalledWith`</a>. I plan to assert against the `items.bulk` method of our handwritten mock.

<br />

But that's beyond the scope of this post, so I'll save it for later.


-----------------------

## NPM Sweetness 🍫

To run the function app as it'll be run in Azure, we need to stub in a Function Context. This npm package creates the context for you - <a href="https://t.co/7fyUzSSFzy" target="_blank">stub-azure-function-context</a>.

Here's a sample use case for setting up the context for a Queue binding:

<br />


```js
await functionRunner(
  functionName,
  [{
    name: 'queueTriggerBinding',
    direction: 'in',
    type: 'queueTrigger'
  }],
  {
    queueTrigerBinding: QueueBinding.createFromMessageText(anything),
  }
);

```

<br />

If you're using the Arrange-Act-Assert pattern in your tests (you should be), this would be the Act step, as `functionRunner` runs the function. After which you can assert as you usually would.

<br />

That's it. Hope this was helpful!