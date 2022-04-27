import { createCommandsMap } from "./commandHandlers.js";
import { initializeCommandLine } from "./commandLine.js";
import { renderFileStructureVisualization } from "./fileStructure.js";

function initializeCommandLineExercise(
  text,
  initialFileSystem,
  handleAwardCredit,
  awardCreditCommand
) {
  // Load the config object with interpreter and code created by odsaUtils.js
  //   const config = ODSA.UTILS.loadConfig();
  updateText(text);

  const homeDir = initialFileSystem;

  let currDir = homeDir.contents[3];

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

  new ResizeObserver(() => {
    if (resizeCount === 1) {
      setTimeout(() => {
        //this is sloppy but I was having sizing issues
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
      }, 500);
    }
    // else if (resizeCount > 1) {
    //   updateTree();
    // }
    resizeCount++;
  }).observe(document.querySelector("#visualization-container"));

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
}

export { initializeCommandLineExercise, awardCredit };
