import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const animalsDir = getHomeDir();
    const mammalsDir = getHomeDir().findDeep("mammals");
    if (
      animalsDir &&
      animalsDir.find("monkey.txt") &&
      mammalsDir &&
      mammalsDir.find("monkey.txt")
    ) {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "cp [src] [dst]",
      commandDescription:
        "The cp command copies a file or directory from the location specified by [src] to the location specified by [dst].",
      challengeDescription: 'Copy "monkey.txt" to the root directory.',
    },
    handleAwardCredit,
    "cp"
  );
});
