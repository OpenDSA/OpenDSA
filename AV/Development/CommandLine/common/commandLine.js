import { updateCommandLinePrompt } from "./commandLineExercise.js";

const createHandleKeydown =
  (
    inputId,
    historyId,
    commandsMap,
    awardCreditHandler,
    disabledCommands,
    getCurrDir,
    commandHistory
  ) =>
  (event) => {
    const keycode = event.keyCode ? event.keyCode : event.which;

    if (keycode == "13") {
      const input = $(inputId).val();
      const prevPrompt = $("#command-line-prompt").text();

      const output = callCommand(
        input,
        commandsMap,
        awardCreditHandler,
        disabledCommands
      );

      commandHistory.enter();

      $(inputId).val("");
      updateCommandLinePrompt(getCurrDir());

      const lineValue = `<div class="symbol-and-input"><p>${prevPrompt}</p><p>${input}</p></div>`;

      $(historyId).append(`<li>${lineValue}</li>`);

      if (output) {
        $(historyId).append(`<li class="output">${output}</li>`);
      }

      $("#commandline").scrollTop($("#commandline")[0].scrollHeight);
    }
    //tab
    if (keycode === 9) {
      event.preventDefault();
      const inputValue = $(inputId).val();
      const inputValueSplit = inputValue.split(" ");
      const restOfName = getCurrDir().getRestOfName(inputValueSplit.pop());
      $(inputId).val(inputValue + restOfName);
    }
    //up arrow
    if (keycode === 38) {
      const prev = commandHistory.previous();
      if (prev !== null) {
        event.preventDefault();
        $(inputId).val(prev);
      }
    }
    //down arrow
    if (keycode === 40) {
      const next = commandHistory.next();
      if (next !== null) {
        event.preventDefault();
        $(inputId).val(next);
      }
    }
  };

const createHandleKeyup = (inputId, commandHistory) => (event) => {
  const keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode !== 13 && keycode !== 40 && keycode !== 38) {
    commandHistory.update($(inputId).val());
  }
};

function callCommand(input, commandsMap, awardCreditHandler, disabledCommands) {
  const values = input.split(/\s+/);

  const command = values[0];

  if (command === "") {
    return "";
  }

  if (commandsMap[command] && !disabledCommands.includes(command)) {
    const args = values.slice(1).filter((arg) => arg !== "");
    const output = commandsMap[command](args);

    if (awardCreditHandler[command]) {
      awardCreditHandler[command]();
    }

    return output;
  }

  return "Command not found";
}

function initializeCommandLine(
  inputId,
  historyId,
  commandsMap,
  awardCreditHandler,
  disabledCommands,
  getCurrDir,
  commandHistory
) {
  const handleKeydown = createHandleKeydown(
    inputId,
    historyId,
    commandsMap,
    awardCreditHandler,
    disabledCommands ? disabledCommands : [],
    getCurrDir,
    commandHistory
  );
  $(inputId).keydown(handleKeydown);

  const handleKeyup = createHandleKeyup(inputId, commandHistory);
  $(inputId).keyup(handleKeyup);
}

export { initializeCommandLine };
