# Grammar exercise parser: repeated-state cycles

The shared ParseTreeController in DataStructures/FLA/PDA.js used a Set only for pending forms. Removing a processed form allowed a self/unit cycle to enqueue it again indefinitely. On the baseline, S -> S | aSb | ab with input aa exceeded the isolated VM's one-second timeout.

The fix keeps a per-input visited set after dequeueing, expands each form once, and preserves the first derivation predecessor. Search/trace state resets for each test input. It does not change the PDA simulator or introduce a dependency on the standalone Brute Force Parse page.

Run from the repository root:

```sh
node tools/regression/grammar-parser-cycles.cjs
node tools/regression/grammar-parser-cycles-ui.cjs
```

The first runner executes the actual ParseTreeController source and bundled Underscore in a VM. Only the unused tree constructor is stubbed. Each case has a one-second execution timeout. It covers self/mutual cycles, positive and negative inputs, lambda, non-S start symbols, left recursion, repeated nullable variables, and acyclic traces when reusing the parser.

The UI runner requires Playwright and an installed browser (Edge by default; set BROWSER_CHANNEL=chrome for Chrome). It serves a private local checkout and blocks remote requests. It loads the real GramIntro3str exercise and clicks its real grading button with cyclic and ordinary grammars: 5/7, 7/7, and 6/7 respectively. Reset and absence of page exceptions are checked. Grammar state is supplied directly, so this does not retest manual cell editing or a full generated textbook chapter.

Validated with Chrome on 2026-09-30: assertions passed and the browser runner exited normally without cleanup warnings.

Scope: this prevents revisiting identical sentential forms. It is not a general termination proof for grammars generating infinitely many distinct forms; the existing nullable-parser limit and other pruning behavior remain unchanged.
