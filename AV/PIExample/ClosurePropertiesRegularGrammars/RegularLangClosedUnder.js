$(document).ready(function () {
    "use strict";
    var av_name = "RegularLangClosedUnder";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("$\\textbf {Reversal}$: $L^R$<br> $\\textbf {Difference}$: $L_1 - L_2$<br> $\\textbf {Right quotient}$:<br> Definition: $\\dfrac {L_1}{L_2} = \\{x | xy \\in L_1 \\ for \\ some \\ y \\in L_2\\}$ <br> In other words, it is prefixs of appropriate strings in $L_1$.");
    av.displayInit();

    //frame 2
    av.umsg(Frames.addQuestion("q1"));
    av.step();

    //frame 3
    av.umsg("$\\textbf {Theorem}$: If $L_1$ and $L_2$ are regular, then $\\dfrac {L_1}{L_2}$ is regular.<br> $\\textbf {Proof}$: (sketch)<br> There exists a DFA $M = (Q,\\sum,\\lambda,q_0,F)$ such that $L_1=L(M)$. <br> Construct DFA $M′=(Q,\\sum,\\delta,q_0,F′)$ (equivalent to $M$ except for final states).");
    av.step();
    
    //frame 4
    av.umsg("For each state $i$ do <br> Make $i$ the start state (representing $L′_i$)<br> if $L′_i \\cap L_2\\neq \\emptyset$ then <br> put $q_i$ in $F′$ in  $M′$");
    av.step();

    //frame 5
    av.umsg("$\\textbf {Homomorphism}$:<br> $\\textbf {Definition}$: Let $\\sum$,Γ be alphabets. A homomorphism is a function $h:\\sum \\rightarrow Γ^∗$ <br>Homomorphism means to substitute a single letter with a string.");
    av.step();

    //frame 6
    av.umsg(Frames.addQuestion("q2"));
    av.step();

    //frame 7
    av.umsg(Frames.addQuestion("q3"));
    av.step();


    av.recorded();
});
