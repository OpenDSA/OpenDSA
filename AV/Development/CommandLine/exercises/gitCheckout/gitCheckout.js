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
      if (args.length > 0 && args[0] === "checkout") {
        if (getLocalCurrBranch().name === "develop") {
          awardCredit();
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git checkout (branch_name)",
      commandDescription:
        "The git checkout command checks out the branch named (branch_name).",
      challengeDescription: 'Checkout the branch named "develop".',
    },
    handleAwardCredit,
    "git",
    null,
    null,
    [
      "cd src",
      "touch app.js",
      "git add .",
      'git commit -m "test"',
      "git branch develop",
    ]
  );
});
