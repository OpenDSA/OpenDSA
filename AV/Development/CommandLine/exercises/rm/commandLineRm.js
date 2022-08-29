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
      "fish.txt",
      {
        name: "mammals",
        contents: [
          "monkey.txt",
          "snake.txt",
          "mouse.txt",
          "bear.txt",
          {
            name: "dogs",
            contents: ["beagle.txt", "boxer.txt", "poodle.txt"],
          },
        ],
      },
    ],
  };

  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const mammalsDir = getHomeDir().findDeep("mammals");
    if (mammalsDir && !mammalsDir.find("snake.txt")) {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "rm [path]",
      commandDescription:
        "The rm command removes the file at the location defined by [path].",
      challengeDescription: 'Remove the "snake.txt" file.',
    },
    handleAwardCredit,
    "rm",
    initialFileStructure,
    [2]
  );
});
