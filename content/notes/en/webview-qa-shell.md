---
title: 'A QA Shell for iOS and Android WebViews'
description: 'A public tool for opening local and staging screens in native WebViews and inspecting safe areas and logs.'
date: '2026-11-16'
activity:
  label: 'Public development'
  start: '2026-05'
  end: '2026-10'
  point: '2026-05-15'
  pointLabel: 'v0.1.0 release'
tags: ['React Native', 'WebView', 'QA tool']
projects: ['webview-qa-shell']
draft: false
---

## Seeing a screen beyond the browser

A screen that works in a desktop browser can still need separate checks for safe areas and back navigation inside an app. I published [WebView QA Shell](/en/#archive-webview-qa-shell) to open local or staging web services in iOS WKWebView and Android WebView. The native shell is a React Native app; an optional web QA console is a separate layer. The [public README](https://github.com/hyeonse-swing/webview-qa-shell#readme) describes its launch paths and inspection features.

The shell switches between `Edge`, where the page draws to the device edges, and `Safe`, where native insets keep it within the safe area. This helps inspect a page that handles the notch, status bar, and bottom gesture area itself separately from a page framed by the shell. The QA panel handles target URLs and navigation, while the web console brings viewport, storage, and log inspection together. It accepts both local targets and staging URLs so an in-progress screen and a shared test screen can be viewed through the same shell.

The README lists typecheck, test, build, and E2E commands. I did not run those commands again or verify physical devices for this article. The documented inspection features do not by themselves establish identical behavior across every iOS or Android version or a production service.
