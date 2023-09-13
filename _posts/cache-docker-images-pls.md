---
title: Cache Docker Images You Use Regularly On Codebuild
description: If you cache images you use regularly, you can avoid the deadly 🐳 docker throttle
date: '2023-09-13'
modified_date: '2023-09-13'
image: /assets/images/posts/cache.jpg
tags: 'AWS, ECR, Codebuild'
---

![Geocaching](/assets/images/posts/cache.jpg)
_Thanks to Martin Lostak for making this [photo](https://unsplash.com/photos/xxk5li0MRB4) available freely on [unsplash](www.unsplash.com) 🎁_
<br />

If you're using Codebuild and have integrated docker into your CI pipeline, you have probably run across this error before:
<br />

![docker unauth'dfail](/assets/images/docker-too-many-unauthd-requests.png).


This is frustrating because your code is not responsible for this failure.
<br />

If you get this error, its probably because you are pulling the images from docker hub without first authenticating to Docker. The obvious fix for this is to create a docker account and login before you pull the images.


<br />
But notice that little word 'upgrading' in the error message above. Upgrading means money.

<br />


An alternative that a teammate proposed was pretty simple - **cache the images you use in your builds inside of a container registry!**