"use strict";
/*global alert*/
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// This sets the default value of the speed setting to "7"
JSAV.ext.SPEED = 300;

// The various arrays to start sweeps with or display
var theArray = [20, 30, 12, 54, 55, 11, 78, 14, 13, 79, 44, 98, 76, 45, 32, 11];
var theArray2 = [13, 30, 12, 54, 55, 11, 32, 11, 20, 79, 44, 98, 76, 45, 78, 14];
var theArray3 = [13, 11, 12, 11, 20, 30, 32, 14, 55, 45, 44, 54, 76, 79, 78, 98];
var theArray4 = [12, 11, 13, 11, 20, 14, 32, 30, 44, 45, 55, 54, 76, 79, 78, 98];
 
var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements
var DARK = "black";                // Make array elements dark again

// Convenience function for setting another type of highlight
// (will be used for showing which elements will be compared during sort)
var setBlue = function (arr, index) {
  arr.css(index, {"background-color": "#ddf" });
};

// Insertion sort using increments
function inssort(av, arr, start, incr) {
  var i, j;
  for (i = start + incr; i < arr.size(); i += incr) {
    setBlue(arr, i);
    for (j = i; j >= incr; j -= incr) {
      setBlue(arr, j - incr);
      av.step();
      if (arr.value(j) < arr.value(j - incr)) {
        arr.swap(j, j - incr); // swap the two indices
        av.step();
      }
      else {
        arr.highlight([j - incr, j]);
        break; // Done pushing element, leave for loop
      }
      arr.highlight(j);
    }
    arr.highlight(j);
  }
}

// Partial Shellsort. Sweep with the given increment
function sweep(av, myarr, incr) {
  var j = 0;
  var highlightFunction = function (index) { return index % incr === j; };
  for (j = 0; j < incr; j++) {         // Sort each sublist
    // Highlight the sublist
    myarr.highlight(highlightFunction);
    av.step();
    inssort(av, myarr, j, incr);
    myarr.unhighlight(highlightFunction);
  }
}

// Display a slideshow for a sweep of "increment" steps on array "inArr"
function doSweep(container, inArr, increment) {
  var av = new JSAV(container);
  // Create an array object under control of JSAV library
  var arr = av.ds.array(inArr, {indexed: true});
  av.displayInit();
  arr.unhighlight(); // unhighlight seems to have the side effect of
  // making the cell dark.
  sweep(av, arr, increment); // first sweep with increment 8
  av.recorded();
}

// Show the differences between the original array and given array "a"
function showDifference(container, a) {
  var av = new JSAV(container, {"animationMode": "none"});
  var origarr = av.ds.array(theArray, {indexed: true});
  var origlabel = av.label("Original Array", {before: origarr});
  var arr = av.ds.array(a, {indexed: true});
  var arrlabel = av.label("Values in <b style='color:#0b0;'>green</b> have changed from their original positions", {before: arr});
  arr.css(function (index) { return arr.value(index) !== origarr.value(index); },
                           {"color": "#0b0", "font-weight": "bold"});
}

// Support for "About" button
function about() { // This is what we pop up
  var mystring = "Shellsort Explanation Slideshow\nWritten by Cliff Shaffer and Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during June, 2011\nLast update: August 14, 2011\nJSAV library version " + JSAV.version();
  alert(mystring);
}

$('input[name="about"]').click(about); // Set callback action

(function ($) {
  var av = new JSAV("container1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray, {indexed: true});

  // set color to LIGHT for the whole array, then highlight indices 0 and 8
  arr.css(function (index)
          { return index % 8 !== 0; }, {"color": LIGHT}).highlight([0, 8]);
  av.displayInit();
  arr.unhighlight([0, 8]).css([0, 8], {"color": LIGHT}).highlight([1, 9]);
  for (var i = 2; i < 8; i++) { // loop through the rest of the array sublists
    av.step();
    arr.unhighlight([i - 1, i + 7])
       .css([i - 1, i + 7], {"color": LIGHT}).highlight([i, i + 8]);
  }
  av.recorded();
}(jQuery));

(function ($) {
  var arr = theArray;
  doSweep("container2", arr, 8);
}(jQuery));

(function ($) {
  var arr = theArray2;
  showDifference("container3", arr);
}(jQuery));

(function ($) {
  var av = new JSAV("container4");
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
}(jQuery));

(function ($) {
  var arr = theArray2;
  doSweep("container5", arr, 4);
}(jQuery));

(function ($) {
  var arr = theArray3;
  showDifference("container6", arr);
}(jQuery));

(function ($) {
  var arr = theArray3;
  doSweep("container7", arr, 2);
}(jQuery));

(function ($) {
  var arr = theArray4;
  showDifference("container8", arr);
}(jQuery));

(function ($) {
  var arr = theArray4;
  doSweep("container9", arr, 1);
}(jQuery));
