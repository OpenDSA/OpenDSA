$(document).ready(function () {
    "use strict";
    var av_name = "INRL";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("How do we prove that a language is regular? We have a number of approaches in our toolbox. <br> 1. Build a DFA. <br> 2. Build a NFA. <br> 3. Write a regular expression.<br> 4. Write a regular grammar.<br> 5. Start with known regular languages and apply operations known to be closed for regular languages.");
    av.displayInit();

    
    //frame 2
    av.umsg("hello");
    av.step();

    av.recorded();
});
