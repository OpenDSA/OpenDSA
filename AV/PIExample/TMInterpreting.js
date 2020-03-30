$(document).ready(function () {
    "use strict";

    var av_name = "TMInterpreting";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    

    //frame 1
    av.umsg("Here is an example of a machine that is slightly more complicated. This Turing machine accepts the language $L(a^*b^*c^*)$ <br> <br> $M = (Q, &Sigma;, &Gamma;, s, F, &delta;)$ <br> &bull; $Q = \\{q_0, q_1, q_2, q_3\\}$, <br> &bull; $&Sigma; = \\{a, b, c\\}$, <br> &bull; $&Gamma; = &Sigma; &cup; \\{\\#\\} $, <br> &bull; $s = q_0$, <br> &bull; $F = q_2$, <br> &bull; $&delta; = $ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q$ &nbsp; &nbsp; $&Gamma;$ &nbsp; &nbsp; $(q, &Gamma;, \\{L, R, S\\})$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_0$ &nbsp;&nbsp;$a$ &nbsp; &nbsp;&nbsp; $(q_0, a, R)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_0$ &nbsp;&nbsp;$b$ &nbsp; &nbsp;&nbsp; $(q_1, b, R)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_0$ &nbsp;&nbsp;$c$ &nbsp; &nbsp;&nbsp; $(q_2, c, R)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_0$ &nbsp;&nbsp;$\\#$ &nbsp; &nbsp; $(q_3, \\#, S)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_1$ &nbsp;&nbsp;$b$ &nbsp; &nbsp;&nbsp; $(q_1, b, R)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_1$ &nbsp;&nbsp;$c$ &nbsp; &nbsp;&nbsp; $(q_2, c, R)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_1$ &nbsp;&nbsp;$\\#$ &nbsp;&nbsp;&nbsp; $(q_3, \\#, S)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_2$ &nbsp;&nbsp;$c$ &nbsp; &nbsp;&nbsp; $(q_2, c, R)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_2$ &nbsp;&nbsp;$\\#$ &nbsp;&nbsp;&nbsp; $(q_3, \\#, S)$");
    av.displayInit();

    //frame 2
    av.umsg("Here is the graphical view of the machine.");
    var url = "../../../AV/VisFormalLang/TM/Machines/TMabc.jff";
    var graph1 = av.ds.TM({width: 600, height: 325, url: url});
    av.step();

    //frame 3
    graph1.hide();
    av.umsg("A <b>configuration</b> for a Turing machine looks like this: <i>(q, <u>a</u>aba)</i> <br><br> This means that the TM is on state <i>q</i>, the tape contains <i><u>a</u>aba</i> and the read/write head position is on the underlined 'a'. Recall that we assume at the start of processing input for any TM, the read/write head position is on the leftmost non-blank character. <br> <br> Don't forget that the tape is infinite in both directions. So to the left of the leftmost 'a' in this configuration is an infinite number of blank squares, and to the right of the rightmost a is also an infinite number of blank squares.");
    av.step();

    //frame 4
    av.umsg("A <b>halted configuration</b> occurs when the machine does not find a move from the current state using the current tape letter (the current configuration). In other words, a TM halts if there is no δ defined. Note that we never define any transitions out of any Final State. So there is some redundancy when we said earlier that the machine halts when either it is in any Final State, or when there is no current transition. But having two such definitions for halting makes it easy to define the difference between accepting and rejecting a string. <br> <br> A <b>computation</b> is a sequence of configurations of some length n ≥ 0.");
    av.step();

    //frame 5
    av.umsg("Recall the TM example that erases all a's from the tape. <br>Here are the configurations for the input \"aaaa\". <br><br> <i>($q_0$,<u>a</u> a a a) ⊢M ($q_0$,<u>#</u> a a a) <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⊢M ($q_0$,# <u>#</u> a a) <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⊢M ($q_0$,# # <u>#</u> a) <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⊢M ($q_0$,# # # <u>#</u>) <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⊢M ($q_1$,# # # # <u>#</u>) </i> <br><br> <b>Notation</b>: Given a string w, the notation <u>w</u> for a configuration means that the read/write head is scanning the leftmost character in w. <br><br> M is said to <b>halt</b> on input w iff (s,<u>w</u>) yields some halted configuration. <br> <br> M is said to <b>hang</b> on input w if (s,<u>w</u>) yields some hanging configuration.");
    av.step();

    //frame 6
    av.umsg("What is a \"hanging\" configuration? The machine hangs when it goes into an infinite loop. Anytime you provide the mechanism to create loops that only end on a condition, you have also created the conditions that might allow an infinite loop to happen. <br><br><br><br<br><br><br><br><br><br>Consider the above machine on strings of a's and b's that scans right until it sees a 'b'. If it never sees a 'b', then it will never halt. This means that it goes into an infinite loop (or hangs) anytime the input string does not contain a 'b'.");
    var url2 = "../../../AV/VisFormalLang/TM/Machines/TMab.jff";
    var graph2 = av.ds.TM({width: 600, height: 325, url: url2});
    av.step();

    //frame 7
    graph2.hide();
    av.umsg("kkk");
    av.step();

    
    av.recorded();
});
