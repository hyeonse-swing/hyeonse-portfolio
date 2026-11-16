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

## The value can stay while its position moves

When a wheel picker's options change dynamically, the same selected value may occupy a different position in the list. In `react-wheel-picker`, the displayed selection could remain at the old index after such a change. The [public archive](/en/#archive-opensource) and [merged PR #54](https://github.com/ncdai/react-wheel-picker/pull/54) describe the issue and the contribution.

I changed one line in the dependency array of the `useEffect` that calls `selectByValue(value)`. Adding `options` to the existing `value` and `valueProp` dependencies makes the effect align the wheel to the selected value when the option list changes as well. The PR diff shows this one-line change, merged on June 30, 2025.

This is a focused state synchronization fix. The public PR does not record separate performance measurements or regression checks across every use case. I describe the dynamic-option selection issue it addresses, without treating it as evidence of improved reliability for the whole library.
