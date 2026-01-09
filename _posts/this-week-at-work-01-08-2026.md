---
title: This Week at Work - January 8, 2026
description: When the CTO is away, the Tech Lead will play...
date: '2026-01-08'
modified_date: '2026-01-08'
image: /assets/images/posts/this-week.jpg
tags: 'work, life, weekly'
---

![Strut like that chicken](/assets/images/posts/this-week.jpg)
_Thanks to Hulki Jazmin Quaynor for making this [photo](https://unsplash.com/photos/closeup-photo-of-ballpoint-pen-near-camera-18mUXUS8ksI) available freely on [unsplash](www.unsplash.com) 🎁_


Our CTO and Product Owner has been away for two weeks, and this week was his last week out. And due to reduced customer support load I've been able to knock out a lot of items on the ol' wishlist. Here are some of the highlights I was able to accomplish this week.

## Work


### Established github task templates

Like most teams, we have backend, frontend, infrastructure and automation kinds of tasks. I was able to utilize Github Templates, which are simply yaml files in the root of each repo, to tailor new tasks with helpful boilerplate:

Here are all the templates:

![All the templates](/assets/images/posts/github-templates.png)

And one for our backend work:

![Backend task template](/assets/images/posts/github-templates-backend.png)


This allows us to have a pre-defined Definition of Done in each task, as well as show which main branch the task should sprout from. Hope this'll prove useful!


### Updated angular on flagship app from 14 to 21

One of my goals for this year is to improve our DX. Top priority was lowering build times for our product's web app. Built in 2018 or so (before I joined the company), it had been sitting on Angular 14 since its inception. Which means that 18 seconds of a build time is unacceptable!

Thankfully, Angular's migration guides were sweet and I only ran into a few hiccups while vibe coding this upgrade.

```bash
% npm run start

> client@3.14 start
> ng serve --configuration development --proxy-config ./proxy.config.json

Initial chunk files | Names         |  Raw size
styles.css          | styles        | 420.29 kB | 
main.js             | main          | 415.15 kB | 
polyfills.js        | polyfills     | 144 bytes | 

                    | Initial total | 835.58 kB

Application bundle generation complete. [3.649 seconds] - 2026-01-09T21:46:24.369Z

Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   https://localhost:4200/
  ➜  press h + enter to show help
```


### Watched Docker and Kubernetes pluralsight course via slack and blackhole + OBS

I've been trying to coordinate some group learning on Docker/Kubernetes, ever since we built out a pipeline for [Kubernetifying the compute portion of our product](/posts/2025-brag-sheet#kubernetified-product).

For that, we have been watching [Nigel Poulton's awesome PluralSight course on Docker and Kubernetes](https://app.pluralsight.com/library/courses/docker-kubernetes-big-picture/table-of-contents).

In order to stream the audio through to our slack call I installed [BlackHole](https://existential.audio/blackhole/support/), [OBS](https://obsproject.com/) and muck with my Mac's audio settings. It was not easy.

---

## Tracking of Things

This renders horribly, hopefully I can make this better over time. I just started using [yarle](https://github.com/akosbalasko/yarle) to convert portions of my Weekly Template into markdown, and I need to tweak my configs apparently.

### Mornings

|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
| Monday | Tuesday | Wednesday | Thursday | Friday | Saturday |
| - [x] Pray<br />- [x] NT Reading<br />- [x] Family Worship<br />- [x] Quick Workout w/kid<br /><br />* 3 sets Walk-ups | - [x] Pray<br />- [x] NT Reading<br />- [x] Family Worship<br />- [x] Quick Workout w/kid<br /><br />* 3 Sets FFESS x8<br />* 3 Sets Bicycles 20 reps<br />* 3 Sets Mtn Climbers :40<br /><br />- [x] Evening pre-dinner<br />	- [ ] 3 sets FFESS x10 | - [x] Pray<br />- [x] NT Reading<br />- [x] Family Worship<br />- [x] Quick Workout w/kid<br /><br />* 3 sets Pushups | - [x] Pray<br />- [x] NT Reading<br />- [ ] Family Worship<br />- [x] Quick Workout w/kid<br /><br />* Did Something, but don't remember | - [x] Pray<br />- [x] NT Reading<br />- [x] Family Worship<br />- [x] Quick Workout w/kid<br /><br />* 3 sets Bicycle Kicks | - [ ] Pray<br />- [ ] Isaiah!<br />- [ ] Family Worship |


### Heavy Lifts


|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
| Monday | Tuesday | Wednesday | Thursday | Friday | Saturday |
| - [x] Circuit - 3x12<br />	- [ ] Hammer Curls<br />	- [ ] Individual Curls<br />	- [ ] Arnold Pres<br />- [x] L-Raises - 3x8 @ 5<br />- [x] Kettlebell Row - 3x12 @ 35<br />* Hanging Leg Raises<br />* 60 Second Dead Hang | - [ ] Heavy Lift 1 Catchup | - [x] Front Squats<br />	* 1x8 @ 115<br />	* 1x8 @ 135<br />	* 1x5 @ 155<br />	* 1x4 @ 155<br />	* Wow, I did it!<br />* ~~Deadlifts~~<br />	* ~~1x8 @~~<br />	* ~~1x8 @~~<br />* ~~Russian Twists~~<br />- [x] 60 Second Dead Hang | - [x] Heavy Lift 2 Catchup<br /><br />* Pullups - 3x8! | - [ ] Heavy Lift 3<br /><br />* Bench<br />	* 1x8 @<br />	* 1x8 @<br />	* 1x8 @<br />* Negative Triceps or Skullcrushers<br />	* 1x8 @<br />	* 1x8 @<br />	* 1x8 @<br />* ~~60 second Bicycles~~<br />* 60 Second Dead Hang | - [ ] Heavy Lift 3 Catchup |


### Evening Stretches


|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
| Monday | Tuesday | Wednesday | Thursday | Friday | Saturday |
| PRI<br /><br />- [ ] 90:90 Hip Shift<br />- [ ] 90:90 Side Plank<br />- [ ] Deep Squat :60<br />- [ ] Hip Openers<br />- [x] Zenith Stretch!<br />- [ ] Theraband Chest | - [ ] Hamstrings (gentle, not aggressive)<br />* Elbow Skies<br />* PVC Pass-throughs<br />- [ ] 2 min Scap Circles<br />- [ ] Wall slides | - [ ] Hamstrings<br />* Theraband (rows or pull-aparts)<br />* PVC Pass-throughs<br />* Doorway Stretch<br />* Deep Squat :60<br />- [x] Zenith Stretch! | - [ ] Hamstrings<br />* Elbow Skies<br />* PVC Pass-throughs<br />* Quad Stretch<br />* Deep Squat :60<br />- [ ] Wall slides | - [ ] Active Dead Hang :60<br />* Hamstrings<br />* Theraband<br />* PVC Pass-throughs<br />* Doorway Stretch<br />- [ ] Zenith Stretch! | * Hamstrings<br />* Elbow Skies<br />* Doorway Stretch<br />- [ ] 2 min Scap Circles |

[Zenith Sretch link](https://www.youtube.com/watch?v=BFaIxWSXoec&pp=ygUbemVuaXRoIHN0cmV0Y2ggdG9tIG1vcnJpc29u) which has been helpful for my snapping shoulder and thoracic stiffness.