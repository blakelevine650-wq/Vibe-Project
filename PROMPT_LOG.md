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

---

## Session 1 (continued) — Guess list split + Phase 3 (Quick Three + Tip of the Day)

- **Date:** 2026-11-14
- **Tool:** Claude Code (web/desktop)
- **Model:** claude-fable-5-2

### Prompt 3

> Keep the free first clue and the list-based guessing. Separate the guess list from the answer pool: add a larger list of guessable campus places (40–60) that can be guessed but are never answers, so the list doesn’t give the answer away. Then start Phase 3 (Quick Three + Tip of the Day). Commit and push when done.

### What Claude did

**Guess list separated from the answer pool**

- New `public/data/guessable-places.json`: 58 campus places (name, coordinates, aliases, no clues) that can be guessed but are never picked as the answer. The daily engine still only draws answers from `places.json`.
- The guess box now searches both files together (62 places). Typing "library" offers three libraries, not just the answer.
- This made the losing path reachable; it now works and was tested (five wrong guesses → answer revealed, 0 points).
- All 58 are logged one row each in `appendix/content-verification.md` as unchecked. **They were written from memory with no map lookup.**

**Phase 3 — Quick Three** (`src/components/QuickThree.tsx`)

- One question at a time with a category chip and "Question 1 of 3".
- Tap a choice and it locks: the right answer gets a green outline and ✓, a wrong pick gets a red outline and ✗, and the explanation shows if the question has one. Then "Next question".
- The order of the choices is shuffled, seeded by question + date, so everyone sees the same order that day. (In the sample data the right answer was always the second choice.)

**Phase 3 — Tip of the Day** (`src/components/TipOfTheDay.tsx`)

- Step card first (Canvas / Wolverine Access chip, title, numbered steps), then "Got it — quick check".
- The steps are hidden while you answer the check question, so it actually tests whether you read them. Afterwards a "Review the steps" section is available (opened automatically if you got it wrong).

**Other**

- Removed the placeholder rounds; nothing in the app is a stand-in anymore.
- Added `src/lib/content.test.ts`: structure checks on the content files (unique ids, no two places sharing a name or alias, coordinates inside the Ann Arbor area, 5 clues per answer, valid answer indexes, 3–5 steps per tip, 40–60 guess-only places). These catch broken data, **not wrong facts**. 24 tests total.
- Played the whole game in a phone-sized browser: losing Campus Clue, a right and a wrong trivia answer, a locked question not changing when tapped again, the tip check, and the results screen (75/200 with the matching share grid).

**Decisions made without asking**

- Steps are hidden during the tip check.
- Choice order is shuffled per day.
- Trimmed my first draft of the guess list from 64 to 58 to stay in the 40–60 range.

**Known gaps**

- Still only 4 possible answers, 2 trivia questions per category and 2 tips, so puzzles repeat within days (Phase 5).
- Nothing is saved between visits (Phase 4).

### My notes

_(What worked? What did you have to correct?)_

---

## Session 1 (continued) — Frontend redesign

- **Date:** 2026-11-14
- **Tool:** Claude Code (web/desktop)
- **Model:** claude-fable-5-2

### Prompt 4

> use top tier frontend design skills in order to redesign the frontend to make sure it elite, polished, and of the highest quality. Should not look like every other vibe coded slop

### What Claude did

- Picked one concept and applied it everywhere: **the app is a student newspaper**, since the name already sounds like one.
  - **Masthead:** a serif nameplate, "Ann Arbor, Mich. · No. 1" strip, and a maize dateline band. It shrinks once you start playing.
  - **Sections:** the three rounds are Sections A, B and C, shown as newspaper-style tabs; finished ones are struck through in maize.
  - **Front page:** a headline, the Play button, then an "In this edition" index with the points for each round.
  - **Campus Clue:** the newest clue is set large like a pull quote; guesses are a ledger with a small compass dial whose needle points at the exact bearing (plus "1.5 mi SW" in text), and five squares show guesses used.
  - **Questions:** lettered A–D rows; the right answer is highlighted in maize, a wrong pick is struck through in red.
  - **Tip of the Day:** a dashed "clip & save" coupon with large italic step numbers.
  - **Results:** a verdict headline that changes with your score, a very large score that counts up, a "box score" table with a total line, the share grid as a clipping, and "Next edition in" countdown.
  - **Dark mode** is the "night edition" (toggle reads "Night ed." / "Day ed.").
- Replaced the generic look: no rounded cards, drop shadows, pill buttons or emoji used as icons (emoji remain only in the share text, where they are the point).
- Three open-source fonts, self-hosted via npm so nothing loads from an outside server: Fraunces (headlines), Schibsted Grotesk (text), DM Mono (labels and numbers).
- Small motion only: screens and new clues ease in, the score counts up; all of it is turned off for people who set "reduce motion".
- Added a favicon.
- No game logic changed except `feedbackFor` now also returns the exact bearing and a compass abbreviation for the dial. 24 tests pass.
- Checked every screen by screenshot at four sizes — iPhone, a 320px-wide small phone, desktop, and dark mode — with no sideways scrolling and no console errors. Fixed what the screenshots showed: section tabs overflowing on the 320px phone, the Play button sitting below the fold on the home screen, a lopsided compass needle, and misaligned labels.

**Decisions made without asking**

- The newspaper concept itself, and the copy that comes with it ("Today's edition", "Box score", "Front-page material.", etc.).
- Removed the "Streak (Phase 4)" placeholder tile from the results screen; the streak will be designed in when Phase 4 builds it.
- The third tab reads "The Tip" (the full name did not fit on small phones). The round is still called Tip of the Day everywhere else.

### My notes

_(What worked? What did you have to correct?)_

