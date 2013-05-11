(function($) {
  var comp = function(a, b) {
    return a - b;
  };

  JSAV._types.ds.BinaryTree.prototype.insert = function(value) {
    // helper function to recursively insert
    var ins = function(node, insval) {
      var val = node.value();
      if (!val || val === "jsavnull") { // no value in node
        node.value(insval);
      } else if (comp(val, insval) > 0) { // go left
        if (node.left()) {
          ins(node.left(), insval);
        } else {
          node.left(insval);
        }
      } else { // go right
        if (node.right()) {
          ins(node.right(), insval);
        } else {
          node.right(insval);
        }
      }
    };
    if ($.isArray(value)) { // array of values
      for (var i = 0, l = value.length; i < l; i++) {
        ins(this.root(), value[i]);
      }
    } else {
      ins(this.root(), value);
    }
    return this;
  };
  JSAV._types.ds.BinaryTree.prototype.postOrderTraversal = function() {
    var i = 0,
        jsav = this.jsav;
    var postorderNode = function(node) {
      if (node.left()) {
        postorderNode(node.left());
      }
      if (node.right()) {
        postorderNode(node.right());
      }
      node.highlight();
      jsav.label(i + 1, {relativeTo: node, visible: true, anchor: "right top"});
      jsav.stepOption("grade", true);
      jsav.step();
      i++;
    };
    postorderNode(this.root());
  };
  JSAV._types.ds.BinaryTree.prototype.preOrderTraversal = function() {
    var i = 0,
        jsav = this.jsav;
    var preorderNode = function(node) {
      node.highlight();
      jsav.label(i + 1, {relativeTo: node, visible: true, anchor: "right top"});
      i++;
      jsav.stepOption("grade", true);
      jsav.step();
      if (node.left()) {
        preorderNode(node.left());
      }
      if (node.right()) {
        preorderNode(node.right());
      }
    };
    preorderNode(this.root());
  };
  JSAV._types.ds.BinaryTree.prototype.inOrderTraversal = function() {
    var i = 0,
        jsav = this.jsav;
    var inorderNode = function(node) {
      if (node.left()) {
        inorderNode(node.left());
      }
      node.highlight();
      jsav.label(i + 1, {relativeTo: node, visible: true, anchor: "right top"});
      i++;
      jsav.stepOption("grade", true);
      jsav.step();
      if (node.right()) {
        inorderNode(node.right());
      }
    };
    inorderNode(this.root());
  };
  JSAV._types.ds.BinaryTree.prototype.levelOrderTraversal = function() {
    var i = 0,
        jsav = this.jsav,
        queue = [this.root()],
        curr;
    while (queue.length > 0) {
      curr = queue.shift();
      curr.highlight();
      jsav.label(i + 1, {relativeTo: curr, visible: true, anchor: "right top"});
      jsav.stepOption("grade", true);
      jsav.step();
      i++;
      if (curr.left()) {
        queue.push(curr.left());
      }
      if (curr.right()) {
        queue.push(curr.right());
      }
    }
  };
  JSAV._types.ds.BinaryTree.prototype.state = function(newState) {
    var state,
        i,
        queue = [this.root()],
        curr;
    if (typeof newState === "undefined") {
      state = [];
      while (queue.length > 0) {
        curr = queue.shift();
        state.push(curr.isHighlight());
        if (curr.left()) { queue.push(curr.left()); }
        if (curr.right()) { queue.push(curr.right()); }
      }
      return state;
    } else {
      i = 0;
      while (queue.length > 0) {
        curr = queue.shift();
        if (newState[i] && !curr.isHighlight()) {
          curr.highlight();
        } else if (!newState[i] && curr.isHighlight()) {
          curr.unhighlight();
        }
        i++;
        if (curr.left()) { queue.push(curr.left()); }
        if (curr.right()) { queue.push(curr.right()); }
      }
      return this;
    }
  };

    
  var modelWrapper = function(tt) {
    return function model(modeljsav) {
      var modelBst = modeljsav.ds.bintree({center: true, nodegap: 15});
      for (var i = 0, l = tt.initData.length; i < l; i++) {
        modelBst.insert(tt.initData[i]);
      }
      modelBst.layout();
      modeljsav.clear();
      tt.modelFunction.call(modelBst);
      return modelBst;
    };
  };
  var initWrapper = function (tt) {
    return function() {
      var bt;
      var nodeNum = 9;
      if (bt) {
        bt.clear();
      }
      var dataTest = (function() {
        return function(dataArr) {
          var bst = tt.jsav.ds.bintree();
          bst.insert(dataArr);
          var result = bst.height() <= 4;
          bst.clear();
          return result;
        };
      })();
      initData = JSAV.utils.rand.numKeys(10, 100, nodeNum, {test: dataTest, tries: 30});
      bt = tt.jsav.ds.bintree({center: true, visible: true, nodegap: 15});
      bt.insert(initData);
      bt.layout();
      bt.click(tt.nodeClick(tt.exercise));
      tt.bt = bt;
      tt.initData = initData;
      tt.jsav.displayInit();
      return bt;
    };
  };

  var TreeTraversal = function (modelFunction) {
    this.modelFunction = modelFunction;
    console.log(this.modelFunction);
    this.jsav = new JSAV($(".avcontainer"));
    this.jsav.recorded();
    this.exercise = this.jsav.exercise(modelWrapper(this), initWrapper(this), {"css": "background-color"}, {
      controls: $(".jsavexercisecontrols")
    });
    this.exercise.reset();
  };
  TreeTraversal.prototype.nodeClick = function(exercise) {
    return function() {
      if (this.element.hasClass("jsavnullnode") || this.isHighlight()) { return; }
      this.highlight();
      var pos = exercise.jsav.canvas.find(".jsavlabel:visible").size();
      exercise.jsav.label(pos + 1, {relativeTo: this, anchor: "right top"});
      exercise.gradeableStep();
    };
  };
  window.TreeTraversal = TreeTraversal;
}(jQuery));