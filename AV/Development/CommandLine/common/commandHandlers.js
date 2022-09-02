import { colorNode, colors, delays, highlightNode } from "./fileStructure.js";
import { Directory, File, splitPath } from "./fileSystemEntity.js";
import { createGitCommandsMap, handle_git } from "./gitCommandHandlers.js";
import { FILE_STATE, GIT_STATE } from "./gitStatuses.js";

const tooManyArgs = "Too many arguments";
const notEnoughArgs = "Not enough arguments";
const invalidPath = (path) => `'${path}' is not a valid path`;
const notADirectory = (path) => `'${path}' is not a directory`;
const nameRequired = (path) => `'${path}' does not specify name`;
const duplicate = (path) => `'${path}' already exists`;
const missingRCopy = `Cannot copy directory without -r`;
const missingRRemove = (path) =>
  `'${path}' is a directory. Cannot remove directory without -r`;
const overwriteFileWithDir = `Cannot overwrite file with directory`;
const notEmpty = (path) => `'${path}' is not empty`;

const createOutputList = (lines) => {
  lines = lines.filter((line) => line !== "");
  return lines.length > 0
    ? `<div class="output-list"><p>${lines.join("</p><p>")}</p></div>`
    : "";
};

const handle_ls =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    if (args.length > 2) {
      return tooManyArgs;
    }

    const dir =
      args.length === 0 ? getCurrDir() : getCurrDir().getChildByPath(args[0]);

    if (!dir) {
      return invalidPath(args[0]);
    }

    const contents = dir instanceof Directory ? dir.contents : [dir];
    const fileNames = contents
      .filter((content) => !content.getIsDeleted())
      .map((content) => {
        const contentName =
          content.name + (content instanceof Directory ? "/" : "");

        highlightNode(
          getSvgData().group,
          content.id,
          colors.highlight.background,
          content instanceof Directory
            ? colors.directory.background
            : colors.file.background,
          content instanceof Directory
            ? colors.directory.text
            : colors.file.text
        );

        return contentName;
      });

    return createOutputList(fileNames);
  };

const handle_pwd =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    if (args.length > 0) {
      return tooManyArgs;
    }

    const path = getCurrDir().getPath();

    highlightNode(
      getSvgData().group,
      getCurrDir().id,
      colors.highlight.background,
      colors.current.background,
      colors.current.text
    );
    return path || "/";
  };

const handle_cd =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    if (args.length > 1) {
      return tooManyArgs;
    }

    if (args.length === 0) {
      setCurrDir(getHomeDir());

      updateVisualization(
        getSvgData(),
        getHomeDir(),
        -1 * delays.paths.update,
        getCurrDir().id,
        gitMethods
      );

      return "";
    }

    const path = args[0];
    const newDir = getCurrDir().getChildByPath(path);

    if (!newDir) {
      return invalidPath(args[0]);
    }

    if (!(newDir instanceof Directory)) {
      return notADirectory(args[0]);
    }

    setCurrDir(newDir);

    updateVisualization(
      getSvgData(),
      getHomeDir(),
      -1 * delays.paths.update,
      getCurrDir().id,
      gitMethods
    );

    return "";
  };

const handle_mkdir =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    if (args.length === 0) {
      return notEnoughArgs;
    }

    const results = args.map((arg) => {
      const { parent, childName, error } = followPath(arg, getCurrDir());

      if (error) {
        return error;
      }

      if (!parent.insert(new Directory(childName))) {
        return duplicate(arg);
      }

      return "";
    });

    updateVisualization(
      getSvgData(),
      getHomeDir(),
      -1 * delays.paths.update,
      getCurrDir().id,
      gitMethods
    );

    return createOutputList(results);
  };

const handle_touch =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    if (args.length === 0) {
      return notEnoughArgs;
    }

    const results = args.map((arg) => {
      const { parent, childName, error } = followPath(arg, getCurrDir());

      if (error) {
        return error;
      }

      if (!parent.insert(new File(childName))) {
        return duplicate(arg);
      }

      return "";
    });

    updateVisualization(
      getSvgData(),
      getHomeDir(),
      -1 * delays.paths.update,
      getCurrDir().id,
      gitMethods
    );

    return createOutputList(results);
  };

const handle_cp =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    const isRecursive = args.includes("-r");
    if (isRecursive) {
      args = args.filter((arg) => arg !== "-r");
    }

    if (args.length < 2) {
      return notEnoughArgs;
    }

    const results = copyHelper(
      args,
      getCurrDir,
      getHomeDir,
      isRecursive,
      false
    );

    updateVisualization(
      getSvgData(),
      getHomeDir(),
      -1 * delays.paths.update,
      getCurrDir().id,
      gitMethods
    );

    return createOutputList(results);
  };

const handle_mv =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    if (args.length < 2) {
      return notEnoughArgs;
    }

    const results = copyHelper(args, getCurrDir, getHomeDir, true, true);

    updateVisualization(
      getSvgData(),
      getHomeDir(),
      0,
      getCurrDir().id,
      gitMethods
    );

    return createOutputList(results);
  };

const handle_rm =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    const isRecursive = args.includes("-r");
    if (isRecursive) {
      args = args.filter((arg) => arg !== "-r");
    }

    if (args.length < 1) {
      return notEnoughArgs;
    }

    const results = args.map((arg) => {
      const { parent, child, error } = followPath(arg, getCurrDir());

      if (error) {
        return error;
      }

      if (!child) {
        return invalidPath(arg);
      }

      if (child instanceof Directory && !isRecursive) {
        return missingRRemove(arg);
      }

      parent.remove(child.id);

      return "";
    });

    updateVisualization(
      getSvgData(),
      getHomeDir(),
      0,
      getCurrDir().id,
      gitMethods
    );

    return createOutputList(results);
  };

const handle_rmdir =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    if (args.length < 1) {
      return notEnoughArgs;
    }

    const results = args.map((arg) => {
      const { parent, child, error } = followPath(arg, getCurrDir());

      if (error) {
        return error;
      }

      if (!child) {
        return invalidPath(arg);
      }

      if (!(child instanceof Directory)) {
        return notADirectory(arg);
      }

      if (child.contents.length > 0) {
        return notEmpty(arg);
      }

      parent.remove(child.id);

      return "";
    });

    updateVisualization(
      getSvgData(),
      getHomeDir(),
      0,
      getCurrDir().id,
      gitMethods
    );

    return createOutputList(results);
  };

const handle_vi =
  (
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    gitMethods
  ) =>
  (args) => {
    if (args.length < 1) {
      return notEnoughArgs;
    }

    const results = args
      .map((arg) => {
        const file = getCurrDir().getChildByPath(arg);

        if (!(file instanceof File)) {
          return invalidPath(arg);
        }

        //TODO make conditional
        file.setState(GIT_STATE.CHANGED, FILE_STATE.MODIFIED);
        return "";
      })
      .filter((result) => result !== "");

    updateVisualization(
      getSvgData(),
      getHomeDir(),
      -1 * delays.paths.update,
      getCurrDir().id,
      gitMethods
    );

    return createOutputList(results);
  };

function createCommandsMap(
  getSvgData,
  getCurrDir,
  setCurrDir,
  getHomeDir,
  //TODO decouple this later
  updateVisualization,
  gitMethods
) {
  const commandsMap = {
    ls: handle_ls,
    pwd: handle_pwd,
    cd: handle_cd,
    mkdir: handle_mkdir,
    touch: handle_touch,
    cp: handle_cp,
    mv: handle_mv,
    rm: handle_rm,
    rmdir: handle_rmdir,
    vi: handle_vi,
    git: handle_git,
  };

  const gitCommandsMap = createGitCommandsMap(
    getSvgData,
    getCurrDir,
    setCurrDir,
    getHomeDir,
    updateVisualization,
    //TODO decouple this later
    gitMethods
  );

  Object.keys(commandsMap).forEach((key) => {
    if (key === "git") {
      commandsMap[key] = commandsMap[key](gitCommandsMap);
    } else {
      commandsMap[key] = commandsMap[key](
        getSvgData,
        getCurrDir,
        setCurrDir,
        getHomeDir,
        updateVisualization,
        gitMethods
      );
    }
  });

  return commandsMap;
}
//pipe
//cat
//head
//tail
//ls -a

const followPath = (path, startDir) => {
  const [childName, parentPath] = splitPath(path);
  const parent = startDir.getChildByPath(parentPath);

  if (!(parent instanceof Directory)) {
    return {
      error: invalidPath(path),
    };
  }

  const child = parent.find(childName);

  return { child, parent, childName, parentPath };
};

const copyHelper = (
  args,
  getCurrDir,
  getHomeDir,
  isRecursive,
  shouldRemove
) => {
  const dstData = followPath(args.slice(-1)[0], getCurrDir());
  if (dstData.error) {
    return dstData.error;
  }

  const results = args.slice(0, -1).map((arg) => {
    const srcData = followPath(arg, getCurrDir());

    if (srcData.error) {
      return srcData.error;
    }

    if (!srcData.child) {
      return invalidPath(arg);
    }

    if (srcData.child instanceof Directory) {
      if (!isRecursive) {
        return missingRCopy;
      }
      if (dstData.child instanceof File) {
        return overwriteFileWithDir;
      }
    }

    const copy = srcData.child.copy();
    //temp fix for special case
    if (
      (dstData.childName === "~" || dstData.childName === "/") &&
      dstData.parentPath === ""
    ) {
      getHomeDir().insert(copy);
    } else if (dstData.child instanceof Directory) {
      dstData.child.insert(copy);
    } else {
      copy.name = dstData.childName;
      dstData.parent.insert(copy);
    }

    if (shouldRemove) {
      srcData.parent.remove(srcData.child.id);
    }

    return "";
  });

  return results;
};

export { createCommandsMap };
