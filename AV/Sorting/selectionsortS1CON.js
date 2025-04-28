/*global ODSA */
// Title: Selection Sort First Pass Slideshow
// Author: Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Selection Sort
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow showing a simple visualization of the first pass for Selection Sort. */

$(document).ready(function() {
  "use strict";
  var av_name = "selectionsortS1CON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

  var theArray = [20, 10, 15, 54, 55, 11, 78, 14];
  var av = new JSAV(av_name);
  var arr = av.ds.array(theArray, {indexed: true});
  var j;
  var bigindex = 0;

  av.umsg(interpret("av_c1"));
  av.displayInit();

  av.umsg(interpret("av_c2"));
  arr.addClass(0, "special");
  av.step();

  for (j = 1; j < arr.size(); j++) {
    arr.addClass(j, "processing");
    av.umsg(interpret("av_c3"));
    av.step();
    if (arr.value(j) > arr.value(bigindex)) {
      av.umsg(interpret("av_c4"));
      arr.removeClass(bigindex, "special");
      bigindex = j;
      arr.addClass(bigindex, "special");
      av.step();
    }
    arr.removeClass(j, "processing");
  }
  av.umsg(interpret("av_c5"));
  av.step();

  arr.removeClass(bigindex, "special");
  arr.addClass(arr.size() - 1, "special");
  arr.swap(bigindex, arr.size() - 1); // swap the two indices
  av.step();

  av.umsg(interpret("av_c6"));
  arr.removeClass(arr.size() - 1, "special");
  arr.addClass(arr.size() - 1, "deemph");
  av.recorded();
});
