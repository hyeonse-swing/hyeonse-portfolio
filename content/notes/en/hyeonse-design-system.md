---
title: 'Keeping display preferences consistent across projects'
description: 'Extracting the portfolio’s visual language into tokens and React controls, with one rule for the first paint and saved choices.'
date: '2026-11-16'
updated: '2026-11-20'
activity:
  label: 'Public development'
  start: '2026-10'
  end: '2026-11-20'
tags: ['design system', 'React', 'CSS']
projects: ['hyeonse-design-system']
draft: false
---

## When color values get copied around

[Hyeonse Design System](/en/about/#hyeonse-design-system) packages the colors and display settings from this portfolio for use in other personal projects. Copying color values into every screen means hunting down each use when a theme or accent changes. I gave visual roles such as surfaces, text and accents CSS tokens, and handled type and spacing the same way. The package also includes React controls for theme, accent, density, corners and motion.

Each site chooses its defaults, while a valid saved visitor preference takes priority. The public project record covers integration in this portfolio and Flow QA. They share the meaning of the tokens and the settings behavior without needing identical screens.

In v0.2.0, the read-only `hds` CLI lets a consuming project look up the public APIs, tokens and examples in its installed package version. The package also includes a catalog and usage docs, so the reference matches that version. The [public showcase](https://design-system.hyeonse.dev) shows the tokens and settings in use. In v0.2.0, general buttons, inputs and cards were examples rather than exported React components.

## Keeping the first paint consistent

If a theme applies only after React starts, the first paint can briefly show a different setting. The integration passes the same site defaults to an initial script and the React provider. It validates a saved choice before using it, responds to system theme and reduced-motion settings, and updates the current tab when a setting changes in another one.

If the initial script and provider start with different defaults, the page can change appearance during startup even when the visitor has made no new choice. Checking stored values and using one priority order also prevents a site default from unexpectedly replacing a valid preference.

## Finding colors outside the tokens

When creating or migrating a screen, it's easy for a color to bypass the tokens. The package's CLI checks raw CSS colors and redefinitions of shared tokens. It covers CSS, not every color in TypeScript, JavaScript or 3D materials. There is also a reusable skill for interface creation, migration and review, while design choices still require a person.

The integration record describes 36 local Chrome view conditions before and after the portfolio migration, including preference restoration and cross-tab updates. The package is installed from GitHub.

The newer lookup interface has separate type, build and consuming-example checks, 17 tests, and installed-package checks of the CLI, catalog and examples.

## Sharing size across components and layouts

On November 17, 2026, I extended sizing to inputs, cards, tables, dialogs and layouts. A `SizeProvider`, `Stack` or `Grid` can set a size from `xs` to `xl` for its contents, while individual components can override it. Menus and dialogs retain that scope when rendered through a portal.

The default button is 36px high with a fine pointer, while touch devices keep a minimum 44px target even for smaller variants. Local checks covered sizing, portals and narrow layouts in three browser engines. In November 2026, macOS Safari 27 with VoiceOver confirmed the HDS 0.4.8 modal's close button, focus-guard names and focus returning to the opener after Escape. The current [showcase and installation guide](https://design-system.hyeonse.dev/#start) provide the components alongside their [verification scope](https://design-system.hyeonse.dev/docs/code-freeze.md).

## Using a table for held returns

HDS 0.5.0 added a `DataTable` with sorting, row selection and pagination. I used it for Return Desk's held and reinspection queue and checked that selections survive a page change and focus returns after table interactions. The public showcase, live Return Desk page and a fresh installation of Return Desk 0.2.1 passed Chromium, Firefox and WebKit checks. The live page was also checked at 390px. The Safari and VoiceOver table announcement was checked in a local showcase using the same component.

## Public sources

- [v0.2.0 README](https://github.com/hyeonse-swing/hyeonse-design-system/blob/090e10e066b933c3c9565b4553c4c35ace45eb99/README.md) · [AI usage guide](https://github.com/hyeonse-swing/hyeonse-design-system/blob/090e10e066b933c3c9565b4553c4c35ace45eb99/docs/ai.md)
- [Earlier preference implementation](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/src/preferences.ts) · [CSS audit scope](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/audit.md)
- [Earlier portfolio integration record](https://github.com/hyeonse-swing/hyeonse-design-system/blob/d04bda5240e1c22bfc4dc165d8a34fa753ac3dd6/docs/verification.md)
- [Public HDS 0.5.0 archive](https://design-system.hyeonse.dev/releases/hyeonse-design-system-0.5.0.tgz) · [Live Return Desk](https://return-desk.hyeonse.dev/)
