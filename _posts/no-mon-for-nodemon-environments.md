---
title: No mon for `nodemon`
description: Found a footgun that took an hour to fix
date: '2024-01-22'
modified_date: '2024-01-22'
image: /assets/images/posts/nextjs.png
tags: 'nodemon, frontend'
---

![Nodemon is always watching](/assets/images/security-camera.jpg)

<br />

_Thanks to Alberto Rodríguez Santana for making this [photo](https://unsplash.com/photos/white-and-black-water-pipe-i_nIoSCdHv4) available freely on [unsplash](www.unsplash.com) 🎁_

If you're working on a several-years-old node project, you might run into the `nodemon` footgun we ran into last week.

------

We added an environment to the project for some shared work we were doing.

Our project uses [dotenv](https://www.npmjs.com/package/dotenv) for managing environments; to add a new one is pretty straightforward. Simply add an `.env.<environment-name>` with the environment variables you need, and set NODE_ENV. 

<br />
This line of code does the loading of the specified environment:

```js
  let config = { path: path.resolve(process.cwd(), 
    `.env.${process.env.NODE_ENV}`) };

  require('dotenv').config(config);
```

<br />

However, we were finding that the environment was always set to `development`, not our new one.

<br />

An Hour of debugging revealed the shocking truth: Nodemon was hijacking our environment! And to our dismay, we (actually the original developer) _told_ it to do that!

<br />

Here's the `nodemon.json`:


```json
{
  "restartable": "rs",
  "ignore": [".git", "node_modules/", "dist/", "coverage/"],
  "watch": ["**/*"],
  "execMap": {
    "ts": "node -r ts-node/register"
  },
  "env": {
    "NODE_ENV": "development"   // this bad boy right here
  },
  "ext": "js,json,ts"
},
```

<br />
Removing the `env` fixed the problem.

<br />

If you're bootstrapping a new node project, [you won't need it anymore](https://www.jamesqquick.com/blog/using-node-watch-instead-of-nodemon/).
