"use strict";
/*global alert: true, BST, ODSA, PARAMS */
$(document).ready(function () {
  // Process about button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  // Set click handlers
  $("#about").click(about);

  $(document).on('click', '#RemoveNode', function() {
    if(currentNode.value() == stack.first().value()){
      highlightNext();
    }
    if (currentNode.value() == list.first().value()){
      list.removeFirst();
      list.layout();
      av.displayInit();
    }
    else{
      currentNode.value("");
      selectedNode = true;
      removeStyle(list.first());
      highlightNext();
    }
  });

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

    function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
     }
     return a;
    }

    clicks = 0;

    randInsert = JSAV.utils.rand.numKeys(10, 100, 6, {sorted: true});
    stack = av.ds.stack({center: true, xtransition: 5, ytransition: -3});
    stackArray = JSAV.utils.rand.sample(randInsert);
    shuffle(stackArray);
    for(var i = 0; i < 4; i++){
      stack.addLast(stackArray[i]);
    }
    stack.first().highlight();
    stack.layout();


    list = av.ds.list({center: true, nodegap: 30});

    list.first("null");
    for (var i = 0; i < randInsert.length; i++){
      list.add(i, randInsert[i]);
      list.layout();
    }
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
      modelList.layout();
      head = av.pointer("head", modelList.get(0));
      head.show();
      if (!current){
        current = av.pointer("current", modelList.get(0), {anchor: "top right"});
      }
      av.displayInit();
      while (modelStack.first()){
        modelList.first().highlight();
        var currentModelNode = modelList.first().highlight();
        if(modelList.first().value() == modelStack.first().value()){
          modelList.remove(0);
        }else{
          currentModelNode = currentModelNode.next();
          currentModelNode.highlight();
          if (currentModelNode.value() == modelStack.first().value()){
            currentModelNode.value("");
            var action = 1;
          }
          if(action = 1){
            var deleteIndex = findDelete(modelList.get(0));
            deleteIndex = deleteIndex - 1;
            modelList.get(deleteIndex).highlight();
            modelList.layout()
            av.step()
            action = 2;
          }
          if (action = 2){
            modelList.get(deleteIndex).highlight();
            dsad
            av.step();
            action = 0;
          }
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
  function removeStyle(node){
    while(node.value() != "null"){
      node.unhighlight();
      node = node.next();
    }
    if(node.value() == "null"){
      node.unhighlight();
    }
  }
  function findDelete(node){
    index = 0;
    while(node.value() != ""){
      node = node.next();
      index++;
    }
    if(node.value() == ""){
      return index;
    }
  }
  function findPrev(node){
    index = 0;
    var curr = list.get(0);
    while(curr.value() != node.value()){
      curr = curr.next();
      index++;
    }
    if(curr.value() == node.value()){
      return index;
    }
  }


  var clickHandler = function () {
      if(currentNode != ""){
        current.target(this);
        this.highlight();
        av.displayInit();
        currentNode = this;
      }
      if(clicks == 1){
        if(this.value() < previousNode.value() || this.value() == previousNode.value() || this.value() == "" ){
          currentNode = "";
          alert("You must select a node with larger value to link with the previous node.");
          return;
        }
        var indprev = findPrev(previousNode);
        var indnext = findPrev(this);
        console.log(indprev)
        console.log(indnext);
        if(indnext > indprev + 2){
          currentNode = "";
          alert("Can't link over non-empty nodes.")
          return;
        }
        findDelete(list.first());
        list.remove(index);
        previousNode.next(this);
        current.hide();
        current = av.pointer("current", list.get(0), {anchor: "top right"});
        current.show();
        list.layout();
        removeStyle(list.first());
        selectedNode = false;
        clicks = 0;
        currentNode = this;
        av.displayInit();
      }
      else if(selectedNode){
        previousNode = this;
        previousNode.highlight();
        list.layout();
        currentNode = "";
        clicks++;
      }
  };

  //////////////////////////////////////////////////////////////////
  // Start processing here
  //////////////////////////////////////////////////////////////////

  // AV variables
  var initialArray = [],
      deleteValues = [],
      selectedNode,
      previousNode,
      index,
      stack,
      modelStack,
      stackArray,
      randInsert,
      modelList,
      list,
      head,
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
