# Grammar initialization regression checks

Requires Node.js, Playwright and a compatible browser. Resolve Playwright through your development installation or NODE_PATH; no project runtime dependency is added. The default browser channel is msedge; set BROWSER_CHANNEL to another installed Playwright channel if needed.

Run from the repository root:

```
node tools/regression/grammar-initialization.cjs .
```

The runner serves the checkout on an ephemeral loopback port and runs a headless browser. External requests are blocked. It checks standalone initialization without Canvas helpers, false/true Canvas contexts (using progress-service doubles), a same-origin iframe containing the real first grammar exercise, the actual grading button with correct and incomplete answers, and reset. The grammar array is supplied directly; cell editing and production Canvas backend persistence are not tested. Exercise grading and parsing use real project code. This iframe is a focused fixture, not the complete generated textbook chapter.

For diagnostic output against the two original source files, add --baseline. Baseline files come from origin/master, or the ref supplied by BASELINE_REF; other assets still come from the checkout. This mode records failures rather than asserting success.

Validated against base a3924fdfb: before the fix, the standalone editor raised window.inCanvas is not a function; the exercise raised a script syntax error followed by jsav.flexercise is not a function, and had no grading button. After the fix: no page exceptions, one grading button, correct grammar 7/7 (100%), incomplete grammar 6/7 (85.71%), reset succeeds, and the simulated Canvas progress loader is called only in the Canvas case.
