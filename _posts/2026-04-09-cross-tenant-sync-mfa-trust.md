---
layout: post
title: "Multi-Tenant Doesn't Have to Mean Multi-Login"
subtitle: "The goal wasn't clever identity architecture. It was one MFA prompt and access to everything."
date: 2026-03-19
category: Microsoft 365
tags: [Microsoft 365, Entra ID, cross-tenant sync, MFA trust, SharePoint, identity, collaboration, holding company]
excerpt: "A holding company with multiple subsidiaries needed their people to access SharePoint files across tenants without multiple logins, duplicate licenses, or MFA fatigue. Here's the architecture that got them there."
---

A holding company running multiple subsidiaries on separate Microsoft 365 tenants has a collaboration problem that looks simple on the surface and isn't.

The people doing the work need files from multiple tenants. They don't know or care what a tenant boundary is — they just want access. What they get instead is repeated MFA prompts every time they cross a tenant boundary, a confusing login experience that varies depending on which subsidiary's resources they're trying to reach, and IT fielding a steady stream of access requests and guest account issues.

The obvious fixes are all expensive in different ways. License users in every tenant they need access to — now you're paying for the same person three times. Consolidate the tenants — a project that takes months, disrupts operations, and may not be feasible if the subsidiaries need to remain operationally distinct. Use guest access everywhere — you've just traded licensing cost for management burden and you still haven't fixed the MFA friction.

There's a fourth option. It's just not the first thing most people reach for.

---

## The Business Problem

The holding company I worked with had subsidiaries on separate M365 tenants. Each subsidiary had its own SharePoint environment with files that holding company staff needed to access regularly — not occasionally, not for a specific project, but as part of their normal workday.

Two things were non-negotiable:

- Users should not be licensed in multiple tenants. The cost wasn't justified when the same person already had an M365 license in the holding company tenant.
- There should be one MFA prompt. Getting challenged every time you cross a tenant boundary trains users to resent security controls. That resentment eventually becomes pressure on IT to weaken them.

The goal was a single sign-on experience with a single access point, where holding company staff could reach files in any subsidiary SharePoint without re-authenticating.

---

## The Architecture: Three Components Working Together

**Cross-tenant synchronization** starts in Entra ID. You configure a sync from the holding company tenant outbound to each subsidiary tenant. The holding company's users are provisioned in each subsidiary tenant as B2B collaboration users with member-level access — not guests. They show up in directory search, they're manageable at the tenant level, and when someone leaves the holding company, the sync removes their presence in every subsidiary automatically. No manual guest account cleanup across four tenants.

**Inbound MFA trust** is what eliminates the re-authentication problem. In each subsidiary tenant's cross-tenant access policies, you configure inbound trust to accept MFA claims from the holding company tenant. When a synced user completes MFA in their home environment — the holding company tenant — that authentication is honored when they access resources in any subsidiary. The subsidiary tenants aren't skipping MFA. They're trusting that it already happened, which it did, in the right place.

**The SharePoint landing page** is the piece that makes this feel like a single system to the end user. Each subsidiary has its own SharePoint site with its own content. In the holding company tenant, we built a SharePoint hub that functions as the access point — tiles and links out to the relevant subsidiary SharePoint sites, organized the way the business is organized. Users log in once, land on the holding company SharePoint, and navigate to files in any subsidiary from there. The underlying tenant boundaries are invisible.

---

## What the Experience Looks Like

Before: a user needs a document in a subsidiary's SharePoint. They navigate to an unfamiliar URL, get prompted to sign in again, get an MFA challenge they weren't expecting, and either complete the friction or submit a help desk ticket asking why they need to log in twice.

After: they go to the holding company SharePoint landing page they already have bookmarked. They see tiles for each subsidiary's content area. They click through. The files are there. No additional sign-in. No second MFA prompt. The tenant boundary is invisible.

For IT, the management surface simplifies. User provisioning and deprovisioning is managed in one place — the holding company tenant. The sync handles propagation. Offboarding a user removes their access across all subsidiary tenants as part of the standard process, not as a separate checklist item.

---

## What to Watch

This architecture is not a permanent set-it-and-forget-it configuration. A few things to maintain:

The cross-tenant access policies and sync scope need to match organizational reality. If a subsidiary is acquired, divested, or restructured, the identity trust relationship needs to be updated. Trust that outlives the organizational relationship that justified it becomes an unnecessary access vector.

Scope the sync carefully. Not every holding company user needs to be provisioned in every subsidiary tenant. Sync the users who actually need access to each tenant's resources. The principle of least privilege applies at the tenant level, not just the file level.

The SharePoint landing page architecture requires governance like any other SharePoint environment — someone needs to own it, keep the links current, and manage what gets surfaced where. It's not complex, but it's not self-maintaining.

---

*Running a multi-tenant M365 environment and dealing with cross-tenant access friction? The licensing and authentication architecture matters more than most people realize before they've tried to untangle it. [Happy to talk through the specifics.](/contact/)*
