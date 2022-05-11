---
title: 'Bye bye, Custom Data'
description: Have you ever used custom_data?'
date: '2022-05-10'
modified_date: '2022-05-10'
image: /assets/images/posts/goodbye.jpeg
---

![Goodbye, custom_data](/assets/images/posts/goodbye.jpeg)
_Thanks to Junseong Lee for making this [photo](https://unsplash.com/photos/v_WLk_vNYRA?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink) available freely on [unsplash](www.unsplash.com) 🎁_

Have you ever used the `custom_data` parameter on a VM? Terraform offers it to do some basic configuration on a VM right after it's provisioned.

It's a weird offering, to be sure, because terraform doesn't market itself as a configuration tool. See [this joint presentation by HashiCorp and Ansible employees](https://www.hashicorp.com/resources/ansible-terraform-better-together), where the presenters encourage you to use both.

Lately, I've been working through some configuration issues in our architecture. The solution involved moving away from `custom_data`. 

I did not move to Ansible, though.

Rather than involve yet another tool, I discovered that terraform gives me what I want via the [`virtual_machine_extension` resource](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_machine_extension) in AzureRM. For our use case, it provides enough explicit configuration that I don't need to lay down Ansible on top of it just yet.

I thought extensions were only for plugin-type things you needed to [add to a VM to get logging working](https://www.sabbagh.blog/posts/linux-custom-logging-azapi/), for example. But apparently you can run any kinda code in an extension.

One of the benefits of an explicit extension like this is that you can use it to synchronize asynchronous operations, much like Javascript's `async` and  `await`. The magic is in the `depends_on`; I can create an explicit `depends_on` relationships between different resources. If I can abstract a configuration script via a resource, i.e. as an `extension`, I can _synchronize_ the order of extensions across multiple VMs.

Example time!

I have two VMs, one acting as a proxy between the other VM and the internet. Let's call them 'proxy' and 'restricted'. I have a routing table set up to send all outbound requests from the restricted VM through the proxy, which can allow or deny them. Say also that the proxy software takes a long time to install. I can make the restricted VM resource `depends_on` the proxy, but terraform doesn't wait for the `custom_data` script to finish before marking the VM as successfully provisioned.

In our example, the restricted VM needs to pull some installers and other assets from the internet, and those assets' endpoints are explicitly allowed. But if the proxy config script takes 10 minutes, and the restricted config script takes two, the config script will attempt to pull down those assets while the proxy is still being configured, and they won't succeed. Sad face.

But if I define the extension for the proxy configuration explicitly, like so:

```hcl
resource "azurerm_virtual_machine_extension" "Proxy-VM-Configuration" {
  name                 = "Proxy-VM-Configuration-Extension"
  virtual_machine_id   = azurerm_linux_virtual_machine.Proxy-VM.id
  publisher            = "Microsoft.Azure.Extensions"
  type                 = "CustomScript"
  type_handler_version = "2.1"
  settings = jsonencode(
  {
    "commandToExecute" : file("/path/to/proxy-vm/configuration/script.sh")
  })
}
```

then I can make the configure script for the restricted VM _depend on_ the proxy VM:

```hcl
resource "azurerm_virtual_machine_extension" "Restricted-VM-Configuration" {
  depends_on = [
    azurerm_virtual_machine_extension.Proxy-VM-Configuration # this here
  ]
  name                 = "Restricted-VM-Configuration"
  virtual_machine_id   = azurerm_linux_virtual_machine.Restricted-VM.id
  publisher            = "Microsoft.Azure.Extensions"
  type                 = "CustomScript"
  type_handler_version = "2.1"
  settings = jsonencode(
  {
    "commandToExecute" : file("/path/to/restricted-vm/configuration/script.sh")
  })
}
```

Voila! You have a poor man's cross-VM configuration scheme, without the overhead of another tool to manage it.

One added benefit of explicit extensions, at least for Linux boxes, is that the configuration goes to it's own location, `/var/lib/waagent/custom-script/download/0/` at time of writing. The Azure docs _say_ it goes to `/var/log/cloud-init.log`  but I ain't neva seen my logs there, they get shoehorned into `/var/log/messages`, which is where they go to die amidst the [flood](https://access.redhat.com/solutions/1564823) of `created slice X for user 23213` messages.