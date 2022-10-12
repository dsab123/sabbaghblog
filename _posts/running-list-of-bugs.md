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
## 🐛 - Got too into ES6, forgot production app did not have Babel
- [x] Created and/or 
- [ ] Squashed

_c. 2016_

I was getting really into ES6 soon after it came out, watching tutorials and doing exercises online too (RIP CodeSchool). The Senór dev on the team (for I was a humble non-Senór at the time) went on a two-week vacation, so it meant that it was my turn to push the deploy button. I was excited to press 'deploy' and saw the opportunity to prove myself to the upper managers. Well, soon after the deploy we started getting phone calls from our users, who are mostly older guys and mostly used Internet Explorer. I maintained that it was their fault and that I did nothing wrong with valiant effort, but was ordered to rollback the deploy anyway. The rollback immediately fixed the issue. I did not impress the upper managers.

When Senór Dev came back he found the issue in about two seconds - I used an arrow function. Our app did not support ES6 transpilation yet. Darn.

_Lessons Learned_ : 

- 👉 Multiple browsers are a good idea when testing. If we had tested in more than the two most recent versions of Chrome, we would have caught the issue. We pulled [BrowserStack](https://www.browserstack.com/) into our QA pipeline after that.
- 👉 Do not deploy when Senór is not there

---
## 🐛 - Copied environment from server's `systemd` into local machine, kept setting `NODE_ENV='production'`

- [x] Created and/or 
- [ ] Squashed

_c. 2022_

I mostly work alone these days. And when you're a team lead of a team of one, I feel that you're authorized to take certain 'shortcuts'. Sometimes I commit directly to the master branch. Well, one of the shortcuts went too far. And it was born _while_ debugging.

I had to connect my local machine to our server's Azure subscription to debug an issue. To do this I copied the server's `systemd` config file (for the whole app ran on a VM) into my local to get all the environment variables - connection strings, guids, etc. Well, I inadvertently copied the following line:

```bash
NODE_ENV=production
```
So I was setting NODE_ENV on my local to `production` . Ouch!

I'm sure this caused me a whole bunch of issues, like "why is this if statement not evaluating correctly", but the cake goes to `npm run build`, which in production deletes all of your `devDependencies` ([npm docs for reference](https://docs.npmjs.com/cli/v8/commands/npm-install)) . This was rough for my typescript insecurities because all of the `@types`  packages are, you guessed it, in `devDependencies`. So when I'd run a build I'd get eslint errors about a standard configuration not being defined. I didn't know what to do except to blow the whole root of the repo away and pull it again. Two months this went on.

_Lessons Learned_ :
- 👉 BE CAREFUL when copying config options from server to local; ask yourself, "is this necessary?" In my case it was, but I copied them mindlessly.
- 👉 You can `export NODE_ENV=production`  to your friend at work for hilarious results, especially if you're using Typescript!
