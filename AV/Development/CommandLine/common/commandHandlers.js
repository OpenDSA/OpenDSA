import { colorNode, colors, delays, highlightNode } from "./fileStructure.js";
import { Directory, File, splitPath } from "./fileSystemEntity.js";
import { createGitCommandsMap, handle_git } from "./gitCommandHandlers.js";
import { FILE_STATE, GIT_STATE } from "./gitStatuses.js";

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
    let fileNames = [];

    getCurrDir()
      .contents.filter((content) => !content.getIsDeleted())
      .forEach((content) => {
        const contentName =
          content.name + (content instanceof Directory ? "/" : "");
        fileNames.push(contentName);

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
      });

    return `<div class="ls-files"><p>${fileNames.join("</p><p>")}</p></div>`;
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
    } else {
      const path = args[0];
      const newDir = getCurrDir().getChildByPath(path);
      if (newDir && newDir instanceof Directory) {
        setCurrDir(newDir);

        updateVisualization(
          getSvgData(),
          getHomeDir(),
          -1 * delays.paths.update,
          getCurrDir().id,
          gitMethods
        );

        return "";
      } else {
        return "Invalid path";
      }
    }
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
    if (args.length === 1) {
      const [name, path] = splitPath(args[0]);
      const dir = getCurrDir().getChildByPath(path);

      if (!dir) {
        return "Path undefined";
      } else {
        if (!dir.insert(new Directory(name))) {
          return "Duplicate";
        }

        updateVisualization(
          getSvgData(),
          getHomeDir(),
          -1 * delays.paths.update,
          getCurrDir().id,
          gitMethods
        );

        return "";
      }
    }
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
    if (args.length >= 1) {
      const results = args.map((arg) => {
        const [name, path] = splitPath(arg);
        const dir = getCurrDir().getChildByPath(path);

        if (!dir) {
          return `Path undefined ${arg}`;
        } else {
          if (!dir.insert(new File(name))) {
            return "Duplicate";
          }

          return "";
        }
      });

      const filteredResults = results.filter((result) => result !== "");

      updateVisualization(
        getSvgData(),
        getHomeDir(),
        -1 * delays.paths.update,
        getCurrDir().id,
        gitMethods
      );

      return filteredResults.join("\n");
    }
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
    if (args.length === 2) {
      const [srcName, srcPath] = splitPath(args[0]);
      const [dstName, dstPath] = splitPath(args[1]);

      const srcDir = getCurrDir().getChildByPath(srcPath);
      const dstDir = getCurrDir().getChildByPath(dstPath);

      if (srcDir instanceof Directory && dstDir instanceof Directory) {
        const src = srcDir.find(srcName);
        const dst = dstDir.find(dstName);

        //temp fix for special case
        if ((dstName === "~" || dstName === "/") && dstPath === "") {
          getHomeDir().insert(src.copy());
        } else if (dst instanceof Directory) {
          dst.insert(src.copy());
        } else {
          dstDir.insert(new File(dstName));
        }

        updateVisualization(
          getSvgData(),
          getHomeDir(),
          -1 * delays.paths.update,
          getCurrDir().id,
          gitMethods
        );

        return "";
      }
    }
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
    if (args.length === 2) {
      const [srcName, srcPath] = splitPath(args[0]);
      const [dstName, dstPath] = splitPath(args[1]);

      const srcDir = getCurrDir().getChildByPath(srcPath);
      const dstDir = getCurrDir().getChildByPath(dstPath);

      if (srcDir instanceof Directory && dstDir instanceof Directory) {
        const src = srcDir.find(srcName);
        const dst = dstDir.find(dstName);

        //temp fix for special case
        if ((dstName === "~" || dstName === "/") && dstPath === "") {
          getHomeDir().insert(src.copy());
        } else if (dst instanceof Directory) {
          dst.insert(src.copy());
        } else {
          dstDir.insert(new File(dstName));
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
      }
    }
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
    if (args.length === 1 || args.length === 2) {
      const [srcName, srcPath] = splitPath(args[args.length - 1]);
      const srcDir = getCurrDir().getChildByPath(srcPath);
      if (srcDir instanceof Directory) {
        const toRemove = srcDir.find(srcName);

        if (toRemove instanceof Directory && args[0] !== "-r") {
          return "Cannot remove directory without -r";
        }

        srcDir.remove(toRemove.id);

        updateVisualization(
          getSvgData(),
          getHomeDir(),
          0,
          getCurrDir().id,
          gitMethods
        );
      }
      return "";
    }
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
    if (args.length === 1) {
      const [srcName, srcPath] = splitPath(args[0]);
      const srcDir = getCurrDir().getChildByPath(srcPath);
      if (srcDir instanceof Directory) {
        const src = srcDir.find(srcName);
        if (src instanceof Directory) {
          if (src.contents.length === 0) {
            srcDir.remove(src.id);

            updateVisualization(
              getSvgData(),
              getHomeDir(),
              0,
              getCurrDir().id,
              gitMethods
            );
          } else {
            return "Not empty";
          }
        }
      }
      return "";
    }
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
    if (args.length === 1) {
      const path = args[0];
      const file = getCurrDir().getChildByPath(path);
      if (file && file instanceof File) {
        //TODO make conditional
        file.setState(GIT_STATE.CHANGED, FILE_STATE.MODIFIED);
        updateVisualization(
          getSvgData(),
          getHomeDir(),
          -1 * delays.paths.update,
          getCurrDir().id,
          gitMethods
        );
        return "";
      } else {
        return "Invalid path";
      }
    } else {
      return "Invalid args";
    }
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

export { createCommandsMap };
