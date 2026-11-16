---
title: 'Bike orders and contracts across staff and business screens'
description: 'Building an operations flow while keeping early fixtures separate from the eventual API contract.'
date: '2026-11-16'
tags: ['Operations Admin', 'API contracts', 'Playwright']
projects: ['bike-operations']
draft: false
---

## Different people entered and checked the order

In the bike business in 2026, staff created the first order and sent the contract, while business customers needed to inspect their own contracts and payment status. Vehicle handovers and insurance changes also crossed the operations workflow. The legacy system and manual work continued while the new system was being built. I handled frontend work across the project, building the staff Admin and business portal. The backend team owned migration and consistency fixes for existing data.

I gave staff an Admin flow for order creation and contract delivery. Business customers got My Page screens for contracts, unpaid and paid amounts, and their current plan. I turned the planner's wireframes into screens that followed existing Admin patterns, separating the entry points by who performed each task. Major API integration took place in June 2026. By July, I had connected the portal flow for viewing subscription and payment status and returning after payment-method handling.

## Checking the workflow before its APIs were ready

The return, handover, and insurance-change APIs were not finalized when their screens needed to move forward. I used fixtures in a nonproduction environment to check screen states and the order of work, and documented the APIs, fields, and parts to replace during integration. I did not treat fixture shapes as the production contract. Once actual request and response structures were available, I connected the vehicle, store, and insurance screens and adjusted the UI for existing field representations.

We initially expected a separate user model for business customers. The actual model was shared with regular users and distinguished by a type value; business customers could still use regular SWAP services. I aligned that value with the backend team, preserved the regular-service flow, and separated business-only menus, pages, and APIs. The frontend provided guidance and navigation after an access denial. In the portal, data lookups waited for restored authentication and access checks before fetching stores and details for a selected store.

## A response shape that passed automation

Playwright E2E based on B2B responses passed, but direct screen inspection exposed a B2C response without the business-information object. Necessary information was therefore absent from the screen. I requested a backend response change, updated UI conditions by user type, redefined the case, and repeated both automated and direct checks. A passing test for one response shape had not covered what another user type actually saw.

The delivered frontend covered staff first orders and contract sending, plus business customers' self-service status views. I checked the workflows both before and after API finalization. Adoption, reduction in manual work, and cost effects were not measured separately. The [bike operations case](/en/work/bike-operations/) has the fuller screen and data-flow details.
