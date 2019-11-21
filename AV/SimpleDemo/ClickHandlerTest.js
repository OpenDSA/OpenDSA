$(document).ready(function() {
  "use strict";
  var arraySize = 15,
      initialArray = [],
      jsavArray,
      testArray,
      list,
      queue,
      stack,
      $array = $("#exerArray"),
      av = new JSAV($("#avcontainer")),
      clickHandler;

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {

    var htmldata = "";
    for (var i = 0; i < arraySize; i++) {
      var randomVal = Math.floor(Math.random()*10);
      htmldata += "<li>"+randomVal+"</li>";
      initialArray[i] = randomVal;
    }
    $array.html(htmldata);

    av.forward();

    jsavArray = av.ds.array($array, {indexed: true});
    jsavArray.layout();

    if (typeof clickHandler === "undefined") {
      clickHandler = new ClickHandler(av, exercise, {selectedClass: "selected", effect: "move"});
      clickHandler.addArray(jsavArray);
    }
    clickHandler.reset();

    if (testArray) {
      clickHandler.remove(testArray);
      testArray.clear();
    }
    testArray = av.ds.array(JSAV.utils.rand.numKeys(1,10,15));
    clickHandler.addArray(testArray);

    if (list) {
      clickHandler.remove(list);
      list.clear();
    }
    list = av.ds.list();
    list.addFirst("a");
    list.addFirst("a");
    list.addFirst("a");
    list.layout();
    clickHandler.addList(list);

    if (stack) {
      clickHandler.remove(stack);
      stack.clear();
    }
    stack = av.ds.list();
    stack.addFirst("null");
    stack.addFirst("b");
    stack.addFirst("b");
    stack.addFirst("b");
    stack.layout();
    clickHandler.addList(stack, {keep: true, select: "first", drop: "first"});

    if (queue) {
      clickHandler.remove(queue);
      queue.clear();
    }
    queue = av.ds.list();
    queue.addFirst("c");
    queue.addFirst("c");
    queue.addFirst("c");
    queue.layout();
    clickHandler.addList(queue, {keep:true, select: "last", drop: "first"});

    return jsavArray;
  }

  function modelSolution(jsav) {
    var modelArray = jsav.ds.array(initialArray);

    return modelArray;
  }

  var exercise = av.exercise(modelSolution, initialize, {feedback: "atend"});
  exercise.reset();
});
