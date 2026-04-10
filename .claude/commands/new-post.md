# New Blog Post — Interview & Draft

You are helping Darren Bell write a new post for his blog at darrenbell09.github.io/DB_Blog.

Darren is a Senior Cloud Architect with 10+ years in enterprise IT — primarily Microsoft 365, Azure, healthcare IT, and IT operations/leadership. He uses AI as a writing collaborator: he provides the expertise and real experiences, AI structures and expresses them. The post must reflect his actual knowledge and voice, not generic IT content.

## Step 1: Run the Interview

Tell Darren you're going to ask him 7 questions, one at a time. Wait for his answer before asking the next. Do not ask multiple questions at once.

Ask these questions in order:

**Q1 — Topic & thesis**
"What's the topic, and what's the one thing you want readers to walk away knowing? Finish this sentence if it helps: 'Most people think X, but actually Y.'"

**Q2 — The common mistake**
"What's the conventional wisdom or common approach that's wrong, incomplete, or that you'd push back on? What do organizations or practitioners typically get wrong about this?"

**Q3 — Your experience**
"Walk me through a real situation where you encountered this — at Premier Health, an MSP, or anywhere else. What did you actually see? What happened?"

**Q4 — A specific example**
"Give me one concrete, specific detail from that experience — a number, a cost, a quote someone said, a folder name, a specific tool, a decision that backfired or paid off. Something observable and real, not summarized."

**Q5 — What actually works**
"What's the right approach, based on what you've seen? What do the organizations or teams that get this right actually do differently?"

**Q6 — The reader**
"Who is this post for? What role are they in, and what situation are they in when this post is useful to them?"

**Q7 — CTA**
"How do you want to close? Options: link to your contact page with a relevant prompt, link to a related post, or no CTA."

---

## Step 2: Confirm Before Writing

After all 7 answers, briefly summarize what you heard back to Darren in 3–4 bullet points and ask: "Does that capture it? Anything to add or correct before I write the draft?"

---

## Step 3: Write the Post

Once confirmed, write a complete draft post in Darren's established voice and style.

### Voice & Tone
- Direct and declarative. State things as fact, not hedged opinion.
- Short punchy sentences mixed with longer explanatory ones. Vary rhythm deliberately.
- Practitioner perspective throughout — "from someone doing the work," not a consultant selling frameworks.
- Name the real problem vs the perceived problem. Reframe early.
- No filler phrases: no "It's worth noting," "It's important to understand," "In today's landscape," "As we've seen."
- Use "you" and "your" to address the reader directly.
- Em-dashes for parenthetical asides. Never parentheses for prose.

### Structure
Follow this pattern, using the reference post as the model:

1. **Opening paragraph (no heading)** — Start with an observable reality the reader will immediately recognize. Something they've seen in their own environment. Build to the reframe (the thesis). End with a short, blunt sentence that lands the point.

2. **3–4 H2 sections** — Each with a specific, descriptive heading (not generic). Use bold callouts for the key sub-points within sections. Each section should end with a sentence that draws the lesson, not just describes the situation.

3. **Closing section** — Zoom out to the organizational or leadership principle. Name what the technology enables vs what leadership/discipline actually creates. Land the thesis one more time, differently.

4. **CTA line** — Italicized, one sentence, links to whatever Darren specified in Q7. If contact page, write a brief contextual prompt (e.g., *"Planning a SharePoint migration or trying to revive one that stalled? [I'm happy to think through the approach.](/contact/)"*). If a related post, write a natural bridge sentence.

### Front Matter
Generate complete Jekyll front matter:
```yaml
---
layout: post
title: "..."
subtitle: "..."
date: YYYY-MM-DD
category: [Cloud Architecture | Microsoft 365 | Infrastructure Ops | Technology Leadership | FinOps | Security | AI & Automation]
tags: [tag1, tag2, tag3, ...]
excerpt: "..."
---
```

- **Title**: Specific and opinionated. Often uses a reframe ("X is a Y problem, not a Z problem") or a contrast. Not a how-to title.
- **Subtitle**: One sentence that elaborates the reframe or sharpens the thesis. Reads like a strong subhed, not a description.
- **Date**: Ask Darren for the publish date, or use today's date if he doesn't specify.
- **Category**: Pick the single best fit from the list above.
- **Tags**: 5–8 specific tags. Include the main technologies mentioned and the conceptual theme.
- **Excerpt**: 2–3 sentences. Opens with the observable problem, closes with a tease of the reframe. Should make someone click.

### Length
Target 800–950 words of body text (excluding front matter and CTA). Long enough to develop the argument fully and deliver real value. Not padded.

### Real Examples
Darren's specific examples must appear in the post — the exact numbers, tool names, folder names, quotes, or situations he described in the interview. Do not generalize or smooth over the specifics. The specifics are what make the post credible.

---

## Step 4: Fact-Check the Draft

Before offering to save, fact-check every verifiable technical claim in the post. Do not skip this step.

### What to check
Look for and verify:
- **Product and feature names** — exact Microsoft/vendor terminology (e.g. "Microsoft Entra hybrid joined" not "Hybrid Azure AD joined"; "People in your organization" not "Anyone in the organization")
- **Feature behavior** — does the technology actually do what the post claims? Flag any claims where the mechanism is imprecise or oversimplified.
- **Regulatory claims** — compliance requirements (HIPAA, GDPR, SOC 2, etc.). Verify what the regulation *actually* requires vs. common misstatements.
- **Statistics and figures** — any percentages, cost savings ranges, or benchmarks that weren't sourced directly from Darren's own experience. Verify against authoritative sources.
- **Tool names and acronyms** — confirm the full name is correct (e.g. CIPP = "CyberDrain Improved Partner Portal", not a guess).

### What not to flag
- Darren's own documented experiences (his specific cost savings figures, his specific situations) — these are his data, not verifiable claims
- Opinion and framing statements — the thesis, the leadership lessons, the "what works" judgments
- General best practices that are industry-standard

### How to report
After checking, present findings in one of three states:
- **Clean** — "No technical inaccuracies found. Ready to save."
- **Minor fixes** — List each issue briefly, make the corrections directly in the draft, show Darren what changed, then proceed.
- **Needs Darren's input** — If something can't be verified or the correct answer changes the substance of a claim, flag it with a specific question before making any change.

Do not present a long report if everything is clean. Only surface what actually needs attention.

---

## Step 5: Offer to Save

After the fact-check is complete, ask:
"Want me to save this as a post file and commit it to the repo? I'll need the publish date if you haven't given one."

If yes, save to `_posts/YYYY-MM-DD-[slug].md` where the slug is a hyphenated lowercase version of the title, commit with message `Add new post: [title]`, and push to main.
