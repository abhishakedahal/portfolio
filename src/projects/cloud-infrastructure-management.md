---
title: "Multi-Server Cloud Infrastructure & DNS Orchestration"
description: "Sample placeholder project: Confidential internal portal and Linux server configuration on Linode for staging, automated database backups, and DNS failover."
date: 2024-11-10
featured: false
order: 3
role: "Infrastructure & Systems Specialist"
status: "Active (Client Confidential)"
confidential: true
thumbnail: "/assets/images/projects/project-infra.svg"
thumbnailAlt: "System dashboard overview illustration"
technologies:
  - "Linode"
  - "Linux / Ubuntu"
  - "Nginx"
  - "DNS Configuration"
  - "MySQL"
  - "Bash"
---

> **Notice: Confidential Sample Placeholder Entry**  
> This entry illustrates how client-confidential work or internal tools without public links are displayed. The live link and repository fields are omitted, and a confidential badge is displayed automatically.

### Project Overview

This project encompassed the provisioning and operational maintenance of a multi-server hosting setup on Linode for internal testing environments, client staging sites, and automated offsite database backups.

### Context & Problem

The team managed several concurrent client web projects with varying PHP version requirements and database schemas. Deploying updates directly onto production without isolated staging environments caused downtime risks and uncoordinated DNS cutovers.

### My Role & Responsibilities

* **Server Provisioning:** Configured Linux VPS instances with secure SSH authentication, firewall rules (UFW), and automated system security patches.
* **DNS & SSL Management:** Configured authoritative DNS records (A, CNAME, TXT, MX) and automated Let's Encrypt SSL certificate renewals via Certbot.
* **Database Maintenance:** Scripted cron jobs for nightly encrypted MySQL database dumps synced securely to remote storage.
* **Staging Environments:** Setup virtual hosts on Nginx to provide password-protected preview domains for client review.

### Approach & Implementation

1. **Hardened Configuration:** Applied principle of least privilege across user permissions, disabled password-based SSH access, and tuned Fail2ban rules.
2. **Nginx Optimization:** Configured gzip compression, HTTP/2 protocols, and FastCGI caching for high-load WordPress and PHP sites.
3. **Backup Verification:** Implemented automated integrity checks ensuring database backups could be restored cleanly on disaster recovery tests.

### Outcome & Impact

* Guaranteed isolated staging sandboxes for client approvals prior to live production releases.
* Maintained near 100% server uptime across hosted staging environments.
* Mitigated data loss risks with reliable, verifiable automated backup pipelines.
