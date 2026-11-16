---
title: 'The review boundary between an error and a test'
description: 'How Error to Test tracks source inputs, leaves unknown expectations as questions and reads results for the right target.'
date: '2026-11-16'
activity:
  label: 'Public releases'
  start: '2026-10'
  end: '2026-11'
tags: ['regression testing', 'error analysis', 'CLI']
projects: ['error-to-test']
draft: false
---

## An error is not yet a test

[Error to Test](/en/about/#error-to-test) is a local tool that turns Browser Error Log exports, pasted errors and JSONL into regression test candidates. Repeated occurrences of an error message do not tell us how to reproduce it or what the correct behavior should be. Instead of immediately producing a runnable script, the tool separates what the source establishes from the questions a reviewer still needs to answer.

When it reads multiple files, it records each input’s byte hash and order and checks for duplicate ID collisions and partial input. It groups errors by signature, then prepares a review report and a candidate Flow QA suite. If the setup or source for an expected result is missing, the case remains blocked. A reviewer supplies the missing information and analyzes again before execution. Candidate generation and browser verification are intentionally separate steps.

## Reading differences between two collections

Comparing a previous analysis bundle with current input can highlight signatures seen only in the current collection. A signature present only in the previous bundle, however, is not proof that the problem was fixed. The collections may cover different periods or scopes, and one export may be partial. Error to Test keeps collection-scope warnings alongside the comparison so “not observed here” is not silently turned into “resolved.”

Linking Flow QA results back to errors has a similar source check. The tool compares the suite hash and case IDs in the analysis bundle and run report before showing results for source error groups. Two web or mobile targets can share a display name. In v0.3.0, a SHA-256 fingerprint derived from the canonical target identity scopes the latest run and failure decision to the actual target. Older reports without a fingerprint and reports without target information remain readable, but are not counted as results for a particular target. A case omitted from a selected run is not filled with an earlier pass.

## What the public checks establish

The public v0.3.0 record lists 203 local tests, type checking, a build and an isolated installed-package check. A separate controlled Chromium integration record dates from October 2026. I did not rerun those checks for this article. They also do not establish the full flow against authenticated services or native devices.

The target fingerprint identifies result scope; it is not an anonymization method. A team using the tool still needs to review sensitive information in source errors and the permissions of its execution environment. The output is a set of candidates and a bounded account of observed runs. Declaring an error fixed requires evidence beyond the absence of its signature from one collection.

## Public sources

- [Pinned README](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/README.ko.md)
- [Input source handling](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/input-source.ts) · [Signature comparison](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/comparison.ts) · [Result linking](https://github.com/hyeonse-swing/error-to-test/blob/514616f3cb7a1c31845b07de6faad26f14b8f935/src/results.ts)
- [Pinned v0.3.0 release and verification record](https://github.com/hyeonse-swing/error-to-test/blob/8fa0651ea18833206423010e1d71be99537afea6/docs/releases.md)
