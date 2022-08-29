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
        "The pwd command prints the path of the current working directory.",
      challengeDescription: "Print the path of the current working directory.",
    },
    handleAwardCredit,
    "pwd"
  );
});
