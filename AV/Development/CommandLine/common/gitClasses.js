let count = 0;
let gitIdCount = 0;

class Commit {
  constructor() {
    this.children = [];
    this.parent = undefined;
    this.branches = [];
    this.id = ++count;
    this.gitId = ++gitIdCount; //used to pair between local and remote
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
  constructor(name, commit) {
    this.name = name;
    this.commit = undefined;
    this.id = ++count;
    this.gitId = ++gitIdCount; //used to pair between local and remote
  }

  commit() {
    this.commit.removeBranch(this);
    const commit = this.commit.insertChild();
    commit.insertBranch(this);
  }

  copy() {
    const branch = new Branch(this.name);
    branch.gitId = this.gitId;
    return branch;
  }
}

export { Branch, Commit };
