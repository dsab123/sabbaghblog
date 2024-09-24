---
title: Becoming who I am (or, actually acting like a tech lead)
description: I had been coasting for a while, and a teammate offered a necessary corrective
date: '2024-06-07'
modified_date: '2024-06-07'
image: /assets/images/posts/rowing.jpg
tags: 'management, team'
---

![Rowing is teamwork](/assets/images/posts/rowing.jpg)
_Thanks to Josh Calabrese making this [photo](https://unsplash.com/photos/five-men-riding-row-boat-Ev1XqeVL2wI) available freely on [unsplash](www.unsplash.com) 🎁_
<br />

This year, I was awakened to a dearth in my responsibilities as a Team Lead, stemming from a below-the-surface fear of taking the mantle of responsibility. 
<br />

I want to share the Wake-up Call, My Response, and how our team has grown since.
<br />

### Wake-up Call ☎️

I became Team Lead at the beginning of the year. I knew I'd begin that role a few months beforehand, and during the interim I did three things pretty regularly: prayed that I'd be able to fulfill the role well, journaled about what I'd be able to do for the team, and purchased [Engineering Management for the Rest of Us](https://www.engmanagement.dev/) by Sarah Drasner.
<br />

I blazed through an assortment of chapters in EMRU. I'd highly recommend it for engineers who transition into management after years of being strong Independent Contributor.
<br />

The beginning of the year came, and with it my role change.
<br />

Right out of the gate I identified a few CI efforts that we needed to nail down, and with the authority to delegate tasks to the team, I delegated it to myself. I had been wanting to learn Packer for a while, and this was my chance. Besides, I didn't want to pass the work to someone on the team who wouldn't want to do it.
<br />

I made a lot of these decisions - doing work myself so as to not inconvenience others on my team. 
<br />

I quietly instituted more sprint structure into the team, which fostered good conversation.
<br />

In the meantine, the team continued their work as usual.
<br />

I was fearful about taking leadership of the team. It wasn't for technical inexperience - I knew technical things well enough. I feared the responses of the rest of the team. Whereas I was once their peer, I'd become the lead. I was afraid of how I'd look delegating work to those who were recently my equals. As is often the case, my fears were overblown.
<br />

Around March, one of our products, call it Product A, needed a boatload of human-performed clerical work done (a lot of cataloguing and reading of PDF documentation) that was not trivial to dump into an LLM. This product was nearing the end of its beta, and the clerical work was the last blocker before we could launch. So I put three of our team members on the clerical work, expecting it to take a month or two. 
<br />

Fast forward a few months, and I am in coasting mode as Team Lead. The team seemed happy enough, and I was pretty busy doing support work and individual independent work - fixing a build pipeline here, containerizing a product there. 
<br />

Over the course of the year I'd shifted my balance of individual work vs team work from a 60-40 to more of a 95-5. And our team's work had shifted as well. An influx of customers had resulted in our slack support for our flagship product, Product B, going up fourfold, myself and another teammate taking on much of the support along with the CTO. This left the three remaining members in the muddle of the clerical work. They felt left in the dust while the other half of us became glorious support firefighters, our tickets being closed, our names plastered all over slack.
<br />

I was oblivious to this until a member of the team doing the clerical work took the necessary liberty to reach out and ask, in friendly words, "what the hell was going on". I couldn't be more glad that he did.
<br />

In particular, this teammate said two things that stunned me - as support firefighting was getting all the recognition, he wondered whether we were going to kill off the product for which the clerical work was needed. Simultaneously, due to the whoever-is-available-jump-into-the-fire nature of the kanban-kinda support we naturally fell into, he felt he was letting the team down whenever he did not join the no-notice slack huddles we convened to put out the fire. Additionally, the other two members of the team doing clerical work felt simiarly.
<br />

This teammate is a dear friend outside of work (as all the members on the team!), and so it was easy for me to take his words exactly as he meant them to be taken. I remembered Leviticus 19:17, and it eventually made its way into the conversation: "You shall not hate your brother in your heart, but you shall reason frankly with your neighbor, lest you incur sin because of him." 
<br />

This teammate pushed through the discomfort of making me aware of the problems, because he wanted to quell any existing bitterness or frustration with me and the team. 
<br />

He "reasoned frankly" with me in private. I appreciated both his discretion and his confidence to reach out.
<br />

Some things needed to change in our team. I had not changed my course from an IC to a people leader.
<br />

### Answering the Call ☎️

So what did I do?
<br />

Well, our weekly sync was about thirty minutes after that huddle with my courageous teammate. I decided to take the problem by the horns. 
<br />

Since it was not an isolated issue (i.e. others felt this way), I decided to address it in the open. I confessed my lack of oversight to the team, and opened up the floor for questions and discussion. We came up with a few helpful thoughts, some of which I was not expecting at all!
<br />

Our needs as a team were:
1. A support/knowledge base system
	- the team member doing most of the support work recommended that we needed a ticketing system! I thought support over bare Slack was going fine, but he did not agree.
2. A documentation repository, to help rotate team members on and off of support
<br />

In addition to the above, I remembered that I had bought a book on this whole unwieldy thing called _Engineering Management For the Rest of Us_.
<br />

Re-reading the book was refreshing, and exactly what I needed. I was appalled that I hadn't been having regular one-on-ones with members of the team. Had we been doing that, the concerns of those doing the clerical work would have been addressed earlier.
<br />

So, we reinstituted the one-on-ones. I was fearful about taking on responsibility but this quote on page 3 of EMRU helped me to answer this call: "The stakes are high with engineering management. Previously, if your code broke, it impacted people indirectly. Now your job affect people's daily lives in a tangible way that you see reflected back on the faces in front of you." 
<br />

-------
A few months have passed since I Answered The Call, and here's how we're doing.
<br />

I've seen growth in the team across three spheres - workflow, personell and product work.
<br />

### Workflow Changes

We added [thena](https://thena.ai) to our Slack workspace to manage and organize customer requests, and we couldn't be happier! These people are great to work with, and they release new features fast. I plan to write more about our smooth onboarding experience and the features we like.
<br />

We are beginning to [migrate our codebase off of AWS CodeCommit](https://aws.amazon.com/blogs/devops/how-to-migrate-your-aws-codecommit-repository-to-another-git-provider/), since they don't support new customers and are obviously heading towards a fast sunset. With the migration we're looking to house the code and documentation in the same place.
<br />

### Personell Changes

With the continued success of Product B, due in no small part to the organization we've been able to bring to supporting it.
<br />

One team member is leaving the team to work on another of our company's contracts, so we have an immediate opportunity to hire someone to backfill his position.
<br />

Our CTO is hopeful that come the beginning of the year, we can take our team's success to the Board and wrangle for another position. This would bring our team to seven full-time members and two part-time.
<br />

My hope is that once we get that second person we can divide the team into a Support and Development team, and rotate the teams every few months.

### Product Changes

Competing priorities have kept Product A from launching, but we've been able to inch towards it. The clerical work is done, and we have a few more environment-level bugs and some error handling to clean up.
<br />

I am contemplating doing this last bit of work myself across a few late evenings. Perhaps the better thing to do, in light of the lessons I've learned as Team Lead this year, would be to bring the team in on it.

-----
### Quotes from Engineering Management for the Rest of Us introductory chapters


_"The stakes are high with engineering management. Previously, if your code broke, it impacted people indirectly. Now your job affect people's daily lives in a tangible way that you see reflected back on the faces in front of you."_ p 3
<br />

_"What life events have the people you work with been through that changed the way they think about things? What can you learn about how they've evolved as people by understanding what shaped their values?"_ p 9
<br />

_On the necessity of repeating the vision for the team, both to yourself and the team members: "Clarity is what we're aiming for here. Clarity is key."_ p 14
<br />