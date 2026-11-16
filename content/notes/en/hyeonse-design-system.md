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

## A visual language beyond one portfolio

[Hyeonse Design System](/en/about/#hyeonse-design-system) grew from the colors and display settings used in this portfolio. Copying color values into each screen makes a later theme or accent change depend on finding every instance of the same visual role. I separated those roles into CSS tokens for surfaces, text and accents, alongside type and spacing. The package also provides React controls for theme, accent, density, corners and motion.

Each site supplies its own defaults. A valid preference already saved by a visitor takes priority, so sharing the system does not force every site to start with identical choices. The public project record describes its use in this portfolio and Flow QA. What carries over is the vocabulary of roles and the behavior of the controls, rather than a requirement that their screens look the same.

## One rule before and after React starts

Applying a theme only after React runs can make the first paint disagree with the setting that follows. The integration therefore passes the same site defaults to an initial script and to the React provider. It checks a saved choice before using it, and also responds to system theme and reduced-motion settings. Changes made in another tab can update the current one.

The ordering of these values matters more than the number of controls. The initial script and provider need the same starting point; otherwise the page can change appearance during startup even when no visitor has made a new choice. Preserving a valid saved choice also keeps a site default from unexpectedly replacing the visitor’s preference.

## What the checks cover

The package includes a CLI that checks raw CSS colors and redefinitions of shared tokens. That gives a concrete check when creating or migrating a screen. Its documented scope is CSS: it does not inspect every color in TypeScript, JavaScript or 3D materials. A reusable skill helps with interface creation, migration and review, but human design decisions remain distinct from this automated check.

The public integration record describes 36 local Chrome view conditions around the portfolio migration, including preference restoration and cross-tab updates. I did not rerun those checks while writing this article. The record does not establish behavior on physical devices or a deployed site. The package is installed from GitHub; it is not presented as an npm registry release.

## Public sources

- [Pinned README](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/README.md)
- [Preference implementation](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/src/preferences.ts) · [CSS audit scope](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/audit.md)
- [Portfolio integration record](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/verification.md)
