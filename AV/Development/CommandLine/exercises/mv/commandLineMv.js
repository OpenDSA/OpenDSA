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
    child.insert(new File("beagle.txt"));
    child2.insert(new File("boxer.txt"));
    child2.insert(new File("poodle.txt"));

    return top;
  }

  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const dogsDir = getHomeDir().findDeep("dogs");
    const mammalsDir = getHomeDir().findDeep("mammals");
    if (
      dogsDir &&
      dogsDir.find("beagle.txt") &&
      mammalsDir &&
      !mammalsDir.find("monkey.txt")
    ) {
      awardCredit();
    }
  };

  const initialFileSystem = createInitialFileSystem();

  initializeCommandLineExercise(
    {
      commandTitle: "mv [src] [dst]",
      commandDescription:
        "The mv command moves a file or directory from the location specified by [src] to the location specified by [dst].",
      challengeDescription: 'Move "beagle.txt" to the "dogs" directory.',
    },
    initialFileSystem,
    initialFileSystem.contents[3],
    handleAwardCredit,
    "mv"
  );
});
