(function($) {
  var levels = 6,
      nodeNum = Math.pow(2, levels) - 1,
      keyToFind,
      initialData = [],
      jsavBinaryTree,
      $key = $('#keyToFind'),
      av = new JSAV($(".avcontainer"));


  // auxillary function for creating a perfect binary tree
  // inserts the values in the initialData[] array in level order
  function calculateInitialData(level, min, max, levelsInTotal, arrayIndex) {
    diff = max - min;
    var value = JSAV.utils.rand.numKey(min + Math.floor(diff / 3), max - Math.floor(diff / 3))
    initialData[arrayIndex - 1] = value;
    if (level < levelsInTotal) {
      calculateInitialData(level + 1, min, value - 1, levelsInTotal, 2 * arrayIndex);
      calculateInitialData(level + 1, value + 1, max, levelsInTotal, 2 * arrayIndex + 1);
    }
  }

  function getIndex(node, root) {
    if (node === root) {
      return 0;
    }

    if (node.parent().left() === node) {
      return (getIndex(node.parent(), root) + 1) * 2 - 1;
    } else {
      return (getIndex(node.parent(), root) + 1) * 2;
    }
  }

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {
    BST.turnAnimationOff();

    if (jsavBinaryTree) {
      jsavBinaryTree.clear();
    }
    jsavBinaryTree = av.ds.bintree({center: true, visible: true, nodegap: 15});
    jsavBinaryTree.root("?");
    jsavBinaryTree.root().addClass("emptynode");
    jsavBinaryTree.click(clickHandler);
    jsavBinaryTree.layout();

    calculateInitialData(1, 100, 1000, levels, 1);
    keyToFind = initialData[JSAV.utils.rand.numKey(Math.floor(nodeNum / 2), nodeNum)];
    $key.html("<li>" + keyToFind + "</li>");
    av.ds.array($key, {indexed: false}).css(0, {"background-color": "#ddf"}).toggleArrow(0);

    BST.restoreAnimationState();

    return jsavBinaryTree;
  }

  function modelSolution(jsav) {
    jsav.ds.array([keyToFind], {indexed: false}).css(0, {"background-color": "#ddf"});
    var modelTree = jsav.ds.bintree({center: true, visible: true, nodegap: 15});
    jsav._undo = [];

    modelTree.root("?");
    modelTree.root().addClass("emptynode");
    modelTree.layout();

    var node = modelTree.root();

    while (node.value() !== keyToFind) {
      var index = getIndex(node, modelTree.root());
      node.removeClass("emptynode");
      node.value(initialData[index]);
      node.highlight();
      if ((index + 1) * 2 < nodeNum) {
        node.left("?");
        node.left().addClass("emptynode");
        node.right("?");
        node.right().addClass("emptynode");
        if (node.value() > keyToFind) {
          node = node.left();
        } else {
          node = node.right();
        }
      }
      modelTree.layout();
      jsav.stepOption("grade", true);
      jsav.step();
    }

    return modelTree;
  }

  function clickHandler() {
    if (!this.isHighlight()) {
      var index = getIndex(this, jsavBinaryTree.root());
      this.removeClass("emptynode");
      this.value(initialData[index]);
      this.highlight();
      if ((index + 1) * 2 < nodeNum) {
        BST.turnAnimationOff();
        this.left("?");
        this.left().addClass("emptynode");
        this.right("?");
        this.right().addClass("emptynode");
        BST.restoreAnimationState();
      }
      jsavBinaryTree.layout();
      exercise.gradeableStep();
    }
  }

  var exercise = av.exercise(modelSolution, initialize,
    { "css": "background-color" },
    { controls: $(".jsavexercisecontrols") });
  exercise.reset();
}(jQuery));