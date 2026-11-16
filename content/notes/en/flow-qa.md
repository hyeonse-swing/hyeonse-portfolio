---
title: 'Reviewing flows before running them in the browser'
description: 'Flow QA leaves missing success conditions as questions, runs reviewed cases, and records which cases a selected run covered.'
date: '2026-11-16'
activity:
  label: 'Public releases'
  start: '2026-10'
  end: '2026-11'
  point: '2026-10-08'
  pointLabel: 'v0.1.0-alpha.1 release'
tags: ['QA', 'browser testing', 'reports']
projects: ['flow-qa']
draft: false
---

## A click sequence is not enough

[Flow QA](/en/about/#flow-qa) turns user flows into reviewable cases and browser runs into reports locally. A flow document may say which buttons to press while leaving out the success condition or the environment in which to check it. A passing automated run would then say little about the behavior the flow was meant to cover.

That's why planning and execution are separate. Flow QA keeps the source flow's hash, checks that case steps use allowed actions, and requires explicit assertions. An unanswered question stays visible and blocks its case. Fixed steps can run without a model, while `tester-army/e2e` handles the actual browser execution. Flow QA ties the result back to the input and expectations that were reviewed.

## A partial run produces partial results

Flow QA can run selected cases or prepare reruns of failed and error cases. It retains the full suite identity alongside the selection made for this run. Omitted cases are not passes, and a comparison of two runs does not fill missing results with earlier passes.

Detailed reports keep attempts and evidence with each case. You can search saved runs and cases inside a report, then filter for cases with at least two attempts. The IDs visible under the current filter can be downloaded for a handoff. That list reflects only the filtered view; the full Markdown and JSON reports keep their original scope.

## When a display setting fails to save

If browser storage cannot be read or written, a display change may apply only in the current tab. The UI says it was not saved. A later successful save or a reset clears that warning, so the current view isn't mistaken for a preference that will survive another visit.

The public v0.8.9 record lists 118 local tests, eight UI checks, fresh-install package checks and seven passing browser cases. Storage failure and recovery were checked in a browser fixture. I did not rerun those checks for this article. The record does not cover authentication against a real service, iOS or Android devices, or the effects of browser policies and permissions in a user's environment.

## Public sources

- [Pinned architecture document](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/docs/architecture.md)
- [Case selection implementation](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/src/case-selection.ts) · [Local UI guide](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/docs/ui.md)
- [Pinned v0.8.9 release and verification record](https://github.com/hyeonse-swing/flow-qa/blob/413c07c615bc2f3b02ead438e647147be28088a6/docs/releases.md)
