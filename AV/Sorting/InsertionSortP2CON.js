/*global ODSA */
"use strict";
(function ($) {
  $(document).ready(function () {
    var av_name = "InsertionSortP2CON";
    var interpret = ODSA.UTILS.loadLangData(av_name).interpreter;

    var theArray2 =  [10, 20, 15, 54, 55, 11, 78, 14];
    var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements
    var av = new JSAV(av_name);
    var arr = av.ds.array(theArray2, {indexed: true});

    arr.highlight(2);
    arr.css([3, 4, 5, 6, 7], {"color": LIGHT});
    av.umsg(interpret("av_c1"));
    av.displayInit();

    arr.highlightBlue(1);
    av.umsg(interpret("av_c2"));
    av.step();

    arr.swap(1, 2);
    arr.highlight(1).unhighlight(2);
    av.umsg(interpret("av_c3"));
    arr.unhighlightBlue(2);
    av.step();

    arr.highlightBlue(0);
    av.umsg(interpret("av_c4"));
    av.step();

    av.umsg(interpret("av_c4"));
    arr.unhighlight(1);
    arr.unhighlightBlue([0, 1]);
    av.recorded();
  });
}(jQuery));
