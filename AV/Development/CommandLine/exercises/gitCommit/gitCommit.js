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
      if (args.length > 0 && args[0] === "commit") {
        const src = getLocalHomeDir().findDeep("src");
        if (src) {
          const app = src.find("app.js");
          if (app && app.isState(GIT_STATE.COMMITTED)) {
            awardCredit();
          }
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git commit",
      commandDescription:
        "The git commit command creates a commit containing all the staged changes.",
      challengeDescription:
        "Create a commit containing all the staged changes.",
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["cd src", "touch app.js", "git add ."]
  );
});
