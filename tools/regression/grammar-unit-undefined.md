# Unit removal with undefined variables

Base: master e5a71b4d8 (including merged PRs #822 and #823). Isolated local branch: grammar-unit-undefined.

Reproduced from the actual editor: loading S -> A | b and choosing Convert / Transform Grammar raised "Cannot read properties of undefined (reading length)". removeUnitHelper assumed every RHS variable had a dictionary entry. Both editor and exercise helper copies now treat a missing entry as an empty production list.

The unit dependency graph now includes RHS-only variables so the S -> A edge can be drawn. An empty productive-rule set is handled before useless-rule reachability traversal, allowing S -> A alone to complete and export an empty grammar rather than crash in transformation preprocessing.

Run from this checkout:

```sh
node tools/regression/grammar-unit-undefined.cjs
node tools/regression/grammar-unit-undefined-ui.cjs
```

For the empty-language UI case, set UNIT_EMPTY_LANGUAGE=1 before the second command. Browser tests require Playwright, with optional NODE_PATH and BROWSER_CHANNEL (default msedge; tested chrome). They run an isolated localhost server and block remote requests.

Validated 2026-10-02:
- Seven removeUnit cases on each implementation: undefined target, empty language, chains, mixed productive/dead paths, productive cycles, non-S start, unchanged unit-free grammar.
- Empty/productive removeUseless preprocessing on both implementations.
- Actual standalone GUI: load S -> A | b, create S -> A edge, delete the unit rule, confirm export, and verify S -> b in the new editor tab.
- The same GUI sequence for S -> A alone exports an empty grammar.
- Both browser runs exited normally with no page exceptions.

Exercise helper code is covered by isolated source tests; the full guided transformation-exercise GUI was not run. Non-S start handling in useless-rule removal, general CNF workflows, and self-loop/duplicate-edge interactions are separate tasks and are not claimed fixed. This PR diff is independent of the cyclic-parser and linear-grading repairs already merged into master.

## Browser cleanup follow-up

The old runner waited only ten seconds, then raced a direct taskkill against Playwright shutdown, discarded command diagnostics, and still exited successfully on cleanup failure. A blank-browser diagnostic confirmed graceful shutdown can exceed that threshold.

The unit workflow runner now closes its context first and gives Playwright up to 60 seconds for normal browser shutdown. Only then does it use Playwright's kill API (15-second limit). The child process must have exited; remaining cleanup errors fail the runner. No unconditional successful process.exit is used to hide lingering cleanup work.

Run `node tools/regression/grammar-unit-browser-cleanup-test.cjs` for slow graceful shutdown, forced fallback, cleanup failure, context failure and live-process detection. Both actual Chrome workflow reruns passed with `graceful; process exited`, exit code 0 and no cleanup warnings on 2026-10-02. This cleanup change is local to this independent unit-removal worktree; other pending repairs are untouched.

Submission rerun after rebasing onto e5a71b4d8: functional assertions passed, but the first browser run timed out during both graceful and forced shutdown and correctly exited nonzero. Earlier clean exits do not establish that this intermittent local cleanup problem is fully resolved.

### Follow-up: disconnect the WebSocket client

The launchServer/connect runner also owns a remote Browser client. Shutdown now closes the context, explicitly disconnects that client and checks isConnected(), then closes the browser server and checks the child exit status. Failure to disconnect still fails the run, while server shutdown is attempted even after context/client errors.

Validation after this change: two consecutive rounds, each containing both ordinary and empty-language transformation/export workflows (four browser processes total), all completed with `graceful; process exited`, no page exceptions, no forced cleanup and exit code 0. Cleanup unit tests also verify context/client/server ordering and rejection of a client that remains connected. The preceding submission-time failures are retained above as history; this validation supersedes them for the updated runner, without claiming universal browser/environment coverage.
