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

---

## Session 1 (continued) — Phase 4 (Stats, streaks, practice, how-to library)

- **Date:** 2026-11-14
- **Tool:** Claude Code (web/desktop)
- **Model:** claude-fable-5-2

### Prompt 5

> Start Phase 4 (stats, streaks, practice mode, how-to library), designed to match the newspaper style. Bring back the streak on the results screen. Commit and push when done.

### What Claude did

**Saving (localStorage)** — `src/lib/storage.ts`

- Each finished daily game is saved by date. Corrupt or wrongly shaped saved data is ignored instead of crashing the app.
- The daily game is also saved as you play: Campus Clue guesses, Quick Three answers and the tip-check answer are stored the moment you make them. Refreshing brings you back with "Continue today's puzzle" and the same guesses and answers, so a refresh can't be used to retry.
- Once today is finished the front page changes to "That's today's paper read" with "See today's results"; the daily puzzle can't be replayed.
- If the browser refuses to save (private mode), a note says so.

**Stats page ("Standings")** — `src/lib/stats.ts`, `src/components/StatsPage.tsx`

- Played, Win %, Current streak, Best streak as large figures; a bar chart of how many guesses Campus Clue took (today's bar in maize); average and best score.
- A streak counts days in a row with a finished game. It stays alive through today until midnight even if you haven't played yet.

**Streak on the results screen** — back, as a two-box strip: streak on the left, "Next edition in" countdown on the right.

**Practice mode**

- "Practice with a back issue" on the front page, the stats page and the results page. It plays a random other day's puzzle, marked with a "Practice · back issue · no streak" bar and a Quit link.
- Practice results show the score only (no share grid) and are never saved, so they can't change stats or streak.
- It skips back issues whose mystery place is the same as today's, so practice can't spoil today's puzzle.

**How-to library**

- Every tip that has already run as Tip of the Day, grouped under Canvas and Wolverine Access, each opening to its steps, with a search box over titles and steps.
- Today's tip is added only after you finish today's puzzle, so the library can't be used to look up the check answer.

**Navigation** — a Today / Stats / How-tos bar in the same style as the section tabs. It is replaced by the A/B/C tabs while a round is being played.

**Testing**

- 6 new unit tests (30 total): stats, streaks across month ends and the daylight-saving change, and saved-data validation.
- Browser run on a phone-sized screen: resume after refresh in Campus Clue, in Quick Three, and after the tip check; a streak continuing from earlier days (seeded test data showed 3); stats and chart values; library before and after playing, search and no-match; a full practice game leaving saved data unchanged; Quit from practice. No console errors, no sideways scrolling.

**Decisions made without asking**

- "Win" = finding the Campus Clue place (stated on the stats page).
- Practice draws from the 365 day-numbers before today. Until the game has been live for a while most of those are dates before launch, i.e. puzzles nobody played rather than true "past" puzzles.
- No button to reset stats.

**Known gaps**

- With only 4 answers, 6 trivia questions and 2 tips, practice games repeat the daily content heavily (Phase 5).
- Stats live in one browser on one device; clearing browser data erases them (no accounts, by design).
- Changing `EPOCH_DATE_KEY` or the content files later will change which puzzle a saved date maps to; saved scores and streaks are unaffected.

### My notes

_(What worked? What did you have to correct?)_

---

## Session 1 (continued) — Phase 5 (Content + verification checklist)

- **Date:** 2026-11-14
- **Tool:** Claude Code (web/desktop)
- **Model:** claude-fable-5-2

### Prompt 6

> Start Phase 5. Expand the content to: 30 answer places, 10 trivia questions per category (30 total), and 15 tips (mix of Canvas and Wolverine Access). For all place coordinates, including the 58 guessable places, try to look them up from OpenStreetMap instead of using memory, and tell me which ones you couldn’t verify or that moved more than 100 feet. Then make appendix/content-verification.md a checklist I can work through, with a column for “Correct? / What was wrong.” Commit and push when done

### What Claude did

**Getting to OpenStreetMap**

- The session's network settings blocked OpenStreetMap. Claude asked for, and I approved, a new cloud environment named "Vibe-Project" that allows two OpenStreetMap hosts.
- Of the two, only the search service (Nominatim) worked through the session's proxy; the bulk-query service (Overpass) kept dropping the connection. Every place was looked up by name through Nominatim, one request at a time, limited to the Ann Arbor area.

**Content now in `public/data/`**

- **30 answer places** (was 4), each with 5 clues. 26 were promoted from the old guess-only list, because the best-known places make the best answers.
- **57 guess-only places** (was 58): the 32 left over, plus 25 new ones so the guess list still hides the answers. 87 guessable places in total.
- **30 trivia questions**, 10 per category (was 6).
- **15 tips**: 8 Canvas, 7 Wolverine Access (was 2).

**What the OpenStreetMap lookup found**

- Of the 62 coordinates Claude had earlier written from memory, **34 (55%) were off by more than 100 ft**; 6 were off by more than 500 ft. Median error 129 ft. Worst: Matthaei Botanical Gardens (2,902 ft) and Burton Memorial Tower (1,910 ft — the memory value put it south of the Diag; it is north).
- **Could not verify: Law Quad.** OpenStreetMap has nothing named Law Quad or Law Quadrangle, so it uses the coordinates of Hutchins Hall, the Law School building on its corner.
- 21 other matches are judgment calls (different official name, a big area reduced to one point, or a place that may have moved, such as Elbel Field and The Cube). All are listed in the checklist.
- All coordinates in the data files are now OpenStreetMap's. An attribution line was added to the app footer and README, as OpenStreetMap's license requires.

**What was NOT looked up**

- Every clue (150), trivia question (30) and tip step was written from Claude's memory. Nothing checked them. Claude said it is least sure of the 7 Wolverine Access tips, since it cannot see those screens.

**The checklist — `appendix/content-verification.md`**

- Rewritten as tables to work down, each row with a ☐ box and a "Correct? / What was wrong" column: 87 coordinates (each with a clickable map link and a flag showing how far it moved), 150 clues, 30 trivia questions (with a Source column), and 15 tips step by step (79 rows, with a screenshot-filename line per tip). 346 rows in total.
- A tally table at the top to fill in, a list of error-type words to use so errors can be counted, and the memory-vs-OpenStreetMap comparison as ready-made data for the reflection.

**Testing** — the 30 existing tests still pass, including the content-structure checks (unique names, coordinates inside the Ann Arbor area, 5 clues per answer, valid answer indexes, 3–5 steps per tip). Played a full game in the browser on the new content with no errors.

**Decisions made without asking**

- Promoting 26 guess-only places to answers and adding 25 new guess-only places.
- Dropping Hutchins Hall from the guess list (its coordinates stand in for Law Quad).
- Area places (the Arb, the Diag, Matthaei, Baits) use the center point OpenStreetMap gives.

**Known gaps**

- Changing the content changed which puzzle each date maps to, so today's puzzle is different from the one earlier today. Saved scores are unaffected.
- OpenStreetMap can itself be wrong or out of date; its coordinates are a better starting point than memory, not a substitute for my check.

### My notes

_(How many items were wrong? Which kinds of errors? How long did checking take compared with how long the AI took to write it?)_

---

## Session 1 (continued) — Phase 6 (Polish + deploy)

- **Date:** 2026-11-14
- **Tool:** Claude Code (web/desktop)
- **Model:** claude-fable-5-2

### Prompt 7

> Start Phase 6 (polish and deploy). Set EPOCH_DATE_KEY to [your launch date], open a pull request from this branch to main, and set up GitHub Pages deployment. I’m verifying content in parallel and will send corrections after.

### What Claude did

- **Launch date not set.** The prompt still had the placeholder "[your launch date]" in it, so `EPOCH_DATE_KEY` was left at 2026-11-14 and Claude asked for the real date.
- **GitHub Pages deployment** — `.github/workflows/deploy.yml`:
  - On every pull request: install, run the tests, build. Nothing is published.
  - On every push to `main`: the same, then publish the build to GitHub Pages.
  - Checked by doing a clean install, test and build from only the files in the repo, and by serving the build from a `/Vibe-Project/` sub-path the way Pages does (data, fonts and icon all loaded, no failed requests).
  - **Needs one manual step from me:** Settings → Pages → Source: GitHub Actions. Claude cannot change repository settings.
- **Polish**
  - No white flash when opening in dark mode: the theme is set before the page draws.
  - The phone's browser bar matches the page color in both themes.
  - The copied share text ends with the game's link, taken from wherever the page is hosted.
  - Content stays clear of the notch and home bar on phones.
  - Page title and description for link previews; a message for browsers with JavaScript off.
- **Pull request** opened from `claude/serene-euler-9pzpky` to `main`.
- 30 tests pass.

**Known gaps**

- Content is still unverified; corrections from the checklist come next.
- No installable/offline (PWA) version and no map reveal: both were stretch goals.
- The workflow has not run on GitHub yet; its first real run is on the pull request.

### My notes

_(What worked? What did you have to correct?)_

---

## Session 1 (continued) — Phase 7 prep (the assignment write-up)

- **Date:** 2026-11-16
- **Tool:** Claude Code (web/desktop)
- **Model:** claude-opus-5-5 (switched with `/model` before this prompt)

### Prompt 9

> ok now lets do the assignment
>
> _[The full assignment brief was pasted below this line: overview, learning goals, instructions, report structure (Part 1 reflection, Part 2 prototype showcase, Part 3 appendix), submission and grading. It is reproduced in full in the appendix transcript.]_

### What Claude did

- **Did not write the reflection.** The brief says the 750–1,000 words can't be LLM prompts or outputs, and PLAN.md's Phase 7 says "you write it", so Claude prepared everything around it instead.
- **Sources:** found and checked three (two required): Sarkar & Drosos (2025), a peer-reviewed think-aloud study of vibe coding; Becker et al. (2025, METR), a randomized trial on AI and developer speed; and Willison (2025), an industry blog post defining vibe coding. Formatted them in APA 7. The session's network blocked arxiv.org and simonwillison.net, so details come from search results; the full texts still need reading before quoting.
- **Outline** (`submission/reflection-outline.md`): for each of the five required sections, the concrete evidence from the build (with prompt numbers), questions only I can answer, and where each source fits. Plus a table of hard numbers to cite.
- **Screenshots:** played three real days of the game in a phone-sized browser, with the browser clock set to 14, 15 and 16 Nov, against the production build at its GitHub Pages address. 10 cropped screenshots with draft captions are in `submission/images/`.
- **Appendix:** rendered the full session log as `appendix/transcripts/session-1.md`: every prompt and reply word for word, every tool action on one line with a short output excerpt, private details removed.
- **Submission document** (`submission/Wolverine-Daily-Assignment.docx`): title block placeholders, Part 1 headings to write under (12 pt Times New Roman, double-spaced, 1-inch margins), References, Part 2 with links and the 10 captioned figures, Part 3 with the transcript.
- **Found while taking screenshots:** typing "di" in the Campus Clue box lists 28 places, because search matches letters anywhere in a name ("Building" contains "di"). Left unfixed so the screenshots and captions stay accurate; noted in Figure 2.

### My notes

_(Fill in after writing the reflection.)_

---

### Prompt 10

> fix the "di" search bug, and then have output the reflection in plain texts, should include the prototype images as well as the appendix as a single pdf document

### What Claude did

- **Fixed the search bug.** Campus Clue search now matches the start of words in a name or alias, not letters anywhere. "di" now finds only The Diag (it listed 28 places before); "lib", "hall" and "quad" still find every library, hall and quad. Added a test for it (31 tests total).
- **Re-took the screenshots** on the fixed build. Figure 2 now shows "ha" listing Hatcher and the halls, and its caption describes the word-start matching instead of the bug.
- **Did not write the reflection.** Claude declined: the assignment says the 750–1,000 words can't be LLM output, and submitting its text would present it as mine. It offered to drop in my own draft, check length and formatting, and rebuild the PDF.
- **Rebuilt the single PDF** (`submission/Wolverine-Daily-Assignment.pdf`): title block, Part 1 headings waiting for my text, references, Part 2 with the 10 captioned screenshots, and Part 3 with the full transcript through this prompt.

### My notes

_(Fill in.)_

---

### Prompt 11

> _[My own notes for Part 1: Original vision, Vibe coding journey, Where the LLM fell short, and sources. Reproduced word for word in the appendix transcript.]_

### What Claude did

- Put my notes into Part 1 with only spelling and grammar fixed, and rebuilt the PDF.
- Pointed out what still costs points: the length (about 210 of 750 words), two missing sections, the claim that the LLM didn't fall short, two statements the appendix doesn't support, and GitHub/Twitter as sources.

### My notes

_(Fill in.)_

---

### Prompt 12

> _[My own text for "Why humans are still foundational" and "What LLMs do well". Reproduced word for word in the appendix transcript.]_

### What Claude did

- Put both sections into Part 1, fixing only spelling and grammar, and rebuilt the PDF. All five sections now have text; the total was still below 750 words.

### My notes

_(Fill in.)_

---

### Prompt 13

> _[My name and section, two more paragraphs for Part 1, and a source I found (Product Talk, "Vibe coding best practices"). Reproduced word for word in the appendix transcript.]_

### What Claude did

- Put my name and section on page 1, added my paragraphs to "The Vibe Coding Journey" and "Where the LLM Fell Short" with spelling and grammar fixed, and added my source to the References as Torres (2026), with an in-text citation where I mention it.
- The network blocked producttalk.org, so the article details come from search results.

### My notes

_(Fill in.)_

---

### Prompt 14

> _[Asked to remove the references I didn't cite, and sent a new source (roadmap.sh, "Vibe coding best practices") with a paragraph about /compact and context bleed. Reproduced word for word in the appendix transcript.]_

### What Claude did

- Removed Sarkar & Drosos, Becker et al. and Willison from the References, since Part 1 doesn't cite them.
- Added my paragraph to "The Vibe Coding Journey" with an in-text citation, and added roadmap.sh (n.d.) to the References. The References now hold the two sources Part 1 cites.

### My notes

_(Fill in.)_

---

### Prompt 15

> _[Another paragraph for "Why humans are still foundational". Reproduced word for word in the appendix transcript.]_

### What Claude did

- Added it to that section with spelling and grammar fixed, and rebuilt the PDF.

### My notes

_(Fill in.)_

