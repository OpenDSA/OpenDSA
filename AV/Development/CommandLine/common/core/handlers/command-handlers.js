import { Directory, File } from "../classes/file-system-entity.js";
import {
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
} from "../config/error-messages.js";
import {
  BASIC_COMMAND_OFFSETS,
  BASIC_COMMAND_OFFSETS_NO_EXIT,
} from "../config/timing-offsets.js";
import {
  getLSHelperOutput,
  getLSOutput,
} from "../../command-handler-helpers/command-handlers-helpers.js";

const handle_ls = (args, flags, state) => {
  const { currDir } = state;

  if (args.length === 0) {
    return lsHelper(currDir);
  }

  if (args.length === 1) {
    return lsHelper(currDir, args[0]);
  }

  const errors = [];
  const results = [];
  const highlight = args.flatMap((arg) => {
    const result = lsHelper(currDir, arg, true);

    if (typeof result === "string") {
      errors.push(result);
      return [];
    } else {
      results.push(result.result);
      return result.highlight;
    }
  });

  return {
    highlight,
    result: getLSOutput(errors, results),
  };
};

const lsHelper = (currDir, path, includeTitle) => {
  const dir = path ? currDir.getChildByPath(path) : currDir;

  if (!dir) {
    return invalidPath(path);
  }

  const files = dir instanceof Directory ? dir.getContents() : [dir];
  let fileNames = files.map((file) => file.getName());
  if (includeTitle && dir instanceof Directory) {
    fileNames = [`${dir.name}:`, ...fileNames];
  }

  return {
    highlight: files,
    result: getLSHelperOutput(fileNames),
  };
};

const handle_pwd = (args, flags, state) => {
  const { currDir } = state;
  const path = currDir.getPath();

  return { result: path, highlight: [currDir] };
};

const handle_cd = (args, flags, state) => {
  const { currDir } = state;

  if (args.length === 0) {
    state.currDir = currDir.getRoot();

    return "";
  }

  const path = args[0];
  const newDir = currDir.getChildByPath(path);

  if (!newDir) {
    return invalidPath(args[0]);
  }

  if (!(newDir instanceof Directory)) {
    return notADirectory(args[0]);
  }

  state.currDir = newDir;

  return "";
};

const handle_mkdir = (args, flags, state) => {
  const { currDir } = state;

  const results = args.map((arg) => {
    const { parent, childName, error } = getDataByPathErrorWrapper(
      arg,
      currDir
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

const handle_touch = (args, flags, state) => {
  const { currDir } = state;

  const results = args.map((arg) => {
    const { parent, childName, error, childNameIsDirectory } =
      getDataByPathErrorWrapper(arg, currDir);

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

const handle_cp = (args, flags, state) => {
  const { currDir } = state;

  const isRecursive = "-r" in flags;
  const result = copyHelper(args, currDir, isRecursive, false);
  return result;
};

const handle_mv = (args, flags, state) => {
  const { currDir } = state;

  const result = copyHelper(args, currDir, true, true);
  return result;
};

const handle_rm = (args, flags, state) => {
  const { currDir } = state;

  const isRecursive = "-r" in flags;

  const results = args.map((arg) => {
    const { parent, child, error } = getDataByPathErrorWrapper(arg, currDir);

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
      if (currDir.isDescendantOf(child)) {
        return removeDescendant(arg);
      }
    }

    parent.remove(child.id);

    return "";
  });

  return results;
};

const handle_rmdir = (args, flags, state) => {
  const { currDir } = state;

  const results = args.map((arg) => {
    const { parent, child, error } = getDataByPathErrorWrapper(arg, currDir);

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

const handle_vi = (args, flags, state) => {
  const { currDir } = state;

  const results = args.map((arg) => {
    const file = currDir.getChildByPath(arg);

    if (!(file instanceof File)) {
      return invalidPath(arg);
    }

    file.modify();

    return "";
  });

  return results;
};

const copyHelper = (args, currDir, isRecursive, shouldRemove) => {
  const dstPath = args.slice(-1)[0];
  const dstData = getDataByPathErrorWrapper(dstPath, currDir);
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
    const srcData = getDataByPathErrorWrapper(arg, currDir);

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

  return results;
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

const COMMANDS_MAP = {
  ls: { method: handle_ls },
  pwd: { method: handle_pwd, maxArgs: 0 },
  cd: {
    method: handle_cd,
    maxArgs: 1,
    offsets: BASIC_COMMAND_OFFSETS_NO_EXIT,
  },
  mkdir: {
    method: handle_mkdir,
    minArgs: 1,
    offsets: BASIC_COMMAND_OFFSETS_NO_EXIT,
  },
  touch: {
    method: handle_touch,
    minArgs: 1,
    offsets: BASIC_COMMAND_OFFSETS_NO_EXIT,
  },
  cp: {
    method: handle_cp,
    minArgs: 2,
    offsets: BASIC_COMMAND_OFFSETS_NO_EXIT,
  },
  mv: {
    method: handle_mv,
    minArgs: 2,
    offsets: BASIC_COMMAND_OFFSETS,
  },
  rm: {
    method: handle_rm,
    minArgs: 1,
    offsets: BASIC_COMMAND_OFFSETS,
  },
  rmdir: {
    method: handle_rmdir,
    minArgs: 1,
    offsets: BASIC_COMMAND_OFFSETS,
  },
  vi: {
    method: handle_vi,
    minArgs: 1,
    offsets: BASIC_COMMAND_OFFSETS_NO_EXIT,
  },
};

export { handle_rm, COMMANDS_MAP };
