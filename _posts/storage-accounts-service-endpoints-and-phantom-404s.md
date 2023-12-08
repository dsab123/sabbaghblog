---
title: Storage Accounts, Service Endpoints and Phantom 404s
description: Removing the Microsoft.Storage service endpoint from a subnet without removing the subnet's reference in the Storage account makes the account invisible. Oof.
date: '2023-12-07'
modified_date: '2023-12-07'
image: /assets/images/posts/cache.jpg
tags: 'Azure, Storage Account, terraform'
---

TL;DR - Removing the Microsoft.Storage service endpoint from a subnet without removing the subnet's reference in the Storage account makes the account invisible. Oof.
<br />
So, I ran into this disaster today.
<br />
We removed the `Microsoft.Storage` service endpoint from a few of our subnets, because we didn't want those subnets to access a certain storage account.


```
resource "azurerm_subnet" "subnet_pls" {
  depends_on = [
    azurerm_virtual_network.vnet_pls
  ]
  name = "subnet_pls"

  ...

  service_endpoints = [ // we removed this
    "Microsoft.Storage"
  ]
}
```

Suddenly, the storage account disappeared! It did not show up in the Azure portal.

Random fluke, right? Run terraform apply and recreate it.
<br />
Nope! We got this from terraform: 

```
module.example.azurerm_storage_account.storage_account: Creating...
module.example.azurerm_storage_account.storage_account: Still creating... [10s elapsed]

Error: Error retrieving Azure Storage Account "examplestorageaccount": storage.AccountsClient#GetProperties: Failure responding to request: StatusCode=404 -- Original Error: autorest/azure: Service returned an error. Status=404 Code="StorageAccountNotFound" Message="The storage account examplestorageaccount was not found."

  on ../modules/foo-storage/main.tf line 9, in resource "azurerm_storage_account" "storage_account":
   9: resource "azurerm_storage_account" "storage_account" {
```
<br />
And when we checked the terraform state, it showed up as `tainted`:

```
    {
      "module": "module.combine-storage",
      "mode": "managed",
      "type": "azurerm_storage_account",
      "name": "examplestorageaccount",
      "provider": "provider[\"registry.terraform.io/hashicorp/azurerm\"].tenant",
      "instances": [
        {
          "status": "tainted",
          ...
```

What the hell!?

-------

After many hours of debugging, we discovered that the storage account still had reference to those subnet_ids:

```
resource "azurerm_storage_account" "storageaccountpls" {
  name                            = local.storageaccountpls

  network_rules  {
    default_action = "Deny"

    virtual_network_subnet_ids = [
      azurerm_subnet.subnet_pls.id // should have removed this
      ...
    ]
  }
}
```

And voíla, it works again.
<br />

After fixing, I discovered this [github issue](https://github.com/hashicorp/terraform-provider-azurerm/issues/16547) that alludes to a stray network config being the culprit.