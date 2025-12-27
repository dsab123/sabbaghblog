---
title: Running List of Bugs I've Created and/or Squashed
description: If you feel bad about a production bug you've created, don't worry.
date: '2022-10-11'
modified_date: '2025-12-23'
image: /assets/images/posts/bug.jpeg
tags: 'bugs'
---

![This bug is hiding in plain sight, unlike most bugs](/assets/images/posts/bug.jpeg)
_Thanks to Zachary Kyra-Derksen for making this [photo](https://unsplash.com/photos/qOt9-QPYmSA) available freely on [unsplash](www.unsplash.com) 🎁_

If you feel bad about a production bug you've created, don't worry. I have too. Here is a running list of bugs I've created and/or squashed. 

---
## 🐛 Got too into ES6, forgot production app did not have Babel

### ❌ Created

_c. 2016_

I was getting really into ES6 soon after it came out, watching tutorials and doing exercises online too (RIP CodeSchool). The Senór dev on the team (for I was a humble non-Senór at the time) went on a two-week vacation, so it meant that it was my turn to push the deploy button. I was excited to press 'deploy' and saw the opportunity to prove myself to the upper managers. Well, soon after the deploy we started getting phone calls from our users, who are mostly older guys and mostly used Internet Explorer. I maintained that it was their fault and that I did nothing wrong with valiant effort, but was ordered to rollback the deploy anyway. The rollback immediately fixed the issue. I did not impress the upper managers.

When Senór Dev came back he found the issue in about two seconds - I used an arrow function. Our app did not support ES6 transpilation yet. Darn.

_Lessons Learned_ : 

• 👉 Multiple browsers are a good idea when testing. If we had tested in more than the two most recent versions of Chrome, we would have caught the issue. We pulled [BrowserStack](https://www.browserstack.com/) into our QA pipeline after that.

• 👉 Do not deploy when Senór is not there

---
## 🐛 Copied environment from server to local, silent `NODE_ENV='production'` killed my dev dependenciess

### ❌ Created

_c. 2022_

I mostly work alone these days. And when you're a team lead of a team of one, I feel that you're authorized to take certain 'shortcuts'. Sometimes I commit directly to the master branch. Well, one of the shortcuts went too far. And it was born _while_ debugging.


I had to connect my local machine to our server's Azure subscription to debug an issue. To do this I copied the server's `systemd` config file (for the whole app ran on a VM) into my local to get all the environment variables - connection strings, guids, etc. Well, I inadvertently copied the following line:


```bash
NODE_ENV=production
```

So I was setting NODE_ENV on my local to `production` . Ouch!


I'm sure this caused me a whole bunch of issues, like "why is this if statement not evaluating correctly", but the cake goes to `npm run build`, which in production deletes all of your `devDependencies` ([npm docs for reference](https://docs.npmjs.com/cli/v8/commands/npm-install)) . This was rough for my typescript insecurities because all of the `@types`  packages are, you guessed it, in `devDependencies`. So when I'd run a build I'd get eslint errors about a standard configuration not being defined. I didn't know what to do except to blow the whole root of the repo away and pull it again. Two months this went on.


_Lessons Learned_ :

• 👉 BE CAREFUL when copying config options from server to local; ask yourself, "is this necessary?" In my case it was, but I copied them mindlessly.

• 👉 You can `export NODE_ENV=production`  to your friend at work for hilarious results, especially if you're using Typescript!


---
## 🐛 Discovered we set user role in local storage, no guard against changing it via devtools

### ✅ Squashed

_c. 2023_

One of our apps at work is a dashboard that has different roles. We reserve a super admin role for us to go in and do admin-level things. There are two other, (regular) admin and reader roles. Turns out we stored that user role in local storage. Oof.

Well, the hack goes that if you are a regular admin, and know what the role name is for the super admin, you can just change the role name in local storage, refresh the page, and all the super admin bells and whistles are yours!

It was not trivial to store this information in a more secure manner. The dashboard is pretty lightweight and did not use cookies, so I didn't want to introduce them for this. I thought about trying to correct the role name and id if I detected that it changed, but that seemed to require too much checkwork.

The fix I decided on was pretty simple - md5-hash the role name and id, and add _that_ to localstorage. The next time the role is checked, in a method named `getUserInfo()`, it compares the existing (potentially hacked) role name and id to the hash. If they are not the same, the user is immediately logged out. The angular router makes logging out programmatically a cinch.

_Lessons Learned_ :

• 👉 don't store sensitive information in localstorage!


---
## 🐛 Initialized array that populated a `mat-select` as type `never[]`

### ✅ Squashed

_c. 2024_

To be honest here, I am not sure what was going on with this one. The root of the problem was an implicit type declaration that looked like an array initialization.

Here was the offending code:

```ts
export interface ProviderCredentials {
  providerId: string
  supported: CredentialTypes[]
}

nullProvider = { 
  providerId: '', 
  supported: [] 
}

selectedProviderCredentials: ProviderCredentials = this.nullProvider;
```

`ProviderCredentials` is defined in another place:

```ts
export enum CredentialTypes {
  Tuple,
  Certificate,
  Instance,
  UserConfig
}

export interface ProviderCredentials {
  providerId: string
  supported: CredentialTypes[]
}
```

<br />

The `selectedProviderCredentials` was populated from a fetch call at the beginning of the component' lifecycle. Up to that point it was supposed to be empty, hence it was initialized with the `nullProvider`. And the `supported` array populated the options in a `mat-select`.

<br />

If you're conscientous you'll notice that `nullProvider` is _not_ defined as a `ProviderCredentials`, even though in the next line it is set equal to an instance of one. In fact, it is defined as its own type, with `supported` not as a `CredentialTypes[]`, but as a `never[]`.

<br />

For some reason, since the `mat-select` is populated as a `never[]`, its `@ViewChild` correspondent is always undefined. Hence, when the data comes in, the mat-select's value is not set.

<br />

I asked ChatGPT to explain what `never[]` is used for:

> Yes, if TypeScript is inferring the type of the supported array in your nullProvider object as never[], this can indeed be a code smell. The never type in TypeScript is used for values that never occur. When TypeScript infers an array as never[], it generally means that it doesn't expect the array to be used with any values at all—effectively, the array should always remain empty.

<br />

Turns out all we had to do was initialize the `nullProvider` as an implementation of the interface, along with a default value:

```ts
nullProvider: ProviderCredentials = {
  providerId: '',
  supported: [CredentialTypes.Instance]
}
```

<br />

Apart from the accidental `never[]`, I can understand the desire to initialize things with empty or null values. But in most cases, the call to hydrate the UI component will return quickly enough that a reasonable default, especially of an enum value which by nature details the acceptable values of a thing, is just fine.

<br />

We could have a conversation about whether `CredentialType` shouldn't be an enum, but that question would open up cans of refactoring I don't have the time for..


There's some typescript voodoo here that I'm not understanding fully, but this fixed up our issue.

<br />

_Lessons Learned_ :

• 👉 Remember the difference between initialization and property declaration!

• 👉 If you're going to use types, use types _everywhere_. Failure to do so will fork things up.

• 👉 It's important to remember to reasonable defaults for things; dummy values might work better than empty arrays, at least in the non-React case.


---
## 🐛 Seeded local dev container with config database records as System Properties

### ❌ Created

_c. 12/2025_

#### Situation
As tech lead I developed a mostly-helpful mechanism to run an application on top of our infrastructure offering by containerizing it. I had to mangle with a few configs to get it working. The configuration for the app is homegrown and uses a defaults file (literally a file) bundled in the artifact to seed the environment with necessary configs, with which the app could reach out to an external database for more configs. 

I could not figure out why the app couldn't read the file when it was running in a container versus in a non-containerized environment, so I did the next best (worst?) thing - in the bootstrap for the container I pulled the whole configuration database into the environment and seeded the java app with all the configs as system properties:

```
JAVA_OPTS=$(aws dynamodb scan --table-name "$CONFIGURATION_TABLE" \
  --output json | \
  jq -r '.Items[] | "-D" + .parameter_name.S + "=\"" + .parameter_value.S + "\"" ' | \
  tr '\n' ' ')
```

#### Action
I was working on a fun new feature that required some new configs. It seemed to work the first time I got an MVP of it running on my local, but then the caching staled, even after refreshing the cache. 

I was slammed for a whole day on this. I had a feeling it would work on the deployed (non-containerized) environment on the cloud, but needed to know why it was broken on my local. I used OpenAI's Codex to print out the identity hash of the Configuration object instance in two places, but that was not it - the same hash for both when the configs are pulled and when they're retrieved.

Then I saw it - the Configuration's tiered retrieval paths (which I already knew existed, I'd just forgotten it):

```
1. get config from system property // (-Dconfig=value), if present
2. get config from cache           // this is where I thought I was getting the config from
3. ...                             // not relevant
4. ... 
```

#### Result
A footgun for which I have only myself to blame!

Removing the records from the database before running my script to seed the artifact with config fixed this.