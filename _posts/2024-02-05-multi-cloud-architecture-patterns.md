---
layout: post
title: "Multi-Cloud Architecture: Beyond the Buzzwords"
subtitle: "What multi-cloud actually means in practice, when it's the right call, and how to do it without making your life miserable"
date: 2024-02-05
category: Cloud Architecture
tags: [multi-cloud, AWS, Azure, GCP, architecture, strategy]
excerpt: "Most organizations adopt multi-cloud for the wrong reasons, then wonder why it's so expensive. Here's a framework for thinking about it that actually holds up."
---

"We need to be multi-cloud." 

I've heard this dozens of times, usually from one of three sources: a CTO who just read a Gartner report, a procurement team trying to create vendor leverage, or an engineer who wants to use a specific managed service that's only available on one provider.

The problem isn't that multi-cloud is wrong. The problem is that the conversation almost never starts with the right question: *what problem are we actually trying to solve?*

## What Multi-Cloud Actually Means

Before we go further, let's get precise about terminology, because "multi-cloud" gets used to mean several different things:

**Active-active multi-cloud:** You run the same workload simultaneously across two or more cloud providers, with traffic routing between them. This is the hardest, most expensive form, and the one most organizations claim they want.

**Primary + secondary multi-cloud:** You run workloads on one provider with a documented (but rarely tested) capability to fail over to another. More realistic than active-active, but it still carries significant operational complexity.

**Best-of-breed multi-cloud:** You pick the best service from each provider for different purposes. Your data warehouse is on BigQuery, your ML training is on AWS SageMaker, your application workloads are on Azure. This is common, pragmatic, and frequently not what people mean when they say "multi-cloud."

**Avoiding lock-in through abstraction:** You write infrastructure against abstracted interfaces (Kubernetes, Terraform, etc.) so that migration is *theoretically possible* without committing to running on multiple clouds today.

Each of these is a different decision with different costs, benefits, and tradeoffs. Conflating them is how you end up spending $2M building a multi-cloud platform that solves a problem you didn't actually have.

## The Legitimate Reasons to Go Multi-Cloud

There are genuine reasons to operate across multiple cloud providers. Here are the ones I've seen that held up under scrutiny:

### Regulatory and Data Residency Requirements

Some jurisdictions require data to be stored in specific regions, and not all providers have equivalent coverage in all regions. If you need to serve EU customers with GDPR data residency requirements *and* Southeast Asian customers in specific countries, you may genuinely need services from multiple providers. This is real. It's also narrower than most people think.

### Surviving a Major Provider Outage

The big providers have outages. AWS us-east-1 has had several notable ones. Azure's authentication service has gone down, affecting every Azure workload globally that depends on Azure AD. If your business genuinely cannot tolerate extended downtime of a single cloud provider, you need geographic and provider diversification.

The honest question to ask here: what's your RTO? And is the cost of multi-cloud operational complexity worth it compared to, say, investing in better fault tolerance *within* a single provider? In my experience, most organizations can achieve their reliability requirements with strong single-provider architecture. Multi-provider adds complexity that itself becomes a source of incidents.

### Acquisition and Portfolio Management

You acquired a company running on Azure. Your primary platform is AWS. You need both. This is common, and the right answer is usually a time-boxed migration plan, not a long-term multi-cloud strategy—but "long-term multi-cloud" is sometimes the pragmatic outcome when migration costs exceed the benefits.

### Specific Managed Services

Google BigQuery and Vertex AI are genuinely differentiated. Azure's integration with on-premises Microsoft ecosystems is real. AWS's breadth of managed services is unmatched. There are legitimate cases to use specific services from each provider for specific workloads.

## The Wrong Reasons

The reasons I've seen organizations adopt multi-cloud that turned out to be mistakes:

**"To avoid lock-in":** Cloud lock-in is a real concern, but the abstraction layer you build to avoid it often costs more than the lock-in risk it mitigates. If you're building Kubernetes clusters on AWS so you can "move to Azure if needed"—but you're using RDS, SQS, CloudFront, Lambda, and IAM heavily—you're not avoiding lock-in. You're paying for Kubernetes complexity while lying to yourself.

**"For vendor negotiation leverage":** Sometimes real, rarely as straightforward as it sounds. Cloud providers know when you're genuinely multi-cloud vs. when you're paying lip service to it for negotiation purposes.

**"Because our competitors are doing it":** Following the herd is how organizations end up with expensive platform engineering teams solving problems they don't actually have.

## What Good Multi-Cloud Architecture Looks Like

When multi-cloud is the right call, here's what makes it work:

### Start with the Data Plane, Not the Control Plane

The hardest part of multi-cloud is data—specifically, getting data between providers without paying egress costs that kill your economics, and without creating data consistency nightmares.

Before you architect anything else, answer these questions:
- Which data sets need to live in which cloud, and why?
- What's your data gravity? (Data gravity is real: your compute tends to follow your data because egress is expensive.)
- Do you need real-time synchronization, or is eventual consistency acceptable?

### Embrace Managed Services Selectively

You can't abstract everything. If you use BigQuery, you're using BigQuery—and that's fine. Trying to abstract it behind a "data warehouse interface" so you can swap it for Snowflake or Redshift will just give you the worst of all worlds.

Be intentional about which managed services are core dependencies vs. peripheral. Use abstraction layers where they genuinely add value (Terraform for infrastructure, Kubernetes for container orchestration), not as a reflex.

### Build for the Networking Reality

Cross-cloud networking is expensive and has higher latency than same-cloud networking. Your architecture should minimize cross-cloud data transfer wherever possible. This usually means:

- Colocating data processing with data storage within the same provider
- Using cloud provider interconnects (AWS Direct Connect + Azure ExpressRoute peered through a hub) rather than internet-based VPN
- Designing services to tolerate cross-cloud latency in non-critical paths

### Standardize Your Observability Stack

One of the hidden costs of multi-cloud is fragmented observability. AWS CloudWatch metrics don't talk to Azure Monitor. GCP Cloud Logging is separate from both. If you're going multi-cloud, invest early in a provider-agnostic observability layer. OpenTelemetry for instrumentation, a neutral observability backend (Datadog, Grafana Cloud, New Relic) for aggregation.

### Accept the Operational Cost

Multi-cloud operations require engineers who know multiple platforms. That's expensive in hiring, training, and cognitive load. Your on-call rotation now needs people capable of debugging issues on AWS *and* Azure *and* GCP. Your runbooks get more complex. Your security posture gets harder to audit.

This isn't an argument against multi-cloud—it's an argument for being honest about its costs when you're making the decision.

## A Framework for the Decision

When someone tells me they're considering multi-cloud, I ask them to work through this:

1. **What specific problem are you solving?** Name it precisely.
2. **What's the cost of that problem if you don't solve it?** Quantify the business risk.
3. **What does a single-cloud solution to that problem look like, and what does it cost?** Multi-cloud should win on this comparison, not just be the default.
4. **What does multi-cloud add to your operational complexity?** Be specific. Estimate the engineering cost.
5. **Do the math.** Multi-cloud cost (engineering + operations) vs. single-cloud cost + risk mitigation cost.

Most organizations that go through this exercise discover that they want the benefits of multi-cloud without wanting to pay its costs. Sometimes the honest answer is: "We're going to run on AWS, invest in chaos engineering and regional failover, accept some lock-in risk, and revisit in three years."

That's often the right answer.

---

*If you're architecting a multi-cloud environment and want to talk through the specifics, [get in touch](/contact/). I've made most of the mistakes so you don't have to.*
