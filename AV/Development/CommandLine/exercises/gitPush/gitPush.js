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
        const src = getRemoteHomeDir().findDeep("src");
        if (src) {
          const app = src.find("app.js");
          if (app) {
            awardCredit();
          }
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git push",
      commandDescription:
        "The git push command pushes new commits from the local branch to the corresponding remote branch. The commit or commits contain the changes to the files that are applied to the remote repository.",
      challengeDescription:
        "Push the local changes to the remote repository. Then, run git status to check that the remote branch is now up to date with the local branch.",
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
    ]
  );
});
