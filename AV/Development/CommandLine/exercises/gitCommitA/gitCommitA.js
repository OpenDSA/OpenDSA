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
        const gitignore = getLocalHomeDir().find(".gitignore");
        if (
          readme &&
          readme.isUnchanged() &&
          gitignore &&
          gitignore.isUnchanged()
        ) {
          const src = getLocalHomeDir().findDeep("src");
          if (src) {
            const app = src.find("app.js");
            const test = src.findWithDeleted("test.js");
            const index = src.find("index.html");
            if (
              app &&
              app.isUnchanged() &&
              test &&
              test.length === 0 &&
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
      commandTitle: "git commit [-a] -m (message)",
      commandDescription:
        "The git commit command with the -a flag adds all files, excluding untracked files, to the staging area before creating the commit.",
      challengeDescription:
        "Create a commit containing all the changes to all the files. Then, run git status to check that all changes have been committed.",
    },
    handleAwardCredit,
    "git",
    null,
    null,
    [
      "cd src",
      "vi index.html",
      "touch app.js",
      "git add .",
      "git rm config.js",
      "vi ../README ../.gitignore",
    ]
  );
});
