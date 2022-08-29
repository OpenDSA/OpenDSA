import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";
import { Directory } from "../../common/fileSystemEntity.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const goalDir = new Directory({
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
    ],
  });

  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    if (goalDir.compareByNameUnordered(getHomeDir())) {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "Create File Structure",
      commandDescription:
        "This challenge requires the usage of multiple commands.",
      challengeDescription:
        "Recreate the file structure from the previous exercise.",
    },
    handleAwardCredit,
    "touch",
    { name: "/", contents: [] },
    []
  );
});
