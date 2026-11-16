---
title: 'SWAP Admin V2 while legacy task data remained'
description: 'A team release connecting Fleet API screens with version-aware navigation and existing lookup paths.'
date: '2026-11-16'
tags: ['Operations Admin', 'Migration', 'React']
projects: ['swap-admin-v2']
draft: false
---

## Data did not change at the same moment as the screens

The major December 2025 SWAP operations Admin release introduced V2 screens for subscriptions, tasks, and factoring with the Fleet API. Existing task data still needed a lookup path. Since September 2025, I have served as SWAP FE Part Lead for frontend technical decisions, development, and review. In this team release, I contributed major feature work, technical review, and code review. The case covers the operations Admin transition, not completion of a migration across the entire service.

A new screen entry point could not simply assume that the URL and task data had the same version. The transition included checking the response version on the legacy task detail screen and sending V2 tasks to the new detail screen. Navigation used `replace` so the transitional entry URL did not add another step to browser history. At release time, task details also attempted a V2 lookup first and queried V1 if the request failed. That describes the coexistence path at the time; it does not establish that every cause of failure was identified and safely classified.

## Where new lists met legacy detail workflows

I worked on new entry screens for subscriptions, tasks, and factoring and their Fleet API integration. The factoring list managed filters together with page state: empty filters were omitted from lookups, a filter change returned to page one, and the Fleet API's total and page values fed table pagination. New lists used Fleet API page responses, while related detail, contract, and attachment workflows still had legacy API paths. I also contributed to the team release with Suspense and ErrorBoundary loading and error boundaries for the factoring V2 list.

The employee's path through the Admin mattered alongside the data calls. I participated in the transition of permissions, sidebar navigation, payment lookup, and bulk-work functions. Those paths had to connect existing Admin work with V2 screens. V2 was a team release; this account does not assign every design or implementation decision to me alone.

## The observed transition boundary

The December 2025 release merged the subscription, task, and factoring V2 screens with Fleet API integration. The contemporaneous task detail flow included V2-first lookup and a V1 path on request failure. The production error rate of that coexistence path was not separately measured, and this case does not give a completion date for remaining legacy API workflows. It describes my contribution to navigation and lookup while old and new task data coexisted. The [SWAP Admin V2 case](/en/work/swap-admin-v2/) shows the screen boundaries in more detail.
