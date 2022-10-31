---
title: Terraform to TaCOS 
description: BaSH works well on your own, but not when your team scales.
date: '2022-10-31'
modified_date: '2022-10-31'
image: /assets/images/posts/taco.jpeg
tags: 'terraform, devops, TaCOS, env0'
---

![Each customer is as distinct as the bogedahs of the bronx, unique as a breakfast taco](/assets/images/posts/taco.jpeg)
_Thanks to Jesswin Thomas for making this [photo](https://unsplash.com/photos/z_PfaGzeN9E) available freely on [unsplash](www.unsplash.com) 🎁_


This is the story of how we migrated our product workload from a bash-managed process to a Terraform Collaboration and Automated Solution, or TaCOS.

## Living in BaSH-Land - Solo Developer ☀️ 

I dislike checking in executables just as much as the next guy, but it was the way for our team of one (myself) to move forward in getting our company's flagship product up and running after a major re-architecture.

And with a bit of BaSH tape and some TLC it was working pretty well for our first few customers.

Here's the folder structure we (and by 'we' I mean 'I') settled on:

```bash
deploy.sh
/terraform
  /customers
    /customer-template
      main.tf 
      outputs.tf 
    /customer-1
      main.tf 
      outputs.tf 
      /files // contains customer-specific keys, assets, etx
    /customer-2
      main.tf 
      outputs.tf 
      /files 
  /modules
    /module-1
    /scripts // contains  scripts to provision VMs, seed database, etc
      ...
    /module-2
      ...
```

The hinge upon which this architecture-plus-customer-CMS turns is the `deploy.sh` script, which, among other things:
- creates the `customer-X` directory, which maps to a customer's Azure subscription
- generates keys and other customer-specific files
- copies the terraform in `/customer-template` into the `customer-X` directory
- runs `terraform` with a `-chdir` to `customer-X` , creating a new workspace for the customer in the process

This process is undesirable for many obvious reasons, but it was enough of a forward step from our prior setup that I deemed it good enough. I did not want to devote too much time to scaling and customer management until we actually had a few customers under our belt.

Some notes about this setup:
- the sibling-level relationship between `customer-template` and `customer-X` allowed for the module paths to be the same. Module mapping was not a headache here. It was quite nice.
- I `apply`and `destroy` rather regularly, and did not want to slow down our repo by checking in my ephemeral subscription work, so I only checked in actual customer data. The test customers' directories existed only on my machine.

I kept a running task in Trello to research multitenancy with terraform, adding notes as I found products suitable to our use case. env0 was a quick find and seemed interesting.

Fast forward a few months - we have a few customers, which are being managed with the above framework. All is going well.

## Paradise BaSH-Land Lost - Windows Machine 💻

Our team got approval for one more hire, and so we hired another developer. He is awesome and working with him has been quite the BaSH.

I mean that in a literal sense, because this architecture flopped on his Windows machine. We eventually figured them all out, of course, but the time spent to do so was soul-shriveling.

Among the issues we encountered:

👉 The line endings on those provision scripts needed to account for the Windows `/r` termination character; team member discovered `.gitattributes` and we solved the problem

👉 Teammate ran `terraform` via the `deploy.sh`, creating a `customer-test` customer in ; it was _mostly_ a success until we discovered that all of his customer-specific files (namely ssh keys) were not available to me unless he checked in his test customer files.

Clearly this setup was not going to work in the long haul, especially when we add a third member to the team. It was time for a TaCO.

I checked out my notes on that multitenancy task and remembered my research on env0 and its competitors. 

And we did not want to end up like this two-member team:


## The env0 TaCO 🌮 

![env0 logo](/assets/images/posts/env0.png)

By this point I had researched env0, Terraform Cloud and Spacelift. These along with a few others are the head TaCOS out there.

I booked a demo with Kevin from env0. It went really well. Kevin was receptive to the unusual nature of our terraform needs, and we conspired about how to make env0 work for us. Super cool guy!

Terragrunt was not much of a consideration, as it doesn't do much other than wrap terraform.

As for the others:
- Terraform Cloud is quite expensive, and if we ever get to terraform policies I don't want us to be shoehorned into using Sentinel.
- Spacelift's UI was a bit off-putting. I have to confess I did not do too much research on Spacelift.

My list of requirements for our TaCO were as follows:

- [x] basic sanity test POC
- created a simple terraform project with a resource group, a VM and a storage bucket
- [x] POC Works for multiple customers (environments in env0 parlance)
- [x] Deploys to Azure Government
- our product can deploy to the Azure Public or Government clouds
- [x] Detects drift
- [x] Pricing allows for many customers (i.e. `customer-X`directories) and not just a Dev-Test-Prod paradigm
- our use case doesn't fit the mold of dev-test-prod; if we have 100 customers, we'll have 100 environments
- [x] Respects terraform validation rules on input variables
- terraform validation is a huge feature released in version 1.something
- [x] Run `terraform output` on demand
- [our `output` gives us helpful customer-specific info](/posts/save-time-and-context-with-terraform-output/)
- [x] Access to terraform state?
- we store all of our state in an azure backend, but will test out the env0 backend option as another option
- [x] Compatible with AWS and CloudFormation
- [ ] Allows for additional custom terraform for different customers (super important maybe?)

The last bullet is a bit of a future idea: what do we do if a customer wants some extra stuff in their instance? The plan until now was to create an `extras.tf` in their `/customer-X` directory and add the new stuff in there. But this seems like an industry anti-pattern, as I haven't seen it anywhere else. 

To get us onboarded onto env0 and to keep the individualistic crust from forming on our product, my plan is to keep these potential customer asks as generic as possible so that they can be feature-flagged and turned on per customer. After discussions with our PM, who is experienced on our product in the AWS space, this seems like the way to go. Also it'll prevent code duplication if more than one customer asks for the same extra feature.

## Still to do

To make sure that we can adopt env0, I'll need to test out a few more things.

For one, we'll still need those customer-specific files. For the keys, I figure I can add them to our terraform output. They're short enough to do so.

I'll also need to try provisioning a VM with one of our BaSH bootstrap scripts. Our hope is to move most of the apps running on our VMs to Azure App Services, but until then we'll have these bootstraps take care of provisioning. I don't imagine env0 will have the line ending issue my teammate had.

We're still investigating whether we'll need to self-host or not. I'll ask the PM if SOC2 is enough for us to use the SaaS.

I'll update here when we're live with env0!

Thanks to [Ned for the env0 overview](https://www.youtube.com/watch?v=rhGc27VHASk)