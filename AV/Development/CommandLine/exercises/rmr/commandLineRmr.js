import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const mammalsDir = getHomeDir().findDeep("mammals");
    if (mammalsDir && !mammalsDir.find("dogs")) {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "rm [-r] (path)",
      commandDescription:
        "The rm command with the -r flag removes the file or directory at the location specified by (path). Multiple (path) values can be provided to remove multiple files or directories.",
      challengeDescription: 'Remove the "dogs" directory.',
    },
    handleAwardCredit,
    "rm"
  );
});
