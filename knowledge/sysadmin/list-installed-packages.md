---
title: How to list installed packages in Linux
tags: linux,apt,yum
date: 2022-03-26T08:30
---

# How to list installed packages in Linux

## Table of Contents

- [How to list installed packages in Linux](#how-to-list-installed-packages-in-linux)
  - [Table of Contents](#table-of-contents)
  - [Debian](#debian)
    - [List installed packages with apt](#list-installed-packages-with-apt)
    - [List installed packages with dpkg](#list-installed-packages-with-dpkg)
  - [CentOS (with yum)](#centos-with-yum)

## Debian

In Debian we can check for a list of installed packages either by using the `apt` or the `dpkg` commands.

### List installed packages with apt

```bash
apt list --installed
```

```text
Output

Listing... Done
adduser/oldstable,now 3.118 all [installed]
apache2-bin/oldstable,now 2.4.38-3+deb10u6 amd64 [installed,automatic]
apache2-data/oldstable,now 2.4.38-3+deb10u6 all [installed,automatic]
apache2-utils/oldstable,now 2.4.38-3+deb10u6 amd64 [installed,automatic]
apache2/oldstable,now 2.4.38-3+deb10u6 amd64 [installed]
apparmor/oldstable,now 2.13.2-10 amd64 [installed]
apt-listchanges/oldstable,now 3.19 all [installed]
apt-transport-https/oldstable,oldstable-updates,now 1.8.2.3 all [installed]
apt-utils/oldstable,oldstable-updates,now 1.8.2.3 amd64 [installed]
apt/oldstable,oldstable-updates,now 1.8.2.3 amd64 [installed]
awscli/oldstable,now 1.16.113-1 all [installed]
base-files/oldstable,now 10.3+deb10u11 amd64 [installed]
base-passwd/oldstable,now 3.5.46 amd64 [installed]
bash-completion/oldstable,now 1:2.8-6 all [installed]
bash/oldstable,now 5.0-4 amd64 [installed]
bind9-host/oldstable,oldstable,now 1:9.11.5.P4+dfsg-5.1+deb10u5 amd64 [installed]
bsdmainutils/oldstable,now 11.1.2+b1 amd64 [installed]
bsdutils/oldstable,now 1:2.33.1-0.1 amd64 [installed]
bzip2/oldstable,now 1.0.6-9.2~deb10u1 amd64 [installed,automatic]
ca-certificates/oldstable,oldstable-updates,now 20200601~deb10u2 all [installed]
check-mk-agent/now 2.0.0p3-1 all [installed,local]
cloud-guest-utils/oldstable,now 0.29-1 all [installed]
cloud-image-utils/oldstable,now 0.29-1 all [installed,automatic]
cloud-init/oldstable,now 20.2-2~deb10u2 all [installed]
cloud-initramfs-growroot/oldstable,now 0.18.debian7 all [installed]
cloud-utils/oldstable,now 0.29-1 all [installed,automatic]
coreutils/oldstable,now 8.30-3 amd64 [installed]
cpio/oldstable,now 2.12+dfsg-9 amd64 [installed,automatic]
cron/oldstable,now 3.0pl1-134+deb10u1 amd64 [installed,automatic]
curl/oldstable,oldstable,now 7.64.0-4+deb10u2 amd64 [installed]
...
```

### List installed packages with dpkg

If we want to use the dpkg command, we need to filter by the first column, which is a set of flags in the following format.

```text
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                              Version                               Architecture Description
+++-=================================-=====================================-============-=================
```

So, for our purpose of find correctly installed packages, we need to filter those starting with **ii**.

```bash
dpkg --list | grep ^ii
```

```text
Output

ii  adduser                           3.118                                 all          add and remove users and groups
ii  apache2                           2.4.38-3+deb10u6                      amd64        Apache HTTP Server
ii  apache2-bin                       2.4.38-3+deb10u6                      amd64        Apache HTTP Server (modules and other binary files)
ii  apache2-data                      2.4.38-3+deb10u6                      all          Apache HTTP Server (common files)
ii  apache2-utils                     2.4.38-3+deb10u6                      amd64        Apache HTTP Server (utility programs for web servers)
ii  apparmor                          2.13.2-10                             amd64        user-space parser utility for AppArmor
ii  apt                               1.8.2.3                               amd64        commandline package manager
ii  apt-listchanges                   3.19                                  all          package change history notification tool
ii  apt-transport-https               1.8.2.3                               all          transitional package for https support
ii  apt-utils                         1.8.2.3                               amd64        package management related utility programs
ii  awscli                            1.16.113-1                            all          Universal Command Line Environment for AWS
ii  base-files                        10.3+deb10u11                         amd64        Debian base system miscellaneous files
ii  base-passwd                       3.5.46                                amd64        Debian base system master password and group files
ii  bash                              5.0-4                                 amd64        GNU Bourne Again SHell
ii  bash-completion                   1:2.8-6                               all          programmable completion for the bash shell
ii  bind9-host                        1:9.11.5.P4+dfsg-5.1+deb10u5          amd64        DNS lookup utility (deprecated)
ii  bsdmainutils                      11.1.2+b1                             amd64        collection of more utilities from FreeBSD
ii  bsdutils                          1:2.33.1-0.1                          amd64        basic utilities from 4.4BSD-Lite
ii  bzip2                             1.0.6-9.2~deb10u1                     amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                   20200601~deb10u2                      all          Common CA certificates
ii  check-mk-agent                    2.0.0p3-1                             all          Checkmk Agent for Linux
ii  cloud-guest-utils                 0.29-1                                all          cloud guest utilities
ii  cloud-image-utils                 0.29-1                                all          cloud image management utilities
ii  cloud-init                        20.2-2~deb10u2                        all          initialization system for infrastructure cloud instances
ii  cloud-initramfs-growroot          0.18.debian7                          all          automatically resize the root partition on first boot
ii  cloud-utils                       0.29-1                                all          metapackage for installation of upstream cloud-utils source
ii  coreutils                         8.30-3                                amd64        GNU core utilities
ii  cpio                              2.12+dfsg-9                           amd64        GNU cpio -- a program to manage archives of files
ii  cron                              3.0pl1-134+deb10u1                    amd64        process scheduling daemon
ii  curl                              7.64.0-4+deb10u2                      amd64        command line tool for transferring data with URL syntax
...
```

## CentOS (with yum)

In CentOS we will check it through the `yum` command.

```bash
yum list installed
```

```text
Output

Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: download.cf.centos.org
 * centos-sclo-rh: download.cf.centos.org
 * centos-sclo-sclo: download.cf.centos.org
 * epel: d2lzkl7pfhq30w.cloudfront.net
 * extras: download.cf.centos.org
 * remi-php72: mirror.netweaver.uk
 * remi-safe: mirror.netweaver.uk
 * updates: download.cf.centos.org
Installed Packages
GeoIP.x86_64                                            1.5.0-13.el7                                  installed
PyYAML.x86_64                                           3.10-11.el7                                   installed
acl.x86_64                                              2.2.51-14.el7                                 installed
alsa-lib.x86_64                                         1.1.8-1.el7                                   @base
apr.x86_64                                              1.4.8-3.el7_4.1                               @base
apr-util.x86_64                                         1.5.2-6.el7                                   @base
atk.x86_64                                              2.28.1-1.el7                                  @base
audit.x86_64                                            2.8.4-4.el7                                   installed
audit-libs.x86_64                                       2.8.4-4.el7                                   installed
audit-libs-python.x86_64                                2.8.4-4.el7                                   installed
augeas-libs.x86_64                                      1.4.0-10.el7                                  @base
authconfig.x86_64                                       6.2.8-30.el7                                  installed
autoconf.noarch                                         2.69-11.el7                                   @base
autogen-libopts.x86_64                                  5.18-5.el7                                    @base
automake.noarch                                         1.13.4-3.el7                                  @base
avahi-libs.x86_64                                       0.6.31-19.el7                                 @base
basesystem.noarch                                       10.0-7.el7.centos                             installed
bash.x86_64                                             4.2.46-31.el7                                 installed
bash-completion.noarch                                  1:2.1-8.el7                                   @base
bind-libs.x86_64                                        32:9.9.4-74.el7_6.2                           @updates
bind-libs-lite.x86_64                                   32:9.9.4-74.el7_6.2                           @updates
bind-license.noarch                                     32:9.9.4-74.el7_6.2                           @updates
bind-utils.x86_64                                       32:9.9.4-74.el7_6.2                           @updates
binutils.x86_64                                         2.27-34.base.el7                              installed
boost-date-time.x86_64                                  1.53.0-28.el7                                 @base
boost-system.x86_64                                     1.53.0-28.el7                                 @base
boost-thread.x86_64                                     1.53.0-28.el7                                 @base
btrfs-progs.x86_64                                      4.9.1-1.el7                                   installed
bzip2-libs.x86_64                                       1.0.6-13.el7                                  installed
ca-certificates.noarch                                  2021.2.50-72.el7_9                            @updates

```
