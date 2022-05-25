import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";
import { File, Directory } from "../../common/fileSystemEntity.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  const top = new Directory("/");

  top.insert(new File("bird.txt"));
  top.insert(new File("snake.txt"));
  top.insert(new File("fish.txt"));
  const child = new Directory("mammals");
  top.insert(child);
  child.insert(new File("monkey.txt"));
  child.insert(new File("mouse.txt"));
  child.insert(new File("bear.txt"));
  const child2 = new Directory("dogs");
  child.insert(child2);
  child2.insert(new File("beagle.txt"));
  child2.insert(new File("boxer.txt"));
  child2.insert(new File("poodle.txt"));

  function createInitialFileSystem() {
    const top = new Directory("/");
    return top;
  }

  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    if (top.compareByName(getHomeDir())) {
      awardCredit();
    }
  };

  const initialFileSystem = createInitialFileSystem();

  initializeCommandLineExercise(
    {
      commandTitle: "Create File Structure",
      commandDescription:
        "This challenge requires the usage of multiple commands.",
      challengeDescription:
        "Recreate the file structure from the previous exercise.",
    },
    initialFileSystem,
    initialFileSystem,
    handleAwardCredit,
    "touch"
  );
});
