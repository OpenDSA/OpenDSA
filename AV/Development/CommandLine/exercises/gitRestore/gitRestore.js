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
      if (args.length > 0 && args[0] === "restore") {
        const src = getLocalHomeDir().findDeep("src");
        if (src) {
          const index = src.find("index.html");
          const app = src.find("app.js");
          if (
            index &&
            app &&
            index.isState(GIT_STATE.COMMITTED) &&
            app.isState(GIT_STATE.COMMITTED)
          ) {
            awardCredit();
          }
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git restore (path)",
      commandDescription:
        "The git restore command undos the changes made to file or directory at the location specified by (path) to the staging area. Multiple (path) values can be provided to restore multiple files or directories.",
      challengeDescription: "Restore the change to index.html.",
    },
    handleAwardCredit,
    "git",
    null,
    null,
    [
      "cd src",
      "touch app.js",
      "git add .",
      "git commit",
      "git push",
      "vi index.html",
    ]
  );
});
