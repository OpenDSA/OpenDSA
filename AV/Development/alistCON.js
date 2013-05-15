"use strict";
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// The various arrays to start sweeps with or display
var theArray = [13, 12, 20, 8, 3];

(function ($) {
  var av = new JSAV("AlistCON1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray, {indexed: true});

  arr.highlight(1);
  av.umsg("Here is where we start");
  av.displayInit();

  av.recorded();
}(jQuery));
