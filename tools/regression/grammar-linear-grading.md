# Overlapping linear grammar classification in exercise grading

Base: origin/master at 03b74c3e4. Local branch: grammar-linear-grading.

Before the fix, the actual RegGramNFA1 exercise reported `right-linear: No` for S -> b. This grammar satisfies both linearity conditions, but identifyGrammar prefers the LLG label and grading compared that label exclusively against RLG.

The grader now checks the requested property directly using the existing checkRightLinear/checkLeftLinear methods. The unrestricted-grammar guard, displayed classification, parsing strategy, and language test cases are unchanged. Passing the type condition does not imply that a submitted grammar generates the language required by the exercise.

## Browser regression

Requires Node.js, Playwright and an installed browser. Run from this checkout:

```sh
node tools/regression/grammar-linear-grading-ui.cjs
```

Default browser: Edge. Set BROWSER_CHANNEL=chrome for Chrome; use NODE_PATH if Playwright is installed outside the repository. The runner uses a private loopback server and blocks external requests. GRAMMAR_TEST_ROOT can point at a baseline checkout.

Validated on 2026-10-02 with Chrome: 12 cases passed, no page errors, normal process exit. Actual RegGramNFA1 and RegGramNFA2 pages and grading buttons are used. Cases cover terminal-only rules, terminal strings, lambda alternatives, a unit-production chain, exclusively left/right-linear rules, and rejection of the opposite orientation. Rules are assigned to editor state programmatically; manual cell editing is not retested. These are type-condition checks on existing exercises, not claims that every sample is a full correct language answer.

The baseline S -> b case was reproduced before editing and displayed No. It now displays Yes. The separate cyclic-parser repair in the grammar-fix checkout is not included.
