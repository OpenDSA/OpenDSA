"use strict";
/*global alert: true, BST, ODSA, PARAMS */
$(document).ready(function () {
  // Process about button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  // Set click handlers
  $("#about").click(about);


  function initialize() {
    BST.turnAnimationOff();

    function dataTest(array) {
      var bst = av.ds.binarytree();
      bst.insert(array);
      var result = bst.height() <= maxHeight;
      bst.clear();
      return result;
    }

    insertArray = JSAV.utils.rand.numKeys(10, 100, insertSize, {test: dataTest, tries: 10});
    if (stack) {
      stack.clear();
    }
    stack = av.ds.stack({center: true, xtransition: 10, ytransition: -3});
    //pick the values to delete and push them in the stack
    for (var i = 0; i < insertSize; i++) {
      stack.addLast(insertArray[i]);
    }
    stack.first().highlight();
    stack.layout();

    if (jsavTree) {
      jsavTree.clear();
    }
    //generate random tree
    jsavTree = av.ds.binarytree({center: true, visible: true, nodegap: 25});
    do {
      initialArray = [];
      perfectBinTree(initialArray, 1, 10, 100, 3, 1);
      initialArray = initialArray.concat(JSAV.utils.rand.numKeys(10, 100, treeSize-7));
    } while (!dataTest(initialArray));
    jsavTree.insert(initialArray);
    jsavTree.click(clickHandler);
    jsavTree.layout();

    av.container.find(".jsavcanvas").css("min-height", 442);

    return jsavTree;
  }

  function modelSolution(av) {
    var i;
    av._undo = [];
    var modelStack = av.ds.stack({center: true});
    for (i = 0; i < insertSize; i++) {
      modelStack.addLast(insertArray[i]);
    }
    modelStack.layout();
    modelStack.first().highlight();

    var modelTree = av.ds.binarytree({center: true, visible: true, nodegap: 20});
    modelTree.insert(initialArray);
    modelTree.layout();

    av.displayInit();


     for (i = 0; i < insertSize; i++){
       var val = insertArray[i];
       var node = modelTree.root();
       node.highlight();
       while(node.value() != ""){
           if (!node.left()){
             node.left("");
             modelTree.layout();
             av.step();
           }
           if (!node.right()){
             node.right("");
             modelTree.layout();
             av.step();
           }
         else if(val <= node.value()){
           node.left().highlight();
           node = node.left();
           node.edgeToParent().addClass("blueline");
           av.step();
         } else {
           node.right().highlight();
           node = node.right();
           node.edgeToParent().addClass("blueline");
           av.step();
         }
       }

      node.value(val);
      removeStyle(node);
      node.left("");
      node.right("");
      removeEmpty(modelTree.root());
      modelStack.removeFirst();
      modelStack.layout();
      if (modelStack.first()) {
        modelStack.first().highlight();
      }
      modelTree.layout();
      av.gradeableStep();
      av.step();
    }

    return modelTree;
  }

  function removeStyle(node){
    if (node.edgeToParent()){
      node.unhighlight();
      node.edgeToParent().removeClass("blueline");
      node = node.parent();
      removeStyle(node);
    } else {
      node.unhighlight();
    }
  }

  function removeEmpty(node){
    if (node.value() == ""){
      node.remove();
    }
    if (node.left()){
      removeEmpty(node.left())
    }
    if (node.right()){
      removeEmpty(node.right())
    }
    if (!node.left() && !node.right()){
      return;
    }
  }

  function checkPath(node){
    if(node.value() == jsavTree.root().value()){
      if(node.isHighlight()){
        pathcomplete = true;
        return;
      }else{
        pathcomplete = false;
        return;
      }
    }
    else{
      node = node.parent();
      if(node.isHighlight()){
        console.log("here")
        checkPath(node);
        //return true;
      }else{
        pathcomplete = false;
        return;
      }
    }
  }

  var clickHandler = function () {
    BST.turnAnimationOff();
    if (stack.size()) {
      if (this.value() == jsavTree.root().value){
        this.highlight();
        this.addClass("thicknode");
      }
      if(this.left() || this.right()){
        this.highlight();
        this.edgeToParent().addClass("blueline");
      }
      if(!this.left()){
        this.edgeToParent().addClass("blueline");
        this.addChild("");
        this.highlight();
      }
      jsavTree.layout();
      if(!this.right()){
        this.edgeToParent().addClass("blueline");
        this.addChild("");
        this.highlight();
      }
      //jsavTree.layout();
      if(this.value() == ""){
        console.log(checkPath(this))
        checkPath(this);
          if(pathcomplete == true){
            this.value(stack.first().value());
            removeStyle(this);
            removeEmpty(jsavTree.root());
            stack.removeFirst();
            stack.layout();
            exercise.gradeableStep();
          }else{
            removeStyle(this);
            removeEmpty(jsavTree.root());
          }
      }
      if(stack.first()){
        stack.first().highlight();
      }
      jsavTree.layout();
      }
  };

  // helper function for creating a perfect binary tree

  function perfectBinTree(arr, level, min, max, levelsInTotal, arrayIndex) {
    var diff = max - min;
    var value = JSAV.utils.rand.numKey(min + Math.floor(diff / 3), max - Math.floor(diff / 3));
    arr[arrayIndex - 1] = value;
    if (level < levelsInTotal) {
      perfectBinTree(arr, level + 1, min, value - 1, levelsInTotal, 2 * arrayIndex);
      perfectBinTree(arr, level + 1, value + 1, max, levelsInTotal, 2 * arrayIndex + 1);
    }
  }

  //////////////////////////////////////////////////////////////////
  // Start processing here
  //////////////////////////////////////////////////////////////////

  // AV variables
  var initialArray = [],
      insertArray = [],
      jsavTree,
      stack,
      pathcomplete,
      insertSize = 5,
      treeSize = 14,          //20 nodes
      maxHeight = 6,
      pseudo,

      // Load the configurations created by odsaAV.js
      config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,
      //code = config.code,
      //codeOptions = {after: {element: $(".instructions")}, visible: false},

      // Settings for the AV
      settings = config.getSettings(),

      // Create a JSAV instance
      av = new JSAV($(".avcontainer"), {settings: settings});

  av.recorded(); // we are not recording an AV with an algorithm

  // show a JSAV code instance only if the code is defined in the parameter
  // and the parameter value is not "none"
  // if (code) {
  //   pseudo = av.code($.extend(codeOptions, code));
  // }

  var exercise = av.exercise(modelSolution, initialize,
                              {controls: $(".jsavexercisecontrols")});
  exercise.reset();
});
