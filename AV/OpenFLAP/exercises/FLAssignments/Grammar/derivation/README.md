# Derivation exercise prototypes

Interactive grammar derivation exercises based on worked examples from PIFLA.
Four textbook examples appear first, followed by five additional prototypes in
a separate menu group. Each exercise has a stable bookmark ID.

## JSAV proficiency exercises

The examples page links to the scored exercises; their navigation links connect
three separate exercise pages:

| Page | Task | Graded steps | Reference sequence |
|---|---|---|---|
| `DerivationPRO.html` | Derive `aaabbb` | 3 | `S ⇒ aSb ⇒ aaSbb ⇒ aaabbb` |
| `DerivationPalindromePRO.html` | Derive the palindrome `ababa` | 3 | `S ⇒ aSa ⇒ abSba ⇒ ababa` |
| `DerivationLeftmostPRO.html` | Leftmost derivation of `aacbb` | 5 | `S ⇒ AcB ⇒ aAacB ⇒ aacB ⇒ aacBbb ⇒ aacbb` |

All scored pages and the author preview use staging's D3 v7 / `JSAVD3.js`
(the same dependency as the tree-traversal exercises). The derivation tree
itself is rendered with native SVG. They use the real JSAV
`exercise(model, initialize, options)` framework and the standard Undo, Reset,
Model Answer and Grade controls. Each reference step earns one point if completed without a mistake. Incorrect
steps are automatically undone with inline feedback. The point for that step
is permanently lost for the current attempt; repeated mistakes at the same
step do not lose additional points. In the leftmost task, submitting a matching
B production while A remains also loses the next step's point. Missing or
mismatched selections only show an interface prompt and do not lose credit.
`A → λ` and `B → λ` each count as one graded step. Expand **Parse tree** to
compare the tree with the student's derivation table; Undo/Reset update both.

Each HTML body's `data-config` attribute names its JSON definition, loaded and
validated by the shared `DerivationPROConfig.js`. Scored pages no longer load
`DerivationExerciseData.js`, which remains the data for the ungraded examples. The three pages share `DerivationPROLayout.js` for
their markup and `DerivationPRO.js` for their exercise logic. Each has its own
filename and OpenDSA exercise identity, so scores are not conflated under a
single URL/name. The manual
replacement engine is shared with the prototypes. A hidden JSAV variable
records the student trace, so JSAV Undo restores both the sentential form and
the history. JSAV's default grader compares each recorded sentential form with
the reference. A valid production that leaves the reference sequence is recorded,
checked and automatically undone before any score is reported. A separate
per-attempt set records the reference-step positions that have lost eligibility
for credit. It is outside the JSAV animation history, so manual Undo cannot
erase penalties. Reset clears the trace, score and lost-point set.

The progress bar tracks completed derivation steps independently of earned
points. Reaching the target finishes the attempt even when the score is below
the passing rate. The result then shows Passed or Not passed; an unsuccessful
attempt can be restarted with Reset. The passing rate uses the standard
OpenDSA `threshold` URL parameter supplied by textbook embeds, falling back to
the JSON definition's `passRate` on standalone pages (currently 1.0 for all
three tasks). The page also shows the minimum whole points required
and always requires reaching the target, even if the numeric threshold has
already been met. For example,
`DerivationPRO.html?threshold=0.6` passes a completed 2/3 attempt, while a
threshold of 0.8 does not. This is a score threshold, not an attempt limit.

To configure standalone exercises independently, edit `passRate` in the
corresponding JSON file. Use 0.6 for 60%, 0.8 for 80%, or 1.0 for 100%.
The checked-in defaults remain 1.0 for all three. In a textbook, set each
exercise's `threshold` in `config/PIFLA.json` and rebuild the book; the iframe's
course threshold takes priority over the JSON default. Changing a threshold
does not change the raw earned-points score sent to OpenDSA. The module-side
PE proficiency display checks the configured threshold when an attempt is
complete; completion with lost points does not automatically award proficiency.

## Professor Rodger's possibility-tree examples

Two additional pages transcribe the grammar examples supplied on November 4,
2026. They are standalone review instances, not newly registered textbook
assignments:

| Page / JSON | Grammar | Target | Successful routes | Steps per route |
|---|---|---|---|---|
| `DerivationAmbiguousPRO` | G1: `S → aA / Bb / λ`, `A → aA / aS`, `B → Bb / Sb` | `aaabbb` | 2 | 7 |
| `DerivationMultiplePRO` | G2: `S → aABb / λ`, `A → aA / a`, `B → Bb / b` | `aaabbb` | 6 | 5 |

G1 is ambiguous and its two routes produce different parse trees. G2 has
independent A/B rewrites: its six orders produce the same parse tree. The
provided G1 notes use `aaabbb`; G2 uses that same target here for comparison.

These JSON files set `"grading": "possibility"`. The default for existing
JSON files remains `"reference"`, so the original three exercises keep their
existing behavior. Model Answer still shows one example route, but the new
mode does not use it to require a particular student's derivation order.

`DerivationPossibility.js` constructs the search before an attempt starts.
S is depth 0 and each production application adds one level. **Maximum depth
is exactly `3 * target.length`**, hence 18 for `aaabbb`; this is not a bound
of 18 characters per sentential form. Equal states are shared only when both
the entire sentential form and its depth match. This preserves the remaining
depth budget and handles cyclic grammars without an infinite tree.

All valid replacements are considered (or only leftmost ones if configured).
The layered graph is classified from its leaves back to S. A node with a
successful descendant is reachable; a completely explored node whose children
are dead is dead. CFG states whose fixed terminals cannot be a subsequence of
the target can be proved dead without expanding irrelevant descendants.
A confirmed dead-end action is rejected immediately and loses the current
step's point. It is not necessary to wait for a wrong final terminal string.

A depth/resource cutoff is **undetermined**, not a proved dead end. Such a
student action is left unapplied and ungraded, without losing a point. Resource
safeguards (20,000 states, 100,000 edges, 512-character display/engine capacity,
and a 2-second build budget) are separate from the depth bound. Neither supplied
example reaches these safeguards: their complete searches have 48 and 47 nodes,
with no undetermined nodes.

The supplied exercises have fixed successful step counts, so one point per
step, persistent loss within an attempt, Undo, Reset and passing thresholds
remain unchanged. Imported possibility exercises with known successful routes
of different lengths are rejected with a configuration error instead of choosing
an unapproved scoring policy. Empty targets still work in reference mode;
possibility mode currently needs a nonempty target for its `3 * length` bound.

The possibility structure is used internally for grading only. Neither scored
pages nor author preview displays the search graph, its route statistics, or an
inspection link. The student's Parse tree records only productions actually
applied in their own derivation. Author preview never submits scores.

Run the pure search checks as well as the JSAV checks:

```sh
node tools/regression/grammar-derivation-possibility.cjs
```

## JSON exercise definitions and author preview

The three scored instances are defined by:

- `DerivationPRO.json`: `aaabbb`.
- `DerivationPalindromePRO.json`: `ababa`.
- `DerivationLeftmostPRO.json`: leftmost derivation of `aacbb`.

The JSON contains the grammar, target, instructions, source, derivation order,
passing rate and reference applications. It contains data only, not JavaScript.
The loader calculates every reference sentential form and validates the steps
before constructing the exercise. Existing scoring, Undo/Reset, Model Answer,
derivation table and tree all use the loaded definition.

To author another exercise:

1. Copy one of these JSON files anywhere on your computer with a new filename
   and ID. Edit its grammar, target, prompt, source, `leftmost`, `passRate` and
   `reference`.
2. Open `DerivationPreview.html` through the local server. Under **Import an
   exercise**, click **Choose JSON File** and select your file. It does not need to be inside the
   project folder.
3. The browser reads and validates the file, then reloads a fresh preview.
   **The JSON is not uploaded to a server.** A temporary copy stays in this
   tab's session storage so refreshing the preview still works. Importing
   another file starts a new attempt with new controls and a new model answer.
4. Test correct steps, mistakes, Reset and Model Answer. The author preview
   shows local scores but **never submits grades**. Invalid files leave the
   current preview unchanged and show an inline error. **Clear local preview**
   removes the tab's temporary copy; it does not delete your original file.
5. To register a new scored textbook instance, put the JSON in the project,
   copy a scored HTML shell to a unique filename, set
   `data-config="your-file.json"`, then register that page with `avembed` and
   the book configuration. This small registration step keeps each exercise's
   OpenDSA score identity separate; the shared code is unchanged.

No staging deployment is needed for local file import. Staging is used later
when publishing a reviewable version for other people to access.
Server-hosted JSON files can still be opened directly using
`DerivationPreview.html?config=your-file.json`.

For example, the existing first exercise can be previewed with
`DerivationPreview.html?config=DerivationPRO.json`.
The existing scored pages have fixed definitions and reject a `config` query
parameter; use the author preview to load another JSON file.

| Field | Meaning |
|---|---|
| `schemaVersion` | Currently 1. |
| `id` | Stable identifier, using letters, digits, hyphens or underscores. |
| `title`, `prompt` | Exercise name and instructions shown to the student. |
| `source`, `url` | Source description and an HTTP/HTTPS or relative source link. |
| `startSymbol` | Currently must be `S`, matching the shared derivation engine. |
| `rules` | Ordered pairs such as `["S", "aSb"]`; use `λ` or `""` for an empty right side. |
| `target` | Exact terminal string; use `""` for the empty string. |
| `leftmost` | Boolean: whether every application must replace the leftmost variable. |
| `passRate` | Number from 0 to 1; textbook `threshold` can override it. |
| `reference` | Ordered `{ "production": 1, "position": 1 }` applications. Both numbers start at **1**. |

Production numbers refer to the order in `rules`. Positions count characters
in the **current** sentential form, including terminals. For `aaabbb`, the three
reference applications are production 1 at position 1, production 1 at position
2, then production 2 at position 3. Authors do not need to duplicate the
intermediate forms in JSON. Variables are single uppercase ASCII letters;
symbols must be single UTF-16 characters, as in the existing engine. References
must have 1–200 steps and reach the target; invalid definitions or missing/invalid
JSON display an error instead of starting a scored attempt. Server definitions are
loaded from the same website without a cached copy; local files are read with
FileReader and kept only in the current tab's session storage.

These instances each have a unique successful sequence under their stated
rules (including the required leftmost order for `aacbb`). **The reference-sequence mode does
not grade arbitrary alternative derivations**: configuring an exercise
with multiple valid sequences requires a grading policy that accepts those
sequences, or explicit instructions specifying the required derivation.

Each student production application calls `exercise.gradeableStep()`.
After a change, `exercise.grade()` computes the reference prefix, subtracts
completed steps that have lost their credit and returns the score. The standard
`undo` score field counts those completed-but-uncredited steps; pending lost
steps are excluded, so `(correct + undo + fix) / total` tracks actual completion
without submitting a prematurely completed attempt. A standard
`jsav-exercise-grade-change` event passes it to `odsaAV.js`/`odsaUtils.js`.
The SPLICE iframe helper is included for embedding. Opening Model Answer
before completion disables score reporting for that attempt until Reset;
reference playback never advances the student's state or points.
Score feedback and the model-answer credit notice appear inline, without
blocking alerts. Model opening is logged as `grammar-derivation-model-open`;
the template enforces its credit policy before forwarding score events.

## PIFLA Module 6.1 integration

`RST/en/PIFLA/CFG1.rst` embeds these pages as `pe` exercises, following the
tree-traversal examples:

- Recursive and palindrome practice follow the String Derivation frameset.
- Leftmost practice follows Derivation Trees Example.

`config/PIFLA.json` registers the three independent exercise names with review
weights of 3, 3 and 5 points, and a completion threshold of 1.0. These are local
review settings; course weights can be adjusted separately. Step progress and
score events still use JSAV's `correct / total` ratio. Authenticated grade
persistence and the deployment's partial-credit policy require server-side
validation; local per-step progress does not prove that an LMS stores partial
attempts.

In a textbook iframe, the standalone navigation and generic page heading are
hidden. Each iframe stays on its own exercise to keep score identities aligned
with the book's exercise configuration. The standalone pages keep the three
navigation links. `DerivationBook.css` constrains only these three iframes to
the textbook reading column; the exercise sends height updates as its history
or tree grows.

Build and review locally:

```sh
make PIFLA
```

Then open `Books/PIFLA/html/CFG1.html#recursive-derivation-practice` on the
repository's static server. The textbook source uses this standard directive:

```rst
.. avembed:: AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation/DerivationPRO.html pe
   :long_name: Grammar Derivation: aaabbb
```

Actual authenticated book/LMS grade persistence still needs validation in a
configured deployment. Local regression tests check the JSAV grader, native
controls and outgoing score events, not an LMS backend.

Run the JSAV integration checks with Node and jsdom:

```sh
node tools/regression/grammar-derivation-jsav.cjs
```

For offline checks, set `D3_JS=/absolute/path/to/d3.v7.min.js` to a local copy
of the same official D3 v7 script referenced by the pages. Otherwise the
regression loader fetches that declared dependency once.

## Open and review

Serve the OpenDSA repository root with a static web server, then open:

`AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation/DerivationExercises.html`

Practice is the default. Select a symbol, or the endpoints of a contiguous
substring, then click a matching production either in the grammar table or
beside the selection. Undo reverses one replacement. Reset starts again at S.
Example replays a reference trace; its progress is separate from Practice.
View switches between a CFG parse tree and the derivation table. Grammars with
multi-symbol left sides use the table.

## PIFLA examples

| Direct exercise link | Target | Textbook example | Adaptation |
|---|---|---|---|
| [Recursive derivation](DerivationExercises.html#pifla-anbn) | `aaabbb` | CFG1, String Derivation; `CFGDerivationsFS.json`, key `derivation` | Same grammar, target and trace; students execute the replacements. |
| [Palindrome](DerivationExercises.html#pifla-palindrome) | `ababa` | CFG1, String Derivation; keys `palender1`–`palender3` | Same grammar and target; students choose the productions and occurrences. |
| [Leftmost derivation](DerivationExercises.html#pifla-leftmost-aacbb) | `aacbb` | CFG1, String Derivation and Derivation Trees Example | Same grammar and target; explicitly requires leftmost replacement, matching the worked example. |
| [Context-sensitive derivation](DerivationExercises.html#pifla-context-sensitive) | `aabbcc` | TuringMachinesAdv, Unrestricted and Context Sensitive Grammars | All textbook productions preserved; target and valid reference trace supplied for the exercise. |

Source files:

- `RST/en/PIFLA/CFG1.rst`
- `AV/PIFLA/CFL/CFGDerivationsFS.json`
- `AV/PIFLA/CFL/TreeExampleCON.js`
- `RST/en/PIFLA/TuringMachinesAdv.rst`

Published sections:

- [Context-Free Grammars Part 1](https://opendsa-server.cs.vt.edu/OpenDSA/Books/PIFLA/html/CFG1.html)
- [Unrestricted and Context Sensitive Grammars](https://opendsa-server.cs.vt.edu/OpenDSA/Books/PIFLA/html/TuringMachinesAdv.html#unrestricted-and-context-sensitive-grammars)

Reference traces:

```text
S ⇒ aSb ⇒ aaSbb ⇒ aaabbb
S ⇒ aSa ⇒ abSba ⇒ ababa
S ⇒ AcB ⇒ aAacB ⇒ aacB ⇒ aacBbb ⇒ aacbb
S ⇒ aAbc ⇒ abAc ⇒ abBbcc ⇒ aBbbcc ⇒ aabbcc
```

Authoring notes:

- The palindrome frameset's `palender3` correctly selects `S → a`; the
  `palensent3` question text inconsistently mentions `S → b`. The exercise uses
  the valid derivation from the grammar, ending in `S → a`.
- The context-sensitive example is confirmed in the published PIFLA text. Its
  identity with the course-notes slide mentioned in the task list has not been
  confirmed. This page does not claim to reproduce that slide.

## Earlier prototypes

The original binary-string, recursion/empty-production, operator-precedence,
ambiguity and proposed context-sensitive tasks remain in the Earlier prototypes
menu group. Their original source/adaptation descriptions remain in the data.
They are not presented as the new PIFLA worked-example exercises.

## Files and dependencies

- `DerivationExercises.html`: exercise selector and shared interface.
- `DerivationExerciseData.js`: grammars, targets, source metadata, hints and traces.
- `DerivationExerciseEngine.js`: manual replacement validation and undo/reset.
- `DerivationExercises.js`: interaction, source display, history and tree display.
- `DerivationExercises.css`: exercise-specific layout extending OpenFLAP styles.
- `DerivationPRO.html`, `DerivationPalindromePRO.html`, `DerivationLeftmostPRO.html`: per-task page shells.
- `DerivationPRO.css` / `DerivationPROLayout.js`: shared presentation and markup.
- `DerivationBook.css`: sizing for the three embedded textbook exercises.
- `DerivationPROConfig.js`: JSON transport, authoring validation and reference reconstruction.
- `DerivationPRO.json`, `DerivationPalindromePRO.json`, `DerivationLeftmostPRO.json`: scored exercise definitions.
- `DerivationPreview.html`: generic author preview, with score reporting disabled.
- `DerivationPRO.js`: reusable JSAV exercise integration.

The page reuses `../../../../BruteForceParse.css` and
`../../../../BruteForceDerivation.js`. The old
`AV/OpenFLAP/DerivationExercises.html` redirects here, preserving the query and
exercise hash. Each task has a stable hash link for individual review.

## Validation and integration status

Run `tools/regression/grammar-derivation-exercises.cjs` with Node and jsdom.
The checks cover all nine tasks and ten reference/manual traces, relative asset
paths, PIFLA source paths, inline production buttons, leftmost restrictions,
contextual replacements, undo/reset, distinct ambiguity trees and English labels.

A successful derivation must reach the exact target with no nonterminals.
Other valid traces are allowed unless a task explicitly requires leftmost order.
The ambiguity task additionally keeps distinct completed trees for comparison.

The multi-question examples page remains a standalone, ungraded prototype.
The three separate scored instances integrate JSAV step grading and OpenDSA
score events, and are embedded into PIFLA Module 6.1 as described above.
Deployed book/LMS persistence has not been validated.
