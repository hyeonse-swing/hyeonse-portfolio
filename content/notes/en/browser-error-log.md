---
title: 'Owning the path from browser error to stored record'
description: 'How Browser Error Log makes context collection optional and sets limits on delivery, retention and export.'
date: '2026-11-16'
activity:
  label: 'Public releases'
  start: '2026-10'
  end: '2026-11'
tags: ['error collection', 'TypeScript', 'SQLite']
projects: ['browser-error-log']
draft: false
---

## Context without collecting everything

[Browser Error Log](/en/about/#browser-error-log) combines a browser SDK, self-hosted collector and viewer. An error message alone often leaves out the page and preceding events needed for investigation. Collecting every request detail, however, increases the information an operator has to store and protect. This tool lets an app choose what context to collect while keeping the collection and storage path under its operator’s control.

The SDK captures global errors, unhandled promise rejections and network failures. Navigation and network breadcrumbs are opt-in. Automatic context omits request bodies, headers and cookies; URL sanitization and `beforeBreadcrumb` and `beforeSend` hooks let an app filter further. An optional React Error Boundary adapter and a shared event contract are published as separate `@ihyeon` packages. The public SDK documentation also specifies that custom transport needs an endpoint to enable network collection.

## Bounds from the queue to storage

The browser side limits its transmission queue and retries. The Node.js micro-server collector stores events in SQLite or rotating JSONL, with retention and query limits. The viewer narrows records by project, error type and date and shows stacks and JSON snapshots. Its collection chart counts received logs; it is not a measure of users or an application error rate.

When SQLite is the default store, the records still need a route to another analysis tool. The v0.2.11 CLI export makes the storage choice and size limit explicit and does not modify the source database. It is a read-only way to move stored events without asking another tool to edit the collector’s database. The public change record describes checking the source hash and restarting the collector after export.

## What remains an operating decision

The public repository records local package, micro-server and Chromium/WebKit delivery checks. The SQLite export check belongs to the later v0.2.11 change. I did not rerun either set of checks while writing this article. A bounded retry policy avoids endless attempts; it does not guarantee that every error reaches storage.

Self-hosting does not make the collected data automatically anonymous. Error messages or values supplied by an app may still contain personal information, and URL filtering plus hooks do not prove complete removal. Authentication, access permissions and retention policy need to be assessed in the actual deployment. The toolkit gives an operator control over those decisions without settling them for every application.

## Public sources

- [Pinned README](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/README.ko.md) · [Browser SDK](https://github.com/hyeonse-swing/browser-error-log/blob/413c8d1e42532a84a314e6b1003b52f9eb64a091/packages/browser/src/index.ts)
- [v0.2.11 release](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.11) · [SQLite export change](https://github.com/hyeonse-swing/browser-error-log/commit/62be06359dbb0c706925bb2508ed2cdfcbc37007)
