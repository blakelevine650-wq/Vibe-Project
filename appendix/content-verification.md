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
| Places | 4 | 0 | 0 | 0 | — |
| Trivia | 6 | 0 | 0 | 0 | — |
| Tips | 2 | 0 | 0 | 0 | — |
| **Total** | **12** | **0** | **0** | **0** | — |

## Places (`public/data/places.json`)

| ID | Batch | Status | Error type | What was wrong / fix | Source | Checked on |
|---|---|---|---|---|---|---|
| burton-tower | P1 sample | ⏳ | | | | |
| michigan-stadium | P1 sample | ⏳ | | | | |
| hatcher-library | P1 sample | ⏳ | | | | |
| the-cube | P1 sample | ⏳ | | | | |

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
