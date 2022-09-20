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
        "The git branch command creates a new branch named (branch_name).",
      challengeDescription: 'Create a new branch named "develop".',
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["cd src", "touch app.js", "git add .", "git commit", "git push"]
  );
});
