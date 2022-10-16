import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const animalsDir = getHomeDir();
    const mammalsDir = getHomeDir().findDeep("mammals");
    if (
      animalsDir &&
      animalsDir.find("monkey.txt") &&
      mammalsDir &&
      mammalsDir.find("monkey.txt")
    ) {
      awardCredit();
    }
  };

  initializeCommandLineExercise(
    {
      commandTitle: "cp [-r] (src_path) (dst_path)",
      commandDescription:
        "The cp command copies a file or directory from the location specified by (src_path) to the file or directory specified by (dst_path). Include [-r] to copy directories.",
      challengeDescription: 'Copy "monkey.txt" to the root directory.',
    },
    handleAwardCredit,
    "cp"
  );
});
