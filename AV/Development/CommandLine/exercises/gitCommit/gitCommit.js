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
        if (getLocalInitialCommit().children.length > 0) {
          const src = getLocalHomeDir().findDeep("src");
          if (src) {
            const app = src.find("app.js");
            const config = src.findWithDeleted("config.js");
            const index = src.find("index.html");
            if (
              app &&
              app.isUnchanged() &&
              config &&
              config.length === 0 &&
              index &&
              index.isUnchanged()
            ) {
              awardCredit();
            }
          }
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git commit -m (message)",
      commandDescription:
        "The git commit command creates a commit containing the changes in the staging area. The -m flag is required and must be followed by a nonempty (message).",
      challengeDescription:
        "Create a commit containing all the changes in the staging area. Then, run git status to check that the local branch is now one commit ahead of the remote branch.",
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["cd src", "vi index.html", "touch app.js", "git add .", "git rm config.js"]
  );
});
