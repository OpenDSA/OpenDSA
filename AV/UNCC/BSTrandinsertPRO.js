"use strict";
/*global alert: true, BST, ODSA, PARAMS */
$(document).ready(function () {
  // Process about button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }
  BST.turnAnimationOff();

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

  // Set click handlers
  $("#about").click(about);

  //init the module and all of its structures
  function initialize() {
    //clear the current code box if one exists
     if(JSAV_EXERCISE_OPTIONS.code){
       av.clear();
       //var rand = [];
     }
     //create 3 rand numbers whic will be the numbers for the algorithm. the random numbers are between 2 and 4
     for (k = 0; k < 3; k++){
        rand[k] = Math.floor(Math.random() * ((4-2)+1) + 2);
     }

     rand[0] = 2;
     k = 0;

     //the if statements for deciding which algorithm to Choose
     //these algorithms are selected and rendered to the screen.
     //based on how the random number is set, we can change each time
     //the user loads the module
     if (rand[k] == 2){
       JSAV_EXERCISE_OPTIONS.code = "processing";
       console.log("2")
       config = ODSA.UTILS.loadConfig();
       code = config.code;                   // get the code object
       pseudo = av.code(code[0]);
      }
     if (rand[k] == 3){
       JSAV_EXERCISE_OPTIONS.code = "java";
       console.log("3")
       config = ODSA.UTILS.loadConfig();
       code = config.code;                   // get the code object
       pseudo = av.code(code[0]);
     }
     if (rand[k] == 4){
       JSAV_EXERCISE_OPTIONS.code = "java_generic";
       console.log("4")
       config = ODSA.UTILS.loadConfig();
       code = config.code;                   // get the code object
       pseudo = av.code(code[0]);
     }

    //start with the first line in the algorithm highlighted
    //can be changes in the .json file
    av.umsg(interpret("av_isnull"));
    pseudo.setCurrentLine("start");
    av.displayInit();
    //set the dynamic instructions as well
    document.getElementById("output").innerHTML = "Begin with tracing the path of insertion starting at the root node.";

    BST.turnAnimationOff();//set the bst animations off because of bugs

    //test if the data going into tree and stack is correct data
    function dataTest(array) {
      var bst = av.ds.binarytree();
      bst.insert(array);
      var result = bst.height() <= maxHeight;
      bst.clear();
      return result;
    }

    //init the random array of values to use to put into the stack and the tree
    insertArray = JSAV.utils.rand.numKeys(10, 100, insertSize * 3, {test: dataTest, tries: 10});
    //clear the stack on reset if one exists
    if (stack) {
      stack.clear();
    }
    stack = av.ds.stack({center: true, xtransition: 5, ytransition: -3});
    //pick the values to delete and push them in the stack
    for (var i = 0; i < insertSize *3; i++) {
      stack.addLast(insertArray[i]);
    }
    stack.first().highlight();
    stack.layout();

    if (jsavTree) {
      jsavTree.clear();
    }
    //generate random tree
    jsavTree = av.ds.binarytree({center: true, visible: true, nodegap: 20});
    do {
      initialArray = [];
      perfectBinTree(initialArray, 1, 10, 100, 3, 1);
      initialArray = initialArray.concat(JSAV.utils.rand.numKeys(10, 100, treeSize-7));
    } while (!dataTest(initialArray));
    jsavTree.insert(initialArray);
    jsavTree.click(clickHandler);
    grayOut(jsavTree.root());
    jsavTree.root().highlight();
    jsavTree.root().left().css({"background-color": "white"});
    jsavTree.root().right().css({"background-color": "white"});
    jsavTree.layout();

    av.container.find(".jsavcanvas").css("min-height", 442);

    return jsavTree;
  }

  function modelSolution(av) {
    var i;
    av._undo = [];
    var modelStack = av.ds.stack({center: true});
    for (i = 0; i < insertSize * 3; i++) {
      modelStack.addLast(insertArray[i]);
    }
    modelStack.layout();
    modelStack.first().highlight();

    var modelTree = av.ds.binarytree({center: true, visible: true, nodegap: 20});
    modelTree.insert(initialArray);
    grayOut(modelTree.root());
    modelTree.root().highlight();
    modelTree.root().left().css({"background-color": "white"});
    modelTree.root().right().css({"background-color": "white"});
    modelTree.layout();

    av.displayInit();

    var modelruns = 0;
    var stepcount = 0;
    var k = 0

     for(i = 0; i < insertSize * 3; i++){
       var val = insertArray[i];
       var node = modelTree.root();
       node.highlight();
       modelTree.root().left().css({"background-color": "white"});
       modelTree.root().right().css({"background-color": "white"});
       modelTree.layout();
       //var rand = Math.floor(Math.random() * ((4-2)+1) + 2);
       console.log(rand[k])
       if (rand[k] == 2){
         while(node.value() != "?"){
           if(!node.left() || !node.right()){
             if (!node.left()){
               node.left("?");
               modelTree.layout();
             }
             if (!node.right()){
               node.right("?");
               modelTree.layout();
             }
             av.step();
           }
           if(val <= node.value()){
             if(node.left().value() == "?"){
               node = node.left();
               break;
             }
             node.left().highlight();
             node = node.left();
             if(!node.left() || !node.right()){
               if (!node.left()){
                 node.left("?");
                 modelTree.layout();
               }
               if (!node.right()){
                 node.right("?");
                 modelTree.layout();
               }
             }
             if(node.left()){
               node.left().css({"background-color": "white"});
             }
             if(node.right()){
               node.right().css({"background-color": "white"});
             }
             node.edgeToParent().addClass("blueline");
           } else {
             if(node.right().value() == "?"){
               node = node.right();
               break;
             }
             node.right().highlight();
             node = node.right();
             if(!node.left() || !node.right()){
               if (!node.left()){
                 node.left("?");
                 modelTree.layout();
               }
               if (!node.right()){
                 node.right("?");
                 modelTree.layout();
               }
             }
             if(node.left()){
               node.left().css({"background-color": "white"});
             }
             if(node.right()){
               node.right().css({"background-color": "white"});
             }
             node.edgeToParent().addClass("blueline");
             //av.gradeableStep();
           }
           if(node.value() != "?"){
            av.gradeableStep();
          }
         }
      }
    //   if (rand[k] == 3){
    //     while(node.value() != ""){
    //         if (!node.left()){
    //           node.left("");
    //           modelTree.layout();
    //           av.step();
    //         }
    //         if (!node.right()){
    //           node.right("");
    //           modelTree.layout();
    //           av.step();
    //         }
    //       else if(val <= node.value()){
    //         node.left().highlight();
    //         node = node.left();
    //         node.edgeToParent().addClass("blueline");
    //         av.step();
    //       } else {
    //         node.left().highlight();
    //         node = node.left();
    //         node.edgeToParent().addClass("blueline");
    //         av.step();
    //       }
    //     }
    //  }
    //  if (rand[k] == 4){
    //    while(node.value() != ""){
    //        if (!node.left()){
    //          node.left("");
    //          modelTree.layout();
    //          av.step();
    //        }
    //        if (!node.right()){
    //          node.right("");
    //          modelTree.layout();
    //          av.step();
    //        }
    //      else if(val <= node.value()){
    //        node.right().highlight();
    //        node = node.right();
    //        node.edgeToParent().addClass("blueline");
    //        av.step();
    //      } else {
    //        node.right().highlight();
    //        node = node.right();
    //        node.edgeToParent().addClass("blueline");
    //        av.step();
    //      }
    //    }
    // }
      node.value(val);
      //stepcount++;
      removeStyle(node);
      // node.left("");
      // node.right("");
      removeEmpty(modelTree.root());
      removeStyle(modelTree.root());
      grayOut(modelTree.root());
      modelTree.root().highlight();
      modelTree.root().left().css({"background-color": "white"});
      modelTree.root().right().css({"background-color": "white"});
      modelTree.layout();
      modelStack.removeFirst();
      modelStack.layout();
      if (modelStack.first()) {
        modelStack.first().highlight();
      }
      av.gradeableStep();
      if(stepcount == 2){
        k++
        console.log("randtemp "+ rand[k])
        stepcount = 0;
       }
      //av.step();
    }
    k=1;
    return modelTree;
}

  //recursive function to remove the highlighing of tree nodes and edges
  //@param node - root node to start at
  function removeStyle(node){
    node.unhighlight();
    if(node.edgeToParent()){
      node.edgeToParent().removeClass("blueline");
    }
    if(node.left() || node.right()){
      if(node.left()){
        node.left().unhighlight();
        removeStyle(node.left());
      }
      if(node.right()){
        node.right().unhighlight();
        removeStyle(node.right());
      }
    }else{
      return;
    }
  }

  //recursive function to remove the empty nodes in the bst after inserting
  //@param node - root node to start
  function removeEmpty(node){
    if (node.value() == "?" || node.value()  == ""){
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

  //recursive function to check if the user traced a path from root before inserting
  //@param node - the node that was inserted
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

  //function to inhighlight all the lines in the psuedocode section
  function unhighlightcode(){
    for( i = 0; i < 17; i++){
      pseudo.unhighlight([i]);
      av.step();
    }
    return;
  }

  //handel the click events
  var clickHandler = function () {
    av._redo = [];
    BST.turnAnimationOff();
    //make sure that there is a value in the stack to be inserted and that the parent is highlighted before clicking the node
      if (stack.size() && this.parent().isHighlight()) {
        //if there is not a left or right child of the current node, add the children
        // if(clicks == 0){
        //   this.highlight();
        //   if(this.left()){
        //     this.left().css({"background-color": "white"});
        //   }
        //   if(this.right()){
        //     this.right().css({"background-color": "white"});
        //   }
        //   this.edgeToParent().addClass("blueline");
        //   pseudo.unhighlight([2,3,4,5]);
        //   pseudo.highlight([6,7,8]);
        //   document.getElementById("output").innerHTML = "Choose the child to continue the correct path.";
        //   jsavTree.layout();
        //   clicks++;
        //   //exercise.gradeableStep();
        //   //exercise.gradeableStep();
        // }
        if(!this.left() || !this.right()){
          if(!this.left()){
            this.edgeToParent().addClass("blueline");
            this.addChild("?");
            this.highlight();
            document.getElementById("output").innerHTML = "Choose the child to continue the correct path. Insert the value in an '?' node when ready.";
          }
          if(!this.right()){
            this.edgeToParent().addClass("blueline");
            this.addChild("?");
            this.highlight();
            document.getElementById("output").innerHTML = "Choose the child to continue the correct path. Insert the value in an '?' node when ready.";
          }
          //av.step()
        }
        if(this.value() != "?"){
          console.log("here")
          this.highlight();
          //set the children of the new explored node to be 'white'
          if(this.left()){
            this.left().css({"background-color": "white"});
          }
          if(this.right()){
            this.right().css({"background-color": "white"});
          }
          this.edgeToParent().addClass("blueline");
          pseudo.unhighlight([2,3,4,5]);
          pseudo.highlight([6,7,8]);
          document.getElementById("output").innerHTML = "Choose the child to continue the correct path.";
          jsavTree.layout();
          //exercise.gradeableStep();
        }
        // if(clicks == 0){
        //   exercise.gradeableStep();
        //   clicks++;
        // }
        if(this.value() != "?"){
          exercise.gradeableStep();
        }
        //if this is an empty node, then insert the value into the node and reset the styling of the tree
        //ie. remove all empty nodes, regray the tree, unhighlight all nodes and links, rehighlight the root node
        if(this.value() == "?"){
          pseudo.unhighlight([1,2,3,4,5,6,7,8]);
          if(this == this.parent().left()){
            unhighlightcode();
            pseudo.highlight([9,10,11]);
          }else{
            unhighlightcode();
            pseudo.highlight([14,15,16]);
          }
          this.value(stack.first().value());
          removeStyle(jsavTree.root());
          removeEmpty(jsavTree.root());
          grayOut(jsavTree.root());
          jsavTree.root().highlight();
          jsavTree.root().left().css({"background-color": "white"});
          jsavTree.root().right().css({"background-color": "white"});
          //enable for code changing during insert
          //stacksize = stacksize - 1;
          stack.removeFirst();
          stack.layout();
          jsavTree.layout();
          if(stack.first()){
            stack.first().highlight();
          }
          exercise.gradeableStep();
          document.getElementById("output").innerHTML = "Begin with tracing the path of insertion starting at the root node.";
        }
        jsavTree.layout();
        //exercise.gradeableStep();
      }

      //when enabled, this section of code will change the algorithm based on a certain amount of insertions
      //the user does. the algorithm is selected based on the array of random numbers generated during init
      if(stacksize == 0){
        console.log("in loop to change")
        if(JSAV_EXERCISE_OPTIONS.code){
          $('.jsavcode').hide();
        }
          if (rand[k+1] == 2){
              JSAV_EXERCISE_OPTIONS.code = "processing";
              console.log("2")
              config = ODSA.UTILS.loadConfig();
              var interpret = config.interpreter;       // get the interpreter
              code = config.code;                   // get the code object
              pseudo = av.code(code[0]);
              console.log("here at 2")
          }
          if (rand[k+1] == 3){
              JSAV_EXERCISE_OPTIONS.code = "java";
              console.log("3")
              config = ODSA.UTILS.loadConfig();
              var interpret = config.interpreter;       // get the interpreter
              code = config.code;                   // get the code object
              pseudo = av.code(code[0]);
              console.log("here at 3")
          }
          if (rand[k+1] == 4){
              JSAV_EXERCISE_OPTIONS.code = "java_generic";
              console.log("4")
              config = ODSA.UTILS.loadConfig();
              var interpret = config.interpreter;       // get the interpreter
              code = config.code;                   // get the code object
              pseudo = av.code(code[0]);
              console.log("here at 4")
          }
          stack.first().highlight();
          stack.layout();
           function dataTest(array) {
             var bst = av.ds.binarytree();
             bst.insert(array);
             var result = bst.height() <= maxHeight;
             bst.clear();
             return result;
           }
          jsavTree.layout();
          //exercise.gradeableStep();
          $('.jsavcanvas').prepend($('.jsavcode'));
          stacksize = 2;
          k++
          runs += 1;
          console.log("value " + runs)
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
      pseudo,
      clicks = 0,
      modelclicks = 0,
      insertSize = 2,
      treeSize = 8,          //20 nodes
      maxHeight = 6,
      runs = 0,
      pathcomplete,
      modelruns = 0,
      m = 1,
      stacksize = 2,
      code,
      config,
      k,
      j = 0,
      stepcount,
      rand = [],
      randtemp;


  var av_name = "BSTrandinsertPRO";
  var config = ODSA.UTILS.loadConfig({av_name: av_name});
  var interpret = config.interpreter;
  var code = config.code;

  var av = new JSAV($(".avcontainer"), {settings: settings}, av_name);

  av.recorded();

  var exercise = av.exercise(modelSolution, initialize,
                              {controls: $(".jsavexercisecontrols")},
                              {feedback: "undo"}, {compare: {class: "jsavhighlight"}});
//{compare: $(".jsavtree")}
 // we are not recording an AV with an algorithm
  exercise.reset();

});
