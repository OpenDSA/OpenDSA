import { createCommandsMap } from "./commandHandlers.js";
import { initializeCommandLine } from "./commandLine.js";
import { renderFileStructureVisualization } from "./fileStructure.js";
import { Directory } from "./fileSystemEntity.js";
import { GIT_STATUSES } from "./gitStatuses.js";

const DEFAULT_FILE_STRUCTURE = {
  name: "/",
  contents: [
    "bird.txt",
    "snake.txt",
    "fish.txt",
    {
      name: "mammals",
      contents: [
        "monkey.txt",
        "mouse.txt",
        "bear.txt",
        {
          name: "dogs",
          contents: ["beagle.txt", "boxer.txt", "poodle.txt"],
        },
      ],
    },
  ],
};

const DEFAULT_CWD_INDEX_PATH = [3];

function initializeCommandLineExercise(
  text,
  handleAwardCredit,
  awardCreditCommand,
  initialFileStructure,
  initialCwdIndexPath
) {
  // Load the config object with interpreter and code created by odsaUtils.js
  //   const config = ODSA.UTILS.loadConfig();
  const config = ODSA.UTILS.loadConfig(),
    interpret = config.interpreter; // get the interpreter

  updateText(text);

  const homeDir = new Directory(
    initialFileStructure ? initialFileStructure : DEFAULT_FILE_STRUCTURE
  );

  let currDir = homeDir.followIndexPath(
    initialCwdIndexPath ? initialCwdIndexPath : DEFAULT_CWD_INDEX_PATH
  );

  homeDir.setStatusDeep(GIT_STATUSES.UNCHANGED);

  console.log("homedir", homeDir);

  let svgData;

  function getHomeDir() {
    return homeDir;
  }

  function getCurrDir() {
    return currDir;
  }

  function setCurrDir(dir) {
    currDir = dir;
  }

  function getSvgData() {
    return svgData;
  }

  const commandsMap = createCommandsMap(
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir
  );

  let resizeCount = 0;

  // new ResizeObserver(() => {
  //   if (resizeCount === 1) {
  setTimeout(() => {
    const id = "#visualization-container";
    const visualizationWidth = $(id).width();
    const visualizationHeight = $(id).height();
    const d3Data = homeDir.mapToD3();
    svgData = renderFileStructureVisualization(
      d3Data,
      currDir.id,
      visualizationWidth,
      visualizationHeight,
      id
    );
    //this is sloppy but I was having sizing issues
  }, 500);
  // }
  // else if (resizeCount > 1) {
  //   updateTree();
  // }
  resizeCount++;
  // }).observe(document.querySelector("#visualization-container"));

  const awardCreditHandler = {};
  awardCreditHandler[awardCreditCommand] = handleAwardCredit(
    getCurrDir,
    getHomeDir
  );

  initializeCommandLine(
    "#arrayValues",
    "#history",
    commandsMap,
    awardCreditHandler
  );
}

function updateText(text) {
  $("#command-title").text(text.commandTitle);
  $("#command-description").text(text.commandDescription);
  $("#challenge-description").text(text.challengeDescription);
}

function awardCredit() {
  $("#success-message").removeClass("hidden").addClass("visible");
  ODSA.AV.awardCompletionCredit();
}

export { initializeCommandLineExercise, awardCredit };
