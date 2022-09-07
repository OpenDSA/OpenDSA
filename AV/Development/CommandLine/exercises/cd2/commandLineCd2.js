import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    if (getCurrDir().name === "cats") {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "cd (directory_path)",
      commandDescription:
        "The cd command changes the current working directory to the directory at the location specified by (directory_path).",
      challengeDescription: 'Change the current working directory to "cats".',
    },
    handleAwardCredit,
    "cd",
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
              name: "cats",
              contents: ["persian.txt", "bengal.txt", "sphynx.txt"],
            },
          ],
        },
      ],
    }
  );
});
