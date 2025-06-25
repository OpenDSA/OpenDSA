import { FILE_STATE } from "../config/file-states.js";

let count = 0;
let gitIdCount = 0;

class FileSystemEntity {
  constructor(name) {
    this.name = name;
    this.parent = undefined;
    this.id = ++count;
    this.gitId = ++gitIdCount;
  }

  getPath() {
    const pathNames = [];

    let curr = this;

    do {
      pathNames.unshift(curr.name);
      curr = curr.parent;
    } while (curr);

    return pathNames.join("/").substring(1) || "/";
  }

  getRoot() {
    let curr = this;

    while (curr.parent) {
      curr = curr.parent;
    }

    return curr;
  }

  isDescendantOf(directory) {
    let curr = this;

    while (curr) {
      if (curr.id === directory.id) {
        return true;
      }
      curr = curr.parent;
    }

    return false;
  }

  getByPathArray(path) {
    let curr = this;
    path.every((name) => {
      curr = curr.find(name);
      return Boolean(curr);
    });
    return curr;
  }

  getDataByPath(path, includeDeleted) {
    const pathInfo = getPathInfo(path);

    let parent = pathInfo.isAbsolute ? this.getRoot() : this;
    parent = parent.getByPathArray(pathInfo.parentPath);

    let child =
      pathInfo.isAbsolute && !pathInfo.childName
        ? parent
        : parent
        ? parent.find(pathInfo.childName, includeDeleted)
        : null;

    if (pathInfo.childNameIsDirectory && !(child instanceof Directory)) {
      child = null;
    }

    return {
      parent,
      child,
      childName: pathInfo.childName,
      childNameIsDirectory: pathInfo.childNameIsDirectory,
    };
  }

  getChildByPath(path, includeDeleted) {
    return this.getDataByPath(path, includeDeleted).child;
  }

  getChildByPathWithDeleted(path) {
    return this.getChildByPath(path, true);
  }

  getStagingAreaFiles() {
    return [
      ...this.getByState(null, FILE_STATE.NEW),
      ...this.getByState(null, FILE_STATE.MODIFIED),
      ...this.getByState(null, FILE_STATE.DELETED),
    ];
  }

  getWorkingAreaFiles() {
    return [
      ...this.getByState(FILE_STATE.MODIFIED),
      ...this.getByState(FILE_STATE.DELETED),
    ];
  }

  getUntrackedFiles() {
    return this.getByState(FILE_STATE.NEW);
  }

  // for use when committing with -a or file path
  getWorkingAndStagingAreaFiles() {
    return [
      ...this.getByState(
        [FILE_STATE.MODIFIED, FILE_STATE.UNCHANGED],
        FILE_STATE.NEW
      ),
      ...this.getByState([FILE_STATE.UNCHANGED], FILE_STATE.DELETED),
      ...this.getByState(null, FILE_STATE.MODIFIED),
    ];
  }

  commit(includeUnstaged, startDir) {
    if (includeUnstaged) {
      this.stage(true);
    }

    const files = this.getStagingAreaFiles();

    const pathAndStateValues = startDir.getSortedPathAndStateValues(
      files,
      true,
      false
    );

    const toCommit = copyFiles(files);

    this.handleStateOnCommit();

    return { files: toCommit, pathAndStateValues };
  }

  stage(ignoreUntracked) {
    this.handleStateOnStage(ignoreUntracked);
  }

  restore(staged) {
    this.handleStateOnRestore(staged);
  }

  removeSelf() {
    this.parent.contents = this.parent.contents.filter(
      (content) => content !== this
    );
    this.parent = null;
  }
}

class File extends FileSystemEntity {
  constructor(name) {
    super(name);
    this.workingState = FILE_STATE.NEW;
    this.stagingState = FILE_STATE.UNCHANGED;
  }

  handleStateOnDelete() {
    if (
      this.isWorkingState(FILE_STATE.NEW) &&
      this.isStagingState(FILE_STATE.UNCHANGED)
    ) {
      this.removeSelf();
    } else if (
      this.isWorkingState(FILE_STATE.NEW) &&
      this.isStagingState(FILE_STATE.DELETED)
    ) {
      this.setWorkingState(FILE_STATE.UNCHANGED);
    } else {
      this.setWorkingState(FILE_STATE.DELETED);
    }
  }

  handleStateOnCreate() {
    if (this.isWorkingState(FILE_STATE.DELETED)) {
      this.setWorkingState(FILE_STATE.UNCHANGED);
    } else {
      this.setWorkingState(FILE_STATE.NEW);
    }
  }

  handleStateOnModify() {
    if (this.isWorkingState(FILE_STATE.UNCHANGED)) {
      this.setWorkingState(FILE_STATE.MODIFIED);
    }
  }

  modify() {
    this.handleStateOnModify();
  }

  handleStateOnStage(ignoreUntracked) {
    if (ignoreUntracked && this.isWorkingState(FILE_STATE.NEW)) {
      return;
    }

    if (this.isStagingState(FILE_STATE.NEW)) {
      if (this.isWorkingState(FILE_STATE.DELETED)) {
        this.removeSelf();
        // this.setStagingState(FILE_STATE.UNCHANGED);
      }
    } else if (this.isStagingState(FILE_STATE.DELETED)) {
      if (this.isWorkingState(FILE_STATE.NEW)) {
        this.setStagingState(FILE_STATE.UNCHANGED);
      }
    } else if (this.isStagingState(FILE_STATE.MODIFIED)) {
      if (this.isWorkingState(FILE_STATE.DELETED)) {
        this.setStagingState(FILE_STATE.DELETED);
      }
    } else if (this.isStagingState(FILE_STATE.UNCHANGED)) {
      this.setStagingState(this.getWorkingState());
    }
    this.setWorkingState(FILE_STATE.UNCHANGED);
  }

  handleStateOnRestore(staged) {
    if (staged) {
      if (
        (this.isStagingState(FILE_STATE.DELETED) &&
          this.isWorkingState(FILE_STATE.NEW)) ||
        (this.isStagingState(FILE_STATE.NEW) &&
          this.isWorkingState(FILE_STATE.DELETED))
      ) {
        this.setWorkingState(FILE_STATE.UNCHANGED);
      } else if (
        this.isStagingState(FILE_STATE.MODIFIED) &&
        this.isWorkingState(FILE_STATE.DELETED)
      ) {
        this.setWorkingState(FILE_STATE.DELETED);
      } else {
        if (!this.isStagingState(FILE_STATE.UNCHANGED)) {
          this.setWorkingState(this.getStagingState());
        }
      }
      this.setStagingState(FILE_STATE.UNCHANGED);
    } else {
      if (!this.isWorkingState(FILE_STATE.NEW)) {
        this.setWorkingState(FILE_STATE.UNCHANGED);
      }
    }
  }

  handleStateOnCommit() {
    if (
      this.isStagingState(FILE_STATE.DELETED) &&
      this.isWorkingState(FILE_STATE.UNCHANGED)
    ) {
      this.removeSelf();
    } else {
      this.setStagingState(FILE_STATE.UNCHANGED);
    }
  }

  canCommit(includeUnstaged) {
    return (
      (!includeUnstaged && this.isStaged()) ||
      (includeUnstaged &&
        (this.isStaged() ||
          (this.isChangedInWorkingArea() && !this.isUntracked())) &&
        !(
          (this.isWorkingState(FILE_STATE.DELETED) &&
            this.isStagingState(FILE_STATE.NEW)) ||
          (this.isWorkingState(FILE_STATE.NEW) &&
            this.isStagingState(FILE_STATE.DELETED))
        ))
    );
  }

  getIsDeleted() {
    return (
      this.isWorkingState(FILE_STATE.DELETED) ||
      (this.isStagingState(FILE_STATE.DELETED) &&
        !this.isWorkingState(FILE_STATE.NEW))
    );
  }

  copy() {
    const newFile = new File(this.name);
    return newFile;
  }

  copyWithGitId() {
    const newFile = new File(this.name);
    newFile.gitId = this.gitId;
    newFile.parentGitId = this.parent?.gitId;
    newFile.setWorkingState(this.getWorkingState());
    newFile.setStagingState(this.getStagingState());
    return newFile;
  }

  mapToD3() {
    return {
      name: this.name,
      id: this.id,
      gitId: this.gitId,
      isDirectory: false,
      isChanged: this.isChangedInWorkingArea(),
      isStaged: this.isStaged(),
    };
  }

  //Returns null because file can't have children
  find(name) {
    return null;
  }

  findDeep(name) {
    return name === this.name ? this : null;
  }

  findByGitId(id) {
    return this.gitId === id ? this : null;
  }

  findById(id) {
    return this.id === id ? this : null;
  }

  compareByName(file) {
    return file.name === this.name;
  }

  compareByNameUnordered(file) {
    return file instanceof File && file.name === this.name;
  }

  setState(workingState, stagingState) {
    if (workingState) {
      this.setWorkingState(workingState);
    }
    if (stagingState) {
      this.setStagingState(stagingState);
    }
  }

  setWorkingState(workingState) {
    this.workingState = workingState;
  }

  setStagingState(stagingState) {
    this.stagingState = stagingState;
  }

  getWorkingState() {
    return this.workingState;
  }

  getStagingState() {
    return this.stagingState;
  }

  isState(workingStates, stagingStates) {
    return (
      (!workingStates || this.isWorkingState(workingStates)) &&
      (!stagingStates || this.isStagingState(stagingStates))
    );
  }

  isWorkingState(workingStates) {
    return Array.isArray(workingStates)
      ? workingStates.includes(this.workingState)
      : workingStates === this.workingState;
  }

  isStagingState(stagingStates) {
    return Array.isArray(stagingStates)
      ? stagingStates.includes(this.stagingState)
      : stagingStates === this.stagingState;
  }

  isStaged() {
    return this.isStagingState([
      FILE_STATE.DELETED,
      FILE_STATE.MODIFIED,
      FILE_STATE.NEW,
    ]);
  }

  isChangedInWorkingArea() {
    return this.isWorkingState([
      FILE_STATE.DELETED,
      FILE_STATE.MODIFIED,
      FILE_STATE.NEW,
    ]);
  }

  isChanged() {
    return this.isStaged() || this.isChangedInWorkingArea();
  }

  isUnchanged() {
    return (
      this.isWorkingState(FILE_STATE.UNCHANGED) &&
      this.isStagingState(FILE_STATE.UNCHANGED)
    );
  }

  isUntracked() {
    return this.isWorkingState(FILE_STATE.NEW);
  }

  setStateConditional(
    oldWorkingStates,
    newWorkingState,
    oldStagingStates,
    newStagingState
  ) {
    if (this.isState(oldWorkingStates, oldStagingStates)) {
      this.setState(newWorkingState, newStagingState);
      return true;
    }
    return false;
  }

  getByStateHelper(workingStates, stagingStates) {
    const isSameState = this.isState(workingStates, stagingStates);
    return {
      isSameState: isSameState,
      sameStateContent: isSameState ? [this] : [],
    };
  }

  getByState(workingStates, stagingStates) {
    return this.isState(workingStates, stagingStates) ? [this] : [];
  }

  getState() {
    return {
      workingState: this.getWorkingState(),
      stagingState: this.getStagingState(),
    };
  }

  flatten() {
    return this;
  }

  getFilesDeep() {
    return this;
  }

  countFiles() {
    return 1;
  }

  getName() {
    return this.name;
  }
}

class Directory extends FileSystemEntity {
  constructor(value) {
    if (isString(value)) {
      super(value);
      this.contents = [];
    } else {
      super(value.name);
      this.contents = value.contents.map((content) => {
        const inserted = isString(content)
          ? new File(content)
          : new Directory(content);
        inserted.parent = this;
        return inserted;
      });
    }
    this.isDeleted = false;
  }

  handleStateOnDelete() {
    this.getContents().forEach((content) => content.handleStateOnDelete());
    this.isDeleted = true;
  }

  handleStateOnCreate() {
    this.isDeleted = false;
  }

  handleStateOnModify() {
    //can't modify dir directly
    return null;
  }

  handleStateOnRestore(staged) {
    this.getContentsWithDeleted().forEach((content) =>
      content.handleStateOnRestore(staged)
    );

    if (!staged) {
      this.isDeleted = false;
    }
  }

  handleStateOnStage(ignoreUntracked) {
    this.getContentsWithDeleted().forEach((content) =>
      content.handleStateOnStage(ignoreUntracked)
    );
  }

  handleStateOnCommit() {
    this.getContentsWithDeleted().forEach((content) => {
      content.handleStateOnCommit();
    });
  }

  canCommit(includeUnstaged) {
    return this.getContentsWithDeleted().some((content) =>
      content.canCommit(includeUnstaged)
    );
  }

  isUntracked() {
    return this.getContentsWithDeleted().every((content) =>
      content.isUntracked()
    );
  }

  isChanged() {
    return this.getContentsWithDeleted().some((content) => content.isChanged());
  }

  getIsDeleted() {
    return this.isDeleted;
  }

  copy() {
    const newDirectory = new Directory(this.name);
    newDirectory.contents = this.getContents().map((content) => {
      const contentCopy = content.copy();
      contentCopy.parent = newDirectory;
      return contentCopy;
    });
    return newDirectory;
  }

  copyWithGitId() {
    const newDirectory = new Directory(this.name);
    newDirectory.gitId = this.gitId;
    newDirectory.parentGitId = this.parent?.gitId;
    newDirectory.contents = this.getContentsWithDeleted().map((content) => {
      const contentCopy = content.copyWithGitId();
      contentCopy.parent = newDirectory;
      return contentCopy;
    });
    return newDirectory;
  }

  mapToD3() {
    const newEntity = {
      name: this.name,
      id: this.id,
      gitId: this.gitId,
      isDirectory: true,
    };

    newEntity.children = this.getContents().map((content) => content.mapToD3());

    return newEntity;
  }

  insert(fileSystemEntity) {
    //potential for both dir and file with that name if one of them is deleted
    const existingFiles = this.findWithDeleted(fileSystemEntity.name);

    if (existingFiles.find((file) => !file.getIsDeleted())) {
      //duplicate
      return null;
    }

    const existingFile = existingFiles.find((file) =>
      fileSystemEntity instanceof Directory
        ? file instanceof Directory
        : file instanceof File
    );

    if (existingFile) {
      existingFile.handleStateOnCreate();
      this.contents = this.getContentsWithDeleted().filter(
        (content) => content.id !== existingFile.id
      );
      this.contents.push(existingFile);

      if (fileSystemEntity instanceof Directory) {
        fileSystemEntity.getContents().forEach((file) => {
          existingFile.insert(file);
        });
      }
      return existingFile;
    } else {
      this.contents.push(fileSystemEntity);
      fileSystemEntity.parent = this;
      return fileSystemEntity;
    }
  }

  getContents(includeDeleted) {
    return includeDeleted
      ? this.contents
      : this.contents.filter((content) => !content.getIsDeleted());
  }

  getContentsWithDeleted() {
    return this.contents;
  }

  insertAll(fileSystemEntities) {
    fileSystemEntities.forEach((fileSystemEntity) =>
      this.insert(fileSystemEntity)
    );
  }

  find(name, includeDeleted) {
    if (name === ".") {
      return this;
    } else if (name === "..") {
      return this.parent;
    }
    return this.getContents(includeDeleted).find(
      (fileSystemEntity) => fileSystemEntity.name === name
    );
  }

  findWithDeleted(name) {
    if (name === ".") {
      return this;
    } else if (name === "..") {
      return this.parent;
    }
    return this.getContentsWithDeleted().filter(
      (fileSystemEntity) => fileSystemEntity.name === name
    );
  }

  findByGitId(id) {
    if (id === this.gitId) {
      return this;
    } else {
      let curr = null;
      this.getContentsWithDeleted().some((content) => {
        curr = content.findByGitId(id);
        return Boolean(curr);
      });
      return curr;
    }
  }

  findById(id) {
    if (id === this.id) {
      return this;
    }
    let curr = null;
    this.getContents().some((content) => {
      curr = content.findById(id);
      return Boolean(curr);
    });
    return curr;
  }

  findDeep(name) {
    const found = this.find(name);
    const foundDeep = this.getContents().reduce(
      (previousValue, content) =>
        previousValue ? previousValue : content.findDeep(name),
      null
    );
    return found || foundDeep;
  }

  getRestOfName(value, includeDeleted) {
    const data = this.getDataByPath(value, includeDeleted);

    if (data.childName === ".." && data.child && !value.endsWith("/")) {
      return "/";
    }

    const dir = data.childNameIsDirectory ? data.child : data.parent;
    if (!dir) {
      return "";
    }
    const startsWith = data.childNameIsDirectory ? "" : data.childName;

    const contents = dir.getContents(includeDeleted);
    const files = contents.filter((content) =>
      content.name.startsWith(startsWith)
    );
    if (files.length === 0) {
      return "";
    }
    if (files.length === 1) {
      const result = files[0].name.substring(startsWith.length);
      if (files[0] instanceof Directory) {
        return result + "/";
      } else if (files[0] instanceof File) {
        return result + " ";
      }
    }
    let result = files[0].name.substring(startsWith.length);
    files.slice(1).forEach((file) => {
      const fileNameArray = [...file.name.substring(startsWith.length)];
      const resultArray = [...result];
      let newResult = "";
      fileNameArray.every((character, index) => {
        if (character === resultArray[index]) {
          newResult += character;
          return true;
        }
        return false;
      });
      result = newResult;
    });

    return result;
  }

  compareByName(directory) {
    if (directory.getContents().length !== this.getContents().length) {
      return false;
    }

    for (let i = 0; i < this.getContents().length; i++) {
      if (!this.getContents()[i].compareByName(directory.getContents()[i])) {
        return false;
      }
    }

    return directory.name === this.name;
  }

  compareByNameUnordered(directory) {
    if (
      !(directory instanceof Directory) ||
      directory.getContents().length !== this.getContents().length
    ) {
      return false;
    }

    const contentsCopy = [...directory.getContents()];

    return (
      this.getContents().every((content) => {
        const index = contentsCopy.findIndex((contentCopy) =>
          content.compareByNameUnordered(contentCopy)
        );

        if (index >= 0) {
          contentsCopy.splice(index, 1);
          return true;
        }

        return false;
      }) &&
      contentsCopy.length === 0 &&
      this.name === directory.name
    );
  }

  remove(id) {
    const toRemove = this.findById(id);
    if (toRemove) {
      toRemove.handleStateOnDelete();
      return toRemove;
    }
  }

  removeByGitId(id) {
    this.contents = this.getContentsWithDeleted().filter(
      (content) => content.gitId !== id
    );
  }

  removeDeleted() {
    this.contents = this.getContents();
    this.getContentsWithDeleted().forEach((content) => content.removeDeleted());

    if (this.getIsDeleted()) {
      this.removeSelf();
    }
  }

  followIndexPath(path) {
    let curr = this;

    path.every((index) => {
      if (index >= 0 && index < curr.getContents().length) {
        curr = curr.getContents()[index];
        return true;
      }
      return false;
    });

    return curr;
  }

  getByStateHelper(workingStates, stagingStates) {
    const contentStates = this.getContentsWithDeleted().map((content) =>
      content.getByStateHelper(workingStates, stagingStates)
    );

    const isSameState = contentStates.every((content) => content.isSameState);

    if (isSameState) {
      return {
        isSameState: true,
        sameStateContent:
          this.getContentsWithDeleted().length > 0 ? [this] : [],
      };
    } else {
      const sameStateContent = contentStates.flatMap(
        (content) => content.sameStateContent
      );
      return { isSameState: false, sameStateContent: sameStateContent };
    }
  }

  getByState(workingStates, stagingStates) {
    return this.getByStateHelper(workingStates, stagingStates).sameStateContent;
  }

  getWorkingState() {
    //TODO add check to make sure they all have same state
    if (this.getContentsWithDeleted().length > 0) {
      return this.getContentsWithDeleted()[0].getWorkingState();
    }
    return null;
  }

  getStagingState() {
    if (this.getContentsWithDeleted().length > 0) {
      return this.getContentsWithDeleted()[0].getStagingState();
    }
    return null;
  }

  getRelativePaths(files) {
    return files.map((file) => getRelativePath(this, file));
  }

  setState(workingStates, stagingStates) {
    this.getContentsWithDeleted().forEach((content) => {
      content.setState(workingStates, stagingStates);
    });
  }

  isState(workingStates, stagingStates) {
    return this.getContentsWithDeleted().every((content) =>
      content.isState(workingStates, stagingStates)
    );
  }

  isStagingState(stagingStates) {
    return this.getContentsWithDeleted().every((content) =>
      content.isStagingState(stagingStates)
    );
  }

  isWorkingState(workingStates) {
    return this.getContentsWithDeleted().every((content) =>
      content.isWorkingState(workingStates)
    );
  }

  setStateConditional(
    oldWorkingStates,
    newWorkingState,
    oldStagingStates,
    newStagingState
  ) {
    this.getContentsWithDeleted().forEach((content) => {
      content.setStateConditional(
        oldWorkingStates,
        newWorkingState,
        oldStagingStates,
        newStagingState
      );
    });
  }

  applyCommit(commit) {
    commit.files.forEach((file) => {
      let parent = null;
      switch (file.getStagingState()) {
        case FILE_STATE.NEW:
          parent = this.findByGitId(file.parentGitId);
          const newFile = file.copyWithGitId();
          newFile.setState(FILE_STATE.UNCHANGED, FILE_STATE.UNCHANGED);
          parent.insert(newFile);
          break;
        case FILE_STATE.DELETED:
          parent = this.findByGitId(file.parentGitId);
          parent.removeByGitId(file.gitId);
          break;
        case FILE_STATE.MODIFIED:
          break;
        default:
          break;
      }
    });
  }

  undoCommit(commit) {
    commit.files.forEach((file) => {
      let parent = null;
      switch (file.getStagingState()) {
        case FILE_STATE.NEW:
          parent = this.findByGitId(file.parentGitId);
          parent.removeByGitId(file.gitId);
          break;
        case FILE_STATE.DELETED:
          parent = this.findByGitId(file.parentGitId);
          const newFile = file.copyWithGitId();
          newFile.setState(FILE_STATE.UNCHANGED, FILE_STATE.UNCHANGED);
          parent.insert(newFile);
          break;
        case FILE_STATE.MODIFIED:
          break;
        default:
          break;
      }
    });
  }

  updateToCommit(srcCommit, dstCommit) {
    const path = srcCommit.getPathToCommit(dstCommit);
    path.forEach((value) => {
      switch (value.action) {
        case "add":
          this.applyCommit(value.commit);
          break;
        case "undo":
          this.undoCommit(value.commit);
          break;
        default:
          break;
      }
    });
    return path;
  }

  flatten() {
    return [
      this,
      ...this.getContentsWithDeleted().flatMap((content) => content.flatten()),
    ];
  }

  getFilesDeep() {
    return [
      ...this.getContentsWithDeleted().flatMap((content) =>
        content.getFilesDeep()
      ),
    ];
  }

  countFiles() {
    return this.getContentsWithDeleted().reduce(
      (sum, file) => sum + file.countFiles(),
      0
    );
  }

  getSortedPathAndStateValues(files, flatten, isWorking) {
    if (flatten) {
      files = files.flatMap((file) => file.getFilesDeep());
    }

    const paths = this.getRelativePaths(files);
    const pathsAndStates = files.map((file, index) => ({
      path: paths[index],
      state: `${isWorking ? file.getWorkingState() : file.getStagingState()}:`,
    }));
    pathsAndStates.sort((a, b) => {
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

    return pathsAndStates;
  }

  getName() {
    return this.name + "/";
  }
}

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

//bfs
function getRelativePath(src, dst) {
  const previousMap = new Map();
  const visited = new Set();
  const queue = [];
  queue.push(src);
  visited.add(src.id);

  while (queue.length > 0) {
    const node = queue.shift();
    if (node.id === dst.id) {
      return getPathUsingPreviousMap(previousMap, src, dst);
    }

    let neighbours = [];
    if (node instanceof Directory) {
      neighbours.push(...node.getContentsWithDeleted());
    }
    if (node.parent) {
      neighbours.push(node.parent);
    }

    neighbours.forEach((neighbour) => {
      if (!visited.has(neighbour.id)) {
        previousMap.set(neighbour.id, node);
        queue.push(neighbour);
        visited.add(neighbour.id);
      }
    });
  }
  return null;
}

const getPathUsingPreviousMap = (previousMap, src, dst) => {
  if (dst.id === src.id) {
    return "./";
  }

  let path = [];
  let curr = dst;

  do {
    const prev = previousMap.get(curr.id);
    path.push(prev.parent?.id === curr.id ? ".." : curr.name);
    curr = prev;
  } while (curr.id !== src.id);

  let result = path.reverse().join("/");
  result += dst instanceof Directory ? "/" : "";
  return result;
};

const getPathInfo = (path) => {
  const childNameIsDirectory = path.endsWith("/");
  const isAbsolute = path.startsWith("~") || path.startsWith("/");
  if (isAbsolute) {
    path = path.slice(1);
  }

  const pathNames = path.split("/").filter((name) => name !== "");
  const childName = pathNames.length > 0 ? pathNames.slice(-1)[0] : "";
  const parentPath = pathNames.slice(0, -1);

  return {
    childNameIsDirectory,
    isAbsolute,
    childName,
    parentPath,
  };
};

const copyFiles = (files) => files.map((file) => file.copyWithGitId());

export { FileSystemEntity, File, Directory };
