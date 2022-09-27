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
      if (args.length > 0 && args[0] === "push") {
        if (!getRemoteHomeDir().find("config.js")) {
          awardCredit();
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "Challenge 3",
      commandDescription:
        "This challenge will require the usage of multiple commands. Remember, the -a flag can be used with commit to add all files and commit all files at the same time.",
      challengeDescription:
        'Clone the remote repository at "https://github.com/Sample/Sample.git". Then, remove "config.js" and update the remote repository with this change.',
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
