# CYK parser entry — 2026-10-04

Latest master (9564f8b8d) still opened a nonexistent AV/OpenFLAP/CYKParser.html; only Development/Obsolete copies existed. Add a standalone native-JavaScript CYK page and a testable dynamic-programming core. The core follows the standard substring/split recurrence used by the development prototype; the legacy copies are retained for existing references.

The active editor validates CNF without running Transform Grammar, transfers a dedicated cykGrammar snapshot, and resolves the page relative to the editor script (including the nested grammar-exercise authoring page). The authoring page loads the shared validator as well.

UI: input, accepted/rejected result, row-at-a-time Step, Complete All, Flip Table, one witness derivation tree, and return to the editor. Repeated inputs reset table and tree state. Empty inputs and nullable-start CNF are supported; malformed/missing stored grammar gets an explanatory message. Non-CNF is rejected as unsupported, not as a language-membership result. Limits: 64 UTF-16 characters and 256 rules, with explicit errors above those bounds. No production parser or search cutoff is used for CYK.

This is not a migration of the prototype's editable-answer cells or animated partition highlighting. It supplies the functional standalone parser and table/witness display; old development pages are unchanged.

Validation:
- node tools/regression/grammar-cyk.cjs: accepted/rejected strings, non-S start, ambiguous witness trees, empty input, CNF validation, input bound and a literal markup terminal.
- BROWSER_CHANNEL=chrome node tools/regression/grammar-cyk-ui.cjs: real editor file import and CYK menu/popup; Step, Complete All, flip, tree, repeated rejection and empty input, Back preserves grammar, malformed storage, nullable-start acceptance, non-CNF refusal without mutation; no local 404s or page exceptions; graceful browser shutdown.

Playwright is required for browser testing. Tests block external network requests. The nested exercise-authoring entry is code-reviewed, not separately browser-tested. Legacy editor copies, arbitrary CFG conversion and full browser compatibility are outside scope. No PR created for this change yet.
