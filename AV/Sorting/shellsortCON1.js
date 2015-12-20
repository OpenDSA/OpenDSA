$(document).ready(function () {
  "use strict";
  var theArray = [20, 30, 44, 54, 55, 11, 78, 14, 13, 79, 12, 98];
  var av = new JSAV("shellsortCON1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray, {indexed: true});

  arr.addClass(true, "deemph");
  arr.highlight([0, 8]).removeClass([0, 8], "deemph");
  av.displayInit();
  arr.unhighlight([0, 8]).addClass([0, 8], "deemph");
  arr.highlight([1, 9]).removeClass([1, 9], "deemph");
  for (var i = 2; i < 4; i++) { // loop through the rest of the array sublists
    av.step();
    arr.unhighlight([i - 1, i + 7]).addClass([i - 1, i + 7], "deemph");
    arr.highlight([i, i + 8]).removeClass([i, i + 8], "deemph");
  }
  av.recorded();
});
