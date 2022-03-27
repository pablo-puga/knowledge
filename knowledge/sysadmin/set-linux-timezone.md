---
title: Change Linux Timezone
date: 2022-03-21T14:15
tags: linux
description: Instructions on how to change the TimeZone of a Linux system.
---

# How to change Linux Timezone

### Check the Current Timezone

```bash
$ timedatectl
Local time: Wed 2019-02-06 22:43:42 UTC
  Universal time: Wed 2019-02-06 22:43:42 UTC
        RTC time: Wed 2019-02-06 22:43:42
       Time zone: Etc/UTC (UTC, +0000)
     NTP enabled: no
NTP synchronized: yes
 RTC in local TZ: no
      DST active: n/a
```

### List Timezones

```bash
$ timedatectl list-timezones
...
America/Tijuana
America/Toronto
America/Tortola
America/Vancouver
America/Whitehorse
America/Winnipeg
...
```

### Change Timezone

```bash
timedatectl set-timezone your_time_zone
```
