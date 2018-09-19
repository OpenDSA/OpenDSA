"use strict";
/*global alert: true, BST, ODSA, PARAMS */
$(document).ready(function () {
  // Process about button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  // Set click handlers
  $("#about").click(about);

  $(document).on('click', '#NewNode', function() {
    newNode = list.newNode("");
    newNode.css({top: 80, left: 222});
  });
  $(document).on('click', '#Insert', function() {
    if(newNode.next().value() == list.first().value()){
      list.addFirst(newNode);
      clicks = 0;
    }
    removeStyle(list.first());
    current.hide();
    current = av.pointer("current", list.get(0), {anchor: "top right"});
    current.show();
    head.hide();
    head = av.pointer("head", list.get(0));
    head.show();
    list.layout();
    //av.displayInit();
    exercise.gradeableStep();
  });

  function checkPath(node, insertNode){
    if(node.value() == insertNode){
      pathcomplete = true;
      return;
    }
    if(node.isHighlight()){
      checkPath(node.next(), insertNode);
    }else{
      pathcomplete = false;
      return;
    }
  }

  function initialize() {
    if (stack){
      stack.clear();
    }
    if (list){
      list.clear();
    }
    if (head){
      head.hide();
      av.displayInit();
    }
    if (current){
      current.target(list.get(0));
      av.displayInit();
    }

    clicks = 0;

    stack = av.ds.stack({center: true, xtransition: 5, ytransition: -3});
    stackArray = JSAV.utils.rand.numKeys(10, 100, 4);
    for(var i = 0; i < stackArray.length; i++){
      stack.addLast(stackArray[i]);
    }
    stack.first().highlight();
    stack.layout();

    list = av.ds.list({center: true, nodegap: 30});
    randInsert = JSAV.utils.rand.numKeys(10, 100, 4, {sorted: true});
    list.first("null");
    for (var i = 0; i < randInsert.length; i++){
      list.add(i, randInsert[i]);
      list.layout();
    }
    list.addFirst("first");
    list.layout();
    head = av.pointer("head", list.get(0));
    head.show();
    if (!current){
      current = av.pointer("current", list.get(0), {anchor: "top right"});
    }
    list.click(clickHandler);
    return list;
  }

  function modelSolution(av) {
    av._undo = [];
    var i;
    var j;
    modelStack = av.ds.stack({center: true, xtransition: 5, ytransition: -3});
    for(var i = 0; i < stackArray.length; i++){
      modelStack.addLast(stackArray[i]);
    }
    modelStack.layout();
    modelStack.first().highlight();

    var modelList = av.ds.list({center: true, nodegap: 30});
    modelList.first("null");
    for (var i = 0; i < randInsert.length; i++){
      modelList.add(i, randInsert[i]);
      modelList.layout();
    }
    modelList.addFirst("first");
    modelList.layout();
    head = av.pointer("head", modelList.get(0));
    head.show();
    if (!current){
      current = av.pointer("current", modelList.get(0), {anchor: "top right"});
    }
    av.displayInit();

    var modelCount = 0;
    for (j = 0; j < stackArray.length; j++){
      for(i = 1; i < randInsert.length; i++){
        console.log("2")
        modelList.get(i).highlight();
        var val = modelStack.first().value();
        console.log(val)
        var listVal1 = modelList.get(i).value();
        var listVal2 = modelList.get(i+1).value();

        //Handle the case of inserting in the front of linked list
        if(modelList.get(i-1).value() == "first" && val <= modelList.get(i).value()){
          var newModelNode = modelList.newNode("");
          newModelNode.css({top: 80, left: 222});
          av.step();

          newModelNode.value(val);
          highlightNextModel();
          removeStyle(modelList.first());
          av.step();

          listVal1 = modelList.get(i-1);
          listVal2 = modelList.get(i);
          var nodeReady = true;
          av.step();
          console.log("Insert Front")

        }
        else if((val >= listVal1 && val < listVal2 )){
          var newModelNode = modelList.newNode("");
          newModelNode.css({top: 80, left: 222});
          av.step();

          newModelNode.value(val);
          highlightNextModel();
          removeStyle(modelList.first());
          listVal1 = modelList.get(i);
          listVal2 = modelList.get(i+1);
          var nodeReady = true;
          av.step();
          console.log("InBetween Insert")
        }else if(val > listVal1 && listVal2 == "null"){
          var newModelNode = modelList.newNode("");
          newModelNode.css({top: 80, left: 222});
          av.step();

          newModelNode.value(val);
          highlightNextModel();
          removeStyle(modelList.first());
          listVal1 = modelList.get(i);
          listVal2 = modelList.get(i+1);
          var nodeReady = true;
          av.step();
          console.log("End Insert")
        }
        if(nodeReady == true){
          var beginning = listVal1;
          var end = listVal2;

          end.highlight();
          av.step();

          newModelNode.next(end);
          modelList.layout({updateLeft: false, updateTop: false});
          av.step();

          modelList.get(i).highlight();
          av.step();

          newModelNode.highlight();
          beginning.next(newModelNode);
          modelList.layout({updateLeft: false, updateTop: false});
          av.step();

          modelList.layout();
          removeStyle(modelList.first());
          av.gradeableStep();
          modelCount++;
          nodeReady = false;
          console.log("Inserted")
          break;
        }
          av.step();
      }
    }
    return modelList;
  }

  function highlightNext() {
    stack.removeFirst();
    stack.layout();
    //higlight the next one
    if (stack.size()) {
      stack.first().highlight();
    }
  }
  function highlightNextModel() {
    modelStack.removeFirst();
    modelStack.layout();
    //higlight the next one
    if (modelStack.size()) {
      modelStack.first().highlight();
    }
  }
  function removeStyle(node){
    while(node.value() != "null"){
      node.unhighlight();
      node = node.next();
    }
    if(node.value() == "null"){
      node.unhighlight();
      return;
    }
  }

  var clickHandler = function () {
    if (clicks == 2){
      if (this.value() > newNode.next().value() || this.value() == "null"){
        alert("must select smaller value to point to new node");
        return;
      }
      this.next(newNode);
      this.highlight();
      console.log(this.next().value());
      list.layout({updateLeft: false, updateTop: false});
      current.hide();
      current = av.pointer("current", list.get(0), {anchor: "top right"});
      av.displayInit();
      current.show();
      clicks = 0;
    }
    if (clicks == 1){
      var nodeHere = true;
    }
    if (this.value() == ""){
      newNode.value(stack.first().value());
      highlightNext();
      removeStyle(list.first());
      console.log(newNode.value())
      clicks++;
    }
    else if (this.value() != ""){
      this.highlight();
      current.target(this);
      av.displayInit();
      currentNode = this;
    }
    if(nodeHere == true){
      if(this.value() == "first"){
        alert("dont insert before this node");
        removeStyle(list.first());
        return;
      }
      newNode.next(this);
      this.highlight();
      console.log(newNode.next());
      nodeHere = false;
      clicks++;
    }
    head.hide();
    head = av.pointer("head", list.get(0));
    head.show();
  };

  //////////////////////////////////////////////////////////////////
  // Start processing here
  //////////////////////////////////////////////////////////////////

  // AV variables
  var initialArray = [],
      deleteValues = [],
      stack,
      modelStack,
      stackArray,
      randInsert,
      list,
      head,
      pathcomplete,
      clicks,
      newNode,
      currentNode,
      current,
      pseudo,

      // Load the configurations created by odsaAV.js
      config = ODSA.UTILS.loadConfig({default_code: "none"}),
      interpret = config.interpreter,

      // Settings for the AV
      settings = config.getSettings(),

      // Create a JSAV instance
      av = new JSAV($(".avcontainer"));

  av.recorded(); // we are not recording an AV with an algorithm


  var exercise = av.exercise(modelSolution, initialize,
                             {controls: $(".jsavexercisecontrols")});
  exercise.reset();
});
