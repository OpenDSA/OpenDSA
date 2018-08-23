$(document).ready(function() {
    "use strict";
    var av_name = "Frames";
    var av = new JSAV(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;
    av.recorded();
    $(".jsavforward").css("pointer-events", "none");  });
  