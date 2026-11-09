# Brute-force parsing modes

The Grammar Editor exposes two Input commands, matching JFLAP's naming:

- **Brute Force Parse** opens `AV/OpenFLAP/BFParse.html` for one input. Start
  searches for a derivation; Step, Previous, Reset and Complete replay it.
  View switches between Noninverted Tree and Derivation Table without resetting
  the selected step. Blank input, `!` and `λ` all represent the empty string.
- **Multiple Brute Force Parse** opens the existing `MBFParse.html` destination.
  Run Inputs tests the input rows and displays plain Accept/Reject/Undetermined
  results. This mode has no derivation tree, step controls or clickable results.
  Blank batch rows are skipped, so use `!` or `λ` for an empty input.

These are sibling commands in the editor's Input menu. Each parser independently
receives the editor's grammar and returns to the editor. Neither parser contains
a link to, or starts, the other parser. Inputs and results are independent.

Both pages use the existing bounded `BruteForceParser.js`. A search cutoff
remains Undetermined and never displays an accepted tree or a false rejection.
Editing a single input or starting a new search clears its old visualization.
Editing a batch input clears that row's old result.

CFG trees use structural depth, ordered child subtrees and a centered parent.
Unrestricted multi-symbol replacements have a grouping node and are identified
as a derivation graph. Parser offsets are UTF-16 indices; visualization nodes
represent Unicode code points, with explicit conversion between the two.
All grammar, input and node labels are rendered as text.

## Automated checks

```sh
node tools/regression/grammar-brute-force.cjs
node tools/regression/grammar-brute-force-modes.cjs
node tools/regression/grammar-brute-force-modes-dom.cjs
```

The DOM suite requires `jsdom` to be installed or available through `NODE_PATH`.
It executes the actual page scripts against their HTML in an isolated DOM;
it does not launch a browser. The layout suite has no additional dependencies.
Checks cover tree geometry and parentage, step navigation, view changes, input
invalidation, repeated parsing, empty strings, cutoff recovery, unrestricted and
Unicode derivations, markup terminals, batch-only results, missing grammar data and
both standalone and nested editor destinations.

## Browser review

Enter `S → AB`, `A → a`, `B → b` in the Grammar Editor. Confirm both Input menu
commands exist. In the single mode enter `ab`, select Start, Step and Complete;
the tree must have sibling A/B nodes and sibling-level a/b leaves. Switch to
Derivation Table, navigate backwards, Reset, then parse `aa` to check rejection
and removal of the old tree. In the multiple mode run `ab`, `aa` and `!`; confirm
there are only results and no tree, Step controls or clickable Accept button.
Return to the editor and open the separate single command; its input starts blank. Back to Grammar Editor must
preserve the grammar. Check that controls remain usable in a narrow window.
