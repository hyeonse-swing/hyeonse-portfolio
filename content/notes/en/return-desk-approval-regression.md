---
title: 'Tracing one return approval error into a regression test'
description: 'A synthetic HTTP 503 became a captured error, a reviewed expectation and two runs of the same case.'
date: '2026-11-19'
tags: ['return review', 'error tracing', 'regression testing']
projects: ['return-review-console', 'browser-error-log', 'error-to-test', 'flow-qa']
draft: false
---

I injected a local HTTP 503 into the approval request for the synthetic Return Desk record `RET-2421`. The screen showed an approval error and kept the return **pending**. I used the project's QA acceptance rule, **a successful approval request must display “승인 완료” (Approved)**, as the reviewed expectation. The resulting case failed while the fault was active and passed after I disabled it.

## Checking the screen and request

The capture shows the synthetic return's approval dialog with a request failure message. Browser Error Log recorded an **HTTP 503** for `POST /api/returns/RET-2421/approve`. The [captured error](#source-error) below provides its ID. The screenshot shows what the reviewer saw, while the event identifies the failing request.

## Choosing the expected result

Error to Test used the captured error to prepare a candidate. The expectation came from the [Return Desk QA acceptance guide](https://github.com/hyeonse-swing/return-review-console/blob/ee41355585ac542a27585551c796011945d86b8e/qa/README.md). When the approval API succeeds, a pending return must display “승인 완료” (Approved). The [reviewed case](#reviewed-case) opens `RET-2421`, checks the approval dialog, confirms approval and asserts that status text.

## Running the same case twice

The [fault run](#failed-run) expected “승인 완료” but observed “검수 대기” (Pending) in its final assertion. The required-pass gate exited **2**. After I disabled the local 503 injection, the [recovery run](#recovery-run) passed with the **same case ID and suite SHA-256**. Its gate exited **0**.

The evidence below puts the captured error ID, case ID, suite hash and two run IDs in one place so the relationship can be checked. These values come from **one local Chromium QA session on November 19, 2026**. The return, names and screen data are synthetic. The recovery run started after I turned off the injected fault on the local API.
