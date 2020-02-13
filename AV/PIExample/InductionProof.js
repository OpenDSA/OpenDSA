$(document).ready(function () {
    "use strict";
    var av_name = "InductionProof";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("This module will provide more examples for Mathematical Induction proofs.");
    av.displayInit();

    //frame 2
    av.umsg("Here is another simple proof by induction that illustrates choosing the proper variable for induction. We wish to prove by induction that the sum of the first $n$ positive odd numbers is $n^2$");
    av.step();
    
    //frame 3
    av.umsg(Frames.addQuestion(q0));
    av.step();

 
    av.recorded();
});

