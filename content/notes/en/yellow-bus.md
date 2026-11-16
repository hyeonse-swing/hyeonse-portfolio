---
title: 'Rebuilding Yellow Bus trip operations in a new Admin'
description: 'I moved student, dispatch and route screens into the new Admin, handling guardian data exceptions and academy-specific access.'
date: '2026-11-16'
activity:
  label: 'Work period'
  start: '2024-11'
  end: '2025-08'
  point: '2025-08'
  pointLabel: 'End of involvement'
tags: ['Operations platform', 'React', 'Maps']
projects: ['yellow-bus']
draft: false
---

## Trip work across several tools

Yellow Bus student, dispatch, and route work was spread across operations tools built with PHP, JavaScript, and React. Internal operators and academies had different functions and permissions as well. From November 2024 to August 2025, I worked as a frontend engineer in the squad, assessing early technical debt and a migration approach before moving existing functions into a React and TypeScript Admin trip flow.

We could build login and the basic UI first, but the operations APIs were not all ready together. I proposed defining endpoints and data shapes feature by feature with the backend team and connecting each screen as its API became available. For the student list, I compared the response with the existing operations screen. Some records had no guardian information; others had multiple guardians. I handled both as UI exceptions and continued the list against the backend's revised response proposal.

## A date change had to reach the map

Academy staff needed to inspect dispatches by date and multiple routes, then check or change boarding states and pickup and drop-off stops. I connected academy-specific dispatch lookup, a multi-route map, boarding and stop changes, and access restrictions. Monitoring data refreshed by polling; route and stop management used Kakao Map. The trip-screen changes were merged, and bulk registration of student boarding schedules and locations followed as another operations function.

The academy, date, time, and dispatch selections had to refer to the same trip across the list and map. Changing academy reset the previous selections; changing date cleared time and route. After a boarding-status or stop change succeeded, I invalidated the related dispatch detail, student schedule, and stop-list query keys to fetch the server result again. A dragged stop also went through checks for the same stop, route direction, departure and arrival constraints, and reversed boarding order before the confirmation dialog.

I also proposed address search or a list of stops associated with an academy for operators who did not know a stop's exact name. Those are recorded proposals; I cannot say every search option reached production. I contributed to rebuilding the trip screens and their initial stabilization, but have no completion date for the entire legacy migration or a measured stabilization effect. The [Yellow Bus case](/en/work/yellow-bus/) has more on the screens and query flow.
