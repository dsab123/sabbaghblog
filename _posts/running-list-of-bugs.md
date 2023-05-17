---
title: Running List of Bugs I've Created and/or Squashed
description: If you feel bad about a production bug you've created, don't worry.
date: '2022-10-11'
modified_date: '2022-10-11'
image: /assets/images/posts/bug.jpeg
tags: 'Typescript, bugs'
---

![This bug is hiding in plain sight, unlike most bugs](/assets/images/posts/bug.jpeg)
_Thanks to Zachary Kyra-Derksen for making this [photo](https://unsplash.com/photos/qOt9-QPYmSA) available freely on [unsplash](www.unsplash.com) 🎁_

If you feel bad about a production bug you've created, don't worry. I have too. Here is a running list of bugs I've created and/or squashed. 

---
## 🐛 Got too into ES6, forgot production app did not have Babel
[x] Created and/or [ ] Squashed

_c. 2016_

I was getting really into ES6 soon after it came out, watching tutorials and doing exercises online too (RIP CodeSchool). The Senór dev on the team (for I was a humble non-Senór at the time) went on a two-week vacation, so it meant that it was my turn to push the deploy button. I was excited to press 'deploy' and saw the opportunity to prove myself to the upper managers. Well, soon after the deploy we started getting phone calls from our users, who are mostly older guys and mostly used Internet Explorer. I maintained that it was their fault and that I did nothing wrong with valiant effort, but was ordered to rollback the deploy anyway. The rollback immediately fixed the issue. I did not impress the upper managers.

When Senór Dev came back he found the issue in about two seconds - I used an arrow function. Our app did not support ES6 transpilation yet. Darn.

_Lessons Learned_ : 

• 👉 Multiple browsers are a good idea when testing. If we had tested in more than the two most recent versions of Chrome, we would have caught the issue. We pulled [BrowserStack](https://www.browserstack.com/) into our QA pipeline after that.

• 👉 Do not deploy when Senór is not there

---
## 🐛 Copied environment from server to local, silent `NODE_ENV='production'` killed my dev deps

[x] Created and/or [ ] Squashed

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

[ ] Created and/or [x] Squashed

One of our apps at work is a dashboard that has different roles. We reserve a super admin role for us to go in and do admin-level things. There are two other, (regular) admin and reader roles. Turns out we stored that user role in local storage. Oof.

Well, the hack goes that if you are a regular admin, and know what the role name is for the super admin, you can just change the role name in local storage, refresh the page, and all the super admin bells and whistles are yours!

It was not trivial to store this information in a more secure manner. The dashboard is pretty lightweight and did not use cookies, so I didn't want to introduce them for this. I thought about trying to correct the role name and id if I detected that it changed, but that seemed to require too much checkwork.

The fix I decided on was pretty simple - md5-hash the role name and id, and add _that_ to localstorage. The next time the role is checked, in a method named `getUserInfo()`, it compares the existing (potentially hacked) role name and id to the hash. If they are not the same, the user is immediately logged out. The angular router makes logging out programmatically a cinch.

_Lessons Learned_ :

• 👉 don't store sensitive information in localstorage!

