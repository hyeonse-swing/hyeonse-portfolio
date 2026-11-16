---
title: 'Making the SWING homepage appear sooner'
description: 'A local comparison of rendering and asset changes, followed by a build-time image fix.'
date: '2026-11-16'
activity:
  label: 'Improvement and measurement'
  start: '2026-07'
tags: ['Next.js', 'Web performance', 'Lighthouse']
projects: ['swing-home-performance']
draft: false
---

## The first screen had more than one cost

In July 2026, the SWING homepage was slow to show its first screen and transferred a large amount of data initially. The rendering structure, hero media, font files, and external content all contributed. I worked on the homepage frontend by separating what the first screen needed from work that could wait until later. The customer-facing design, including its font-weight distinctions, still mattered.

I moved from the Pages Router to a server-first App Router structure and prerendered Korean and English routes. Pages and layouts used Server Components; parts that needed state or events, such as the menu, remained Client Components. I checked both language routes and responsive layouts in a local production build. That addressed part of the rendering path, while the browser's initial downloads needed separate attention.

## Adjusting media and font loading

I replaced the large hero GIF with an MP4 and WebP poster. External content in the news section loaded as it approached the viewport, with space reserved before loading and a fallback for browsers without the observation API. A regular-only font sometimes scored better, but it could lose the original design's different weights. After comparing options, I selected a variable WOFF2 subset to reduce requests while retaining those distinctions.

After the initial improvement, a first-image-conversion delay became visible in production. In a follow-up, I moved conversion from request time to build time, generating 106 responsive WebP assets from 34 originals and serving them as static files. A local production check recorded zero image conversion requests and zero broken images across 10 Korean and English routes. That check does not establish the behavior of every production image request.

## What the measurements support

The full-homepage comparison used a **July 2026 local production build and Lighthouse mobile simulation** under the same conditions. The **medians of three runs before and five after** were 54 to 95 for the Performance score and 19.805 to 0.488 MB for initial transfer. Rendering, media, external content, and fonts changed together, so the difference cannot be assigned to one change.

The font choice had a **separate comparison of five runs** under the same local conditions. Font requests and transfer changed from four requests and 186.9 KB to one request and 109.6 KB. This is a different experiment from the full-homepage comparison. Neither result is a real-user performance or conversion measurement. The [SWING homepage performance case](/en/work/swing-home-performance/) contains the implementation and measurement context.
