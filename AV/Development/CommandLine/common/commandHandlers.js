import { colorNode, colors, delays, highlightNode } from "./fileStructure.js";
import { Directory, File } from "./fileSystemEntity.js";
import { createGitCommandsMap, handle_git } from "./gitCommandHandlers.js";
import { FILE_STATE, GIT_STATE } from "./gitStatuses.js";
import {
  tooManyArgs,
  notEnoughArgs,
  invalidPath,
  notADirectory,
  duplicate,
  missingRCopy,
  missingRRemove,
  overwriteFileWithDir,
  notEmpty,
  subdirectory,
  notAFile,
  removeDescendant,
} from "./errorMessages.js";

const createOutputList = (lines) => {
  lines = lines.filter((line) => line !== "");
  return lines.length > 0
    ? `<div class="output-list"><p>${lines.join("</p><p>")}</p></div>`
    : "";
};

const handle_ls = (getSvgData, getCurrDir) => (args) => {
  if (args.length > 1) {
    return tooManyArgs;
  }

  const dir =
    args.length === 0 ? getCurrDir() : getCurrDir().getChildByPath(args[0]);

  if (!dir) {
    return invalidPath(args[0]);
  }

  const contents = dir instanceof Directory ? dir.getContents() : [dir];
  const fileNames = contents.map((content) => {
    const contentName =
      content.name + (content instanceof Directory ? "/" : "");

    highlightNode(
      getSvgData().group,
      content.id,
      colors.highlight.background,
      content instanceof Directory
        ? colors.directory.background
        : colors.file.background,
      content instanceof Directory ? colors.directory.text : colors.file.text
    );

    return contentName;
  });

  return createOutputList(fileNames);
};

const handle_pwd = (getSvgData, getCurrDir) => (args) => {
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

  return path;
};

const handle_cd = (args, flags, getCurrDir, setCurrDir) => {
  if (args.length === 0) {
    setCurrDir(getCurrDir().getRoot());

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

  return "";
};

const handle_mkdir = (args, flags, getCurrDir, setCurrDir) => {
  const results = args.map((arg) => {
    const { parent, childName, error } = getDataByPathErrorWrapper(
      arg,
      getCurrDir()
    );

    if (error) {
      return error;
    }

    if (!parent.insert(new Directory(childName))) {
      return duplicate(arg);
    }

    return "";
  });

  return results;
};

const handle_touch = (args, flags, getCurrDir, setCurrDir) => {
  const results = args.map((arg) => {
    const { parent, childName, error, childNameIsDirectory } =
      getDataByPathErrorWrapper(arg, getCurrDir());

    if (error) {
      return error;
    }

    if (childNameIsDirectory) {
      return notAFile(arg);
    }

    if (!parent.insert(new File(childName))) {
      return duplicate(arg);
    }

    return "";
  });

  return results;
};

const handle_cp = (args, flags, getCurrDir, setCurrDir) => {
  const isRecursive = flags.includes("-r");
  const result = copyHelper(args, getCurrDir, isRecursive, false);
  return result;
};

const handle_mv = (args, flags, getCurrDir, setCurrDir) => {
  const result = copyHelper(args, getCurrDir, true, true);
  return result;
};

const handle_rm = (args, flags, getCurrDir, setCurrDir) => {
  const isRecursive = flags.includes("-r");

  const results = args.map((arg) => {
    const { parent, child, error } = getDataByPathErrorWrapper(
      arg,
      getCurrDir()
    );

    if (error) {
      return error;
    }

    if (!child) {
      return invalidPath(arg);
    }

    if (child instanceof Directory) {
      if (!isRecursive) {
        return missingRRemove(arg);
      }
      if (getCurrDir().isDescendantOf(child)) {
        return removeDescendant(arg);
      }
    }

    parent.remove(child.id);

    return "";
  });

  return results;
};

const handle_rmdir = (args, flags, getCurrDir, setCurrDir) => {
  const results = args.map((arg) => {
    const { parent, child, error } = getDataByPathErrorWrapper(
      arg,
      getCurrDir()
    );

    if (error) {
      return error;
    }

    if (!child) {
      return invalidPath(arg);
    }

    if (!(child instanceof Directory)) {
      return notADirectory(arg);
    }

    if (child.getContents().length > 0) {
      return notEmpty(arg);
    }

    parent.remove(child.id);

    return "";
  });

  return results;
};

const handle_vi = (args, flags, getCurrDir, setCurrDir) => {
  const results = args.map((arg) => {
    const file = getCurrDir().getChildByPath(arg);

    if (!(file instanceof File)) {
      return invalidPath(arg);
    }

    //TODO make conditional
    file.setState(GIT_STATE.CHANGED, FILE_STATE.MODIFIED);
    return "";
  });

  return results;
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
    cd: { method: handle_cd, maxArgs: 1, delay: -1 * delays.paths.update },
    mkdir: {
      method: handle_mkdir,
      minArgs: 1,
      delay: -1 * delays.paths.update,
    },
    touch: {
      method: handle_touch,
      minArgs: 1,
      delay: -1 * delays.paths.update,
    },
    cp: {
      method: handle_cp,
      minArgs: 2,
      delay: -1 * delays.paths.update,
    },
    mv: {
      method: handle_mv,
      minArgs: 2,
      delay: 0,
    },
    rm: {
      method: handle_rm,
      minArgs: 1,
      delay: 0,
    },
    rmdir: {
      method: handle_rmdir,
      minArgs: 1,
      delay: 0,
    },
    vi: {
      method: handle_vi,
      minArgs: 1,
      delay: -1 * delays.paths.update,
    },
    git: handle_git,
  };

  const gitCommandsMap = gitMethods
    ? createGitCommandsMap(
        getSvgData,
        getCurrDir,
        setCurrDir,
        getHomeDir,
        updateVisualization,
        //TODO decouple this later
        gitMethods
      )
    : null;

  Object.keys(commandsMap).forEach((key) => {
    if (key === "git") {
      commandsMap[key] = commandsMap[key](gitCommandsMap);
    } else if (key === "ls" || key === "pwd") {
      commandsMap[key] = commandsMap[key](getSvgData, getCurrDir);
    } else {
      const { method, minArgs, maxArgs, delay } = commandsMap[key];
      commandsMap[key] = initialize_command_handler(
        method,
        minArgs,
        maxArgs,
        getCurrDir,
        setCurrDir,
        getHomeDir,
        updateVisualization,
        delay,
        getSvgData,
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

const copyHelper = (args, getCurrDir, isRecursive, shouldRemove) => {
  const dstPath = args.slice(-1)[0];
  const dstData = getDataByPathErrorWrapper(dstPath, getCurrDir());
  if (dstData.error) {
    return dstData.error;
  }

  if (args.length > 2) {
    if (!dstData.child) {
      return invalidPath(dstPath);
    }
    if (!(dstData.child instanceof Directory)) {
      return notADirectory(dstPath);
    }
  }

  const results = args.slice(0, -1).map((arg) => {
    const srcData = getDataByPathErrorWrapper(arg, getCurrDir());

    if (srcData.error) {
      return srcData.error;
    }

    if (!srcData.child) {
      return invalidPath(arg);
    }

    if (srcData.child instanceof Directory) {
      if (!isRecursive) {
        return missingRCopy(arg);
      }
      if (dstData.child instanceof File) {
        return overwriteFileWithDir;
      }
    }

    if (
      srcData.child instanceof File &&
      !dstData.child &&
      dstData.childNameIsDirectory
    ) {
      return invalidPath(dstPath);
    }

    if (shouldRemove && dstData.child === srcData.child) {
      return "";
    }

    const copy = srcData.child.copy();
    let inserted = null;

    if (dstData.child instanceof Directory) {
      inserted = dstData.child.insert(copy);
    } else {
      copy.name = dstData.childName;
      inserted = dstData.parent.insert(copy);
    }

    if (shouldRemove) {
      if (srcData.child.findById(copy.id)) {
        dstData.parent.remove(copy.id);
        return subdirectory(arg, args.slice(-1)[0]);
      }
      if (inserted) {
        srcData.parent.remove(srcData.child.id);
      }
    }

    return "";
  });

  return createOutputList(results);
};

const getDataByPathErrorWrapper = (path, startDir) => {
  const data = startDir.getDataByPath(path);

  if (!(data.parent instanceof Directory)) {
    return {
      error: invalidPath(path),
    };
  }

  return data;
};

//used for commands that update the visualization
const initialize_command_handler =
  (
    handle_command,
    minArgs,
    maxArgs,
    getCurrDir,
    setCurrDir,
    getHomeDir,
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

    const result = handle_command(args, flags, getCurrDir, setCurrDir);
    const resultIsArray = Array.isArray(result);
    const wasSuccessful =
      result === "" || (resultIsArray && result.includes(""));

    if (!disableVisualization && wasSuccessful) {
      updateVisualization(
        getSvgData(),
        getHomeDir(),
        updateVisualizationDelay,
        getCurrDir().id,
        gitMethods
      );
    }

    return resultIsArray ? createOutputList(result) : result;
  };

export { createCommandsMap };
