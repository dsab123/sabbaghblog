---
title: Linux VM Custom Logs with Terraform and AzApi
description: Ive been doing a lot of work recently on the linux side of life
date: '2022-04-26'
modified_date: '2022-04-26'
image: /assets/images/posts/custom-log.jpeg
tags: 'azapi, terraform'
---

![Sweet Custom Logging](/assets/images/posts/custom-log.jpeg)
_Thanks to Zachary Kyra-Derksen for making this [photo](https://unsplash.com/photos/ajqDp29Pz7M?utm_source=twitter&utm_medium=referral&utm_content=photos-page-share) available freely on [unsplash](www.unsplash.com) 🎁_

I've been doing a lot of work recently on the linux side of our product's infrastructure, which consists of a few Azure VMs and VM Scale Sets.

As you can imagine, SSHing into each instance to check logs was getting to be a pain. Fortunately, it became a pain at the the right time, because shortly afterward I picked up a task to ship those logs to Azure.

This post will explain how I did that via terraform.

Some thanks are in order before we look at the code, however:
- 👉 Many thanks to Thorsten Hans, who wrote a [blog post doing a similar thing for Windows machines](https://www.thorsten-hans.com/integrate-virtual-machine-scale-sets-azure-monitor-vminsights-terraform/) without which I wouldn't have figured my solution out.
- 👉 Many thanks to the Azure Terraform folks who rolled out the helpful [azapi terraform provider](https://techcommunity.microsoft.com/t5/azure-tools-blog/announcing-azure-terrafy-and-azapi-terraform-provider-previews/ba-p/3270937) earlier this month.

For reference, we're using terraform 1.1.9 and azurerm 3.3.0.

---
## The Need

was simple. I wanted the application and system-level logs from one VM and two VM Scale Sets to get shipped into Log Analytics, Azure's log platform. 

## The Setup

took a while to nail down, as it involved poking around the Azure ecosystem a bit more than I'm used to.

My pattern when terraforming Azure things has been to get it working in the Azure portal, and reverse-engineer into terraform code. I got the logs flowing by manually creating resources in the portal. To terraform it, I'd need a Log Analytics Workspace with some Custom logs, and a couple agent(s) running on each box.

Note that the Custom Log is called a Data Source in Azure parlance.

Let's assume the following variables:
```hcl
var.location: the location
var.resource-group-name: the resource group name
```

The Workspace was easy to set up, as the azurerm docs are straightforward:
```hcl
# log-analytics-workspace.tf
resource "azurerm_log_analytics_workspace" "Log-Analytics-Workspace" {
  name                = "Log-Analytics-Workspace"
  location            = var.location
  resource_group_name = var.resource-group-name
  sku                 = "PerGB2018"
  retention_in_days   = 30
```

Custom Logs, however, are not configurable via the `azurerm` provider. [See this thread for the back-and-forth between hashicorp and microsoft folks](https://github.com/hashicorp/terraform-provider-azurerm/issues/3182). I began dusting off my "shell it out" pun until I discovered that the Azure folks working on infrastructure things published the `azapi` provider, which allows for managing resources not yet supported in `azurerm` .

The `azapi_resource` accepts a json object of properties that should match the ARM template of the resource you're trying to create. So I exported the ARM template of the Log Analytics workspace (which is the `parent_id` of the custom log), hoping to find the ARM template of the custom log in there. Unfortunately, I was greeted with this error:

![Come On, Microsoft](/assets/images/dataSourcesError.png)


A foray into the MSFT docs led me to a page of templates, [this one](https://docs.microsoft.com/en-us/azure/azure-monitor/logs/resource-manager-workspace#collect-custom-logs) being what I was looking for:

```hcl
{
  "apiVersion": "2020-08-01",
  "type": "dataSources",
  "name": "[concat(parameters('workspaceName'), 'armlog_newline')]",
  "dependsOn": [
      "[concat('Microsoft.OperationalInsights/workspaces/', '/', parameters('workspaceName'))]"
  ],
  "kind": "CustomLog",
  "properties": {
      "customLogName": "armlog_newline",
      "description": "this is a description",
      "inputs": [
        {
            "location": {
              "fileSystemLocations": {
                  "linuxFileTypeLogPaths": [ "/var/logs" ],
                  "windowsFileTypeLogPaths": ["c:\\Windows\\Logs\\*.txt"]
              }
            },
            "recordDelimiter": {
              "regexDelimiter": {
                "pattern": "\\n",
                "matchIndex": 0,
                "numberdGroup": null
              }
            }
        }
      ],
      "extractions": [
        {
          "extractionName": "TimeGenerated",
          "extractionType": "DateTime",
          "extractionProperties": {
            "dateTimeExtraction": {
                "regex": null,
                "joinStringRegex": null
            }
          }
        }
      ]
   }
}
```


A bit of finagling led to this successfully-created resource:
```hcl
resource "azapi_resource" "VarLogMessages-Logs-Ingest" {
  provider  = azapi
  type      = "Microsoft.OperationalInsights/workspaces/dataSources@2020-08-01" # grabbed this from template's API version
  name      = "VarLogMessages-Logs-Ingest"
  parent_id = azurerm_log_analytics_workspace.Log-Analytics-Workspace.id

  oobody = jsonencode({
    properties = {
      customLogName = "VarLogMessages_CL"
      description = "Captures the /var/log/messages of the linux machines"
      inputs = [{
        location = {
          fileSystemLocations = {
            linuxFileTypeLogPaths = ["/var/log/messages"],
          }
        },
        recordDelimiter = {
          regexDelimiter = {
            pattern = "\\n",
            matchIndex = 0,
            numberdGroup = null # lol MSFT typo
          }
        }
        }
      ],
      extractions = [
        {
          extractionName = "TimeGenerated",
          extractionType = "DateTime",
          extractionProperties = {
            dateTimeExtraction = {
              regex = null,
              joinStringRegex = null
            }
          }
        }
      ]
    }
    kind = "CustomLog"
  })
}
```

I'm not sure exactly why the `TimeGenerated` column is necessary. I tried to do without it but got errors indicating that I needed to include it. 🤷 

In order to ship the logs from the VM to Azure, you'll need to install two agents on each box - the Dependency Agent and the Monitoring Agent. I think you might be able to enforce installation of these agents via an Azure policy, but for my relatively small architecture it seemed too complicated (Azure policies, ugh...). I queried the azure cli for the latest versions of the two agents:

```bash
az vmss extension image list -p Microsoft.Azure.Monitoring.DependencyAgent -n DependencyAgentLinux -l eastus --latest -o jsonc
```

gives us

```hcl
[
  {
    "name": "DependencyAgentLinux",
    "publisher": "Microsoft.Azure.Monitoring.DependencyAgent",
    "version": "9.10.13.19190" # this version here
  }
]
```


And for the Monitoring Agent, 

```bash
az vmss extension image list -p Microsoft.EnterpriseCloud.Monitoring -n OMSAgentForLinux -l eastus --latest -o jsonc
```

gives

```hcl
[
  {
    "name": "OmsAgentForLinux",
    "publisher": "Microsoft.EnterpriseCloud.Monitoring",
    "version": "1.14.11" # this version here
  }
]
```

So we can utilize the `azurerm_virtual_machine_scale_set_extension` resource for the agents, specifying those versions:

```hcl
resource "azurerm_virtual_machine_scale_set_extension" "Logs-Monitoring-Agent" {
  virtual_machine_scale_set_id = azurerm_linux_virtual_machine_scale_set.Logs-Scale-Set.id
  auto_upgrade_minor_version   = true
  name                         = "Logs-Monitoring-Agent"
  publisher                    = "Microsoft.EnterpriseCloud.Monitoring"
  type                         = "OMSAgentForLinux"
  type_handler_version         = "1.0"
  
  settings = jsonencode({
    "workspaceId"               = "${azurerm_log_analytics_workspace.Log-Analytics-Workspace.workspace_id}",
    "stopOnMultipleConnections" = true
  })
}

resource "azurerm_virtual_machine_scale_set_extension" "Logs-Dependency-Agent" {
  virtual_machine_scale_set_id = azurerm_linux_virtual_machine_scale_set.Logs-Scale-Set.id
  auto_upgrade_minor_version   = true
  name                         = "Logs-Dependency-Agent"
  publisher                    = "Microsoft.Azure.Monitoring.DependencyAgent"
  type                         = "DependencyAgentLinux"
  type_handler_version         = "9.10"
  provision_after_extensions = [azurerm_virtual_machine_scale_set_extension.Logs-Monitoring-Agent.name]

  settings = jsonencode({
    "enableAutomaticUpgrade" = true
  })
}
```

Here's a [repo with a complete working example](github repo) of the codes.

## The Result


Here's our custom log in the portal after terraform provisions it. w00t!

![Sweet, sweet provisioning](/assets/images/finallyCustomLogs.png)

And we can use the custom log in a KQL query to retrieve our logs.

![For the record, still hate KQL](/assets/images/KQLLogsCool.png)

---
NOTE: for the moment this seems to work only if you're logged in via the azure cli. I've submitted a [github issue](https://github.com/Azure/terraform/issues/99) to figure out why the Custom Log resources aren't able to be authenticated via the standard sp provider configuration.





