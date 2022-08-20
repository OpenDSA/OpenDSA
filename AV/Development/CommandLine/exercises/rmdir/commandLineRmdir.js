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
            contents: [
              "beagle.txt",
              "boxer.txt",
              "poodle.txt",
              { name: "houses", contents: [] },
            ],
          },
        ],
      },
    ],
  };

  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const animalsDir = getHomeDir().findDeep("dogs");
    if (animalsDir && !animalsDir.find("houses")) {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "rmdir [path]",
      commandDescription:
        "The rmdir command removes an empty directory at the location specified by [path].",
      challengeDescription: 'Remove the "houses" directory.',
    },
    handleAwardCredit,
    "rmdir",
    initialFileStructure
  );
});
