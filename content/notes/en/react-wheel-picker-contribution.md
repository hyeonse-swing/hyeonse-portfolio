---
title: 'Keeping a wheel selection aligned as options change'
description: 'A small react-wheel-picker contribution for selection position after dynamic option updates.'
date: '2026-11-16'
activity:
  label: 'PR merged'
  start: '2025-06-30'
tags: ['Open source', 'React', 'Bug fix']
projects: ['opensource']
draft: false
---

## When the option list changes

A wheel picker can keep the same selected value while that value moves to a different position in a new option list. In `react-wheel-picker`, the selection could remain at its previous index. The [public archive](/en/#archive-opensource) and [merged PR #54](https://github.com/ncdai/react-wheel-picker/pull/54) show the issue and the fix.

I changed one line in the dependency array of the `useEffect` that calls `selectByValue(value)`. I added `options` to the existing `value` and `valueProp` dependencies, so changing the list also realigns the wheel to the selected value. That one line is the PR diff, merged on June 30, 2025.
