---
title: 'Rebuilding Yellow Bus trip operations in a new Admin'
description: 'Bringing distributed tools into one trip flow while handling data exceptions and access scope.'
date: '2026-11-16'
tags: ['Operations platform', 'React', 'Maps']
projects: ['yellow-bus']
draft: false
---

## Trip work spread across several tools

I worked as a frontend engineer in the Yellow Bus squad from November 2024 to August 2025. The acquired school shuttle service had student, dispatch, and route work spread across operations tools built with PHP, JavaScript, and React. Internal operators and academies also used different functions and permissions. I helped assess technical debt and a migration approach, then moved existing functions into a trip workflow in a React and TypeScript Admin.

Login and basic UI came first, but not all operations APIs were ready. I proposed defining endpoints and data shapes feature by feature with the backend team, then connecting screens as each API became available. We also reconciled the student-list response against the existing operations screen. Real records could have no guardian information or multiple guardians, so I treated both as UI exceptions. The backend shared a revised response proposal, and I continued the list screen against that contract.

## Keeping list, map, and selection aligned

Academy staff needed to inspect and change dispatches by date, multiple routes, student boarding states, and pickup and drop-off stops. I connected academy-specific dispatch lookup, a multi-route map, boarding and stop changes, and access restrictions in the new trip screen. Monitoring used data polling, while route and stop management used Kakao Map. The related trip-screen changes were merged. Bulk registration of student boarding schedules and locations followed as another operations function.

Selections for academy, date, time, and dispatch had to stay consistent between the list and map. I managed that selection state so changing academy reset prior selections and changing date cleared time and route selections. After a successful boarding-status or stop change, I invalidated the related dispatch detail, student schedule, and stop-list query keys so the screen fetched server results. Dragging a pickup or drop-off stop also required checks for the same stop, route direction, departure and arrival constraints, and reversed boarding order before a confirmation dialog appeared.

## What was delivered and what remained a proposal

I proposed address search or a list of stops associated with an academy for operators who did not know a stop's exact name. That is a recorded proposal, not evidence that every search option reached production. The student-list exceptions involved a backend response agreement; access scope was included in the trip screen.

The work rebuilt distributed functions around the trip workflow in the new Admin and contributed to its initial stabilization. I do not attach a completion date for the entire legacy migration or a measured stabilization effect to this case. The [Yellow Bus case](/en/work/yellow-bus/) has more on the screen and query flow.
