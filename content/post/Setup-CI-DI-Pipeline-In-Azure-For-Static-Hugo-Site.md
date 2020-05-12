---
title: "Setup CI/DI Pipeline in Azure for Static Hugo Site"
date: 2020-01-24T10:25:30+01:00
draft: true
tags: [ "Azure-Pipeline", "CI&DI", "Hugo" ]
---



First of all, lets clarify what the accronyms CI/CD means.

When we talk about CI/CD, we're really talking about several related processes: 

* Continuous integration
* Continuous delivery
* Continuous deployment.

**Continuous integration:** Code changes are frequently merged into the main branch. Automated build and test processes ensure that code in the main branch is always production-quality.

**Continuous delivery:** Any code changes that pass the CI process are automatically published to a production-like environment. Deployment into the live production environment may require manual approval, but is otherwise automated. The goal is that your code should always be ready to deploy into production.

**Continuous deployment:** Code changes that pass the previous two steps are automatically deployed into production.


References: https://docs.microsoft.com/en-us/azure/architecture/microservices/ci-cd