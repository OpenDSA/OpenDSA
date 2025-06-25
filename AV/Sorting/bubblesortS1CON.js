/*global ODSA */
// Title: Bubble Sort First Pass Slideshow
// Author: Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Bubble Sort
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow showing a simple visualization of the first pass for Bubble Sort. */

$(document).ready(function() {
  "use strict";
  var av_name = "bubblesortS1CON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

  var theArray = [20, 10, 15, 54, 55, 11, 78, 14];
  var av = new JSAV(av_name);
  var arr = av.ds.array(theArray, {indexed: true});
  var j;

  av.umsg(interpret("av_c1"));
  av.displayInit();

  arr.addClass(0, "processing");
  for (j = 1; j < arr.size(); j++) {
    arr.addClass(j, "processing");
    av.umsg(interpret("av_c2"));
    av.step();
    if (arr.value(j - 1) > arr.value(j)) {
      av.umsg(interpret("av_c3"));
      arr.swap(j - 1, j);
      av.step();
    }
    arr.removeClass(j - 1, "processing");
  }
  arr.removeClass(j - 1, "processing");
  arr.addClass(j - 1, "deemph");
  av.umsg(interpret("av_c4"));
  av.recorded();
});
