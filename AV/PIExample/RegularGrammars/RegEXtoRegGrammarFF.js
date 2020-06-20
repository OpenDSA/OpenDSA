$(document).ready(function() {
    "use strict";
    var av_name = "RegEXtoRegGrammarFF";
    var av = new JSAV(av_name);
    var arrow = String.fromCharCode(8594); 
    //var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
  
    //frame 1
    av.recorded();

});

