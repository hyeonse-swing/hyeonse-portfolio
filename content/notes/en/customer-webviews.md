---
title: 'Connecting customer WebViews to the app'
description: 'The boundaries between entry, login, payment, and app bridges in my SWING and SWAP customer work.'
date: '2026-11-16'
activity:
  label: 'Work period'
  start: '2022'
  end: '2026'
  point: '2022'
  pointLabel: 'WebView work started'
tags: ['WebView', 'React', 'App bridge']
projects: ['swing-webview', 'swap-customer', 'swing-japan']
draft: false
---

## From the WebView to the next screen

Returning from a point top-up payment takes more than a screen inside the WebView. It was one of the boundaries I worked on at [SWING customer WebViews](/en/#archive-swing-webview), where I contributed to the payment widget and return screen. I also built a hub from an external service to other products in the app, with guidance for each destination. On the membership purchase list and points screen, I checked existing history routes and Korean and English display. Later, I contributed to login and identity verification screen changes.

At [SWAP](/en/#archive-swap-customer), I worked on the initial web and WebView screens, then product discovery, first orders, receipts, and the business portal. First orders separated accessory purchases from subscription inputs; receipts used server lookup results. With the team, I moved bicycle customer login to a new OAuth2 contract and addressed token-state races just after login, along with signup and consent flows. The business portal needed access checks and a return path after payment. Payment and authentication also depend on server and app contracts, so screen checks alone cannot establish that those systems were verified end to end.

## What a bridge call tells us

For SWAP, I added Flutter `callHandler` and `JavaScriptChannel.postMessage` alongside existing Android and iOS bridge paths. Depending on the channel, the message carried an object or serialized JSON. If a call threw synchronously, the bridge tried the next method. A successful call tells us the message was sent, but not that native processing finished.

On the [SWING Japan](/en/#archive-swing-japan) TF, I contributed to the website, back office, Japanese WebView text, and a WebKit bridge connection. There are no figures for usage or conversion in the public record.
