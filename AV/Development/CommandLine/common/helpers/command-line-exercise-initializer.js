import {
  CommandLineExerciseState,
  GitExerciseState,
} from "./exercise-state.js";
import { handleKeydown, handleKeyup } from "./command-line.js";
import { COMMANDS_MAP } from "./command-handlers.js";
import {
  updateFileStructureVisualization,
  updateGitVisualization,
} from "./file-structure.js";
import { CommandHistory } from "./command-history.js";
import {
  INITIALIZE_FILE_TREE_OFFSETS,
  INITIALIZE_OFFSETS,
  RESET_FILE_TREE_OFFSETS,
  RESET_OFFSETS,
} from "./timings.js";
import {
  createHistoryLineHTMLString,
  createPromptHTMLString,
} from "./html-string-components.js";
import { COMBINED_COMMANDS_MAP } from "./git-command-handlers.js";
import { EXERCISE_TYPES } from "./exercise-types.js";

function initializeExercise(config) {
  switch (config.type) {
    case EXERCISE_TYPES.GIT:
      initializeGitExercise(config);
      break;

    default:
      initializeCommandLineExercise(config);
      break;
  }
}

function initializeCommandLineExercise({
  title,
  description,
  task,
  checkCompleted,
  initialFileStructure,
  initialCwdIndexPath,
}) {
  const state = new CommandLineExerciseState(
    initialFileStructure,
    initialCwdIndexPath
  );

  initializeExerciseHelper(
    state,
    updateFileStructureVisualization,
    COMMANDS_MAP,
    INITIALIZE_FILE_TREE_OFFSETS,
    RESET_FILE_TREE_OFFSETS,
    title,
    description,
    task,
    checkCompleted
  );
}

function initializeGitExercise({
  title,
  description,
  task,
  checkCompleted,
  initialFileStructure,
  initialCwdIndexPath,
  emptyLocal,
  initialCommands,
  initialRemoteCommands,
}) {
  const state = new GitExerciseState(
    initialFileStructure,
    initialCwdIndexPath,
    emptyLocal,
    initialCommands,
    initialRemoteCommands
  );

  initializeExerciseHelper(
    state,
    updateGitVisualization,
    COMBINED_COMMANDS_MAP,
    INITIALIZE_OFFSETS,
    RESET_OFFSETS,
    title,
    description,
    task,
    checkCompleted
  );
}

function initializeExerciseHelper(
  state,
  handleUpdateVisualization,
  commandsMap,
  initialVisualizationOffsets,
  resetVisualizationOffsets,
  title,
  description,
  task,
  handleCheckCompleted
) {
  // Load the config object with interpreter and code created by odsaUtils.js
  //   const config = ODSA.UTILS.loadConfig();
  const config = ODSA.UTILS.loadConfig(),
    interpret = config.interpreter; // get the interpreter

  updateText(title, description, task);

  const commandHistory = new CommandHistory();
  let svgData;

  const awardCredit = (args) => {
    if (handleCheckCompleted(args, state)) {
      $("#progress-indicator").text("Completed");
      $("#progress-indicator").removeClass("in-progress").addClass("completed");
      ODSA.AV.awardCompletionCredit();
    }
  };

  const updateVisualization = (offsets, extraVisualizations) =>
    handleUpdateVisualization(svgData, state, offsets, extraVisualizations);

  const handleKeydownWrapper = (event) => {
    handleKeydown(
      event,
      getInput(),
      setInput,
      state,
      commandsMap,
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
    updateVisualization(resetVisualizationOffsets);
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
    updateVisualization(initialVisualizationOffsets);
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

export { initializeExercise };
