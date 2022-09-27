import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    awardCredit();
  };

  initializeCommandLineExercise(
    {
      commandTitle: "pwd",
      commandDescription:
        "As mentioned in the previous exercise, the pwd command prints the path of the current working directory. Notice how the path is different from the previous exercise.",
      challengeDescription: "Print the path of the current working directory.",
    },
    handleAwardCredit,
    "pwd",
    null,
    [3, 3]
  );
});
