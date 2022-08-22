import { Directory, File } from "./fileSystemEntity.js";
import { GIT_STATUSES } from "./gitStatuses.js";

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

const handle_add =
  (getSvgData, getCurrDir, setCurrDir, getHomeDir) => (args) => {
    let notFound = [];
    args.forEach((path) => {
      const fileSystemEntity = getCurrDir().getChildByPath(path);

      if (fileSystemEntity) {
        fileSystemEntity.setStatus(GIT_STATUSES.ADDED);
      } else {
        notFound.push(path);
      }
    });
    return notFound.length === 0 ? "" : "Not found: " + notFound.join(", ");
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

const handle_status =
  (getSvgData, getCurrDir, setCurrDir, getHomeDir) => (args) => {
    console.log("homeDir", getHomeDir());
    console.log("currDir", getCurrDir());
    return "status";
  };

function createGitCommandsMap(getSvgData, getCurrDir, setCurrDir, getHomeDir) {
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
    (key) =>
      (commandsMap[key] = commandsMap[key](
        getSvgData,
        getCurrDir,
        setCurrDir,
        getHomeDir
      ))
  );

  return commandsMap;
}

export { handle_git, createGitCommandsMap };
