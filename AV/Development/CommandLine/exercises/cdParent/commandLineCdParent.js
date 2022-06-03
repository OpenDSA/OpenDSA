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
      commandTitle: "cd [path]",
      commandDescription:
        "Relative paths can be used with cd to change the current working directory to a parent directory.",
      challengeDescription:
        'Change the current working directory to "mammals".',
    },
    handleAwardCredit,
    "cd",
    null,
    [3, 3]
  );
});
