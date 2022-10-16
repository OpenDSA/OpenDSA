import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    if (getCurrDir().name === "owls") {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "cd (directory_path)",
      commandDescription:
        "(directory_path) can be more complex to change the current working directory to a directory that is not a direct parent or subdirectory.",
      challengeDescription: 'Change the current working directory to "owls".',
    },
    handleAwardCredit,
    "cd",
    {
      name: "/",
      contents: [
        "fish.txt",
        {
          name: "mammals",
          contents: [
            "bear.txt",
            {
              name: "dogs",
              contents: ["boxer.txt", "poodle.txt"],
            },
          ],
        },
        {
          name: "birds",
          contents: [
            "chicken.txt",
            {
              name: "owls",
              contents: ["snowy.txt", "horned.txt"],
            },
          ],
        },
      ],
    },
    [1]
  );
});
