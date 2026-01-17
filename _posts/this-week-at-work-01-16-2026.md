---
title: This Week at Work - January 16, 2026
description: CTO is back, and Support work came a'callin...
date: '2026-01-16'
modified_date: '2026-01-16'
image: /assets/images/posts/this-week.jpg
tags: 'work, life, weekly'
---

![Strut like that chicken](/assets/images/posts/this-week.jpg)

_Thanks to Jazmin Quaynor for making this [photo](https://unsplash.com/photos/closeup-photo-of-ballpoint-pen-near-camera-18mUXUS8ksI) available freely on [unsplash](www.unsplash.com) 🎁_

Well, CTO is back after three weeks. And I took a day and a half off and fell off my exercise regimen.


## Work

When I saw him at church on Sunday I warned him I had a huge list of things to go over. Most of them were PRs that he reviewed and merged before we actually met. Boss.

### Frontend Glow-up

Over the weekend, I was using some web app in my browser and it hit me that we could make our web app just as awesome, since [we're now on the latest version of angular](/posts/this-week-at-work-01-08-2026/). So I added a flurry of frontend tasks, the likes of which included collapse/expand functionality, deep linking and OG tags.

### Supporting Gateway Load Balancers

We have a particularly chatty customer that has been testing the depth of our collective networking knowledge. Lesson learned - Gateway Load balancers are hard, but if you have to work with them _never forget_ the return paths on your route tables, especially for symmetric routing. I put a return (outbound) path into a route table without being able to test that it was the issue, as the customer's compute instance at the destination had turned unhealthy. To my surprise, customer said that the route fixed the issue.

### SBOM and Seagal's Bizarre Martial Arts Influence

We met with some folks at the company who are doing some supply chain work for us, and settled on a path forward for them involving the unfortunately-named [Aikido](https://www.aikido.dev/use-cases/sbom-generator-create-software-bill-of-materials) and Github Actions.

### Certs Expired

I took a day and a half to enjoy some time with my wife, away from the kiddos. Which was, according to Murphy's Law, the day that the self-signed SSL certs for a few customers on our second-tier product (which are intentionally self-signed, because it's meant to be a sandbox environment - that's right, we get to sell people a product that has self-signed certs in it) expired.

Cue the old familiar, but not helpfully-familiar walk down `openssl` lane in which I relearn what a CA and signer have to do with a leaf cert.

To prevent me from getting caught playing hookey when those certs expire again, I added a slack workflow to remind the team every October (best to give these things a few months to get done), along with a wiki explaining how to do it if (most definitely _am_) out the day they expire.

---

### No tracking stats this week

Mostly because I did not really do any physical things after Tuesday 😭