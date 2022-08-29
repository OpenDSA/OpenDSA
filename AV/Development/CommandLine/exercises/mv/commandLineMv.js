import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const initialFileStructure = {
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
            contents: ["boxer.txt", "poodle.txt"],
          },
          "beagle.txt",
        ],
      },
    ],
  };

  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const dogsDir = getHomeDir().findDeep("dogs");
    const mammalsDir = getHomeDir().findDeep("mammals");
    if (
      dogsDir &&
      dogsDir.find("beagle.txt") &&
      mammalsDir &&
      !mammalsDir.find("beagle.txt")
    ) {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "mv [src] [dst]",
      commandDescription:
        "The mv command moves a file or directory from the location specified by [src] to the location specified by [dst].",
      challengeDescription: 'Move "beagle.txt" to the "dogs" directory.',
    },
    handleAwardCredit,
    "mv",
    initialFileStructure
  );
});
