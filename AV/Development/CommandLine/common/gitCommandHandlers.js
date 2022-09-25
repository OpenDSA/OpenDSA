import { createOutputList, handle_rm } from "./commandHandlers.js";
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
  missingRRemove,
  noChangesToCommit,
  noFilesExist,
  notEnoughArgs,
  pullUpToDate,
  pushUpToDate,
  quoteNotClosed,
  tooManyArgs,
  untracked,
} from "./errorMessages.js";
import { delays } from "./fileStructure.js";
import { Branch, Commit } from "./gitClasses.js";
import { NEW_FILE_STATE } from "./gitStatuses.js";

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

    fileSystemEntity.stage();

    return "";
  });

  return createOutputList(results);
};

const handle_git_rm = (
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

    const rmResult = handle_rm([arg], flags, getLocalCurrDir);

    if (rmResult.length > 0 && rmResult[0] !== "") {
      return rmResult[0];
    }

    fileSystemEntity.stage();
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

    fileSystemEntity.restore(isStaged);

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

  const firstChar = message.charAt(0);
  const messageStartsWithQuote = firstChar === '"' || firstChar === "'";
  const messageParts = [];
  if (messageStartsWithQuote) {
    const messsageStartIndex = args.indexOf(message);
    const endsWithFirstChar = args.slice(messsageStartIndex).some((value) => {
      messageParts.push(value);
      return value.endsWith(firstChar);
    });

    if (!endsWithFirstChar) {
      return quoteNotClosed;
    }
    message = messageParts.join(" ");
  }

  args = args.filter((arg) =>
    messageStartsWithQuote ? !messageParts.includes(arg) : arg !== message
  );

  if (messageStartsWithQuote) {
    message = message.slice(1, -1);
  }

  if (message === "") {
    return messageEmpty;
  }

  const hasAllFlag = "-a" in flags;

  if (args.length > 0 && hasAllFlag) {
    return filesAndA;
  }

  const errors = [];
  let canCommit = false;
  if (hasAllFlag) {
    // get all changed files except untracked files
    canCommit = getLocalHomeDir().canCommit(true);
  } else if (args.length === 0) {
    //commit all staged
    canCommit = getLocalHomeDir().canCommit(false);
  } else {
    // get all changed files based on args except untracked files
    canCommit = args.every((arg) => {
      const fileSystemEntity = getLocalCurrDir().getChildByPathWithDeleted(arg);
      if (!fileSystemEntity) {
        errors.push(invalidPath(arg));
        return [];
      }
      if (fileSystemEntity.isUntracked()) {
        errors.push(untracked(arg));
        return [];
      }
      return fileSystemEntity.canCommit(true);
    });
  }

  if (errors.length > 0) {
    return createOutputList(errors);
  }

  if (!canCommit) {
    return noChangesToCommit;
  }

  let files = null;
  let pathAndStateValues = [];
  if (hasAllFlag) {
    ({ files, pathAndStateValues } = getLocalHomeDir().commit(
      true,
      getLocalCurrDir()
    ));
  } else if (args.length === 0) {
    ({ files, pathAndStateValues } = getLocalHomeDir().commit(
      false,
      getLocalCurrDir()
    ));
  } else {
    files = args.flatMap((arg) => {
      const fileSystemEntity = getLocalCurrDir().getChildByPathWithDeleted(arg);
      const commitResult = fileSystemEntity.commit(true, getLocalCurrDir());
      pathAndStateValues.push(...commitResult.pathAndStateValues);
      return commitResult.files;
    });

    pathAndStateValues.sort((a, b) => {
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
  }

  const commit = getLocalCurrBranch().commitChanges(files, message);

  const commitOutput = createCommitOutput(commit.files, pathAndStateValues);

  const result = `<div class="git-commit">${
    createOutputList(errors) +
    createOutputList(commitOutput.counts) +
    createOutputList(commitOutput.files)
  }</div>`;

  return { commit, result };
};

const createCommitOutput = (files, sortedPathAndStateValues) => {
  const newCount = countFiles(files, NEW_FILE_STATE.NEW);
  const modifiedCount = countFiles(files, NEW_FILE_STATE.MODIFIED);
  const deletedCount = countFiles(files, NEW_FILE_STATE.DELETED);

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

const countFiles = (files, stagingState) =>
  files
    .filter((file) => file.isStagingState(stagingState))
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
    remoteBranch
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

  let commitPath = null;
  if (localBranch.gitId === currRemoteBranch.gitId) {
    commitPath = getLocalHomeDir().updateToCommit(
      localBranchCommit,
      lastLocalCommit
    );
  }

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
      remoteBranch
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
  if (getLocalHomeDir().isChanged()) {
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
    files,
    isWorking,
    hideStates,
    flatten
  ) => {
    if (files.length === 0) {
      return "";
    }

    const sortedPathAndStateValues =
      getLocalCurrDir().getSortedPathAndStateValues(files, flatten, isWorking);

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
    getLocalHomeDir().getStagingAreaFiles(),
    false,
    false,
    true
  );

  const notStagedInfo = createStatusSection(
    "Changes not staged for commit:",
    "git-status-not-staged",
    getLocalHomeDir().getWorkingAreaFiles(),
    true,
    false,
    true
  );

  const untrackedInfo = createStatusSection(
    "Untracked files:",
    "git-status-untracked",
    getLocalHomeDir().getUntrackedFiles(),
    true,
    true,
    false
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
    rm: { method: handle_git_rm, delay: -1 * delays.paths.update, minArgs: 1 },
    commit: { method: handle_commit, delay: -1 * delays.paths.update },
    pull: { method: handle_pull, delay: 0, maxArgs: 0 },
    push: { method: handle_push, delay: 0, maxArgs: 0 },
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
