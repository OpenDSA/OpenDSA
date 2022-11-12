import { initializeCommandLineExercise } from "../../common/helpers/command-line-exercise-initializer.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  // const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
  //   awardCredit();
  // };

  initializeCommandLineExercise(
    "pwd",
    "The pwd command prints the path of the current working directory.",
    "Print the path of the current working directory.",
    (args, state) => {
      return args.length > 0 && args[0] === "pwd";
    }
  );
});
