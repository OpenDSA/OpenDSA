// Title: Motivation for External Sorting Slideshow
// Author: Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: File Processing; External Sorting
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow illustrating standard Mergesort does not make for an optimal external sorting algorithm. */

$(document).ready(function () {
  "use strict";

  var input1 = [36, 17, 28, 23];
  var input2 = [20, 13, 14, 15];
  var output1 = ["", "", "", ""];
  var output2 = ["", "", "", ""];

  var av = new JSAV("extMergeSortCON");
  // Create an array object under control of JSAV library
  var arr1 = av.ds.array(input1, {indexed: false, left: 50, top: 30});
  var arr2 = av.ds.array(input2, {indexed: false, left: 50, top: 130});
  var arr3 = av.ds.array(output1, {indexed: false, left: 400, top: 30});
  var arr4 = av.ds.array(output2, {indexed: false, left: 400, top: 130});

var setWhite = function (index, arr) {
  arr.css(index, {"background-color": "#FFFFFF" });
};

var setYellow = function (index, arr) {
  arr.css(index, {"background-color": "#FFFF00" });
};

  av.umsg("Our approach to external sorting is derived from the Mergesort algorithm. The simplest form of external Mergesort performs a series of sequential passes over the records, merging larger and larger sublists on each pass.");
  var inputlabel1 = av.label("Input", {left: 90, top: 0});
  var outputlabel1 = av.label("Output", {left: 435, top: 0});
  var inputlabel2 = av.label("Runs of length 1", {left: 55, top: 195});
  var outputlabel2 = av.label("Runs of length 2", {left: 405, top: 195});

  var inputline1 = av.g.line(81, 43, 81, 79, {"stroke-width": "2"});
  var inputline2 = av.g.line(111, 43, 111, 79, {"stroke-width": "2"});
  var inputline3 = av.g.line(141, 43, 141, 79, {"stroke-width": "2"});

  var inputline4 = av.g.line(81, 143, 81, 179, {"stroke-width": "2"});
  var inputline5 = av.g.line(111, 143, 111, 179, {"stroke-width": "2"});
  var inputline6 = av.g.line(141, 143, 141, 179, {"stroke-width": "2"});

  var outputline1 = av.g.line(461, 43, 461, 79, {"stroke-width": "2"});
  var outputline2 = av.g.line(461, 143, 461, 179, {"stroke-width": "2"});

  av.displayInit();

  av.umsg("A sorted sublist is called a run. Thus, each pass is merging pairs of runs to form longer runs.");
  av.step();

  av.umsg("Take the first record from each input buffer");
  setYellow(0, arr1);
  setYellow(0, arr2);
  av.step();

  av.umsg("Write a run of length two to the first output buffer");
  av.effects.moveValue(arr2, 0, arr3, 0);
  av.effects.moveValue(arr1, 0, arr3, 1);

  setYellow(0, arr3);
  setYellow(1, arr3);
  av.step();

  av.umsg("Take the second record from each input buffer");
  setWhite(0, arr1);
  setWhite(0, arr2);
  setWhite(0, arr3);
  setWhite(1, arr3);
  setYellow(1, arr1);
  setYellow(1, arr2);
  av.step();

  av.umsg("Write a run of length two to the second output buffer");
  av.effects.moveValue(arr2, 1, arr4, 0);
  av.effects.moveValue(arr1, 1, arr4, 1);

  setYellow(0, arr4);
  setYellow(1, arr4);
  av.step();

  av.umsg("Take the third record from each input buffer");
  setWhite(1, arr1);
  setWhite(1, arr2);
  setWhite(0, arr4);
  setWhite(1, arr4);
  setYellow(2, arr1);
  setYellow(2, arr2);
  av.step();

  av.umsg("Write a run of length two to the first output buffer");
  av.effects.moveValue(arr2, 2, arr3, 2);
  av.effects.moveValue(arr1, 2, arr3, 3);

  setYellow(2, arr3);
  setYellow(3, arr3);
  av.step();

  av.umsg("Take the fourth record from each input buffer");
  setWhite(2, arr1);
  setWhite(2, arr2);
  setWhite(2, arr3);
  setWhite(3, arr3);
  setYellow(3, arr1);
  setYellow(3, arr2);
  av.step();

  av.umsg("Write a run of length two to the second output buffer");
  av.effects.moveValue(arr2, 3, arr4, 2);
  av.effects.moveValue(arr1, 3, arr4, 3);

  setYellow(2, arr4);
  setYellow(3, arr4);
  av.step();

  av.umsg("The roles of the input and output files are reversed");
  setWhite(3, arr1);
  setWhite(3, arr2);
  setWhite(2, arr4);
  setWhite(3, arr4);

  arr1.value(0, 20);
  arr1.value(1, 36);
  arr1.value(2, 14);
  arr1.value(3, 28);

  arr2.value(0, 13);
  arr2.value(1, 17);
  arr2.value(2, 15);
  arr2.value(3, 23);

  arr3.value(0, "");
  arr3.value(1, "");
  arr3.value(2, "");
  arr3.value(3, "");

  arr4.value(0, "");
  arr4.value(1, "");
  arr4.value(2, "");
  arr4.value(3, "");

  inputline1.hide();
  inputline3.hide();
  inputline4.hide();
  inputline6.hide();
  outputline1.hide();
  outputline2.hide();
  
  inputlabel2.value("Runs of length 2");
  outputlabel2.value("Runs of length 4");
  av.step();
	
  av.umsg("Take the first record from each input buffer");
  setYellow(0, arr1);
  setYellow(1, arr1);
  setYellow(0, arr2);
  setYellow(1, arr2);
  av.step();

  av.umsg("Write a run of length four to the first output buffer");
  av.effects.moveValue(arr2, 0, arr3, 0);
  av.effects.moveValue(arr2, 1, arr3, 1);
  av.effects.moveValue(arr1, 0, arr3, 2);
  av.effects.moveValue(arr1, 1, arr3, 3);

  setYellow(0, arr3);
  setYellow(1, arr3);
  setYellow(2, arr3);
  setYellow(3, arr3);
  av.step();

  av.umsg("Take the second record from each input buffer");
  setWhite(0, arr1);
  setWhite(1, arr1);
  setWhite(0, arr2);
  setWhite(1, arr2);
  setWhite(0, arr3);
  setWhite(1, arr3);
  setWhite(2, arr3);
  setWhite(3, arr3);

  setYellow(2, arr1);
  setYellow(3, arr1);
  setYellow(2, arr2);
  setYellow(3, arr2);
  av.step();

  av.umsg("Write a run of length four to the first output buffer");
  av.effects.moveValue(arr1, 2, arr4, 0);
  av.effects.moveValue(arr2, 2, arr4, 1);
  av.effects.moveValue(arr2, 3, arr4, 2);
  av.effects.moveValue(arr1, 3, arr4, 3);

  setYellow(0, arr4);
  setYellow(1, arr4);
  setYellow(2, arr4);
  setYellow(3, arr4);
  av.step();

  av.umsg("Only one run remains thus sorting is done");
  av.step();

  av.recorded();
});
