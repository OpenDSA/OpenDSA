import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    if (getCurrDir().name === "/") {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "cd",
      commandDescription:
        "The cd command changes the current working directory to the root directory when no path is provided.",
      challengeDescription:
        "Change the current working directory to root directory.",
    },
    handleAwardCredit,
    "cd",
    null,
    [3, 3]
  );
});
