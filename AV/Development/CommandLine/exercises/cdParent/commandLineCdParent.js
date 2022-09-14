import {
  initializeCommandLineExercise,
  awardCredit,
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
      commandTitle: "cd (directory_path)",
      commandDescription:
        "(directory_path) can be a relative path, which could be used to change the current working directory to a parent directory.",
      challengeDescription:
        'Change the current working directory to "mammals".',
    },
    handleAwardCredit,
    "cd",
    null,
    [3, 3]
  );
});
