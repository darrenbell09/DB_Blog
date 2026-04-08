---
layout: post
title: "Infrastructure as Code at Scale: Lessons from Managing 100% Terraform Coverage"
subtitle: "What happens when you actually commit to IaC — the good, the painful, and the patterns that make it sustainable"
date: 2024-05-14
category: DevOps
tags: [Terraform, IaC, infrastructure as code, DevOps, platform engineering, GitOps]
excerpt: "Getting to 100% Terraform coverage is a journey most teams abandon halfway through. Here's what the complete path looks like — including the parts nobody talks about."
---

Three years ago, I made a commitment that seemed straightforward at the time: every piece of infrastructure in our AWS and Azure environments would be defined in Terraform. No console changes. No ClickOps. No infrastructure that exists outside the codebase.

We achieved it. And I learned more in that process than in the preceding decade of infrastructure work.

This is what that journey actually looks like.

## Why "100% Terraform" Is Harder Than It Sounds

The idea is simple: write Terraform, run `terraform apply`, infrastructure exists. The reality is a series of problems that compound as scale increases.

The first problem most teams hit: **existing infrastructure**. Almost every organization has years of manually created resources. Cloud accounts full of VPCs, subnets, security groups, IAM roles, and RDS instances created through the console, from before IaC was a priority. Getting these into Terraform means either `terraform import` (tedious, error-prone at scale) or a migration strategy (destroys and recreates resources, which has downtime implications).

The second problem: **state management**. Terraform state is the source of truth about what Terraform thinks exists. At scale, with many teams and many environments, state becomes a coordination problem. Who has the lock? Which team owns which resources? What happens when state drift occurs?

The third problem: **the organizational challenge**. Engineers who've been spinning up infrastructure through the console for years need to change how they work. This is a cultural change, not a technical one, and cultural changes are always harder than technical ones.

## The Architecture We Landed On

After several iterations, here's the repository and state structure that's worked for us at scale:

### Repository Structure

We use a monorepo for infrastructure, organized by environment and then by service:

```
infrastructure/
├── _modules/               # Reusable Terraform modules
│   ├── networking/
│   ├── compute/
│   ├── database/
│   ├── security/
│   └── observability/
├── environments/
│   ├── production/
│   │   ├── networking/
│   │   ├── compute/
│   │   ├── databases/
│   │   └── services/
│   │       ├── api/
│   │       ├── workers/
│   │       └── ...
│   ├── staging/
│   └── development/
├── accounts/               # Account-level resources (IAM, etc.)
│   ├── aws-prod/
│   ├── aws-staging/
│   └── azure-prod/
└── .github/
    └── workflows/
```

The key design decisions:

**Modules own the patterns, root modules own the configurations.** Our modules define *how* we build networking, compute, and databases. The environment root modules define *what* we build—specific VPC CIDRs, instance counts, database sizes. This separation prevents modules from becoming configuration files.

**Small blast radius per state file.** Each directory that contains `main.tf` has its own state file. A change to production networking doesn't risk production compute. This matters when someone on your team runs `terraform apply` and it touches more than they expected.

**Service teams own service infrastructure.** The platform team owns shared infrastructure (VPCs, transit gateways, ECR registries). Each product team owns their own service infrastructure within guardrails defined by the platform team via modules.

### State Storage and Locking

Remote state in S3 with DynamoDB locking for AWS environments, Azure Blob Storage with Terraform Cloud for Azure. We evaluated Terraform Cloud's full state management but found the cost prohibitive at our scale—we're paying for about $0.20/resource-month in AWS DynamoDB costs versus $20/seat/month for Terraform Cloud.

State is organized in a hierarchy that mirrors the repository: one S3 bucket per AWS account, with prefixes matching the environment/service structure.

### The Pipeline

Every infrastructure change goes through this pipeline:

```
PR opened
  → terraform fmt check
  → terraform validate
  → checkov security scanning
  → tflint linting
  → terraform plan (generates plan file, stored as artifact)
  → plan summary posted to PR as comment
  
PR approved + merged to main
  → terraform apply (uses the saved plan file)
  → post-apply validation
  → Slack notification with apply summary
```

The `plan` step runs on every PR open and commit. Engineers see exactly what will change before they request review. Reviewers see the plan alongside the code diff.

We use GitHub Actions for the pipeline, with separate OIDC-authenticated roles for plan (read-only permissions) and apply (write permissions). No long-lived credentials in CI.

## The Patterns That Made This Sustainable

### 1. The Module API Contract

Every module we build has an explicit API: required variables, optional variables with sensible defaults, and outputs. We treat module interfaces the same way we treat API contracts—breaking changes require a major version bump and a migration plan.

This matters because modules get used by multiple teams. If the networking module interface changes in a breaking way, every team using it needs to update their root module. With 50+ services, that's a significant coordination cost.

We version our modules using Git tags and recommend specific versions in our module documentation. Teams pin to a version and upgrade deliberately.

### 2. Guardrails, Not Gates

The platform team's instinct is often to lock things down—restrict which instance types teams can use, which regions they can deploy to, which services they can create. This feels like governance. In practice, it creates shadow IT: teams find ways to create infrastructure outside Terraform to escape the restrictions.

Better approach: guardrails that make the right thing easy, not gates that make the wrong thing impossible.

Our guardrails:
- **Required tagging via aws_resourcegroups_tagging_api** in CI—tag compliance is enforced before apply
- **Budget alerts** configured automatically for every new service, wired to the owning team's Slack channel
- **Drift detection** runs nightly and pages the owning team if drift is detected
- **Security scanning** via Checkov catches common misconfigurations (public S3 buckets, open security groups) before resources are created

These guardrails nudge teams toward correct behavior without blocking them from making decisions about their own services.

### 3. Drift Detection as a First-Class Concern

Configuration drift—when the real state of your infrastructure diverges from what Terraform thinks—is the silent killer of IaC programs. Someone makes a "quick" console change for debugging and forgets to translate it back. A cloud provider automation makes a change. An incident response involves a manual override.

We run `terraform plan` on every state file nightly. Any plan that's not empty (i.e., any drift detected) creates a GitHub issue assigned to the owning team. Drift older than 48 hours creates a PagerDuty alert.

The nightly drift scan has found:
- Console changes made during incidents that were never codified
- Resources created by vendor integrations outside our Terraform management
- Drift from provider version upgrades that changed default values
- State files that were out of sync with reality due to partial apply failures

### 4. The Import Problem and How We Solved It

When we started the "100% coverage" initiative, we had roughly 2,000 resources in AWS that existed outside Terraform. `terraform import` one at a time would have taken months.

Our approach: **Terraformer + manual review + batch import + test.**

[Terraformer](https://github.com/GoogleCloudPlatform/terraformer) is an open-source tool that reverses Terraform—it introspects your cloud environment and generates Terraform code. The code it generates is ugly and requires significant cleanup, but it dramatically accelerated our import process.

The process:
1. Terraformer scan of a region/service
2. Generated code cleaned up by an engineer (2-3 hours per service area)
3. Code review by a second engineer
4. `terraform import` for each resource
5. `terraform plan` should show zero changes after import
6. Tag everything with `origin: imported` for audit trail

We ran this as a sprint initiative over two months with three engineers dedicated part-time. At the end, we had all existing resources in Terraform and could enforce "no console changes" as a hard policy.

## The Hard Lessons

**Not everything should be in Terraform.** Some things belong in application configuration management (Chef/Ansible/Puppet for VM configuration), some belong in Kubernetes manifests, some belong in your application's deployment pipeline. Terraform is for cloud resources—VPCs, instances, managed services, IAM. Trying to manage application deployment through Terraform creates an unmaintainable mess.

**Terraform is not a configuration management tool for VM internals.** I've seen organizations manage SSH keys, cron jobs, and application configs in Terraform. Don't. Use the right tool for the job.

**Provider version pinning is not optional.** Unpinned providers mean your `terraform plan` output changes without you changing any code. Pin your provider versions. Pin your Terraform version. Upgrade deliberately.

**The `terraform destroy` conversation has to happen before the first apply.** What's your plan for tearing down environments? Development environments that can't be destroyed cleanly create sprawl. Make sure every root module can be destroyed completely before you consider it done.

**Data sources create invisible dependencies.** If your service infrastructure uses a data source to look up a shared networking resource, and that shared resource changes in a way that changes the data source output, your apply will fail unexpectedly. Document and test data source dependencies explicitly.

---

Three years in, our 100% Terraform coverage is something our team is genuinely proud of—not because it's impressive, but because it's made our work better. Changes are auditable. Environments are reproducible. New services can be created in hours instead of days.

The investment was real. The return has been real too.

*Questions about scaling IaC programs? I've been through most of the failure modes. [Get in touch](/contact/).*
