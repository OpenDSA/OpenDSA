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

    return pathNames.join("/").substring(1);
  }

  getRoot() {
    let curr = this;

    while (curr.parent) {
      curr = curr.parent;
    }

    return curr;
  }

  getChildByPath(path) {
    let currentDir = this;

    if (path.startsWith("/") || path.startsWith("~")) {
      currentDir = this.getRoot();
      path = path.substring(1);
    }

    const pathNames = path.split("/");

    pathNames.every((name) => {
      if (name === "" || name === ".") {
        //continue
        return true;
      } else if (name === "..") {
        //go up one
        // continue;
        currentDir = currentDir.parent;
      } else {
        currentDir = currentDir.contents.find(
          (content) => content.name === name
        );
      }
      return Boolean(currentDir);
    });

    return currentDir;
  }
}

class File extends FileSystemEntity {
  constructor(name) {
    super(name);
    this.fileState = FILE_STATE.NEW;
    this.gitState = GIT_STATE.CHANGED;
  }

  copy() {
    const newFile = new File(this.name);
    return newFile;
  }

  copyWithGitId() {
    const newFile = new File(this.name);
    newFile.gitId = this.gitId;
    return newFile;
  }

  mapToD3() {
    return {
      name: this.name,
      id: this.id,
      isDirectory: false,
      fileState: this.fileState,
      gitState: this.gitState,
    };
  }

  findDeep(name) {
    return name === this.name ? this : null;
  }

  findByGitId(id) {
    return this.gitId === id ? this : null;
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

  getStateString() {
    return this.fileState;
  }

  getState() {
    return { gitState: this.gitState, fileState: this.fileState };
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
      isDirectory: true,
    };

    newEntity.children = this.contents.map((content) => content.mapToD3());

    return newEntity;
  }

  insert(fileSystemEntity) {
    this.contents.push(fileSystemEntity);
    fileSystemEntity.parent = this;
  }

  find(name) {
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

  findDeep(name) {
    const found = this.find(name);
    const foundDeep = this.contents.reduce(
      (previousValue, content) =>
        previousValue ? previousValue : content.findDeep(name),
      null
    );
    return found || foundDeep;
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

  remove(name) {
    const toRemove = this.find(name);
    if (toRemove) {
      toRemove.parent = undefined;
      this.contents = this.contents.filter(
        (fileSystemEntity) => fileSystemEntity.name !== name
      );
      return toRemove;
    }
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
}

function splitPath(path) {
  let pathNames = path.split("/");
  const lastName = pathNames.splice(-1)[0];
  return [lastName, pathNames.join("/")];
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

export { FileSystemEntity, File, Directory, splitPath };
