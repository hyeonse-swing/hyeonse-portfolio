---
title: 'Building bike operations screens for staff and businesses'
description: 'I connected staff order and contract work with status views in the business portal, using non-production fixtures before the APIs were settled.'
date: '2026-11-16'
activity:
  label: 'Main integrations'
  start: '2026-06'
  end: '2026-07'
  point: '2026-07'
  pointLabel: 'Business portal integration'
tags: ['Operations Admin', 'API contracts', 'Playwright']
projects: ['bike-operations']
draft: false
---

## Two screens for the same order

In the bike business in 2026, staff created the first order and sent the contract. Business customers then needed to see their contracts, unpaid and paid amounts, and current plan. Vehicle handovers and insurance changes were part of the same operations work. The legacy system and manual tasks continued while we built the new one.

I handled the project's frontend and separated the staff Admin from the business portal at the entry points. Working from the planner's wireframes and existing Admin patterns, I put first orders and contract delivery on the staff side and status views in the business My Page. Major API integration followed in June 2026. In July, I connected the portal flow for checking subscription and payment status and returning after payment-method handling. The backend team owned migration and consistency fixes for existing data.

## When the screens preceded the APIs

The return, handover, and insurance-change APIs were still unsettled when the screens needed to move forward. I checked screen states and task order with fixtures in a nonproduction environment, documenting the APIs, fields, and pieces that would need replacing. Once the real request and response structures were set, I connected the vehicle, store, and insurance screens and adjusted the UI for existing field representations. The fixtures did not become the production contract.

The user model also changed from what we expected. Business customers shared the regular user model, distinguished by a type value, and could still use regular SWAP services. I aligned that value with the backend team, kept the regular flow intact, and separated business-only menus, pages, and APIs. The frontend handled guidance and navigation after access denial. Portal lookups waited for authentication restoration and access checks, then fetched stores and the selected store's details in order.

## The B2C screen after a passing B2B test

Playwright E2E passed against B2B responses. Direct screen inspection then showed that the B2C response lacked the business-information object altogether, leaving required information blank. I requested a backend response change, corrected the UI conditions by user type, redefined the case, and repeated both automated and direct checks.

I checked the work sequence before and after API finalization. Adoption, manual-work reduction, and cost effects were not measured separately. The [bike operations case](/en/work/bike-operations/) goes further into the screens and data flow.
