import { delays } from "./fileStructure.js";
import { Branch, Commit } from "./gitClasses.js";
import { FILE_STATE, GIT_STATE } from "./gitStatuses.js";

const handle_git = (gitCommandsMap) => (args) => {
  if (gitCommandsMap[args[0]]) {
    return gitCommandsMap[args[0]](args.slice(1));
  } else {
    return `git ${args[0]} not supported`;
  }
};

const handle_clone =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    if (
      getHomeDir().contents.length === 0 &&
      !gitMethods.getLocalInitialCommit()
    ) {
      const remoteHomeDir = gitMethods.getRemoteHomeDir().copyWithGitId();
      remoteHomeDir.contents.forEach((content) => {
        getHomeDir().insert(content);
      });
      const remoteInitialCommit = gitMethods.getRemoteInitialCommit().copy();
      const remoteCurrBranch = gitMethods.getRemoteCurrBranch();
      gitMethods.setLocalInitialCommit(remoteInitialCommit);
      gitMethods.setLocalCurrBranch(
        remoteInitialCommit.findBranchByGitId(remoteCurrBranch.gitId)
      );

      updateVisualization(
        getSvgData(),
        getHomeDir(),
        -1 * delays.paths.update,
        null,
        gitMethods
      );

      return "Cloned";
    }

    return "Cannot clone unless local is empty";
  };

const handle_add =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    let notFound = [];
    args.forEach((path) => {
      const fileSystemEntity = getCurrDir().getChildByPath(path);

      if (fileSystemEntity) {
        fileSystemEntity.setStateConditional(
          GIT_STATE.CHANGED,
          GIT_STATE.ADDED
        );
      } else {
        notFound.push(path);
      }
    });

    updateVisualization(
      getSvgData(),
      getHomeDir(),
      -1 * delays.paths.update,
      null,
      gitMethods
    );
    return notFound.length === 0 ? "" : "Not found: " + notFound.join(", ");
  };

const handle_restore =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    let notFound = [];

    let isStaged = false;
    if (args.length > 0 && args[0] === "--staged") {
      isStaged = true;
      args = args.slice(1);
    }

    args.forEach((path) => {
      const fileSystemEntity = getCurrDir().getChildByPath(path);

      if (fileSystemEntity) {
        if (isStaged) {
          fileSystemEntity.setStateConditional(
            GIT_STATE.ADDED,
            GIT_STATE.CHANGED
          );
        } else {
          //TODO restore new files
          fileSystemEntity.setStateConditional(
            GIT_STATE.CHANGED,
            GIT_STATE.COMMITTED,
            null,
            FILE_STATE.UNCHANGED
          );
        }
      } else {
        notFound.push(path);
      }
    });
    return notFound.length === 0 ? "" : "Not found: " + notFound.join(", ");
  };

const handle_commit =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    const files = [
      ...getHomeDir().getByState(GIT_STATE.ADDED, FILE_STATE.NEW),
      ...getHomeDir().getByState(GIT_STATE.ADDED, FILE_STATE.MODIFIED),
      ...getHomeDir().getByState(GIT_STATE.ADDED, FILE_STATE.DELETED),
    ];
    const filesCopy = files.map((file) => file.copyWithGitId());
    getHomeDir().removeDeleted();
    if (files.length > 0) {
      const commit = gitMethods.getLocalCurrBranch().commitChanges(filesCopy);
      getHomeDir().setStateConditional(
        GIT_STATE.ADDED,
        GIT_STATE.COMMITTED,
        null,
        FILE_STATE.UNCHANGED
      );
      updateVisualization(
        getSvgData(),
        getHomeDir(),
        -1 * delays.paths.update,
        null,
        gitMethods
      );

      return "";
    } else {
      return "nothing to commit";
    }
  };

//cannot handle merge conflicts
const handle_pull =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    const localInitialCommit = gitMethods.getLocalInitialCommit();
    const currRemoteBranch = gitMethods.getRemoteCurrBranch();
    const commits = currRemoteBranch.getCommitHistory();
    const lastLocalCommit = localInitialCommit.mergeCommits(commits);

    const localBranch = localInitialCommit.findBranchByGitId(
      currRemoteBranch.gitId
    );
    const localBranchCommit = localBranch.commit;
    localBranch.switchCommit(lastLocalCommit);
    getHomeDir().updateToCommit(localBranchCommit, lastLocalCommit);

    updateVisualization(getSvgData(), getHomeDir(), 0, null, gitMethods);

    return "";
  };

const handle_push =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    const remoteInitialCommit = gitMethods.getRemoteInitialCommit();
    const currBranch = gitMethods.getLocalCurrBranch();
    const commits = currBranch.getCommitHistory();
    const lastRemoteCommit = remoteInitialCommit.mergeCommits(commits);

    let remoteBranch = remoteInitialCommit.findBranchByGitId(currBranch.gitId);
    const remoteBranchCommit = remoteBranch?.commit;
    if (!remoteBranch) {
      remoteBranch = new Branch(currBranch.name);
      remoteBranch.gitId = currBranch.gitId;
    }
    remoteBranch.switchCommit(lastRemoteCommit);

    if (currBranch.gitId === gitMethods.getRemoteCurrBranch().gitId) {
      gitMethods
        .getRemoteHomeDir()
        .updateToCommit(remoteBranchCommit, lastRemoteCommit);
    }

    updateVisualization(getSvgData(), getHomeDir(), 0, null, gitMethods);
    return "";
  };

const handle_branch =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    if (args.length === 1) {
      const name = args[0];
      if (gitMethods.getLocalInitialCommit().findBranchByName(name)) {
        return `${name} already exists`;
      }
      const branch = new Branch(name);
      gitMethods.getLocalCurrBranch().commit.insertBranch(branch);

      updateVisualization(
        getSvgData(),
        getHomeDir(),
        -1 * delays.paths.update,
        null,
        gitMethods
      );

      return "";
    }
    return "bad args";
  };

const handle_checkout =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    if (args.length === 1) {
      const name = args[0];
      const branch = gitMethods.getLocalInitialCommit().findBranchByName(name);

      if (branch) {
        getHomeDir().updateToCommit(
          gitMethods.getLocalCurrBranch().commit,
          branch.commit
        );

        gitMethods.setLocalCurrBranch(branch);

        updateVisualization(
          getSvgData(),
          getHomeDir(),
          -1 * delays.paths.update,
          null,
          gitMethods
        );

        return "";
      } else {
        return `${name} not found`;
      }
    }
    return "checkout";
  };

const handle_status =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    const output = [];

    const branchInfo = `<div class="git-status-branch"><p>On branch ${
      gitMethods.getLocalCurrBranch().name
    }</p><p>Your branch is up to date with 'origin/main'.</p></div>`;

    const createStatusSection = (
      title,
      className,
      gitState,
      fileStates,
      hideStates
    ) => {
      const files = getHomeDir().getByState(gitState, fileStates);

      if (files.length > 0) {
        const relativePaths = getCurrDir().getRelativePaths(files);
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
    clone: handle_clone,
    add: handle_add,
    commit: handle_commit,
    pull: handle_pull,
    push: handle_push,
    branch: handle_branch,
    checkout: handle_checkout,
    status: handle_status,
    restore: handle_restore,
  };

  Object.keys(commandsMap).forEach(
    (key) =>
      (commandsMap[key] = commandsMap[key](
        getSvgData,
        getCurrDir,
        setCurrDir,
        getHomeDir,
        updateVisualization,
        gitMethods
      ))
  );

  return commandsMap;
}

export { handle_git, createGitCommandsMap };
