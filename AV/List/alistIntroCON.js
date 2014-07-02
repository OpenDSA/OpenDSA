/*global ODSA */
"use strict";
//Array-Based list introduction
(function ($) {
  $(document).ready(function () {
    var arrValues = [13, 12, 20, 8, 3, '', '', ''];
    var av_name = "alistIntroCON";
    var interpret = ODSA.UTILS.loadLangData({'av_name': av_name}).interpreter;
    var av = new JSAV(av_name);
    var arr = av.ds.array(arrValues, {indexed: true, layout: 'array'});

    arr.css([5, 6, 7], { 'background-color': '#eee' });
    av.umsg(interpret("av_c1"));
    arr.highlight([0, 1, 2, 3, 4]);
    av.displayInit();

    av.umsg(interpret("av_c2"));
    arr.unhighlight([0, 1, 2, 4]);
    arr.highlight(3);
    av.step();

    av.umsg(interpret("av_c3"));
    arr.unhighlight(3);
    arr.highlight(0);
    av.step();

    av.umsg(interpret("av_c4"));
    arr.unhighlight(0);
    av.step();

    av.umsg(interpret("av_c5"));
    av.recorded();
  });
}(jQuery));
