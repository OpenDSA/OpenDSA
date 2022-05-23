import {
  colorNode,
  colors,
  delays,
  highlightNode,
  updateFileStructureVisualization,
} from "./fileStructure.js";
import { Directory, File, splitPath } from "./fileSystemEntity.js";

const handle_ls =
  (getSvgData, getCurrDir, setCurrDir, getHomeDir) => (args) => {
    let output = "";

    getCurrDir().contents.forEach((content) => {
      const contentName =
        content.name + (content instanceof Directory ? "/" : "");
      output += `<p>${contentName}</p>`;

      highlightNode(
        getSvgData().group,
        content.id,
        colors.highlight.background,
        content instanceof Directory
          ? colors.directory.background
          : colors.file.background,
        content instanceof Directory ? colors.directory.text : colors.file.text
      );
    });

    return output;
  };

const handle_pwd =
  (getSvgData, getCurrDir, setCurrDir, getHomeDir) => (args) => {
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
  (getSvgData, getCurrDir, setCurrDir, getHomeDir) => (args) => {
    if (args.length === 0) {
      colorNode(
        getSvgData().group,
        getCurrDir().id,
        colors.directory.background
      );

      setCurrDir(getHomeDir());

      colorNode(getSvgData().group, getCurrDir().id, colors.current.background);

      return "";
    } else {
      const path = args[0];
      const newDir = getCurrDir().getChildByPath(path);
      if (newDir && newDir instanceof Directory) {
        colorNode(
          getSvgData().group,
          getCurrDir().id,
          colors.directory.background
        );

        setCurrDir(newDir);

        colorNode(
          getSvgData().group,
          getCurrDir().id,
          colors.current.background
        );

        return "";
      } else {
        return "Invalid path";
      }
    }
  };

const handle_mkdir =
  (getSvgData, getCurrDir, setCurrDir, getHomeDir) => (args) => {
    if (args.length === 1) {
      const [name, path] = splitPath(args[0]);
      const dir = getCurrDir().getChildByPath(path);

      if (!dir) {
        return "Path undefined";
      } else if (
        dir.contents.some((fileSystemEntity) => fileSystemEntity.name === name)
      ) {
        return "Duplicate";
      } else {
        dir.insert(new Directory(name));

        updateFileStructureVisualization(
          getSvgData(),
          getHomeDir().mapToD3(),
          -1 * delays.paths.update
        );
        return "";
      }
    }
  };

const handle_touch =
  (getSvgData, getCurrDir, setCurrDir, getHomeDir) => (args) => {
    if (args.length === 1) {
      const [name, path] = splitPath(args[0]);
      const dir = getCurrDir().getChildByPath(path);

      if (!dir) {
        return "Path undefined";
      } else if (
        dir.contents.some((fileSystemEntity) => fileSystemEntity.name === name)
      ) {
        return "Duplicate";
      } else {
        dir.insert(new File(name));

        updateFileStructureVisualization(
          getSvgData(),
          getHomeDir().mapToD3(),
          -1 * delays.paths.update
        );

        return "";
      }
    }
  };

const handle_cp =
  (getSvgData, getCurrDir, setCurrDir, getHomeDir) => (args) => {
    if (args.length === 2) {
      const [srcName, srcPath] = splitPath(args[0]);
      const [dstName, dstPath] = splitPath(args[1]);

      const currDir = getCurrDir();

      const srcDir = getCurrDir().getChildByPath(srcPath);
      const dstDir = getCurrDir().getChildByPath(dstPath);

      if (srcDir instanceof Directory && dstDir instanceof Directory) {
        const src = srcDir.find(srcName);
        const dst = dstDir.find(dstName);
        if (dst instanceof Directory) {
          dst.insert(src.copy());
        } else {
          dstDir.insert(new File(srcName));
        }

        updateFileStructureVisualization(
          getSvgData(),
          getHomeDir().mapToD3(),
          -1 * delays.paths.update
        );

        return "";
      }
    }
  };

const handle_mv =
  (getSvgData, getCurrDir, setCurrDir, getHomeDir) => (args) => {
    if (args.length === 2) {
      const [srcName, srcPath] = splitPath(args[0]);
      const [dstName, dstPath] = splitPath(args[1]);

      const currDir = getCurrDir();

      const srcDir = getCurrDir().getChildByPath(srcPath);
      const dstDir = getCurrDir().getChildByPath(dstPath);

      if (srcDir instanceof Directory && dstDir instanceof Directory) {
        const src = srcDir.find(srcName);
        const dst = dstDir.find(dstName);
        if (dst instanceof Directory) {
          dst.insert(src.copy());
        } else {
          dstDir.insert(new File(srcName));
        }

        srcDir.remove(srcName);

        updateFileStructureVisualization(
          getSvgData(),
          getHomeDir().mapToD3(),
          0
        );

        return "";
      }
    }
  };

const handle_rm =
  (getSvgData, getCurrDir, setCurrDir, getHomeDir) => (args) => {
    if (args.length === 1 || args.length === 2) {
      const [srcName, srcPath] = splitPath(args[args.length - 1]);
      const srcDir = getCurrDir().getChildByPath(srcPath);
      if (srcDir instanceof Directory) {
        const toRemove = srcDir.find(srcName);

        if (toRemove instanceof Directory && args[0] !== "-r") {
          return "Cannot remove directory without -r";
        }

        srcDir.remove(srcName);

        updateFileStructureVisualization(
          getSvgData(),
          getHomeDir().mapToD3(),
          0
        );
      }
      return "";
    }
  };

const handle_rmdir =
  (getSvgData, getCurrDir, setCurrDir, getHomeDir) => (args) => {
    if (args.length === 1) {
      const [srcName, srcPath] = splitPath(args[0]);
      const srcDir = getCurrDir().getChildByPath(srcPath);
      if (srcDir instanceof Directory) {
        const src = srcDir.find(srcName);
        if (src instanceof Directory) {
          if (src.contents.length === 0) {
            srcDir.remove(srcName);

            updateFileStructureVisualization(
              getSvgData(),
              getHomeDir().mapToD3(),
              0
            );
          } else {
            return "Not empty";
          }
        }
      }
      return "";
    }
  };

function createCommandsMap(getSvgData, getCurrDir, setCurrDir, getHomeDir) {
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
  };

  Object.keys(commandsMap).forEach(
    (key) =>
      (commandsMap[key] = commandsMap[key](
        getSvgData,
        getCurrDir,
        setCurrDir,
        getHomeDir
      ))
  );

  return commandsMap;
}
//pipe
//cat
//head
//tail
//ls -a

export { createCommandsMap };
