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
      commandTitle: "ls (directory_path)",
      commandDescription:
        "The ls command lists all files and directories in the current working directory if (directory_path) is not provided. Otherwise, the ls command lists all files and directories in the directory at the location specified by (directory_path).",
      challengeDescription:
        "List all files and directories in the current working directory.",
    },
    handleAwardCredit,
    "ls"
  );
});
