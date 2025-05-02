import {
  createCommitOutputHTMLString,
  createStatusOutputHTMLString,
} from "../html-string-components/html-string-components.js";

const getCommitOutput = (files, pathAndStateValues) =>
  createCommitOutputHTMLString(files, pathAndStateValues);

const getStatusOutput = (
  localCurrBranch,
  homeDir,
  remoteInitialCommit,
  currDir
) =>
  createStatusOutputHTMLString(
    localCurrBranch,
    homeDir,
    remoteInitialCommit,
    currDir
  );

export { getCommitOutput, getStatusOutput };
