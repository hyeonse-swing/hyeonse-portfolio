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

## Where a screen hands off

A screen inside an app does not finish its job at the WebView boundary. Entry into another product, state after login, and the return from payment all need to connect to the app. For [SWING customer WebViews](/en/#archive-swing-webview), I built a hub that led from an external service to other products in the app, with guidance for each destination. I worked on membership purchase information and the points screen while preserving existing history routes and Korean and English display. I later contributed to login and identity verification screen changes, a point top-up payment widget, and its return screen.

At [SWAP](/en/#archive-swap-customer), my work covered early web and WebView builds, product discovery, first orders, receipts, and the business portal. I separated accessory purchases from subscription inputs in first orders and connected receipts to server lookup results. With the team, I moved bicycle customer login to a new OAuth2 contract and addressed token-state races just after login, signup, and consent flows. In the business portal I handled access checks and return paths after payment. These screens depend on server and app contracts; checking a screen does not establish that the whole payment or authentication system was verified.

## A bridge call is not completed native work

For SWAP, I added Flutter `callHandler` and `JavaScriptChannel.postMessage` paths alongside existing Android and iOS bridge calls. The channel determined whether an object or serialized JSON was sent, and a synchronous exception during a call led to trying the next method. Sending a call successfully does not establish that native processing finished. On the [SWING Japan](/en/#archive-swing-japan) TF, I also contributed to the website, back office, Japanese WebView text, and a WebKit bridge connection. The public record supports those contributions, without quantified usage or conversion outcomes.
