---
title: 'Following playback and Discord activity with YouTube Music Companion'
description: 'How a macOS menu bar app follows an installed YouTube Music player, shows a mini player, and shares current-track activity with Discord.'
date: '2026-11-20'
activity:
  label: 'v0.18.0 release'
  start: '2026-11-20'
tags: ['macOS', 'Swift', 'music']
projects: ['yt-music-companion']
draft: false
---

## Following the installed player

[YouTube Music Companion](/en/about/#yt-music-companion) is a macOS menu bar app for an installed YouTube Music player. Its mini player shows the current title, artist, cover, and playback progress, and can be docked to a screen edge or closed. It also guides installation in Chrome, Edge, or Brave, then finds and opens the installed player.

Headset playback controls can reach another audio app, so I checked which player macOS controlled. On an Apple Silicon Mac running public v0.16.3, I played YouTube Music and QuickTime together and pressed a physical Bluetooth headset button. `Pause` reached YouTube Music while Companion was running. After quitting Companion and releasing its priority, `Pause` reached QuickTime. I compared the command target with both players' actual states.

## Checking tracks and links in Discord

Public v0.18.0 shares the current track and album art as Discord activity and links to a verified YouTube Music track URL. It can also read a new title and URL after the player window moves into the background. An optional weekly count shows the number of distinct tracks by the current artist since Monday in the Mac's local time. It is off by default and excludes private tracks and manual activity.

I switched tracks in the installed app and viewed the title, artwork, listening link, and weekly count from a separate Discord account. After a background track change, the new link matched the video ID in the original YouTube Music window, and 512px artwork loaded. The public ZIP matched the build 30 files used for this check. Its Universal app signature and arm64 and x86_64 binaries were verified. Before release, 225 Swift tests and 14 media bridge checks passed.

The YouTube Music player page must be open for Companion to read the track URL. Discord settings and surfaces control where the activity appears. The public macOS app has not been notarized by Apple.

- [YouTube Music Companion v0.18.0 release](https://github.com/hyeonse-swing/youtube-music-companion-macos/releases/tag/v0.18.0)
- [Public repository and setup guide](https://github.com/hyeonse-swing/youtube-music-companion-macos)
