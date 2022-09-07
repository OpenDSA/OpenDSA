import { FILE_STATE, GIT_STATE } from "./gitStatuses.js";

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

  getDataByPath(path) {
    const pathInfo = getPathInfo(path);

    let parent = pathInfo.isAbsolute ? this.getRoot() : this;
    parent = parent.getByPathArray(pathInfo.parentPath);

    let child =
      pathInfo.isAbsolute && !pathInfo.childName
        ? parent
        : parent
        ? parent.find(pathInfo.childName)
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

  getChildByPath(path) {
    return this.getDataByPath(path).child;
  }
}

class File extends FileSystemEntity {
  constructor(name) {
    super(name);
    this.fileState = FILE_STATE.NEW;
    this.gitState = GIT_STATE.CHANGED;
  }

  setDeleted() {
    this.setState(GIT_STATE.CHANGED, FILE_STATE.DELETED);
  }

  setNotDeleted() {
    this.setState(GIT_STATE.CHANGED, FILE_STATE.MODIFIED);
  }

  setNotDeletedDeep() {
    this.setState(GIT_STATE.CHANGED, FILE_STATE.MODIFIED);
  }

  getIsDeleted() {
    return this.fileState === FILE_STATE.DELETED;
  }

  removeDeleted() {
    //just the base case
    return null;
  }

  copy() {
    const newFile = new File(this.name);
    return newFile;
  }

  copyWithGitId() {
    const newFile = new File(this.name);
    newFile.gitId = this.gitId;
    newFile.parentGitId = this.parent?.gitId;
    newFile.fileState = this.fileState;
    newFile.gitState = this.gitState;
    return newFile;
  }

  mapToD3() {
    return {
      name: this.name,
      id: this.id,
      gitId: this.gitId,
      isDirectory: false,
      fileState: this.fileState,
      gitState: this.gitState,
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

  setState(gitState, fileState) {
    if (gitState) {
      this.gitState = gitState;
    }
    if (fileState) {
      this.fileState = fileState;
    }
  }

  isState(gitStates, fileStates) {
    return (
      (!gitStates ||
        (Array.isArray(gitStates)
          ? gitStates.includes(this.gitState)
          : gitStates === this.gitState)) &&
      (!fileStates ||
        (Array.isArray(fileStates)
          ? fileStates.includes(this.fileState)
          : fileStates === this.fileState))
    );
  }

  setStateConditional(oldGitStates, newGitState, oldFileStates, newFileState) {
    if (this.isState(oldGitStates, oldFileStates)) {
      this.setState(newGitState, newFileState);
      return true;
    }
    return false;
  }

  getByStateHelper(gitStates, fileStates) {
    const isSameState = this.isState(gitStates, fileStates);
    return {
      isSameState: isSameState,
      sameStateContent: isSameState ? [this] : [],
    };
  }

  getByState(gitStates, fileStates) {
    return this.isState(gitStates, fileStates) ? [this] : [];
  }

  getStateString() {
    return this.fileState;
  }

  getState() {
    return { gitState: this.gitState, fileState: this.fileState };
  }

  flatten() {
    return this;
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

  setDeleted() {
    this.contents.forEach((content) => content.setDeleted());
    this.isDeleted = true;
  }

  setNotDeleted() {
    this.isDeleted = false;
  }

  setNotDeletedDeep() {
    this.contents.forEach((content) => content.setNotDeleted());
    this.isDeleted = false;
  }

  getIsDeleted() {
    return this.isDeleted;
  }

  copy() {
    const newDirectory = new Directory(this.name);
    newDirectory.contents = this.contents.map((content) => {
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
    newDirectory.contents = this.contents.map((content) => {
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

    newEntity.children = this.contents
      .filter((content) => !content.getIsDeleted())
      .map((content) => content.mapToD3());

    return newEntity;
  }

  insert(fileSystemEntity) {
    const existingFile = this.findWithDeleted(fileSystemEntity.name);
    if (existingFile) {
      if (existingFile.getIsDeleted()) {
        existingFile.setNotDeleted();
        this.contents = this.contents.filter(
          (content) => content.id !== existingFile.id
        );
        this.contents.push(existingFile);

        if (fileSystemEntity instanceof Directory) {
          fileSystemEntity.contents.forEach((file) => {
            existingFile.insert(file);
          });
        }
        return existingFile;
      } else {
        return null;
      }
    } else {
      this.contents.push(fileSystemEntity);
      fileSystemEntity.parent = this;
      return fileSystemEntity;
    }
  }

  getContents() {
    return this.contents.filter((content) => !content.getIsDeleted());
  }

  insertAll(fileSystemEntities) {
    fileSystemEntities.forEach((fileSystemEntity) =>
      this.insert(fileSystemEntity)
    );
  }

  find(name) {
    if (name === ".") {
      return this;
    } else if (name === "..") {
      return this.parent;
    }
    return this.getContents().find(
      (fileSystemEntity) => fileSystemEntity.name === name
    );
  }

  findWithDeleted(name) {
    if (name === ".") {
      return this;
    } else if (name === "..") {
      return this.parent;
    }
    return this.contents.find(
      (fileSystemEntity) => fileSystemEntity.name === name
    );
  }

  findByGitId(id) {
    if (id === this.gitId) {
      return this;
    } else {
      let curr = null;
      this.contents.some((content) => {
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
    this.contents.some((content) => {
      curr = content.findById(id);
      return Boolean(curr);
    });
    return curr;
  }

  findDeep(name) {
    const found = this.find(name);
    const foundDeep = this.contents.reduce(
      (previousValue, content) =>
        previousValue ? previousValue : content.findDeep(name),
      null
    );
    return found || foundDeep;
  }

  getRestOfName(value) {
    const files = this.getContents().filter((content) =>
      content.name.startsWith(value)
    );
    console.log("files", files);
    if (files.length === 0) {
      return "";
    }
    if (files.length === 1) {
      const result = files[0].name.substring(value.length);
      if (files[0] instanceof Directory) {
        return result + "/";
      } else if (files[0] instanceof File) {
        return result + " ";
      }
    }
    return "";
  }

  compareByName(directory) {
    if (directory.contents.length !== this.contents.length) {
      return false;
    }

    for (let i = 0; i < this.contents.length; i++) {
      if (!this.contents[i].compareByName(directory.contents[i])) {
        return false;
      }
    }

    return directory.name === this.name;
  }

  compareByNameUnordered(directory) {
    if (
      !(directory instanceof Directory) ||
      directory.contents.length !== this.contents.length
    ) {
      return false;
    }

    const contentsCopy = [...directory.contents];

    return (
      this.contents.every((content) => {
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
      toRemove.setDeleted();
      return toRemove;
    }
  }

  removeByGitId(id) {
    this.contents = this.contents.filter((content) => content.gitId !== id);
  }

  removeDeleted() {
    this.contents = this.contents.filter((content) => !content.getIsDeleted());
    this.contents.forEach((content) => content.removeDeleted());
  }

  followIndexPath(path) {
    let curr = this;

    path.every((index) => {
      if (index >= 0 && index < curr.contents.length) {
        curr = curr.contents[index];
        return true;
      }
      return false;
    });

    return curr;
  }

  getByStateHelper(gitStates, fileStates) {
    const contentStates = this.contents.map((content) =>
      content.getByStateHelper(gitStates, fileStates)
    );

    const isSameState = contentStates.every((content) => content.isSameState);

    if (isSameState) {
      return {
        isSameState: true,
        sameStateContent: this.contents.length > 0 ? [this] : [],
      };
    } else {
      const sameStateContent = contentStates.flatMap(
        (content) => content.sameStateContent
      );
      return { isSameState: false, sameStateContent: sameStateContent };
    }
  }

  getByState(gitStates, fileStates) {
    return this.getByStateHelper(gitStates, fileStates).sameStateContent;
  }

  getStateString() {
    //TODO clean up
    if (this.contents.length > 0) {
      return this.contents[0].getStateString();
    }
    return "statestringerror";
  }

  getState() {
    //TODO clean up
    if (this.contents.length > 0) {
      return this.contents[0].getState();
    }
    return null;
  }

  getRelativePaths(files) {
    return files.map((file) => getRelativePath(this, file));
  }

  setState(gitState, fileState) {
    this.contents.forEach((content) => {
      content.setState(gitState, fileState);
    });
  }

  setStateConditional(oldGitStates, newGitState, oldFileStates, newFileState) {
    this.contents.forEach((content) => {
      content.setStateConditional(
        oldGitStates,
        newGitState,
        oldFileStates,
        newFileState
      );
    });
  }

  applyCommit(commit) {
    commit.files.forEach((file) => {
      let parent = null;
      switch (file.getState().fileState) {
        case FILE_STATE.NEW:
          parent = this.findByGitId(file.parentGitId);
          const newFile = file.copyWithGitId();
          newFile.setState(GIT_STATE.COMMITTED, FILE_STATE.UNCHANGED);
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
      switch (file.getState().fileState) {
        case FILE_STATE.NEW:
          parent = this.findByGitId(file.parentGitId);
          parent.removeByGitId(file.gitId);
          break;
        case FILE_STATE.DELETED:
          parent = this.findByGitId(file.parentGitId);
          const newFile = file.copyWithGitId();
          newFile.setState(GIT_STATE.COMMITTED, FILE_STATE.UNCHANGED);
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
    return [this, ...this.contents.flatMap((content) => content.flatten())];
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
      neighbours.push(...node.contents);
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

export { FileSystemEntity, File, Directory };
