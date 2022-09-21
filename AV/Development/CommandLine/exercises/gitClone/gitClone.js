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
      if (args.length > 0 && args[0] === "clone" && getLocalHomeDir()) {
        awardCredit();
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git clone (url)",
      commandDescription:
        "The git clone command clones the remote repository at the location specified by (url) and copies all its contents to the local repository.",
      challengeDescription:
        'Clone the remote repository. The url for the repository is "https://github.com/Sample/Sample.git".',
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
