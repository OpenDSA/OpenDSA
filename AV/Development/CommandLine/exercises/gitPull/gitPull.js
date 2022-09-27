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
        const newFile = getLocalHomeDir().find("new.txt");
        if (newFile) {
          awardCredit();
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git pull",
      commandDescription:
        "The git pull command pulls new commits to the local branch from the corresponding remote branch. The commit or commits contain the changes to the files that are applied to the local repository.",
      challengeDescription:
        "Pull the remote changes to the local repository. Then, run git status to check that the local branch is now up to date with the remote branch.",
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["cd src"],
    ["touch new.txt", "git add .", "git commit -m 'test'"]
  );
});
