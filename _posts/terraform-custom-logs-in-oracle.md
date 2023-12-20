---
title: Terraform custom logs in Oracle Cloud
description: Misleading documentation + Reverse engineering a state file!
date: '2023-12-20'
modified_date: '2023-12-20'
image: /assets/images/posts/taco.jpeg
tags: 'terraform, cloud, OCI'
---

Have you ever reverse-engineered a state file before? A better question might be: _why_ would you ever need to do so? Boy, do I have the use case for you.

-------

Yesterday, I was terraforming logging integrations with one of our [company's flagship products](https://www.sequoiainc.com/pathfinder). Specifically, I was getting the product and its ancillary networking components bundled up as an [Oracle Stack](https://docs.oracle.com/en/cloud/paas/cloud-stack-manager/csmug/oracle-cloud-stack-manager.html#GUID-CE12A1EA-7AB9-4ED2-B63F-553EA9C2CC1D). It's pretty cool tech that I haven't seen on Azure or AWS - you can zip up terraform code and upload it, then plan and apply and all the other things you can do with terraform.
<br />

Anywho, we wanted to ship the logs from our product, running on a compute instance, to the portal's log viewer.
<br />

After a few minutes on the OCI provider docs, I could not find any resource with names like "custom|log" (it was indeed there - more on why I couldn't find it later). I _knew_ the functionality existed, as I had POC'd this in the portal before trying to write the terraform for it.
<br />

Azure has [terrafy](https://techcommunity.microsoft.com/t5/itops-talk-blog/azure-terrafy-import-your-existing-azure-infrastructure-into/ba-p/3357653) for this exact purpose; turns out Oracle has something even better. 
<br />

You can "stack-ify" (my term) existing resources in any OCI compartment, natively within the portal! Removes the unwieldiness of a tool like terrafy. You can do it like this:

![Stackify from existing resources in the OCI portal](/assets/images/oci-stackify-from-resources.png).

So I created the custom log setup in a separate compartment. It required three resources - an a log group, a log, and a custom log. The latter is similar to what you'd expect - you pass a file path on the compute instance that matches the logs you want to see in the portal.
<br />

After the stack was provisioned, I looked at the resources created, to finally discover the name of the resource I was trying to terraform:

![What's this resource called?](/assets/images/oci-logging-resources.png).

Oh, what kinda name is `oci_logging_unified_agent_configuration`?


Well, whatever. Now we can finally terraform it, since we know what it's named. I'm going to submit a github issue to rename that resource.

<br />
---------

Oracle has a cool button that allows you to apparently view and edit the terraform code that produced the stack:

![Edit the terraform code that produced the stack](/assets/images/oci-edit-terraform-stack.png).

I say 'apparently' because the button does not work, but produces a nice devtools barf. Maybe it'll work sometime soon?







