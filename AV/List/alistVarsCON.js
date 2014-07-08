/*global ODSA */
"use strict";
// Written by Jun Yang and Cliff Shaffer
// Show off the private data members
(function ($) {
  $(document).ready(function () {
    var av_name = "alistVarsCON";
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadLangData({"av_name": av_name}),
        interpret = config.interpreter,       // get the interpreter
        code = config.code;                   // get the code object
    var av = new JSAV(av_name);
    var pseudo = av.code(code);
    av.umsg(interpret("av_c1"));
    av.displayInit();

    av.umsg(interpret("av_c2"));
    pseudo.highlight("sig");
    av.step();

    pseudo.unhighlight("sig");
    pseudo.highlight("listArray");
    av.umsg(interpret("av_c3"));
    av.step();

    pseudo.unhighlight("listArray");
    pseudo.highlight("default");
    av.umsg(interpret("av_c4"));
    av.step();

    pseudo.unhighlight("default");
    pseudo.highlight("maxSize");
    av.umsg(interpret("av_c5"));
    av.step();

    pseudo.unhighlight("maxSize");
    pseudo.highlight("listSize");
    av.umsg(interpret("av_c6"));
    av.step();

    pseudo.unhighlight("listSize");
    pseudo.highlight("curr");
    av.umsg(interpret("av_c7"));
    av.step();

    pseudo.unhighlight("curr");
    av.umsg(interpret("av_c8"));
    av.recorded();
  });
}(jQuery));
