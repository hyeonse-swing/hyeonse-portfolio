---
title: 'Operations Admin and shared modules'
description: 'Session state, migration work, and reusable masking and formatting in SWING Admin.'
date: '2026-11-16'
activity:
  label: 'Work period'
  text: 'During my time at The Swing'
tags: ['Operations tools', 'TypeScript', 'Shared modules']
projects: ['swing-admin']
draft: false
---

## State across an operator's tasks

[SWING Admin](/en/#archive-swing-admin) supports operators moving across multiple menus. The order in which user information and menus update after login, an expired session, and a return to an earlier screen can all affect the UI. I fixed issues around those states and built screens for finding and viewing partner settlement summaries and trip records by statement. Building lookup screens is distinct from designing or verifying the settlement calculations themselves.

I also contributed to moving existing JavaScript and MUI features to TypeScript and Ant Design, separating domain-specific Admin applications, and integrating them into a monorepo. Changes to one screen had to be considered in the context of other operations tasks. The public archive also records my work on personal-data masking and formatting modules, tested with Vitest and published as an npm package. Reusing presentation logic in this way does not establish the security of the entire access-control system.

The public record identifies the work, but gives no measured reduction in operator time or errors. This account therefore stays with the screens, shared modules, and technical boundaries of my contribution.
