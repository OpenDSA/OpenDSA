$(document).ready(function () {
    "use strict";
    var av_name = "MathProofFF";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("In this module, we will learn about Mathematical proof techniques.");
    av.displayInit();

    //frame 2
    av.umsg(Frames.addQuestion("q0"));
    av.step();

    //frame 3
    av.umsg(Frames.addQuestion("q1"));
    av.step();

    //frame 4
    av.umsg(Frames.addQuestion("q2"));
    av.step();

    //frame 5
    av.umsg(Frames.addQuestion("q3"));
    av.step();
    
    //frame 6
    av.umsg(Frames.addQuestion("q4"));
    av.step();

    //frame 7
    av.umsg("This module briefly introduces three commonly used proof techniques: $\\textbf{1-  Deduction, or direct proof; 2- Proof by contradiction and 3- Proof by mathematical induction.}$");
    av.step();

    //frame 8
    av.umsg(Frames.addQuestion("q5"));
    av.step();

    //frame 9
    av.umsg(Frames.addQuestion("q6"));
    av.step();

    //frame 10
    av.umsg(Frames.addQuestion("q7"));
    av.step();

    //frame 11
    av.umsg(Frames.addQuestion("q8"));
    av.step();

    //frame 12
    av.umsg(Frames.addQuestion("q9"));
    av.step();
    
    //frame 13
    av.umsg(Frames.addQuestion("q10"));
    av.step();
    
    //frame 14
    av.umsg("As we see, following the previous steps proved that $\\Sigma_{ni=1}$ $i$ = $(n+1)n/2$");
    av.step();

    //frame 15
    av.umsg("In some domains, proofs are essentially a series of state changes from a start state to an end state. Formal predicate logic can be viewed in this way, with the various 'rules of logic' being used to make the changes from one formula or combining a couple of formulas to make a new formula on the route to the destination. Symbolic manipulations to solve integration problems in introductory calculus classes are similar in spirit, as are high school geometry proofs.");
    av.step();


    //frame 16
    av.umsg(Frames.addQuestion("q13"));
    av.step();

    //frame 17
    av.umsg(Frames.addQuestion("q14"));
    av.step();

    //frame 18
    av.umsg(Frames.addQuestion("q15"));
    av.step();

    //frame 19
    av.umsg(Frames.addQuestion("q16"));
    av.step();

    //frame 20
    av.umsg("A related proof technique is $proving$ $the$ $contrapositive$. We can prove that P$\\Rightarrow$Q by proving (not Q)$\\Rightarrow$(not P). This technique works because the truth table for the two logical statements are the same.");
    av.step();

    // //frame 22
    // av.umsg(Frames.addQuestion("q17"));
    // av.step();

    //frame 21
    av.umsg(Frames.addQuestion("q18"));
    av.step();

    //frame 22
    av.umsg("Completed.");
    av.step();
 
    av.recorded();
});

