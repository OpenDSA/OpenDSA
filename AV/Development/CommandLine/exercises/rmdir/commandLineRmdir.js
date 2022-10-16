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
      commandTitle: "rmdir (directory_path)",
      commandDescription:
        "The rmdir command removes the directory at the location specified by (directory_path) if the directory is empty. Multiple (directory_path) values can be provided to remove muliple directories.",
      challengeDescription: 'Remove the "houses" directory.',
    },
    handleAwardCredit,
    ["rmdir", "rm"],
    initialFileStructure,
    [3, 3]
  );
});
