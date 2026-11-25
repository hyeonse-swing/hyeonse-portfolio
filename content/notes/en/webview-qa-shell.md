---
title: 'A QA Shell for iOS and Android WebViews'
description: 'A public tool for opening local and staging screens in native WebViews and inspecting safe areas and logs.'
date: '2026-11-16'
updated: '2026-11-20'
activity:
  label: 'Public development'
  start: '2026-05'
  end: '2026-11-20'
  point: '2026-11-20'
  pointLabel: 'v0.1.3 release'
tags: ['React Native', 'WebView', 'QA tool']
projects: ['webview-qa-shell']
draft: false
---

## One page, two safe-area modes

Once a page moves from the browser into an app WebView, it is worth checking who handles the notch, status bar, and bottom gesture area. I published [WebView QA Shell](/en/work/archive/#archive-webview-qa-shell) to open local and staging web services in iOS WKWebView and Android WebView. The native shell is a React Native app; the optional web QA console sits in a separate layer. Launch paths and inspection features are in the [public README](https://github.com/hyeonse-swing/webview-qa-shell#readme).

In `Edge` mode the page draws to the device edges. In `Safe` mode native insets keep it within the safe area. Switching between them lets me inspect a page that handles its own insets and one framed by the shell. The QA panel handles target URLs and navigation, while the web console exposes viewport, storage, and logs. Local targets and staging URLs can both be opened in the same shell. Back navigation is another behavior to check outside the desktop browser.

## Retrying a failed page at the same address

In public v0.1.3, a connection refusal or HTTP 503 can be followed by `Retry` to load the same URL again. The Android fix keeps a late history notification for the failed URL from replacing the error screen. When copying the QA report or event log fails, the web console reports the failure and restores keyboard focus to the button.

Fresh copies of the public source were run in an iOS 18.6 simulator and an Android 16 emulator. The checks covered initial loading, switching `Edge` and `Safe`, recovery to a 200 response at the same URL, and pasting the report through each system clipboard. Both environments used synthetic pages and data with clipboard sharing to the host Mac disabled. The same Flow QA case also clicked `Retry` and checked recovery on both platforms.

- [WebView QA Shell v0.1.3 release](https://github.com/hyeonse-swing/webview-qa-shell/releases/tag/v0.1.3)
