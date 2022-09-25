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
          const app = src.find("app.js");
          const test = src.findWithDeleted("test.js");
          const index = src.find("index.html");
          if (
            app &&
            app.isChangedInWorkingArea() &&
            test &&
            test.length > 0 &&
            test[0].isChangedInWorkingArea() &&
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
    ["cd src", "rm test.js", "vi index.html", "touch app.js", "git add ."]
  );
});
