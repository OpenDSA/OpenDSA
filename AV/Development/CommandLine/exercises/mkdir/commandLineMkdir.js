import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const mammalsDir = getHomeDir().findDeep("mammals");
    if (mammalsDir && mammalsDir.find("cats")) {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "mkdir [path]",
      commandDescription:
        "The mkdir command creates a new directory with the name and location specified by [path].",
      challengeDescription:
        'Create a new directory named "cats" in the "mammals" directory.',
    },
    handleAwardCredit,
    "mkdir"
  );
});
