$(document).ready(function () {
    "use strict";
    var av_name = "InductionProofExample2FF";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame  1
    av.umsg("This Module provides an example that shows how induction can be used to prove that a recursive function produces the correct result.");
    av.displayInit();

    
    //frame 2 
    av.umsg(Frames.addQuestion("q0"));
    av.step();

    //frame 3
    av.umsg("There are two distinct steps to such proof.<br> - First is to prove that the function always terminates.<br> - Second is to prove that the function returns the correct value.");
    av.step();

    //frame 4
    av.umsg(Frames.addQuestion("q1"));
    av.step();

    //frame 5
    av.umsg("The induction hypothesis is that $fact$ will terminate for $n−1$");
    av.step();

    //frame 6
    av.umsg(Frames.addQuestion("q3"));
    av.step();

    //frame 7
    av.umsg(Frames.addQuestion("q2"));
    av.step();

    //frame 8
    av.umsg(Frames.addQuestion("q4"));
    av.step();

    //frame 9
    av.umsg(Frames.addQuestion("q5"));
    av.step();

    //frame 10
    av.umsg(Frames.addQuestion("q6"));
    av.step();

    //frame 11
    av.umsg("The induction hypothesis is that $fact(n-1)$ returns the correct value of $(n-1)!$.");
    av.step();

    //frame 12
    av.umsg(Frames.addQuestion("q7"));
    av.step();

    //frame 13
    av.umsg(" We can use a similar process to prove many recursive programs correct. The general form is to show that the base cases perform correctly, and then to use the induction hypothesis to show that the recursive step also produces the correct result. Prior to this, we must prove that the function always terminates, which might also be done using an induction proof.");
    av.step();
    av.umsg("Completed.");
    av.step();

    av.recorded();
});
