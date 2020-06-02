$(document).ready(function () {
    "use strict";
    var av_name = "ContinuedMathProofFF";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("This module will continue discussing the mathematical proof techniques.");
    av.displayInit();

    //frame 2
    av.umsg("$\\textbf{Proof by  Mathematical Induction}$: Mathematical induction can be used to prove a wide variety of theorems. Induction also provides a useful way to think about algorithm design, because it encourages you to think about solving a problem by building up from simple subproblems. ");
    av.step();

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

    av.umsg("Induction Process: Let Thrm be a theorem to prove, and express Thrm in terms of a positive integer parameter n");
    av.step();

    
    //frame 6
    av.umsg(Frames.addQuestion("q4"));
    av.step();

    av.umsg("Proving the induction step is sometimes easy, and sometimes difficult. An alternative formulation of the induction step is known as $\\textbf {strong\ induction}$. The induction step for strong induction is: $\\textbf{Induction Step}$: If $\\textbf{Thrm}$ holds for all k,c$\\leq$k$<$n, then $\\textbf{Thrm}$ holds for n.");
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

    av.umsg("Having the Induction hypothesis makes the induction step easier to prove than tackling the original theorem itself. Being able to rely on the induction hypothesis provides extra information that we can bring to bear on the problem.");
    av.step();

    av.umsg("You will learn more about Recursion and Induction.")

    //frame 10
    av.umsg(Frames.addQuestion("q7"));
    av.step();

    av.umsg("The induction hypothesis does not come out of thin air. It is true if and only if the theorem itself is true, and therefore is reliable within the proof context. Using the induction hypothesis to do work is exactly the same as using a recursive call to do work.");
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
    av.umsg("Since $S(1) = (1 + 1)*\\frac{1}{2} = 1$ then the base case is verified.");
    av.step();

    //frame 15
    av.umsg(Frames.addQuestion("q12"));
    av.step();

    //frame 16
    av.umsg(Frames.addQuestion("q13"));
    av.step();

    //frame 17
    av.umsg(Frames.addQuestion("q14"));
    av.step();

    //frame 18
    av.umsg("Thus, by mathematical induction S(n) = \\sum_{i=1}^{n} i = \\frac{(n+1)n}{2}.");
    av.step();

    //frame 19
    av.umsg("Completed.");
    av.step();

    av.recorded();
});

