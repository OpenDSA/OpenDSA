/* global ODSA, PARAMS, ClickHandler */
(function ($) {
  "use strict";
  // AV variables
  var insertValues,
      tree,
      stack,
      nodeSize = parseInt(PARAMS.nodesize || 3, 10),
      insertSize = parseInt(PARAMS.insertsize || nodeSize * 4, 10),

      // Configurations
      config = ODSA.UTILS.loadConfig({av_container: "jsavcontainer"}),
      interpret = config.interpreter,
      code = config.code,
      codeOptions = {after: {element: $(".instructions")}, visible: true},

      // Create a JSAV instance
      av = new JSAV($("#jsavcontainer"));

  if (nodeSize < 3) {
    window.alert("Split doesn't work correctly for internal nodes when" +
      " nodesize is less than 3.\n Nodesize has been set to 3.");
    nodeSize = 3;
  }

  av.recorded(); // we are not recording an AV with an algorithm

  av.code(code, codeOptions);

  function initialize() {

    av.container.find(".jsavcanvas").css("min-height", 450);


    // generate values for the stack
    insertValues = generateValues(insertSize, 10, 100); //No duplicates!

    // clear possible old stack and create a new one
    if (stack) {
      stack.clear();
    }
    stack = av.ds.stack(insertValues, {center: true, element: $("#stackcontainer").append("<div></div>").find("div")});
    stack.layout();

    //clear old binary tree
    if (tree) {
      tree.clear();
    }
    //create binary tree
    tree = new av.ds.arraytree({nodesize: nodeSize});

    tree.layout();

    tree.click(function (index) {
      if (isFull(this)) {
        // click on non-leaf node -> split this node
        splitNode(this);
      } else {
        // insert value to node
        if (!stack.size()) { return; } // return if stack is empty
        var newValues = this.value().slice(0, -1).concat(stack.first().value()).sort(function (a, b) {
          if (a === "") { a = 1000; }
          if (b === "") { b = 1000; }
          return a - b;
        });
        this.value(newValues);
        stack.removeFirst();
        stack.layout();
        av.gradeableStep();
      }
    });

    return tree;
  }

  function modelSolution(jsav) {
    var modelTree = jsav.ds.arraytree(3);
    modelTree.root([5, 8, ""]);
    modelTree.root().addChild([1, 2, 3]);
    modelTree.root().addChild([5, 6, 7]);
    modelTree.root().addChild([8, 9, 10]);
    modelTree.layout();

    jsav._undo = [];

    return modelTree;
  }
  
  //generate values without duplicates
  function generateValues(n, min, max) {
    var arr = [];
    var val;
    for (var i = 0; i < n; i++) {
      do {
        val = Math.floor(min + Math.random() * (max - min));
      } while ($.inArray(val, arr) !== -1);
      arr.push(val);
    }
    return arr;
  }

  function isFull(node) {
    return node.value().every(function (v) { return typeof v === "number"; });
  }

  function splitNode(node) {
    var tree = node.container,
        av = tree.jsav,
        nodeSize = tree.options.nodesize,
        parent = node.parent(),
        arr = node.value(),
        sliceInd = Math.ceil(nodeSize / 2),
        left = arr.slice(0, sliceInd),
        right = arr.slice(sliceInd);
    // if there is no parent we are in the root node
    // -> create new root node and set 'node' as child of new root
    if (!parent) {
      parent = tree.newNode(new Array(nodeSize).join(",").split(","));
      tree.root(parent, {hide: false});
      parent.addChild(node);
    }
    // create a new node and give the right half to it
    var newNode = tree.newNode(right, parent),
        parentChildIndex = parent.childnodes.indexOf(node),
        newParentValues = parent.value().slice(0, -1),
        newParentChildNodes = parent.childnodes.slice(0);
    // add the new node to the parents child node array
    newParentChildNodes.splice(parentChildIndex + 1, 0, newNode);
    // set the new child nodes to the parent
    parent._setchildnodes(newParentChildNodes);
    // if the split node was a non-leaf node
    if (node.childnodes.length) {
      // give half of the child nodes to the new node
      var childSliceInd = Math.floor((nodeSize + 1) / 2),
          leftChildren = node.childnodes.slice(0, childSliceInd),
          rightChildren = node.childnodes.slice(childSliceInd);
      node._setchildnodes(leftChildren);
      rightChildren.forEach(function (node) {
        node.parent(newNode);
      });
      newNode._setchildnodes(rightChildren);
      // give new values for the parent node
      newParentValues.splice(parentChildIndex, 0, left[sliceInd - 1]);
      // remove the value that was given to the parent node from 'node'
      left[sliceInd - 1] = "";
    } else {
      // give new values for the parent node
      newParentValues.splice(parentChildIndex, 0, right[0]);
    }
    // give the left half of the values to node
    node.value(left);
    // set new values for the parent node
    parent.value(newParentValues);
    // position the new node on top of node
    newNode.element.position({of: node.element});
    // call the layout function
    tree.layout();
    av.gradeableStep();
  }

  // create exercise and reset it
  var exercise = av.exercise(modelSolution, initialize, {feedback: "atend"});
  exercise.reset();

}(jQuery));