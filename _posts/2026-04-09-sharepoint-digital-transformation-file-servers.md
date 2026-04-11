---
layout: post
title: "Why File Servers Are a Leadership Problem, Not a Storage Problem"
subtitle: "SharePoint migrations fail when they're treated as IT projects. They succeed when they're treated as organizational change."
date: 2026-04-11
category: Technology Leadership
tags: [SharePoint, Microsoft 365, digital transformation, file servers, migration, knowledge management]
excerpt: "Every organization knows file servers are a problem. Most treat it as a storage or technology decision. The ones that successfully migrate to SharePoint treat it as a leadership and organizational design decision first."
---

Every organization knows file servers are a problem. The evidence is visible in daily work: shared drives full of folders named "OLD," documents circulated via email because no one trusts the shared drive to have the current version, remote workers who need a VPN and a specific mapped drive to access files they should be able to reach from anywhere.

The solution is well understood. SharePoint Online, as part of Microsoft 365, provides the document management, collaboration, and accessibility that file servers don't. The technology is available. Most organizations already have the licensing.

The migration doesn't happen — or happens badly — because it's treated as an IT project.

IT can migrate the files. IT cannot migrate the behavior. And behavior is what determines whether the new environment works.

---

## What File Servers Actually Cost Organizations

The visible costs of file servers are the storage infrastructure, the backup systems, and the VPN access that remote work made more expensive and more fragile. These are real but not the primary cost.

The invisible costs are larger.

**Knowledge accessibility.** Files on a shared drive are only accessible to people who know where to look and who have been given explicit permission to look there. Institutional knowledge lives in folder structures that made sense to the person who created them years ago. New employees spend weeks learning where things are. People who leave take navigational knowledge with them.

**Version chaos.** "Final," "Final_v2," "Final_USE THIS ONE," "Final_ACTUALLY FINAL" — every organization with file servers has this problem. The cost isn't just the frustration; it's the time spent confirming which version is current, the errors that come from working on the wrong version, and the meetings that exist primarily to establish which document is the authoritative one.

**Collaboration friction.** Two people cannot edit the same document simultaneously on a file server. The workflow becomes: download, edit, re-upload, notify. Or email the document back and forth. Or put it in a Teams chat. The result is version proliferation and collaboration that's slower and more error-prone than it needs to be.

**Remote access dependency.** File servers were designed for on-premises access. Remote access requires VPN, which is a performance and security overhead that became much more expensive when remote work normalized. Organizations that didn't address this before 2020 discovered the hard way how brittle file server-dependent workflows are.

None of these costs show up cleanly in IT budgets. They show up in productivity, in employee frustration, and in the quiet organizational dysfunction that comes from people working around their tools rather than with them.

---

## Why Migrations Fail

The technical migration — moving files from a file server to SharePoint — is not the hard part. Tools exist. The process is well-documented. Microsoft provides migration tooling that handles the mechanics.

Migrations fail for organizational reasons:

**Migrating the folder structure instead of redesigning it.** The instinct is to replicate the existing shared drive structure in SharePoint. This is the worst outcome — it preserves all the organizational dysfunction of the file server, minus the benefits of SharePoint's search, metadata, and collaboration features. If you migrate a broken folder structure, you get a broken SharePoint.

**No information architecture decision before migration.** SharePoint is not just a place to store files. It's a platform for organizing and surfacing information. How you structure site collections, document libraries, and metadata determines how usable the result is. This is a design decision that requires input from the people who will use it — not just IT.

**Treating it as a project with an end date.** The migration might have an end date. The adoption work doesn't. People who've been using shared drives for years will default back to old behaviors unless there's consistent reinforcement, training, and — most importantly — leadership that uses the new environment visibly.

**No champions outside IT.** A SharePoint migration that is owned entirely by IT will be perceived as an IT initiative that was done to people, not with them. The organizations that succeed have champions in each business unit — people who were involved in the design, understand the value, and can support adoption within their teams.

---

## What a Successful Migration Actually Requires

The starting point is not file inventory. It's stakeholder conversations.

Who are the heaviest users of the current shared drives? What do they actually need to do with documents — who needs to access them, who needs to create and edit them, how do they need to find them? What does the governance model look like — who is accountable for keeping content current and organized?

The answers to those questions drive the information architecture. The architecture drives the migration design. The migration is the last step, not the first.

The technical implementation — site structure, library design, permissions through security groups rather than direct assignments, metadata taxonomy, search configuration — follows from knowing what the organization actually needs rather than from copying what it had.

The permissions model deserves particular attention. File server permissions tend to accumulate complexity over years of individual exceptions. A SharePoint migration is an opportunity to clean this up: move to security group-based permissions managed through Entra ID, establish a governance model for who can create new sites and libraries, and document the model so it can be maintained.

---

## The Outcome Is Organizational, Not Technical

A successful SharePoint migration is visible in how people work, not in a dashboard.

People stop emailing documents back and forth because co-authoring in SharePoint is easier. Remote workers stop complaining about VPN because SharePoint is browser-accessible from anywhere. Search starts returning useful results because files are named and organized consistently. Onboarding new employees takes less time because institutional knowledge is findable rather than requiring someone to walk you through the folder structure.

The technology enables all of this. But the technology doesn't create it on its own. The information architecture decisions, the adoption work, and the organizational commitment to using the new environment — these are what separate a file migration from a transformation.

That's why this is a leadership problem. IT can build the right platform. Leadership has to make the organizational decision to actually use it differently.

---

*Planning a SharePoint migration or trying to revive one that stalled? The organizational design questions are usually where the project is stuck. [I'm happy to think through the approach.](/contact/)*
