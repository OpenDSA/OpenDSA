let count = 0;

class Commit {
  constructor() {
    this.children = [];
    this.parent = undefined;
    this.branches = [];
    this.id = ++count;
  }

  insertChild() {
    const commit = new Commit();
    this.children.push(commit);
    commit.parent = this;
    return commit;
  }

  insertBranch(branch) {
    this.branches.push(branch);
  }

  removeBranch(branch) {
    this.branches = this.branches.filter(
      (innerBranch) => innerBranch.id !== branch.id
    );
  }
}

class Branch {
  constructor(name, commit) {
    this.name = name;
    this.commit = undefined;
    this.id = ++count;
  }

  commit() {
    this.commit.removeBranch(this);
    const commit = this.commit.insertChild();
    commit.insertBranch(this);
    this.commit = commit;
  }
}
