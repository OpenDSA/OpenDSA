/* global ODSA, ClickHandler */
(function ($) {
  "use strict";
  // AV variables
  var insertValues,
      tree,
      stack,
      insertSize = 5,

      // Configurations
      config = ODSA.UTILS.loadConfig({av_container: "jsavcontainer"}),
      interpret = config.interpreter,
      code = config.code,
      codeOptions = {after: {element: $(".instructions")}, visible: true},

      // Create a JSAV instance
      av = new JSAV($("#jsavcontainer"));

  av.recorded(); // we are not recording an AV with an algorithm

  av.code(code, codeOptions);

  function initialize() {

    av.container.find(".jsavcanvas").css("min-height", 450);


    // generate values for the stack
    insertValues = [7, 8, 9, 10]; //No duplicates!

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
    tree = new av.ds.arraytree(3);
    tree.root([3, 5, ""]);

    tree.root().addChild([1, 2, ""]);
    tree.root().addChild([3, 4, ""]);
    tree.root().addChild([5, 6, ""]);

    tree.layout();

    tree.click(function (index) {
      this.highlight(index);
    });

    return tree;
  }

  function modelSolution(jsav) {
    var modelTree = jsav.ds.arraytree(3);
    modelTree.root([3, 5, ""]);
    modelTree.root().addChild([1, 2, ""]);
    modelTree.root().addChild([3, 4, ""]);
    modelTree.root().addChild([5, 6, ""]);
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

  // create exercise and reset it
  var exercise = av.exercise(modelSolution, initialize, {feedback: "atend"});
  exercise.reset();

}(jQuery));