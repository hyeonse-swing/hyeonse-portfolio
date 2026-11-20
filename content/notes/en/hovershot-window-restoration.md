---
title: 'Putting HoverShot floating windows back on the right monitor'
description: 'How a multi-monitor placement issue led to reapplying global coordinates after AppKit creates a floating panel.'
date: '2026-11-16'
updated: '2026-11-20'
activity:
  label: 'Public releases'
  start: '2026-10-12'
  end: '2026-11-20'
  point: '2026-11-20'
  pointLabel: 'v0.2.3 release'
tags: ['macOS', 'AppKit', 'screen capture']
projects: ['hovershot']
draft: false
---

## When the capture panel lands on another screen

[HoverShot](/en/about/#personal-projects) is a macOS menu bar app that shows area, window and timed captures in floating panels above other apps. It supports annotations and OCR search in the shot library, plus trimming or GIF export for area and window recordings. A person can set each panel's opacity and click-through behavior and save its position and state.

With multiple monitors, a capture is less useful if its floating panel opens on a different screen and has to be moved back. In v0.2.1, HoverShot calculated the target position for an area or window capture, but AppKit could change that position while creating the actual panel. The public v0.2.2 release fixes that path and also checks that a moved panel reopens where the user left it.

## Applying coordinates after panel creation

HoverShot determines the intended position in global screen coordinates first. It then creates and configures the AppKit panel before applying those coordinates again. AppKit can adjust the panel position during creation, so the final display step needs that second placement.

The same sequence applies to new capture panels and panels reopened after a move. New results use the captured monitor; reopened panels use the saved position. Opacity and click-through stay under the user's control.

## What the three-monitor check covered

The release record describes a failed pre-fix AppKit creation and display check on an external monitor in a three-monitor setup. After the change, multiple result panels were displayed across the three monitors to check their target screens. A move-and-reopen check and existing regressions brought the total to 25 passing tests. The record also lists a Release build, app signature verification and ZIP integrity check. I did not rerun those checks for this article.

The v0.2.2 panel display checks used synthetic images, so those checks did not cover the complete real screen capture and macOS permission flow in a user's environment. The public ZIP targets Apple Silicon on macOS 14 or later; recording requires macOS 15 or later. It has a local development signature and has not been notarized by Apple, which is relevant when installing it.

## Checking GIF duration in v0.2.3

The later public v0.2.3 release aligns exported GIF frame counts with recording duration and distributes the rounding error from 0.01-second frame delays. Two synthetic MOV files retained durations of 0.40 and 0.84 seconds after GIF export, and 29 Swift tests passed.

In a separate device check, the public ZIP ran on an Apple Silicon Mac with macOS 26.6.2. I captured a test window, played a recording of that window, and exported a GIF. The original video and the 60-frame GIF both lasted 9.92 seconds, with the test color bars changing across frames. This check used a test window and previously granted screen-recording permission.

## Public sources

- [HoverShot v0.2.2 release and verification scope](https://github.com/hyeonse-swing/hovershot-macos/releases/tag/v0.2.2)
- [HoverShot v0.2.3 release](https://github.com/hyeonse-swing/hovershot-macos/releases/tag/v0.2.3)
- [Floating window implementation at the pinned source commit](https://github.com/hyeonse-swing/hovershot-macos/blob/93b8f824ec84eb8d1fc32c257e077d3212784273/Apps/HoverShotMac/FloatingShots/FloatingWindowCoordinator.swift)
- [README at the pinned source commit](https://github.com/hyeonse-swing/hovershot-macos/blob/93b8f824ec84eb8d1fc32c257e077d3212784273/README.md)
