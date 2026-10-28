# Local derivation exercise prototypes

Open `AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation/DerivationExercises.html`
from an OpenDSA static server. The previous `AV/OpenFLAP/DerivationExercises.html`
URL redirects here and preserves the exercise selection in the URL hash.

The menu prioritizes four PIFLA worked-example adaptations and retains the five
earlier prototypes in a separate group. Practice is the default; Example replays
a reference trace. CFG tasks show trees or tables; contextual replacements use
the table. No scores are submitted.

Run using Node with jsdom available:

```sh
NODE_PATH=/absolute/path/to/node_modules node tools/regression/grammar-derivation-exercises.cjs
```

Checks cover relative assets, 54 reference steps across ten traces, all nine
manual tasks, PIFLA source metadata, default Practice mode, inline matching-rule
buttons, contextual substring selection, distinct ambiguity trees, invalid-step
rollback, leftmost restrictions, alternate valid derivations, Undo/Reset, view
switching, independent Practice/Example progress and English labels.
