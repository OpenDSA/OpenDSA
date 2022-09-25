import {
  awardCredit,
  initializeGitExercise,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit =
    (
      getLocalCurrDir,
      getLocalHomeDir,
      getLocalInitialCommit,
      getLocalCurrBranch,
      getRemoteHomeDir,
      getRemoteInitialCommit,
      getRemoteCurrBranch
    ) =>
    (args) => {
      if (args.length > 0 && args[0] === "status") {
        const src = getLocalHomeDir().findDeep("src");
        if (src) {
          const index = src.find("index.html");
          const test = src.find("test.js");
          if (index && index.isUnchanged() && test && test.isUnchanged()) {
            awardCredit();
          }
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git restore (path)",
      commandDescription:
        "The git restore command undos the changes made to the file or directory at the location specified by (path). Multiple (path) values can be provided to restore multiple files or directories.",
      challengeDescription:
        "Restore all the changed files. Then, run git status to check that the files are no longer changed.",
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["cd src", "rm test.js", "vi index.html"]
  );
});
