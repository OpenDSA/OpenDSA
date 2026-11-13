# User Control Parse

Open Grammar Editor → Input → User Control Parse. The entry is a peer of
single-input and multiple-input brute-force parsing. It transfers the current
grammar using the existing parser storage convention and resolves the page
relative to grammarEditor.js, including when the editor is embedded deeper.

Enter a target and select Start. Select a production in the grammar, choose a
matching occurrence (or click its first symbol), and select Step. A unique
occurrence is selected automatically. Previous undoes one application; Reset
returns to the start form. Editing the target clears the active derivation and
requires Start again. Blank, ! and λ represent the empty target.

This is a manual exploration tool inspired by JFLAP's User Control Parse:
https://jflap.org/tutorial/grammar/user_control_parsing/index.html
It applies one production once per Step; unlike JFLAP's multiple-selection
shortcut, it does not apply the rule to several selected occurrences at once.
There is no reference derivation, possibility search, scoring, or automatic
rollback of legal choices that do not lead to the target. Previous lets the
user explore a different route. Both short and longer derivations are allowed.

Tree/table rendering reuses BruteForceDerivation and BruteForceParseUI.
Multi-symbol left sides use the existing grouped derivation graph rather than
claiming a context-free parse tree. The first production's left side defines
the start form. A display safeguard stops at 200 steps or 512 symbols without
claiming rejection. Back to Grammar Editor preserves the grammar.

Validation:
`NODE_PATH=path/to/jsdom/node_modules node tools/regression/grammar-user-control-parse.cjs`

Manual browser check: enter S → aS and S → λ in Grammar Editor, open the new
Input entry, set target aa, apply the first rule twice and the empty rule once;
the form becomes aa and the tree includes λ. The editor-to-parser transfer and
target-reached feedback were checked in a real browser.
