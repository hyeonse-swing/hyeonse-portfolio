---
title: 'Checking module boundaries in AI-assisted code'
description: 'I built tool rules around SWAP monorepo dependencies and checks matched to each change, then shared them with the frontend team.'
date: '2026-11-16'
activity:
  label: 'Shared with the team'
  start: '2026-09'
tags: ['Development practices', 'Code review', 'Team sharing']
projects: ['ai-development']
draft: false
---

## When working code still needs a closer look

Code produced with AI assistance might appear to work in the SWAP monorepo while crossing a module dependency boundary. That boundary needs its own check. Because each repository has a different structure and workflow, I built and revised development skills around its code and verification criteria. The [public archive](/en/work/archive/#archive-ai-development) records project-specific rules, SWAP dependency boundary checks, checks matched to the changed scope, and configuration backup and recovery guidance. I shared these with the frontend team.

I also shared how I look at generated code's structure and complexity before choosing which changes to keep. The checks depend on what changed.
