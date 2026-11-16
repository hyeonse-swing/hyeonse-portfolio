---
title: 'Sharing project-specific AI development practices'
description: 'Repository-aware work rules and scope-based verification shared with the frontend team.'
date: '2026-11-16'
tags: ['Development practices', 'Code review', 'Team sharing']
projects: ['ai-development']
draft: false
---

## Different repositories, different rules

An AI-assisted development instruction cannot assume every project has the same structure or workflow. I created and improved development skills that reflected each repository's code structure and verification criteria, then shared them with the frontend team. The [public archive](/en/#archive-ai-development) records repository-specific rules, dependency boundary checks in the SWAP monorepo, checks matched to the scope of a change, and configuration backup and recovery guidance.

I also shared how I inspect generated code for structure and complexity before selecting the changes to keep. In a monorepo, checking that a feature appears to work is only one part of review; module dependency boundaries matter too. The checks I described were tied to what changed. This records a working approach, without claiming that every generated result met a quality threshold or that the whole team adopted an identical workflow.

The archive establishes that the practices were prepared and shared. It does not give a measured increase in team productivity or a reduction in development time. My role here was frontend development practice and verification, rather than AI model training.
