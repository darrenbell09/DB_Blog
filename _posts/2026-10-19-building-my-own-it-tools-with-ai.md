---
layout: post
title: "What I've Learned Building My Own IT Tools With AI"
date: 2026-10-19 08:00:00 -0500
category: Technology Leadership
excerpt: "I'm an IT director who builds software for the problems I see at work, with AI as part of the toolkit. Here's how I keep the quality bar high."
---

I'm an IT director by day. At night I build software.

Everything I build comes out of problems I deal with at work, so I know exactly who it's for and what good looks like. AI handles a lot of the typing now. My time goes into deciding what the software should do, testing it hard, and pushing back when the AI takes a shortcut.

That last part doesn't get talked about enough. Getting code that runs is easy now. Getting something you'd trust in front of a real user still takes judgment.

## Think about the person using it

The question I keep coming back to is simple: what would someone think if they saw this screen with no context?

If a progress bar sits on one number for too long, people assume something's wrong, even when it's working fine in the background. If a page is named after how the code works instead of the job it does, nobody knows what to click. If an error message only makes sense to the person who wrote it, the user's stuck.

AI is good at building what you asked for. It's not great at noticing what you didn't ask for. That part's my job.

## Root cause, not quick fixes

When a test turns something up, the first fix the AI suggests isn't always the right one. Often it's something that gets past the error today and leaves a problem for later, like hardcoding a version or granting more access than the app needs.

Here's an example. During install testing on my own laptop, I hit a module version conflict. The suggested fix was to pin an older version of the module. It would have worked that day, but that version goes stale, and then the fix only holds as long as somebody remembers to update it. So I said no. If it showed up on my machine, it could show up on anyone's, so the installer for my next release checks for it and handles it. I'd rather build a system that doesn't depend on someone remembering.

## Run it like a real product

I hold my own software to the standard I'd expect from any vendor I buy from. That means a stable release line people can rely on, new features built separately so they can't disturb it, and updates on a planned cycle with time built in to patch.

The basics from IT operations carry straight over:

- Version control from day one
- A test environment that isn't production
- Secrets kept out of the code
- Only the access the app actually needs
- Logs, so you can see exactly what happened

None of that is new. It's just easy to skip when AI makes building feel this fast.

## Keep it focused

The AI will happily keep building whatever you tell it to. It's on me to ask whether it should. When I'm not sure something is standard practice, I ask how product teams normally do it and build to that.

Focus matters too. I'd rather ship something simple that does the job well than something bigger that's harder to use and support. Every feature has to earn its place.

## Where I've landed

AI has made it possible for people who know the problems firsthand to build the tools that fix them. I don't take that for granted. But the AI doesn't put its name on what ships. I do.

So I spend less time writing code than I ever expected, and a lot more time testing, asking why, and saying no to fixes that just push the problem down the road.

That bar matters more to me right now than ever. One of the tools I've been building is getting close to its first release outside my own desk, and everything in this post is the standard it has to meet before it goes out.

If you're in IT and building your own tools this way, I'd like to hear how you're approaching it.
