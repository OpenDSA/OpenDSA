import {
  awardCredit,
  initializeCommandLineExercise,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const mammalsDir = getHomeDir().findDeep("mammals");
    if (mammalsDir) {
      const catsDir = mammalsDir.find("cats");
      if (
        catsDir &&
        catsDir.find("persian.txt") &&
        catsDir.find("bengal.txt") &&
        catsDir.find("sphynx.txt")
      ) {
        awardCredit();
      }
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "Challenge 1",
      commandDescription:
        "This challenge requires the usage of multiple commands. Tip: Multiple arguments can be passed to touch to create multiple files at once.",
      challengeDescription: `In the "mammals" directory, create a new directory named "cats" that contains files named "persian.txt", "bengal.txt", and "sphynx.txt".`,
    },
    handleAwardCredit,
    "touch"
  );
});
