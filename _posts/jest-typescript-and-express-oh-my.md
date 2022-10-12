---
title: Typescript, Jest and Express - Oh my!
description: One small problem - no unit tests
date: '2022-07-15'
modified_date: '2022-07-15'
image: /assets/images/posts/joker.png
tags: 'typescript, jest, unit testing'
---

![Jest is fun but also somewhat terrifying](/assets/images/posts/joker.png)
_Thanks to Hello I'm Nik for making this [photo](https://unsplash.com/photos/Uk5lAaYfF7w) available freely on [unsplash](www.unsplash.com) 🎁_

So we have an app at work that uses express on the backend. Works pretty well, does the job. But one small problem - no unit tests.

![Time to get to work](https://media0.giphy.com/media/llKJGxQ1ESmac/giphy.gif?cid=6104955euxgwdbz5mdhaplp4cpv5b2pgxrq8zt5x5du50da3&rid=giphy.gif&ct=g)

I grit my teeth in preparation, knowing that setting up jest with typescript is a pain. But somebody's gotta do it. So I'm documenting this for future iterations of myself.

I'm using Jest here because mocking is great fun and really easy, and the termianl output is color-coded and doesn't require me to open up some late-2010's html.

## `@node/types`  beware

One hiccup that took me a while to resolve was that I implicitly (unintentionally, accidentally?) upped the `@node/types` npm package from `16.xx` to `18.xx` , which had the immediate effect of deleting my `node_modules/@types` directory. This feat was performed with such clandestine machination that no npm command I knew could restore those packages. I ended up deleting my local copy and pulling the repo again.

We're using node 16 in the project so maybe the node versions have to correlate with the node types versions? I don't know, but didn't stick around to ask.

## Types and Jest

Jest does not come out-of-the-box with type definitions, so we have to install `@types/jest`  separately. We'll also install `ts-jest`, which [transforms](https://jestjs.io/docs/next/code-transformation#writing-custom-transformers) our typescript-written tests into javascript for Jest to understand. 

Jest can be configured with either a `jest.config.ts/js` or inside of `package.json`. I use the latter and   mine looks like this:

```json
// ...
// other package.json things
// ...
"jest": {
    "preset": "ts-jest",
    "verbose": true, 
    "collectCoverage": true,
    "coverageReporters": [
      "json",
      "text"
    ],
    "globals": {
      "ts-jest": {
        "tsconfig": "tsconfig.test.json"
      }
    }
}
```

The `collectCoverage` and `coverageReporters` tags are for nice charts on our build server, on which I may do a separate post later.

Note that `ts-jest` can be configured with its own `tsconfig`, not the default one that's sitting in your project. Which was a necessity for my project. I could not manage to run tests and the app code via the same tsconfig. The crux of the issue from my understanding is that two tags in the `tsconfig`, namely `types` and `typeRoots`, cannot both be used. Or at least, I could not get them to work properly together. 

Here's the tsconfig.test.json:
```json
{
  "extends": "",
  "compilerOptions": {
    "typeRoots": [
      "./types",
      "./node_modules/@types"
    ],
    "types": ["jest"],
    "esModuleInterop": true
  }
}
```

Here's the [tsconfig documentation for Typescript](https://www.typescriptlang.org/tsconfig#typeRoots) that deals with these two properties.

Even if there _is_ a way to get the two to play nicely in the same file, in doing so I'd be compiling `jest` types into our bundled app, which I don't want in any case.

Well, with that wrinkle ironed out (or at least ironed over) the last step is to get our test scripts written. Here are mine:

```json
"scripts": {
    "test": "npx jest'",
    "test:watch": "npx jest --watch"
}
```

Voila! You can run a `npm run test` or `npm run test:watch` and you should see your tests run with success.

Here's the output of running the tests:

![Jest wee](/assets/images/posts/jest-output.png)

I'll add another post sometime with how I used Jest to mock out a database and some RxJS Observables to test our interface to Cosmos DB.