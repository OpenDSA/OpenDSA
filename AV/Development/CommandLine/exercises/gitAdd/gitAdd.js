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
      if (args.length > 0 && args[0] === "add") {
        const src = getLocalHomeDir().findDeep("src");
        if (src) {
          const app = src.find("app.js");
          if (app && app.isState(GIT_STATE.ADDED)) {
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
      challengeDescription: 'Add "app.js" to the staging area.',
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["cd src", "touch app.js"]
  );
});
