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
        awardCredit();
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git status",
      commandDescription:
        "The git status command prints the status of the local repository including information about the working tree, the staging area, commits, and the active branch.",
      challengeDescription:
        'Run git status. Notice "index.html" has been modified, and "app.js" is a new file and is thus untracked.',
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["cd src", "vi index.html", "touch app.js"]
  );
});
