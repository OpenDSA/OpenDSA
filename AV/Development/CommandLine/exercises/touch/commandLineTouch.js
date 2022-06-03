import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const mammalsDir = getHomeDir().findDeep("mammals");
    if (mammalsDir && mammalsDir.find("lion.txt")) {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "touch [path]",
      commandDescription:
        "The touch command creates a new file with the name and location specified by [path].",
      challengeDescription:
        'Create a new file named "lion.txt" in the "mammals" directory.',
    },
    handleAwardCredit,
    "touch"
  );
});
