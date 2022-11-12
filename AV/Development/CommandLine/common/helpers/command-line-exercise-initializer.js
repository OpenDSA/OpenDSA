import { CommandLineExerciseState } from "./exercise-state.js";
import { handleKeydown, handleKeyup } from "./command-line.js";
import { COMMANDS_MAP } from "./command-handlers.js";
import { updateFileStructureVisualization } from "./file-structure.js";
import { CommandHistory } from "./command-history.js";
import {
  INITIALIZE_FILE_TREE_OFFSETS,
  RESET_FILE_TREE_OFFSETS,
} from "./timings.js";
import {
  createHistoryLineHTMLString,
  createPromptHTMLString,
} from "./html-string-components.js";

function initializeCommandLineExercise(
  title,
  description,
  task,
  checkCompleted,
  initialFileStructure,
  initialCwdIndexPath
) {
  // Load the config object with interpreter and code created by odsaUtils.js
  //   const config = ODSA.UTILS.loadConfig();
  const config = ODSA.UTILS.loadConfig(),
    interpret = config.interpreter; // get the interpreter

  updateText(title, description, task);

  const state = new CommandLineExerciseState(
    initialFileStructure,
    initialCwdIndexPath
  );

  const commandHistory = new CommandHistory();
  let svgData;

  const awardCredit = (args) => {
    if (checkCompleted(args, state)) {
      $("#progress-indicator").text("Completed");
      $("#progress-indicator").removeClass("in-progress").addClass("completed");
      ODSA.AV.awardCompletionCredit();
    }
  };

  const updateVisualization = (offsets, extraVisualizations) =>
    updateFileStructureVisualization(
      svgData,
      state,
      offsets,
      extraVisualizations
    );

  const handleKeydownWrapper = (event) => {
    handleKeydown(
      event,
      getInput(),
      setInput,
      state,
      COMMANDS_MAP,
      updateVisualization,
      awardCredit,
      addHistory,
      commandHistory
    );
  };

  const handleKeyupWrapper = (event) => {
    handleKeyup(event, getInput(), commandHistory);
  };

  const handleReset = () => {
    state.reset();
    updateVisualization(RESET_FILE_TREE_OFFSETS);
    clearHistory();
    commandHistory.reset();
    setInput("");
    focusInput();
  };

  $("#prompt-and-input").prepend(createPromptHTMLString(state.getPromptData()));

  $("#command-line-value").keydown(handleKeydownWrapper);
  $("#command-line-value").keyup(handleKeyupWrapper);
  $("#commandline").click(() => focusInput());
  $("#reset").click(handleReset);

  //delay render because of sizing issues
  setTimeout(() => {
    const id = "#visualization-container";
    const width = $(id).width();
    const height = $(id).height();

    const svg = d3.select("#visualization-container").append("svg");
    svg.attr("width", width);
    svg.attr("height", height);
    const group = svg.append("g");

    svgData = { width, height, group };
    updateVisualization(INITIALIZE_FILE_TREE_OFFSETS);
  }, 500);
}

const getInput = () => $("#command-line-value").val();

const setInput = (input) => $("#command-line-value").val(input);

const focusInput = () => {
  $("#command-line-value").focus();
};

const addHistory = (value) => {
  $("#history").append(
    createHistoryLineHTMLString(value.input, value.output, value.promptData)
  );
  console.log("add history", value);
};

const clearHistory = () => {
  $("#history").empty();
};

const updateText = (title, description, task) => {
  $("#command-title").text(title);
  $("#command-description").text(description);
  $("#challenge-description").text(task);
};

export { initializeCommandLineExercise };
