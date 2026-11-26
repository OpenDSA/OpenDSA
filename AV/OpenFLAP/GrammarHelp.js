/* Shared instructions for the grammar editor and grammar construction exercises. */
document.getElementById('content').innerHTML = `
<h1>Grammar Editor Help</h1>
<h2>Enter and edit productions</h2>
<p>Click the left or right cell of a production to edit it. The middle arrow is not editable.
Use uppercase letters for variables and enter the right side without the arrow.
Tab and Shift+Tab move between editable cells and save your input.</p>
<p>For an empty production, leave the right cell blank and click outside it; it is displayed as λ.
Click Add Row (under Edit in the standalone editor) to append a row and focus its left cell.</p>
<h2>Editing modes</h2>
<p>Edit Grammar is selected by default. Click Delete Row to select deletion mode, then click one row.
After deleting or cancelling the confirmation, the editor returns to Edit Grammar.
Click Delete Row again, or Edit Grammar, to cancel deletion mode without deleting a row.
The selected mode button is highlighted and marked with a check.</p>
<h2>Settings and help</h2>
<p>The settings gear is at the upper-left of the grammar workspace. Open Help in a separate page
while keeping your grammar open.</p>
<h2>Standalone editor</h2>
<p>Use File → Open Grammar to load a JFLAP .jff file and File → Save Grammar to download your grammar.
Input provides single and multiple Brute Force Parse, User Control Parse, LL(1), SLR(1), and CYK parsing.
Test identifies the grammar type. Convert provides grammar transformations and automaton conversions.</p>
<h2>Grammar construction exercises</h2>
<p>Follow the exercise's language and grammar-type requirements. Grade tests your grammar;
results appear below the workspace. Show Test Cases lists available tests; some tests may be hidden.
Reset starts the exercise again. These exercise controls differ from the standalone editor menus.</p>
`;
