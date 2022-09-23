import { createOutputList } from "./commandHandlers.js";
import {
  alreadyCloned,
  alreadyOnBranch,
  branchAlreadyExists,
  branchNotFound,
  branchNotRemote,
  checkoutHandleChanges,
  commitRequiresMessage,
  filesAndA,
  invalidGitURL,
  invalidPath,
  localRemoteDivergedPull,
  localRemoteDivergedPush,
  messageEmpty,
  messageEnclosed,
  noChangesToCommit,
  noFilesExist,
  notEnoughArgs,
  pullUpToDate,
  pushUpToDate,
  tooManyArgs,
  untracked,
} from "./errorMessages.js";
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
  setLocalCurrDir,
  getLocalHomeDir,
  setLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  //TODO don't hard code this
  if (args[0] !== "https://github.com/Sample/Sample.git") {
    return invalidGitURL(args[0]);
  }

  if (getLocalHomeDir() || getLocalInitialCommit()) {
    return alreadyCloned;
  }

  const remoteHomeDir = getRemoteHomeDir().copyWithGitId();
  setLocalHomeDir(remoteHomeDir);
  setLocalCurrDir(remoteHomeDir);

  const remoteInitialCommit = getRemoteInitialCommit().copy();
  const remoteCurrBranch = getRemoteCurrBranch();
  setLocalInitialCommit(remoteInitialCommit);
  setLocalCurrBranch(
    remoteInitialCommit.findBranchByGitId(remoteCurrBranch.gitId)
  );

  return { clone: true };
};

const handle_add = (
  args,
  flags,
  getLocalCurrDir,
  setLocalCurrDir,
  getLocalHomeDir,
  setLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  const results = args.map((arg) => {
    const fileSystemEntity = getLocalCurrDir().getChildByPathWithDeleted(arg);

    if (!fileSystemEntity) {
      return invalidPath(arg);
    }

    fileSystemEntity.setStateConditional(GIT_STATE.CHANGED, GIT_STATE.ADDED);

    return "";
  });

  return createOutputList(results);
};

const handle_restore = (
  args,
  flags,
  getLocalCurrDir,
  setLocalCurrDir,
  getLocalHomeDir,
  setLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  const isStaged = "--staged" in flags;

  const results = args.map((arg) => {
    const fileSystemEntity = getLocalCurrDir().getChildByPathWithDeleted(arg);
    if (!fileSystemEntity) {
      return invalidPath(arg);
    }

    if (isStaged) {
      fileSystemEntity.setStateConditional(GIT_STATE.ADDED, GIT_STATE.CHANGED);
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

    return "";
  });

  return createOutputList(results);
};

const handle_commit = (
  args,
  flags,
  getLocalCurrDir,
  setLocalCurrDir,
  getLocalHomeDir,
  setLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  let message = flags["-m"];
  if (!message) {
    return commitRequiresMessage;
  }
  if (
    !(
      (message.startsWith('"') && message.endsWith('"')) ||
      (message.startsWith("'") && message.endsWith("'"))
    )
  ) {
    return messageEnclosed;
  }

  args = args.filter((arg) => arg !== message);

  message = message.slice(1, -1);
  if (message === "") {
    return messageEmpty;
  }

  const hasAllFlag = "-a" in flags;

  if (args.length > 0 && hasAllFlag) {
    return filesAndA;
  }

  const errors = [];
  let files = null;
  if (hasAllFlag) {
    // get all changed files except untracked files
    files = getLocalHomeDir().getAddedAndChanged();
  } else if (args.length === 0) {
    //commit all staged
    files = getLocalHomeDir().getAddedFiles();
  } else {
    // get all changed files based on args except untracked files
    files = args.flatMap((arg) => {
      const fileSystemEntity = getLocalCurrDir().getChildByPathWithDeleted(arg);
      if (!fileSystemEntity) {
        errors.push(invalidPath(arg));
        return [];
      }
      if (fileSystemEntity.isUntracked()) {
        errors.push(untracked(arg));
        return [];
      }
      const foundFiles = fileSystemEntity.getAddedAndChanged();
      return foundFiles;
    });
  }

  if (files.length === 0) {
    return createOutputList([...errors, noChangesToCommit]);
  }

  const filesCopy = copyFiles(files);

  const sortedPathAndStateValues = getSortedPathAndStateValues(
    files,
    getLocalCurrDir(),
    true
  );

  files.forEach((file) => {
    file.removeDeleted();
  });
  if (hasAllFlag) {
    getLocalHomeDir().setAddedAndChangedToCommitted();
  } else if (args.length === 0) {
    getLocalHomeDir().setAddedToCommitted();
  } else {
    files.forEach((file) => {
      file.setAddedAndChangedToCommitted();
    });
  }

  const commit = getLocalCurrBranch().commitChanges(filesCopy, message);

  const commitOutput = createCommitOutput(commit, sortedPathAndStateValues);

  const result = `<div class="git-commit">${
    createOutputList(errors) +
    createOutputList(commitOutput.counts) +
    createOutputList(commitOutput.files)
  }</div>`;

  return { commit, result };
};

const copyFiles = (files) => files.map((file) => file.copyWithGitId());

const createCommitOutput = (commit, sortedPathAndStateValues) => {
  const newCount = countFiles(commit.files, FILE_STATE.NEW);
  const modifiedCount = countFiles(commit.files, FILE_STATE.MODIFIED);
  const deletedCount = countFiles(commit.files, FILE_STATE.DELETED);

  const totalCountsLine = createCountLine(
    (newCount || 0) + (modifiedCount || 0) + (deletedCount || 0),
    "changed in total"
  );

  const countsLine = [
    [newCount, "created"],
    [modifiedCount, "modified"],
    [deletedCount, "deleted"],
  ]
    .filter((value) => value[0] !== 0)
    .map((value) => createCountLine(value[0], value[1]))
    .join(", ");

  const fileLines = sortedPathAndStateValues.map(
    (value) => `${value.state} ${value.path}`
  );

  return {
    counts: [totalCountsLine, countsLine],
    files: fileLines,
  };
};

const createCountLine = (count, message) =>
  `${count} file${count > 1 ? "s" : ""} ${message}`;

const countFiles = (files, fileState) =>
  files
    .filter((file) => file.getState().fileState === fileState)
    .reduce((sum, file) => sum + file.countFiles(), 0);

//cannot handle merge conflicts
const handle_pull = (
  args,
  flags,
  getLocalCurrDir,
  setLocalCurrDir,
  getLocalHomeDir,
  setLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  const remoteBranch = getRemoteInitialCommit().findBranchByGitId(
    getLocalCurrBranch().gitId
  );

  if (!remoteBranch) {
    return branchNotRemote(getLocalCurrBranch().name);
  }

  const { ahead, behind } = getNumCommitsDifferent(
    getLocalCurrBranch(),
    getRemoteCurrBranch()
  );

  if (behind === 0) {
    return pullUpToDate;
  }
  if (behind > 0 && ahead > 0) {
    return localRemoteDivergedPull;
  }

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
  setLocalCurrDir,
  getLocalHomeDir,
  setLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  let remoteBranch = getRemoteInitialCommit().findBranchByGitId(
    getLocalCurrBranch().gitId
  );

  if (remoteBranch) {
    const { ahead, behind } = getNumCommitsDifferent(
      getLocalCurrBranch(),
      getRemoteCurrBranch()
    );

    if (ahead === 0) {
      return pushUpToDate;
    }
    if (ahead > 0 && behind > 0) {
      return localRemoteDivergedPush;
    }
  }

  const remoteInitialCommit = getRemoteInitialCommit();
  const currBranch = getLocalCurrBranch();
  const commits = currBranch.getCommitHistory();
  const lastRemoteCommit = remoteInitialCommit.mergeCommits(commits);

  // let remoteBranch = remoteInitialCommit.findBranchByGitId(currBranch.gitId);
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
  setLocalCurrDir,
  getLocalHomeDir,
  setLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  const name = args[0];

  if (getLocalInitialCommit().findBranchByName(name)) {
    return branchAlreadyExists(name);
  }
  const branch = new Branch(name);
  getLocalCurrBranch().commit.insertBranch(branch);

  return "";
};

const handle_checkout = (
  args,
  flags,
  getLocalCurrDir,
  setLocalCurrDir,
  getLocalHomeDir,
  setLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  return changeBranchHelper(
    args,
    flags,
    "-b",
    getLocalCurrDir,
    setLocalCurrDir,
    getLocalHomeDir,
    setLocalHomeDir,
    getLocalInitialCommit,
    setLocalInitialCommit,
    getLocalCurrBranch,
    setLocalCurrBranch,
    getRemoteHomeDir,
    getRemoteInitialCommit,
    getRemoteCurrBranch
  );
};

const handle_switch = (
  args,
  flags,
  getLocalCurrDir,
  setLocalCurrDir,
  getLocalHomeDir,
  setLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  return changeBranchHelper(
    args,
    flags,
    "-c",
    getLocalCurrDir,
    setLocalCurrDir,
    getLocalHomeDir,
    setLocalHomeDir,
    getLocalInitialCommit,
    setLocalInitialCommit,
    getLocalCurrBranch,
    setLocalCurrBranch,
    getRemoteHomeDir,
    getRemoteInitialCommit,
    getRemoteCurrBranch
  );
};

const changeBranchHelper = (
  args,
  flags,
  createFlag,
  getLocalCurrDir,
  setLocalCurrDir,
  getLocalHomeDir,
  setLocalHomeDir,
  getLocalInitialCommit,
  setLocalInitialCommit,
  getLocalCurrBranch,
  setLocalCurrBranch,
  getRemoteHomeDir,
  getRemoteInitialCommit,
  getRemoteCurrBranch
) => {
  if (
    getLocalHomeDir().getByState([GIT_STATE.ADDED, GIT_STATE.CHANGED])
      .length !== 0
  ) {
    return checkoutHandleChanges;
  }

  const name = args[0];

  if (name === getLocalCurrBranch().name) {
    return alreadyOnBranch(name);
  }

  let branch = getLocalInitialCommit().findBranchByName(name);

  if (!branch && !(createFlag in flags)) {
    return branchNotFound(name);
  }

  if (!branch) {
    handle_branch(
      [name],
      [],
      getLocalCurrDir,
      setLocalCurrDir,
      getLocalHomeDir,
      setLocalHomeDir,
      getLocalInitialCommit,
      setLocalInitialCommit,
      getLocalCurrBranch,
      setLocalCurrBranch,
      getRemoteHomeDir,
      getRemoteInitialCommit,
      getRemoteCurrBranch
    );

    branch = getLocalInitialCommit().findBranchByName(name);
  }

  getLocalHomeDir().updateToCommit(getLocalCurrBranch().commit, branch.commit);

  setLocalCurrBranch(branch);

  return "";
};

const handle_status = (
  args,
  flags,
  getLocalCurrDir,
  setLocalCurrDir,
  getLocalHomeDir,
  setLocalHomeDir,
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
  }</p><p>${createBranchUpToDateLine(
    getLocalCurrBranch(),
    getRemoteInitialCommit()
  )}</p></div>`;

  const createStatusSection = (
    title,
    className,
    gitState,
    fileStates,
    hideStates,
    flatten
  ) => {
    let files = getLocalHomeDir().getByState(gitState, fileStates);

    if (files.length === 0) {
      return "";
    }

    const sortedPathAndStateValues = getSortedPathAndStateValues(
      files,
      getLocalCurrDir(),
      flatten
    );

    const sortedRelativePaths = sortedPathAndStateValues.map(
      (value) => value.path
    );
    const sortedStates = sortedPathAndStateValues.map((value) => value.state);

    const fileStatesHtml = hideStates
      ? ""
      : `<div class="git-status-files-statuses"><p>${sortedStates.join(
          "</p><p>"
        )}</div>`;

    return `<div class="${className}"><p>${title}</p><div class="git-status-files">${fileStatesHtml}<div class="git-status-files-names"><p>${sortedRelativePaths.join(
      "</p><p>"
    )}<p></div><p></p></div></div>`;
  };

  const stagedInfo = createStatusSection(
    "Changes to be committed:",
    "git-status-staged",
    GIT_STATE.ADDED,
    [
      FILE_STATE.MODIFIED,
      FILE_STATE.DELETED,
      FILE_STATE.NEW,
      FILE_STATE.RENAMED,
    ],
    false,
    true
  );

  const notStagedInfo = createStatusSection(
    "Changes not staged for commit:",
    "git-status-not-staged",
    GIT_STATE.CHANGED,
    [FILE_STATE.MODIFIED, FILE_STATE.DELETED, FILE_STATE.RENAMED],
    false,
    true
  );

  const untrackedInfo = createStatusSection(
    "Untracked files:",
    "git-status-untracked",
    GIT_STATE.CHANGED,
    FILE_STATE.NEW,
    true,
    false
  );

  console.log(
    "diff",
    getNumCommitsDifferent(getLocalCurrBranch(), getRemoteCurrBranch())
  );

  return `<div class="git-status">${branchInfo}${stagedInfo}${notStagedInfo}${untrackedInfo}</div>`;
};

const createBranchUpToDateLine = (localBranch, remoteInitialCommit) => {
  const remoteBranch = remoteInitialCommit.findBranchByGitId(localBranch.gitId);

  if (!remoteBranch) {
    return "";
  }

  const { ahead, behind } = getNumCommitsDifferent(localBranch, remoteBranch);
  if (ahead === 0 && behind === 0) {
    return `Your branch is up to date with 'origin/${remoteBranch.name}'.`;
  }
  if (ahead > 0 && behind === 0) {
    return `Your branch is ahead of 'origin/${
      remoteBranch.name
    }' by ${ahead} commit${ahead > 1 ? "s" : ""}.`;
  }
  if (ahead === 0 && behind > 0) {
    return `Your branch is behind 'origin/${
      remoteBranch.name
    }' by ${behind} commit${behind > 1 ? "s" : ""}.`;
  }
  if (ahead > 0 && behind > 0) {
    return `Your branch is ahead of 'origin/${
      remoteBranch.name
    }' by ${ahead} commit${ahead > 1 ? "s" : ""} and behind 'origin/${
      remoteBranch.name
    }' by ${behind} commit${behind > 1 ? "s" : ""}.`;
  }
};

const getNumCommitsAhead = (srcCurrBranch, dstCurrBranch) => {
  let currCommit = srcCurrBranch.commit;
  let count = 0;

  while (currCommit) {
    if (dstCurrBranch.commit.gitId === currCommit.gitId) {
      return count;
    }
    count++;
    currCommit = currCommit.parent;
  }

  return -1;
};

const getNumCommitsDifferent = (localBranch, remoteBranch) => {
  const commonParent = getCommonParentCommit(
    localBranch.commit,
    remoteBranch.commit
  );
  return {
    ahead: getNumCommitsFromBranch(localBranch, commonParent),
    behind: getNumCommitsFromBranch(remoteBranch, commonParent),
  };
};

const getCommonParentCommit = (localCommit, remoteCommit) => {
  let currLocal = localCommit;
  let currRemote = remoteCommit;

  //terrible efficiency
  while (currLocal) {
    while (currRemote) {
      if (currLocal.gitId === currRemote.gitId) {
        return currLocal;
      }
      currRemote = currRemote.parent;
    }
    currRemote = remoteCommit;
    currLocal = currLocal.parent;
  }

  return null;
};

const getNumCommitsFromBranch = (branch, commit) => {
  let curr = branch.commit;
  let count = 0;

  while (curr) {
    if (commit.gitId === curr.gitId) {
      return count;
    }
    count++;
    curr = curr.parent;
  }

  return -1;
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
    clone: {
      method: handle_clone,
      delay: -1 * delays.paths.update,
      maxArgs: 1,
      minArgs: 1,
      isClone: true,
    },
    add: { method: handle_add, delay: -1 * delays.paths.update, minArgs: 1 },
    commit: { method: handle_commit, delay: -1 * delays.paths.update },
    pull: { method: handle_pull, delay: 0, maxArgs: 0 },
    push: { method: handle_push, delay: -1 * delays.paths.update, maxArgs: 0 },
    branch: {
      method: handle_branch,
      delay: -1 * delays.paths.update,
      minArgs: 1,
      maxArgs: 1,
    },
    checkout: {
      method: handle_checkout,
      delay: -1 * delays.paths.update,
      minArgs: 1,
      maxArgs: 1,
    },
    switch: {
      method: handle_switch,
      delay: -1 * delays.paths.update,
      minArgs: 1,
      maxArgs: 1,
    },
    restore: {
      method: handle_restore,
      delay: -1 * delays.paths.update,
      minArgs: 1,
    },
    status: { method: handle_status, delay: 0, maxArgs: 0 },
  };

  Object.keys(commandsMap).forEach((key) => {
    const { method, minArgs, maxArgs, delay, isClone } = commandsMap[key];
    commandsMap[key] = initialize_command_handler(
      method,
      minArgs,
      maxArgs,
      getCurrDir,
      setCurrDir,
      getHomeDir,
      gitMethods.setLocalHomeDir,
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
      gitMethods,
      isClone
    );
  });

  return commandsMap;
}

const getSortedPathAndStateValues = (files, startDir, flatten) => {
  if (flatten) {
    files = files.flatMap((file) => file.getFilesDeep());
  }

  const paths = startDir.getRelativePaths(files);
  const pathsAndStates = files.map((file, index) => ({
    path: paths[index],
    state: `${file.getStateString()}:`,
  }));
  pathsAndStates.sort((a, b) => {
    const pathA = a.path;
    const pathB = b.path;

    if (pathA < pathB) {
      return -1;
    }
    if (pathA > pathB) {
      return 1;
    }
    return 0;
  });

  return pathsAndStates;
};

//used for commands that update the visualization
const initialize_command_handler =
  (
    handle_command,
    minArgs,
    maxArgs,
    getLocalCurrDir,
    setLocalCurrDir,
    getLocalHomeDir,
    setLocalHomeDir,
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
    gitMethods,
    isClone
  ) =>
  (args, flags, disableVisualization) => {
    //TODO think of cleaner way to handle clone
    if (!getLocalHomeDir() && !isClone) {
      return noFilesExist;
    }

    if ((minArgs || minArgs === 0) && args.length < minArgs) {
      return notEnoughArgs;
    }
    if ((maxArgs || maxArgs === 0) && args.length > maxArgs) {
      return tooManyArgs;
    }

    const result = handle_command(
      args,
      flags,
      getLocalCurrDir,
      setLocalCurrDir,
      getLocalHomeDir,
      setLocalHomeDir,
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

    return typeof result === "string"
      ? result
      : result.result
      ? result.result
      : "";
  };

export { handle_git, createGitCommandsMap };
