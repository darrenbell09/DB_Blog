---
layout: post
title: "Buying Copilot Licenses Isn't an AI Strategy"
subtitle: "Chinese AI models are genuinely impressive and free to use. That makes governance more urgent, not less."
date: 2026-04-11
category: AI & Automation
tags: [AI transformation, Microsoft Copilot, SMB, Microsoft 365, AI adoption, governance, data security, DeepSeek, Chinese AI, GLM]
excerpt: "Chinese AI labs have closed the performance gap faster than most organizations expected. Free, capable models are now available to anyone with an internet connection. For small and mid-sized businesses without an AI governance framework, that changes the risk calculation significantly."
---

In January 2025, DeepSeek R1 matched GPT-4 class performance at a fraction of the cost. It was free to use via a web interface and API. The AI industry spent a week trying to process the implications.

Your employees spent that same week noticing it was free.

Alibaba's Qwen 3 followed a few months later. Then in June 2026, Zhipu AI released GLM-5.2, a 744 billion parameter open-weight model that outscored GPT-5.5 on SWE-bench Pro, one of the most rigorous coding benchmarks in use, and released it under an MIT license. Each successive release has closed the gap with Western frontier models a little further, and each one is freely accessible via API.

For a cost-conscious employee trying to work faster, that changes the calculation entirely. These are not low-quality workarounds. They are genuinely capable tools, and in some benchmarks they now lead the field. For most small and mid-sized businesses, there is nothing stopping employees from using them on company data right now.

---

## What Happens When You Use a Chinese AI Model on Company Data

The performance of these models is not the problem. Where the data goes when you use them is.

DeepSeek, Qwen, GLM-5.2, and similar tools hosted by Chinese companies process and store data on servers in China. China's National Intelligence Law, passed in 2017, requires organizations operating in China to cooperate with state intelligence work. That means the Chinese government can compel access to stored data. There is no enterprise data processing agreement, no GDPR-equivalent protection, and no contractual obligation governing how your data is retained or used. GLM-5.2 ships with an MIT license that allows anyone to download and run the model weights, but most users are not running 744 billion parameters on their own hardware. They are using the API, and the API sends data to China.

Security researchers found DeepSeek transmitting user data to third-party servers without clear disclosure. The United States Navy, NASA, the Italian government, Australia, Taiwan, South Korea, and several U.S. states have banned DeepSeek from official use specifically because of these risks. The bans are not hypothetical caution. They reflect documented concerns about where that data goes. The same legal framework that applies to DeepSeek applies to every Chinese-hosted model, regardless of how capable or how open the weights are.

One distinction matters here: running an open-weight model on your own infrastructure is a different risk profile than using someone else's API. Organizations with the technical capability to self-host have more control over their data. Most SMBs are not self-hosting. They are using the web interface or the API, which means the data is leaving the building and going to servers in China with none of the enterprise protections that would govern an approved tool.

The problem is not that these models exist. The problem is the absence of governance that would tell employees what they can and cannot use, and why.

---

## What Happens When There Is No Policy

I had someone ask to use DeepSeek on company data because it was free. No awareness of where the data would be processed, no understanding of the organization's acceptable use policy, because there was no acceptable use policy. The request was completely well-intentioned. The risk was significant.

That request was not an anomaly. It is what happens when capable, free AI tools exist and organizational AI strategy does not.

Employees are not trying to create security incidents. They are trying to do their jobs faster. As Chinese models continue to close the quality gap with paid Western tools, the temptation to use them will increase. Without a clear policy, employees will reach for whatever works.

The most expensive outcome is not a data breach that gets caught. It is customer data, contract language, or internal financials leaving your environment with no log entry and no recourse.

---

## What Microsoft's Copilot Adoption Methodology Actually Says

Microsoft publishes a Copilot adoption methodology that most organizations buying Copilot have never read. It exists because Microsoft knows what happens when the process gets skipped. The methodology is built around three phases: Envision, Onboard, and Drive Value.

**Envision** is where the real groundwork happens before any deployment decision is made. This phase covers executive sponsorship, defined use cases tied to business outcomes, and measurable success criteria. It also covers the technical prerequisites: permissions audited across SharePoint and OneDrive, sensitivity labels and data loss prevention policies configured, Microsoft Entra ID properly set up, MFA enforced for every user, and Microsoft 365 Apps current on all devices. Licenses are purchased in Envision too, once the business case is established and the environment is ready.

**Onboard** is where deployment begins. Champions are identified and trained before broader rollout. Users receive training before they are handed a new tool. The groundwork from Envision is what makes this phase work. Without it, Onboard is a rollout into an unprepared environment.

**Drive Value** is where you measure against the success criteria from Envision, expand to additional users, and iterate based on what you learn.

Most SMBs skip Envision entirely and go straight to Onboard. The result is low adoption, unclear ROI, and an environment where employees still reach for whatever tool fills the gap.

---

## What Getting This Right Actually Requires

Start with Envision. Get executive alignment on what AI is supposed to accomplish for the business. Name the use cases. Define what success looks like in measurable terms. Establish an acceptable use policy that tells employees which tools are approved and what data can go into them. This conversation cannot happen in IT. It has to happen at the leadership level.

Then do the technical readiness work. Audit who has access to what in SharePoint and OneDrive. Configure sensitivity labels. Set up DLP policies that reflect how your data actually needs to be protected. Ensure every user has MFA enforced. These are not Copilot prerequisites in isolation. They are the baseline security posture your organization should already have. If they are not in place, AI deployment will surface that gap in the most visible way possible.

Purchase and deploy once the environment is ready. Train champions before broad rollout. Then measure and expand.

That sequence is not bureaucratic overhead. It is the difference between an organization that gets value from AI tools and one that spends the budget and wonders why nothing changed.

---

## This Is a Leadership Problem

IT can configure the technical prerequisites. IT cannot create an AI strategy, define business use cases, build an acceptable use policy, or establish the governance culture that makes responsible AI adoption possible.

The organizations that successfully adopt AI tools are the ones where leadership decided to invest in the process, not just the product. As Chinese AI models continue to improve and remain free, the pressure on employees to use them will only grow. A policy written after an incident is not a policy. It is a response.

Buying the Copilot license is the easy part. Doing the work that makes the license worth having, and that keeps company data inside a governed environment, is what most organizations are not willing to prioritize until something goes wrong.

What has your experience been with AI adoption in your organization? Did the strategy come before the purchase, or did the tool arrive before anyone knew what to do with it?
