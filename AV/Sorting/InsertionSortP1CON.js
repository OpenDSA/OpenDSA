/* global ODSA */
"use strict";
(function ($) {
  $(document).ready(function () {
    var av_name = "InssortCON1";

    // Super hack to get the path to the JSON language file relative to this JS file
    // Find the script tag whose src contains the name of this JS file, get the src and append a 'on' to form '.json'
    var json_path = $('script[src*="InsertionSortP1CON.js"]')[0].src + 'on';
    var interpret = ODSA.UTILS.loadLangData(av_name, json_path).interpreter;

    var theArray1 = [20, 10, 15, 54, 55, 11, 78, 14];
    var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements
    var av = new JSAV(av_name);
    var arr = av.ds.array(theArray1, {indexed: true});

    arr.highlight(1);
    arr.css([2, 3, 4, 5, 6, 7], {"color": LIGHT});
    av.umsg(interpret("av_c1"));
    av.displayInit();

    av.umsg(interpret("av_c2"));
    arr.swap(0, 1);
    arr.unhighlight(1).highlight(0);
    av.step();

    av.umsg(interpret("av_c3"));
    arr.unhighlight(0);
    av.recorded();
  });
}(jQuery));
