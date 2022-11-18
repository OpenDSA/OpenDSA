let count = 0;
let gitIdCount = 0;

class Commit {
  constructor() {
    this.children = [];
    this.parent = undefined;
    this.branches = [];
    this.files = [];
    this.message = "";
    this.id = ++count;
    this.gitId = ++gitIdCount; //used to pair between local and remote
  }

  containsBranchShallow(name) {
    return this.branches.some((branch) => branch.name === name);
  }

  findBranchByGitId(id) {
    const found = this.branches.find((branch) => branch.gitId === id);

    if (found) {
      return found;
    }

    let curr = null;

    this.children.some((child) => {
      curr = child.findBranchByGitId(id);
      return Boolean(curr);
    });

    return curr;
  }

  findBranchByName(name) {
    const found = this.branches.find((branch) => branch.name === name);

    if (found) {
      return found;
    }

    let curr = null;

    this.children.some((child) => {
      curr = child.findBranchByName(name);
      return Boolean(curr);
    });

    return curr;
  }

  findCommitByGitId(id) {
    if (this.gitId === id) {
      return this;
    }
    let curr = null;
    this.children.some((child) => {
      curr = child.findCommitByGitId(id);
      return Boolean(curr);
    });
    return curr;
  }

  //merge commits without duplicates
  //return last commit merged
  mergeCommits(commits) {
    let curr = this;
    let prev = null;
    const index = commits.findIndex((commit) => {
      prev = curr;
      curr = curr.findCommitByGitId(commit.gitId);
      return !curr;
    });

    if (index === -1) {
      return curr;
    }

    commits.slice(index).forEach((commit) => {
      prev = prev.insertChild(commit);
    });

    return prev;
  }

  insertChild(commit) {
    if (!commit) {
      commit = new Commit();
    }
    this.children.push(commit);
    commit.parent = this;
    return commit;
  }

  insertBranch(branch) {
    this.branches.push(branch);
    branch.commit = this;
  }

  removeBranch(branch) {
    this.branches = this.branches.filter(
      (innerBranch) => innerBranch.id !== branch.id
    );
  }

  copy() {
    const commit = new Commit();
    commit.children = this.children.map((child) => {
      const childCopy = child.copy();
      childCopy.parent = commit;
      return childCopy;
    });
    commit.branches = this.branches.map((branch) => {
      const branchCopy = branch.copy();
      branchCopy.commit = commit;
      return branchCopy;
    });
    commit.gitId = this.gitId;
    return commit;
  }

  copyWithoutChildren() {
    const commit = new Commit();
    commit.gitId = this.gitId;
    commit.files = this.files;
    commit.parentGitId = this.parent?.gitId;
    return commit;
  }
  getPathToCommit(dst) {
    const previousMap = new Map();
    const visited = new Set();
    const queue = [];
    queue.push(this);
    visited.add(this.id);

    while (queue.length > 0) {
      const commit = queue.shift();
      if (commit.id === dst.id) {
        return getPathUsingPreviousMap(previousMap, this, dst);
      }

      let neighbours = [...commit.children];

      if (commit.parent) {
        neighbours.push(commit.parent);
      }

      neighbours.forEach((neighbour) => {
        if (!visited.has(neighbour.id)) {
          previousMap.set(neighbour.id, commit);
          queue.push(neighbour);
          visited.add(neighbour.id);
        }
      });
    }
    return null;
  }

  getCommonParent(commit) {
    let curr1 = this;
    let curr2 = commit;

    //terrible efficiency
    while (curr1) {
      while (curr2) {
        if (curr1.gitId === curr2.gitId) {
          return curr1;
        }
        curr2 = curr2.parent;
      }
      curr2 = commit;
      curr1 = curr1.parent;
    }

    return null;
  }

  getNumCommitsAway(commit) {
    let curr = this;
    let count = 0;

    while (curr) {
      if (commit.gitId === curr.gitId) {
        return count;
      }
      count++;
      curr = curr.parent;
    }

    return -1;
  }
}

class Branch {
  constructor(name) {
    this.name = name;
    this.commit = undefined;
    this.id = ++count;
    this.gitId = ++gitIdCount; //used to pair between local and remote
  }

  switchCommit(commit) {
    if (this.commit) {
      this.commit.removeBranch(this);
    }
    commit.insertBranch(this);
  }

  commitChanges(files, message) {
    this.commit.removeBranch(this);
    const commit = this.commit.insertChild();
    commit.files = files;
    commit.message = message;
    commit.insertBranch(this);
    return commit;
  }

  copy() {
    const branch = new Branch(this.name);
    branch.gitId = this.gitId;
    return branch;
  }

  getCommitHistory() {
    const commits = [];
    let curr = this.commit;
    while (curr) {
      commits.push(curr);
      curr = curr.parent;
    }
    return commits.map((commit) => commit.copyWithoutChildren()).reverse();
  }

  getNumCommitsDifferent(branch) {
    const commonParent = this.commit.getCommonParent(branch.commit);
    return {
      ahead: this.commit.getNumCommitsAway(commonParent),
      behind: branch.commit.getNumCommitsAway(commonParent),
    };
  }
}

const getPathUsingPreviousMap = (previousMap, src, dst) => {
  if (src.id === dst.id) {
    return [];
  }

  let path = [];

  let curr = dst;
  let foundTurningPoint = false;

  while (curr.id !== src.id) {
    const next = previousMap.get(curr.id);
    const nextIsParent = curr.parent?.id === next.id;
    let action = nextIsParent ? "add" : "undo";
    if (!nextIsParent && !foundTurningPoint) {
      foundTurningPoint = true;
      action = "nothing";
    }
    path.push({ commit: curr, action });
    curr = next;
  }

  path.push({ commit: curr, action: foundTurningPoint ? "undo" : "nothing" });

  return path.reverse();
};

export { Branch, Commit };
