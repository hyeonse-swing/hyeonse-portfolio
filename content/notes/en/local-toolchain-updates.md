---
title: 'Recent changes across three local error and QA tools'
description: 'How public releases of Browser Error Log, Error to Test and Flow QA handle data export, result scope and storage failures.'
date: '2026-11-16'
activity:
  label: 'Releases covered'
  start: '2026-11-16'
tags: ['error collection', 'QA', 'local tools']
projects: ['browser-error-log', 'error-to-test', 'flow-qa']
draft: false
---

## Where the tools meet

[Browser Error Log](/en/about/#personal-projects) collects browser errors and stores them in a self-hosted collector. Error to Test reads those errors and manual reports to prepare regression test candidates. Flow QA runs reviewed cases in a browser and records the outcome. Connecting the tools does not make an error log a complete test: reproduction conditions and the correct expected behavior still need a human source. The pipeline has to keep questions open and show which input and run support each judgment.

Three public releases in November 2026 address different boundaries in that flow. Browser Error Log adds a way to move SQLite records into another tool. Error to Test narrows how linked results are read for a particular execution target. Flow QA improves report exploration and warns when display preferences cannot be saved. These are changes in separate local tools; this note describes what their public source and release records establish.

## Export and result scope

Browser Error Log now offers a CLI export for records held in the collector's default SQLite storage. It makes the storage choice and size limit explicit and avoids changing the source database. This gives an analysis tool a way to receive those events without writing to the collector's database. It is a read-only route for SQLite records alongside the existing JSONL storage path.

Error to Test no longer relies on a target name alone when linking Flow QA runs to source error groups. Two web or mobile targets can share a display name. A SHA-256 fingerprint derived from Flow QA's canonical target identity scopes the latest run, case counts and failure decision to the selected target. Older results without that fingerprint and reports without a target remain readable, but they cannot be treated as results for a specific target. Cases omitted from a selected run are not filled in with passes from a previous run. Readers can therefore examine both the outcome and the target and execution scope behind it.

In Flow QA, the detailed report can filter for cases with at least two recorded attempts and download the IDs currently visible under its filters. That list helps with a QA handoff; it does not narrow the complete Markdown or JSON report. When browser storage cannot be read or written, display preferences still apply in the current tab, and the UI says they have not been saved. A later successful save or reset clears the warning.

## What the records verify

Flow QA's release record lists 118 local tests, eight UI checks, fresh-install package checks and seven passing browser cases. Its storage failure and recovery were exercised with a browser fixture. Error to Test records 203 local tests, type checking, a build and an isolated installed-package check. The Browser Error Log change describes a check of the original database hash and collector restart after export. These are the projects' published checks, not tests rerun while writing this note.

The records do not establish behavior with authenticated services, native devices, real browser policy restrictions or delivery guarantees in production. A target fingerprint is an identifier, not anonymization. Anyone applying the tools still needs to review the information carried in errors and the permissions of their own environment.

## Public sources

- [Browser Error Log v0.2.11 release](https://github.com/hyeonse-swing/browser-error-log/releases/tag/v0.2.11) · [SQLite export change](https://github.com/hyeonse-swing/browser-error-log/commit/62be06359dbb0c706925bb2508ed2cdfcbc37007)
- [Error to Test v0.3.0 release](https://github.com/hyeonse-swing/error-to-test/releases/tag/v0.3.0) · [pinned verification record](https://github.com/hyeonse-swing/error-to-test/blob/8fa0651ea18833206423010e1d71be99537afea6/docs/releases.md)
- [Flow QA v0.8.9 release](https://github.com/hyeonse-swing/flow-qa/releases/tag/v0.8.9) · [pinned verification record](https://github.com/hyeonse-swing/flow-qa/blob/413c07c615bc2f3b02ead438e647147be28088a6/docs/releases.md)
