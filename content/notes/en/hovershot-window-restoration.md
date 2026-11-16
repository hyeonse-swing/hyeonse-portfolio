---
title: 'Putting HoverShot floating windows back on the right monitor'
description: 'How a multi-monitor placement issue led to reapplying global coordinates after AppKit creates a floating panel.'
date: '2026-11-16'
activity:
  label: 'v0.2.2 release'
  start: '2026-10-12'
tags: ['macOS', 'AppKit', 'screen capture']
projects: ['hovershot']
draft: false
---

## When a capture appears on another screen

[HoverShot](/en/about/#personal-projects) is a macOS menu bar app that shows area, window and timed captures in floating panels above other apps. It also offers annotations, OCR search in the shot library, and trimming or GIF export for area and window recordings. People can choose a panel's opacity and click-through behavior, then save its position and state.

For a floating reference, placement matters alongside the image itself. If a shot taken on one monitor appears on another, the person has to find and move it before continuing. The public v0.2.2 release addresses a case where v0.2.1 calculated the target position for an area or window capture, but AppKit changed the panel's position while creating the actual window. The same path also needed to preserve the position of a panel the user had moved and opened again.

## Coordinates and window creation order

The change is about the order of operations, not merely a different coordinate calculation. HoverShot first determines the intended position in global screen coordinates. After it creates and configures the AppKit panel, it reapplies that position. AppKit can adjust the position during panel creation, so the final display step has to restore the intended coordinates.

The rule covers both new capture panels and panels reopened after a user move. A new result should appear on the monitor that was captured; a reopened panel should follow the saved user position. Opacity and click-through remain user choices. Position restoration carries the existing screen context forward instead of deciding how the person should arrange their workspace.

## Observed behavior and limits

The release record says the pre-fix AppKit creation and display check reproduced a failure on an external monitor in a three-monitor setup. After the change, multiple result panels were displayed across three connected monitors to check their target screens. A move-and-reopen check and existing regressions brought the total to 25 passing tests. The record also lists a Release build, app signature verification and ZIP integrity check. I did not rerun those checks while writing this note.

The panel display checks used synthetic images. They do not verify the complete real screen capture and macOS permission flow in a user's environment. The public ZIP targets Apple Silicon on macOS 14 or later; recording requires macOS 15 or later. It is packaged with a local development signature and has not been notarized by Apple, which matters when installing it.

## Public sources

- [HoverShot v0.2.2 release and verification scope](https://github.com/hyeonse-swing/hovershot-macos/releases/tag/v0.2.2)
- [Floating window implementation at the pinned source commit](https://github.com/hyeonse-swing/hovershot-macos/blob/93b8f824ec84eb8d1fc32c257e077d3212784273/Apps/HoverShotMac/FloatingShots/FloatingWindowCoordinator.swift)
- [README at the pinned source commit](https://github.com/hyeonse-swing/hovershot-macos/blob/93b8f824ec84eb8d1fc32c257e077d3212784273/README.md)
