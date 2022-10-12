---
title: Avoid Buildspec Commit Barf
description: Has this been you when tweaking build settings?
date: '2022-08-22'
modified_date: '2022-08-22'
image: /assets/images/posts/commit-barg.png
tags: 'devops, aws, build'
---

![Commit-Barf](/assets/images/posts/commit-barf.png)

Has this been you when tweaking a build file? 

It's not pretty. Even with a squash commit, this "commit barf" is still hidden in the history, buried for a nosy junior dev to find out and weaponize against you. As if senior devs don't still struggle with impostor syndrome.

If you're using CodeBuild to build your things, here's a simple workflow to prevent barfing the commit history when tweaking your `buildspec.yaml` (assuming you store the `buildspec` in source control, because why would you not?):

When tweaking the buildspec, switch the buildspec source to be "Insert build commands" instead of "Use a Buildspec file", then copy your buildspec directly into the Build Commands Box:

![Switch Buildspec source](/assets/images/posts/switch-buildspec-source.png)


Then, tweak it to your hearts content, build your project as many times as you want. You will rack up a lot of builds, but this is better than barfing up the commit history.

When you're done with the buildspec edits, you push your changes to it, then can switch back to using the buildspec from source control. And only one commit is counted against you. 

Voila! 