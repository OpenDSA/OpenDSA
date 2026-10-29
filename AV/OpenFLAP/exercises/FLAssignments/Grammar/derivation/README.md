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

All pages use the real JSAV
`exercise(model, initialize, options)` framework and the standard Undo, Reset,
Model Answer and Grade controls. Each correct reference step earns one point,
with a live progress indicator. In the leftmost task, selecting B while A
remains rejects the action without recording a step or changing the score.
`A → λ` and `B → λ` each count as one graded step. Expand **Parse tree** to
compare the tree with the student's derivation table; Undo/Reset update both.

The HTML body's `data-exercise` attribute selects a task through the shared
`DerivationPROConfig.js`. The three pages share `DerivationPROLayout.js` for
their markup and `DerivationPRO.js` for their exercise logic. Each has its own
filename and OpenDSA exercise identity, so scores are not conflated under a
single URL/name. The manual
replacement engine is shared with the prototypes. A hidden JSAV variable
records the student trace, so JSAV Undo restores both the sentential form and
the history. JSAV's default grader compares each recorded sentential form with
the reference. A valid production that leaves the reference sequence earns no
additional credit; Undo permits correction. Mismatched selections do not
create a graded step. Reset clears the attempt and its score.

These instances each have a unique successful sequence under their stated
rules (including the required leftmost order for `aacbb`). **The template does
not yet grade arbitrary alternative derivations**: configuring an exercise
with multiple valid sequences requires a grading policy that accepts those
sequences, or explicit instructions specifying the required derivation.

Each student production application calls `exercise.gradeableStep()`.
After a change, `exercise.grade()` computes the score and a standard
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
- `DerivationPROConfig.js`: task/reference selection from page configuration.
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
