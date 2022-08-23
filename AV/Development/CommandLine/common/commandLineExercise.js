import { createCommandsMap } from "./commandHandlers.js";
import { initializeCommandLine } from "./commandLine.js";
import { renderFileStructureVisualization } from "./fileStructure.js";
import { Directory } from "./fileSystemEntity.js";
import { Branch, Commit } from "./gitClasses.js";

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

  homeDir.setTracked(true);

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

function initializeGitExercise(
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

  const localHomeDir = new Directory(DEFAULT_FILE_STRUCTURE);
  let localCurrDir = localHomeDir.followIndexPath(DEFAULT_CWD_INDEX_PATH);

  const remoteHomeDir = localHomeDir.copyWithGitId();

  const localInitialCommit = new Commit();
  let localCurrBranch = new Branch("main");
  localInitialCommit.insertBranch(localCurrBranch);

  const remoteInitialCommit = localInitialCommit.copy();
  let remoteCurrBranch = remoteInitialCommit.branches[0];

  localHomeDir.setTracked(true);
  remoteHomeDir.setTracked(true);

  let svgData;

  function getLocalHomeDir() {
    return localHomeDir;
  }

  function getLocalCurrDir() {
    return localCurrDir;
  }

  function setLocalCurrDir(dir) {
    localCurrDir = dir;
  }

  function getRemoteHomeDir() {
    return remoteHomeDir;
  }

  function getLocalInitialCommit() {
    return localInitialCommit;
  }

  function getLocalCurrBranch() {
    return localCurrBranch;
  }

  function setLocalCurrBranch(branch) {
    localCurrBranch = branch;
  }

  function getRemoteInitialCommit() {
    return remoteInitialCommit;
  }

  function getRemoteCurrBranch() {
    return remoteCurrBranch;
  }

  function setRemoteCurrBranch(branch) {
    remoteCurrBranch = branch;
  }

  function getSvgData() {
    return svgData;
  }

  const commandsMap = createCommandsMap(
    getSvgData,
    getLocalCurrDir,
    setLocalCurrDir,
    getLocalHomeDir,
    //TODO decouple this later
    {
      getRemoteHomeDir,
      getLocalInitialCommit,
      getLocalCurrBranch,
      setLocalCurrBranch,
      getRemoteInitialCommit,
      getRemoteCurrBranch,
      setRemoteCurrBranch,
    }
  );

  let resizeCount = 0;

  // new ResizeObserver(() => {
  //   if (resizeCount === 1) {
  setTimeout(() => {
    const id = "#visualization-container";
    const visualizationWidth = $(id).width();
    const visualizationHeight = $(id).height();
    const d3Data = localHomeDir.mapToD3();
    svgData = renderFileStructureVisualization(
      d3Data,
      localCurrDir.id,
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
    getLocalCurrDir,
    getLocalHomeDir
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

export { initializeCommandLineExercise, initializeGitExercise, awardCredit };
