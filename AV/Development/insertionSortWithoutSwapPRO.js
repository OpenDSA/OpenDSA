(function ($) {
  "use strict";
  var arraySize = 10,
    initialArray,
    initialTempArray,
    barArray,
    tempArray,
    av = new JSAV($("#jsavcontainer")),
    clickHandler;

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {

    exercise.jsav.container.find(".jsavcanvas").css({height: 280});

    // initialize click handler
    if (typeof clickHandler === "undefined") {
      clickHandler = new ClickHandler(av, exercise, {
        selectedClass: "selected",
        effect: "copy"
      });
    }
    clickHandler.reset();

    // initialize the bar array
    initialArray = [];
    for (var i = 0; i < arraySize; i++) {
      initialArray[i] = Math.floor(Math.random()*100) + 10;
    }
    if (barArray) {
      clickHandler.remove(barArray);
      barArray.clear();
    }
    barArray = av.ds.array(initialArray, {indexed: true, layout: "bar"});
    clickHandler.addArray(barArray);

    // initialize temp variable
    initialTempArray = [];
    initialTempArray[0] = Math.floor(Math.random()*100) + 10;
    if (tempArray) {
      clickHandler.remove(tempArray);
      tempArray.clear();
    }
    tempArray = av.ds.array(initialTempArray, {indexed: false});
    clickHandler.addArray(tempArray);

    // clear all the Raphael elements
    av.getSvg().clear();

    // add text
    var font = {
      "font-size": 16,
      "font-family": "Times New Roman",
      "font-weight": "bold"
    };
    var canvasWidth = exercise.jsav.container.find(".jsavcanvas").width();
    av.getSvg().text(canvasWidth / 2, 270, "temp").attr(font);

    return [barArray, tempArray];
  }

  function modelSolution(jsav) {
    var modelArray = jsav.ds.array(initialArray, {indexed: true, layout: "bar"});
    var modelTempArray = jsav.ds.array(initialTempArray);

    jsav._undo = [];
    modelArray.layout();
    jsav.displayInit();
    
    var j = 0;
    for (var i = 1; i < arraySize; i++) {
      jsav.effects.copyValue(modelArray, i, modelTempArray, 0);
      jsav.umsg("Copy " + modelArray.value(i) + " from the array into the temp variable.<br/>&nbsp;&nbsp;i: " + i + ",&nbsp;&nbsp;j: " + j);
      jsav.stepOption("grade", true);
      jsav.step();
      j = i;
      while (j > 0 && modelArray.value(j - 1) > modelTempArray.value(0)) {
        jsav.effects.copyValue(modelArray, j - 1, modelArray, j);
        modelArray.layout();
        jsav.umsg("Shift all the elements, whose values are larger than " + modelTempArray.value(0) + " (temp) and whose indices are smaller than " + i + " (i), one step to the right.<br/>&nbsp;&nbsp;i: " + i + ",&nbsp;&nbsp;j: " + j);
        jsav.stepOption("grade", true);
        jsav.step();
        j--;
      }
      if (j !== i) {
        jsav.effects.copyValue(modelTempArray, 0, modelArray, j);
        modelArray.layout();
        jsav.umsg("Copy " + modelTempArray.value(0) + " back into its right place in the array. The array is now sorted between indices 0 and " + i + "<br/>&nbsp;&nbsp;i: " + i + ",&nbsp;&nbsp;j: " + j);
        jsav.stepOption("grade", true);
        jsav.step();
      }
    }

    return [modelArray, modelTempArray];
  }

  var exercise = av.exercise(modelSolution, initialize, {}, {feedback: "atend"});
  exercise.reset();

}(jQuery));