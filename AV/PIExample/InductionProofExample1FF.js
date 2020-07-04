
$(document).ready(function() {
    "use strict";
    var av_name = "InductionProofExample1FF";
    var av = new JSAV(av_name);
    av.container.on('jsav-updatecounter', () => MathJax.Hub.Queue(["Typeset",MathJax.Hub]));
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
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
    av.umsg(Frames.addQuestion("q0"));
    av.step();

    //frame 4
    av.umsg(Frames.addQuestion("q1"));
    av.step();

    //frame 5
    av.umsg(Frames.addQuestion("q2"));
    av.step();

    //frame 6
    av.umsg(Frames.addQuestion("q3"));
    av.step();

    //frame 7
    av.umsg(Frames.addQuestion("q4"));
    av.step();

    //frame 8 need editing
    av.umsg(Frames.addQuestion("q5"));
    av.step();

    //frame 9 
    av.umsg(Frames.addQuestion("q6"));
    av.step();
    

    //frame 10
    av.umsg("This example shows how we can use induction to prove that a proposed closed-form solution for a recurrence relation is correct.");
    av.step();
    
    //frame 11
    av.umsg("We need to prove that the recurrence relation $T(n) = T(n−1) + 1$;$T(1) = 0$ has closed-form solution $T(n)=n−1$.");
    av.step();

    //frame 12
    av.umsg(Frames.addQuestion("q7"));
    av.step();
    
    //frame 13
    av.umsg(Frames.addQuestion("q8"));
    av.step();

    //frame 14
    av.umsg(Frames.addQuestion("q9"));
    av.step();

    //frame 15
    av.umsg(Frames.addQuestion("q10"));
    av.step();

    //frame 16
    av.umsg("Thus, we have proved the theorem correct by mathematical induction.");
    av.step();

    av.umsg("Completed.");
    av.step();
    
    av.recorded();
});
