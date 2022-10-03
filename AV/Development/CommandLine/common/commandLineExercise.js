import { createCommandsMap } from "./commandHandlers.js";
import { CommandHistory } from "./commandHistory.js";
import { callCommand, initializeCommandLine } from "./commandLine.js";
import {
  renderFileStructureVisualization,
  renderGitVisualization,
  updateFileStructureVisualization,
  updateGitVisualization,
} from "./fileStructure.js";
import { Directory } from "./fileSystemEntity.js";
import { Branch, Commit } from "./gitClasses.js";
import { NEW_FILE_STATE } from "./gitStatuses.js";
import { RESET_FILE_TREE_OFFSETS, RESET_OFFSETS } from "./timings.js";

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

const DEFAULT_GIT_FILE_STRUCTURE = {
  name: "/",
  contents: [
    "README",
    ".gitignore",
    {
      name: "src",
      contents: ["index.html", "config.js"],
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

  let homeDir;
  let currDir;
  let svgData;

  function getHomeDir() {
    return homeDir;
  }

  function setHomeDir(dir) {
    homeDir = dir;
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

  initializeCommandLineState(
    initialFileStructure,
    initialCwdIndexPath,
    setHomeDir,
    setCurrDir
  );

  const commandsMap = createCommandsMap(
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateFileStructureVisualization
  );

  //delay render because of sizing issues
  setTimeout(() => {
    const id = "#visualization-container";
    const visualizationWidth = $(id).width();
    const visualizationHeight = $(id).height();
    svgData = renderFileStructureVisualization(
      homeDir,
      currDir,
      visualizationWidth,
      visualizationHeight,
      id
    );
  }, 500);

  const awardCreditHandler = {};
  if (Array.isArray(awardCreditCommand)) {
    awardCreditCommand.forEach((command) => {
      awardCreditHandler[command] = handleAwardCredit(getCurrDir, getHomeDir);
    });
  } else {
    awardCreditHandler[awardCreditCommand] = handleAwardCredit(
      getCurrDir,
      getHomeDir
    );
  }

  const commandHistory = new CommandHistory();

  const resetState = () => {
    initializeCommandLineState(
      initialFileStructure,
      initialCwdIndexPath,
      setHomeDir,
      setCurrDir
    );
    updateFileStructureVisualization(
      svgData,
      homeDir,
      currDir,
      RESET_FILE_TREE_OFFSETS
    );
    emptyHistory();
  };

  initializeCommandLine(
    "#arrayValues",
    "#history",
    commandsMap,
    awardCreditHandler,
    ["git", "vi"],
    getCurrDir,
    commandHistory,
    resetState
  );
}

const initializeCommandLineState = (
  initialFileStructure,
  initialCwdIndexPath,
  setHomeDir,
  setCurrDir
) => {
  const homeDir = new Directory(
    initialFileStructure ? initialFileStructure : DEFAULT_FILE_STRUCTURE
  );

  setHomeDir(homeDir);

  const currDir = homeDir.followIndexPath(
    initialCwdIndexPath ? initialCwdIndexPath : DEFAULT_CWD_INDEX_PATH
  );

  setCurrDir(currDir);

  updateCommandLinePrompt(currDir);
};

function initializeGitExercise(
  text,
  handleAwardCredit,
  awardCreditCommand,
  initialFileStructure,
  initialCwdIndexPath,
  initialCommands,
  initialRemoteCommands,
  emptyLocal,
  disableAllCommandsExcept
) {
  // Load the config object with interpreter and code created by odsaUtils.js
  //   const config = ODSA.UTILS.loadConfig();
  const config = ODSA.UTILS.loadConfig(),
    interpret = config.interpreter; // get the interpreter

  updateText(text);

  let localHomeDir;
  let localCurrDir;
  let remoteHomeDir;
  let localInitialCommit;
  let localCurrBranch;
  let remoteInitialCommit;
  let remoteCurrBranch;
  let svgData;

  function getLocalHomeDir() {
    return localHomeDir;
  }

  function setLocalHomeDir(dir) {
    localHomeDir = dir;
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

  function setRemoteHomeDir(dir) {
    remoteHomeDir = dir;
  }

  function getLocalInitialCommit() {
    return localInitialCommit;
  }

  function setLocalInitialCommit(commit) {
    localInitialCommit = commit;
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

  function setRemoteInitialCommit(commit) {
    remoteInitialCommit = commit;
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

  const gitMethods = {
    getRemoteHomeDir,
    getLocalInitialCommit,
    getLocalCurrBranch,
    setLocalCurrBranch,
    getRemoteInitialCommit,
    getRemoteCurrBranch,
    setRemoteCurrBranch,
    setLocalInitialCommit,
    setLocalHomeDir,
  };

  const commandsMap = createCommandsMap(
    getSvgData,
    getLocalCurrDir,
    setLocalCurrDir,
    getLocalHomeDir,
    updateGitVisualization,
    //TODO decouple this later
    gitMethods
  );

  initializeGitState(
    initialFileStructure,
    setLocalHomeDir,
    setLocalCurrDir,
    setRemoteHomeDir,
    setLocalInitialCommit,
    setLocalCurrBranch,
    setRemoteInitialCommit,
    setRemoteCurrBranch,
    emptyLocal,
    initialCommands,
    initialRemoteCommands,
    commandsMap,
    getRemoteInitialCommit,
    getRemoteCurrBranch,
    getLocalCurrDir,
    getLocalCurrBranch
  );

  //Fix timing issue for rendering visualization size
  setTimeout(() => {
    const id = "#visualization-container";
    const visualizationWidth = $(id).width();
    const visualizationHeight = $(id).height();
    svgData = renderGitVisualization(
      getLocalHomeDir(),
      getLocalCurrDir(),
      gitMethods,
      visualizationWidth,
      visualizationHeight,
      id
    );
  }, 500);

  const awardCreditHandler = {};
  awardCreditHandler[awardCreditCommand] = handleAwardCredit(
    getLocalCurrDir,
    getLocalHomeDir,
    getLocalInitialCommit,
    getLocalCurrBranch,
    getRemoteHomeDir,
    getRemoteInitialCommit,
    getRemoteCurrBranch
  );

  const commandHistory = new CommandHistory();

  const resetState = () => {
    initializeGitState(
      initialFileStructure,
      setLocalHomeDir,
      setLocalCurrDir,
      setRemoteHomeDir,
      setLocalInitialCommit,
      setLocalCurrBranch,
      setRemoteInitialCommit,
      setRemoteCurrBranch,
      emptyLocal,
      initialCommands,
      initialRemoteCommands,
      commandsMap,
      getRemoteInitialCommit,
      getRemoteCurrBranch,
      getLocalCurrDir,
      getLocalCurrBranch
    );
    updateGitVisualization(
      svgData,
      localHomeDir,
      localCurrDir,
      RESET_OFFSETS,
      gitMethods
    );
    emptyHistory();
  };

  initializeCommandLine(
    "#arrayValues",
    "#history",
    commandsMap,
    awardCreditHandler,
    [],
    getLocalCurrDir,
    commandHistory,
    resetState,
    disableAllCommandsExcept,
    getLocalCurrBranch
  );
}

const initializeGitState = (
  initialFileStructure,
  setLocalHomeDir,
  setLocalCurrDir,
  setRemoteHomeDir,
  setLocalInitialCommit,
  setLocalCurrBranch,
  setRemoteInitialCommit,
  setRemoteCurrBranch,
  emptyLocal,
  initialCommands,
  initialRemoteCommands,
  commandsMap,
  getRemoteInitialCommit,
  getRemoteCurrBranch,
  getLocalCurrDir,
  getLocalCurrBranch
) => {
  const localHomeDir = new Directory(
    initialFileStructure ? initialFileStructure : DEFAULT_GIT_FILE_STRUCTURE
  );

  setLocalHomeDir(localHomeDir);
  setLocalCurrDir(localHomeDir);

  const remoteHomeDir = localHomeDir.copyWithGitId();

  setRemoteHomeDir(remoteHomeDir);

  const localInitialCommit = new Commit();
  const localCurrBranch = new Branch("main");
  localInitialCommit.insertBranch(localCurrBranch);

  setLocalInitialCommit(localInitialCommit);
  setLocalCurrBranch(localCurrBranch);

  const remoteInitialCommit = localInitialCommit.copy();
  const remoteCurrBranch = remoteInitialCommit.branches[0];

  setRemoteInitialCommit(remoteInitialCommit);
  setRemoteCurrBranch(remoteCurrBranch);

  localHomeDir.setState(NEW_FILE_STATE.UNCHANGED, NEW_FILE_STATE.UNCHANGED);
  remoteHomeDir.setState(NEW_FILE_STATE.UNCHANGED, NEW_FILE_STATE.UNCHANGED);

  if (emptyLocal) {
    setLocalHomeDir(null);
    setLocalCurrDir(null);
    setLocalCurrBranch(null);
    setLocalInitialCommit(null);
  }

  if (initialCommands) {
    initialCommands.forEach((command) => {
      callCommand(command, commandsMap, {}, [], true);
    });
  }

  if (initialRemoteCommands && initialRemoteCommands.length > 0) {
    const remoteCommandsMap = createCommandsMap(
      null,
      () => remoteHomeDir,
      () => {},
      () => remoteHomeDir,
      null,
      {
        getLocalInitialCommit: getRemoteInitialCommit,
        getLocalCurrBranch: getRemoteCurrBranch,
        setLocalCurrBranch: setRemoteCurrBranch,
      }
    );

    initialRemoteCommands.forEach((command) => {
      callCommand(command, remoteCommandsMap, {}, [], true);
    });
  }

  updateCommandLinePrompt(getLocalCurrDir(), getLocalCurrBranch());
};

function updateText(text) {
  $("#command-title").text(text.commandTitle);
  $("#command-description").text(text.commandDescription);
  $("#challenge-description").text(text.challengeDescription);
}

function awardCredit() {
  $("#success-message").removeClass("hidden").addClass("visible");
  ODSA.AV.awardCompletionCredit();
  removeResetButton();
}

function updateCommandLinePrompt(currDir, currBranch) {
  $(".command-line-prompt-path").text(currDir ? currDir.getPath() : "/");
  $(".command-line-prompt-branch").text(
    currBranch ? `(${currBranch.name})` : ""
  );
}

function emptyHistory() {
  $("#history").empty();
}

function removeResetButton() {
  $("#reset-button").remove();
}

export {
  initializeCommandLineExercise,
  initializeGitExercise,
  awardCredit,
  updateCommandLinePrompt,
};
