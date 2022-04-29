---
title: 'Useful Terraform Things'
description: Here's a running list of terraform  ...'
date: '2022-04-29'
modified_date: '2022-04-29'
image: /assets/images/posts/ac-unit.jpg
---

Here's a running list of terraform tips & tricks I've amalgamated. 

Hope they are helpful to ya.

## Remove multiple resources at a time

If you want to remove all resources that match a certain pattern, here's a way to do it.

```hcl
terraform state rm $(terraform state list | grep <your-pattern>)
```

This comes in handy when removing nested Azure resources, as child elements have their parent's resource type in their resource id.

------

More to come as I find them!