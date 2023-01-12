import { FILE_STATE } from "../core/config/file-states.js";

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

const createCommitOutputHTMLString = (files, pathAndStateValues) => {
  const newCount = countFiles(files, FILE_STATE.NEW);
  const modifiedCount = countFiles(files, FILE_STATE.MODIFIED);
  const deletedCount = countFiles(files, FILE_STATE.DELETED);

  const totalCountsLine = createCountLine(
    (newCount || 0) + (modifiedCount || 0) + (deletedCount || 0),
    "changed in total"
  );

  const countsLine = [
    [newCount, "created"],
    [modifiedCount, "modified"],
    [deletedCount, "deleted"],
  ]
    .filter((value) => value[0] !== 0)
    .map((value) => createCountLine(value[0], value[1]))
    .join(", ");

  const fileLines = pathAndStateValues.map(
    (value) => `${value.state} ${value.path}`
  );

  return `<div class="commit-output-container">
      <div>
        <p>${totalCountsLine}</p>
        <p>${countsLine}</p>
      </div>
      <div>
        ${fileLines
          .map(
            (line, index) =>
              `<p>
            ${line}
          </p>`
          )
          .join("")}
      </div>
    </div>`;
};

const createCountLine = (count, message) =>
  `${count} file${count > 1 ? "s" : ""} ${message}`;

const countFiles = (files, stagingState) =>
  files
    .filter((file) => file.isStagingState(stagingState))
    .reduce((sum, file) => sum + file.countFiles(), 0);

const createStatusOutputHTMLString = (
  localCurrBranch,
  homeDir,
  remoteInitialCommit,
  currDir
) =>
  `<div class="status-output-container">
      <div>
        <p>On branch ${localCurrBranch.name}</p>
        <p>
          ${createBranchUpToDateLine(localCurrBranch, remoteInitialCommit)}
        </p>
      </div>
      ${createStatusSectionHTMLString(
        "Changes to be committed:",
        homeDir.getStagingAreaFiles(),
        currDir,
        true
      )}
      ${createStatusSectionHTMLString(
        "Changes not staged for commit:",
        homeDir.getWorkingAreaFiles(),
        currDir,
        true,
        true
      )}
      ${createStatusSectionHTMLString(
        "Untracked files:",
        homeDir.getUntrackedFiles(),
        currDir,
        false,
        true,
        true
      )}
    </div>`;

const createStatusSectionHTMLString = (
  title,
  files,
  currDir,
  flatten,
  isWorking,
  hideStates
) => {
  const sortedPathAndStateValues = currDir.getSortedPathAndStateValues(
    files,
    flatten,
    isWorking
  );

  const sortedRelativePaths = sortedPathAndStateValues.map(
    (value) => value.path
  );
  const sortedStates = sortedPathAndStateValues.map((value) => value.state);

  return files && files.length > 0
    ? `<div>
      <p>${title}</p>
      <div class="status-section-files">
        ${
          !hideStates
            ? `<div>
            ${sortedStates
              .map(
                (state, index) =>
                  `<p
                class=${isWorking ? "working-files" : "staged-files"}
              >
                ${state}
              </p>`
              )
              .join("")}
          </div>`
            : ""
        }
        <div>
          ${sortedRelativePaths
            .map(
              (path, index) =>
                `<p
              class=${isWorking ? "working-files" : "staged-files"}
            >
              ${path}
            </p>`
            )
            .join("")}
        </div>
      </div>
    </div>`
    : "";
};

const createBranchUpToDateLine = (localBranch, remoteInitialCommit) => {
  const remoteBranch = remoteInitialCommit.findBranchByGitId(localBranch.gitId);

  if (!remoteBranch) {
    return "";
  }

  const { ahead, behind } = localBranch.getNumCommitsDifferent(remoteBranch);

  if (ahead === 0 && behind === 0) {
    return `Your branch is up to date with 'origin/${remoteBranch.name}'.`;
  }
  if (ahead > 0 && behind === 0) {
    return `Your branch is ahead of 'origin/${
      remoteBranch.name
    }' by ${ahead} commit${ahead > 1 ? "s" : ""}.`;
  }
  if (ahead === 0 && behind > 0) {
    return `Your branch is behind 'origin/${
      remoteBranch.name
    }' by ${behind} commit${behind > 1 ? "s" : ""}.`;
  }
  if (ahead > 0 && behind > 0) {
    return `Your branch is ahead of 'origin/${
      remoteBranch.name
    }' by ${ahead} commit${ahead > 1 ? "s" : ""} and behind 'origin/${
      remoteBranch.name
    }' by ${behind} commit${behind > 1 ? "s" : ""}.`;
  }
};

export {
  createHistoryLineHTMLString,
  createPromptHTMLString,
  createOutputListHTMLString,
  createLSOutputHTMLString,
  createCommitOutputHTMLString,
  createStatusOutputHTMLString,
};
