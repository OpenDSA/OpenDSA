import {
  CommandLineExerciseState,
  GitExerciseState,
} from "../core/classes/exercise-state.js";
import {
  handleKeydown,
  handleKeyup,
} from "../core/handlers/command-line-handlers.js";
import { COMMANDS_MAP } from "../core/handlers/command-handlers.js";
import {
  initializeGitVisualization,
  updateFileStructureVisualization,
  updateGitVisualization,
} from "../core/handlers/visualization-handlers.js";
import { CommandHistory } from "../core/classes/command-history.js";
import {
  INITIALIZE_FILE_TREE_OFFSETS,
  INITIALIZE_OFFSETS,
  RESET_FILE_TREE_OFFSETS,
  RESET_OFFSETS,
} from "../core/config/timing-offsets.js";
import {
  createHistoryLineHTMLString,
  createPromptHTMLString,
} from "../html-string-components/html-string-components.js";
import { COMBINED_COMMANDS_MAP } from "../core/handlers/git-command-handlers.js";
import { EXERCISE_TYPES } from "../core/config/exercise-types.js";

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
  initialIndexPath,
}) {
  const state = new CommandLineExerciseState(
    initialFileStructure,
    initialIndexPath
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
  initialIndexPath,
  emptyLocal,
  initialCommands,
  initialRemoteCommands,
}) {
  const state = new GitExerciseState(
    initialFileStructure,
    initialIndexPath,
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
    checkCompleted,
    initializeGitVisualization
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
  handleCheckCompleted,
  initializeVisualization
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

  const handleAfterEnter = () => {
    updatePrompt();
    $("#commandline").scrollTop($("#commandline")[0].scrollHeight);
  };

  const updatePrompt = () => {
    $("#prompt-placeholder")
      .empty()
      .append(createPromptHTMLString(state.getPromptData()));
  };

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
      commandHistory,
      handleAfterEnter
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
    updatePrompt();
  };

  $("#prompt-placeholder").append(
    createPromptHTMLString(state.getPromptData())
  );

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

    if (initializeVisualization) {
      initializeVisualization(svgData);
    }

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
