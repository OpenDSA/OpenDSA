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
        fileSystemEntity.setAdded(true);
      } else {
        notFound.push(path);
      }
    });
    return notFound.length === 0 ? "" : "Not found: " + notFound.join(", ");
  };

const handle_commit =
  (getSvgData, getCurrDir, setCurrDir, getHomeDir, gitMethods) => (args) => {};

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
  (getSvgData, getCurrDir, setCurrDir, getHomeDir, gitMethods) => (args) => {
    const output = [];

    const branchInfo = `<div class="git-status-branch"><p>On branch ${
      gitMethods.getLocalCurrBranch().name
    }</p><p>Your branch is up to date with 'origin/main'.</p></div>`;

    const createStatusSection = (title, className, status) =>
      createHtmlFileList(
        title,
        className,
        getHomeDir().getRelativePathsByStatus(status, getCurrDir())
      );

    const stagedInfo = createStatusSection(
      "Changes to be committed:",
      "git-status-staged",
      {
        added: true,
      }
    );

    const notStagedInfo = createStatusSection(
      "Changes not staged for commit:",
      "git-status-not-staged",
      { added: false, tracked: true, modified: true }
    );

    const untrackedInfo = createStatusSection(
      "Untracked files:",
      "git-status-untracked",
      { added: false, tracked: false }
    );

    return `<div class="git-status">${branchInfo}${stagedInfo}${notStagedInfo}${untrackedInfo}</div>`;
  };

function createGitCommandsMap(
  getSvgData,
  getCurrDir,
  setCurrDir,
  getHomeDir,
  gitMethods
) {
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
        getHomeDir,
        gitMethods
      ))
  );

  return commandsMap;
}

const createHtmlFileList = (title, className, fileNames) =>
  fileNames.length > 0
    ? `<div class="${className}"><p>${title}</p><div class="git-status-files"><p>${fileNames.join(
        "</p><p>"
      )}</p></div></div>`
    : "";

export { handle_git, createGitCommandsMap };
