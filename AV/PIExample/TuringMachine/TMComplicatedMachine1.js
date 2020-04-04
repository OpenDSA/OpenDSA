$(document).ready(function () {
    "use strict";

    var av_name = "TMComplicatedMachine1";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var xStart = 150;
    var yStart = 0;

    
    

    //frame 1
    av.umsg("Here is an example of a machine that is slightly more complicated. This Turing machine accepts the language $L(a^*b^*c^*)$ <br> <br> $M = (Q, &Sigma;, &Gamma;, s, F, &delta;)$ <br> &bull; $Q = \\{q_0, q_1, q_2, q_3\\}$, <br> &bull; $&Sigma; = \\{a, b, c\\}$, <br> &bull; $&Gamma; = &Sigma; &cup; \\{\\#\\} $, <br> &bull; $s = q_0$, <br> &bull; $F = q_2$, <br> &bull; $&delta; = $ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;--------------------------------- <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q$ &nbsp; &nbsp; $&Gamma;$ &nbsp; &nbsp; $(q, &Gamma;, \\{L, R, S\\})$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;---------------------------------<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_0$ &nbsp;&nbsp;$a$ &nbsp; &nbsp;&nbsp; $(q_0, a, R)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_0$ &nbsp;&nbsp;$b$ &nbsp; &nbsp;&nbsp; $(q_1, b, R)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_0$ &nbsp;&nbsp;$c$ &nbsp; &nbsp;&nbsp; $(q_2, c, R)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_0$ &nbsp;&nbsp;$\\#$ &nbsp; &nbsp; $(q_3, \\#, S)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_1$ &nbsp;&nbsp;$b$ &nbsp; &nbsp;&nbsp; $(q_1, b, R)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_1$ &nbsp;&nbsp;$c$ &nbsp; &nbsp;&nbsp; $(q_2, c, R)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_1$ &nbsp;&nbsp;$\\#$ &nbsp;&nbsp;&nbsp; $(q_3, \\#, S)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_2$ &nbsp;&nbsp;$c$ &nbsp; &nbsp;&nbsp; $(q_2, c, R)$ <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $q_2$ &nbsp;&nbsp;$\\#$ &nbsp;&nbsp;&nbsp; $(q_3, \\#, S)$");
    av.displayInit();

    //frame 2
    av.umsg("Here is the graphical view of the machine.");
    var url = "../../../../AV/VisFormalLang/TM/Machines/TMabc.jff";
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
    av.umsg(Frames.addQuestion("q1"));
    av.step();

    //frame 6
    av.umsg("What is a \"hanging\" configuration? The machine hangs when it goes into an infinite loop. Anytime you provide the mechanism to create loops that only end on a condition, you have also created the conditions that might allow an infinite loop to happen. <br><br><br><br<br><br><br><br><br><br>Consider the above machine on strings of a's and b's that scans right until it sees a 'b'. If it never sees a 'b', then it will never halt. This means that it goes into an infinite loop (or hangs) anytime the input string does not contain a 'b'.");
    var url2 = "../../../../AV/VisFormalLang/TM/Machines/TMab.jff";
    var graph2 = av.ds.TM({width: 600, height: 325, url: url2});
    av.step();

    //frame 7
    graph2.hide();
    av.umsg("<i>Turing Acceptors and Turing Transducers</i> <br><br> Turing machines compute functions from strings to strings. Formally: Let f be a function from Σ<sup>∗</sup><sub>0</sub> to Σ<sup>∗</sup><sub>1</sub>. Turing machine M is said to compute f when, for any string w∈Σ<sup>∗</sup><sub>0</sub>, if $f(w)=u$ then <br><br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <i>(s,#<u>w</u>)⊢<sup>∗</sup><sub>M</sub> (h,#u<u>#</u>)</i> <br><br> for some state h ∈ F (that is, a Final State for M). <br>Such a function f is said to be a <b>Turing-computable function</b>. <br><br> Here is how we express multiple parameters: For <i>f (w<sub>1</sub>,...,w<sub>k</sub>) = u, <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <i>(s,# <u>w<sub>1</sub></u> # w<sub>2</sub> # . . .# w<sub>k</sub>)⊢<sup>∗</sup><sub>M</sub> (h,# u <u>#</u>)</i>. ");
    av.step();

    //frame 8
    av.umsg("One way to express functions on natural numbers is to represent a number using <i><b>unary notation</i></b>. (Remember, we are not concerned about what is efficient, we are concerned about what is possible.) In this case, we represent the value 0 as an empty string. <br><br> We say that <i>f:N→N<i> is computed by M if M computes $f′:{I}^∗→{I}^∗$ where <i>f′(I<sup> n</sup>)=I<sup> f(n)</sup></i> for each n ∈ N.");
    av.step();

    //frame 9
    av.umsg("<b>Example 9.2.4</b> <br><br> Compute f(n)=n+1 for any n∈N. <br><br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;----------------------<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <i> q &nbsp; &sigma; &nbsp; &delta;(q, &sigma;)</i> <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;---------------------- <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <i>q<sub>0</sub> &nbsp; I  &nbsp; (q<sub>0</sub>, I, R)</i> <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <i>q<sub>i</sub> &nbsp; # &nbsp; (h, I, R)</i> <br><br> An example computation: <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (q<sub>0</sub>, # <u>I</u> I #) ⊢<sub>M</sub> (q<sub>0</sub>, # I <u>I</u> #) ⊢<sub>M</sub> (q<sub>0</sub>, # I I <u>#</u>)⊢M(h, # I I I <u>#</u>)</i>.");
    av.step();

    //frame 10
    av.umsg("Here is the graph form for the machine and the intial state of the input tape and the head when beginning to process input string 'II'.");
    var url3 = "../../../../AV/VisFormalLang/TM/Machines/TMPlusone.jff";
    var tm = new av.ds.TM({width: 600, height: 200, left: 50, url: url3});
    var tape = av.ds.tape(["#", "I", "I", "#", "#"], 470, 50, "both");
    var rect = av.g.rect(350 + xStart, 150 + yStart, 110, 110);
    var c1 = av.label("q0", {left: 355 + xStart, top: 120 + yStart});
    var c2 = av.label("q1", {left: 355 + xStart, top: 155 + yStart});
    var c4 = av.label("q2", {left: 355 + xStart, top: 190 + yStart});
    var p3 = av.g.line(365 + xStart, 150 + yStart, 365 + xStart, 85 + yStart,
                        {"arrow-end": "classic-wide-long"});
    var p4 = av.g.line(420 + xStart, 215 + yStart, 390 + xStart, 185 + yStart,
                        {"arrow-end": "classic-wide-long"});
    var g = av.g.set(); // A set to hold the tape head graphical objects
    var node = tm.nodes();
    g.push(rect);
    g.push(c4);
    g.push(p3);
    g.push(p4);
    g.push(c1);
    g.push(c2);
    av.step();

    // frame 11
    av.umsg("Step 1: Initially, the tape head is scanning the leftmost non-blank tape cell, and the current state is q0");
    node[0].highlight();
    tape.highlightCurrent();
    av.step();

    // frame 12
    av.umsg("Step 2: The tape head shifts right one cell. The previous cell stays as 'I' and the current state remains in q0.");
    g.translateX(30);
    c1.translateX(30);
    c4.translateX(30);
    tape.moveRight();
    c2.translateX(30);
    av.step();

    // frame 13
    av.umsg("Step 3: The tape head shifts right one cell.  The previous cell stays as 'I' and the current state remains in q0.");
    g.translateX(30);
    c1.translateX(30);
    c4.translateX(30);
    tape.moveRight();
    c2.translateX(30);
    av.step();

    // framw 14
    av.umsg("Step 4: The tape head shifts right one cell.  The previous cell turns into a 'I' and the current state changes to q1.");
    g.translateX(30);
    c1.translateX(30);
    c4.translateX(30);
    tape.setValueAt(3, "I");
    tape.moveRight();
    var newLine = av.g.line(520 + xStart, 215 + yStart, 480 + xStart, 212 + yStart,
                            {"arrow-end": "classic-wide-long"});
    p4.hide();
    node[0].unhighlight();
    node[1].highlight();
    c2.translateX(30);
    av.step();

    // frame 15
    av.umsg("Step 6: The tape head stays on the current cell. The current state changes to q2. Since q2 is a member of the Final State set $F$, the machine immediately halts.");
    node[1].unhighlight();
    av.g.line(520 + xStart, 220 + yStart, 480 + xStart, 242 + yStart,
                {"arrow-end": "classic-wide-long"});
    newLine.hide();
    node[2].highlight();
    av.step();

    // frame 16

    av.recorded();
});
