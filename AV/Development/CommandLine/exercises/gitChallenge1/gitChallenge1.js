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
        const src = getRemoteHomeDir().findDeep("src");
        if (src && src.find("test.js") && !src.find("app.js")) {
          awardCredit();
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "Challenge 1",
      commandDescription:
        "This challenge will require the usage of multiple commands.",
      challengeDescription:
        'Remove "app.js" and create a new file named "test.js" in "src". Then, update remote with these changes.',
    },
    handleAwardCredit,
    "git",
    null,
    null,
    []
  );
});
