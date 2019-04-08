document.write('<script src="../../../AV/Development/formal_language/fa/Automaton.js"></script>');
document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');


$(document).ready(function() {
"use strict";
var av_name = "NFA2DFAFrames";
var av = new JSAV(av_name);
//var injector = PIFRAMES.init(av_name);

  // Load the config object with interpreter and code created by odsaUtils.js
var config = ODSA.UTILS.loadConfig({av_name: av_name}),
    interpret = config.interpreter, // get the interpreter
    code = config.code;             // get the code object
var FA = new av.ds.fa({width: 350, height: 340,left: 10, top:0});
var DFA = new av.ds.fa({width: 350, height: 340, left: 400, top:0});
//var separator =  av.g.path(["M", 350, 0, "v", 500].join(","));
//separator.show();
// Slide 1
av.umsg("Consider the following NFA, we need to convert it to the equivalent DFA");
var q0 = FA.addNode({left: 10, top: 150});
var q1 = FA.addNode({left: 100, top: 50});
var q2 = FA.addNode({left: 100, top: 250});
var q3 = FA.addNode({left: 200, top: 150});
var q4 = FA.addNode({left: 200, top: 250});
var q5 = FA.addNode({left: 300, top: 50});
var q6 = FA.addNode({left: 300, top: 250});
FA.disableDragging();
toggleInitial(FA, q0);
toggleFinal(FA, q5);
toggleFinal(FA, q6);
FA.addEdge(q0, q1, {weight: lambda});
FA.addEdge(q0, q2, {weight: lambda});
FA.addEdge(q1, q3, {weight: "a"});
FA.addEdge(q3, q5, {weight: "b"});
FA.addEdge(q5, q1, {weight: lambda});
FA.addEdge(q2, q4, {weight: "a"});
FA.addEdge(q4, q4, {weight: "a"});
FA.addEdge(q4, q6, {weight: "b"});

av.displayInit();

  // Slide 2
  av.umsg("Let's begin with the start state. Closure($q_0$) in $M_N$ is {$q_0,q_1,q_2$}. So this is the start state.");
    q0.highlight();
    q1.highlight();
    q2.highlight();
    var dfaQ0 = DFA.newNode("{q0,q1,q2}",{left: 10, top: 150});
    toggleInitial(DFA, dfaQ0);
  av.step();
  // Slide 3
  av.umsg("Now, we should determine the the possible transitions from out new start state. To do so, we need to check the transitions from {$q_0,q_1,q_2$} with $a$ and $b$ ");
    q0.unhighlight();
    q1.unhighlight();
    q2.unhighlight();
    dfaQ0.highlight();
    var q3_q4 = DFA.newNode("{q3,q4}", {left:100, top: 50});
    DFA.addEdge(dfaQ0, q3_q4, {weight: "a"});
  av.step();

  // Slide 4
  av.umsg("For every new node we find, we need to determine the possible transitions with $a$ and $b$. Note that, as there is a $\\lambda$ transition from $q_5$ to $q_1$, we will mention $q_1$ whenever we use $q_5$");
    dfaQ0.unhighlight();
    q3_q4.highlight();
    var q1_q5_q6 = DFA.newNode("{q1,q5,q6}", {left:200, top: 50});
    var DFA_q4 = DFA.newNode("{q4}", {left:100, top: 250});
    DFA.addEdge(q3_q4, q1_q5_q6, {weight: "b"});
    DFA.addEdge(q3_q4, DFA_q4, {weight: "a"});
  av.step();
  // Slide 5
  av.umsg("Find transition for {$q_1,q_5, q_6$} with $a$ and $b$");
    q3_q4.unhighlight();
    q1_q5_q6.highlight();
    var DFA_q3 = DFA.newNode("{q3}", {left:300, top: 50});
    DFA.addEdge(q1_q5_q6, DFA_q3, {weight: "a"});

    av.step();
    // Slide 6
    av.umsg("Find transition for {q3} with $a$ and $b$");
    DFA_q3.highlight();
    q1_q5_q6.unhighlight();
    var q5_q1 = DFA.newNode("{q5, q1}", {left:300, top: 250});
    DFA.addEdge(DFA_q3, q5_q1, {weight: "b"});

    av.step();
    // Slide 7
    av.umsg("Find transition for {$q_4$} with $a$ and $b$");
    DFA_q3.unhighlight();
    DFA_q4.highlight();
    var DFA_q6 = DFA.newNode("{q6}", {left:200, top: 250});
    DFA.addEdge(DFA_q4, DFA_q6, {weight: "a"});

    av.step();
    // Slide 8
    av.umsg("Find transition for {$q_5, q_1$} with $a$ and $b$");
    DFA_q4.unhighlight();
    q5_q1.highlight();
    DFA.addEdge(q5_q1, DFA_q3, {weight: "a"});
    av.step();

    av.umsg("Finall, we need to determine the final states. Any state that include $q_5$ of $q_6$ will be final state.");
    toggleFinal(DFA, q1_q5_q6);
    toggleFinal(DFA, q5_q1);
    toggleFinal(DFA, DFA_q6);
    q1_q5_q6.highlight();
    q5_q1.highlight();
    DFA_q6.highlight();

    av.step();
    q1_q5_q6.unhighlight();
    q5_q1.unhighlight();
    DFA_q6.unhighlight();
    av.umsg("An optional step is to rename the DFA state labels.");
    dfaQ0.value("q0");
    q3_q4.value("q1");
    q1_q5_q6.value("q2");
    DFA_q4.value("q3");
    DFA_q3.value("q4");
    q5_q1.value("q5");
    DFA_q6.value("q6");
    DFA.layout();
  av.recorded();
});