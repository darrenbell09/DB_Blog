---
layout: post
title: "From Senior Engineer to Director: What Nobody Tells You"
subtitle: "The transition from technical practitioner to engineering leader is harder than the technology ever was"
date: 2024-04-08
category: Technology Leadership
tags: [leadership, engineering management, career, director, team building]
excerpt: "The skills that make you a great senior engineer are largely useless as a director. Here's what actually matters in the transition, and what I wish I'd known."
---

I became a manager because I was good at infrastructure engineering. This is, I've since learned, a terrible reason to become a manager—and an almost universal one in our industry.

The path is predictable: you're a strong senior engineer, you get promoted to principal, and then someone says "we need a leader for this team" and your name comes up. You accept, partly because it seems like the next logical step, partly because you care about the team, and partly because nobody has told you yet that the job you're about to do has almost nothing in common with the job you're currently good at.

I've now been in engineering leadership for eight years—team lead, engineering manager, senior manager, and for the last four years, Director of Infrastructure Operations. This is what I wish someone had told me when I started.

## Your Technical Credibility Is Both an Asset and a Trap

When you move into leadership, your technical depth is valuable. Teams respect leaders who understand what they're asking people to do. You can smell architectural decisions that will create problems. You can engage authentically in technical debates rather than just nodding along.

But your technical credibility becomes a trap when you use it to solve the wrong problems.

In my first year as an engineering manager, I kept being the technical decision-maker on my team's problems. An engineer would come to me with an architectural question, I'd engage deeply with it, offer a solution, and they'd implement my solution. This felt productive. It was actually harmful.

I was depriving my team of the struggle that produces growth. I was the bottleneck on decisions that shouldn't need me. I was optimizing for the feeling of usefulness rather than the growth of my team.

The transition I had to make: **from being the technical decision-maker to being the environment in which good technical decisions get made.** 

Your job is not to have the best answers. Your job is to build a team that has better answers than you.

## The Most Important Skill Change: Output Shifts to Influence

As a senior engineer, your output is measurable and largely under your control. You write code, design systems, review PRs, write runbooks. When you have a productive day, you know it.

As a director, your output is people. You move at the speed of other people's growth, which is slow, non-linear, and not under your direct control. The feedback loop on your decisions is months, sometimes years.

This is deeply uncomfortable if you're used to the fast feedback of engineering work. You'll feel unproductive. You'll be tempted to drop into code reviews, architectural decisions, and incident response because that's where you can see immediate impact.

Resist this. Your job now is to:

**Hire well.** A bad hire costs 18 months and enormous team cohesion. A great hire delivers value for years. The leverage on hiring decisions dwarfs most other things a leader does.

**Remove obstacles.** Your team's job is to build things. Your job is to clear the path. Bureaucracy, unclear priorities, misaligned incentives, unclear ownership, political friction—these are yours to resolve.

**Create clarity.** Ambiguity is one of the most expensive things in engineering organizations. Unclear priorities, undefined ownership, fuzzy requirements—all of these consume engineering time and produce frustration. Creating clarity is hard, unglamorous leadership work that pays enormous dividends.

**Develop people.** Helping an engineer grow from mid-level to senior creates value for years. One conversation that changes how someone thinks about their career is worth more than a hundred code reviews.

## The Feedback You're Not Getting

Engineers get feedback constantly. Tests pass or fail. Systems work or don't. PRs get approved or need changes. The feedback loop is tight.

Directors get almost no feedback. Your boss meets with you monthly if you're lucky. Your team tells you what they think you want to hear in 1:1s because you control their performance reviews and compensation. Peers are polite. The problems with your management style manifest slowly, in attrition and morale trends that are hard to attribute.

You have to build your own feedback mechanisms:

**Skip-level 1:1s.** Meet with your team's direct reports (not your own reports) regularly. Ask them what's going well and what's frustrating. Listen for patterns.

**Engineer engagement in retrospectives.** Create a space where your team can tell you what's not working. Then actually change things in response to it, or explain honestly why you can't.

**Build genuine relationships with peers.** Your peer engineering leaders will tell you things your team won't. Not in a political way—in a "patterns I'm observing" way. Invest in these relationships.

**Exit interviews, done right.** Every engineer who leaves is carrying information about your organization's health. If you're having HR conduct exit interviews with a survey, you're getting sanitized data. Have a candid conversation with departing engineers yourself, without HR present, after the two-week notice period when people are more willing to be honest.

## On Managing People Who Know More Than You

This comes up more in infrastructure leadership than almost anywhere else, because the technology changes so fast.

Your team will know things you don't know. Kubernetes internals. The latest Terraform provider. How a specific database engine handles lock contention under specific failure modes. You will not be the most technically knowledgeable person in every conversation.

This is fine. More than fine—it's the goal. If you're the smartest person in the room on every technical topic, you have a team problem.

Your credibility as a leader in these situations doesn't come from technical depth. It comes from:

- **Asking good questions.** "What are the failure modes?" "Have we considered the operational burden?" "What would this look like in 18 months at 10x scale?" Good questions demonstrate judgment without requiring you to have the answers.
- **Making good decisions with incomplete information.** Technical decisions are rarely made with complete information. Comfort with ambiguity and sound decision-making process is what your team needs from you.
- **Protecting the space for engineers to be experts.** When a product manager or business stakeholder wants to override an engineering decision, your job is to ensure the technical voice is heard and respected—not to override engineers yourself.

## On the People Problems You'll Spend Most of Your Time On

Nobody prepares senior engineers for personnel problems. They're the part of the job that is emotionally exhausting, rarely has clean solutions, and consumes more leadership bandwidth than most technical problems.

A few things I've learned:

**Address underperformance immediately.** The instinct is to give people time, to wait and see. The cost of waiting is: the underperforming person stays in a role they're failing in (which isn't good for them), the rest of the team carries the load (which damages morale and trust), and the problem gets harder to address the longer it persists. Address it clearly and early.

**Don't confuse style with underperformance.** Some engineers are quiet contributors who rarely volunteer in meetings. Some are loud, visible, and dominate discussions. Neither is inherently a problem. Evaluate on outcomes, not on whether someone communicates like you do.

**Conflict between people on your team is yours to resolve.** Don't let interpersonal conflict fester and expect it to resolve itself. It won't. Get in the room with both people, name the issue clearly, and work toward resolution. This is uncomfortable. It's your job.

**Know when someone needs to leave.** Some people are wrong for the role, wrong for the team, or wrong for the company—and the kindest thing you can do is help them find somewhere they're right for. Keeping someone in a role they're failing in isn't compassion; it's avoidance.

## The Leadership Tax on Technical Judgment

Here's something that took me years to internalize: as a leader, your technical opinions carry more weight than they should.

When the Director says "I think we should evaluate Istio for service mesh," the team will start evaluating Istio. When the senior engineer suggests the same thing, the team will debate it.

This means you need to be more careful with your technical opinions than you were as an engineer. What sounds like thinking out loud to you sounds like direction to your team.

Practice making your opinion level explicit: "I have a strong opinion on this" vs. "I have a mild preference" vs. "I genuinely don't know, here's what I'd think about." Give your team explicit permission to disagree with you, and mean it when you do.

## The Long Game

Engineering leadership is a long game. The decisions you make today—the people you hire, the culture you set, the technical direction you enable—play out over years.

I've had decisions pay off in ways I didn't expect, two or three years later. I've had decisions that felt great at the time turn out to be wrong. The feedback loop is long enough that you can spend months going in the wrong direction before you see the evidence.

The best defense against this: stay close to the work (not in the work), maintain genuine relationships with your team, and cultivate the intellectual humility to update your views when you're wrong.

The technology is the easy part. The people work is where it gets hard—and interesting.

---

*I write about technology leadership and infrastructure operations because I've made most of the mistakes worth writing about. If any of this resonates, or if you're navigating a leadership transition, [I'm happy to talk](/contact/).*
