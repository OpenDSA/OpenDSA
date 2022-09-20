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
      if (args.length > 0 && args[0] === "push") {
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
      commandTitle: "git push",
      commandDescription:
        "The git push command pushes the local changes to remote.",
      challengeDescription:
        'Push the local changes to remote. Notice local contains a commit that does not exist on remote yet. This commit contains the changes to "index.html" and "app.js"',
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["cd src", "vi index.html app.js", "git add .", "git commit"]
  );
});
