const DEFAULT_TIMINGS = Object.freeze({
  localFileTree: {
    fileRectangles: {
      durations: { enter: 1000, update: 2000, exit: 1000 },
      delays: { enter: 3000, update: 2000, exit: 2000 },
    },
    fileLinks: {
      durations: { enter: 3000, update: 2000, exit: 3000 },
      delays: { enter: 3000, update: 2000, exit: 0 },
    },
  },
  localCommitTree: {
    commitCircles: {
      durations: { enter: 2000, update: 2000, exit: 1000 },
      delays: { enter: 1500, update: 1500, exit: 2000 },
    },
    commitLinks: {
      durations: { enter: 3000, update: 2000, exit: 3000 },
      delays: { enter: 1500, update: 2000, exit: 0 },
    },
    branchRectangles: {
      durations: { enter: 1000, update: 2000, exit: 1000 },
      delays: { enter: 3000, update: 1500, exit: 2000 },
    },
  },
  remoteFileTree: {
    fileRectangles: {
      durations: { enter: 2000, update: 2000, exit: 1000 },
      delays: { enter: 6000, update: 5000, exit: 5000 },
    },
    fileLinks: {
      durations: { enter: 3000, update: 2000, exit: 3000 },
      delays: { enter: 7000, update: 5000, exit: 3000 },
    },
  },
  remoteCommitTree: {
    commitCircles: {
      durations: { enter: 2000, update: 2000, exit: 1000 },
      delays: { enter: 0, update: 1500, exit: 2000 },
    },
    commitLinks: {
      durations: { enter: 3000, update: 2000, exit: 3000 },
      delays: { enter: 1000, update: 2000, exit: 0 },
    },
    branchRectangles: {
      durations: { enter: 1000, update: 2000, exit: 1000 },
      delays: { enter: 3000, update: 1000, exit: 2000 },
    },
  },
  commit: {
    durations: { enter: 1000, moving: 2000, exit: 1000 },
    delays: { enter: 0, moving: 0, exit: 0 },
  },
  push: {
    durations: { enter: 0, moving: 2000, exit: 1000 },
    delays: { enter: 0, moving: 6000, exit: 0 },
  },
  pull: {
    durations: { enter: 1000, exit: 1000 },
    delays: { enter: 3000, exit: 0 },
  },
});

const BASE_TIMINGS = Object.freeze({
  local: {
    fileTree: {
      fileRectangles: {
        durations: { enter: 0, update: 0, exit: 0 },
        delays: { enter: 0, update: 0, exit: 0 },
      },
      fileLinks: {
        durations: { enter: 0, update: 0, exit: 0 },
        delays: { enter: 0, update: 0, exit: 0 },
      },
    },
    commitTree: {
      commitCircles: {
        durations: { enter: 0, update: 0, exit: 0 },
        delays: { enter: 0, update: 0, exit: 0 },
      },
      commitLinks: {
        durations: { enter: 0, update: 0, exit: 0 },
        delays: { enter: 0, update: 0, exit: 0 },
      },
      branchRectangles: {
        durations: { enter: 0, update: 0, exit: 0 },
        delays: { enter: 0, update: 0, exit: 0 },
      },
    },
  },
  remote: {
    fileTree: {
      fileRectangles: {
        durations: { enter: 0, update: 0, exit: 0 },
        delays: { enter: 0, update: 0, exit: 0 },
      },
      fileLinks: {
        durations: { enter: 0, update: 0, exit: 0 },
        delays: { enter: 0, update: 0, exit: 0 },
      },
    },
    commitTree: {
      commitCircles: {
        durations: { enter: 0, update: 0, exit: 0 },
        delays: { enter: 0, update: 0, exit: 0 },
      },
      commitLinks: {
        durations: { enter: 0, update: 0, exit: 0 },
        delays: { enter: 0, update: 0, exit: 0 },
      },
      branchRectangles: {
        durations: { enter: 0, update: 0, exit: 0 },
        delays: { enter: 0, update: 0, exit: 0 },
      },
    },
  },
  commit: {
    durations: { enter: 0, moving: 0 },
    delays: { enter: 0, moving: 0 },
  },
  push: {
    durations: { enter: 0, moving: 0 },
    delays: { enter: 0, moving: 0 },
  },
  pull: {
    durations: { enter: 0, moving: 0 },
    delays: { enter: 0, moving: 0 },
  },
});

const BASE_FILE_TREE_TIMINGS = Object.freeze({
  fileRectangles: {
    durations: { enter: 0, update: 0, exit: 0 },
    delays: { enter: 0, update: 0, exit: 0 },
  },
  fileLinks: {
    durations: { enter: 0, update: 0, exit: 0 },
    delays: { enter: 0, update: 0, exit: 0 },
  },
});

const getAllObjectKeys = (obj, path) => {
  if (!(typeof obj === "object")) {
    return [path];
  }
  return Object.keys(obj).flatMap((key) =>
    getAllObjectKeys(obj[key], [...path, key])
  );
};

const copyBaseTimings = () => JSON.parse(JSON.stringify(BASE_TIMINGS));
const copyBaseFileTreeTimings = () =>
  JSON.parse(JSON.stringify(BASE_FILE_TREE_TIMINGS));

const getTimings = (offsets) => {
  const keys = getAllObjectKeys(offsets, []);
  const timings = copyBaseTimings();

  keys.forEach((key) => {
    setFromKeyPath(timings, key, getFromKeyPath(offsets, key));
  });

  return timings;
};

const getFileTreeTimings = (offsets) => {
  const keys = getAllObjectKeys(offsets, []);
  const timings = copyBaseFileTreeTimings();

  console.log("keys", keys, "timings", timings);

  keys.forEach((key) => {
    setFromKeyPath(timings, key, getFromKeyPath(offsets, key));
  });

  return timings;
};

const getFromKeyPath = (obj, path) => {
  return path.reduce((curr, key) => curr[key], obj);
};

const setFromKeyPath = (obj, path, value) => {
  const parent = getFromKeyPath(obj, path.slice(0, -1));
  const lastKey = path.pop();
  parent[lastKey] = parent[lastKey] + value;
};

const INITIALIZE_OFFSETS = {
  local: {
    fileTree: {
      fileRectangles: {
        durations: { enter: 1000 },
      },
      fileLinks: {
        durations: { enter: 3000 },
      },
    },
    commitTree: {
      commitCircles: {
        durations: { enter: 1000 },
      },
      commitLinks: {
        durations: { enter: 3000 },
      },
      branchRectangles: {
        durations: { enter: 1000 },
      },
    },
  },
  remote: {
    fileTree: {
      fileRectangles: {
        durations: { enter: 1000 },
      },
      fileLinks: {
        durations: { enter: 3000 },
      },
    },
    commitTree: {
      commitCircles: {
        durations: { enter: 1000 },
      },
      commitLinks: {
        durations: { enter: 3000 },
      },
      branchRectangles: {
        durations: { enter: 1000 },
      },
    },
  },
};

const RESET_OFFSETS = {
  local: {
    fileTree: {
      fileRectangles: {
        durations: { enter: 1000, exit: 1000 },
        delays: { enter: 3000, exit: 2000 },
      },
      fileLinks: {
        durations: { enter: 3000, exit: 3000 },
        delays: { enter: 3000 },
      },
    },
    commitTree: {
      commitCircles: {
        durations: { enter: 1000, exit: 1000 },
        delays: { enter: 3000, exit: 2000 },
      },
      commitLinks: {
        durations: { enter: 3000, exit: 3000 },
        delays: { enter: 3000 },
      },
      branchRectangles: {
        durations: { enter: 1000, exit: 1000 },
        delays: { enter: 3000, exit: 2000 },
      },
    },
  },
  remote: {
    fileTree: {
      fileRectangles: {
        durations: { enter: 1000, exit: 1000 },
        delays: { enter: 3000, exit: 2000 },
      },
      fileLinks: {
        durations: { enter: 3000, exit: 3000 },
        delays: { enter: 3000 },
      },
    },
    commitTree: {
      commitCircles: {
        durations: { enter: 1000, exit: 1000 },
        delays: { enter: 3000, exit: 2000 },
      },
      commitLinks: {
        durations: { enter: 3000, exit: 3000 },
        delays: { enter: 3000 },
      },
      branchRectangles: {
        durations: { enter: 1000, exit: 1000 },
        delays: { enter: 3000, exit: 2000 },
      },
    },
  },
};

const INITIALIZE_FILE_TREE_OFFSETS = {
  local: {
    fileTree: {
      fileRectangles: {
        durations: { enter: 1000 },
      },
      fileLinks: {
        durations: { enter: 3000 },
      },
    },
  },
};

const RESET_FILE_TREE_OFFSETS = {
  local: {
    fileTree: {
      fileRectangles: {
        durations: { enter: 1000, exit: 1000 },
        delays: { enter: 3000, exit: 2000 },
      },
      fileLinks: {
        durations: { enter: 3000, exit: 3000 },
        delays: { enter: 3000 },
      },
    },
  },
};

const CLONE_OFFSETS = {
  local: {
    fileTree: {
      fileRectangles: {
        durations: { enter: 2000 },
      },
      fileLinks: {
        durations: { enter: 3000 },
        delays: { enter: 1000 },
      },
    },
    commitTree: {
      commitCircles: {
        durations: { enter: 2000 },
      },
      commitLinks: {
        durations: { enter: 3000 },
        delays: { enter: 1000 },
      },
      branchRectangles: {
        durations: { enter: 2000 },
      },
    },
  },
};

const ADD_OFFSETS = {
  local: {
    fileTree: {
      fileRectangles: {
        durations: { update: 2000 },
      },
    },
  },
};

const FILE_TREE_OFFSETS = {
  fileRectangles: {
    durations: { enter: 1000, update: 2000, exit: 1000 },
    delays: { enter: 3000, update: 2000, exit: 2000 },
  },
  fileLinks: {
    durations: { enter: 3000, update: 2000, exit: 3000 },
    delays: { enter: 3000, update: 2000, exit: 0 },
  },
};

const FILE_TREE_OFFSETS_NO_EXIT = {
  fileRectangles: {
    durations: { enter: 1000, update: 2000, exit: 1000 },
    delays: { enter: 1000, update: 0, exit: 0 },
  },
  fileLinks: {
    durations: { enter: 3000, update: 2000, exit: 3000 },
    delays: { enter: 1000, update: 0, exit: 0 },
  },
};

const BASIC_COMMAND_OFFSETS = {
  local: { fileTree: FILE_TREE_OFFSETS },
};
const BASIC_COMMAND_OFFSETS_NO_EXIT = {
  local: { fileTree: FILE_TREE_OFFSETS_NO_EXIT },
};

const GIT_RM_OFFSETS = {
  local: {
    fileTree: FILE_TREE_OFFSETS,
  },
};

const COMMIT_OFFSETS = {
  local: {
    fileTree: {
      fileRectangles: {
        durations: { update: 2000 },
      },
    },
    commitTree: {
      commitCircles: {
        durations: { enter: 2000, update: 2000 },
        delays: { enter: 2000, update: 1000 },
      },
      commitLinks: {
        durations: { enter: 3000, update: 2000 },
        delays: { enter: 2500, update: 1000 },
      },
      branchRectangles: {
        durations: { update: 2000 },
        delays: { update: 1000 },
      },
    },
  },
  commit: {
    durations: { enter: 1000, moving: 2000, exit: 1000 },
    delays: { enter: 0, moving: 0, exit: 0 },
  },
};

const PUSH_OFFSETS = {
  remote: {
    fileTree: {
      fileRectangles: {
        durations: { enter: 2000, update: 2000, exit: 1000 },
        delays: { enter: 4000, update: 3000, exit: 3000 },
      },
      fileLinks: {
        durations: { enter: 3000, update: 2000, exit: 3000 },
        delays: { enter: 5000, update: 3000, exit: 1000 },
      },
    },
    commitTree: {
      commitCircles: {
        durations: { enter: 2000, update: 2000 },
        delays: { enter: 0, update: 0 },
      },
      commitLinks: {
        durations: { enter: 3000, update: 2000 },
        delays: { enter: 1000, update: 0 },
      },
      branchRectangles: {
        durations: { enter: 2000, update: 2000 },
        delays: { enter: 0, update: 0 },
      },
    },
  },
  push: {
    durations: { enter: 0, moving: 2000, exit: 1000 },
    delays: { enter: 0, moving: 4000, exit: 0 },
  },
};

const RESTORE_OFFSETS = {
  local: {
    fileTree: FILE_TREE_OFFSETS_NO_EXIT,
  },
};

const PULL_OFFSETS = {
  local: {
    fileTree: {
      fileRectangles: {
        durations: { enter: 2000, update: 2000, exit: 1000 },
        delays: { enter: 4000, update: 3000, exit: 3000 },
      },
      fileLinks: {
        durations: { enter: 3000, update: 2000, exit: 3000 },
        delays: { enter: 5000, update: 3000, exit: 1000 },
      },
    },
    commitTree: {
      commitCircles: {
        durations: { enter: 2000, update: 2000 },
        delays: { enter: 0, update: 0 },
      },
      commitLinks: {
        durations: { enter: 3000, update: 2000 },
        delays: { enter: 1000, update: 0 },
      },
      branchRectangles: {
        durations: { enter: 2000, update: 2000 },
        delays: { enter: 0, update: 0 },
      },
    },
  },
  pull: {
    durations: { enter: 0, moving: 2000, exit: 1000 },
    delays: { enter: 0, moving: 4000, exit: 0 },
  },
};

const BRANCH_OFFSETS = {
  local: {
    commitTree: {
      branchRectangles: {
        durations: { enter: 2000 },
      },
    },
  },
};

const SWITCH_OFFSETS = {
  local: {
    fileTree: FILE_TREE_OFFSETS,
    commitTree: {
      branchRectangles: {
        durations: { enter: 2000, update: 2000 },
      },
      commitCircles: {
        durations: { update: 2000 },
      },
    },
  },
};

export {
  DEFAULT_TIMINGS,
  getTimings,
  CLONE_OFFSETS,
  COMMIT_OFFSETS,
  ADD_OFFSETS,
  INITIALIZE_OFFSETS,
  INITIALIZE_FILE_TREE_OFFSETS,
  GIT_RM_OFFSETS,
  FILE_TREE_OFFSETS,
  FILE_TREE_OFFSETS_NO_EXIT,
  getFileTreeTimings,
  PUSH_OFFSETS,
  RESTORE_OFFSETS,
  BASIC_COMMAND_OFFSETS,
  BASIC_COMMAND_OFFSETS_NO_EXIT,
  PULL_OFFSETS,
  BRANCH_OFFSETS,
  SWITCH_OFFSETS,
  RESET_FILE_TREE_OFFSETS,
  RESET_OFFSETS,
};
