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
      if (args.length > 0 && args[0] === "push") {
        const prod = getRemoteInitialCommit().findBranchByName("prod");
        if (prod.commit !== getRemoteCurrBranch().commit) {
          awardCredit();
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "Challenge 2",
      commandDescription:
        "This challenge will require the usage of multiple commands. Remember, the -c flag can be used with switch to create a new branch and switch to the new branch at the same time.",
      challengeDescription:
        'Create a new branch named "prod". Then, create a commit on this branch containing at least one change. Lastly, push the "prod" branch to the remote repository.',
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["cd src"]
  );
});
