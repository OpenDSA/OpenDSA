"use strict";
(function ($) {
  $(document).ready(function () {
  var theArray2 =  [10, 20, 15, 54, 55, 11, 78, 14];
  var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements
  var av = new JSAV("InssortCON2");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray2, {indexed: true});

  arr.highlight(2);
  arr.css([3, 4, 5, 6, 7], {"color": LIGHT});
  av.umsg("Now we are ready to process the record in position 2");
  av.displayInit();

  arr.highlightBlue(1);
  av.umsg("We will compare it to the record in position 1");
  av.step();

  arr.swap(1, 2);
  arr.highlight(1).unhighlight(2);
  av.umsg("Since the record in position 2 is smaller, swap them");
  arr.unhighlightBlue(2);
  av.step();

  arr.highlightBlue(0);
  av.umsg("Now compare against the record in position 0");
  av.step();

  av.umsg("Since the record currently in position 1 is not smaller than the one in position 0, we are done with it");
  arr.unhighlight(1);
  arr.unhighlightBlue([0, 1]);
  av.recorded();
  });
}(jQuery));
