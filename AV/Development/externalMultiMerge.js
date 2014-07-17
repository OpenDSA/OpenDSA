"use strict";

(function ($) {
  var input1 = [5, 10, 15];
  var input2 = [6, 7, 23];
  var input3 = [12, 18, 20];
  var output = ["", "", "", "", "", "", "", "", "", "", "", ""];

  var av = new JSAV("MultiMerge");
  // Create an array object under control of JSAV library
  var arr1 = av.ds.array(input1, {indexed: false, left: 85, top: 30});
  var arr2 = av.ds.array(input2, {indexed: false, left: 85, top: 80});
  var arr3 = av.ds.array(input3, {indexed: false, left: 85, top: 130});
  var arr4 = av.ds.array(output, {indexed: false, left: 400, top: 80});

var setWhite = function (index, arr) {
  arr.css(index, {"background-color": "#FFFFFF" });
};

var setYellow = function (index, arr) {
  arr.css(index, {"background-color": "#FFFF00" });
};


  av.umsg("Here are our starting input runs for the multiway merge.");
  var inputlabel1 = av.label("Input Runs", {left: 90, top: 0});
  var outputlabel1 = av.label("Output Buffer", {left: 525, top: 50});

  av.displayInit();

  av.umsg("First we must look at the first value of each input run.");
  setYellow(0, arr1);
  setYellow(0, arr2);
  setYellow(0, arr3);

  av.step();

  av.umsg("The value 5 is removed first and sent to the output because it is the smallest value.");   
  av.effects.moveValue(arr1, 0, arr4, 0);
  setYellow(0, arr4);
  setWhite(0, arr1);
  setWhite(0, arr2);
  setWhite(0, arr3);
  
  av.step();

  av.umsg("Next we look at the first values in the input runs again.");
  setWhite(0, arr4);
  setYellow(1, arr1);
  setYellow(0, arr2);
  setYellow(0, arr3);

  av.step();

  av.umsg("The value 6 is removed first and sent to the output because it is the smallest value.");   
  av.effects.moveValue(arr2, 0, arr4, 1);
  setYellow(1, arr4);
  setWhite(1, arr1);
  setWhite(0, arr2);
  setWhite(0, arr3);
  
  av.step();

  av.umsg("Compare the first values again.");
  setWhite(1, arr4);
  setYellow(1, arr1);
  setYellow(1, arr2);
  setYellow(0, arr3);

  av.step();

  av.umsg("The value 7 is removed first and sent to the output because it is the smallest value.");   
  av.effects.moveValue(arr2, 1, arr4, 2);
  setYellow(2, arr4);
  setWhite(1, arr1);
  setWhite(1, arr2);
  setWhite(0, arr3);
  
  av.step();

  av.umsg("Compare the first values again.");
  setWhite(2, arr4);
  setYellow(1, arr1);
  setYellow(2, arr2);
  setYellow(0, arr3);

  av.step();

  av.umsg("The value 10 is removed first and sent to the output because it is the smallest value.");   
  av.effects.moveValue(arr1, 1, arr4, 3);
  setYellow(3, arr4);
  setWhite(1, arr1);
  setWhite(2, arr2);
  setWhite(0, arr3);
  
  av.step();

  av.umsg("Compare the first values again.");
  setWhite(3, arr4);
  setYellow(2, arr1);
  setYellow(2, arr2);
  setYellow(0, arr3);

  av.step();

  av.umsg("The value 12 is removed first and sent to the output because it is the smallest value.");   
  av.effects.moveValue(arr3, 0, arr4, 4);
  setYellow(4, arr4);
  setWhite(2, arr1);
  setWhite(2, arr2);
  setWhite(0, arr3);
  
  av.step();

  av.umsg("Compare the first values again.");
  setWhite(4, arr4);
  setYellow(2, arr1);
  setYellow(2, arr2);
  setYellow(1, arr3);

  av.step();

  av.umsg("The value 15 is removed first and sent to the output because it is the smallest value.");   
  av.effects.moveValue(arr1, 2, arr4, 5);
  setYellow(5, arr4);
  setWhite(2, arr1);
  setWhite(2, arr2);
  setWhite(1, arr3);
  
  av.step();

  av.umsg("The first run is exhausted. Now we must read in the next block from disk.");
  arr1.value(0, 17);
  arr1.value(1, 25);
  arr1.value(2, 27);
  setYellow(0, arr1);
  setYellow(1, arr1);
  setYellow(2, arr1);
  setWhite(5, arr4);

  av.step();

  av.umsg("Compare the first values again.");
  setWhite(1, arr1);
  setWhite(2, arr1);
  setYellow(2, arr2);
  setYellow(1, arr3);

  av.step();

  av.umsg("The value 17 is removed first and sent to the output because it is the smallest value.");   
  av.effects.moveValue(arr1, 0, arr4, 6);
  setYellow(6, arr4);
  setWhite(0, arr1);
  setWhite(2, arr2);
  setWhite(1, arr3);
  
  av.step();

  av.umsg("Compare the first values again.");
  setWhite(6, arr4);
  setYellow(1, arr1);
  setYellow(2, arr2);
  setYellow(1, arr3);

  av.step();

  av.umsg("The value 18 is removed first and sent to the output because it is the smallest value.");   
  av.effects.moveValue(arr3, 1, arr4, 7);
  setYellow(7, arr4);
  setWhite(1, arr1);
  setWhite(2, arr2);
  setWhite(1, arr3);
  
  av.step();

  av.umsg("Compare the first values again.");
  setWhite(7, arr4);
  setYellow(1, arr1);
  setYellow(2, arr2);
  setYellow(2, arr3);

  av.step();

  av.umsg("The value 20 is removed first and sent to the output because it is the smallest value.");   
  av.effects.moveValue(arr3, 2, arr4, 8);
  setYellow(8, arr4);
  setWhite(1, arr1);
  setWhite(2, arr2);
  setWhite(2, arr3);
  
  av.step();

  av.umsg("The third run is exhausted but there aren't any more blocks on disk so we compare first values again.");   
  setWhite(8, arr4);
  setYellow(1, arr1);
  setYellow(2, arr2);
  
  av.step();

  av.umsg("The value 23 is removed first and sent to the output because it is the smallest value.");   
  av.effects.moveValue(arr2, 2, arr4, 9);
  setYellow(9, arr4);
  setWhite(1, arr1);
  setWhite(2, arr2);
  
  av.step();

  av.umsg("The second run is exhausted but there aren't any more blocks on disk so we compare first values again.");   
  setWhite(9, arr4);
  setYellow(1, arr1);
  
  av.step();

  av.umsg("The value 25 is removed first and sent to the output because it is the smallest value.");   
  av.effects.moveValue(arr1, 1, arr4, 10);
  setYellow(10, arr4);
  setWhite(1, arr1);
  
  av.step();

  av.umsg("Compare first values again.");   
  setWhite(10, arr4);
  setYellow(2, arr1);
  
  av.step();

  av.umsg("The value 27 is removed first and sent to the output because it is the smallest value.");   
  av.effects.moveValue(arr1, 2, arr4, 11);
  setYellow(11, arr4);
  setWhite(2, arr1);
  
  av.step();

  av.umsg("The first run is exhausted but there aren't any more blocks on disk so we are done.");
  setWhite(11, arr4);

  av.step();

  av.recorded();
}(jQuery));
