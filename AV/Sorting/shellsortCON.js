"use strict";
/*global sweep*/
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// The various arrays to start sweeps with or display
var theArray = [20, 30, 44, 54, 55, 11, 78, 14, 13, 79, 12, 98];
var theArray2 = [13, 30, 12, 54, 55, 11, 78, 14, 20, 79, 44, 98];
var theArray3 = [13, 11, 12, 14, 20, 30, 44, 54, 55, 79, 78, 98];
var theArray4 = [12, 11, 13, 14, 20, 30, 44, 54, 55, 79, 78, 98];

var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements
var DARK = "black";                // Make array elements dark again

// Display a slideshow for a sweep of "increment" steps on array "inArr"
function doSweep(av_name, inArr, increment) {
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadLangData({"av_name": av_name});
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  // Create an array object under control of JSAV library
  var arr = av.ds.array(inArr, {indexed: true});
  av.displayInit();
//  arr.unhighlight(); // unhighlight seems to have the side effect of
  // making the cell dark.
  sweep(av, arr, increment, interpret); // first sweep with increment 8
  av.recorded();
}

// Show the differences between the original array and given array "a"
function showDifference(av_name, a) {
  var av = new JSAV(av_name, {"animationMode": "none"});
  var origarr = av.ds.array(theArray, {indexed: true});
  var origlabel = av.label("Original Array", {before: origarr});
  var arr = av.ds.array(a, {indexed: true});
  var arrlabel = av.label("Values in <b style='color:#0b0;'>green</b> have changed from their original positions", {before: arr});
  arr.css(function (index) { return arr.value(index) !== origarr.value(index); },
                           {"color": "#0b0", "font-weight": "bold"});
}

$(document).ready(function () {
  var av = new JSAV("shellsortCON1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray, {indexed: true});

  // set color to LIGHT for the whole array, then highlight indices 0 and 8
  arr.css(function (index)
          { return index % 8 !== 0; }, {"color": LIGHT}).highlight([0, 8]);
  av.displayInit();
  arr.unhighlight([0, 8]).css([0, 8], {"color": LIGHT}).highlight([1, 9]);
  for (var i = 2; i < 4; i++) { // loop through the rest of the array sublists
    av.step();
    arr.unhighlight([i - 1, i + 7])
       .css([i - 1, i + 7], {"color": LIGHT}).highlight([i, i + 8]);
  }
  av.recorded();
});

$(document).ready(function () {
  var arr = theArray;
  doSweep("shellsortCON2", arr, 8);
});

$(document).ready(function () {
  var arr = theArray2;
  showDifference("shellsortCON3", arr);
});

$(document).ready(function () {
  var av = new JSAV("shellsortCON4");
  var arr = av.ds.array(theArray2, {indexed: true});
  arr.css(function (index)
          { return index % 4 !== 0; }, {"color": LIGHT}).highlight([0, 4, 8, 12]);
  av.displayInit();
  arr.unhighlight([0, 4, 8, 12]).css([0, 4, 8, 12], {"color": LIGHT})
     .highlight([1, 5, 9, 13]);
  av.step();
  arr.unhighlight([1, 5, 9, 13]).css([1, 5, 9, 13], {"color": LIGHT})
     .highlight([2, 6, 10, 14]);
  av.step();
  arr.unhighlight([2, 6, 10, 14]).css([2, 6, 10, 14], {"color": LIGHT})
     .highlight([3, 7, 11, 15]);
  av.recorded();
});

$(document).ready(function () {
  var arr = theArray2;
  doSweep("shellsortCON5", arr, 4);
});

$(document).ready(function () {
  var arr = theArray3;
  showDifference("shellsortCON6", arr);
});

$(document).ready(function () {
  var arr = theArray3;
  doSweep("shellsortCON7", arr, 2);
});

$(document).ready(function () {
  var arr = theArray4;
  showDifference("shellsortCON8", arr);
});

$(document).ready(function () {
  var arr = theArray4;
  doSweep("shellsortCON9", arr, 1);
});
