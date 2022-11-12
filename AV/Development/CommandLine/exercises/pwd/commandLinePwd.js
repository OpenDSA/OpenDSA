import { initializeExercise } from "../../common/helpers/command-line-exercise-initializer.js";

$(document).ready(function () {
  initializeExercise({
    title: "pwd",
    description:
      "The pwd command prints the path of the current working directory.",
    task: "Print the path of the current working directory.",
    checkCompleted: (args, state) => {
      return args.length > 0 && args[0] === "pwd";
    },
  });
});
