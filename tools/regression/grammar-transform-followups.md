# Grammar transformation follow-ups — 2026-10-03

Based on origin/master f66b23921. Local branch: grammar-transform-followups. No PR submitted in this round.

## Original start symbol
Reproduced a TypeError on A -> a. Both the standalone editor and exercise helper now use the first original production's LHS, and return an empty grammar if that start is nonproductive instead of promoting a later rule. Six helper cases on each implementation cover non-S starts, reachable/unreachable rules, nonproductive starts, cycles, ordinary S and empty input. The actual editor workflow A -> a; B -> b completed deletion of B -> b and exported A -> a.

## CNF export
Restored an explicit Export Grammar button, enabled only after every RHS satisfies the CNF shape. Completion no longer relies on equal rule counts. Temporary symbols are renamed by whole tokens without mutating the conversion table, so repeat exports work. The GUI converted S -> abcd, exported twice, checked the CNF shape and original start, and independently derived abcd from the exported rules. This is not exhaustive CNF algorithm certification.

## FA / PDA LL round trips
A converted FA failed to load because its state label hit an undeclared label_val in FA.js. Added the missing local declaration. A PDA LL conversion for S -> lambda crashed because no terminal self-loop existed; made the initial label styling/height conditional on that edge.

Actual browser workflows: convert S -> aS | b to FA and PDA LL, and S -> lambda to PDA LL; download JFF; load in the corresponding editor; use the real filename dialog to save; reload the saved file. XML state/final/initial flags and transitions are preserved. An independent bounded simulation of the exported XML checks empty, b, ab, aab, aa, ba. This is not a test of each editor's own simulation UI. LR conversion and exhaustive special-character/XML validation remain outside scope.

## Commands
- node tools/regression/grammar-useless-start.cjs
- node tools/regression/grammar-unit-undefined.cjs
- BROWSER_CHANNEL=chrome node tools/regression/grammar-transform-followups-ui.cjs
- BROWSER_CHANNEL=chrome node tools/regression/grammar-conversion-roundtrip-ui.cjs

The browser suites require Playwright, use private local HTTP servers, block external requests, import grammar files through file inputs, and check for page errors. Save menu actions are invoked through their existing DOM click handlers; filename dialogs and transformations use browser interactions. Both suites completed with graceful test-browser shutdown.
