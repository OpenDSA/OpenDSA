import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    awardCredit();
  };

  initializeCommandLineExercise(
    {
      commandTitle: "pwd",
      commandDescription:
        "As mentioned in the previous exercise, the pwd command prints the path of the current working directory. Notice how the path is different from the previous exercises.",
      challengeDescription: "Print the path of the current working directory.",
    },
    handleAwardCredit,
    "pwd",
    {
      name: "/",
      contents: [
        "snake.txt",
        "fish.txt",
        {
          name: "mammals",
          contents: [
            "mouse.txt",
            "bear.txt",
            {
              name: "dogs",
              contents: ["beagle.txt", "boxer.txt"],
            },
            {
              name: "horses",
              contents: ["cob.txt", "shire.txt"],
            },
          ],
        },
      ],
    },
    [2, 3]
  );
});
