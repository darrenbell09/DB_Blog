---
layout: post
title: "SRE in Practice: From Concepts to Culture"
subtitle: "How to actually implement Site Reliability Engineering without turning it into a rebrand of your Ops team"
date: 2024-02-26
category: Infrastructure Ops
tags: [SRE, reliability, SLOs, incident management, culture, on-call]
excerpt: "Most SRE implementations fail not because of technology, but because organizations treat SRE as a title change rather than a discipline. Here's what the real transformation looks like."
---

In 2019, I was tasked with building an SRE practice from scratch at a company running a legacy infrastructure model: a traditional Ops team firefighting constantly, engineering teams that threw deployments over the wall, and a product organization that measured success in features shipped, not service reliability.

Eighteen months later, we had reduced MTTR by 60%, established SLO-based reliability contracts with product teams, and—most importantly—the on-call rotation no longer felt like a slow-motion trauma. Engineers wanted to be on the SRE team.

This is what I learned.

## The Mistake Most Organizations Make

When organizations decide to "adopt SRE," the most common implementation goes like this:

1. Rename the Ops team to "SRE"
2. Give everyone "Site Reliability Engineer" titles
3. Hand them the Google SRE book
4. Wonder why nothing changed six months later

The problem is that SRE is not a job title—it's a discipline with specific practices, cultural norms, and organizational structures. Renaming your team doesn't make them SREs any more than giving someone a stethoscope makes them a doctor.

Genuine SRE transformation requires changing *how work gets done*, not what it's called.

## The Three Pillars of Real SRE

In my experience, sustainable SRE practice rests on three interdependent pillars:

### 1. SLOs as the Unit of Trust

Service Level Objectives are the foundational mechanism of SRE. Everything else flows from them. But most organizations misunderstand what SLOs are for.

SLOs are not a way to measure how reliable your system is (though they do that). They're a **shared language for having conversations about reliability tradeoffs**. An SLO lets your infrastructure team say to a product team: "We're consuming 40% of our error budget this month. If we keep shipping at this pace, we'll burn through it. What do you want to do about that?"

Without SLOs, that conversation is a fight about feelings. With SLOs, it's a negotiation about tradeoffs—which is a much more productive conversation.

Getting SLOs right requires:

**Starting with the customer.** Your SLO should measure something that matters to the user, not an internal system metric. Availability of the API is a good SLO. CPU utilization of your web servers is not.

**Setting realistic targets.** "99.99% availability" sounds great until you realize that's 52 minutes of downtime per year across all incidents, including your 4am deployments and your provider outages. Start where you are and get better over time.

**Including the right stakeholders.** SLOs that engineering teams set without product input aren't contracts—they're wishes. SLOs need buy-in from whoever is defining what "good" looks like for users.

### 2. Toil Elimination as Continuous Work

Google defines toil as: manual, repetitive, automatable, tactical, devoid of enduring value, and that scales linearly with service growth.

Every SRE team will tell you they want to eliminate toil. Few actually track it systematically, which means they never actually eliminate it—they just complain about it.

The practice I've implemented that actually works:

**Track toil quantitatively.** Every time an engineer does toil work—restarts a service, manually rotates a credential, clears a queue, responds to a non-actionable alert—they log it. Category, time spent, estimated recurrence. This sounds annoying, but you only need to do it long enough to build a defensible picture.

**Allocate explicit capacity for elimination.** SRE teams should spend at most 50% of their time on operational/toil work. The rest is engineering work that improves reliability. This ratio won't maintain itself—you need to protect it, which means having the organizational authority to say no to additional manual work.

**Prioritize by recurrence.** A task that takes 30 minutes and happens daily is 180 hours per engineer per year. A task that takes 3 hours and happens once a quarter is 12 hours per year. Do the math. Automate the first one.

### 3. Blameless Post-Mortems as Cultural Foundation

This is the one that organizations get most wrong.

"Blameless" post-mortems don't mean consequences-free. They mean that the **system** is the subject of investigation, not the individual. The question is never "who broke it?" but "how did the system allow this to happen?"

The psychological safety required for genuine blameless post-mortems cannot be mandated from above. It has to be earned through consistent behavior over time. Every time a leader uses a post-mortem as evidence in a performance review, you've set the culture back six months.

What I've found works:

**Senior leaders participate visibly.** When the Director of Infrastructure sits in the post-mortem for a major incident and says "here's my part in why we didn't have better tooling to catch this"—that models the behavior you want.

**Correct the external narrative actively.** When someone in product or marketing says "the engineering team broke the site last night," correct it publicly: "We had an incident with a complex root cause that our team worked through professionally. Here's what we learned." Protect your team from external blame.

**Make follow-up items real commitments.** Nothing kills post-mortem culture faster than a list of action items that never get done. Treat post-mortem action items as high-priority bugs. Track their completion. Review them in the next incident review.

## Building the On-Call Culture

On-call is the acid test of SRE culture. A healthy on-call rotation is sustainable, educational, and produces engineers who feel competent and supported. An unhealthy one produces burnout, attrition, and engineers who dread their pager.

Signs your on-call culture is broken:
- Engineers dread being on-call and count down to rotation end
- More than 2-3 pages per shift (overnight) is considered normal
- Alert fatigue means engineers are trained to ignore pages until they escalate
- Post-mortems aren't happening or aren't producing change
- New engineers are afraid to deploy because of what might happen

Things that have actually improved on-call cultures I've managed:

**Eliminate noise before anything else.** Your first quarter as an SRE leader should be focused heavily on alert quality. Every alert should be actionable, have documented remediation steps, and have a clear owner. If it doesn't, fix or delete it. I've seen teams go from 40 alerts/night to 4 by doing nothing except deleting non-actionable alerts.

**Make shadow on-call standard for new engineers.** No one joins on-call rotation without at least one rotation shadowing a senior engineer. This isn't just about safety—it's about confidence.

**Publish on-call metrics.** How many pages per week? How long does it take to acknowledge and resolve? What's the distribution by time of day? Visibility creates accountability. When your CEO can see that the SRE team got paged 15 times last week between midnight and 6am, the conversation about investment priorities gets easier.

## The Organizational Model That Actually Works

SRE doesn't have a single organizational model, but I've found one pattern more successful than others for organizations that aren't Google:

**Embedded SRE with a central platform practice.** 2-3 SREs embedded with product engineering teams, responsible for reliability of those teams' services. A central SRE team of 4-6 that owns the platform (observability, CI/CD, Kubernetes cluster operations, incident management tooling). The embedded SREs report to the central team, not the product teams.

This model gives you:
- SREs close enough to product engineering to influence architectural decisions early
- A central team maintaining consistency in reliability practices and tooling
- Clear career paths for SREs that don't require becoming a product engineering manager
- Organizational leverage: a small central team can have outsized influence

---

SRE transformation is a 2-3 year journey, not a 6-month project. The organizations that succeed are the ones that commit to changing how reliability work happens, not just what it's called.

If you're at the beginning of this journey, or stuck somewhere in the middle, I'm happy to compare notes. [Get in touch](/contact/).
