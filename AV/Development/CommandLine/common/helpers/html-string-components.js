const createPromptHTMLString = (promptData) =>
  `<div class="prompt-container">
      <p class="path">${promptData.path}</p>
      ${
        promptData.branchName
          ? `<p class="branch">(${promptData.branchName})</p>`
          : ""
      }
      <p>${promptData.symbol || "$"}</p>
    </div>`;

const createOutputListHTMLString = (lines) =>
  `<div class="output-list-container">
    ${lines
      .map(
        (line, i) =>
          `<p>
          ${line}
        </p>`
      )
      .join("")}
    </div>`;

const createHistoryLineHTMLString = (input, output, promptData) =>
  `<div class="history-line-container">
    <div class="prompt-and-input">
      ${createPromptHTMLString(promptData)}
      <p>${input}</p>
    </div>
    ${
      output
        ? Array.isArray(output)
          ? createOutputListHTMLString(output)
          : `<p>${output}</p>`
        : ""
    }
  </div>`;

const createLSOutputHTMLString = (errors, results) =>
  `<div class="ls-output-container">
    ${errors ? createOutputListHTMLString(errors) : ""}
    ${results.map((result, i) => `<div>${result}</div>`).join("")}
  </div>`;

export {
  createHistoryLineHTMLString,
  createPromptHTMLString,
  createOutputListHTMLString,
  createLSOutputHTMLString,
};
