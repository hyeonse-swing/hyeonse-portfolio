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

## One page, two safe-area modes

Once a page moves from the browser into an app WebView, it is worth checking who handles the notch, status bar, and bottom gesture area. I published [WebView QA Shell](/en/#archive-webview-qa-shell) to open local and staging web services in iOS WKWebView and Android WebView. The native shell is a React Native app; the optional web QA console sits in a separate layer. Launch paths and inspection features are in the [public README](https://github.com/hyeonse-swing/webview-qa-shell#readme).

In `Edge` mode the page draws to the device edges. In `Safe` mode native insets keep it within the safe area. Switching between them lets me inspect a page that handles its own insets and one framed by the shell. The QA panel handles target URLs and navigation, while the web console exposes viewport, storage, and logs. Local targets and staging URLs can both be opened in the same shell. Back navigation is another behavior to check outside the desktop browser.

The README also lists typecheck, test, build, and E2E commands. For this article, I did not rerun them, verify physical devices, or check whether behavior is identical across every iOS or Android version or in a production service.
