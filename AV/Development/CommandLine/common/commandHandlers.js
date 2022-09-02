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

const createOutputList = (lines) =>
  lines.length > 0
    ? `<div class="output-list"><p>${lines.join("</p><p>")}</p></div>`
    : "";

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

    const results = args
      .map((arg) => {
        const [name, path] = splitPath(arg);
        const dir = getCurrDir().getChildByPath(path);

        if (!(dir instanceof Directory)) {
          return invalidPath(arg);
        }

        if (!name) {
          return nameRequired(arg);
        }

        if (!dir.insert(new Directory(name))) {
          return duplicate(arg);
        }

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

    const results = args
      .map((arg) => {
        const [name, path] = splitPath(arg);
        const dir = getCurrDir().getChildByPath(path);

        if (!(dir instanceof Directory)) {
          return invalidPath(arg);
        }

        if (!name) {
          return nameRequired(arg);
        }

        if (!dir.insert(new File(name))) {
          return duplicate(arg);
        }

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
    if (args.length < 2) {
      return notEnoughArgs;
    }

    if (args.length > 3) {
      return tooManyArgs;
    }

    let isRecursive = false;
    if (args.length === 3) {
      if (args.includes("-r")) {
        isRecursive = true;
        args = args.filter((arg) => arg !== "-r");
      } else {
        return tooManyArgs;
      }
    }

    const [srcName, srcPath] = splitPath(args[0]);
    const [dstName, dstPath] = splitPath(args[1]);

    const srcDir = getCurrDir().getChildByPath(srcPath);
    const dstDir = getCurrDir().getChildByPath(dstPath);

    if (!(srcDir instanceof Directory)) {
      return invalidPath(args[0]);
    }

    if (!(dstDir instanceof Directory)) {
      return invalidPath(args[1]);
    }

    const src = srcDir.find(srcName);
    const dst = dstDir.find(dstName);

    if (!src) {
      return invalidPath(args[0]);
    }

    if (src instanceof Directory) {
      if (!isRecursive) {
        return missingRCopy;
      }
      if (dst instanceof File) {
        return overwriteFileWithDir;
      }
    }

    const copy = src.copy();
    //temp fix for special case
    if ((dstName === "~" || dstName === "/") && dstPath === "") {
      getHomeDir().insert(copy);
    } else if (dst instanceof Directory) {
      dst.insert(copy);
    } else {
      copy.name = dstName;
      dstDir.insert(copy);
    }

    updateVisualization(
      getSvgData(),
      getHomeDir(),
      -1 * delays.paths.update,
      getCurrDir().id,
      gitMethods
    );

    return "";
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

    if (args.length > 2) {
      return tooManyArgs;
    }

    const [srcName, srcPath] = splitPath(args[0]);
    const [dstName, dstPath] = splitPath(args[1]);

    const srcDir = getCurrDir().getChildByPath(srcPath);
    const dstDir = getCurrDir().getChildByPath(dstPath);

    if (!(srcDir instanceof Directory)) {
      return invalidPath(args[0]);
    }

    if (!(dstDir instanceof Directory)) {
      return invalidPath(args[1]);
    }

    const src = srcDir.find(srcName);
    const dst = dstDir.find(dstName);

    if (!src) {
      return invalidPath(args[0]);
    }

    if (src instanceof Directory && dst instanceof File) {
      return overwriteFileWithDir;
    }

    const copy = src.copy();
    //temp fix for special case
    if ((dstName === "~" || dstName === "/") && dstPath === "") {
      getHomeDir().insert(copy);
    } else if (dst instanceof Directory) {
      dst.insert(copy);
    } else {
      copy.name = dstName;
      dstDir.insert(copy);
    }

    srcDir.remove(src.id);

    updateVisualization(
      getSvgData(),
      getHomeDir(),
      0,
      getCurrDir().id,
      gitMethods
    );

    return "";
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
    if (args.length < 1) {
      return notEnoughArgs;
    }

    let isRecursive = false;

    if (args.includes("-r")) {
      isRecursive = true;
      args = args.filter((arg) => arg !== "-r");
    }

    const results = args
      .map((arg) => {
        const [name, path] = splitPath(arg);
        const dir = getCurrDir().getChildByPath(path);

        if (!(dir instanceof Directory)) {
          return invalidPath(arg);
        }

        if (!name) {
          return nameRequired(arg);
        }

        const toRemove = dir.find(name);

        if (!toRemove) {
          return invalidPath(arg);
        }

        if (toRemove instanceof Directory && !isRecursive) {
          return missingRRemove(arg);
        }

        dir.remove(toRemove.id);

        return "";
      })
      .filter((result) => result !== "");

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

    const results = args
      .map((arg) => {
        const [name, path] = splitPath(arg);
        const dir = getCurrDir().getChildByPath(path);

        if (!(dir instanceof Directory)) {
          return invalidPath(arg);
        }

        if (!name) {
          return nameRequired(arg);
        }

        const toRemove = dir.find(name);

        if (!toRemove) {
          return invalidPath(arg);
        }

        if (!(toRemove instanceof Directory)) {
          return notADirectory(arg);
        }

        if (toRemove.contents.length > 0) {
          return notEmpty(arg);
        }

        dir.remove(toRemove.id);

        return "";
      })
      .filter((result) => result !== "");

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

const followPath = (path, dir) => {
  const [childName, parentPath] = splitPath(path);
  const parentDir = dir.getChildByPath(parentPath);

  if (!(parentDir instanceof Directory)) {
    return invalidPath(path);
  }

  const child = parentDir.find(childName);

  return { child, parentDir, childName };
};

export { createCommandsMap };
