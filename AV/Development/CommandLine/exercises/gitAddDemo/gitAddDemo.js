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
        const readme = getLocalHomeDir().find("README");
        if (readme && readme.isStaged()) {
          awardCredit();
        }
      }
    };

  initializeGitExercise(
    {
      commandTitle: "git add (path)",
      commandDescription:
        "The git add command adds the file or directory at the location specified by (path) to the staging area. Multiple (path) values can be provided to add multiple files or directories.",
      challengeDescription:
        'Add "README" to the staging area. Then, run git status to check that the files have been added to the staging area.',
    },
    handleAwardCredit,
    "git",
    null,
    null,
    ["vi README"]
  );
});
