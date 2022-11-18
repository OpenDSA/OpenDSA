import {
  commmandNotFound,
  missingArg,
  noFilesExist,
  notEnoughArgs,
  tooManyArgs,
} from "../config/error-messages.js";
import { Directory } from "./file-system-entity.js";
import { Branch, Commit } from "./git-classes.js";
import { COMBINED_COMMANDS_MAP } from "../handlers/git-command-handlers.js";
import { FILE_STATE } from "../config/file-states.js";

class ExerciseState {
  constructor() {
    this.homeDir = null;
    this.currDir = null;
  }

  getPromptData() {
    return null;
  }

  handleTab() {
    return null;
  }

  isValid() {
    return false;
  }

  runCommand(input, commandsMap, handleUpdateVisualization, handleAwardCredit) {
    const inputSplit = splitInput(input);
    const { command, flags } = inputSplit;
    let args = inputSplit.args;

    if (!command) {
      return "";
    }

    const commandData = extractCommandData(commandsMap, command, args);

    if (commandData.notFound) {
      return commmandNotFound(commandData.notFound.join(" "));
    }

    if (commandData.missing) {
      return missingArg(commandData.missing.join(" "));
    }

    const { method, minArgs, maxArgs, offsets, commands } = commandData;
    args = commandData.args;

    if (!this.isValid(commands.pop())) {
      return noFilesExist;
    }

    if (minArgs && args.length < minArgs) {
      return notEnoughArgs;
    }
    if (maxArgs && args.length > maxArgs) {
      return tooManyArgs;
    }

    const output = method(args, flags, this);

    if (handleUpdateVisualization) {
      handleUpdateVisualization(offsets, output);
    }

    if (handleAwardCredit) {
      handleAwardCredit([command, ...inputSplit.args]);
    }

    return output;
  }
}

class CommandLineExerciseState extends ExerciseState {
  constructor(initialFileStructure, initialIndexPath) {
    super();
    this.initialFileStructure = initialFileStructure;
    this.initialIndexPath = initialIndexPath;

    this.reset();
  }

  initialize() {
    this.homeDir = null;
    this.currDir = null;
  }

  reset() {
    this.initialize();

    this.homeDir = new Directory(
      this.initialFileStructure
        ? this.initialFileStructure
        : DEFAULT_FILE_STRUCTURE
    );
    this.currDir = this.homeDir.followIndexPath(
      this.initialIndexPath ? this.initialIndexPath : DEFAULT_CWD_INDEX_PATH
    );
  }

  getPromptData() {
    return { path: this.currDir.getPath() };
  }

  handleTab(event, input, setInput) {
    handleTab(event, input, setInput, this);
  }

  isValid(command) {
    return this.homeDir && this.currDir;
  }
}

class GitExerciseState extends ExerciseState {
  constructor(
    initialFileStructure,
    initialIndexPath,
    emptyLocal,
    initialCommands,
    initialRemoteCommands
  ) {
    super();
    this.initialFileStructure = initialFileStructure;
    this.initialIndexPath = initialIndexPath;
    this.emptyLocal = emptyLocal;
    this.initialCommands = initialCommands;
    this.initialRemoteCommands = initialRemoteCommands;

    this.reset();
  }

  initialize() {
    this.homeDir = null;
    this.currDir = null;
    this.localInitialCommit = null;
    this.localCurrBranch = null;

    this.remoteHomeDir = null;
    this.remoteCurrDir = null;
    this.remoteInitialCommit = null;
    this.remoteCurrBranch = null;
  }

  reset() {
    this.initialize();
    const newHomeDir = new Directory(
      this.initialFileStructure
        ? this.initialFileStructure
        : DEFAULT_GIT_FILE_STRUCTURE
    );
    newHomeDir.setState(FILE_STATE.UNCHANGED, FILE_STATE.UNCHANGED);

    const newInitialCommit = new Commit();
    const newCurrBranch = new Branch("main");
    newInitialCommit.insertBranch(newCurrBranch);

    if (this.emptyLocal) {
      this.remoteHomeDir = newHomeDir;
      this.remoteCurrDir = newHomeDir;
      this.remoteInitialCommit = newInitialCommit;
      this.remoteCurrBranch = newCurrBranch;
    } else {
      const newCurrDir = newHomeDir.followIndexPath(
        this.initialIndexPath
          ? this.initialIndexPath
          : DEFAULT_GIT_CWD_INDEX_PATH
      );

      const newRemoteHomeDir = newHomeDir.copyWithGitId();
      const newRemoteInitialCommit = newInitialCommit.copy();
      const newRemoteCurrBranch = newRemoteInitialCommit.branches[0];

      this.homeDir = newHomeDir;
      this.currDir = newCurrDir;
      this.localInitialCommit = newInitialCommit;
      this.localCurrBranch = newCurrBranch;

      this.remoteHomeDir = newRemoteHomeDir;
      this.remoteCurrDir = newRemoteHomeDir;
      this.remoteInitialCommit = newRemoteInitialCommit;
      this.remoteCurrBranch = newRemoteCurrBranch;

      if (this.initialCommands) {
        this.initialCommands.forEach((command) => {
          this.runCommand(command, COMBINED_COMMANDS_MAP);
        });
      }

      if (this.initialRemoteCommands) {
        const tempState = new GitExerciseState();
        tempState.homeDir = this.remoteHomeDir;
        tempState.currDir = this.remoteCurrDir;
        tempState.localInitialCommit = this.remoteInitialCommit;
        tempState.localCurrBranch = this.remoteCurrBranch;

        this.initialRemoteCommands.forEach((command) => {
          tempState.runCommand(command, COMBINED_COMMANDS_MAP);
        });

        this.remoteHomeDir = tempState.homeDir;
        this.remoteCurrDir = tempState.currDir;
        this.remoteInitialCommit = tempState.localInitialCommit;
        this.remoteCurrBranch = tempState.localCurrBranch;
      }
    }
  }

  getPromptData() {
    return {
      path: this.currDir ? this.currDir.getPath() : "/",
      branchName: this.localCurrBranch?.name,
    };
  }

  handleTab(event, input, setInput) {
    handleTab(event, input, setInput, this, true);
  }

  isValid(command) {
    return (
      command === "clone" ||
      (this.homeDir &&
        this.currDir &&
        this.localInitialCommit &&
        this.localCurrBranch)
    );
  }
}

const splitInput = (input) => {
  const values = input.split(/\s+/);

  const command = values[0];

  const flags = {};
  let args = values.slice(1).filter((arg) => arg !== "");

  args = args.filter((arg, index) => {
    if (arg.startsWith("-")) {
      flags[arg] = index + 1 < args.length ? args[index + 1] : "";
      return false;
    }
    return true;
  });

  return { command, args, flags };
};

const extractCommandData = (commandsMap, command, args) => {
  return extractCommandDataRecursive(commandsMap, command, args, [command]);
};

const extractCommandDataRecursive = (commandsMap, command, args, commands) => {
  if (!commandsMap[command]) {
    return { notFound: commands };
  }
  if (!commandsMap[command].isCommandsMap) {
    return { ...commandsMap[command], args, commands };
  }
  if (args.length === 0) {
    return { missing: commands };
  }

  const nextCommand = args[0];

  return extractCommandDataRecursive(
    commandsMap[command],
    nextCommand,
    args.slice(1),
    [...commands, nextCommand]
  );
};

const handleTab = (event, input, setInput, state, includeDeleted) => {
  event.preventDefault();
  const { currDir } = state;
  const inputValueSplit = input.split(" ");
  if (currDir) {
    const restOfName = currDir.getRestOfName(
      inputValueSplit.pop(),
      includeDeleted &&
        inputValueSplit.length > 0 &&
        inputValueSplit[0] === "git"
    );
    setInput(input + restOfName);
  }
};

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

const DEFAULT_GIT_CWD_INDEX_PATH = [];

export { CommandLineExerciseState, GitExerciseState };
