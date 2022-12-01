const handleKeydown = (
  event,
  input,
  setInput,
  state,
  commandsMap,
  handleUpdateVisualization,
  handleAwardCredit,
  handleAddHistory,
  commandHistory,
  handleAfterEnter
) => {
  const keycode = event.keyCode ? event.keyCode : event.which;

  //enter
  if (keycode == 13) {
    handleEnter(
      input,
      setInput,
      state,
      commandsMap,
      handleUpdateVisualization,
      handleAwardCredit,
      handleAddHistory,
      commandHistory
    );
    if (handleAfterEnter) {
      handleAfterEnter();
    }
  }

  //tab
  if (keycode === 9) {
    state.handleTab(event, input, setInput);
  }

  //up arrow
  if (keycode === 38) {
    handleUpArrow(event, commandHistory, setInput);
  }

  //down arrow
  if (keycode === 40) {
    handleDownArrow(event, commandHistory, setInput);
  }
};

const handleEnter = (
  input,
  setInput,
  state,
  commandsMap,
  handleUpdateVisualization,
  handleAwardCredit,
  handleAddHistory,
  commandHistory
) => {
  const promptData = state.getPromptData();

  const output = state.runCommand(
    input,
    commandsMap,
    handleUpdateVisualization,
    handleAwardCredit
  );

  const isObject =
    output && typeof output === "object" && !Array.isArray(output);

  handleAddHistory({
    input,
    output: isObject ? output.result : output,
    promptData,
  });

  commandHistory.enter();

  setInput("");
};

const handleUpArrow = (event, commandHistory, setInput) => {
  const prev = commandHistory.previous();
  if (prev !== null) {
    event.preventDefault();
    setInput(prev);
  }
};

const handleDownArrow = (event, commandHistory, setInput) => {
  const next = commandHistory.next();
  if (next !== null) {
    event.preventDefault();
    setInput(next);
  }
};

const handleKeyup = (event, input, commandHistory) => {
  const keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode !== 13 && keycode !== 40 && keycode !== 38) {
    commandHistory.update(input);
  }
};

export { handleKeydown, handleKeyup };
