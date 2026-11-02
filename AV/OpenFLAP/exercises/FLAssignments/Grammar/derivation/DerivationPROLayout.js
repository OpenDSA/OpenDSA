/* Shared markup for all scored derivation exercise pages. */
window.DerivationPROLayout = `
    <h1>Grammar Derivation Exercise</h1>
    <nav class="mode-links" aria-label="Exercise navigation">
      <a id="examples-link" class="back-link" href="DerivationExercises.html#pifla-anbn">Back to exercise examples</a>
    </nav>
    <nav class="scored-links" aria-label="Scored exercises">
      <a href="DerivationPRO.html" data-exercise="pifla-anbn">1. Derive aaabbb</a>
      <a href="DerivationPalindromePRO.html" data-exercise="pifla-palindrome">2. Derive ababa</a>
      <a href="DerivationLeftmostPRO.html" data-exercise="pifla-leftmost-aacbb">3. Leftmost derivation: aacbb</a>
    </nav>
    <div id="derivation-pro" class="avcontainer">
      <h2 id="exercise-title"></h2>
      <p id="prompt"></p>
      <p><strong>Target string:</strong> <code id="target"></code></p>
      <p class="source-note"><strong>Source:</strong> <a id="source" target="_blank" rel="noopener">PIFLA: String Derivation</a></p>
      <p class="jsavexercisecontrols" aria-label="Exercise controls"></p>
      <p><span class="jsavscore" aria-live="polite">Points: <span class="jsavcurrentscore">0</span> / <span class="jsavmaxscore">0</span>. <span class="jsavamidone">In progress</span></span></p>
      <progress id="progress" value="0" max="1" aria-label="Correct derivation steps"></progress>
      <p id="credit-note" class="view-note" role="status" hidden></p>
      <div class="parse-layout">
        <aside class="grammar-panel">
          <h2>Grammar</h2>
          <div id="rules"></div>
          <p class="grammar-note">Select a symbol or substring in the sentential form, then apply a production.</p>
        </aside>
        <main class="parse-workspace">
          <div class="form-panel">
            <p><strong>Sentential form:</strong> <span id="step-count"></span></p>
            <div id="current-form" tabindex="-1" aria-label="Current sentential form"></div>
            <p id="selection-label" class="view-note"></p>
            <div id="available-rules" aria-label="Matching productions"></div>
          </div>
          <details id="parse-tree-view"><summary>Parse tree</summary><div id="tree" class="tree-scroll"></div></details>
          <p id="status" role="status" aria-live="polite"></p>
          <div class="history-scroll"><table aria-label="Student derivation"><thead><tr><th>Step</th><th>Production</th><th>Sentential form</th></tr></thead><tbody id="history"></tbody></table></div>
        </main>
      </div>
      <p class="view-note">Each correct step earns one point. Use Undo to revise a step, Reset to start a new attempt, or Grade to check your score. Model Answer shows the reference derivation.</p>
      <div class="jsavcanvas" aria-hidden="true"></div>
    </div>
`;
