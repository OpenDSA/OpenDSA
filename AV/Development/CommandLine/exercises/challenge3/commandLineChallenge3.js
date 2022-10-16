import {
  awardCredit,
  initializeCommandLineExercise,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const mammalsDir = getHomeDir().findDeep("mammals");
    if (mammalsDir) {
      const dogsDir = mammalsDir.find("dogs");
      const dogsDirCopy = getHomeDir().find("dogs");
      if (
        dogsDir &&
        dogsDirCopy &&
        dogsDir.find("beagle.txt") &&
        dogsDir.find("boxer.txt") &&
        dogsDir.find("poodle.txt") &&
        dogsDir.find("husky.txt") &&
        dogsDirCopy.find("beagle.txt") &&
        dogsDirCopy.find("boxer.txt") &&
        !dogsDirCopy.find("poodle.txt") &&
        !dogsDirCopy.find("husky.txt")
      ) {
        awardCredit();
      }
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "Challenge 3",
      commandDescription:
        "This challenge will require the usage of multiple commands. Remember, multiple (path) values can be passed to rm to remove multiple files at once.",
      challengeDescription: `Copy the "dogs" directory to the root directory. Then, remove "poodle.txt" and "husky.txt" from the copy. The original "dogs" directory should not be changed.`,
    },
    handleAwardCredit,
    ["mv", "touch", "cp", "rm"],
    {
      name: "/",
      contents: [
        "bird.txt",
        {
          name: "mammals",
          contents: [
            "mouse.txt",
            "bear.txt",
            {
              name: "dogs",
              contents: ["beagle.txt", "boxer.txt", "poodle.txt", "husky.txt"],
            },
          ],
        },
        "snake.txt",
      ],
    },
    [1]
  );
});
