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
      if (args.length > 0 && args[0] === "clone" && getLocalHomeDir()) {
        awardCredit();
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git clone (url)",
      commandDescription:
        "The git clone command clones the remote repository at the location specified by (url) and copies the contents of the remote repository to a new directory on the local machine.",
      challengeDescription:
        'Clone the remote repository. The url for the remote repository is "https://github.com/Sample/Sample.git".',
    },
    handleAwardCredit,
    "git",
    null,
    null,
    null,
    null,
    true
  );
});
