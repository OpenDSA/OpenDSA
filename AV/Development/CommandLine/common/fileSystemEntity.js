import { GIT_STATUSES } from "./gitStatuses.js";

let count = 0;

class FileSystemEntity {
  constructor(name) {
    this.name = name;
    this.parent = undefined;
    this.id = ++count;
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
    this.status = GIT_STATUSES.UNTRACKED;
  }

  copy() {
    const newFile = new File(this.name);
    newFile.parent = this.parent;
    return newFile;
  }

  mapToD3() {
    return {
      name: this.name,
      id: this.id,
      isDirectory: false,
    };
  }

  findDeep(name) {
    return name === this.name ? this : null;
  }

  compareByName(file) {
    return file.name === this.name;
  }

  compareByNameUnordered(file) {
    return file instanceof File && file.name === this.name;
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
    newDirectory.parent = this.parent;
    newDirectory.contents = this.contents.map((content) => content.copy());
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

  setStatusDeep(status) {
    this.contents.forEach((content) => {
      if (content instanceof File) {
        content.status = status;
      } else if (content instanceof Directory) {
        content.setStatusDeep(status);
      }
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

export { FileSystemEntity, File, Directory, splitPath };
