"use strict";
/*global alert: true, BST, ODSA, PARAMS */
$(document).ready(function () {
  // Process about button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  // Set click handlers
  $("#about").click(about);

  //recursive function to grayout the entire bst
  //@param root - is the root of the tree to start
  function grayOut(root){
    root.css({"background-color": "gray"});
    if(!root.left() && !root.right()){
      return;
    }
    if(root.left()){
      grayOut(root.left());
    }
    if(root.right()){
      grayOut(root.right());
    }
  }


  $(document).on('click', '#Found', function() {
    currentNode.unhighlight();
    if(currentNode.value() == stack.first().value()){
       currentNode.css({"background-color": "green"});
       exercise.gradeableStep();
    }else{
      currentNode.css({"background-color": "red"});
      exercise.gradeableStep();
    }
    stack.removeFirst();
    currentNode.unhighlight();
    removeStyle(jsavTree.root());
    grayOut(jsavTree.root());
    jsavTree.root().highlight();
    jsavTree.root().left().css({"background-color": "white"});
    jsavTree.root().right().css({"background-color": "white"});
    //av.step();
  });

  //remove the styling in the tree. ie highlighing and edge highlighting
  //@param node - the root node of the tree (reursive)
  function removeStyle(node){
    node.unhighlight();
    if(!node.left() && !node.right()){
      return;
    }
    if(node.left()){
      var nextLeft = node.left();
      removeStyle(nextLeft);
    }
    if(node.right()){
      var nextRight = node.right();
      removeStyle(nextRight);
    }
  }

  function hideValues(node){
    if(!node){
      return;
    }
    node.value("");
    if (node.left()){
      hideValues(node.left());
    }
    if (node.right()){
      hideValues(node.right());
    }
  }

  function initialize() {
    av.clear();
    av._undo = [];
    alreadyUsed = [];
    found = 0;
    //BST.turnAnimationOff();

    //test if the data going into tree and stack is correct data
    function dataTest(array) {
      var bst = av.ds.binarytree();
      bst.insert(array);
      var result = bst.height() <= maxHeight;
      bst.clear();
      return result;
    }

    /**
    * Randomize array element order in-place.
    * Using Durstenfeld shuffle algorithm.
    */
    function Shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    if (jsavTree) {
      jsavTree.clear();
    }

    //init the random array of values to use to put into the stack and the tree
    insertArray = JSAV.utils.rand.numKeys(10, 100, 6, {test: dataTest, tries: 10});
    //clear the stack on reset if one exists
    if (stack) {
      stack.clear();
      copyArray = [];
    }
    stack = av.ds.stack({center: true, xtransition: 5, ytransition: -3});
    do {
      initialArray = [];
      perfectBinTree(initialArray, 1, 10, 100, 3, 1);
      initialArray = initialArray.concat(JSAV.utils.rand.numKeys(10, 100, treeSize-7));
    } while (!dataTest(initialArray));
    //pick the values to delete and push them in the stack
    //generate random tree
    jsavTree = av.ds.binarytree({center: true, visible: true, nodegap: 15});
    jsavTree.click(clickHandler);
    jsavTree.insert(initialArray);
    //hideValues(jsavTree.root());
    for(i =0; i< initialArray.length-1; i++){
      copyArray.push(initialArray[i]);
    }
    Shuffle(copyArray)
    for (var i = 1; i < insertSize; i = i +2) {
      stack.addLast(copyArray[i]);
    }
    stack.first().highlight();
    stack.layout();

    grayOut(jsavTree.root());
    jsavTree.root().highlight();
    jsavTree.root().left().css({"background-color": "white"});
    jsavTree.root().right().css({"background-color": "white"});

    jsavTree.layout();

    av.container.find(".jsavcanvas").css("min-height", 442);
    alreadyUsed[0] = stack.first();
    return jsavTree;
  }



  function modelSolution(av) {
    var i;
    av._undo = [];
    modelStack = av.ds.stack({center: true});
    for (i = 1; i < insertSize; i = i +2) {
      modelStack.addLast(copyArray[i]);
    }
    modelStack.layout();
    modelStack.first().highlight();

    modelTree = av.ds.binarytree({center: true, visible: true, nodegap: 20});
    modelTree.insert(initialArray);
    grayOut(modelTree.root());
    modelTree.root().highlight();
    modelTree.root().left().css({"background-color": "white"});
    modelTree.root().right().css({"background-color": "white"});
    modelTree.layout();
    av.displayInit();

    console.log(modelStack)
    console.log(initialArray)

    for (var i = 0; i < 4; i++){
      var val = modelStack.first();
      var cur = modelTree.root();
      console.log(cur.value())
      while(val.value() != cur.value()){
        if(val.value() <= cur.value()){
          cur = cur.left();
          cur.highlight();
          if(cur.left()){
            cur.left().css({"background-color": "white"});
          }
          if(cur.right()){
            cur.right().css({"background-color": "white"});
          }
        }else{
          cur = cur.right();
          cur.highlight();
          if(cur.left()){
            cur.left().css({"background-color": "white"});
          }
          if(cur.right()){
            cur.right().css({"background-color": "white"});
          }
       }
       av.gradeableStep();
      }
      cur.unhighlight();
      cur.css({"background-color": "green"});
      av.gradeableStep();
      modelStack.removeFirst();
      removeStyle(modelTree.root());
      grayOut(modelTree.root());
      modelTree.root().highlight();
      modelTree.root().left().css({"background-color": "white"});
      modelTree.root().right().css({"background-color": "white"});
      av.step();
    }


    return modelTree;
  }

  function checkArray(value){
    for (i = 0; i < alreadyUsed.length; i++){
      if (alreadyUsed[i] == value){
        check = true;
        return;
      }
    }
    check = false;
    return;
  }

  var fixState = function(){

  }

  var clickHandler = function () {
    currentNode = this;
    if (!this.isHighlight() && this.parent().isHighlight()) {
      insertCount += 1;
      this.highlight();
      if(this.left()){
        this.left().css({"background-color": "white"});
      }
      if(this.right()){
        this.right().css({"background-color": "white"});
      }

      if(!stack.first()){
        removeStyle(jsavTree.root());
        jsavTree.layout();
        av.displayInit();
        return;
      }
      exercise.gradeableStep();
    }
    jsavTree.layout();

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
  var initialData = [],
      initialArray = [],
      insertArray = [],
      alreadyUsed = [],
      levels = 5,
      treeSize = 25,
      stack,
      modelStack,
      currentNode,
      insertSize = 8,
      modelTree,
      modelKeyToFind,
      maxHeight = 10,
      insertCount = 0,
      correct,
      nodeNum = Math.pow(2, levels) - 1,
      jsavTree,
      check,
      val,
      cur,
      found = 0,
      copyArray = [],
      keyToFind,
      inserted = 0,
      match,
      $key = $('#keyToFind'),
      pseudo;


  // Load the configurations created by odsaAV.js
  var av_name = "BSTfindPRO";
  var config = ODSA.UTILS.loadConfig();
  var interpret = config.interpreter;
  var code = config.code;

  // Create a JSAV instance
  var av = new JSAV($(".avcontainer"), {settings: settings}, av_name, {animationMode: "none"});

  av.recorded(); // we are not recording an AV with an algorithm

  var exercise = av.exercise(modelSolution, initialize,
                              {controls: $(".jsavexercisecontrols")}, {feedback: "continuous"}, {compare: {"css": "background-color"}});
  exercise.reset();
});
