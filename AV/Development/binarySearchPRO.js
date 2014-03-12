(function ($) {
  "use strict";

  var arraySize = 20,
    key,
    initialArray = [],
    array,
    keyholder,
    findLabel,
    interpret,
    av = new JSAV($("#jsavcontainer")),
    code;

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {

    // create interpreter function for the selected language
    if (typeof interpret !== "function") {
      interpret = getInterpreter("binarySearchPRO.json", exercise.options.lang || "en");
    }

    av.container.find(".title").html(interpret("title"));
    av.container.find(".instructLabel").html(interpret("instructLabel"));
    av.container.find(".instructions").html(interpret("instructions"));

    // show the code and highlight the row where mid is calculated
    if (interpret("code")) {
      if (!code) {
        code = av.code( $.extend({after: {element: $(".instructions")}}, interpret("code")) );
      }
      code.show();
      code.highlight(interpret("code_highlight"));
    }

    //generate random array with ascending values
    var randomVal = 0;
    for (var i = 0; i < arraySize; i++) {
      randomVal += Math.floor(Math.random()*10);
      initialArray[i] = randomVal;
    }

    //generate a random key, the value of which is between the min and max of the array
    key = Math.ceil(5* (initialArray[0] + initialArray[arraySize -1]) / 7);
    
    // clear old elements
    if (keyholder) {
      keyholder.clear();
    }
    if (findLabel) {
      findLabel.clear();
    }
    if (array) {
      array.clear();
    }

    //insert key into the array (the blue box)
    keyholder = av.ds.array([key], {indexed: false});
    keyholder.element.css("margin-top", 25);
    keyholder.css(0, {"background-color": "#ddf"});
    findLabel = av.label(interpret("find_label"), {relativeTo: keyholder, anchor: "center top", myAnchor: "center bottom"});

    // create the empty array
    array = av.ds.array(new Array(arraySize), {indexed: true, autoresize: false});
    array.click(clickhandler);
    array.layout();

    return array;
  }

  function modelSolution(jsav) {
    jsav.ds.array([key], {indexed: false}).css(0, {"background-color": "#ddf"});
    var modelArray = jsav.ds.array(Array(arraySize), {indexed: true, autoresize: false});

    jsav._undo = [];

    var low = 0, high = arraySize - 1, mid;

    while (low <= high) {
      mid = Math.floor( (low + high)/2);
      jsav.umsg(interpret("ms_comment1"), {fill: {
        low: low,
        high: high,
        mid: mid
      }});
      modelArray.value(mid, initialArray[mid]);
      modelArray.highlight(mid);
      if (modelArray.value(mid) < key) {
        jsav.umsg(interpret("ms_comment2"), {preserve: true, fill: {
          arr_at_mid: modelArray.value(mid),
          key: key,
          mid_plus_1: mid + 1
        }});
        low = mid + 1;
        paintGrey(modelArray, 0, mid);
      }
      if (modelArray.value(mid) > key) {
        jsav.umsg(interpret("ms_comment3"), {preserve: true, fill: {
          arr_at_mid: modelArray.value(mid),
          key: key,
          mid_minus_1: mid - 1
        }});
        high = mid - 1;
        paintGrey(modelArray, mid, arraySize - 1);
      }
      if (modelArray.value(mid) === key) {
        jsav.umsg(interpret("ms_comment4"), {preserve: true, fill: {mid: mid}});

        paintGrey(modelArray, 0, arraySize - 1);
      }
      jsav.stepOption("grade", true);
      jsav.step();
      if (modelArray.value(mid) === key) {
        return modelArray;
      }
    }
    jsav.umsg(interpret("ms_comment5"), {preserve: true});
    return modelArray;
  }

  var exercise = av.exercise(modelSolution, initialize, {}, {feedback: "atend", modelDialog: {width: 780}});
  exercise.reset();

  // a function to handle all click events on the array
  function clickhandler(index) {
    
    //if the clicked index is not higlighted earlier, highlight it and paint the ones which are outside of the new range
    if (!this.isHighlight(index)) {
      this.value(index, initialArray[index]);
      // if (this.value(index) > key) {
      //     paintGrey(this, index, arraySize - 1);
      // } else if (this.value(index) < key) {
      //     paintGrey(this, 0, index);
      // }
      // if (this.value(index) === key) {
      //     paintGrey(this, 0, arraySize - 1);
      // }
      // highlight the index
      this.highlight(index);
      exercise.gradeableStep();
    }
  }

  // paints the background gray for indices [first, last].
  function paintGrey(array, first, last) {
    array.addClass(
      function(index) {return index >= first && index <= last},
      "greybg"
      );
  }

}(jQuery));