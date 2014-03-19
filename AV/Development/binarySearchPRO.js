(function ($) {
  "use strict";

  var arraySize = 20,
    key,
    initialArray = [],
    array,
    keyholder,
    findLabel,
    pseudo,
    interpret,
    config = ODSA.UTILS.getConfig("binarySearchPRO.json"),
    av = new JSAV($("#jsavcontainer"));

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {

    // get interpreter function for the selected language
    if (typeof interpret !== "function") {
      interpret = JSAV.utils.getInterpreter(config.language);
      // change the title and the instructions on the page
      ODSA.UTILS.setTitleAndInstructions(av.container, config.language);
    }

    // show the code and highlight the row where mid is calculated
    if (!pseudo && config.code) {
      pseudo = av.code( $.extend({after: {element: $(".ODSAinstructions")}}, config.code) );
      pseudo.show();
      pseudo.highlight(config.code.tags.highlight);
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
      refLines(jsav, config.code, "highlight");
      modelArray.value(mid, initialArray[mid]);
      modelArray.highlight(mid);
      if (modelArray.value(mid) < key) {
        jsav.umsg(interpret("ms_comment2"), {preserve: true, fill: {
          arr_at_mid: modelArray.value(mid),
          key: key,
          mid_plus_1: mid + 1
        }});
        refLines(jsav, config.code, "tbl_mid_lt_key");
        low = mid + 1;
        paintGrey(modelArray, 0, mid);
      }
      if (modelArray.value(mid) > key) {
        jsav.umsg(interpret("ms_comment3"), {preserve: true, fill: {
          arr_at_mid: modelArray.value(mid),
          key: key,
          mid_minus_1: mid - 1
        }});
        refLines(jsav, config.code, "tbl_mid_gt_key");
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

  function refLines(av, code, lineTag) {
    if (!code)
      return;
    var lines = code.tags[lineTag];
    if (typeof lines === "number") {
      av.umsg(" " + interpret("line"), {preserve: true, fill: {first: lines + 1}});
    } else if (typeof lines === "object") {
      av.umsg(" " + interpret("lines"), {preserve: true, fill: {first: lines[0] + 1, second: lines[1] + 1}});
    }
  }

}(jQuery));