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
      commandTitle: "mkdir (directory_path)",
      commandDescription:
        "The mkdir command creates a new directory with the name and location specified by (directory_path). Multiple (directory_path) values can be provided to create multiple directories.",
      challengeDescription:
        'Create a new directory named "cats" in the "mammals" directory.',
    },
    handleAwardCredit,
    "mkdir"
  );
});
