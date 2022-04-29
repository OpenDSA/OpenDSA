import {
  initializeCommandLineExercise,
  awardCredit,
} from "../../common/commandLineExercise.js";
import { File, Directory } from "../../common/fileSystemEntity.js";

/*global alert: true, ODSA, console */
$(document).ready(function () {
  function createInitialFileSystem() {
    const top = new Directory("animals");

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

    return top;
  }

  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const mammalsDir = getHomeDir().findDeep("mammals");
    if (mammalsDir && mammalsDir.find("lion.txt")) {
      awardCredit();
    }
  };

  const initialFileSystem = createInitialFileSystem();

  initializeCommandLineExercise(
    {
      commandTitle: "touch [path]",
      commandDescription:
        "The touch command creates a new file with the name and location specified by [path].",
      challengeDescription:
        'Create a new file named "lion.txt" in the "mammals" directory.',
    },
    initialFileSystem,
    initialFileSystem.contents[3],
    handleAwardCredit,
    "touch"
  );
});
