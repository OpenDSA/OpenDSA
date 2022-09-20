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
      if (args.length > 0 && args[0] === "pull") {
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
      commandTitle: "git pull",
      commandDescription:
        "The git pull command pulls the remote changes down to local.",
      challengeDescription:
        "Pull the local changes from remote. Notice remote contains a commit that does not exist on local yet.",
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["cd src"],
    ["touch new.txt", "vi README", "git add .", "git commit"]
  );
});
