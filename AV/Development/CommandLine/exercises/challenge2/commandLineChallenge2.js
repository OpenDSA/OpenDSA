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
        catsDir.find("sphynx.txt") &&
        !getHomeDir().find("persian.txt") &&
        !getHomeDir().find("bengal.txt") &&
        !getHomeDir().find("sphynx.txt")
      ) {
        awardCredit();
      }
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "Challenge 2",
      commandDescription:
        "This challenge will require the usage of multiple commands. Tip: Multiple arguments can be passed to mv to move multiple files at once.",
      challengeDescription: `In the "mammals" directory, create a new directory named "cats". Then, move "persian.txt", "bengal.txt", and "sphynx.txt" to the "cats" directory.`,
    },
    handleAwardCredit,
    ["mv", "touch", "cp", "rm"],
    {
      name: "/",
      contents: [
        "bird.txt",
        "snake.txt",
        "fish.txt",
        {
          name: "mammals",
          contents: [
            "monkey.txt",
            "mouse.txt",
            "bear.txt",
            {
              name: "dogs",
              contents: ["beagle.txt", "boxer.txt", "poodle.txt"],
            },
          ],
        },
        "persian.txt",
        "bengal.txt",
        "sphynx.txt",
      ],
    }
  );
});
