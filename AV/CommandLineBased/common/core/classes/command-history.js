class CommandHistory {
  constructor() {
    this.history = [{ old: "", new: "" }];
    this.index = 0;
  }

  reset() {
    this.history = [{ old: "", new: "" }];
    this.index = 0;
  }

  previous() {
    if (this.index !== 0) {
      this.index--;
      return this.history[this.index].new;
    }
    return null;
  }

  next() {
    if (this.index !== this.history.length - 1) {
      this.index++;
      return this.history[this.index].new;
    }
    return null;
  }

  update(value) {
    this.history[this.index].new = value;
  }

  enter() {
    if (this.index === this.history.length - 1) {
      this.history[this.index].old = this.history[this.index].new;
    } else {
      this.history[this.history.length - 1] = {
        old: this.history[this.index].new,
        new: this.history[this.index].new,
      };
      this.history[this.index].new = this.history[this.index].old;
      this.index = this.history.length - 1;
    }

    if (this.history[this.history.length - 1].old !== "") {
      this.history.push({ old: "", new: "" });
      this.index++;
    }
  }
}

export { CommandHistory };
