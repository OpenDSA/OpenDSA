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
        if (getLocalCurrBranch().name === "testing") {
          awardCredit();
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git switch [-c] (branch_name)",
      commandDescription:
        "The git switch command with the -c flag creates a new branch with the name specified by (branch_name) if the branch does not exist and then switches to the new branch.",
      challengeDescription:
        'Create a "testing" branch and change the current branch to the "testing" branch. Then, run git status to check that the "testing" branch is the current branch.',
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
