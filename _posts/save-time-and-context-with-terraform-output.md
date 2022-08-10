---
title: 'Save Context and Time with terraform output'
description: Context Switching is hard for computers; it's also hard for people.'
date: '2022-05-27'
modified_date: '2022-05-27'
image: /assets/images/posts/see-world.jpeg
tags: 'kevin, terraform, devops'
---

![See world, Kevin, see world.](/assets/images/posts/see-world.jpeg)

[Context Switching](https://en.wikipedia.org/wiki/Context_switch) is hard for computers; it's also hard for humans. Just ask Kevin.

Whatever I can do to reduce the time I spend switching betwen contexts saves both time and brainpower. Since I picked up Azure and Terraform, the two contexts I switch between the most are my terminal and the Azure portal, the switching controlled by my four-finger swipe on my Apple M1.

One pain point has been swiping to the portal for all the IP addresses I need for terminal work. The M1 is cool, but the swipe takes 1 more second than it did on my old Air.

With `terraform output`, however, I need fret not. I can just output the IP addresses and terraform will spit them out for me.

In `outputs.tf`, I specify the outputs like this:
```hcl
output "IP-Addresses" {
  value = {
    Jumpbox-Private-IP = azurerm_linux_virtual_machine.Combine-Linux-Jumpbox.private_ip_address,
    Linux-Jumpbox-Public-IP = azurerm_linux_virtual_machine.Combine-Linux-Jumpbox.public_ip_address,
    ...
  }
}
```

I also constructed an SSH command so that I don't have to type this bad boy in manually:

```
Jumpbox-Login = "ssh -i ${var.customer_name}-jumpbox user@${module.customer-vcn.IP-Addresses.Jumpbox-Public-IP}"
```

`terraform output` in the terminal will print these out. 


Sweet, you've saved 10 seconds. What are you going to do with all that time?