"use strict";
// Shared code for Shellsort: Shared between shellsortAV and shellsortCON

// Insertion sort using increments
function inssort(av, arr, start, incr, interpret) {
  var i, j;
  for (i = start + incr; i < arr.size(); i += incr) {
    for (j = i; j >= incr; j -= incr) {
      arr.unhighlight([j - incr, j]);
      arr.addClass([j - incr, j], "processing");
      av.umsg(interpret("av_code1"));
      av.step();
      if (arr.value(j) < arr.value(j - incr)) {
        arr.swap(j, j - incr); // swap the two indices
        av.umsg(interpret("av_code2"));
        av.step();
        if (j - incr > incr) {
          arr.removeClass(j, "processing");
          arr.highlight(j);
        } else {
          arr.removeClass([j - incr, j], "processing");
          arr.highlight([j - incr, j]);
        }
      }
      else {
        av.umsg(interpret("av_code3"));
        arr.highlight([j - incr, j]);
        arr.removeClass([j - incr, j], "processing");
        break; // Done pushing element, leave for loop
      }
    }
  }
}

// Partial Shellsort. Sweep with the given increment
function sweep(av, arr, incr, interpret) {
  var j = 0;
  var numElem = Math.ceil(arr.size() / incr);
  av.umsg(interpret("av_code4") + incr);
  av.step();
  var highlightFunction = function (index) { return index % incr === j; };
  for (j = 0; j < incr; j++) {         // Sort each sublist
    // Highlight the sublist
    arr.highlight(highlightFunction);
    if (j + (incr * (numElem - 1)) >= arr.size()) {
      numElem = numElem - 1;
    }
    if ((j + incr) === arr.size()) { // Only one element, don't process
      arr.unhighlight(highlightFunction);
      av.umsg(interpret("av_code5"));
      av.step();
      return;
    }
    av.umsg(interpret("av_code6") + numElem + interpret("av_code7"));
    av.step();
    inssort(av, arr, j, incr, interpret);
    arr.removeClass(true, "processing");
    arr.unhighlight(highlightFunction);
  }
}

// Display a slideshow for a sweep of "increment" steps on array "inArr"
function doSweep(av_name, inArr, increment) {
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig(
                 {"av_name": av_name, "json_path": "AV/Sorting/shellsortAV.json"});
  var interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  // Create an array object under control of JSAV library
  var arr = av.ds.array(inArr, {indexed: true});
  av.displayInit();
  sweep(av, arr, increment, interpret); // first sweep with increment 8
  av.recorded();
}

// Show the differences between the original array and given array "a"
function showDifference(av_name, theArray, a) {
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig(
                 {"av_name": av_name, "json_path": "AV/Sorting/shellsortAV.json"});
  var interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name, {"animationMode": "none"});
  var origarr = av.ds.array(theArray, {indexed: true});
  var origlabel = av.label(interpret("av_diff1"), {before: origarr});
  var arr = av.ds.array(a, {indexed: true});
  var arrlabel = av.label(interpret("av_diff2"), {before: arr});
  arr.addClass(function (index)
                 { return arr.value(index) !== origarr.value(index); },
               "greentext");
}
