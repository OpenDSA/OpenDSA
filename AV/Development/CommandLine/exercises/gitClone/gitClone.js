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
      if (args.length > 0 && args[0] === "clone") {
        awardCredit();
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git clone",
      commandDescription:
        "The git clone command clones the remote repository and copies all its contents to the local repository",
      challengeDescription: "Run git clone.",
    },
    handleAwardCredit,
    "git",
    null,
    null,
    [""],
    null,
    true
  );
});
