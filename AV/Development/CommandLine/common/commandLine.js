const createClickedDown =
  (inputId, historyId, commandsMap, awardCreditHandler) => (event) => {
    const keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      const input = $(inputId).val();
      // history.push(input);
      const output = callCommand(input, commandsMap, awardCreditHandler);

      $(inputId).val("");

      const lineValue = `$ &nbsp ${input}`;

      $(historyId).append(`<li>${lineValue}</li>`);

      $(historyId).append(`<li>${output}</li>`);
    }
  };

function callCommand(input, commandsMap, awardCreditHandler) {
  const values = input.split(/\s+/);

  const command = values[0];

  if (command === "") {
    return "";
  }

  if (commandsMap[command]) {
    const args = values.slice(1);
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
  awardCreditHandler
) {
  const clickedDown = createClickedDown(
    inputId,
    historyId,
    commandsMap,
    awardCreditHandler
  );
  $(inputId).keypress(clickedDown);
}

export { initializeCommandLine };
