$(document).ready(function() {
  "use strict";
  var av,     // for JSAV library object
      pseudo,
      initialArray,
      key;    // for the JSAV array

  // Load the interpreter created by odsaAV.js
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,
      code = config.code ? $.extend({center: false}, config.code) : config.code,
      settings = config.getSettings();      // Settings for the AV

  $("#searchValue").attr("placeholder", interpret("av_searchPlaceholder"));
  $("#arrayValues").attr("placeholder", interpret("av_arrValsPlaceholder"));

  // Note that unlike many sorting AVs, we are not going to let the user
  // select "bar" display for the array because there is not enough room

  // Initialize the arraysize dropdown list
  ODSA.AV.initArraySize(15, 25, 25);

  // Process about button: Pop up a message with an Alert
  function about() {
    window.alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  function interpolationSearch(array) {
    var arraySize = array.length;
    var modelArray = av.ds.array(array, {indexed: true, layout: "bar", autoresize: false});

    pseudo = av.code(code);

    var low = 0,
        high = arraySize - 1,
        mid;

    var pointerOpts = {
      anchor: "center bottom",
      myAnchor: "center top",
      top: 10,
      left: -20,
      arrowAnchor: "center bottom"
    };
    var mLowPointer = av.pointer("low", modelArray.index(0), pointerOpts);
    pointerOpts.left = 20;
    var mHighPointer = av.pointer("high", modelArray.index(arraySize - 1), pointerOpts);

    // draw the blue line
    var arrayX = modelArray.element.offset().left - av.canvas.offset().left,
        arrayY = modelArray.element.offset().top - av.canvas.offset().top + 150,
        lineY = arrayY - 130 * key / array[arraySize - 1],
        lineWidth = modelArray.element.width();
    av.g.line(arrayX, lineY, arrayX + lineWidth, lineY, {
      stroke: "#00f",
      "stroke-width": 3,
      opacity: 0.2
    });

    // create the interLine
    var modelInterLine = av.g.line(arrayX, lineY, arrayX + lineWidth, lineY, {
      stroke: "#f00",
      "stroke-width": 3,
      opacity: 0.2
    });
    drawLine(modelArray, 0, arraySize - 1, modelInterLine);

    av.umsg(interpret("av_start"), {fill: {key: key}});

    av._undo = [];

    while (array[low] < key && array[high] >= key) {
      // highlight guesstimate
      mid = intersectionX(low, high);
      mid = Math.floor(mid * 100) / 100;
      av.umsg(interpret("av_intersect"), {fill: {
        inter: mid,
        key: key,
        newmid: Math.floor(mid)
      }});
      refLines(av, code, "guess_calculations");
      av.step();
      mid = Math.floor(mid);
      // modelArray.highlight(mid);
      if (array[mid] < key) {
        low = mid + 1;
        mLowPointer.target(modelArray.index(low));
        av.umsg(interpret("av_arr_mid_lt_key"), {fill: {
          arr_at_mid: array[mid],
          key: key,
          mid_plus_1: mid + 1
        }});
        refLines(av, code, "tbl_mid_lt_key");
      } else if (array[mid] > key) {
        high = mid - 1;
        mHighPointer.target(modelArray.index(high));
        av.umsg(interpret("av_arr_mid_gt_key"), {fill: {
          arr_at_mid: array[mid],
          key: key,
          mid_minus_1: mid - 1
        }});
        refLines(av, code, "tbl_mid_gt_key");
      } else {
        av.umsg("<br/>" + interpret("av_found"), {preserve: true, fill: {mid: mid}});
        refLines(av, code, "return_mid");
        drawLine(modelArray, low, high, modelInterLine);
        av.step();
        return;
      }
      // draw Line
      drawLine(modelArray, low, high, modelInterLine);

      av.step();
    }
    if (array[low] >= key) {
      av.umsg(interpret("av_loop_stopped_1"), {fill: {low: low}});
      if (array[low] === key) {
        av.umsg("<br/>" + interpret("av_found"), {preserve: true, fill: {mid: low}});
        refLines(av, code, "return_low");
      } else {
        av.umsg("<br/>" + interpret("av_not_found"), {preserve: true});
        refLines(av, code, "return_-1");
      }
    } else {
      av.umsg(interpret("av_loop_stopped_2"), {fill: {high: high}});
      av.umsg("<br/>" + interpret("av_not_found"), {preserve: true});
      refLines(av, code, "return_-1");
    }
    av.step();
  }

  // updates and shows the interpolation line
  function drawLine(drawArray, low, high, line) {
    var arraySize = drawArray.size();
    var arrayX = drawArray.element.offset().left - drawArray.element.parent().offset().left,
        arrayY = drawArray.element.offset().top - drawArray.element.parent().offset().top + 150,
        barWidth = drawArray.element.find(".jsavnode:eq(0)").outerWidth(true),
        dy = -(drawArray.value(high) - drawArray.value(low)) * 130 /  drawArray.value(arraySize - 1),
        dx = (high - low) * barWidth,
        k = (dx ? dy / dx : 0),
        x0 = arrayX + 2 + barWidth * low,
        y0 = arrayY - 130 * drawArray.value(low) / drawArray.value(arraySize - 1),
        b = y0 - k * x0,
        x1 = arrayX + 2,
        y1 = k * x1 + b,
        x2 = arrayX + 2 + barWidth * arraySize,
        y2 = k * x2 + b;

    line.movePoints([[0, x1, y1], [1, x2, y2]]);
  }

  function intersectionX(low, high) {
    var result = low + ((key - initialArray[low]) * (high - low) / (initialArray[high] - initialArray[low]));
    return Math.floor(result * 100) / 100;
  }

  function refLines(refAV, refCode, lineTag) {
    if (!refCode) {
      return;
    }
    pseudo.setCurrentLine(lineTag);
    var lines = refCode.tags[lineTag];
    if (typeof lines === "number") {
      refAV.umsg(" " + interpret("av_line"), {preserve: true, fill: {first: lines}});
    } else if (typeof lines === "object") {
      refAV.umsg(" " + interpret("av_lines"), {preserve: true, fill: {first: lines[0], second: lines[1]}});
    }
  }

  // Execute the "Run" button function
  function runIt() {
    initialArray = ODSA.AV.processArrayValues();

    // If initialArray is null, the user gave us junk which they need to fix
    if (!initialArray) {
      return;
    }

    // sort the array
    initialArray = initialArray.sort(function(a, b) { return a - b; });

    ODSA.AV.reset(true);
    $("#arrayValues").val(initialArray.join(" "));
    key = parseInt($("#searchValue").val(), 10);
    if (isNaN(key)) {
      if (Math.random() < 0.33) {
        // guarantees that the key is found
        key = initialArray[Math.round(Math.random() * initialArray.length)];
      } else {
        key = initialArray[0] +
          Math.floor(
            (0.33 + 0.33 * Math.random()) *
            (initialArray[initialArray.length - 1] - initialArray[0])
          );
      }
    }
    $("#searchValue").val(key);
    av = new JSAV($(".avcontainer"), {settings: settings});
    // Create a new array using the layout the user has selected
    av.displayInit();
    av.step();
    interpolationSearch(initialArray);
    av.recorded(); // mark the end
  }


  // Connect action callbacks to the HTML entities
  $("#about").click(about);
  $("#run").click(runIt);
  $("#ssperform").submit(function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    runIt();
  });
  $("#reset").click(function() {
    ODSA.AV.reset();
    $("#searchValue").val("");
  });
});
