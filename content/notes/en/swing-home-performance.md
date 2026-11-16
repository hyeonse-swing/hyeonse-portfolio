---
title: 'Making the SWING homepage appear sooner'
description: 'I changed rendering, media, fonts and image conversion timing, then compared performance and initial transfer in local Lighthouse runs.'
date: '2026-11-16'
activity:
  label: 'Improvement and measurement'
  start: '2026-07'
tags: ['Next.js', 'Web performance', 'Lighthouse']
projects: ['swing-home-performance']
draft: false
---

## What the first screen waited for

In July 2026, the SWING homepage took time to show its first screen and sent a large initial payload. The rendering structure, hero media, font files, and external news content all played a part. Working on the homepage frontend, I sorted out what the first screen needed immediately and what could wait until scrolling. The customer-facing font weights still had to look as designed.

I moved the Pages Router to a server-first App Router structure and prerendered Korean and English routes. Pages and layouts became Server Components; the menu and other parts needing state or events stayed Client Components. I checked both language routes and responsive layouts in a local production build.

## The cost of the GIF, news, and fonts

I replaced the large hero GIF with an MP4 and WebP poster. External content in the news section loaded near the viewport, with space reserved beforehand and a loading path for browsers without the observation API. Using only a regular font weight sometimes improved a score, but could erase the design's weight differences. After comparing options, I chose a variable WOFF2 subset.

After the initial work, I found a delay during first-time image conversion in production. A follow-up moved conversion from request time to build time: 34 originals produced 106 responsive WebP assets served as static files. A local production check across 10 Korean and English routes recorded zero broken images and zero image conversion requests. It was not a remeasurement of every production image request.

## What changed in the local comparison

The full-homepage comparison used a **July 2026 local production build and Lighthouse mobile simulation** under the same conditions. The **medians of three runs before and five after** were 54 to 95 for the Performance score and 19.805 to 0.488 MB for initial transfer. Rendering, media, external content, and fonts changed together, so that difference cannot be apportioned to any one change.

The font choice had a **separate comparison of five runs** under the same local conditions. Font requests and transfer went from four requests and 186.9 KB to one request and 109.6 KB. Those numbers cannot be combined with the full-homepage comparison. Neither experiment measured real-user performance or conversion. The [SWING homepage performance case](/en/work/swing-home-performance/) has the conditions and implementation details.
