# Prompt Log

One entry per prompt: the prompt verbatim, a short summary of what Claude did, and my notes (what worked, what I had to correct). Claude appends the first two parts at the end of each phase; **the "My notes" sections are mine to write.**

Full session transcripts are in `appendix/transcripts/`.

---

## Session 1 — Phase 0 (Setup) + Phase 1 (Scaffold + daily engine)

- **Date:** 2026-11-14
- **Tool:** Claude Code (web/desktop)
- **Model:** claude-fable-5-2
- **Transcript:** `appendix/transcripts/` _(export and add filename)_

### Prompt 1

> Set up this repo for my project “Wolverine Daily.” Create README.md, PLAN.md (use the plan below), PROMPT_LOG.md, and an appendix/ folder with transcripts/, screenshots/, and content-verification.md. Then start Phase 1.
>
> _[The full project plan was pasted below this line in the same prompt. Its text is saved in `PLAN.md`.]_

### What Claude did

**Phase 0 — setup**

- Wrote `README.md`, `PLAN.md`, this log, and `appendix/` (`transcripts/`, `screenshots/`, `content-verification.md`).
- `PLAN.md` is the pasted plan with markdown formatting added (headings, lists, the phase table). The only added text is one line under Tech recording the TypeScript decision.
- `content-verification.md` has a status key, error-type categories, a summary table (generated / checked / correct / wrong / error rate), and one row per content item.

**Phase 1 — scaffold + daily engine**

- Chose **TypeScript** (plan left it to the AI): the content JSON and round results have fixed shapes, so type-checking catches mismatches.
- Scaffolded Vite + React by hand (`package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`), with a relative `base` so it will work on a GitHub Pages sub-path.
- Daily engine in `src/lib/`:
  - `date.ts` — calendar date in `America/Detroit`, puzzle day number (puzzle #1 = 2026-11-14), countdown to Detroit midnight.
  - `rng.ts` — string hash + seeded PRNG + seeded shuffle.
  - `daily.ts` — picks the day's place, one trivia question per category, and tip. Each pool is walked in a seeded shuffled order, so nothing repeats until the pool is used up.
  - `scoring.ts` — points (Campus Clue 100/80/60/40/20 by guess, 25 per trivia question, 25 for the tip check; max 200) and the emoji share text.
- Layout: header, light/dark toggle (follows the system setting until toggled), round progress bar, in-app disclaimer footer, mobile-first CSS in an original navy/maize-inspired palette, no logos.
- Results screen: total score, per-round breakdown, live countdown to the next puzzle, share grid with copy-to-clipboard, and a "new puzzle is ready" button after midnight.
- The three rounds are **placeholders**: they show what the engine picked and let you choose an outcome so the flow can be tested. Real gameplay is Phases 2–3.
- Drafted a small sample content set (4 places, 6 trivia, 2 tips) so the engine has data, all logged as unchecked in `content-verification.md`.
- 10 unit tests for the engine (`npm test`); checked the built app end to end in a phone-sized browser, light and dark.

**Decisions made without asking (change any of these if you disagree)**

- Puzzle #1 is 2026-11-14. Move `EPOCH_DATE_KEY` in `src/lib/date.ts` to the real launch date before deploying.
- The scoring values above.
- Share-grid format: 📍 one square per guess, ❓ three squares, 💡 one square.
- Copy-to-clipboard and the dark-mode toggle were built now, although the plan lists them under Phases 4 and 6, because the results screen and layout needed them.

**Known gaps left for later phases**

- Nothing is saved: refreshing mid-game starts over, and the streak tile shows "—" (Phase 4).
- The countdown can be an hour off before 2 a.m. on the two daylight-saving change days.
- Adding or removing content items changes which item past days map to (matters for practice mode in Phase 4).

### My notes

_(What worked? What did you have to correct? Did the model match the plan for this phase?)_

---

## Session 1 (continued) — Phase 2 (Campus Clue)

- **Date:** 2026-11-14
- **Tool:** Claude Code (web/desktop)
- **Model:** claude-fable-5-2

### Prompt 2

> Set the Model line in PROMPT_LOG.md to claude-fable-5-2. Then start Phase 2 (Campus Clue). Commit and push when done.

### What Claude did

- Set the Session 1 Model line as asked.
- Replaced the Campus Clue placeholder with the real round (`src/components/CampusClue.tsx`):
  - **Guess input** — type a name and matching places appear as tappable buttons. Matching ignores case, punctuation and a leading "the", and also checks aliases ("big house" finds Michigan Stadium). Pressing Enter submits only when exactly one place matches; otherwise a hint asks you to pick. You can only guess places from the list, and a place you already guessed is not offered again.
  - **Distance and direction** — each wrong guess gets a row like "0.9 mi ↗": straight-line distance from your guess to the target and one of 8 compass arrows pointing toward it. Under a tenth of a mile it switches to feet.
  - **Clues** — the first clue is shown before you guess; each wrong guess reveals one more (5 clues, 5 guesses).
  - **Scoring** — uses the Phase 1 values (100/80/60/40/20, 0 for a miss). The end of the round shows the points, or the answer if you ran out of guesses, then a Continue button.
  - Screen-reader announcements for each guess result.
- New `src/lib/geo.ts` (haversine distance, bearing, compass arrow, distance formatting, name search) with 7 new unit tests (17 total).
- Tested in a phone-sized browser: no-match hint, alias + Enter, tapping a suggestion, feedback rows, clue reveal, win on guess 3, and the score carrying through to the results screen.

**Decisions made without asking**

- The first clue is free (shown before any guess). The plan only says a new clue comes after each wrong guess; starting blind seemed unfair.
- Guesses are picked from the place list, not free text, so there are no spelling or "close enough" arguments.
- Distances are in miles/feet, straight-line.

**Known gaps**

- **The losing path is not reachable yet, so it was not tested in the browser.** There are only 4 sample places, so you can make at most 3 wrong guesses. It needs 6 or more places (Phase 5 content).
- With 4 places the round is trivially easy for the same reason.
- Quick Three and Tip of the Day are still placeholders (Phase 3).

### My notes

_(What worked? What did you have to correct?)_

