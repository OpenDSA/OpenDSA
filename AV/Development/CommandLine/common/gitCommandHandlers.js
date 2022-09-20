import { notEnoughArgs, tooManyArgs } from "./errorMessages.js";
import { delays } from "./fileStructure.js";
import { Branch, Commit } from "./gitClasses.js";
import { FILE_STATE, GIT_STATE } from "./gitStatuses.js";

const handle_git = (gitCommandsMap) => (args, flags, disableVisualization) => {
  if (gitCommandsMap[args[0]]) {
    return gitCommandsMap[args[0]](args.slice(1), flags, disableVisualization);
  } else {
    return `git ${args[0]} not supported`;
  }
};

const handle_clone = (
  args,
  flags,
  getLocalCurrDir,
  getLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  if (
    getLocalHomeDir().getContents().length === 0 &&
    !getLocalInitialCommit()
  ) {
    const remoteHomeDir = getRemoteHomeDir().copyWithGitId();
    remoteHomeDir.getContents().forEach((content) => {
      getLocalHomeDir().insert(content);
    });
    const remoteInitialCommit = getRemoteInitialCommit().copy();
    const remoteCurrBranch = getRemoteCurrBranch();
    setLocalInitialCommit(remoteInitialCommit);
    setLocalCurrBranch(
      remoteInitialCommit.findBranchByGitId(remoteCurrBranch.gitId)
    );

    return { clone: true };
  }

  return "Cannot clone unless local is empty";
};

const handle_add = (
  args,
  flags,
  getLocalCurrDir,
  getLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  const notFound = args.filter((path) => {
    const fileSystemEntity = getLocalCurrDir().getChildByPath(path);

    if (fileSystemEntity) {
      fileSystemEntity.setStateConditional(GIT_STATE.CHANGED, GIT_STATE.ADDED);
    }
    return !fileSystemEntity;
  });

  return notFound.length === 0 ? "" : "Not found: " + notFound.join(", ");
};

const handle_restore = (
  args,
  flags,
  getLocalCurrDir,
  getLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  let isStaged = false;
  if (args.length > 0 && args[0] === "--staged") {
    isStaged = true;
    args = args.slice(1);
  }

  const notFound = args.filter((path) => {
    const fileSystemEntity = getLocalCurrDir().getChildByPath(path);

    if (fileSystemEntity) {
      if (isStaged) {
        fileSystemEntity.setStateConditional(
          GIT_STATE.ADDED,
          GIT_STATE.CHANGED
        );
      } else {
        fileSystemEntity
          .getByState(GIT_STATE.CHANGED, FILE_STATE.DELETED)
          .forEach((entity) => entity.setNotDeletedDeep());

        fileSystemEntity.setStateConditional(
          GIT_STATE.CHANGED,
          GIT_STATE.COMMITTED,
          [FILE_STATE.MODIFIED, FILE_STATE.DELETED],
          FILE_STATE.UNCHANGED
        );
      }
    }

    return !fileSystemEntity;
  });

  return notFound.length === 0 ? "" : "Not found: " + notFound.join(", ");
};

const handle_commit = (
  args,
  flags,
  getLocalCurrDir,
  getLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  //todo make is so you can commit certain files
  const files = [
    ...getLocalHomeDir().getByState(GIT_STATE.ADDED, FILE_STATE.NEW),
    ...getLocalHomeDir().getByState(GIT_STATE.ADDED, FILE_STATE.MODIFIED),
    ...getLocalHomeDir().getByState(GIT_STATE.ADDED, FILE_STATE.DELETED),
  ];
  const filesCopy = files.map((file) => file.copyWithGitId());
  getLocalHomeDir().removeDeleted();
  if (files.length > 0) {
    const commit = getLocalCurrBranch().commitChanges(filesCopy);
    getLocalHomeDir().setStateConditional(
      GIT_STATE.ADDED,
      GIT_STATE.COMMITTED,
      null,
      FILE_STATE.UNCHANGED
    );

    return { commit };
  } else {
    return "nothing to commit";
  }
};

//cannot handle merge conflicts
const handle_pull = (
  args,
  flags,
  getLocalCurrDir,
  getLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  const localInitialCommit = getLocalInitialCommit();
  const currRemoteBranch = getRemoteCurrBranch();
  const commits = currRemoteBranch.getCommitHistory();
  const lastLocalCommit = localInitialCommit.mergeCommits(commits);

  const localBranch = localInitialCommit.findBranchByGitId(
    currRemoteBranch.gitId
  );
  const localBranchCommit = localBranch.commit;
  localBranch.switchCommit(lastLocalCommit);
  const commitPath = getLocalHomeDir().updateToCommit(
    localBranchCommit,
    lastLocalCommit
  );

  return { pull: { commitPath } };
};

const handle_push = (
  args,
  flags,
  getLocalCurrDir,
  getLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  const remoteInitialCommit = getRemoteInitialCommit();
  const currBranch = getLocalCurrBranch();
  const commits = currBranch.getCommitHistory();
  const lastRemoteCommit = remoteInitialCommit.mergeCommits(commits);

  let remoteBranch = remoteInitialCommit.findBranchByGitId(currBranch.gitId);
  const remoteBranchCommit = remoteBranch?.commit;
  if (!remoteBranch) {
    remoteBranch = new Branch(currBranch.name);
    remoteBranch.gitId = currBranch.gitId;
  }
  remoteBranch.switchCommit(lastRemoteCommit);

  let commitPath = null;
  if (currBranch.gitId === getRemoteCurrBranch().gitId) {
    commitPath = getRemoteHomeDir().updateToCommit(
      remoteBranchCommit,
      lastRemoteCommit
    );
  }

  return {
    push: {
      commitPath,
    },
  };
};

const handle_branch = (
  args,
  flags,
  getLocalCurrDir,
  getLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  if (args.length === 1) {
    const name = args[0];
    if (getLocalInitialCommit().findBranchByName(name)) {
      return `${name} already exists`;
    }
    const branch = new Branch(name);
    getLocalCurrBranch().commit.insertBranch(branch);

    return "";
  }
  return "bad args";
};

const handle_checkout = (
  args,
  flags,
  getLocalCurrDir,
  getLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  if (args.length === 1) {
    const name = args[0];
    const branch = getLocalInitialCommit().findBranchByName(name);

    if (branch) {
      getLocalHomeDir().updateToCommit(
        getLocalCurrBranch().commit,
        branch.commit
      );

      setLocalCurrBranch(branch);

      return "";
    } else {
      return `${name} not found`;
    }
  }
  return "checkout";
};

const handle_status = (
  args,
  flags,
  getLocalCurrDir,
  getLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  const output = [];

  const branchInfo = `<div class="git-status-branch"><p>On branch ${
    getLocalCurrBranch().name
  }</p><p>Your branch is up to date with 'origin/main'.</p></div>`;

  const createStatusSection = (
    title,
    className,
    gitState,
    fileStates,
    hideStates
  ) => {
    const files = getLocalHomeDir().getByState(gitState, fileStates);

    if (files.length > 0) {
      const relativePaths = getLocalCurrDir().getRelativePaths(files);
      const fileStates = files.map((file) => `${file.getStateString()}:`);

      const fileStatesHtml = hideStates
        ? ""
        : `<div class="git-status-files-statuses"><p>${fileStates.join(
            "</p><p>"
          )}</div>`;

      return `<div class="${className}"><p>${title}</p><div class="git-status-files">${fileStatesHtml}<div class="git-status-files-names"><p>${relativePaths.join(
        "</p><p>"
      )}<p></div><p></p></div></div>`;
    }
    return "";
  };

  const stagedInfo = createStatusSection(
    "Changes to be committed:",
    "git-status-staged",
    GIT_STATE.ADDED
  );

  const notStagedInfo = createStatusSection(
    "Changes not staged for commit:",
    "git-status-not-staged",
    GIT_STATE.CHANGED,
    [FILE_STATE.MODIFIED, FILE_STATE.DELETED, FILE_STATE.RENAMED]
  );

  const untrackedInfo = createStatusSection(
    "Untracked files:",
    "git-status-untracked",
    GIT_STATE.CHANGED,
    FILE_STATE.NEW,
    true
  );

  return `<div class="git-status">${branchInfo}${stagedInfo}${notStagedInfo}${untrackedInfo}</div>`;
};

function createGitCommandsMap(
  getSvgData,
  getCurrDir,
  setCurrDir,
  getHomeDir,
  updateVisualization,
  gitMethods
) {
  const commandsMap = {
    clone: { method: handle_clone, delay: -1 * delays.paths.update },
    add: { method: handle_add, delay: -1 * delays.paths.update },
    commit: { method: handle_commit, delay: -1 * delays.paths.update },
    pull: { method: handle_pull, delay: 0 },
    push: { method: handle_push, delay: -1 * delays.paths.update },
    branch: { method: handle_branch, delay: -1 * delays.paths.update },
    checkout: { method: handle_checkout, delay: -1 * delays.paths.update },
    restore: { method: handle_restore, delay: -1 * delays.paths.update },
    status: { method: handle_status, delay: 0 },
  };

  Object.keys(commandsMap).forEach((key) => {
    const { method, minArgs, maxArgs, delay } = commandsMap[key];
    commandsMap[key] = initialize_command_handler(
      method,
      minArgs,
      maxArgs,
      getCurrDir,
      getHomeDir,
      gitMethods.getLocalInitialCommit,
      gitMethods.setLocalInitialCommit,
      gitMethods.getLocalCurrBranch,
      gitMethods.setLocalCurrBranch,
      gitMethods.getRemoteHomeDir,
      gitMethods.getRemoteInitialCommit,
      gitMethods.getRemoteCurrBranch,
      updateVisualization,
      delay,
      getSvgData,
      gitMethods
    );
  });

  return commandsMap;
}

//used for commands that update the visualization
const initialize_command_handler =
  (
    handle_command,
    minArgs,
    maxArgs,
    getLocalCurrDir,
    getLocalHomeDir,
    getLocalInitialCommit,
    setLocalInitialCommit,
    getLocalCurrBranch,
    setLocalCurrBranch,
    getRemoteHomeDir,
    getRemoteInitialCommit,
    getRemoteCurrBranch,
    updateVisualization,
    updateVisualizationDelay,
    getSvgData,
    gitMethods
  ) =>
  (args, flags, disableVisualization) => {
    if (minArgs && args.length < minArgs) {
      return notEnoughArgs;
    }
    if (maxArgs && args.length > maxArgs) {
      return tooManyArgs;
    }

    const result = handle_command(
      args,
      flags,
      getLocalCurrDir,
      getLocalHomeDir,
      getLocalInitialCommit,
      setLocalInitialCommit,
      getLocalCurrBranch,
      setLocalCurrBranch,
      getRemoteHomeDir,
      getRemoteInitialCommit,
      getRemoteCurrBranch
    );

    if (!disableVisualization) {
      updateVisualization(
        getSvgData(),
        getLocalHomeDir(),
        updateVisualizationDelay,
        getLocalCurrDir().id,
        gitMethods,
        typeof result === "string" ? null : result
      );
    }

    return typeof result === "string" ? result : "";
  };

export { handle_git, createGitCommandsMap };
