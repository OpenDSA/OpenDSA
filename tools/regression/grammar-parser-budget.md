# Grammar parser search budgets

The exercise parser retains visited-form deduplication and now bounds both nullable and non-nullable searches, including replacement generation and nullable preprocessing.

Defaults per input: 200,000 work checks, 10,000 visited forms, 2,048 characters per form, 250 ms elapsed time. These are engineering defaults, not a proof that a rejected string cannot be derived. They are not a 500-level depth cutoff. Time is checked cooperatively; this is not a Web Worker or a hard real-time deadline.

A budget cutoff returns [null, null, {}], clears partial derivation state, and sets searchLimitReached. Ordinary acceptance/rejection remains boolean. Tree display reports undetermined. Grammar grading aborts the incomplete attempt, clears partial result rows and success indicators, and displays a message instead of submitting a score or showing a percentage alert. The shared grader resets the cutoff status on subsequent attempts. No hidden input is revealed.

Validation:

- node tools/regression/grammar-parser-budget.cjs
- BROWSER_CHANNEL=chrome node tools/regression/grammar-parser-budget-ui.cjs (Playwright required)

Source-level tests cover prior cycle regressions, unbounded nullable growth, each budget, and recovery. Browser tests exercise the actual Grade button with 5/7, 7/7 and 6/7 examples, default-budget cutoff for S -> SS | lambda, recovery to full credit, reset and no page errors. A simulated exercise frame and intercepted AJAX verify no score submission on cutoff and one submission on recovery; no real LMS is contacted. Rules are set programmatically rather than typed cell by cell.

The policy intentionally leaves cutoff results ungraded pending agreement with the instructors. This change does not alter the standalone MBFParse parser or its independent limits.
