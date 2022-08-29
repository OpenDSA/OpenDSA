import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    if (getCurrDir().name === "dogs") {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "cd [path]",
      commandDescription:
        "The cd command changes the current working directory to the location specified by [path].",
      challengeDescription: 'Change the current working directory to "dogs".',
    },
    handleAwardCredit,
    "cd"
  );
});
