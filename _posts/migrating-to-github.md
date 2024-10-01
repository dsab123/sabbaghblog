---
title: Migrating to Github
description: Bye bye CodeCommit, hello Github!
date: '2024-09-30'
modified_date: '2024-09-30'
image: /assets/images/posts/nextjs.png
tags: 'ci/cd, source control'
---

![Nodemon is always watching](/assets/images/typewriter-vs-macbook.jpg)
_Thanks to Glenn Carstens-Peters for making this [photo](https://unsplash.com/photos/gray-typewriter-and-macbook-1F4MukO0UNg) available freely on [unsplash](www.unsplash.com) 🎁_

<br />

So, we're moving off of CodeCommit:

![Nodemon is always watching](/assets/images/codecommit-bai.png)

Because this persistent big blue banner obviously means that CodeCommit is soon to be riding across the sunset.

<br />

More on that [here](https://aws.amazon.com/blogs/devops/how-to-migrate-your-aws-codecommit-repository-to-another-git-provider/).

<br />

This is a welcome, albeit not ideal time, for us to move our source over.

<br />

But, it's a chance to do things right. By 'things', I mean three things:

1. Last time we moved our code over from Azure DevOps (before I joined the company), we didn't migrate the commit history. Oof.
2. We have very unstructured automation and testing going on in our repos. This has been a nagging sore for a few years. We've automated a few things. Automation in AWS is very DIY, so we have extra roles lying around, repositories for Lambdas that do CI things which exist alongside production repositories in CodeCommit, one project using CodePipeline (which I abhor), etc. We nee less DIY and more convention, and don't want to mix CI and production. One of our teammates purged superfluous resources, only for me to find that one of our projects was not biulding in CodeBuild.
3. Our documentation has large gaps. Some repos have multiple readmes in multiple directories, some are tremendously outdated, and some readmes don't exist yet.

---

## The Plan

The plan is very simple, and can be handled in three phases, more or less sequentially:

### 1. Move the code over
  - this has a concrete definition of done, and is the necessary thing for us to continue developing without hindrance.
### 2. Surface all existing documentation to a single location, separated by product
  - this also has a concrete definition of done.
### 3. Automate the things
  - We'll need to define our definition of done for this. When is a repository 'done' being CI/CD'd? Is there an answer to this question? This is possible to define, but will require a series of discussions with the team, and will also depend on the product. One of our products is a web application that runs as an ECS cluster; the others are infrastructure driven, but also contain web apps. Each should satisfy some of these requirements:
    - enforce conventional commit message format
    - build artifacts on checkin
    - automate version updates (rather than update version number in 5 different places)
    - store artifacts in S3, or push to a container registry
    - deploy artifacts on some products to a test or demo environment
### 4. Update documentation and tests and automation as we touch things.
  - this will never be done, but good to do anyway. Another way to view this step would be to see it as an indefinite continuation of steps 2 and 3.


---

## The Planning

My plan right now is to separate the work by product, then by the Plan (or steps) above. We have three products, and four steps.
<br />

Each product will at least need Step 1 completed for us to continue business as usual, so those need to be done first.
<br />

After that, a major pass through each product's steps 2 and 3 should be done.
<br />

Step 4 will be an effort to adapt regular documentation, testing and sometimes automation housekeeping into our regular flow of work.


---

## The Tasking

Steps 1 and 2 will probably only require one task for each. For Step 3, there will be multiple tasks per product, involving cleanup of our AWS account, writing of scripts to do things, and scaffolding of github configuration. I think we'll take these as we go, as each product has varying levels of automation already configured and which we're already used to.
<br />

Moving the code over will be a good opportunity to add some similarity to each repository. Perhaps we can capture the gist of the move in a shell script and place it in a root-level directory named `config`, for example.

---

## The Integrations

We use a lot of cloudformation and terraform. For one of our products, we've leveraged [env0](https://env0.com) to run our terraform, which [I've written about at length](/posts/terraform-to-TaCOs/). This has worked tremendously well for us.
<br />

For the CloudFormation, I think we'll stick to provisioning from our local machines. Partly because this is how we've always done it, and it's low impedence. Partly because CloudFormation doesn't have the problem of storing state and sensitive information that terraform does.
<br />

For our product that leverages env0, we'll want to set up automatic deploys on our test environment, which will include a container image update in addition to the infrastructure update.

---

That's all! Whew, what a long blog post.

