import {
  awardCredit,
  initializeGitExercise,
} from "../../common/commandLineExercise.js";
import { NEW_FILE_STATE } from "../../common/gitStatuses.js";

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
          const config = src.findWithDeleted("config.js");
          if (
            config &&
            config.length > 0 &&
            config[0].isStagingState(NEW_FILE_STATE.DELETED)
          ) {
            awardCredit();
          }
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git rm [-r] (path)",
      commandDescription:
        "The git rm command removes the file or directory at the location specified by (path) and add the file to the staging area. Multiple (path) values can be provided to remove multiple files or directories.",
      challengeDescription:
        'Remove "config.js" and add it to the staging area. Then, run git status to check that the files have been added to the staging area.',
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["cd src", "vi index.html", "touch app.js", "git add ."]
  );
});
