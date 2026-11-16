# Wolverine Daily — Project Plan

An unofficial daily puzzle + campus how-to game for University of Michigan students. One short session a day: play the puzzles, keep your streak, learn one Canvas / Wolverine Access skill, share your score.

Disclaimer shown in-app: "Unofficial student project. Not affiliated with or endorsed by the University of Michigan." No official logos (no Block M); original styling in a maize/blue-inspired palette.

## Core daily loop (MVP)

Each day (seeded by date in America/Detroit time, so everyone gets the same puzzle):

1. **Campus Clue** — guess a mystery campus place (building, landmark, spot).
   - Up to 5 guesses. After each wrong guess you see the distance and direction to the target (e.g. "0.8 mi ↗") plus a new text clue.
   - Fewer guesses = more points.
2. **Quick Three** — 3 multiple-choice trivia questions, one each from: Sports, Traditions/History, Campus Life.
3. **Tip of the Day** — one short Canvas or Wolverine Access how-to (e.g. "How to see your grade breakdown in Canvas") as a 3–5 step card, followed by a 1-question check ("Which menu do you click first?").

Then a results screen: score, streak, emoji share grid (copy to clipboard), countdown to tomorrow.

## Supporting features

- **Stats & streaks** — games played, win %, current/max streak, guess distribution (saved in localStorage).
- **Practice mode** — replay random past puzzles (doesn't affect streak).
- **How-to library** — all past Tips of the Day, searchable, grouped by Canvas / Wolverine Access.
- Mobile-first, works well on a phone; light/dark mode.

## Stretch (only if time)

- Mystery Wolverine round: guess a Michigan athlete/coach with attribute feedback (sport, position, era, number).
- Leaflet/OpenStreetMap map reveal after Campus Clue.
- Installable PWA (works offline).

## Out of scope

Accounts, backend, global leaderboards, connecting to real Canvas/Wolverine Access.

## Tech

- Vite + React (TypeScript optional — let the AI pick and note it), static site, no backend.
  - **Decision (Phase 1): TypeScript.** The content JSON and round results have fixed shapes, and type-checking catches mismatches between them and the UI.
- Content in JSON: `places.json` (name, lat/lng, clues), `trivia.json`, `tips.json`.
- Deterministic daily puzzle selection from the date.
- Deploy: GitHub Pages via GitHub Actions.

## Content verification (human job — key reflection evidence)

The AI will draft content; you verify every item and log errors in `appendix/content-verification.md`:

- Building coordinates (check on Google Maps)
- Trivia facts (check a reliable source)
- Canvas / Wolverine Access steps (check against your own screens; screenshots in `appendix/screenshots/`)

Track: items generated, items wrong, type of error. This becomes hard data for the reflection.

## Build phases

| Phase | Model | Work |
|---|---|---|
| 0. Setup | Opus | Repo, README, this plan, PROMPT_LOG.md |
| 1. Scaffold + daily engine | Fable | Vite app, date seeding, layout, results screen |
| 2. Campus Clue | Fable | Guess input, distance/direction, clues, scoring |
| 3. Quick Three + Tip of the Day | Fable | Trivia, how-to cards, check question |
| 4. Stats, streaks, share, practice | Fable | localStorage, emoji grid, library |
| 5. Content + verification | You + Fable | Generate content, you fact-check, log errors |
| 6. Polish + deploy | Fable | Mobile, dark mode, GitHub Pages |
| 7. Reflection | Opus or Fable | Find 2 sources, outline, you write it |

## Prompt / response logging (assignment requirement)

- Every Claude Code session transcript is kept on claude.ai — export/copy each one into `appendix/transcripts/` at the end of each session.
- `PROMPT_LOG.md`: each prompt verbatim + short summary of what Claude did + your notes (what worked, what you had to correct). Ask Claude to append to it at the end of each phase.
- Note in the reflection: one tool (Claude), with a model switch (Opus for planning → Fable for building).

## Repo layout (target)

```
/src            app code
/public/data    places.json, trivia.json, tips.json
/appendix       transcripts/, screenshots/, content-verification.md
PROMPT_LOG.md
PLAN.md
README.md
REFLECTION.md
```
