# Content Verification Checklist

Everything the AI drafted for the game is listed here, one row per thing to check. Work down each table: tick the box, and write in the last column either **OK** or what was wrong. Fix the JSON file too (or ask Claude to), then update the tally.

**How to check**

- **Coordinates** — click the map link. The pin should land on (or within about 100 ft of) the named place. If not, right-click the right spot in Google Maps, copy the lat/lng, and write it in.
- **Clues and trivia** — check each statement against a reliable source (umich.edu pages, Bentley Historical Library, mgoblue.com, the building's own site) and note the source.
- **Tips** — follow the steps on your own Canvas / Wolverine Access screens. Save a screenshot in `appendix/screenshots/` and write the filename in.

**Marking a row:** change ☐ to ☑ when checked. In "Correct? / What was wrong" write `OK`, or the problem and the fix.

**Error types** (use these words so they can be counted): `coords` (pin in the wrong place) · `fact` (false statement) · `outdated` (was true, isn't now) · `ui-step` (menu or button name or order wrong) · `ambiguous` (more than one defensible answer, or a clue that fits several places) · `name` (wrong or unofficial name) · `other`

## Tally

Fill this in as you go. It is the hard data for the reflection.

| Section | Items | Checked | OK | Wrong | Error types seen |
|---|---|---|---|---|---|
| 1. Coordinates | 87 | 0 | | | |
| 2. Campus Clue clues | 150 | 0 | | | |
| 3. Trivia questions | 30 | 0 | | | |
| 4. Tips (each step and check question) | 79 | 0 | | | |
| **Total** | **346** | **0** | | | |

## What the OpenStreetMap lookup already found

Before Phase 5, all 62 place coordinates had been written from the AI's memory. In Phase 5 every place was looked up in OpenStreetMap (Nominatim search, 2026-11-14) and the coordinates were replaced with OpenStreetMap's. Comparing the two:

| | Count |
|---|---|
| Places that had a memory-written coordinate | 62 |
| Memory coordinate within 100 ft of OpenStreetMap | 28 |
| Memory coordinate off by more than 100 ft | 34 (55%) |
| Off by more than 500 ft | 7 |
| Median error | 129 ft |
| Largest error | 2,902 ft (Matthaei Botanical Gardens) |

This is an AI error rate you did not have to find by hand, but it only measures the AI's memory against OpenStreetMap. OpenStreetMap can be wrong or out of date too, which is why section 1 still needs your check.

### Moved more than 100 ft

| Place | Moved | Memory coordinate | OpenStreetMap coordinate | OpenStreetMap's name for it |
|---|---|---|---|---|
| Matthaei Botanical Gardens | 2,902 ft | 42.3003, -83.6627 | 42.29264, -83.65981 | Matthaei Botanical Gardens |
| Burton Memorial Tower | 1,910 ft | 42.2742, -83.7382 | 42.27942, -83.73871 | Burton Memorial Tower |
| Elbel Field | 1,151 ft | 42.2712, -83.744 | 42.27328, -83.74721 | Elbel Field |
| University Hospital | 839 ft | 42.2826, -83.7281 | 42.28468, -83.72942 | University Hospital |
| Nichols Arboretum | 785 ft | 42.28, -83.725 | 42.27908, -83.72238 | Nichols Arboretum |
| Munger Graduate Residences | 749 ft | 42.2725, -83.7437 | 42.27455, -83.7437 | Munger Graduate Residences |
| The Rock | 607 ft | 42.2738, -83.73 | 42.27256, -83.72849 | The Rock |
| Ray Fisher Stadium | 432 ft | 42.2678, -83.744 | 42.26746, -83.74247 | Ray Fisher Stadium |
| Dana Building | 380 ft | 42.2773, -83.7352 | 42.27732, -83.73661 | Samuel Trask Dana Natural Resources Building |
| Couzens Hall | 302 ft | 42.2826, -83.732 | 42.28193, -83.73266 | Couzens Hall |
| LSA Building | 289 ft | 42.2755, -83.7409 | 42.27622, -83.74135 | College of Literature, Science, and the Arts |
| School of Public Health | 282 ft | 42.2803, -83.73 | 42.28089, -83.73067 | Henry Vaughan Public Health Building |
| The Cube | 262 ft | 42.2752, -83.7417 | 42.2759, -83.74189 | The Cube |
| Law Quad | 261 ft | 42.274, -83.7395 | 42.27367, -83.74036 | Hutchins Hall |
| East Hall | 244 ft | 42.2764, -83.735 | 42.27575, -83.7352 | East Hall |
| Ross School of Business | 237 ft | 42.273, -83.7378 | 42.27278, -83.73697 | Ross School of Business |
| Michigan Stadium | 236 ft | 42.2658, -83.7487 | 42.26583, -83.74783 | Michigan Stadium |
| School of Dentistry | 228 ft | 42.279, -83.7355 | 42.27929, -83.73624 | Dental Building and Kellogg Institute |
| Biological Sciences Building | 219 ft | 42.2796, -83.7345 | 42.279, -83.7345 | Biological Sciences Building |
| Intramural Sports Building | 209 ft | 42.2692, -83.7415 | 42.26937, -83.74224 | Intramural Sports Building |
| North Campus Recreation Building | 198 ft | 42.2952, -83.7196 | 42.29554, -83.72017 | North Campus Recreation Building |
| Yost Ice Arena | 184 ft | 42.2679, -83.7405 | 42.26758, -83.74102 | Yost Ice Arena |
| Weill Hall | 176 ft | 42.2722, -83.7398 | 42.2724, -83.7404 | Gerald R. Ford School of Public Policy - Weill Hall |
| EECS Building | 170 ft | 42.2924, -83.7145 | 42.29234, -83.71388 | Electrical Engineering and Computer Science Building |
| North Quad | 164 ft | 42.2806, -83.7401 | 42.28087, -83.73961 | North Quadrangle |
| Modern Languages Building | 162 ft | 42.28, -83.7385 | 42.27988, -83.73908 | Modern Languages Building |
| Clements Library | 159 ft | 42.2751, -83.7377 | 42.27547, -83.738 | William L. Clements Library |
| West Hall | 146 ft | 42.2757, -83.7359 | 42.27591, -83.73636 | West Hall |
| Michigan League | 139 ft | 42.279, -83.7375 | 42.27935, -83.73771 | Michigan League |
| Stockwell Hall | 137 ft | 42.279, -83.732 | 42.27886, -83.73153 | Stockwell |
| Schembechler Hall | 129 ft | 42.2663, -83.7412 | 42.26595, -83.74115 | Schembechler Hall |
| School of Education Building | 127 ft | 42.274, -83.7363 | 42.27392, -83.73676 | School of Education Building |
| Power Center | 113 ft | 42.2811, -83.7355 | 42.28085, -83.73575 | Power Center for the Performing Arts |
| Detroit Observatory | 103 ft | 42.2817, -83.7316 | 42.28198, -83.73168 | Detroit Observatory |

### Could not be verified in OpenStreetMap

| Place | Why |
|---|---|
| Law Quad | OSM has no feature named Law Quad / Law Quadrangle. Coordinates are Hutchins Hall, the Law School building on the Quad's southwest corner — roughly 150–250 ft from the middle of the lawn. |

### Matched, but worth a closer look

OpenStreetMap had a match for these, but the match is a judgment call (a different official name, a large area reduced to one point, or a location that may have changed).

| Place | Note |
|---|---|
| The Cube | Check the sculpture is currently installed at this spot. |
| Rackham Building | OpenStreetMap calls it "Rackham School of Graduate Studies". |
| The Diag | Center of the park area OSM calls The Diag. |
| Nichols Arboretum | Center of the whole Arb, which is large; the entrances are 1,000+ ft from this point. |
| Lurie Bell Tower | OpenStreetMap calls it "Ann and Robert H. Lurie Tower". |
| Bursley Hall | OSM maps Bursley as two buildings; this is the point midway between them. |
| Dana Building | OpenStreetMap calls it "Samuel Trask Dana Natural Resources Building". |
| LSA Building | OpenStreetMap calls it "College of Literature, Science, and the Arts". |
| School of Dentistry | OpenStreetMap calls it "Dental Building and Kellogg Institute". |
| School of Public Health | OSM has two School of Public Health buildings; this is the Henry Vaughan building (SPH I). OpenStreetMap calls it "Henry Vaughan Public Health Building". |
| University Hospital | The main University Hospital building; the medical campus is much larger. |
| Elbel Field | OSM places Elbel Field on East Mosley Street, about a quarter mile from where I remembered it. Check which location is current. |
| EECS Building | OpenStreetMap calls it "Electrical Engineering and Computer Science Building". |
| G.G. Brown Building | OpenStreetMap calls it "G. G. Brown Building". |
| FXB Building | OpenStreetMap calls it "Francois-Xavier Bagnoud Building". |
| Matthaei Botanical Gardens | Center of the whole gardens property, not the conservatory building. |
| Central Campus Transit Center | OSM has this as a bus-stop point, not a building. |
| Betsy Barbour House | OpenStreetMap calls it "Betsy Barbour Residence". |
| Ford Robotics Building | OpenStreetMap calls it "Ford Motor Company Robotics Building". |
| Baits Houses | Center of the Baits II housing area. OpenStreetMap calls it "Baits II". |
| Alumni Field | OpenStreetMap calls it "Alumni Softball Field". |

The 25 guess-only places added in Phase 5 never had a memory-written coordinate; theirs came straight from OpenStreetMap, so they are not part of the comparison above.

## 1. Coordinates

`public/data/places.json` (answers) and `public/data/guessable-places.json` (guess-only). **Flag** shows what the lookup found: how far the pin moved from the AI's original guess, or `new` if the place was added in Phase 5 with no earlier guess.

| ✓ | Place | Used as | Coordinates (click to open map) | Flag | Correct? / What was wrong |
|---|---|---|---|---|---|
| ☐ | Burton Memorial Tower | Answer | [42.27942, -83.73871](https://www.google.com/maps/search/?api=1&query=42.27942,-83.73871) | moved 1,910 ft | |
| ☐ | Michigan Stadium | Answer | [42.26583, -83.74783](https://www.google.com/maps/search/?api=1&query=42.26583,-83.74783) | moved 236 ft | |
| ☐ | Hatcher Graduate Library | Answer | [42.27622, -83.73818](https://www.google.com/maps/search/?api=1&query=42.27622,-83.73818) | moved 35 ft | |
| ☐ | The Cube | Answer | [42.2759, -83.74189](https://www.google.com/maps/search/?api=1&query=42.2759,-83.74189) | moved 262 ft · see note above | |
| ☐ | Michigan Union | Answer | [42.27517, -83.74151](https://www.google.com/maps/search/?api=1&query=42.27517,-83.74151) | moved 66 ft | |
| ☐ | Michigan League | Answer | [42.27935, -83.73771](https://www.google.com/maps/search/?api=1&query=42.27935,-83.73771) | moved 139 ft | |
| ☐ | Hill Auditorium | Answer | [42.27918, -83.73908](https://www.google.com/maps/search/?api=1&query=42.27918,-83.73908) | moved 29 ft | |
| ☐ | Rackham Building | Answer | [42.28087, -83.73828](https://www.google.com/maps/search/?api=1&query=42.28087,-83.73828) | moved 97 ft | |
| ☐ | Angell Hall | Answer | [42.27672, -83.73975](https://www.google.com/maps/search/?api=1&query=42.27672,-83.73975) | moved 48 ft | |
| ☐ | Shapiro Undergraduate Library | Answer | [42.27563, -83.73719](https://www.google.com/maps/search/?api=1&query=42.27563,-83.73719) | moved 12 ft | |
| ☐ | West Hall | Answer | [42.27591, -83.73636](https://www.google.com/maps/search/?api=1&query=42.27591,-83.73636) | moved 146 ft | |
| ☐ | Museum of Art | Answer | [42.27559, -83.73984](https://www.google.com/maps/search/?api=1&query=42.27559,-83.73984) | moved 44 ft | |
| ☐ | Law Quad | Answer | [42.27367, -83.74036](https://www.google.com/maps/search/?api=1&query=42.27367,-83.74036) | **not verified** | |
| ☐ | Ross School of Business | Answer | [42.27278, -83.73697](https://www.google.com/maps/search/?api=1&query=42.27278,-83.73697) | moved 237 ft | |
| ☐ | The Diag | Answer | [42.2771, -83.73801](https://www.google.com/maps/search/?api=1&query=42.2771,-83.73801) | moved 89 ft · see note above | |
| ☐ | Biological Sciences Building | Answer | [42.279, -83.7345](https://www.google.com/maps/search/?api=1&query=42.279,-83.7345) | moved 219 ft | |
| ☐ | Nichols Arboretum | Answer | [42.27908, -83.72238](https://www.google.com/maps/search/?api=1&query=42.27908,-83.72238) | moved 785 ft · see note above | |
| ☐ | The Rock | Answer | [42.27256, -83.72849](https://www.google.com/maps/search/?api=1&query=42.27256,-83.72849) | moved 607 ft | |
| ☐ | Crisler Center | Answer | [42.26504, -83.74667](https://www.google.com/maps/search/?api=1&query=42.26504,-83.74667) | moved 41 ft | |
| ☐ | Yost Ice Arena | Answer | [42.26758, -83.74102](https://www.google.com/maps/search/?api=1&query=42.26758,-83.74102) | moved 184 ft | |
| ☐ | Duderstadt Center | Answer | [42.29118, -83.71577](https://www.google.com/maps/search/?api=1&query=42.29118,-83.71577) | moved 13 ft | |
| ☐ | Lurie Bell Tower | Answer | [42.29203, -83.71618](https://www.google.com/maps/search/?api=1&query=42.29203,-83.71618) | moved 34 ft | |
| ☐ | Pierpont Commons | Answer | [42.29112, -83.7176](https://www.google.com/maps/search/?api=1&query=42.29112,-83.7176) | moved 71 ft | |
| ☐ | South Quad | Answer | [42.27371, -83.74215](https://www.google.com/maps/search/?api=1&query=42.27371,-83.74215) | moved 14 ft | |
| ☐ | East Quad | Answer | [42.27293, -83.73516](https://www.google.com/maps/search/?api=1&query=42.27293,-83.73516) | moved 93 ft | |
| ☐ | Mosher-Jordan Hall | Answer | [42.28015, -83.7317](https://www.google.com/maps/search/?api=1&query=42.28015,-83.7317) | moved 83 ft | |
| ☐ | Bursley Hall | Answer | [42.2938, -83.72095](https://www.google.com/maps/search/?api=1&query=42.2938,-83.72095) | moved 41 ft · see note above | |
| ☐ | Power Center | Answer | [42.28085, -83.73575](https://www.google.com/maps/search/?api=1&query=42.28085,-83.73575) | moved 113 ft | |
| ☐ | Kelsey Museum of Archaeology | Answer | [42.27675, -83.74137](https://www.google.com/maps/search/?api=1&query=42.27675,-83.74137) | moved 91 ft | |
| ☐ | Clements Library | Answer | [42.27547, -83.738](https://www.google.com/maps/search/?api=1&query=42.27547,-83.738) | moved 159 ft | |
| ☐ | Randall Laboratory | Guess-only | [42.27679, -83.7364](https://www.google.com/maps/search/?api=1&query=42.27679,-83.7364) | moved 90 ft | |
| ☐ | East Hall | Guess-only | [42.27575, -83.7352](https://www.google.com/maps/search/?api=1&query=42.27575,-83.7352) | moved 244 ft | |
| ☐ | Chemistry Building | Guess-only | [42.27803, -83.73671](https://www.google.com/maps/search/?api=1&query=42.27803,-83.73671) | moved 57 ft | |
| ☐ | Dana Building | Guess-only | [42.27732, -83.73661](https://www.google.com/maps/search/?api=1&query=42.27732,-83.73661) | moved 380 ft | |
| ☐ | LSA Building | Guess-only | [42.27622, -83.74135](https://www.google.com/maps/search/?api=1&query=42.27622,-83.74135) | moved 289 ft | |
| ☐ | Martha Cook Building | Guess-only | [42.27446, -83.73798](https://www.google.com/maps/search/?api=1&query=42.27446,-83.73798) | moved 35 ft | |
| ☐ | Weill Hall | Guess-only | [42.2724, -83.7404](https://www.google.com/maps/search/?api=1&query=42.2724,-83.7404) | moved 176 ft | |
| ☐ | School of Education Building | Guess-only | [42.27392, -83.73676](https://www.google.com/maps/search/?api=1&query=42.27392,-83.73676) | moved 127 ft | |
| ☐ | West Quad | Guess-only | [42.27491, -83.74256](https://www.google.com/maps/search/?api=1&query=42.27491,-83.74256) | moved 43 ft | |
| ☐ | Munger Graduate Residences | Guess-only | [42.27455, -83.7437](https://www.google.com/maps/search/?api=1&query=42.27455,-83.7437) | moved 749 ft | |
| ☐ | North Quad | Guess-only | [42.28087, -83.73961](https://www.google.com/maps/search/?api=1&query=42.28087,-83.73961) | moved 164 ft | |
| ☐ | Modern Languages Building | Guess-only | [42.27988, -83.73908](https://www.google.com/maps/search/?api=1&query=42.27988,-83.73908) | moved 162 ft | |
| ☐ | School of Dentistry | Guess-only | [42.27929, -83.73624](https://www.google.com/maps/search/?api=1&query=42.27929,-83.73624) | moved 228 ft | |
| ☐ | Couzens Hall | Guess-only | [42.28193, -83.73266](https://www.google.com/maps/search/?api=1&query=42.28193,-83.73266) | moved 302 ft | |
| ☐ | Alice Lloyd Hall | Guess-only | [42.28125, -83.73176](https://www.google.com/maps/search/?api=1&query=42.28125,-83.73176) | moved 68 ft | |
| ☐ | Stockwell Hall | Guess-only | [42.27886, -83.73153](https://www.google.com/maps/search/?api=1&query=42.27886,-83.73153) | moved 137 ft | |
| ☐ | Mary Markley Hall | Guess-only | [42.28088, -83.72888](https://www.google.com/maps/search/?api=1&query=42.28088,-83.72888) | moved 29 ft | |
| ☐ | School of Public Health | Guess-only | [42.28089, -83.73067](https://www.google.com/maps/search/?api=1&query=42.28089,-83.73067) | moved 282 ft · see note above | |
| ☐ | Detroit Observatory | Guess-only | [42.28198, -83.73168](https://www.google.com/maps/search/?api=1&query=42.28198,-83.73168) | moved 103 ft | |
| ☐ | University Hospital | Guess-only | [42.28468, -83.72942](https://www.google.com/maps/search/?api=1&query=42.28468,-83.72942) | moved 839 ft · see note above | |
| ☐ | Ray Fisher Stadium | Guess-only | [42.26746, -83.74247](https://www.google.com/maps/search/?api=1&query=42.26746,-83.74247) | moved 432 ft | |
| ☐ | Schembechler Hall | Guess-only | [42.26595, -83.74115](https://www.google.com/maps/search/?api=1&query=42.26595,-83.74115) | moved 129 ft | |
| ☐ | Intramural Sports Building | Guess-only | [42.26937, -83.74224](https://www.google.com/maps/search/?api=1&query=42.26937,-83.74224) | moved 209 ft | |
| ☐ | Elbel Field | Guess-only | [42.27328, -83.74721](https://www.google.com/maps/search/?api=1&query=42.27328,-83.74721) | moved 1,151 ft · see note above | |
| ☐ | Beyster Building | Guess-only | [42.29302, -83.71635](https://www.google.com/maps/search/?api=1&query=42.29302,-83.71635) | moved 45 ft | |
| ☐ | EECS Building | Guess-only | [42.29234, -83.71388](https://www.google.com/maps/search/?api=1&query=42.29234,-83.71388) | moved 170 ft | |
| ☐ | G.G. Brown Building | Guess-only | [42.2933, -83.71399](https://www.google.com/maps/search/?api=1&query=42.2933,-83.71399) | moved 45 ft | |
| ☐ | FXB Building | Guess-only | [42.29344, -83.7121](https://www.google.com/maps/search/?api=1&query=42.29344,-83.7121) | moved 32 ft | |
| ☐ | Moore Building | Guess-only | [42.29038, -83.72097](https://www.google.com/maps/search/?api=1&query=42.29038,-83.72097) | moved 80 ft | |
| ☐ | Art & Architecture Building | Guess-only | [42.28958, -83.71705](https://www.google.com/maps/search/?api=1&query=42.28958,-83.71705) | moved 65 ft | |
| ☐ | North Campus Recreation Building | Guess-only | [42.29554, -83.72017](https://www.google.com/maps/search/?api=1&query=42.29554,-83.72017) | moved 198 ft | |
| ☐ | Matthaei Botanical Gardens | Guess-only | [42.29264, -83.65981](https://www.google.com/maps/search/?api=1&query=42.29264,-83.65981) | moved 2,902 ft · see note above | |
| ☐ | Mason Hall | Guess-only | [42.27705, -83.7395](https://www.google.com/maps/search/?api=1&query=42.27705,-83.7395) | new | |
| ☐ | Haven Hall | Guess-only | [42.27651, -83.73923](https://www.google.com/maps/search/?api=1&query=42.27651,-83.73923) | new | |
| ☐ | Tisch Hall | Guess-only | [42.27624, -83.73958](https://www.google.com/maps/search/?api=1&query=42.27624,-83.73958) | new | |
| ☐ | Lorch Hall | Guess-only | [42.27363, -83.73732](https://www.google.com/maps/search/?api=1&query=42.27363,-83.73732) | new | |
| ☐ | Central Campus Transit Center | Guess-only | [42.27806, -83.73535](https://www.google.com/maps/search/?api=1&query=42.27806,-83.73535) | new · see note above | |
| ☐ | Palmer Commons | Guess-only | [42.28064, -83.73387](https://www.google.com/maps/search/?api=1&query=42.28064,-83.73387) | new | |
| ☐ | Trotter Multicultural Center | Guess-only | [42.27707, -83.74109](https://www.google.com/maps/search/?api=1&query=42.27707,-83.74109) | new | |
| ☐ | Student Activities Building | Guess-only | [42.27658, -83.74242](https://www.google.com/maps/search/?api=1&query=42.27658,-83.74242) | new | |
| ☐ | Institute for Social Research | Guess-only | [42.27675, -83.74373](https://www.google.com/maps/search/?api=1&query=42.27675,-83.74373) | new | |
| ☐ | Taubman Health Sciences Library | Guess-only | [42.28353, -83.73453](https://www.google.com/maps/search/?api=1&query=42.28353,-83.73453) | new | |
| ☐ | Ruthven Building | Guess-only | [42.27815, -83.73474](https://www.google.com/maps/search/?api=1&query=42.27815,-83.73474) | new | |
| ☐ | Alumni Center | Guess-only | [42.28007, -83.73774](https://www.google.com/maps/search/?api=1&query=42.28007,-83.73774) | new | |
| ☐ | Betsy Barbour House | Guess-only | [42.2773, -83.74155](https://www.google.com/maps/search/?api=1&query=42.2773,-83.74155) | new | |
| ☐ | Helen Newberry Residence | Guess-only | [42.27697, -83.74155](https://www.google.com/maps/search/?api=1&query=42.27697,-83.74155) | new | |
| ☐ | School of Kinesiology Building | Guess-only | [42.27802, -83.73896](https://www.google.com/maps/search/?api=1&query=42.27802,-83.73896) | new | |
| ☐ | Chrysler Center | Guess-only | [42.29089, -83.71677](https://www.google.com/maps/search/?api=1&query=42.29089,-83.71677) | new | |
| ☐ | Walgreen Drama Center | Guess-only | [42.29196, -83.71743](https://www.google.com/maps/search/?api=1&query=42.29196,-83.71743) | new | |
| ☐ | Ford Robotics Building | Guess-only | [42.29459, -83.70941](https://www.google.com/maps/search/?api=1&query=42.29459,-83.70941) | new | |
| ☐ | Dow Building | Guess-only | [42.293, -83.71543](https://www.google.com/maps/search/?api=1&query=42.293,-83.71543) | new | |
| ☐ | Baits Houses | Guess-only | [42.29402, -83.72397](https://www.google.com/maps/search/?api=1&query=42.29402,-83.72397) | new · see note above | |
| ☐ | Canham Natatorium | Guess-only | [42.26926, -83.74376](https://www.google.com/maps/search/?api=1&query=42.26926,-83.74376) | new | |
| ☐ | Cliff Keen Arena | Guess-only | [42.26932, -83.74127](https://www.google.com/maps/search/?api=1&query=42.26932,-83.74127) | new | |
| ☐ | Oosterbaan Field House | Guess-only | [42.26588, -83.74235](https://www.google.com/maps/search/?api=1&query=42.26588,-83.74235) | new | |
| ☐ | Ferry Field | Guess-only | [42.26876, -83.74253](https://www.google.com/maps/search/?api=1&query=42.26876,-83.74253) | new | |
| ☐ | Alumni Field | Guess-only | [42.26662, -83.74306](https://www.google.com/maps/search/?api=1&query=42.26662,-83.74306) | new | |

## 2. Campus Clue clues

`public/data/places.json`. Five clues per answer, shown one at a time from vaguest to most specific. For each: is it **true**, and is it **fair** (the last clue should make the place clear; an early clue fitting several places is fine)? All clues were written from the AI's memory.

| ✓ | Place | # | Clue | Correct? / What was wrong |
|---|---|---|---|---|
| ☐ | Burton Memorial Tower | 1 | You can hear this place before you see it. | |
| ☐ |  | 2 | It is one of the tallest things on Central Campus. | |
| ☐ |  | 3 | It has a clock face on each side. | |
| ☐ |  | 4 | A carillon is played from near the top. | |
| ☐ |  | 5 | It stands beside Hill Auditorium, at the edge of Ingalls Mall. | |
| ☐ | Michigan Stadium | 1 | Most of this place sits below street level. | |
| ☐ |  | 2 | It is far busier on fall Saturdays than any other day. | |
| ☐ |  | 3 | It is on the athletic campus, south of Central Campus. | |
| ☐ |  | 4 | More than 100,000 people fit inside. | |
| ☐ |  | 5 | Its nickname is "The Big House." | |
| ☐ | Hatcher Graduate Library | 1 | People come here to be quiet. | |
| ☐ |  | 2 | It faces the Diag. | |
| ☐ |  | 3 | It has a north and a south building. | |
| ☐ |  | 4 | It is connected to the Shapiro Undergraduate Library. | |
| ☐ |  | 5 | Students call it "the Grad." | |
| ☐ | The Cube | 1 | This is a sculpture, not a building. | |
| ☐ |  | 2 | It balances on one corner. | |
| ☐ |  | 3 | Give it a push and it spins. | |
| ☐ |  | 4 | It sits in Regents' Plaza. | |
| ☐ |  | 5 | It is next to the Michigan Union. | |
| ☐ | Michigan Union | 1 | Students have gathered here for more than a century. | |
| ☐ |  | 2 | It stands on State Street, at the end of South University Avenue. | |
| ☐ |  | 3 | It reopened in 2020 after a long renovation. | |
| ☐ |  | 4 | John F. Kennedy proposed the idea of the Peace Corps from its front steps in 1960. | |
| ☐ |  | 5 | It is the student union on Central Campus. | |
| ☐ | Michigan League | 1 | It was built because women were once kept out of another campus building. | |
| ☐ |  | 2 | It opened in 1929. | |
| ☐ |  | 3 | It has a garden, a ballroom and an inn. | |
| ☐ |  | 4 | The Lydia Mendelssohn Theatre is inside. | |
| ☐ |  | 5 | It stands across Ingalls Mall from Burton Tower, on North University Avenue. | |
| ☐ | Hill Auditorium | 1 | People come here to listen. | |
| ☐ |  | 2 | It is famous for its acoustics. | |
| ☐ |  | 3 | Albert Kahn designed it, and it opened in 1913. | |
| ☐ |  | 4 | It seats about 3,500 and has a huge pipe organ. | |
| ☐ |  | 5 | It is the big concert hall on North University Avenue, next to Burton Tower. | |
| ☐ | Rackham Building | 1 | It is named for a Detroit lawyer who was an early investor in Ford Motor Company. | |
| ☐ |  | 2 | It closes off the north end of Ingalls Mall. | |
| ☐ |  | 3 | It has an auditorium, an amphitheatre and grand study halls. | |
| ☐ |  | 4 | Doctoral students defend their dissertations here. | |
| ☐ |  | 5 | It is the home of the graduate school. | |
| ☐ | Angell Hall | 1 | Its front is a long row of tall stone columns. | |
| ☐ |  | 2 | It faces State Street. | |
| ☐ |  | 3 | It is named for the university's longest-serving president. | |
| ☐ |  | 4 | There is an observatory and planetarium on its roof. | |
| ☐ |  | 5 | The computing site called the Fishbowl is here. | |
| ☐ | Shapiro Undergraduate Library | 1 | It stays open late into the night. | |
| ☐ |  | 2 | It is linked by a walkway to an older, bigger neighbor. | |
| ☐ |  | 3 | Bert's Cafe is on the first floor. | |
| ☐ |  | 4 | Its nickname is not a compliment. | |
| ☐ |  | 5 | Students call it the UGLi. | |
| ☐ | West Hall | 1 | People walk through this building as well as into it. | |
| ☐ |  | 2 | It sits at the southeast corner of the Diag. | |
| ☐ |  | 3 | It was built for the engineering college. | |
| ☐ |  | 4 | Tradition says a kiss under its arch at midnight means you'll marry. | |
| ☐ |  | 5 | Its name is a compass direction, and its arch is called the Engineering Arch. | |
| ☐ | Museum of Art | 1 | It is free to walk in. | |
| ☐ |  | 2 | It stands across State Street from the Michigan Union. | |
| ☐ |  | 3 | Its older half was built as Alumni Memorial Hall. | |
| ☐ |  | 4 | A glassy modern wing was added in 2009. | |
| ☐ |  | 5 | It goes by four letters: UMMA. | |
| ☐ | Law Quad | 1 | It looks like it was borrowed from Oxford or Cambridge. | |
| ☐ |  | 2 | Its stone buildings went up in the 1920s and 1930s. | |
| ☐ |  | 3 | A gift from alumnus William W. Cook paid for it. | |
| ☐ |  | 4 | Its Reading Room has stained glass and a vaulted ceiling. | |
| ☐ |  | 5 | Future lawyers study here. | |
| ☐ | Ross School of Business | 1 | A very large gift gave this school its current name in 2004. | |
| ☐ |  | 2 | It sits on the south side of Central Campus, along Tappan Avenue. | |
| ☐ |  | 3 | Its main building has a glass-roofed Winter Garden. | |
| ☐ |  | 4 | MBA and BBA students take classes here. | |
| ☐ |  | 5 | It is the business school. | |
| ☐ | The Diag | 1 | Thousands of students cross it every day. | |
| ☐ |  | 2 | It is not a building. | |
| ☐ |  | 3 | Its name comes from the sidewalks that cut across it. | |
| ☐ |  | 4 | A brass block M is set into the pavement at its center. | |
| ☐ |  | 5 | It is the open space at the heart of Central Campus. | |
| ☐ | Biological Sciences Building | 1 | Mastodons live here, sort of. | |
| ☐ |  | 2 | It is one of the newer buildings on Central Campus, opened in 2018. | |
| ☐ |  | 3 | It has a planetarium and dome theater. | |
| ☐ |  | 4 | The Museum of Natural History moved here from the Ruthven Building. | |
| ☐ |  | 5 | Its initials are BSB. | |
| ☐ | Nichols Arboretum | 1 | No classes meet here, but students come anyway. | |
| ☐ |  | 2 | It slopes down to the Huron River. | |
| ☐ |  | 3 | It has a famous peony garden. | |
| ☐ |  | 4 | It sits just east of the Hill residence halls. | |
| ☐ |  | 5 | Everyone calls it the Arb. | |
| ☐ | The Rock | 1 | It never looks the same for long. | |
| ☐ |  | 2 | It sits at the corner of Hill Street and Washtenaw Avenue. | |
| ☐ |  | 3 | Student groups come at night to cover it. | |
| ☐ |  | 4 | It is buried under countless layers of paint. | |
| ☐ |  | 5 | It is a boulder. | |
| ☐ | Crisler Center | 1 | It is loudest in the winter. | |
| ☐ |  | 2 | It is next door to Michigan Stadium. | |
| ☐ |  | 3 | It opened in 1967. | |
| ☐ |  | 4 | It is named for a football coach, but football is not played here. | |
| ☐ |  | 5 | The basketball teams play here. | |
| ☐ | Yost Ice Arena | 1 | It was built in the 1920s as a field house. | |
| ☐ |  | 2 | It is on South State Street. | |
| ☐ |  | 3 | It was converted for a different sport in 1973. | |
| ☐ |  | 4 | It is named for a legendary football coach. | |
| ☐ |  | 5 | The hockey team plays here. | |
| ☐ | Duderstadt Center | 1 | It almost never closes. | |
| ☐ |  | 2 | It is on North Campus. | |
| ☐ |  | 3 | It was originally called the Media Union. | |
| ☐ |  | 4 | It holds a library, design labs and recording studios. | |
| ☐ |  | 5 | Students call it the Dude. | |
| ☐ | Lurie Bell Tower | 1 | You can hear it across North Campus. | |
| ☐ |  | 2 | It was finished in 1996. | |
| ☐ |  | 3 | It holds a 60-bell carillon. | |
| ☐ |  | 4 | It stands near the Duderstadt Center. | |
| ☐ |  | 5 | It is North Campus's bell tower. | |
| ☐ | Pierpont Commons | 1 | North Campus comes here to eat and hang out. | |
| ☐ |  | 2 | Blue buses stop right outside. | |
| ☐ |  | 3 | It used to be called the North Campus Commons. | |
| ☐ |  | 4 | It is named for a longtime university vice president. | |
| ☐ |  | 5 | It is the student union of North Campus. | |
| ☐ | South Quad | 1 | More than a thousand students live here. | |
| ☐ |  | 2 | It opened in 1951. | |
| ☐ |  | 3 | Its dining hall is one of the largest on campus. | |
| ☐ |  | 4 | It is on East Madison Street, a short walk from the Michigan Union. | |
| ☐ |  | 5 | Its name is a compass direction — the opposite of north — plus "Quad." | |
| ☐ | East Quad | 1 | Students live and take classes in the same building here. | |
| ☐ |  | 2 | It is the home of the Residential College. | |
| ☐ |  | 3 | It is on East University Avenue. | |
| ☐ |  | 4 | It reopened in 2013 after a full renovation. | |
| ☐ |  | 5 | Its name is the direction the sun rises, plus "Quad." | |
| ☐ | Mosher-Jordan Hall | 1 | It is on the Hill. | |
| ☐ |  | 2 | It opened in 1930 as a women's residence hall. | |
| ☐ |  | 3 | It is named for two deans of women. | |
| ☐ |  | 4 | The Hill Dining Center is attached to it. | |
| ☐ |  | 5 | Its nickname is MoJo. | |
| ☐ | Bursley Hall | 1 | It is the largest residence hall on its campus. | |
| ☐ |  | 2 | It is on North Campus. | |
| ☐ |  | 3 | It opened in 1967. | |
| ☐ |  | 4 | It has its own dining hall and sits next to the Baits houses. | |
| ☐ |  | 5 | It is named for a longtime dean of students, Joseph Bursley. | |
| ☐ | Power Center | 1 | Its glass front reflects the trees across the street. | |
| ☐ |  | 2 | It opened in 1971. | |
| ☐ |  | 3 | It is at Fletcher Street and Huron Street. | |
| ☐ |  | 4 | Plays, dance and musical theatre are staged here. | |
| ☐ |  | 5 | It is the Power Center for the Performing Arts. | |
| ☐ | Kelsey Museum of Archaeology | 1 | What it holds is thousands of years older than the building. | |
| ☐ |  | 2 | It is on State Street, across from Angell Hall. | |
| ☐ |  | 3 | The stone building with a turret was once called Newberry Hall. | |
| ☐ |  | 4 | Inside are artifacts from ancient Egypt, Greece and Rome. | |
| ☐ |  | 5 | It is the archaeology museum. | |
| ☐ | Clements Library | 1 | Its specialty is early American history. | |
| ☐ |  | 2 | It is on South University Avenue, next to the President's House. | |
| ☐ |  | 3 | Albert Kahn designed it, and it opened in 1923. | |
| ☐ |  | 4 | It holds rare books, maps and manuscripts. | |
| ☐ |  | 5 | It is named for regent William L. Clements. | |

## 3. Trivia

`public/data/trivia.json`. Check the answer is right, **and** that none of the other choices could also be right. All written from the AI's memory.

### Sports

| ✓ | ID | Question | Answer given | Other choices | Correct? / What was wrong | Source |
|---|---|---|---|---|---|---|
| ☐ | sports-001 | What is the nickname of Michigan Stadium? | **The Big House** | The Horseshoe; The Swamp; Death Valley | | |
| ☐ | sports-002 | What is the name of Michigan's fight song? | **The Victors — *also stated:* "The Victors" was written by student Louis Elbel in 1898.** | Varsity; Hail to the Chiefs; On, Michigan | | |
| ☐ | sports-003 | Which coach led Michigan football to a share of the 1997 national championship? | **Lloyd Carr** | Bo Schembechler; Gary Moeller; Jim Harbaugh | | |
| ☐ | sports-004 | Which coach brought the winged helmet design to Michigan in 1938? | **Fritz Crisler** | Fielding Yost; Bennie Oosterbaan; Bo Schembechler | | |
| ☐ | sports-005 | Michigan and Minnesota play football for which trophy? | **The Little Brown Jug — *also stated:* The Little Brown Jug dates to a 1903 game and is one of the oldest trophies in college football.** | Paul Bunyan's Axe; The Old Oaken Bucket; Floyd of Rosedale | | |
| ☐ | sports-006 | Which Michigan player won the Heisman Trophy in 1991? | **Desmond Howard** | Charles Woodson; Tom Harmon; Anthony Carter | | |
| ☐ | sports-007 | In what year did the "Fab Five" arrive as freshmen on the men's basketball team? | **1991** | 1989; 1993; 1995 | | |
| ☐ | sports-008 | In what year did Michigan men's basketball win its NCAA national championship? | **1989** | 1976; 1993; 2013 | | |
| ☐ | sports-009 | Where does the Michigan hockey team play its home games? | **Yost Ice Arena** | Crisler Center; Cliff Keen Arena; Canham Natatorium | | |
| ☐ | sports-010 | Michigan and Michigan State play football for which trophy? | **The Paul Bunyan Trophy** | The Little Brown Jug; The Megaphone Trophy; The Land Grant Trophy | | |

### Traditions / History

| ✓ | ID | Question | Answer given | Other choices | Correct? / What was wrong | Source |
|---|---|---|---|---|---|---|
| ☐ | traditions-001 | In what year was the University of Michigan founded? | **1817 — *also stated:* It was founded in Detroit in 1817 and moved to Ann Arbor in 1837.** | 1787; 1837; 1855 | | |
| ☐ | traditions-002 | According to campus superstition, what happens if you step on the brass M in the Diag before your first exam? | **You fail your first blue book exam** | You lose your football tickets; You have to sing the fight song; You get locked out of Canvas | | |
| ☐ | traditions-003 | In which city was the University of Michigan founded? | **Detroit** | Ann Arbor; Lansing; Ypsilanti | | |
| ☐ | traditions-004 | In what year did the university move to Ann Arbor? | **1837** | 1817; 1827; 1857 | | |
| ☐ | traditions-005 | What are the University of Michigan's school colors? | **Maize and blue** | Green and white; Scarlet and gray; Gold and navy | | |
| ☐ | traditions-006 | In 1960, which presidential candidate first proposed the idea behind the Peace Corps on the steps of the Michigan Union? | **John F. Kennedy** | Richard Nixon; Lyndon B. Johnson; Dwight D. Eisenhower | | |
| ☐ | traditions-007 | What do student groups traditionally do to The Rock at Hill Street and Washtenaw Avenue? | **Paint it** | Climb it at midnight; Leave coins on it; Decorate it with lights | | |
| ☐ | traditions-008 | Who was the university's longest-serving president? | **James B. Angell — *also stated:* Angell served from 1871 to 1909. Angell Hall is named for him.** | Henry Tappan; Harlan Hatcher; James Duderstadt | | |
| ☐ | traditions-009 | Finish the lyric from "The Victors": "Hail! to the victors valiant ... the champions of the ___." | **West** | North; Big Ten; World | | |
| ☐ | traditions-010 | What was the university called when it was founded in 1817? | **The Catholepistemiad — *also stated:* Its full original name was the Catholepistemiad, or University of Michigania.** | Michigan College; Ann Arbor Academy; Wolverine University | | |

### Campus Life

| ✓ | ID | Question | Answer given | Other choices | Correct? / What was wrong | Source |
|---|---|---|---|---|---|---|
| ☐ | campus-life-001 | What is the large open space at the center of Central Campus called? | **The Diag** | The Quad; The Yard; The Oval | | |
| ☐ | campus-life-002 | Which campus is home to most of the College of Engineering? | **North Campus** | Central Campus; South Campus; Medical Campus | | |
| ☐ | campus-life-003 | Which building do students call "the UGLi"? | **Shapiro Undergraduate Library** | Hatcher Graduate Library; Duderstadt Center; Law Library | | |
| ☐ | campus-life-004 | Which North Campus building is nicknamed "the Dude"? | **Duderstadt Center** | Pierpont Commons; Bursley Hall; Beyster Building | | |
| ☐ | campus-life-005 | "MoJo" is short for which residence hall? | **Mosher-Jordan** | Mary Markley; Martha Cook; Munger | | |
| ☐ | campus-life-006 | How much does it cost a student to ride a U-M campus bus? | **Nothing — it's free** | $1 per ride; $1.50 per ride; A semester pass is required | | |
| ☐ | campus-life-007 | What do students call Nichols Arboretum? | **The Arb** | The Nic; The Woods; The Garden | | |
| ☐ | campus-life-008 | What is the U-M student ID card called? | **Mcard** | Blue Card; Wolverine Card; UMID Pass | | |
| ☐ | campus-life-009 | What is the name for your U-M login ID — the part of your email before @umich.edu? | **Uniqname** | M-number; WolverineID; NetID | | |
| ☐ | campus-life-010 | What is "the Fishbowl" in Angell Hall? | **A computing site** | An aquarium; A dining hall; A swimming pool | | |

## 4. Tips

`public/data/tips.json`. Follow each tip on your own screen. Check every step's wording matches what you see (menu names, button names, order), then the check question. **The Wolverine Access tips are the ones the AI was least sure of** — it has no way to see those screens, and the menu names are its best recollection.

### Canvas — How to see your grade breakdown in Canvas

`canvas-grade-breakdown` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Open Canvas and click the course from your Dashboard. | |
| ☐ | 2 | In the course menu on the left, click Grades. | |
| ☐ | 3 | Scroll the list to see your score on each assignment. | |
| ☐ | 4 | Look at the sidebar for your total and how each assignment group is weighted. | |
| ☐ | Check | Which link in the course menu do you click first? → **Grades** (other choices: Modules; Syllabus; People) | |

### Canvas — How to test a "What-If" grade in Canvas

`canvas-what-if-grades` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Open the course and click Grades. | |
| ☐ | 2 | Click the score (or the dash) next to an assignment. | |
| ☐ | 3 | Type the score you think you might get and press Enter. | |
| ☐ | 4 | Check your total: it updates to show the What-If grade. | |
| ☐ | 5 | Click the arrow next to the score to put the real one back. | |
| ☐ | Check | What do you click to enter a What-If score? → **The assignment's score** (other choices: The assignment's due date; The course name; The Syllabus link) | |

### Canvas — How to choose which Canvas notifications you get

`canvas-notifications` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Click Account in the dark menu on the far left. | |
| ☐ | 2 | Click Notifications. | |
| ☐ | 3 | Find a type, such as Due Date or Announcement. | |
| ☐ | 4 | Click the icon next to it and pick: right away, daily summary, weekly summary, or off. | |
| ☐ | Check | Where do you start to change notifications? → **Account** (other choices: Calendar; Inbox; Dashboard) | |

### Canvas — How to submit an assignment in Canvas

`canvas-submit-assignment` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Open the course and click Assignments. | |
| ☐ | 2 | Click the name of the assignment. | |
| ☐ | 3 | Click Start Assignment. | |
| ☐ | 4 | Upload your file, or type or paste your work, depending on what the instructor allows. | |
| ☐ | 5 | Click Submit Assignment and look for the "Submitted" confirmation. | |
| ☐ | Check | Which button do you click to begin your submission? → **Start Assignment** (other choices: Open Grades; New Discussion; Send Message) | |

### Canvas — How to read your instructor's feedback in Canvas

`canvas-view-feedback` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Open the course and click Grades. | |
| ☐ | 2 | Click the name of the assignment. | |
| ☐ | 3 | Read the comments shown with your submission. | |
| ☐ | 4 | If there is a rubric, click to view it and see how each row was scored. | |
| ☐ | Check | Where do you find feedback on a graded assignment? → **Under Grades, by clicking the assignment** (other choices: In the course Syllabus; Under People; In Account settings) | |

### Canvas — How to see every due date in the Canvas Calendar

`canvas-calendar` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Click Calendar in the dark menu on the far left. | |
| ☐ | 2 | Check the list of courses on the right and tick the ones you want to see. | |
| ☐ | 3 | Switch between Week, Month and Agenda at the top. | |
| ☐ | 4 | Click any item to open the assignment. | |
| ☐ | Check | Which Calendar view shows your upcoming items as a list? → **Agenda** (other choices: Gallery; Timeline; Modules) | |

### Canvas — How to message your instructor in Canvas

`canvas-inbox-message` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Click Inbox in the dark menu on the far left. | |
| ☐ | 2 | Click the compose (pencil) icon. | |
| ☐ | 3 | Choose the course. | |
| ☐ | 4 | Click the address-book icon next to To, then pick Teachers and your instructor. | |
| ☐ | 5 | Write a subject and message, then click Send. | |
| ☐ | Check | Which Canvas tool do you use to send the message? → **Inbox** (other choices: Calendar; Grades; Files) | |

### Canvas — How to choose which courses show on your Canvas Dashboard

`canvas-favorite-courses` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Click Courses in the dark menu on the far left. | |
| ☐ | 2 | Click All Courses. | |
| ☐ | 3 | Click the star next to each course you want on your Dashboard. | |
| ☐ | 4 | Go back to the Dashboard: only starred courses are shown. | |
| ☐ | Check | What do you click next to a course to add it to your Dashboard? → **The star** (other choices: The gear; The bell; The pencil) | |

### Wolverine Access — How to find your class schedule in Wolverine Access

`wa-class-schedule` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Go to Wolverine Access and log in with your uniqname. | |
| ☐ | 2 | Open Student Business. | |
| ☐ | 3 | Choose the Backpack/Registration tile. | |
| ☐ | 4 | Pick the term to see your enrolled classes with times and locations. | |
| ☐ | Check | Which section of Wolverine Access do you open after logging in? → **Student Business** (other choices: Faculty Business; University Business; Parents & Family) | |

### Wolverine Access — How to view your unofficial transcript in Wolverine Access

`wa-unofficial-transcript` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Log in to Wolverine Access and open Student Business. | |
| ☐ | 2 | Open the Student Center. | |
| ☐ | 3 | Under Academics, choose View Unofficial Transcript. | |
| ☐ | 4 | Read it on screen, or use your browser's print option to save a PDF. | |
| ☐ | Check | Under which heading is the unofficial transcript link? → **Academics** (other choices: Finances; Personal Information; Admissions) | |

### Wolverine Access — How to find your registration appointment in Wolverine Access

`wa-enrollment-appointment` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Log in to Wolverine Access and open Student Business. | |
| ☐ | 2 | Choose Backpack/Registration. | |
| ☐ | 3 | Pick the upcoming term. | |
| ☐ | 4 | Look for Enrollment Appointment: it shows the date and time you can start registering. | |
| ☐ | Check | What is the date and time you can start registering called? → **Enrollment Appointment** (other choices: Drop Deadline; Add Window; Class Permission) | |

### Wolverine Access — How to save classes in your Backpack before registration

`wa-backpack` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Log in to Wolverine Access and open Student Business. | |
| ☐ | 2 | Choose Backpack/Registration and pick the term. | |
| ☐ | 3 | Search for a class by subject and number. | |
| ☐ | 4 | Select the section you want and add it to your Backpack. | |
| ☐ | 5 | When your appointment opens, register straight from the Backpack. | |
| ☐ | Check | Where do you save classes ahead of your registration time? → **Backpack** (other choices: Locker; Wish List; Shopping Bag) | |

### Wolverine Access — How to check what you owe in Wolverine Access

`wa-student-account` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Log in to Wolverine Access and open Student Business. | |
| ☐ | 2 | Open the Student Center. | |
| ☐ | 3 | Under Finances, open your account inquiry. | |
| ☐ | 4 | Review the charges, payments and the amount due. | |
| ☐ | Check | Under which heading do you find your account balance? → **Finances** (other choices: Academics; Personal Information; Holds) | |

### Wolverine Access — How to update your address and emergency contact in Wolverine Access

`wa-update-address` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Log in to Wolverine Access and open Student Business. | |
| ☐ | 2 | Open Campus Personal Information. | |
| ☐ | 3 | Choose Addresses or Emergency Contacts. | |
| ☐ | 4 | Edit the entry and click Save. | |
| ☐ | Check | Which page holds your address and emergency contacts? → **Campus Personal Information** (other choices: Backpack/Registration; Financial Aid; Course Guide) | |

### Wolverine Access — How to view your financial aid award in Wolverine Access

`wa-financial-aid` · Screenshot file: ______

| ✓ | Step | Text | Correct? / What was wrong |
|---|---|---|---|
| ☐ | 1 | Log in to Wolverine Access and open Student Business. | |
| ☐ | 2 | Open the Student Center. | |
| ☐ | 3 | Under Finances, choose View Financial Aid. | |
| ☐ | 4 | Pick the aid year to see each award and its amount. | |
| ☐ | Check | What do you pick to see your awards for a given year? → **The aid year** (other choices: The term's class list; Your major; Your residence hall) | |

## History of this file

- **Phase 1–3:** 4 answer places, 58 guess-only places, 6 trivia questions and 2 tips were drafted from the AI's memory and listed here unchecked. None had been checked by a person when Phase 5 replaced this file.
- **Phase 5 (2026-11-14):** content expanded to 30 answer places, 57 guess-only places, 30 trivia questions and 15 tips. All coordinates replaced with OpenStreetMap's. 26 of the original guess-only places were promoted to answers and 25 new guess-only places were added. Hutchins Hall was left out of the guess list because its coordinates are used for Law Quad.
- Coordinates are from OpenStreetMap, © OpenStreetMap contributors, available under the Open Database License.
