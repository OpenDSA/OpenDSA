import { COMMANDS_MAP, handle_rm } from "./command-handlers.js";
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
  noChangesToCommit,
  pullUpToDate,
  pushUpToDate,
  quoteNotClosed,
  untracked,
} from "../config/error-messages.js";
import { Branch } from "../classes/git-classes.js";
import {
  getCommitOutput,
  getStatusOutput,
} from "../../command-handler-helpers/git-command-handlers-helpers.js";
import {
  ADD_OFFSETS,
  BRANCH_OFFSETS,
  CLONE_OFFSETS,
  COMMIT_OFFSETS,
  GIT_RM_OFFSETS,
  PULL_OFFSETS,
  PUSH_OFFSETS,
  RESTORE_OFFSETS,
  SWITCH_OFFSETS,
} from "../config/timing-offsets.js";

const handle_clone = (args, flags, state) => {
  const {
    homeDir,
    localInitialCommit,
    remoteHomeDir,
    remoteInitialCommit,
    remoteCurrBranch,
  } = state;
  //TODO don't hard code this
  if (args[0] !== "https://github.com/Sample/Sample.git") {
    return invalidGitURL(args[0]);
  }

  if (homeDir || localInitialCommit) {
    return alreadyCloned;
  }

  const remoteHomeDirCopy = remoteHomeDir.copyWithGitId();
  state.homeDir = remoteHomeDirCopy;
  state.currDir = remoteHomeDirCopy;

  const remoteInitialCommitCopy = remoteInitialCommit.copy();
  state.localInitialCommit = remoteInitialCommitCopy;
  state.localCurrBranch = remoteInitialCommitCopy.findBranchByGitId(
    remoteCurrBranch.gitId
  );

  return { clone: true };
};

const handle_add = (args, flags, state) => {
  const { currDir } = state;

  const results = args.map((arg) => {
    const fileSystemEntity = currDir.getChildByPathWithDeleted(arg);

    if (!fileSystemEntity) {
      return invalidPath(arg);
    }

    fileSystemEntity.stage();

    return "";
  });

  return results;
};

const handle_git_rm = (args, flags, state) => {
  const { currDir } = state;

  const results = args.map((arg) => {
    const fileSystemEntity = currDir.getChildByPathWithDeleted(arg);

    const rmResult = handle_rm([arg], flags, state);

    if (rmResult.length > 0 && rmResult[0] !== "") {
      return rmResult[0];
    }

    fileSystemEntity.stage();
    return "";
  });

  return results;
};

const handle_restore = (args, flags, state) => {
  const { currDir } = state;

  const isStaged = "--staged" in flags;

  const results = args.map((arg) => {
    const fileSystemEntity = currDir.getChildByPathWithDeleted(arg);
    if (!fileSystemEntity) {
      return invalidPath(arg);
    }

    fileSystemEntity.restore(isStaged);

    return "";
  });

  return results;
};

const handle_commit = (args, flags, state) => {
  const { currDir, homeDir, localCurrBranch } = state;

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
    canCommit = homeDir.canCommit(true);
  } else if (args.length === 0) {
    //commit all staged
    canCommit = homeDir.canCommit(false);
  } else {
    // get all changed files based on args except untracked files
    canCommit = args.every((arg) => {
      const fileSystemEntity = currDir.getChildByPathWithDeleted(arg);
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
    return errors;
  }

  if (!canCommit) {
    return noChangesToCommit;
  }

  let files = null;
  let pathAndStateValues = [];
  if (hasAllFlag) {
    ({ files, pathAndStateValues } = homeDir.commit(true, currDir));
  } else if (args.length === 0) {
    ({ files, pathAndStateValues } = homeDir.commit(false, currDir));
  } else {
    files = args.flatMap((arg) => {
      const fileSystemEntity = currDir.getChildByPathWithDeleted(arg);
      const commitResult = fileSystemEntity.commit(true, currDir);
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

  const commit = localCurrBranch.commitChanges(files, message);

  return {
    commit,
    result: getCommitOutput(commit.files, pathAndStateValues),
  };
};

//cannot handle merge conflicts
const handle_pull = (args, flags, state) => {
  const {
    homeDir,
    localInitialCommit,
    localCurrBranch,
    remoteInitialCommit,
    remoteCurrBranch,
  } = state;

  const remoteBranch = remoteInitialCommit.findBranchByGitId(
    localCurrBranch.gitId
  );

  if (!remoteBranch) {
    return branchNotRemote(localCurrBranch.name);
  }

  const { ahead, behind } =
    localCurrBranch.getNumCommitsDifferent(remoteBranch);

  if (behind === 0) {
    return pullUpToDate;
  }
  if (behind > 0 && ahead > 0) {
    return localRemoteDivergedPull;
  }

  const commits = remoteCurrBranch.getCommitHistory();
  const lastLocalCommit = localInitialCommit.mergeCommits(commits);

  const localBranch = localInitialCommit.findBranchByGitId(
    remoteCurrBranch.gitId
  );
  const localBranchCommit = localBranch.commit;
  localBranch.switchCommit(lastLocalCommit);

  let commitPath = null;
  if (localBranch.gitId === remoteCurrBranch.gitId) {
    commitPath = homeDir.updateToCommit(localBranchCommit, lastLocalCommit);
  }

  return { pull: { commitPath } };
};

const handle_push = (args, flags, state) => {
  const {
    localCurrBranch,
    remoteHomeDir,
    remoteInitialCommit,
    remoteCurrBranch,
  } = state;

  let remoteBranch = remoteInitialCommit.findBranchByGitId(
    localCurrBranch.gitId
  );

  if (remoteBranch) {
    const { ahead, behind } =
      localCurrBranch.getNumCommitsDifferent(remoteBranch);

    if (ahead === 0) {
      return pushUpToDate;
    }
    if (ahead > 0 && behind > 0) {
      return localRemoteDivergedPush;
    }
  }

  const commits = localCurrBranch.getCommitHistory();
  const lastRemoteCommit = remoteInitialCommit.mergeCommits(commits);

  // let remoteBranch = remoteInitialCommit.findBranchByGitId(currBranch.gitId);
  const remoteBranchCommit = remoteBranch?.commit;
  if (!remoteBranch) {
    remoteBranch = new Branch(localCurrBranch.name);
    remoteBranch.gitId = localCurrBranch.gitId;
  }
  remoteBranch.switchCommit(lastRemoteCommit);

  let commitPath = null;
  if (localCurrBranch.gitId === remoteCurrBranch.gitId) {
    commitPath = remoteHomeDir.updateToCommit(
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

const handle_branch = (args, flags, state) => {
  const { localInitialCommit, localCurrBranch } = state;
  const name = args[0];

  if (localInitialCommit.findBranchByName(name)) {
    return branchAlreadyExists(name);
  }
  const branch = new Branch(name);
  localCurrBranch.commit.insertBranch(branch);

  return "";
};

const handle_checkout = (args, flags, state) => {
  return changeBranchHelper(args, flags, "-b", state);
};

const handle_switch = (args, flags, state) => {
  return changeBranchHelper(args, flags, "-c", state);
};

const changeBranchHelper = (args, flags, createFlag, state) => {
  const { homeDir, localCurrBranch, localInitialCommit } = state;
  if (homeDir.isChanged()) {
    return checkoutHandleChanges;
  }

  const name = args[0];

  if (name === localCurrBranch.name) {
    return alreadyOnBranch(name);
  }

  let branch = localInitialCommit.findBranchByName(name);

  if (!branch && !(createFlag in flags)) {
    return branchNotFound(name);
  }

  if (!branch) {
    handle_branch([name], [], state);

    branch = localInitialCommit.findBranchByName(name);
  }

  homeDir.updateToCommit(localCurrBranch.commit, branch.commit);

  state.localCurrBranch = branch;

  return "";
};

const handle_status = (args, flags, state) => {
  const { currDir, homeDir, localCurrBranch, remoteInitialCommit } = state;

  return getStatusOutput(
    localCurrBranch,
    homeDir,
    remoteInitialCommit,
    currDir
  );
};

const GIT_COMMANDS_MAP = {
  clone: {
    method: handle_clone,
    maxArgs: 1,
    minArgs: 1,
    isClone: true,
    offsets: CLONE_OFFSETS,
  },
  add: {
    method: handle_add,
    minArgs: 1,
    offsets: ADD_OFFSETS,
  },
  rm: {
    method: handle_git_rm,
    minArgs: 1,
    offsets: GIT_RM_OFFSETS,
  },
  commit: {
    method: handle_commit,
    offsets: COMMIT_OFFSETS,
  },
  pull: { method: handle_pull, maxArgs: 0, offsets: PULL_OFFSETS },
  push: { method: handle_push, maxArgs: 0, offsets: PUSH_OFFSETS },
  branch: {
    method: handle_branch,
    minArgs: 1,
    maxArgs: 1,
    offsets: BRANCH_OFFSETS,
  },
  checkout: {
    method: handle_checkout,
    minArgs: 1,
    maxArgs: 1,
    offsets: SWITCH_OFFSETS,
  },
  switch: {
    method: handle_switch,
    minArgs: 1,
    maxArgs: 1,
    offsets: SWITCH_OFFSETS,
  },
  restore: {
    method: handle_restore,
    minArgs: 1,
    offsets: RESTORE_OFFSETS,
  },
  status: { method: handle_status, maxArgs: 0 },
};

const COMBINED_COMMANDS_MAP = {
  ...COMMANDS_MAP,
  git: { ...GIT_COMMANDS_MAP, isCommandsMap: true },
};

export { COMBINED_COMMANDS_MAP };
