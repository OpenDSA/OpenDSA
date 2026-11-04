/* Shared markup for all scored derivation exercise pages. */
window.DerivationPROLayout = `
    <h1>Grammar Derivation Exercise</h1>
    <section id="json-import" class="json-import" aria-labelledby="json-import-title" hidden>
      <h2 id="json-import-title">Import an exercise</h2>
      <input id="json-file" type="file" accept=".json,application/json" aria-label="JSON file" hidden>
      <div class="json-file-picker">
        <button id="choose-json" type="button" aria-describedby="json-filename">Choose JSON File</button>
        <span id="json-filename">No file selected</span>
      </div>
      <button id="clear-json" type="button" hidden>Clear local preview</button>
      <p class="view-note">Choose a JSON file from your computer to preview an exercise. The file stays in this browser tab and is not uploaded to a server.</p>
      <p id="import-status" role="status" aria-live="polite"></p>
    </section>
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
      <p id="preview-note" class="view-note" role="status" hidden>Author preview. Scores are shown locally and are not submitted.</p>
      <p class="jsavexercisecontrols" aria-label="Exercise controls"></p>
      <p><span class="jsavscore" aria-live="polite">Points: <span class="jsavcurrentscore">0</span> / <span class="jsavmaxscore">0</span>. <span class="jsavamidone">In progress</span></span></p>
      <progress id="progress" value="0" max="1" aria-label="Derivation steps completed"></progress>
      <p id="attempt-summary" class="view-note"></p>
      <p id="result" role="status" aria-live="polite"></p>
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
      <p class="view-note">Each step earns one point if completed without a mistake. An incorrect step is automatically undone and loses that step's point for this attempt. Retrying the same step does not lose additional points. Undo does not restore lost points; Reset starts a fresh attempt. Grade checks your score. Model Answer shows the reference derivation.</p>
      <div class="jsavcanvas" aria-hidden="true"></div>
    </div>
`;
