/* global ODSA, JSAV*/
(function ($) {
  "use strict";

  var arraySize = 20,
    key,
    initialArray = [],
    array,
    keyholder,
    findLabel,
    stateVar,
    lowIndex,
    highIndex,
    interLine,
    pseudo,
    config = ODSA.UTILS.loadLangData({'av_container': 'jsavcontainer'}),
    interpret = config.interpreter,
    code = config.code,
    av = new JSAV($("#jsavcontainer"));


  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {

    // show the code and highlight the row where mid is calculated
    if (!pseudo && code) {
      pseudo = av.code($.extend({after: {element: $(".instructions")}}, code));
      pseudo.show();
      pseudo.highlight(code.tags.highlight);
    }

    //generate random array with ascending values
    var randomVal = 10;
    for (var i = 0; i < arraySize; i++) {
      randomVal += Math.floor(Math.random() * (2 + i));
      initialArray[i] = randomVal;
    }

    // generate a random key, the value of which is between the min and max of the array
    if (Math.random() > 0.5) {
      key = Math.ceil(5 * (initialArray[0] + initialArray[arraySize - 1]) / 7);
    } else {
      key = Math.floor(2 * (initialArray[0] + initialArray[arraySize - 1]) / 7);
    }

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
    if (stateVar) {
      stateVar.clear();
    }
    if (lowIndex) {
      lowIndex.clear();
    }
    if (highIndex) {
      highIndex.clear();
    }

    // insert key into the array (the blue box)
    keyholder = av.ds.array([key], {indexed: false});
    keyholder.css(0, {"background-color": "#ddf"});
    findLabel = av.label(interpret("av_find_label"), {relativeTo: keyholder, anchor: "center top", myAnchor: "center bottom"});

    // create the array
    array = av.ds.array(initialArray, {indexed: true, layout: "bar", autoresize: false});
    array.click(clickhandler);
    array.layout();

    // clear all the Raphael elements
    av.getSvg().clear();

    // save the coordinate of the array
    var arrayX = array.element.offset().left - av.canvas.offset().left;
    var arrayY = array.element.offset().top - av.canvas.offset().top + 150;

    // draw a blue line to represent the value we are looking for
    var lineY = arrayY - 130 * key / array.value(arraySize - 1);
    var lineWidth = array.element.width();
    av.g.line(arrayX, lineY, arrayX + lineWidth, lineY, {stroke: "#00f", "stroke-width": 3, opacity: 0.2});

    // create a hidden interLine
    interLine = av.g.line(arrayX, lineY, arrayX + lineWidth, lineY, {stroke: "#f00", "stroke-width": 3, opacity: 0});

    // initialize state variable
    stateVar = av.variable(0);
    lowIndex = av.variable(0);
    highIndex = av.variable(arraySize - 1);

    av.umsg(interpret("av_select_low"));
    av.forward();

    return [array, lowIndex, highIndex];
  }

  function modelSolution(jsav) {
    jsav.ds.array([key], {indexed: false}).css(0, {"background-color": "#ddf"});
    var modelArray = jsav.ds.array(initialArray, {indexed: true, layout: "bar", autoresize: false});

    if (code) {
      jsav.code(code).highlight(code.tags.highlight);
    }

    var modelLow = jsav.variable(0);
    var modelHigh = jsav.variable(arraySize - 1);
    var low = 0,
        high = arraySize - 1,
        mid;

    // draw the blue line
    var arrayX = modelArray.element.offset().left - jsav.canvas.offset().left;
    var arrayY = modelArray.element.offset().top - jsav.canvas.offset().top + 150;
    var lineY = arrayY - 130 * key / initialArray[arraySize - 1];
    var lineWidth = modelArray.element.width();
    jsav.g.line(arrayX, lineY, arrayX + lineWidth, lineY, {stroke: "#00f", "stroke-width": 3, opacity: 0.2});

    // create a hidden interLine
    var interLine = jsav.g.line(arrayX, lineY, arrayX + lineWidth, lineY, {stroke: "#f00", "stroke-width": 3, opacity: 0});


    jsav._undo = [];

    while (initialArray[low] < key && initialArray[high] >= key) {
      // show arrow on low
      modelArray.toggleArrow(low);
      modelLow.value(low);
      jsav.umsg(interpret("av_ms_low"), {fill: {low: low}});
      jsav.stepOption("grade", true);
      jsav.step();
      // show arrow on high
      modelArray.toggleArrow(high);
      modelHigh.value(high);
      jsav.umsg(interpret("av_ms_high"), {fill: {high: high}});
      jsav.stepOption("grade", true);
      // draw Line
      drawLine(modelArray, low, high, interLine);
      jsav.step();
      // highlight guesstimate
      mid = intersectionX(low, high);
      mid = Math.floor(mid * 100) / 100;
      jsav.umsg(interpret("av_ms_intersect"), {fill: {
        inter: mid,
        key: key,
        newmid: Math.floor(mid)
      }});
      refLines(jsav, code, "highlight");
      jsav.step();
      mid = Math.floor(mid);
      modelArray.highlight(mid);
      if (initialArray[mid] < key) {
        low = mid + 1;
        jsav.umsg(interpret("av_ms_arr_mid_lt_key"), {fill: {
          arr_at_mid: initialArray[mid],
          key: key,
          mid_plus_1: mid + 1
        }});
        refLines(jsav, code, "tbl_mid_lt_key");
      } else if (initialArray[mid] > key) {
        high = mid - 1;
        jsav.umsg(interpret("av_ms_arr_mid_gt_key"), {fill: {
          arr_at_mid: initialArray[mid],
          key: key,
          mid_minus_1: mid - 1
        }});
        refLines(jsav, code, "tbl_mid_gt_key");
      } else {
        jsav.umsg("<br/>" + interpret("av_ms_found"), {preserve: true, fill: {mid: mid}});
      }
      // hide arrows and line
      modelArray.toggleArrow(modelLow.value());
      modelArray.toggleArrow(modelHigh.value());
      hideLine(interLine);
      // grade step
      jsav.stepOption("grade", true);
      jsav.step();
      if (modelArray.value(mid) === key) {
        return [modelArray, modelLow, modelHigh];
      }
    }
    if (initialArray[low] >= key) {
      jsav.umsg(interpret("av_ms_loop_stopped_1"), {fill: { low: low }});
      if (initialArray[low] === key) {
        jsav.umsg("<br/>" + interpret("av_ms_found"), {preserve: true, fill: { mid: low }});
      } else {
        jsav.umsg("<br/>" + interpret("av_ms_not_found"), {preserve: true});
      }
    } else {
      jsav.umsg(interpret("av_ms_loop_stopped_2"), {fill: { high: high }});
      jsav.umsg("<br/>" + interpret("av_ms_not_found"), {preserve: true});
    }
    return [modelArray, modelLow, modelHigh];
  }

  var exercise = av.exercise(modelSolution, initialize, {css: "background-color"}, {feedback: "atend", modelDialog: {width: 780}});
  exercise.reset();

  function hideLine(interLine) {
    interLine.css({opacity: 0});
  }

  // updates and shows the interpolation line
  function drawLine(array, low, high, line) {
    var arrayX = array.element.offset().left - array.element.parent().offset().left;
    var arrayY = array.element.offset().top - array.element.parent().offset().top + 150;
    var dy = - (array.value(high) - array.value(low)) * 130 / array.value(arraySize - 1);
    var dx = (high - low) * 37;
    var k;
    if (dx === 0) {
      k = 0;
    } else {
      k = dy / dx;
    }
    var x0 = arrayX + 2 + 37 * low;
    var y0 = arrayY - 130 * array.value(low) / array.value(arraySize - 1);
    var b = y0 - k * x0;
    var x1 = arrayX + 2;
    var y1 = k * x1 + b;
    var x2 = arrayX + 2 + 37 * arraySize;
    var y2 = k * x2 + b;

    line.movePoints([[0, x1, y1], [1, x2, y2]]);
    line.css({opacity: 0.2});
  }

  function intersectionX(low, high) {
    var result = low + ((key - initialArray[low]) * (high - low) / (initialArray[high] - initialArray[low]));
    return Math.floor(result * 100) / 100;
  }

  function clickhandler(index) {

    if (stateVar.value() === 0) {
      lowIndex.value(index);
      array.toggleArrow(index);
      stateVar.value(1);
      av.umsg(interpret("av_select_high"));
      exercise.gradeableStep();
    } else if (stateVar.value() === 1) {
      highIndex.value(index);
      array.toggleArrow(index);
      drawLine(array, lowIndex.value(), highIndex.value(), interLine);
      stateVar.value(2);
      av.umsg(interpret("av_select_guess"));
      refLines(av, code, "highlight");
      av.umsg("</br>" + interpret("av_lines_intersect") + " ( " + intersectionX(lowIndex.value(), highIndex.value()) + ", " + key + " )", {preserve: true});
      exercise.gradeableStep();
    } else if (stateVar.value() === 2) {
      array.highlight(index);
      array.toggleArrow(lowIndex.value());
      array.toggleArrow(highIndex.value());
      hideLine(interLine);
      stateVar.value(0);
      av.umsg(interpret("av_select_low_if"));
      exercise.gradeableStep();
    }
  }

  function refLines(av, code, lineTag) {
    if (!code) {
      return;
    }
    var lines = code.tags[lineTag];
    if (typeof lines === "number") {
      av.umsg(" " + interpret("av_line"), {preserve: true, fill: {first: lines + 1}});
    } else if (typeof lines === "object") {
      av.umsg(" " + interpret("av_lines"), {preserve: true, fill: {first: lines[0] + 1, second: lines[1] + 1}});
    }
  }

}(jQuery));
