---
title: Side Projects and Other Niceties
description: Some things I did
date: '2023-12-21'
modified_date: '2023-12-21'
image: /assets/images/posts/chicken-strut.jpeg
tags: 'projects'
---

Here is a curated gallery of side projects and/or fun live things I've worked on.


## [Quote Generator](https://quote-generator-next.vercel.app)

• 2021
• Social Image Generator
• [Github](https://github.com/dsab123/quote-generator-next)

<img src="/assets/images/quotecreator-project.png"></img>

What (it is)
This is a social image generator. You can upload and format quotes, and pair them with a random image
from [unsplash](https://unsplash.com).

### How (it works)

This is my second non-trivial Next app, so I knew I needed some real state management.
  I think I used Redux well here. I also TDD'd during development, which I almost never do in side projects.
  I also have forthcoming authentication via Auth0 in the works. The hope is to get some multitenant account
  functionality going. We're using Fauna as a NoSQL database which has been fun.

### Why (did I do it)

I wanted to automate social images for <a href="http://danielsabbagh.com" target="_blank">danielsabbagh.com</a>,
  and didn't like any free options in existence for this kinda thing. So I wrote this little guy
  that can upload quotes to my own “account”, pull images from unsplash (right now it always searches for 'sky',
  because there are some surprise no bueno images that pop up with random searches), and reposition/format the text for me.
<br />

It's far from complete, maybe when the kid(s) are out of the house I can find time to finish this up…

-----

### [danielsabbagh.com](www.danielsabbagh.com)
• 2020
• Hand-Spun Reading Blog
• [Github](https://github.com/dsab123/website-nextjs)

<img src="/assets/images/danielsabbaghcom-project.png"></img>

### What
This is a hand-spun blog framework for my theology and meta-reading.
  Google Analytics tells me that 600 people have visited the site in the first half of 2022.
  I'll not mention that they only visit the site for about 23 seconds though.

### How
This is a Next app. That's pretty much it. Nothing special tech-wise. Fiddled with the CSS for way too long. And then replaced most of the CSS with framer motion.

### Why
I was on short-term disability for health reasons and this popped out. Sadly I never took the time to learn much of what I was doing (I blame the corticosteroids). Next is a very forgiving framework, but React and async operations are not. I didn't use any state management, so there are some quirks in the page transitions that I have since recasted as easter eggs.
Some cool things about this project is that I'm using github as a poor man's CMS. I also put on my poor designer's hat and golden ratio'd all over the layout, so hopefully it's nice to look at.
<br />

This also is far from complete, maybe when the kid(s) are out of the house I can find time to finish this up…


-----


### [PlayHymns]("http://playhymns.herokuapp.com")
• 2020
• First Ever Web App
• [Github](https://github.com/dsab123/playhymn3)

<img src="/assets/images/playhymns-project.png"></img>

### What
The OG, the first web app I ever made in 2015. It runs on heroku's free tier, so the dyno that runs it takes a minute to start up. Make sure to visit the HTTP version, as there's a dangerous API call that HTTPS won't allow 😄
<br />

Update: The murderers at SAP Heroku have killed it in November 2022 since it was on the free tier 🪦


### How
This is a silly Spring app, I think. I was learning about ORM at the time and was pretty fascinated with it.

### Why
Quite a few members of our church had never grown up singing hymns, so their transition to a reformed liturgical style was a bit harder than most people's. I recorded myself playing the hymns a few days ahead of time and organized them by week so that peeps could get acclimated to the hymns we were going to sing the coming Sunday.

<br />

-------

### Offline or confidential stuff
Will update as I remember, but mostly devops-y stuff for work comes to mind. Most of this is what I blog about.
<br/> 

Some buzzwords for the SEO crawlers: multi-cloud, AWS, OCI, Azure, terraform, frontend
