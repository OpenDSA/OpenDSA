(function ($) {
  "use strict";
  var insertValues,
    tree,
    stack,
    insertSize = 10,
    clickHandler,
    av = new JSAV($("#jsavcontainer"));

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {

    // create clickHandler if undefined
    if (typeof clickHandler === "undefined") {
      clickHandler = new ClickHandler(av, exercise, {selectedClass: "selected", effect: "move"});
    }
    clickHandler.reset();

    // generate values for the stack
    insertValues = generateValues(insertSize, 10, 100); //No duplicates!

    // clear possible old stack and create a new one
    if (stack) {
      clickHandler.remove(stack);
      stack.clear();
    }
    stack = av.ds.stack(insertValues, {center: true, element: $("#stackcontainer").append("<div></div>").find("div")});
    stack.layout();
    clickHandler.addList(stack, {
      select: "first",
      drop: "first",
      onSelect: function () {
        if (clickHandler.selNode) {
          clickHandler.selNode.removeClass("selected");
        }
      }
    });

    //clear old binary tree
    if (tree) {
      clickHandler.remove(tree);
      tree.clear();
    }
    //create binary tree
    tree = av.ds.binarytree({center: true, visible: true, nodegap: 5});
    tree.root().addClass("emptynode");
    tree.layout();
    clickHandler.addTree(tree, {
      onDrop: function () {
        //add empty nodes and remove emptynode class
        this.removeClass("emptynode");
        this.addEmptyNodes();
        tree.layout();
      },
      onSelect: function () {
        //fake select the node
        if (clickHandler.selNode) {
          clickHandler.selNode.removeClass("selected");
          if (clickHandler.selNode === this) {
            clickHandler.selNode = null;
            return false;
          }
        }
        this.addClass("selected");
        clickHandler.selNode = this;
        return false;
      }
    });
    

    return tree;
  }

  function modelSolution(jsav) {
    var modelTree = jsav.ds.binarytree({center: true, visible: true, nodegap: 5});
    modelTree.root().addClass("emptynode");
    modelTree.layout();

    jsav._undo = [];

    for (var i = 0; i < insertSize; i++) {
      //find emptynode where the value will be inserted
      var node = modelTree.root();
      var val = insertValues[i];
      while (!node.hasClass("emptynode")) {
        if (val <= node.value()) {
          node = node.left();
        } else {
          node = node.right();
        }
      }
      jsav.umsg("The value " + val + " is inserted into the tree.")
      node.value(val);
      node.removeClass("emptynode");
      node.highlight();
      node.addEmptyNodes(node);
      modelTree.layout();
      jsav.stepOption("grade", true);
      jsav.step();
      node.unhighlight();

      //perform rotation
      node = modelTree.getUnbalancedNode(val);
      if (node) {
        jsav.umsg("This node is now unbalanced.")
        node.highlight();
        jsav.step();
        jsav.umsg("The rotation is performed on the unbalanced node in order to balance the tree.")
        node.balance();
        node.unhighlight();
        modelTree.layout();
        jsav.stepOption("grade", true);
        jsav.step();   
      }
    }

    return modelTree;
  }


  // create buttoncontainer if it doesn't exist
  if ($("#buttoncontainer").length === 0) {
    $("#jsavcontainer .jsavcanvas").prepend(
      '<div id="buttoncontainer" style="margin: auto; text-align: center; padding: 15px">'+
      '  <button id="buttonL">Single Rotation Left</button>'+
      '  <button id="buttonLR">Double Rotation LR</button>'+
      '  <button id="buttonRL">Double Rotation RL</button>'+
      '  <button id="buttonR">Single Rotation Right</button>'+
      '</div>');
  }

  // create stackcontainer if it doesn't exist
  if ($("#stackcontainer").length === 0) {
    $("#jsavcontainer .jsavcanvas").prepend('<div id="stackcontainer" style="margin: auto; padding: 15px"></div>');
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

  // create exercise and reset it
  var exercise = av.exercise(modelSolution, initialize, {}, {feedback: "atend"});
  exercise.reset();

  // function to be called when a button is clicked
  function clickAction(node, rotateFunction) {
    if (!node || node.container !== tree) {
      window.alert("Select an unbalanced node first!");
      return;
    }
    if (rotateFunction.call(node) === false) {
      window.alert("Unable to perform this rotation on the selected node!");
      return;
    }
    clickHandler.selNode = null;
    node.removeClass("selected");
    tree.layout();
    exercise.gradeableStep();
  }

  var btn = JSAV._types.ds.BinaryTreeNode.prototype;
  $("#buttonL").click(function () {
    clickAction(clickHandler.selNode, btn.rotateLeft);
  });
  $("#buttonLR").click(function () {
    clickAction(clickHandler.selNode, btn.rotateLR);
  });
  $("#buttonRL").click(function () {
    clickAction(clickHandler.selNode, btn.rotateRL);
  });
  $("#buttonR").click(function () {
    clickAction(clickHandler.selNode, btn.rotateRight);
  });

  av.container.find(".jsavexercisecontrols input[name='undo']").click(function () {
    clickHandler.selNode = null;
  });

}(jQuery));