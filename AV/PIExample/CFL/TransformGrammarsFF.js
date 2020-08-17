$(document).ready(function () {
    "use strict";
    var av_name = "TransformGrammarsFF";
    var av = new JSAV(av_name,);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;
  
    //frame 1
    av.umsg("We use grammars to represent a programming language. Want to know: Is a given string (or program x) valid (syntactically correct)? Same as asking if it is in the language");
    av.displayInit();
    
    //frame 2
    av.umsg(Frames.addQuestion("q2"));
    av.step();

});