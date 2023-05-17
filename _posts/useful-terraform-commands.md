---
title: Useful Terraform Things
description: Here's a running list of terraform commands
date: '2022-04-29'
modified_date: '2023-01-03'
image: /assets/images/posts/reminder.jpeg
tags: 'terraform'
---

![reminder](/assets/images/posts/reminder.jpeg) _Thanks to @absolutvision for making this [photo](https://unsplash.com/photos/82TpEld0_e4?utm_source=twitter&utm_medium=referral&utm_content=creditShareLink ) available freely on [unsplash](www.unsplash.com) 🎁_ 

Here's a running list of terraform tips & tricks I've amalgamated. 

Hope they are helpful to ya.

## Remove multiple resources at a time

If you want to remove all resources that match a certain pattern, here's a way to do it.

```bash
terraform state rm $(terraform state list | grep <your-pattern>)
```

This comes in handy when removing nested Azure resources, as child elements have their parent's resource type in their resource id.

------

## Remove a resource by fully-qualified name

To remove a specific resource, you can do:

```bash
terraform destroy -target RESOURCE_TYPE.NAME
```

Note that the `RESOURCE_TYPE` must be fully-qualified,  i.e.
```
terraform destroy -target azurerm_storage_blob.blob_for_bob
```

------

## Display detailed information on a resource

To show a resource's detailed information, first find the fully-qualified name:

```bash
terraform state list | grep -i tls
```

You'll get back soemthing like:

```bash
tls_private_key.One_Key
tls_private_key.Two_Key
tls_private_key.Red_Key
tls_private_key.Blue_Key
```

Then, simply apply the `show` subcommand to it:
```bash
terraform state show tls_private_key.One_Key
```

Which will show you everything on that resource:

```bash
# tls_private_key.One_Key:
resource "tls_private_key" "One_Key" {
    algorithm                     = "RSA"
    ecdsa_curve                   = "P224"
    id                            = "165f5d816712d79923788e8ad42b17de3d8fe5d4"
    private_key_openssh           = (sensitive value)
    private_key_pem               = (sensitive value)
    private_key_pem_pkcs8         = (sensitive value)
    public_key_fingerprint_md5    = "9d:e3:f5:d5:3e:d4:4b:aa:af:93:cd:bb:90:53:60:a1"
    public_key_fingerprint_sha256 = "SHA256:CzK6Sodr7nyRezgDBgT/irERCWsd/0EHPtZod/ppVzw"
    public_key_openssh            = <<-EOT
        ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDKTcfISmNEa9OYml56eo8BCcXO1hafRKENxCsarE2hEYyarwpaLwghXLbPPmIuuQQybirmxNsP3mfQG+odxqEfbWgWpyi/bjJM9gYQI1cXJWPC9ytNqKDepZN9rGgbCnqSxTBWRIVvYCxZ76KzCviHUAk7HOCIfgjUOcuIMt5uFqa9wj4pt1aeH6pPGacpcCb4WyTXXJMGJtwYLG3SlQ8LVogbFboELV3SsRrQCKNguCwzv1s8CgWdnCvVH8UxH9shD93h1DT/FdWZEYS6AK6w3sa/qNV07LY3L0Y/O0/DSBOHw8N/JeFE/CNv2VRdFzcOQuAMMMWhtEjDbqqcQSBh
    EOT
    public_key_pem                = <<-EOT
        -----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyk3HyEpjRGvTmJpeenqP
        AQnFztYWn0ShDcQrGqxNoRGMmq8KWi8IIVy2zz5iLrkEMm4q5sTbD95n0BvqHcah
        H21oFqcov24yTPYGECNXFyVjwvcrTaig3qWTfaxoGwp6ksUwVkSFb2AsWe+iswr4
        h1AJOxzgiH4I1DnLiDLebhamvcI+KbdWnh+qTxmnKXAm+Fsk11yTBibcGCxt0pUP
        C1aIGxW6BC1d0rEa0AijYLgsM79bPAoFnZwr1R/FMR/bIQ/d4dQ0/xXVmRGEugCu
        sN7Gv6jVdOy2Ny9GPztPw0gTh8PDfyXhRPwjb9lUXRc3DkLgDDDFobRIw26qnEEg
        YQIDAQAB
        -----END PUBLIC KEY-----
    EOT
    rsa_bits                      = 2048
}
```

------

## Allow for different platforms to touch the same workspace

This command will tell your lock file (`.terraform.lock.hcl`) to store the hashes for more than just your platform:

```bash
terraform providers lock -platform=windows_amd64 -platform=darwin_amd64
```

[This github thread](https://github.com/hashicorp/terraform/issues/28041#issue-828274120) talks about it in more detail.

More to come as I find them!