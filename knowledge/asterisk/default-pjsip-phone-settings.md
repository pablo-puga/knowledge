---
title: Default PJSIP Wizard defaults for a phone
date: 2022-03-21T14:20
tags: configuration
description: PJSIP template for a good batch of defaults to configure a user SIP phone.
---

# Default PJSIP Wizard defaults for a phone

The following are a couple of nice options to initialize a phone configuration through the Asterisk PJSIP Wizard.
The section is added in the `/etc/asterisk/pjsip_wizard.conf` configuration file.

```text
[phone](!)
accepts_auth = yes
accepts_registrations = yes
endpoint/disallow = all
endpoint/allow = ulaw,alaw
endpoint/direct_media = yes
endpoint/force_rport = yes
endpoint/disable_direct_media_on_nat = yes
endpoint/direct_media_method = invite
endpoint/ice_support = yes
endpoint/moh_suggest = default
endpoint/send_rpid = yes
endpoint/rewrite_contact = yes
endpoint/send_pai = yes
endpoint/allow_transfer = yes
endpoint/trust_id_inbound = yes
endpoint/device_state_busy_at = 1
endpoint/trust_id_outbound = yes
endpoint/send_diversion = yes
endpoint/rtp_symmetric = yes
aor/qualify_frequency = 30
aor/authenticate_qualify = no
aor/max_contacts = 1
aor/remove_existing = yes
aor/minimum_expiration = 30
```
