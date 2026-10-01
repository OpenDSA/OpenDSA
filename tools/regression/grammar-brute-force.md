# Brute Force Parse regression checks

Run the algorithm checks with Node.js from the repository root:

```sh
node tools/regression/grammar-brute-force.cjs
```

Browser checks require Playwright and an installed Edge browser. Set NODE_PATH to your development installation if necessary, or BROWSER_CHANNEL to another installed Playwright channel. No runtime dependency is added to OpenFLAP.

```sh
node tools/regression/grammar-brute-force-ui.cjs
node tools/regression/grammar-brute-force-boundaries.cjs
```

Each browser runner serves this checkout on an ephemeral loopback port, blocks external requests and uses an isolated browser context. The checks cover:

- Opening the parser from the editor, multiple input results and step navigation.
- Editing stale results, clearing inputs and returning to the editor with rules preserved.
- Empty input (`!` or lambda), more than ten rows, nullable rules and multi-symbol left sides.
- Search-limit reporting and recovery, plus missing grammar data.
- Browser page exceptions.

The standalone parser uses bounded breadth-first search with visited sentential forms. Defaults are 10,000 visited forms, 250 ms per input, and a form-length bound of max(64, input length + 32). A search cutoff reports **Undetermined**, not **Reject**. Duplicate forms break finite cycles. These checks do not test or modify the textbook exercise grading parser.

The UI can display an automatically found derivation; it does not implement the separate interactive derivation-exercise task. The older Development implementation is retained. The Back action uses the editor import support introduced by PR #817.

The browser runners have a 180-second watchdog. If graceful shutdown stalls after assertions, they attempt to terminate only the browser process tree they launched, report cleanup warnings separately, then exit; they do not close personal browser sessions.
