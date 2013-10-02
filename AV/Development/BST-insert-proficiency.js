(function($) {
  var insertArray = [],
      binaryTree,
      stack,
      insertSize = 10,
      av = new JSAV($("#jsavcontainer"));

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {
    BST.turnAnimationOff();

    insertArray = JSAV.utils.rand.numKeys(10, 100, insertSize, {test: dataTest, tries: 10});
    if (stack) {
      stack.clear();
    }
    stack = av.ds.stack({center: true});
    for (var i = 0; i < insertSize; i++) {
      stack.addLast(insertArray[i]);
    }
    stack.layout();
    stack.first().highlight();

    if (binaryTree) {
      binaryTree.clear();
    }
    binaryTree = av.ds.bintree({center: true, visible: true, nodegap: 15});
    binaryTree.root("");
    binaryTree.root().addClass("emptynode");
    binaryTree.click(clickHandler);
    binaryTree.layout();

    function dataTest(array) {
      var bst = av.ds.bintree();
      bst.insert(array);
      var result = bst.height() <= 5;
      bst.clear();
      return result;
    }

    BST.restoreAnimationState(); 

    return binaryTree;
  }
      
  function modelSolution(jsav) {
    jsav._undo = [];

    var modelStack = jsav.ds.stack({center: true});
    for (var i = 0; i < insertSize; i++) {
      modelStack.addLast(insertArray[i]);
    }
    modelStack.layout();
    modelStack.first().highlight();

    var modelTree = jsav.ds.bintree({center: true, visible: true, nodegap: 10});
    modelTree.root("");
    modelTree.root().addClass("emptynode");
    modelTree.layout();

    jsav.displayInit();

    for (var i = 0; i < insertSize; i++) {
      var val = insertArray[i];
      var node = modelTree.root();
      while (node.value() !== "") {
        if (val <= node.value()) {
          node = node.left();
        } else {
          node = node.right();
        }
      }
      node.value(val);
      node.left("");
      node.left().element.addClass("emptynode");
      node.right("");
      node.right().element.addClass("emptynode");
      modelTree.layout();
      node.removeClass("emptynode");

      modelStack.removeFirst();
      modelStack.layout();
      if (modelStack.first()) {
        modelStack.first().highlight();
      }

      jsav.stepOption("grade", true);
      jsav.step();
    }

    return modelTree;
  }

  function clickHandler() {
    if (stack.size()) {
      //insert value into this node
      this.value(stack.first().value());
      //remove value from the stack
      stack.removeFirst();
      stack.layout();
      //highlight the next value
      if (stack.first()) {
        stack.first().highlight();
      }
      if (!this.left()) {
        //add empty node on the left side
        this.left("");
        this.left().element.addClass("emptynode");
      }
      if (!this.right()) {
        //add empty node on the right side
        this.right("");
        this.right().element.addClass("emptynode");
      }
      //update tree
      binaryTree.layout();
      //remove class for dashed border
      this.removeClass("emptynode");
      //gradeable step
      exercise.gradeableStep();
    }
  }

  var exercise = av.exercise(modelSolution, initialize,
    { "css": "background-color" },
    { controls: $(".jsavexercisecontrols") });
  exercise.reset();
}(jQuery));