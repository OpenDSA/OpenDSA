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
      if ((args.length > 0 && args[0] === "switch") || args[0] === "checkout") {
        if (getLocalCurrBranch().name === "develop") {
          awardCredit();
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git switch (branch_name)",
      commandDescription:
        "Branches can diverge and store different versions of the file structure.",
      challengeDescription:
        'Change the current branch to the "develop" branch. Notice how the file structure is different between the "develop" branch and the "main" branch.',
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
      "git switch develop",
      "rm config.js",
      "touch dev.txt",
      "git add .",
      "git commit -m 'test'",
      "git switch main",
      "rm app.js",
      "git add .",
      "git commit -m 'test'",
    ]
  );
});
