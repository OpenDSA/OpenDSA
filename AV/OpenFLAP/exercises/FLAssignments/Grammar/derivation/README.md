# Derivation exercise prototypes

Interactive grammar derivation exercises based on worked examples from PIFLA.
Four textbook examples appear first, followed by five additional prototypes in
a separate menu group. Each exercise has a stable bookmark ID.

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

These exercises run as standalone prototypes. They are not embedded into textbook
chapters or connected to OpenDSA grading. Textbook placement and scoring rules
can be addressed separately.
