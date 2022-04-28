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
    child2.insert(new Directory("houses"));

    return top;
  }

  const handleAwardCredit = (getCurrDir, getHomeDir) => () => {
    const animalsDir = getHomeDir().findDeep("dogs");
    if (animalsDir && !animalsDir.find("houses")) {
      awardCredit();
    }
  };

  const initialFileSystem = createInitialFileSystem();

  initializeCommandLineExercise(
    {
      commandTitle: "rmdir [path]",
      commandDescription:
        "The rmdir command removes an empty directory at the location specified by [path].",
      challengeDescription: 'Remove the "houses" directory.',
    },
    initialFileSystem,
    initialFileSystem.contents[3],
    handleAwardCredit,
    "rmdir"
  );
});
