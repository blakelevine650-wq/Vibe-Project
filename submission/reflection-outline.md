# Reflection outline — evidence to write from

This is raw material for **your** reflection, not a draft of it. The assignment says the 750–1,000 words can't be LLM output, so nothing below is written as paste-ready sentences. Each section lists the facts from the build (with where to find them in the appendix) and questions only you can answer. Pick the strongest 2–3 points per section; you won't fit all of them.

Suggested word budget: Vision ~120 · Journey ~220 · Fell short ~220 · Humans ~220 · Does well ~150 → about 930.

Prompt numbers (P1–P9) match the headings in the appendix transcript (`appendix/transcripts/session-1.md`).

---

## Hard numbers you can cite

| Fact | Value | Where it comes from |
|---|---|---|
| Prompts from empty repo to deployed-ready pull request | 7 (P1–P7) | transcript |
| Wall-clock time for those 7 prompts | about 1 hour (21:37 → 22:36 UTC, 14 Nov) | transcript timestamps |
| Lines added | 7,680 across 46 files | pull request #1 |
| Lines of code you wrote by hand | 0 — all 7 build commits are authored by Claude | `git log` |
| Automated tests the AI wrote and ran | 30 | PROMPT_LOG Phase 4–6 |
| Design/product decisions the AI logged as "made without asking" | 19 across Phases 1–5 | PROMPT_LOG "Decisions made without asking" |
| Memory-written coordinates later checked against OpenStreetMap | 62 | content-verification.md |
| …off by more than 100 ft | **34 (55%)**; 6 off by more than 500 ft; median 129 ft | content-verification.md |
| Worst misses | Matthaei Gardens 2,902 ft; Burton Tower 1,910 ft (placed south of the Diag; it's north of it) | content-verification.md |
| Place it couldn't find at all | Law Quad (no OpenStreetMap entry; used Hutchins Hall instead) | P6 |
| Rows in your verification checklist | 346 | content-verification.md |
| **Your own verification results** | *fill in: items checked, how many wrong, error types, time it took* | your tally |

The last row is the strongest evidence you can have and only you can produce it. Even a partial check counts (for example "I checked 40 of 346 rows; 6 were wrong: …").

---

## 1. Your original vision

Facts:
- The plan existed before any code and was pasted in whole as P1 (its own phase table assigned setup to Opus and building to Fable). It fixed scope (MVP vs stretch vs out of scope), the disclaimer, "no Block M", America/Detroit seeding, and a content-verification step built in from the start.
- Audience: U-M students. Two goals in one product: a daily game (habit, streak, sharing) and practical Canvas / Wolverine Access skills.

Questions for you:
- Why this product? Was there a real annoyance (e.g. not knowing a Wolverine Access menu) behind the Tip of the Day idea?
- Why did you design verification into the plan before starting? What did you expect the AI to get wrong?

---

## 2. The vibe coding journey

Facts:
- Prompting style: one phase per prompt, each ending "commit and push when done"; the plan acted as a contract. Prompts got shorter as the plan carried the context (P2 is one line).
- P1: the AI built Phase 0 *and* Phase 1, with placeholder rounds so the results screen could be tested before the games existed.
- P3 pivot (yours): with only 4 places the guess list *was* the answer pool. The AI flagged "the list itself is a hint" in its P2 reply; you chose the fix (a separate 40–60 place guess-only list).
- P4 pivot: a vague, taste-based prompt ("not vibe coded slop") produced a full concept (student newspaper) without further direction. The AI screenshotted its own work and fixed four visual bugs it saw (tabs overflowing on a 320px phone, Play button below the fold, a lopsided compass needle, misaligned labels).
- P6 surprise: the AI's sandbox blocked OpenStreetMap; it asked you to approve a network change; one of the two map services still failed, so it worked around it with the other.
- Model switch: the plan said Opus for setup and Fable for building, but the session actually ran Fable from P1 (Claude found this by checking the session settings; PROMPT_LOG records it). You switched to Opus for P9 (this reflection).

Questions for you:
- What did it feel like to direct rather than write code? Did you read any of the code?
- Which moment surprised you most — the one-hour build, the redesign, or the coordinate errors?

Sources: **Sarkar & Drosos (2025)** describe vibe coding as iterative cycles of prompting, evaluating output by testing the app, and redirecting — compare to your phase-by-phase loop. **Willison (2025)** defines vibe coding as not reviewing the code the LLM writes — did you review code, or only behavior and content? That distinction is worth a sentence or two.

---

## 3. Where the LLM fell short

Concrete moments (pick 2–3):
- **Factual content from memory.** 34 of 62 coordinates were off by more than 100 ft. It placed Burton Tower on the wrong side of the Diag. Clues, trivia and tips were also written from memory and have not been checked by anything except you.
- **It can't see what it's documenting.** It said itself it is least sure of the 7 Wolverine Access tips: it has never seen those screens. Only a logged-in student can check them.
- **It tests its own work.** Its browser tests twice failed because of mistakes in its own test scripts (P3: clicking a locked button; P4: typing "grad" matched two places), and it fixed the test, not the app. Nobody independent checked the checker.
- **A flaw its tests missed** (found while taking these screenshots): typing "di" in the guess box lists 28 places, because "Building" contains "di". Search matches letters anywhere in a name, not at the start of words.
- **Design by default.** 19 product decisions were made without asking (scoring values, free first clue, share format, streak rules, what counts as a "win"). It logged them, but you only find them if you read the log.
- **Limits of its access:** it couldn't change GitHub settings (Pages source), make the repo public, or reach blocked websites. It couldn't open the two papers for this reflection either.
- **Scale assumptions:** practice mode replays "back issues" from the 365 days before today — before launch those are days nobody played. The AI flagged it but kept it.

Questions for you:
- Did you have to correct anything by hand, or did every fix go through a prompt? (Both answers are interesting.)
- From your verification: which error type was most common, and how would a player have noticed it?

Sources: **METR (Becker et al., 2025)** found experienced developers were 19% *slower* with AI while believing they were faster, with the extra time going to reviewing and fixing AI output. Your code came fast, but the review cost moved to content: 346 rows to check. **Sarkar & Drosos** stress that trust has to be earned through verification — the coordinate data shows why.

---

## 4. Why humans are still foundational

Your judgment calls (from the transcript):
- Scope and ethics before code: the unofficial-project disclaimer, no university logos, no accounts or backend (privacy), not connecting to real Canvas/Wolverine Access.
- P3: keeping the free first clue and list-based guessing, and inventing the separate guess pool.
- P4: deciding the first design wasn't good enough.
- P5: asking for the streak back after the redesign removed it.
- P6: insisting coordinates come from a real map source, not memory.
- Approving the network change; making the repo public; turning on Pages; choosing the launch date.
- Human slips matter too: your P7 prompt still had the template placeholder "[your launch date]", and P8 had "[fill in the date!]". The AI noticed and didn't guess. Worth a sentence: the human is also a source of error.
- Verification itself: the 346-row checklist exists because AI output isn't trustworthy by default.

Questions for you:
- Which decision would have gone badly if you had accepted the AI's default?
- How long did verification take compared with the one-hour build?

Sources: **Sarkar & Drosos**: expertise isn't removed, it's *redistributed* toward evaluating output and managing context — your PLAN.md and checklist are both examples. **Willison** (paraphrased in secondary sources — check his wording): if you've reviewed and tested the code and can explain it, that is software development rather than vibe coding. Which side of that line did your project fall on?

---

## 5. What LLMs do well

Facts:
- Speed and breadth: a working, tested, deployable app in about an hour, from 7 prompts and no hand-written code.
- Engineering habits you didn't ask for: 30 automated tests; daylight-saving and timezone edge cases; saving progress so a refresh can't be used to retry; holding back today's tip from the library so it can't give away the answer.
- Honesty about uncertainty: it told you the losing path was untested in P2, flagged the guess list as a hint, flagged its least-certain content, and refused to guess the launch date.
- Turning a vague aesthetic prompt into a coherent design, and catching its own visual bugs from screenshots.
- Tooling work around obstacles: used OpenStreetMap once allowed and produced the before/after error data.

Questions for you:
- Which of these would you have been unable to do yourself, versus able but slower?

Sources: **METR** notes its slowdown result may not hold for small new projects or less experienced developers — a solo greenfield prototype is exactly the case where your experience differs. **Willison** argues vibe coding is great for low-stakes personal tools; your project sits between low-stakes and something other students would rely on.

---

## Sources (APA 7, already in the document's References)

1. Sarkar, A., & Drosos, I. (2025). *Vibe coding: Programming through conversation with artificial intelligence*. Proceedings of the 36th Annual Conference of the Psychology of Programming Interest Group (PPIG 2025). arXiv:2506.23253. https://arxiv.org/abs/2506.23253 — think-aloud study of about 8.5 hours of vibe coding sessions.
2. Becker, J., Rush, N., Barnes, E., & Rein, D. (2025). *Measuring the impact of early-2025 AI on experienced open-source developer productivity* (arXiv:2507.09089). METR. https://arxiv.org/abs/2507.09089 — randomized trial, 16 developers, 246 tasks, 19% slower with AI.
3. Torres, T. (2026, April). *Vibe coding best practices: Avoid the doom loop with planning and code reviews*. Product Talk. https://producttalk.org/2026/04/vibe-coding-best-practices/ — added by Blake; the "doom loop" of an agent claiming a bug is fixed when it isn't.
4. Willison, S. (2025, March 19). *Not all AI-assisted programming is vibe coding (but vibe coding rocks)*. Simon Willison's Weblog. https://simonwillison.net/2025/Mar/19/vibe-coding/

**Read them before citing.** These details come from search results; Claude's network blocked arxiv.org and simonwillison.net, so it could not open the full texts. Check any quotation against the source itself.
