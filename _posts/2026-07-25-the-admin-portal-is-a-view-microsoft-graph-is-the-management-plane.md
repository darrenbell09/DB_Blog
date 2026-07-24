---
layout: post
title: "The Admin Portal Is a View. Microsoft Graph Is the Management Plane."
subtitle: "AI has lowered the barrier for IT administrators to work directly with the API layer that runs Microsoft 365. Here is how to start."
date: 2026-07-25
category: Microsoft 365
tags: [Microsoft Graph, Microsoft 365, automation, IT administration, AI, PowerShell, Graph X-Ray, API, identity]
excerpt: "Every action you take in the Microsoft 365 admin center is an API call to Microsoft Graph. The portal is just the interface that initiates it. AI has changed what administrators can do with the layer underneath."
---

Most IT administrators manage Microsoft 365 through the admin portals. That is a reasonable starting point. The portals expose the most common tasks through a graphical interface, and they work. But the portals are not the management plane. Microsoft Graph is the management plane. The portals are a view of it.

Understanding that distinction changes what you can do as an administrator. It also changes how you think about automation, reporting, and governance at scale.

---

## What Microsoft Graph Actually Is

Every action you take in the Microsoft 365 admin center, the Entra portal, or the SharePoint admin center is an API call to Microsoft Graph. The portal is a client application. Graph is the underlying service. When you assign a license, disable a user, or configure a policy, you are triggering an API call that Graph processes. The portal is the interface that initiates it.

Graph is a single REST API endpoint that provides access to data and management operations across the entire Microsoft 365 surface: users, groups, devices, mail, calendars, files, Teams, security policies, compliance settings. One authenticated API layer for everything Microsoft 365 manages.

The reason most administrators have not engaged with Graph directly is that working with an API traditionally required development skills. You needed to understand authentication flows, write code, handle responses, and debug endpoints. That friction kept Graph in the developer lane and left administrators working through the portal UI.

I am not a software developer. For years, Graph was something I knew existed but treated as someone else's tool. AI has changed that calculation significantly, and it has changed it for administrators specifically.

---

## The Tool That Shows You What the Portal Is Doing

Merill Fernando built a browser extension called Graph X-Ray. It runs in the background while you navigate the Microsoft 365 admin portals. Every time the portal makes a call to Microsoft Graph, Graph X-Ray captures it: the method, the endpoint, the request body, the response. It also generates the corresponding code, including Microsoft Graph PowerShell.

What this means in practice: you perform any admin task normally through the portal, then open Graph X-Ray and see exactly what API call the portal made to accomplish it. You get the endpoint, the payload, and a starting point for turning that action into a script or automation.

This is the bridge most administrators have not had. The portal becomes a teaching tool for Graph. Every click you have been making for years has been calling an endpoint. Now you can see which one.

---

## The Tool That Keeps AI Honest About Graph Endpoints

One of the persistent problems with using AI to write Graph-based code is hallucinated endpoints. The Microsoft Graph API is large and changes frequently. Models trained on older data confidently generate endpoints that have been deprecated, renamed, or never existed. The code looks correct. It fails at runtime.

Merill Fernando also built a Microsoft Graph Skill for AI agents. It gives the AI agent access to a current, searchable Graph API reference so it is working from accurate documentation rather than training data. The result is code that actually runs against live endpoints instead of code that only looks plausible.

Both tools address the same underlying problem from different directions: getting administrators closer to the API layer without requiring them to be developers.

---

## A Practical Workflow

The combination of Graph X-Ray, the Graph Skill, and AI assistance creates a workflow that does not require a development background.

Start with a task you already know how to do in the portal. Something repeatable: bulk license assignment, pulling a report of inactive accounts, auditing group membership. Do it once while Graph X-Ray is running.

Open Graph X-Ray and review the calls the portal made. Note the endpoint and the request structure. That is your starting material.

Take the endpoint to the Microsoft Graph documentation and understand what parameters it accepts and what it returns. The documentation is the authoritative source.

Bring that context to an AI assistant with the Graph Skill enabled, or paste the endpoint and your goal into a prompt for a capable model. Ask it to generate the PowerShell logic you need. Review what it produces.

Run it in a test environment. Validate the output. Then operationalize it.

This process does not require writing code from scratch. It requires understanding what you are trying to accomplish, knowing where to verify the information, and using AI to handle the translation work.

---

## The Consolidation That Is Not Complete

Graph is the direction Microsoft is moving everything toward, but the consolidation is not finished. Exchange Online, SharePoint, Teams, Microsoft Purview, and Microsoft Defender all still have workload-specific APIs and PowerShell modules that run alongside Graph endpoints. Some administrative operations are only available through those workload-specific paths today.

The direction is clear. Graph is becoming the primary management surface. Workload-specific APIs will persist during the transition, but the long-term investment is in Graph. Administrators who build familiarity with it now are building familiarity with the management plane everything else is converging toward.

---

The portal is useful. It is also a ceiling. Every time you use the admin center to accomplish something, you are one layer away from the actual management surface. AI has made that layer more accessible than it has ever been.

The question is whether you are using Graph as the tool it is, or treating the portal as the end of the road.

What has your experience been with Microsoft Graph? Are you using it for automation, or is most of your administration still happening through the portal?
