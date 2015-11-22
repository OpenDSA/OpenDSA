/*global ODSA */
"use strict";
$(document).ready(function () {
  var av_name = "insertionsortCON";
  var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;

  var theArray1 = [20, 10, 15, 54, 55, 11, 78, 14];
  var av = new JSAV(av_name);
  var arr = av.ds.array(theArray1, {indexed: true});

  // Slide 1
  av.umsg(interpret("av_c1"));
  arr.highlight(1);
  arr.addClass([2, 3, 4, 5, 6, 7], "deemph");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("av_c2"));
  arr.swap(0, 1);
  arr.unhighlight(1).highlight(0);
  av.step();

  // Slide 3
  av.umsg(interpret("av_c3"));
  arr.unhighlight(0);
  av.step();

  // Slide 4
  av.umsg(interpret("av_c4"));
  arr.highlight(2);
  arr.removeClass(2, "deemph");
  av.step();


  // Slide 5
  av.umsg(interpret("av_c5"));
  arr.highlightBlue(1);
  av.step();

  // Slide 6
  av.umsg(interpret("av_c6"));
  arr.swap(1, 2);
  arr.unhighlightBlue(1);
  arr.highlight(1);
  arr.unhighlight(2);
  av.step();

  // Slide 7
  av.umsg(interpret("av_c7"));
  arr.highlightBlue(0);
  av.step();

  // Slide 8
  av.umsg(interpret("av_c8"));
  arr.unhighlight(1);
  arr.unhighlightBlue([0, 1]);
  av.step();

  // Slide 9
  av.umsg(interpret("av_c9"));
  arr.highlight(3);
  arr.removeClass(3, "deemph");
  av.step();

  // Slide 10
  av.umsg(interpret("av_c10"));
  arr.highlightBlue(2);
  av.step();

  // Slide 11
  av.umsg(interpret("av_c11"));
  arr.unhighlightBlue(2);
  arr.unhighlight(3);
  av.recorded();
});
