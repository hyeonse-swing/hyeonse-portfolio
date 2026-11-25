---
title: 'Collecting only the error context an app needs'
description: 'Browser Error Log lets an app choose context while bounding its browser queue and self-hosted storage and query scope.'
date: '2026-11-16'
updated: '2026-11-20'
activity:
  label: 'Public releases'
  start: '2026-10'
  end: '2026-11-20'
  point: '2026-10-12'
  pointLabel: 'v0.1.5 release'
tags: ['error collection', 'TypeScript', 'SQLite']
projects: ['browser-error-log']
draft: false
---

## An error message needs context

[Browser Error Log](/en/about/#browser-error-log) combines a browser SDK, a self-hosted collector and a viewer. An error message rarely tells you which page it came from or what happened just before it. Keeping every request detail would also mean storing and protecting more data. The app can choose the context it needs while the operator controls collection and storage.

The SDK captures global errors, unhandled promise rejections and network failures. Navigation and network breadcrumbs are opt-in. It leaves request bodies, headers and cookies out of automatic context, and an app can filter further through URL sanitization and the `beforeBreadcrumb` and `beforeSend` hooks. The optional React Error Boundary adapter and shared event contract are published as separate `@ihyeon` packages. The SDK documentation also says that custom transport needs an endpoint before network collection can be enabled.

## Limits along the collection path

The browser queue has a size limit and a retry limit. The Node.js micro-server collector writes to SQLite or rotating JSONL and limits retention and query scope. The viewer lets you narrow records by project, error type and date, then inspect stacks and JSON snapshots. Its chart counts received logs, which says nothing on its own about user count or the application's error rate.

SQLite is the default store, but records still need a way into other analysis tools. The v0.2.11 CLI export states the storage choice and size limit explicitly and reads without modifying the source database. The public change record describes checking the original hash and restarting the collector after export.

## Passing original locations and event references onward

Since v0.2.21, release-specific source maps can resolve an error in a compressed stack to its original location. The same `app.js` may resolve to a different source file for each release. In the public viewer, synthetic errors from a local SQLite collector resolved to their respective sources in three browsers. Removing one release's map left the other release's location intact.

In v0.2.22, `captureExceptionWithReference` returns the project and event ID for a captured error. The React Error Boundary passes the same reference through `onCapture`, and the Protocol package can extract just those two lookup fields. A synthetic error run against freshly installed public npm packages confirmed that the React callback and transmitted event shared the reference. The ID helps locate an event; it is not confirmation that the server stored it.

## Before using it in a service

The public repository records local checks for the packages, micro-server and Chromium/WebKit delivery. The SQLite export check appears in the later v0.2.11 change record. Retries are bounded.

Even with a self-hosted collector, error messages and app-supplied values can contain personal information. URL filtering and hooks cannot prove that every such value has been removed. The operator still has to decide what to collect and retain, and check authentication and access permissions in the actual deployment.

## Public sources

- [Pinned README](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/README.ko.md) · [Browser SDK](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/packages/browser/src/index.ts)
- [v0.2.11 release](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.11) · [SQLite export change](https://github.com/hyeonse-swing/browser-error-log/commit/62be06359dbb0c706925bb2508ed2cdfcbc37007)
- [v0.2.21 release and source-map example](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.21) · [v0.2.22 release](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.22)
