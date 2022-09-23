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
      if (args.length > 0 && args[0] === "status") {
        const src = getLocalHomeDir().findDeep("src");
        if (src) {
          const app = src.find("app.js");
          const test = src.findWithDeleted("test.js");
          const index = src.find("index.html");
          if (
            app &&
            app.isState(GIT_STATE.ADDED) &&
            test &&
            test.length > 0 &&
            test[0].isState(GIT_STATE.ADDED) &&
            index &&
            index.isState(GIT_STATE.ADDED)
          ) {
            awardCredit();
          }
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git add (path)",
      commandDescription:
        "The git add command adds the file or directory at the location specified by (path) to the staging area. Multiple (path) values can be provided to add multiple files or directories.",
      challengeDescription:
        "Add all the changed files to the staging area. Then, run git status to check that the files have been added to the staging area.",
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["cd src", "rm test.js", "vi index.html", "touch app.js"]
  );
});
