"use strict";
(function ($) {
  $(document).ready(function () {
  var theArray1 = [20, 10, 15, 54, 55, 11, 78, 14];
  var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements
  var av = new JSAV("InssortCON1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray1, {indexed: true});

  arr.highlight(1);
  arr.css([2, 3, 4, 5, 6, 7], {"color": LIGHT});
  av.umsg("Insertion Sort starts with the record in position 1");
  av.displayInit();

  av.umsg("Since this is smaller than the value to its left, swap them");
  arr.swap(0, 1);
  arr.unhighlight(1).highlight(0);
  av.step();

  av.umsg("Now we are done with this record since it cannot move further left");
  arr.unhighlight(0);
  av.recorded();
  });
}(jQuery));
