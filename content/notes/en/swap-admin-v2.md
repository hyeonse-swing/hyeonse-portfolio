---
title: 'SWAP Admin V2 while legacy task data remained'
description: 'A team release connecting Fleet API screens with version-aware navigation and existing lookup paths.'
date: '2026-11-16'
activity:
  label: 'Main release'
  start: '2025-12'
tags: ['Operations Admin', 'Migration', 'React']
projects: ['swap-admin-v2']
draft: false
---

## A V2 screen with a V1 task behind it

The December 2025 SWAP operations Admin release introduced V2 screens for subscriptions, tasks, and factoring with the Fleet API. Opening a new list did not remove the need to look up existing task data. A task reached through an older detail URL could itself be V2 data and needed to land on the new detail screen.

The transition checked the response version on the legacy detail screen and sent V2 tasks to the new one. Navigation used `replace` so the transitional URL did not add an extra browser-history step. At release time, task detail also tried a V2 lookup first and queried V1 if the request failed. This was the coexistence path then; it did not classify every failure cause before switching.

## New lists, existing follow-on work

I worked on the new entry screens for subscriptions, tasks, and factoring and their Fleet API integration. The factoring list omitted empty filters from lookups, returned to page one when filters changed, and connected the API's total and page values to table pagination. Related detail, contract, and attachment work still had legacy API paths even while new lists used Fleet API page responses. I also contributed to the team release that put Suspense and ErrorBoundary loading and error boundaries around the factoring V2 list.

Staff needed a way into those screens too. I participated in transitioning permissions, sidebar navigation, payment lookup, and bulk-work functions, checking how the menus and access paths connected old and V2 work. Since September 2025, my SWAP FE Part Lead scope has been frontend technical decisions, development, and review. For this team release, I contributed major feature development, technical review, and code review; the design and implementation were shared across the team.

The three V2 screens and Fleet API integration were merged in the December 2025 release. The V2-first task lookup and V1 path on request failure were recorded at the time. We did not separately measure the production error rate of that coexistence path, and this case does not establish when remaining legacy API work finished migrating. It covers the operations Admin transition; the [SWAP Admin V2 case](/en/work/swap-admin-v2/) has the screen boundaries in more detail.
