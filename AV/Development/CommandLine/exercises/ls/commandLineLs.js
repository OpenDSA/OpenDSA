import {
  awardCredit,
  initializeCommandLineExercise,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    if (getCurrDir().name === "mammals") {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "ls",
      commandDescription:
        "The ls command lists all files and directories in the current working directory.",
      challengeDescription:
        "List all files and directories in the current working directory.",
    },
    handleAwardCredit,
    "ls"
  );
});
