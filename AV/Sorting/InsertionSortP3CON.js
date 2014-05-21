"use strict";
(function ($) {
  $(document).ready(function () {
  var theArray3 =  [10, 15, 20, 54, 55, 11, 78, 14];
  var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements
  var av = new JSAV("InssortCON3");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray3, {indexed: true});

  arr.highlight(3);
  arr.css([4, 5, 6, 7], {"color": LIGHT});
  av.umsg("Now we are ready to process the record in position 3");
  av.displayInit();

  arr.highlightBlue(2);
  av.umsg("We will compare it to the record in position 2");
  av.step();

  av.umsg("Since the record in position 2 is smaller, nothing changes and we are done with the record in position 3");
  arr.unhighlightBlue(2);
  arr.unhighlight(3);
  av.recorded();
  });
}(jQuery));
