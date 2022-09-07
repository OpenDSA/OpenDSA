import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    if (getCurrDir().name === "carp") {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "cd (directory_path)",
      commandDescription:
        "(directory_path) can contain multiple directories to change the current working directory to a directory that is not a direct parent or descendant.",
      challengeDescription: 'Change the current working directory to "carp".',
    },
    handleAwardCredit,
    "cd",
    {
      name: "/",
      contents: [
        "birds.txt",
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
          name: "fish",
          contents: [
            "tilapia.txt",
            {
              name: "carp",
              contents: ["bighead.txt", "grass.txt"],
            },
          ],
        },
      ],
    },
    [1]
  );
});
