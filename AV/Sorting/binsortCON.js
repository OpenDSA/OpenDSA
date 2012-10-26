"use strict";

// Randomly scramble the contents of an array
function permute(A) {
  for (var i = 0; i < A.length; i++) {                // for each i
    var randompos = Math.floor(Math.random() * A.length);
    var temp = A[i];
    A[i] = A[randompos];
    A[randompos] = temp;
  }
}

var setBlue = function (arr, index) {
  arr.css(index, {"background-color": "#ddf" });
};

(function ($) {
  var theArray = [];
  var empty = [];
  empty.length = 10;
  for (var i = 0; i < 10; i++) {
    theArray[i] = i;
  }
  permute(theArray);
  var av = new JSAV("BinsortCON1");
  // Create an array object under control of JSAV library
  var arrA = av.ds.array(theArray, {indexed: true});
  var labelA = av.label("A", {before: arrA, left: 75});
  var arrB = av.ds.array(empty, {indexed: true});
  var labelB = av.label("B", {before: arrB, left: 75});
  av.umsg("So a simple Binsort on a permutation of the values 0 to n-1. Move each value A[i] to position B[A[i]].");
  av.displayInit();
  for (i = 0; i < theArray.length; i++) {
    av.umsg("Move " + arrA.value(i) + " at position " + i + " in array A to position " + arrA.value(i) + " in array B.");
    av.effects.moveValue(arrA, i, arrB, arrA.value(i));
    av.step();
  }
  av.umsg("Done!");
  av.recorded();
}(jQuery));

(function ($) {
  var maxKeyLength = 15;
  var theArray = [12, 14, 2, 7, 0];
  var emptyLong = [];
  var i, j;
  emptyLong.length = maxKeyLength;
  var emptyShort = [];
  emptyShort.length = theArray.length;
  permute(theArray);
  var av = new JSAV("BinsortCON2");
  // Create an array object under control of JSAV library
  var arrA = av.ds.array(theArray, {indexed: true});
  var labelA = av.label("A", {before: arrA, left: 240, top: 10});
  var arrB = av.ds.array(emptyLong, {indexed: true});
  var labelB = av.label("B", {before: arrB, left: 10, top: 105});
  var arrOut = av.ds.array(emptyShort, {indexed: true});
  var labelOut = av.label("Output", {before: arrOut, left: 210, top: 195});
  av.umsg("This time the input has values in the range 0 to 14. Move each value A[i] to position B[A[i]].");
  av.displayInit();
  for (i = 0; i < theArray.length; i++) {
    if (i !== 0) { arrA.unhighlight(i - 1); }
    av.umsg("Move " + arrA.value(i) + " at position " + i + " in array A to position " + arrA.value(i) + " in array B.");
    av.effects.moveValue(arrA, i, arrB, arrA.value(i));
    av.step();
  }
  av.umsg("Now that they are in order, we move the values to the output array.");
  for (i = 0, j = 0; i < maxKeyLength; i++) {
    av.step();
    arrB.highlight(i);
    if (i !== 0) { arrB.unhighlight(i - 1); }
    if (arrB.value(i) !== "") {
      av.effects.moveValue(arrB, i, arrOut, j);
      j++;
      av.umsg("Move " + arrB.value(i) + " at position " + i + " in array B to position " + j + " in the output array.");
    } else {
      av.umsg("Nothing to move from position " + i);
    }
  }
  av.recorded();
}(jQuery));
