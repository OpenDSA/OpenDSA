const GIT_STATUSES = Object.freeze({
  ADDED: "added",
  REMOVED: "removed",
  MODIFIED: "modified",
  RENAMED: "renamed",
  UNTRACKED: "untracked",
  UNCHANGED: "unchanged",
});

const FILE_STATE = Object.freeze({
  NEW: "new file",
  DELETED: "deleted",
  MODIFIED: "modified",
  RENAMED: "renamed",
  UNCHANGED: "unchanged",
});

const GIT_STATE = Object.freeze({
  CHANGED: "changed",
  ADDED: "added",
  COMMITTED: "committed", //committed is also the default
});

export { GIT_STATUSES, FILE_STATE, GIT_STATE };
