let count = 0;
let gitIdCount = 0;

class Commit {
  constructor() {
    this.children = [];
    this.parent = undefined;
    this.branches = [];
    this.files = [];
    this.merged = false;
    this.id = ++count;
    this.gitId = ++gitIdCount; //used to pair between local and remote
  }

  setMerged(merged) {
    this.merged = merged;
  }

  findBranchByGitId(id) {
    let curr = null;
    this.branches.some((branch) => {
      curr = branch;
      return curr.gitId === id;
    });

    if (curr) {
      return curr;
    }

    this.children.some((child) => {
      curr = child.findBranchByGitId();
      return Boolean(curr);
    });

    return curr;
  }

  findBranchByName(name) {
    let curr = null;
    this.branches.some((branch) => {
      curr = branch;
      return curr.name === name;
    });

    if (curr) {
      return curr;
    }

    this.children.some((child) => {
      curr = child.findBranchByName();
      return Boolean(curr);
    });

    return curr;
  }

  insertChild() {
    const commit = new Commit();
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
}

class Branch {
  constructor(name) {
    this.name = name;
    this.commit = undefined;
    this.id = ++count;
    this.gitId = ++gitIdCount; //used to pair between local and remote
  }

  commitChanges(files) {
    this.commit.removeBranch(this);
    const commit = this.commit.insertChild();
    commit.files = files;
    commit.insertBranch(this);
    return commit;
  }

  copy() {
    const branch = new Branch(this.name);
    branch.gitId = this.gitId;
    return branch;
  }

  getUnmergedCommits() {
    const commits = [];
    let curr = this.commit;

    while (!curr.merged) {
      commits.push(curr);
      curr = curr.parent;
    }

    return commits;
  }
}

export { Branch, Commit };
