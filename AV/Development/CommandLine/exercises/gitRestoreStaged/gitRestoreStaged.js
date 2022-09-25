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
        const src = getLocalHomeDir().findDeep("src");
        if (src) {
          const config = src.find("config.js");
          const app = src.findWithDeleted("app.js");
          const index = src.find("index.html");
          if (
            config &&
            config.isChangedInWorkingArea() &&
            app &&
            app.length > 0 &&
            app[0].isChangedInWorkingArea() &&
            index &&
            index.isChangedInWorkingArea()
          ) {
            awardCredit();
          }
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git restore [--staged] (path)",
      commandDescription:
        "The git restore command with the --staged flag moves the file or directory at the location specified by (path) from the staging area to the working area.",
      challengeDescription:
        "Restore all the staged files. Then, run git status to check that the files are no longer staged.",
    },
    handleAwardCredit,
    "git",
    null,
    null,
    [
      "cd src",
      "vi index.html",
      "touch app.js",
      "git add .",
      "git rm config.js",
      'git commit -m "test"',
      "git push",
      "vi index.html",
      "rm app.js",
      "touch config.js",
      "git add .",
    ]
  );
});
