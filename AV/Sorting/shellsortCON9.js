// Title: Shellsort Final Pass Details Slideshow
// Author: Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Shellsort
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow showing the details of what records would be compared and swapped in the final "cleanup" pass of Shellsort. */

/*global doSweep */
$(document).ready(function() {
  "use strict";
  var theArray4 = [12, 11, 13, 14, 20, 30, 44, 54, 55, 79, 78, 98];
  var arr = theArray4;
  doSweep("shellsortCON9", arr, 1);
});
