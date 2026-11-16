---
title: 'Connecting flow descriptions to execution evidence'
description: 'How Flow QA separates case review from browser execution and preserves the scope of selected runs.'
date: '2026-11-16'
tags: ['QA', 'browser testing', 'reports']
projects: ['flow-qa']
draft: false
---

## The review step between a flow and a run

[Flow QA](/en/about/#flow-qa) is a local tool for turning user flows into reviewable cases and browser runs into reports. A flow may describe which button to press without saying what success means or which conditions make the result valid. Running that description directly could produce a passing test without establishing that it checked the intended behavior.

I separated planning from execution for that reason. Flow QA keeps a hash of the source flow, checks that case steps belong to an allowed set, and requires explicit assertions. An unanswered question stays visible and blocks its case instead of being converted into an invented expectation. Fixed steps can run without a model. The actual browser execution is delegated to `tester-army/e2e`; Flow QA prepares the input and keeps the result tied to what was reviewed.

## A selected run has a selected scope

Rerunning every case is not always useful. Flow QA can execute selected cases and prepare reruns of failed or error cases. The run still retains the full suite identity and records which cases were selected. A case omitted from a run is not a pass. When comparing two runs, the tool does not fill a missing result with a pass from an earlier execution.

Detailed reports keep attempts and evidence with their cases. Saved runs and report contents can be searched, and cases with at least two attempts can be filtered. The IDs currently visible under a report filter can be downloaded for a handoff. That list reflects the filtered view; it does not change the scope of the full Markdown or JSON report. This distinction matters when a short handoff list is read alongside an entire run.

## When display settings cannot be saved

The local UI can encounter browser storage read or write failures. A display change still applies in the current tab, but the UI explains that it has not been saved. A successful later save or a reset clears the warning. The message makes the difference between a temporary view and a preference that will survive another visit visible to the person using the report.

The public v0.8.9 record lists 118 local tests, eight UI checks, fresh-install package checks and seven passing browser cases. Storage failure and recovery were exercised in a browser fixture. Those are previously published checks, not tests rerun for this article. Authentication against a real service, iOS or Android devices, and behavior under actual browser policies and permissions remain outside that record.

## Public sources

- [Pinned architecture document](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/docs/architecture.md)
- [Case selection implementation](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/src/case-selection.ts) · [Local UI guide](https://github.com/hyeonse-swing/flow-qa/blob/45aa9dce110f9a2b1397b11b14fc2e3a47810d12/docs/ui.md)
- [Pinned v0.8.9 release and verification record](https://github.com/hyeonse-swing/flow-qa/blob/413c07c615bc2f3b02ead438e647147be28088a6/docs/releases.md)
