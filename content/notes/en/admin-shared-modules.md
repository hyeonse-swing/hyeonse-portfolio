---
title: 'Handling screen state and shared display logic in SWING Admin'
description: 'Fixing UI state around login and session changes, building settlement views, and packaging masking and formatting logic.'
date: '2026-11-16'
activity:
  label: 'Work period'
  text: 'During my time at The Swing'
tags: ['Operations tools', 'TypeScript', 'Shared modules']
projects: ['swing-admin']
draft: false
---

## Returning to a screen with the right state

Operators move between menus in [SWING Admin](/en/#archive-swing-admin). The order of user-information and menu updates after login, an expired session, or returning to an earlier screen could change what the UI showed. I fixed issues around those states and built screens for finding and viewing partner settlement summaries and trip records by statement. Designing or verifying settlement calculations was outside that screen work.

I also helped move existing JavaScript and MUI features to TypeScript and Ant Design while domain-specific Admin applications were split and integrated into a monorepo. A change to one screen could touch another operations task. The public archive records my contribution to personal-data masking and formatting modules, tested with Vitest and published as an npm package. The reusable presentation logic did not by itself verify data access permissions or the entire security system.

The public archive lists the work, but contains no measured change in operator time or error rate.
