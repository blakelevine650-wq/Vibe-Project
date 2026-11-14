# Wolverine Daily

An unofficial daily puzzle + campus how-to game for University of Michigan students. One short session a day: play the puzzles, keep your streak, learn one Canvas / Wolverine Access skill, share your score.

> **Unofficial student project. Not affiliated with or endorsed by the University of Michigan.**
> No official logos are used; the styling is original, in a maize/blue-inspired palette.

SI 110 FLEX Project.

## Status

| Phase | Work | Status |
|---|---|---|
| 0 | Setup: repo, README, plan, prompt log | Done |
| 1 | Scaffold + daily engine | Done |
| 2 | Campus Clue | Done |
| 3 | Quick Three + Tip of the Day | Done |
| 4 | Stats, streaks, share, practice | Done |
| 5 | Content + verification | Content drafted; **my verification in progress** |
| 6 | Polish + deploy | Not started |
| 7 | Reflection | Not started |

All three rounds are playable, your games are saved in the browser (stats, streaks, resume after a refresh), and there is a practice mode and a how-to library. The content in `public/data/` — 30 answer places, 57 guess-only places, 30 trivia questions, 15 tips — was drafted by the AI and is **not yet verified by a person**. Coordinates come from OpenStreetMap; clues, trivia and tips were written from the AI's memory. The checklist is `appendix/content-verification.md`.

## The daily loop

1. **Campus Clue** — guess a mystery campus place in up to 5 guesses, with distance/direction and a new clue after each miss.
2. **Quick Three** — 3 multiple-choice questions: Sports, Traditions/History, Campus Life.
3. **Tip of the Day** — a short Canvas or Wolverine Access how-to card plus a 1-question check.
4. **Results** — score, streak, emoji share grid, countdown to tomorrow.

Everyone gets the same puzzle each day: selection is seeded by the calendar date in `America/Detroit`.

## Design

The app is styled as a student newspaper: a nameplate and dateline, lettered sections (A, B, C), hairline rules, a "clip & save" tip card and a box score on the results page. Two inks — navy and maize — on newsprint, with a dark "night edition". No official logos or marks.

## Run it

```bash
npm install
npm run dev      # local dev server
npm test         # unit tests for the daily engine
npm run build    # type-check + production build into dist/
```

## Tech

- Vite + React + **TypeScript** (chosen over plain JS so the content JSON shapes and round results are type-checked)
- Static site, no backend; content in `public/data/*.json`
- Vitest for the date/seed/selection logic
- Fonts are self-hosted through Fontsource (Fraunces, Schibsted Grotesk, DM Mono — all open-source), so nothing loads from a third-party CDN
- Place coordinates are from OpenStreetMap (© OpenStreetMap contributors, ODbL)
- Deploy target: GitHub Pages via GitHub Actions (Phase 6)

## Repo layout

```
/src            app code
  /lib          daily engine: date, seeded RNG, selection, scoring, share text
  /components   screens
/public/data    places.json (answers), guessable-places.json (guess-only), trivia.json, tips.json
/appendix       transcripts/, screenshots/, content-verification.md
PROMPT_LOG.md   every prompt + what Claude did + my notes
PLAN.md         project plan
README.md
REFLECTION.md   (Phase 7)
```
