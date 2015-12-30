/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
//Array-Based list introduction
$(document).ready(function() {
  "use strict";
  var arrValues = [13, 12, 20, 8, 3, "", "", ""];
  var av_name = "alistIntroCON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);
  var arr = av.ds.array(arrValues, {indexed: true});

  // Slide 1
  av.umsg(interpret("sc1"));
  arr.addClass([5, 6, 7], "unused");
  arr.highlight([0, 1, 2, 3, 4]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  arr.unhighlight([0, 1, 2, 4]);
  arr.highlight(3);
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  arr.unhighlight(3);
  arr.highlight(0);
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  arr.unhighlight(0);
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  av.recorded();
});
