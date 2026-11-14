# Content Verification Log

Every content item the AI drafts gets a row here. A human checks each one against a real source and records the result. Nothing counts as verified until it has a row marked ✅.

**How to verify**

- **Places** — check the coordinates on Google Maps (right-click the building → copy lat/lng); check each clue is true.
- **Trivia** — check against a reliable source (umich.edu, Bentley Historical Library, mgoblue.com, etc.) and note the source.
- **Tips** — follow the steps on your own Canvas / Wolverine Access screens; save a screenshot in `appendix/screenshots/` and note the filename.

**Status key:** ⏳ not checked · ✅ correct as drafted · ✏️ wrong, fixed · ❌ wrong, removed

**Error types:** `coords` (location off) · `fact` (false claim) · `outdated` (was true, isn't now) · `ui-step` (menu/button name or order wrong) · `ambiguous` (more than one defensible answer) · `other`

## Summary

Update this table whenever the log below changes.

| Type | Generated | Checked | Correct | Wrong | Error rate |
|---|---|---|---|---|---|
| Places (answers) | 4 | 0 | 0 | 0 | — |
| Places (guess-only) | 58 | 0 | 0 | 0 | — |
| Trivia | 6 | 0 | 0 | 0 | — |
| Tips | 2 | 0 | 0 | 0 | — |
| **Total** | **70** | **0** | **0** | **0** | — |

## Places (`public/data/places.json`)

| ID | Batch | Status | Error type | What was wrong / fix | Source | Checked on |
|---|---|---|---|---|---|---|
| burton-tower | P1 sample | ⏳ | | | | |
| michigan-stadium | P1 sample | ⏳ | | | | |
| hatcher-library | P1 sample | ⏳ | | | | |
| the-cube | P1 sample | ⏳ | | | | |

## Guess-only places (`public/data/guessable-places.json`)

These can be typed as guesses in Campus Clue but are never the answer. Only the name and coordinates need checking (coordinates drive the distance/direction feedback). Also check the place still exists under this name.

| ID | Batch | Status | Error type | What was wrong / fix | Source | Checked on |
|---|---|---|---|---|---|---|
| diag | P2 guess list | ⏳ | | | | |
| michigan-union | P2 guess list | ⏳ | | | | |
| michigan-league | P2 guess list | ⏳ | | | | |
| hill-auditorium | P2 guess list | ⏳ | | | | |
| rackham-building | P2 guess list | ⏳ | | | | |
| angell-hall | P2 guess list | ⏳ | | | | |
| shapiro-undergraduate-library | P2 guess list | ⏳ | | | | |
| west-hall | P2 guess list | ⏳ | | | | |
| east-hall | P2 guess list | ⏳ | | | | |
| randall-laboratory | P2 guess list | ⏳ | | | | |
| chemistry-building | P2 guess list | ⏳ | | | | |
| dana-building | P2 guess list | ⏳ | | | | |
| biological-sciences-building | P2 guess list | ⏳ | | | | |
| museum-of-art | P2 guess list | ⏳ | | | | |
| clements-library | P2 guess list | ⏳ | | | | |
| kelsey-museum-of-archaeology | P2 guess list | ⏳ | | | | |
| lsa-building | P2 guess list | ⏳ | | | | |
| law-quad | P2 guess list | ⏳ | | | | |
| martha-cook-building | P2 guess list | ⏳ | | | | |
| ross-school-of-business | P2 guess list | ⏳ | | | | |
| weill-hall | P2 guess list | ⏳ | | | | |
| school-of-education-building | P2 guess list | ⏳ | | | | |
| east-quad | P2 guess list | ⏳ | | | | |
| south-quad | P2 guess list | ⏳ | | | | |
| west-quad | P2 guess list | ⏳ | | | | |
| munger-graduate-residences | P2 guess list | ⏳ | | | | |
| north-quad | P2 guess list | ⏳ | | | | |
| modern-languages-building | P2 guess list | ⏳ | | | | |
| power-center | P2 guess list | ⏳ | | | | |
| school-of-dentistry | P2 guess list | ⏳ | | | | |
| couzens-hall | P2 guess list | ⏳ | | | | |
| alice-lloyd-hall | P2 guess list | ⏳ | | | | |
| mosher-jordan-hall | P2 guess list | ⏳ | | | | |
| stockwell-hall | P2 guess list | ⏳ | | | | |
| mary-markley-hall | P2 guess list | ⏳ | | | | |
| school-of-public-health | P2 guess list | ⏳ | | | | |
| detroit-observatory | P2 guess list | ⏳ | | | | |
| university-hospital | P2 guess list | ⏳ | | | | |
| nichols-arboretum | P2 guess list | ⏳ | | | | |
| rock | P2 guess list | ⏳ | | | | |
| crisler-center | P2 guess list | ⏳ | | | | |
| yost-ice-arena | P2 guess list | ⏳ | | | | |
| ray-fisher-stadium | P2 guess list | ⏳ | | | | |
| schembechler-hall | P2 guess list | ⏳ | | | | |
| intramural-sports-building | P2 guess list | ⏳ | | | | |
| elbel-field | P2 guess list | ⏳ | | | | |
| duderstadt-center | P2 guess list | ⏳ | | | | |
| pierpont-commons | P2 guess list | ⏳ | | | | |
| lurie-bell-tower | P2 guess list | ⏳ | | | | |
| beyster-building | P2 guess list | ⏳ | | | | |
| eecs-building | P2 guess list | ⏳ | | | | |
| g-g-brown-building | P2 guess list | ⏳ | | | | |
| fxb-building | P2 guess list | ⏳ | | | | |
| moore-building | P2 guess list | ⏳ | | | | |
| art-and-architecture-building | P2 guess list | ⏳ | | | | |
| bursley-hall | P2 guess list | ⏳ | | | | |
| north-campus-recreation-building | P2 guess list | ⏳ | | | | |
| matthaei-botanical-gardens | P2 guess list | ⏳ | | | | |

## Trivia (`public/data/trivia.json`)

| ID | Batch | Status | Error type | What was wrong / fix | Source | Checked on |
|---|---|---|---|---|---|---|
| sports-001 | P1 sample | ⏳ | | | | |
| sports-002 | P1 sample | ⏳ | | | | |
| traditions-001 | P1 sample | ⏳ | | | | |
| traditions-002 | P1 sample | ⏳ | | | | |
| campus-life-001 | P1 sample | ⏳ | | | | |
| campus-life-002 | P1 sample | ⏳ | | | | |

## Tips (`public/data/tips.json`)

| ID | Batch | Status | Error type | What was wrong / fix | Screenshot | Checked on |
|---|---|---|---|---|---|---|
| canvas-grade-breakdown | P1 sample | ⏳ | | | | |
| wa-class-schedule | P1 sample | ⏳ | | | | |

## Notes

- **P1 sample** = the small placeholder set drafted in Phase 1 so the daily engine had something to select from. It was written from the AI's memory with no source lookup. The AI flagged `wa-class-schedule` (the Wolverine Access menu names) and the coordinates of `the-cube` as the items it was least sure of.
- **P2 guess list** = the 58 guess-only places drafted when the guess list was separated from the answer pool. Names and coordinates were written from the AI's memory with no map lookup; expect some to be off by a building or more. The AI was least sure of the North Campus buildings, the Hill-area residence halls (given the same longitude as a rough guess), and the athletic-campus buildings.
