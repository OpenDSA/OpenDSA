"use strict";
/*global alert: true, BST, ODSA, PARAMS */
$(document).ready(function () {
  // Process about button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }
  BST.turnAnimationOff();
  // Set click handlers
  $("#about").click(about);

  function removeStyle(node){
    if (node.edgeToParent()){
      node.unhighlight();
      node = node.parent();
      removeStyle(node);
    } else {
      node.unhighlight();
    }
  }

  function initialize() {
    if(arrcount){
      arrcount = 0;
    }
    av._undo = [];
    if(count){
      count = 0;
    }

    if(JSAV_EXERCISE_OPTIONS.code){
      av.clear();
    }
    JSAV_EXERCISE_OPTIONS.code = "BSTAlgorithm";
    var pseudo = av.code(code[0]);

    var randomVal = 0;
    for (var i = 0; i < 10; i++) {
      randomVal = Math.floor(JSAV.utils.rand.random() * 100 + 1);
      nextArray[i] = randomVal;
    }

    if(arr){
      arr.clear();
    }

    arr = av.ds.array(nextArray, {visible: true, center: true, xtransition: 5, ytransition: -3});
    arr.highlight(0);
    arr.layout();

    if (jsavTree) {jsavTree = av.ds.binarytree({ visible: true, nodegap: 25, anchor: "center "});
      jsavTree.clear();
    }
    //generate random tree
    jsavTree = av.ds.binarytree({ center: true, visible: true, nodegap: 25});
    jsavTree.click(clickHandler);
    jsavTree.root("?")
    jsavTree.layout();

    av.container.find(".jsavcanvas").css("min-height", 442);
    // av.container.find(".jsavtree").css("min-width", 10);
    // av.container.find(".jsavtree").css("right", 20);

    count = 0;
    arrcount = 0;


    return jsavTree;
  }



  function modelSolution(av) {

    // av.undo = [];
    // var i;
    // var modelcount = 0;
    // if (modelcount){
    //   modelcount = 0;
    // }
    //
    // var modelarr = av.ds.array(nextArray, {center: true, xtransition: 5, ytransition: -3});
    // modelarr.click(clickHandler);
    // modelarr.layout();
    //
    // if (modelTree) {
    //   modelTree.clear();
    // }
    // //generate random tree
    // var modelTree = av.ds.binarytree({center: true, visible: true, nodegap: 25, relativeTo: arr, anchor: "center bottom"});
    // modelTree.click(clickHandler);
    // modelTree.layout();
    // av.displayInit();
    // console.log(modelTree.root().value() == "")
    // var modelflip = 1;
    // for (i = 0; i < nextArray.length; i++){
    //   var insertval = nextArray[i];
    //   var node = modelTree.root();
    //   while(node.value() != ""){
    //     if(modelflip == 1 && !node.left()){
    //       node.left("");
    //       av.step();
    //     }
    //     if(modelflip == 2 && !node.right()){
    //       node.right("");
    //       av.step();
    //     }
    //     if(modelflip == 1){
    //       node = node.left();
    //       modelflip++;
    //       av.step();
    //     } else {
    //       node = node.right();
    //       modelflip--;
    //       av.step();
    //     }
    //   }
    //    node.value(insertval);
    //    av.step();
    //    modelarr.value(modelcount, "");
    //    modelcount++;
    //    modelTree.layout();
    //    av.gradeableStep();
    //    av.step();
    // }

    av._undo = [];
    var i;
    var modelcount = 0;
    if(modelcount){
      modelcount = 0;
    }

    var modelarr = av.ds.array(nextArray, {center: true, xtransition: 5, ytransition: -3});
    modelarr.click(clickHandler);
    modelarr.layout();

    if (modelTree) {
      modelTree.clear();
    }
    //generate random tree
    var modelTree = av.ds.binarytree({center: true, visible: true, nodegap: 25});
    modelTree.click(clickHandler);
    modelTree.layout();
    console.log(modelTree.root().value() == "?")
    modelTree.root().value("?");
    av.step();
    av.displayInit();
    for (i = 0; i < nextArray.length; i++){
      var insertval = nextArray[i];
      var node = modelTree.root();
      while(node.value() != "?"){
        if(!node.right()){
          node.right("?");
          modelTree.layout();
          av.step();
        }
        if(!node.left()){
          node.left("?");
          modelTree.layout();
          av.step();
        }
        if(insertval <= node.value()){
          node = node.right();
        } else {
          node = node.left();
        }
      }
       node.value(insertval);
       modelarr.value(modelcount, "");
       modelarr.unhighlight(modelcount);
       modelarr.highlight(modelcount + 1);
       node.left("?");
       node.right("?");
       modelcount++;
       modelTree.layout();
       //av.gradeableStep();
       av.stepOption("grade", true);
       av.step();


    }

    return modelTree;
  }


  var clickHandler = function () {
    av._undo = [];
    BST.turnAnimationOff();
    currentNode = this;
    if (this.value() == "?"){
      this.higlight();
      this.value(arr.value(arrcount));
      arr.value(arrcount, "");
      arr.unhighlight(arrcount);
      arr.highlight(arrcount + 1);
      this.left("?");
      this.right("?");
      jsavTree.layout();
      exercise.gradeableStep();
      arrcount++;
    }
  };




  //////////////////////////////////////////////////////////////////
  // Start processing here
  //////////////////////////////////////////////////////////////////

  // AV variables
  var initialArray = [],
      nextArray = [],
      insertArray = [],
      jsavTree,
      arr,
      arrcount,
      count = 0,
      insertSize = 5,
      treeSize = 14,          //20 nodes
      maxHeight = 6,
      currentNode,
      pseudo;


      // Load the configurations created by odsaAV.js
      var config = ODSA.UTILS.loadConfig();
      var interpret = config.interpreter;
      var code = config.code;

      //codeOptions = {after: {element: $(".instructions")}, visible: false},

      // Settings for the AV
      //var settings = config.getSettings();

      // Create a JSAV instance
      var av = new JSAV($(".avcontainer"), {settings: settings}, {animationMode: "none"});

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
