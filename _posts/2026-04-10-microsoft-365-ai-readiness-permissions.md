---
layout: post
title: "Copilot Is Ready. Your Tenant Isn't."
subtitle: "Most organizations focus on MFA and role assignments before deploying Copilot. The real risk is the sharing sprawl nobody audited."
date: 2026-04-10
category: AI & Automation
tags: [Microsoft 365, Copilot, SharePoint, AI readiness, security, permissions, governance, OneDrive]
excerpt: "Everyone thinks their Microsoft 365 environment is locked down enough to deploy AI tools. MFA is on. Permissions are set. What they haven't looked at is the sharing sprawl underneath — the Anyone links that never expired, the contractor guest accounts still sitting in SharePoint groups. Copilot follows Microsoft's permissions exactly. The problem is the permissions you forgot you set."
---

Your Microsoft 365 environment has MFA enabled. Roles are assigned. You've done the security basics. On paper, it looks ready for Copilot.

It probably isn't.

Not because your intentional security configuration is wrong — but because underneath it, there's a layer of sharing decisions nobody made deliberately. Links that were created and never expired. Guest accounts provisioned for a contractor six months ago and never disabled. SharePoint libraries with default permissions that nobody changed because nobody knew the default was the problem.

Microsoft Copilot respects Microsoft's permissions model exactly. It won't surface a file to someone who doesn't have access. The problem is that in most Microsoft 365 environments, more people have access to more files than anyone intended — and nobody audited it before turning on a tool that can search and summarize everything.

---

## How Oversharing Happens Without Anyone Trying

The most common blind spot I see across Microsoft 365 environments isn't a misconfiguration someone made deliberately. It's the configuration nobody changed.

**"Anyone" and "Anyone in the organization" links are often set as the org-level default.** When a user shares a document in SharePoint or OneDrive, the default link type in many tenants is one of these. The user clicks share, copies the link, pastes it into an email, and sends it to one person. What they actually did was make that document accessible to every person in the organization — because that's what "Anyone in the organization" means.

**The default permission on those links is frequently Edit, not Read.** The employee who shared a budget document with their manager didn't intend to give the whole company write access to a budget spreadsheet. But the link they sent does exactly that.

Now that link is in an email. That email might get forwarded. The document is sitting in SharePoint with organization-wide access, attached to a filename that Copilot will find when someone searches for anything related to budgets. An employee who was never supposed to see that document asks Copilot a question. Copilot finds it. Copilot answers with it.

No one breached anything. The permissions worked exactly as configured. That's the problem.

---

## Guest Accounts Are the Quiet Side of the Same Risk

Shared links are visible when you know to look. Stale guest accounts are quieter.

**Every contractor, vendor, and partner who was granted guest access to your Microsoft 365 tenant is still there until someone removes them.** Most organizations provision guest accounts when the relationship starts and forget them when it ends. The account stays active. The group memberships stay intact. The SharePoint library permissions set up for that engagement are still assigned.

Copilot with Graph access traverses your SharePoint environment without distinguishing between an active employee and a guest account that hasn't been used in eight months. If the permissions say accessible, it's accessible.

The engineers in your organization who manage Microsoft 365 already know this. The audit hasn't happened because it's not on the priority list — and it won't be until leadership makes it one.

---

## What AI-Ready Actually Looks Like

Getting ready for Copilot isn't a one-time project. It's a posture shift that requires ongoing discipline. Here's what the organizations that do it right actually change:

**Harden the global sharing configuration.** Set the default link type to Specific people. Change the default permission to Read. These two settings alone stop new oversharing before it accumulates. They don't fix what's already there — but they stop it from getting worse.

**Set link expiration policies.** Sharing links should have a maximum lifetime. External links especially. Most tenants have no expiration configured, which means links created three years ago are still live and still granting access.

**Audit and disable unused guest accounts.** Pull the guest account report, filter for accounts with no sign-in activity in 90 days, and disable them. Then make this a quarterly process, not a cleanup you do once before a Copilot rollout.

**Disable resharing.** If you send someone a link, they shouldn't be able to forward it to someone else and extend that access further. This is often enabled by default.

**Require admin consent for third-party applications.** Any app requesting Microsoft Graph permissions to read SharePoint or OneDrive data — including AI tools and the third-party model providers now available through Copilot — should require explicit approval before it gets access.

**Treat least privilege as a standing operating principle, not a project.** Every permission decision should start with the question: does this person actually need this access? That mindset doesn't take hold from the engineering team up. It has to come from leadership down.

---

## The Reason This Can't Wait

Permission sprawl in Microsoft 365 has always been a governance problem. Most organizations have tolerated it because the practical consequences were manageable — the occasional file accessible to someone who shouldn't have it, noticed when it caused a problem.

Copilot changes the consequence, not the root cause.

A forgotten "Anyone in the organization" link used to mean one document was more accessible than intended. With Copilot, that same link means the document is now findable and summarizable by anyone in the organization who asks the right question — whether they were supposed to have access to it or not.

The data exposure risk here isn't about Microsoft reading your files or an LLM provider training on your content. It's internal. It's an employee in one department using Copilot to surface information from another department that was never meant to be shared — because someone sent an email with the wrong default link three years ago.

That's the AI readiness problem. It isn't glamorous. It's an audit and a settings review and a governance conversation that most organizations have been deferring. The right time to have it is before you roll out the tool that makes the consequences visible.

---

*Getting ready for Copilot or trying to understand where your Microsoft 365 permissions actually stand? [I'm happy to walk through what a readiness assessment looks like.](/contact/)*
