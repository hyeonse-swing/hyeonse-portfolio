---
title: 'Turning error logs into regression test candidates'
description: 'Error to Test traces each source, leaves missing reproduction steps and expectations as questions, and separates run results by target.'
date: '2026-11-16'
updated: '2026-11-20'
activity:
  label: 'Public releases'
  start: '2026-10'
  end: '2026-11-20'
  point: '2026-10-13'
  pointLabel: 'v0.1.0 release'
tags: ['regression testing', 'error analysis', 'CLI']
projects: ['error-to-test']
draft: false
---

## What the error log cannot tell us

[Error to Test](/en/about/#error-to-test) reads Browser Error Log exports, pasted errors and JSONL to prepare regression test candidates locally. Seeing the same error repeatedly still doesn't tell me how to reproduce it or what should have happened. The tool starts by separating what the source actually shows from the questions a reviewer needs to answer.

With multiple input files, it records each file's byte hash and order and checks for duplicate ID collisions and partial input. It groups errors by signature and prepares a review report and candidate Flow QA suite. A case stays blocked if its reproduction setup or the source of its expected result is missing. Once a reviewer supplies that information, the input must be analyzed again before the case can run. Writing a candidate and verifying it in a browser are separate steps.

## When an old error disappears

Comparing an earlier analysis bundle with new input shows signatures observed only this time. If an old signature is absent, that alone does not mean the bug is fixed. The two collections may cover different periods or scopes, and one export may be partial. Scope warnings sit beside the comparison so “not observed here” stays distinct from “resolved.”

The same care applies when linking Flow QA runs back to error groups. The tool first compares the suite hash and case IDs in the analysis bundle and run report. Since two web or mobile targets can share a display name, v0.3.0 derives a SHA-256 fingerprint from the canonical target identity. It uses that fingerprint to distinguish each target's latest run and failure decision. Older reports without a fingerprint and reports with no target can still be read, but cannot count toward a particular target. A selected run also leaves omitted cases unfilled rather than borrowing an earlier pass.

## Reviewing candidates and finding the source event

Since v0.5.0, a reviewer can preview a candidate, edit missing details, confirm the review, and prepare a Flow QA workspace. Draft JSON survives a move between bundles, and approval requires a confirmation checkbox. A fresh public npm installation produced case files byte-for-byte identical to the reviewed files.

Since v0.5.1, `trace --event-id ID --project NAME` distinguishes errors with the same ID in different projects. The review screen also shows the source candidates linked by a shared rule. In a public-package check with two projects sharing an event ID, searching by ID found both groups and adding the project found one. v0.5.2 corrected the npm Korean-guide link to the GitHub document.

## Where the result stops

The public v0.3.0 record lists 203 local tests, type checking, a build and an isolated installed-package check. There is also a controlled Chromium integration record from October 2026. I did not rerun those checks for this article, and they do not cover the full flow with authenticated services or native devices.

The target fingerprint identifies which run a result belongs to; it does not anonymize it. Whoever uses the tool needs to review sensitive information in source errors and the execution environment's permissions. These results describe candidates and observed runs. Confirming a fix takes evidence beyond an absent signature in one collection.

## Public sources

- [Pinned README](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/README.ko.md)
- [Input source handling](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/input-source.ts) · [Signature comparison](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/comparison.ts) · [Result linking](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/results.ts)
- [Pinned v0.3.0 release and verification record](https://github.com/hyeonse-swing/error-to-test/blob/8fa0651ea18833206423010e1d71be99537afea6/docs/releases.md)
- [v0.5.0 release](https://github.com/hyeonse-swing/error-to-test/releases/tag/v0.5.0) · [v0.5.2 release and Korean guide](https://github.com/hyeonse-swing/error-to-test/releases/tag/v0.5.2)
