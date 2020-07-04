$(document).ready(function() {
    "use strict";
    var av_name = "SetDefFF";
    var av = new JSAV(av_name);
    av.container.on('jsav-updatecounter', () => MathJax.Hub.Queue(["Typeset",MathJax.Hub]));
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("The concept of a $set$ in the mathematical sense has a wide application in computer science. The notations and techniques of $set$ theory are commonly used when describing and implementing algorithms because the abstractions associated with $sets$ often help to clarify and simplify algorithm design.");
    av.displayInit();

    //frame 2
    av.umsg(Frames.addQuestion("q1"));
    av.step();

    //frame 3
    av.umsg(Frames.addQuestion("q2"));
    av.step();
    
    //frame 4
    av.umsg(Frames.addQuestion("q3"));
    av.step();

    //frame 5
    av.umsg(Frames.addQuestion("q4"));
    av.step();

    av.umsg("Completed.");
    av.step();
    av.recorded();
});
    
  
