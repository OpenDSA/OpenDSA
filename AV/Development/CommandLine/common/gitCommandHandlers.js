const handle_git = (gitCommandsMap) => (args) => {
  if (gitCommandsMap[args[0]]) {
    return gitCommandsMap[args[0]](args.slice(1));
  } else {
    return `git ${args[0]} not supported`;
  }
};

const handle_clone = () => (args) => {
  return "clone";
};

const handle_add = () => (args) => {
  return "add";
};

const handle_commit = () => (args) => {
  return "commit";
};

const handle_pull = () => (args) => {
  return "pull";
};

const handle_push = () => (args) => {
  return "push";
};

const handle_branch = () => (args) => {
  return "branch";
};

const handle_checkout = () => (args) => {
  return "checkout";
};

const handle_status = () => (args) => {
  return "status";
};

function createGitCommandsMap() {
  const commandsMap = {
    clone: handle_clone,
    add: handle_add,
    commit: handle_commit,
    pull: handle_pull,
    push: handle_push,
    branch: handle_branch,
    checkout: handle_checkout,
    status: handle_status,
  };

  Object.keys(commandsMap).forEach(
    (key) => (commandsMap[key] = commandsMap[key]())
  );

  return commandsMap;
}

export { handle_git, createGitCommandsMap };
