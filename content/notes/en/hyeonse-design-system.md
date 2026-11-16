---
title: 'Keeping display preferences consistent across projects'
description: 'Extracting the portfolio’s visual language into tokens and React controls, with one rule for the first paint and saved choices.'
date: '2026-11-16'
activity:
  label: 'Public development'
  start: '2026-10'
tags: ['design system', 'React', 'CSS']
projects: ['hyeonse-design-system']
draft: false
---

## When color values get copied around

[Hyeonse Design System](/en/about/#hyeonse-design-system) packages the colors and display settings from this portfolio for use in other personal projects. Copying color values into every screen means hunting down each use when a theme or accent changes. I gave visual roles such as surfaces, text and accents CSS tokens, and handled type and spacing the same way. The package also includes React controls for theme, accent, density, corners and motion.

Each site chooses its defaults, while a valid saved visitor preference takes priority. The public project record covers integration in this portfolio and Flow QA. They share the meaning of the tokens and the settings behavior without needing identical screens.

## Keeping the first paint consistent

If a theme applies only after React starts, the first paint can briefly show a different setting. The integration passes the same site defaults to an initial script and the React provider. It validates a saved choice before using it, responds to system theme and reduced-motion settings, and updates the current tab when a setting changes in another one.

If the initial script and provider start with different defaults, the page can change appearance during startup even when the visitor has made no new choice. Checking stored values and using one priority order also prevents a site default from unexpectedly replacing a valid preference.

## Finding colors outside the tokens

When creating or migrating a screen, it's easy for a color to bypass the tokens. The package's CLI checks raw CSS colors and redefinitions of shared tokens. It covers CSS, not every color in TypeScript, JavaScript or 3D materials. There is also a reusable skill for interface creation, migration and review, while design choices still require a person.

The public integration record describes 36 local Chrome view conditions before and after the portfolio migration, including preference restoration and cross-tab updates. I did not rerun those checks for this article. They do not establish behavior on physical devices or a deployed site. The package is installed from GitHub and has not been published to the npm registry.

## Public sources

- [Pinned README](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/README.md)
- [Preference implementation](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/src/preferences.ts) · [CSS audit scope](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/audit.md)
- [Portfolio integration record](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/verification.md)
