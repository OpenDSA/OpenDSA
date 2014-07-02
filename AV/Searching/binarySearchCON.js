/*global ODSA */
"use strict";
(function ($) {
  $(document).ready(function () {
    var av_name = "binarySearchCON";
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadLangData({'av_name': av_name}),
        interpret = config.interpreter,       // get the interpreter
        code = config.code;                   // get the code object
    var av = new JSAV(av_name);

    var theArray = [11, 13, 21, 26, 29, 36, 40, 41, 45, 51, 54, 56, 65, 72, 77, 83];
    var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements
    var DARK = "rgb(0, 0, 0)";  // For resetting array element color
    var pseudo = av.code(code);
    var arr = av.ds.array(theArray, {indexed: true});

    // Utility functions for setting array cell colors
    var setBlue = function (index) {
      arr.css(index, {"background-color": "#ddf" });
    };
    var setPink = function (index) {
      arr.css(index, {"background-color": "#FFB6C1" });
    };
    var setYellow = function (index) {
      arr.css(index, {"background-color": "#FFFF00" });
    };
    var clear = function (index) {
      arr.css(index, {"background-color": "#FFFFFF" });
    };

    av.umsg(interpret("av_c1"));
    arr.toggleArrow(8);
    av.displayInit();
    setYellow([0, 15]);

    av.umsg(interpret("av_c2"));
    pseudo.highlight("sig");
    av.step();

    av.umsg(interpret("av_c3"));
    setBlue(7);
    pseudo.unhighlight("sig");
    pseudo.highlight("compute");
    av.step();

    av.umsg(interpret("av_c4"));
    setYellow(7);
    clear(0);
    arr.css([0, 1, 2, 3, 4, 5, 6], {"color": LIGHT});
    pseudo.unhighlight("compute");
    pseudo.highlight("left");
    av.step();

    av.umsg(interpret("av_c5"));
    setBlue(11);
    pseudo.unhighlight("left");
    pseudo.highlight("compute");
    av.step();

    av.umsg(interpret("av_c6"));
    setYellow(11);
    clear(15);
    arr.css([12, 13, 14, 15], {"color": LIGHT});
    pseudo.unhighlight("compute");
    pseudo.highlight("right");
    av.step();

    av.umsg(interpret("av_c7"));
    setBlue(9);
    pseudo.unhighlight("right");
    pseudo.highlight("compute");
    av.step();

    av.umsg(interpret("av_c8"));
    setYellow(9);
    clear(11);
    arr.css([10, 11], {"color": LIGHT});
    pseudo.unhighlight("compute");
    pseudo.highlight("right");
    av.step();

    av.umsg(interpret("av_c9"));
    setBlue(8);
    pseudo.unhighlight("right");
    pseudo.highlight("compute");
    av.step();

    av.umsg(interpret("av_c10"));
    setPink(8);
    pseudo.unhighlight("compute");
    pseudo.highlight("found");
    av.step();

    av.umsg(interpret("av_c11"));
    pseudo.unhighlight("found");
    av.step();

    av.umsg(interpret("av_c12"));
    arr.css(true, {"color": DARK});
    setPink([7, 8, 9, 11]);
    av.recorded();
  });
}(jQuery));
