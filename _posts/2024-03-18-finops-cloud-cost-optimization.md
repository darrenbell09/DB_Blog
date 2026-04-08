---
layout: post
title: "FinOps in Practice: How We Cut Cloud Costs by 40% Without Hurting Performance"
subtitle: "A practical account of what actually works when cloud bills spiral out of control"
date: 2024-03-18
category: FinOps
tags: [FinOps, cloud costs, AWS, cost optimization, reserved instances, tagging]
excerpt: "Cloud cost optimization is 20% tooling and 80% organizational behavior. Here's the complete playbook from a program that delivered a 40% reduction in 12 months."
---

Two years ago, I inherited a cloud infrastructure with a monthly AWS bill north of $800,000. Eighteen months later, we were spending $480,000 per month on roughly the same workloads, with better reliability and faster deployment cycles.

That's a 40% reduction—about $3.8M annualized. I'm writing this because the way we got there is not what most cloud cost articles describe.

## The First Thing to Understand

Cloud cost optimization is **20% tooling and 80% organizational behavior**.

I've watched organizations buy Spot.io licenses, CloudHealth subscriptions, and custom cost dashboards, then see their cloud bill continue to grow. The tools didn't fail—the organization did. Nobody changed how engineers made resource decisions.

The real problem with cloud costs is almost never that your architecture is wrong or that you're using the wrong instance types. It's that:

1. The people making decisions about cloud resources have no visibility into their cost
2. The people who care about cost have no authority over resource decisions
3. There are no consequences for provisioning waste
4. No one is accountable for the bill

Fix these organizational problems first. The technical optimization follows naturally.

## Phase 1: Establish the Truth (Months 1-3)

Before you can optimize anything, you need to see what you have. This sounds obvious. It's harder than it sounds.

### Tagging as the Foundation

Our first discovery was that 60% of our spend was untagged or inconsistently tagged. Without tags, you can't attribute cost to a team, a product, an environment, or a business unit. You can't answer "what does our payment processing system cost to run?" You're flying blind.

We implemented a mandatory tagging policy with four required tags:

```
Environment:  production | staging | development | sandbox
Team:         <team-name>
Product:      <product-name>
CostCenter:   <finance-code>
```

Policy enforcement via AWS Config Rules flagged resources missing required tags. Any resource missing a tag after 7 days got a billing correction applied—the cost was charged to a "untagged-waste" cost center that the VP of Engineering owned directly. Nothing motivates tagging compliance like the CFO asking why a VP has a $12,000 waste line item.

### Anomaly Detection Before Optimization

Before we started cutting costs, we turned on AWS Cost Anomaly Detection and integrated it with our Slack incident channel. Three days in, we caught a development team that had spun up a GPU cluster for an ML experiment and forgotten to tear it down. $47,000 in one week.

Set up anomaly detection before you do anything else. You will find surprises.

### Rightsizing Inventory

We ran the AWS Compute Optimizer report across our entire fleet. The initial output was humbling: 58% of our EC2 instances were overprovisioned by more than 50%. Engineers had followed the old datacenter instinct: "overprovision now, scale down later." In the cloud, "later" never comes.

This isn't unusual. In almost every audit I've conducted, the majority of instances are significantly oversized.

## Phase 2: Quick Wins (Months 2-5)

With visibility established, we went after what I call "embarrassing waste"—cost that's hard to defend and quick to eliminate.

### Killing Zombie Resources

**Idle EC2 instances:** Any instance under 5% average CPU utilization for 30 days, with no other evidence of activity. We inventoried these, gave teams two weeks' notice, and shut down or terminated non-responsive ones. 73 instances deleted. ~$18,000/month.

**Unattached EBS volumes:** Volumes exist when instances are terminated but nobody cleaned up. Simple script, lots of volumes. ~$4,200/month.

**Old snapshots:** Snapshot retention policies didn't exist. We had snapshots going back four years for some instances, including dev instances that no longer existed. Automated cleanup with 90-day retention. ~$6,100/month.

**Unused load balancers and NAT gateways:** These accrue charges even when carrying zero traffic. Cleaned up 31 idle load balancers, 12 unused NAT gateways. ~$8,400/month.

**Development environments running 24/7:** Dev and staging environments shouldn't run nights and weekends. We implemented scheduled start/stop with AWS Instance Scheduler. Engineers could override for legitimate needs. 40% cost reduction on non-production compute, ~$22,000/month.

Total phase 2 quick wins: **~$58,700/month, or ~$704,000 annually.** This took 90 days of engineering time spread across our SRE team.

## Phase 3: Commitment Discounts (Months 3-8)

Once we had cleaned up waste and established baseline usage patterns, we tackled commitment discounts.

### Reserved Instances and Savings Plans

AWS's pricing model rewards commitment. On-Demand pricing is the premium you pay for flexibility. If you have stable baseline workloads—and most production workloads are stable at baseline—you should be on compute savings plans or reserved instances.

The mistake most organizations make: they buy RIs based on their current fleet before rightsizing. You end up locked into the wrong instance types.

Our approach:
1. Rightsize first (3 months)
2. Establish stable usage patterns (3 months)
3. Purchase savings plans covering 70% of normalized compute spend

Why 70% and not 100%? We maintained 30% on-demand to handle variable workloads and give us flexibility for instance type changes. Compute Savings Plans (vs. EC2 Instance Savings Plans) gave us the flexibility to change instance families as our architecture evolved.

The discount rates: Compute Savings Plans gave us 24-26% off on-demand prices on 3-year terms, 17-20% on 1-year terms. We did a mix of 1-year (for workloads we expected to change) and 3-year (for stable core infrastructure).

**Impact: ~$95,000/month reduction in compute costs after purchasing.**

### Spot Instances for Batch Workloads

Our data processing pipelines—ETL jobs, ML training, analytics—were running on on-demand instances. This was the easiest win we hadn't taken.

Spot instances save 60-70% off on-demand pricing. For interruption-tolerant workloads, there's almost no reason not to use them. The engineering investment: checkpoint-and-resume logic in our processing jobs, a Spot interruption handler, and the discipline to architect batch jobs as resumable from the start.

**Impact: ~$28,000/month for batch processing workloads.**

## Phase 4: Architectural Optimization (Months 6-18)

This is where the bigger savings live, and where the work gets hard. Architectural changes require engineering investment and carry more risk than cleanup and commitment discounts.

### Data Transfer Costs

Data transfer is often the sneaky cost that grows faster than compute. We discovered we were paying ~$45,000/month in data transfer costs—mostly:

- Cross-AZ traffic (instances in different AZs within the same region calling each other)
- Data being transmitted to CloudFront uncompressed
- Database reads going directly to RDS from application servers across AZs

The fix:
- Pinned services with high inter-service traffic to the same AZ using placement groups and AZ-aware client logic
- Enabled compression on our CDN origin response
- Added a connection-pooling proxy (RDS Proxy) to handle connection locality

**Impact: ~$31,000/month in data transfer reduction.**

### Storage Tiering

Your data has different temperatures. Hot data (accessed frequently) belongs on fast, expensive storage. Cold data (accessed rarely) belongs on cheap, slow storage. Most organizations keep everything on the same tier because nobody thought about it.

We implemented S3 Intelligent-Tiering for data we couldn't easily classify, and S3 Glacier for data we knew was archival (compliance archives, old log data). EBS volume audit—many volumes were gp2 when gp3 would have been cheaper and faster.

**Impact: ~$18,000/month.**

### Managed Services vs. Self-Managed

This one cuts both ways. Sometimes managed services save money (you eliminate the operational overhead of running your own). Sometimes they're egregiously more expensive than self-hosted.

Our case study: we were running Elasticsearch clusters on EC2 for log aggregation. Cost: $24,000/month. Migration to OpenSearch Service: $19,000/month. But the reduction in operational overhead was worth another $15,000/month in SRE time. Total value: $20,000/month.

Meanwhile, our Redis usage was on ElastiCache. When we benchmarked self-hosted Redis on EC2, we found we could cut costs by 40% at our usage scale. We migrated. Less convenient, but economically rational.

The lesson: evaluate managed vs. self-hosted for each service category based on your specific scale and team capability, not as a blanket policy.

## The Organizational Changes That Made It Last

Technical changes decay without organizational changes. Here's what we put in place:

**Engineering team cost dashboards:** Every team lead has a weekly cost report for their cost centers. It's in their OKRs.

**Cloud cost review in sprint planning:** Teams commit a sprint task to cost optimization every 4-6 sprints. Not optional.

**A FinOps working group:** Rotating membership from each engineering team. Meets monthly. Reviews anomalies, shares optimization techniques, tracks progress against targets.

**Cost as a first-class engineering metric:** Our engineering all-hands includes a cloud spend slide alongside uptime and deployment frequency. Cost is talked about openly, not as a failure but as an engineering responsibility.

---

The 40% reduction took 18 months and the full-time focus of two engineers for about half that period. The payback was immediate—$3.8M per year for an investment of maybe $400K in engineering time.

More importantly, the new practices are self-sustaining. Our cloud bill has grown by less than 15% since we completed the program, despite doubling our workload volume.

*Want to compare notes on cloud cost optimization programs? I'm happy to talk through your specific situation. [Reach out here](/contact/).*
