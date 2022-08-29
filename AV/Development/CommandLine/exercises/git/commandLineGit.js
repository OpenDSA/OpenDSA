import {
  initializeCommandLineExercise,
  awardCredit,
  initializeGitExercise,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    if (getCurrDir().name === "dogs") {
      awardCredit();
    }
  };

  initializeGitExercise(
    {
      commandTitle: "Git",
      commandDescription: "Testing things",
      challengeDescription: "Test Git",
    },
    handleAwardCredit,
    "cd"
  );
});
