---
title: Change Linux Hostname
date: 2022-03-21T14:00
tags: linux
description: Instructions on how to change the hostname of a Linux system.
---

# How to change Linux Hostname

### Display the Current Hostname

```bash
hostnamectl
```

### Change the Hostname

```bash
hostnamectl set-hostname host.example.com
echo '127.0.0.1   host.example.com' >> /etc/hosts
```

### Verify the Change

```bash
hostnamectl
   Static hostname: host.example.com
         Icon name: computer-vm
           Chassis: vm
        Machine ID: 2cc2688b8138434a81dd7b3133e66b2e
           Boot ID: e378a0971e9e415cb70e7e953a2362bc
    Virtualization: qemu
  Operating System: Debian GNU/Linux 9 (stretch)
            Kernel: Linux 4.9.0-7-amd64
      Architecture: x86-64
```
