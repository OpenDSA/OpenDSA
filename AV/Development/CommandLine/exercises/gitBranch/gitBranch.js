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
      if (args.length > 0 && args[0] === "branch") {
        if (getLocalInitialCommit().findBranchByName("develop")) {
          awardCredit();
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git branch (branch_name)",
      commandDescription:
        "The git branch command creates a branch with the name specified by (branch_name).",
      challengeDescription: 'Create a new branch named "develop".',
    },
    handleAwardCredit,
    "git",
    null,
    null,
    [
      "cd src",
      "rm test.js",
      "vi index.html",
      "touch app.js",
      "git add .",
      'git commit -m "test"',
      "git push",
    ]
  );
});
