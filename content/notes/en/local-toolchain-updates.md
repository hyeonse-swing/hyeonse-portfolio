---
title: 'Recent changes to the tools that carry errors into tests'
description: 'Browser Error Log gained SQLite export, Error to Test separated results by target, and Flow QA improved reports and storage failure feedback.'
date: '2026-11-16'
activity:
  label: 'Releases covered'
  start: '2026-11-16'
tags: ['error collection', 'QA', 'local tools']
projects: ['browser-error-log', 'error-to-test', 'flow-qa']
draft: false
---

## Moving from error logs to tests

[Browser Error Log](/en/about/#personal-projects) collects browser errors in a self-hosted collector. Error to Test reads those records and manual reports to prepare regression test candidates, then Flow QA runs reviewed cases in a browser and records the outcome. An error log still cannot supply reproduction conditions or the correct expected behavior on its own. Questions for a reviewer need to stay open, with each judgment traceable to its input and run.

Three public releases from November 2026 changed different parts of that path. Browser Error Log gained a way to export SQLite records, Error to Test became more precise about which execution target a result belongs to, and Flow QA made reports easier to explore while warning about unsaved display settings. Each change lives in its own local tool.

## Exporting records and connecting results

SQLite is the Browser Error Log collector's default store. Its CLI export states the storage choice and size limit explicitly and reads records without changing the source database. An analysis tool can receive those events without writing to the collector's database. The existing JSONL storage path remains separate.

When Error to Test links Flow QA runs to source error groups, a display name alone is unreliable: two web or mobile targets may share it. A SHA-256 fingerprint derived from Flow QA's canonical target identity separates the latest run, case counts and failure decision by target. Older results without a fingerprint and reports without a target remain readable, but cannot count toward a specific target. Omitted cases in a selected run do not inherit earlier passes.

Flow QA's detailed report can filter for cases with at least two attempts and download the IDs visible under the current filters. The downloaded handoff list is narrower than the full Markdown and JSON reports, which keep their original scope. If browser storage cannot be read or written, a display preference still applies in the current tab, but the UI says it was not saved. A later successful save or reset clears the warning.

## Checks in the release records

Flow QA's release record lists 118 local tests, eight UI checks, fresh-install package checks and seven passing browser cases; storage failure and recovery were exercised with a browser fixture. Error to Test records 203 local tests, type checking, a build and an isolated installed-package check. The Browser Error Log change records an original database hash check and collector restart after export.

A target fingerprint identifies a target; it does not anonymize it. The information carried in errors and the permissions of the operating environment still need review when applying the tools.

## Public sources

- [Browser Error Log v0.2.11 release](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.11) · [SQLite export change](https://github.com/hyeonse-swing/browser-error-log/commit/62be06359dbb0c706925bb2508ed2cdfcbc37007)
- [Error to Test v0.3.0 release](https://github.com/hyeonse-swing/error-to-test/releases/tag/v0.3.0) · [pinned verification record](https://github.com/hyeonse-swing/error-to-test/blob/8fa0651ea18833206423010e1d71be99537afea6/docs/releases.md)
- [Flow QA v0.8.9 release](https://github.com/hyeonse-swing/flow-qa/releases/tag/v0.8.9) · [pinned verification record](https://github.com/hyeonse-swing/flow-qa/blob/413c07c615bc2f3b02ead438e647147be28088a6/docs/releases.md)
