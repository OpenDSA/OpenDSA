import {
  awardCredit,
  initializeGitExercise,
} from "../../common/commandLineExercise.js";
import { GIT_STATE } from "../../common/gitStatuses.js";

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
        if (getLocalCurrBranch().name === "develop") {
          awardCredit();
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git switch (branch_name)",
      commandDescription:
        "The git switch command changes the current branch to the branch with the name specified by (branch_name).",
      challengeDescription:
        'Change the current branch to the "develop" branch. Then, run git status to check that the "develop" branch is the current branch.',
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
      "git branch develop",
    ]
  );
});
