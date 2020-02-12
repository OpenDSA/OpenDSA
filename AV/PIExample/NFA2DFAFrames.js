$(document).ready(function() {
"use strict";
var av_name = "NFA2DFAFrames";
var av = new JSAV(av_name);
var Frames = PIFRAMES.init(av_name);

// Load the config object with interpreter and code created by odsaUtils.js
var config = ODSA.UTILS.loadConfig({av_name: av_name}),
    interpret = config.interpreter, // get the interpreter
    code = config.code;             // get the code object
var FA = new av.ds.FA({width: 350, height: 240,left: 10, top:0});
var DFA = new av.ds.FA({width: 350, height: 300, left: 10, top:250});
//var separator =  av.g.path(["M", 350, 0, "v", 500].join(","));
//separator.show();

// Slide 1
av.umsg("Consider the following NFA, we need to convert it to the equivalent DFA");
var q0 = FA.addNode({left: 10, top: 110});
var q1 = FA.addNode({left: 100, top: 10});
var q2 = FA.addNode({left: 100, top: 210});
var q3 = FA.addNode({left: 200, top: 110});
var q4 = FA.addNode({left: 200, top: 210});
var q5 = FA.addNode({left: 300, top: 10});
var q6 = FA.addNode({left: 300, top: 210});
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
  //av.umsg("Let's begin with the start state. Closure($q0$) in $M_N$ is $\\{q0,q1,q2\\}$. So this is the start state.");
  av.umsg(Frames.addQuestion("qa"));
    q0.highlight();
    q1.highlight();
    q2.highlight();
    var dfaQ0 = DFA.newNode("{q0,q1,q2}",{left: 10, top: 130});
    toggleInitial(DFA, dfaQ0);
  av.step();

  // Slide 3
  av.umsg(Frames.addQuestion("qb"));
    q0.unhighlight();
    q1.unhighlight();
    q2.unhighlight();
    dfaQ0.highlight();
    var q3_q4 = DFA.newNode("{q3,q4}", {left:100, top: 30});
    DFA.addEdge(dfaQ0, q3_q4, {weight: "a"});
  av.step();

  // Slide 4
  av.umsg(Frames.addQuestion("qc"));
    dfaQ0.unhighlight();
  av.step();

  // Slide 5
  q3_q4.highlight();
  av.umsg(Frames.addQuestion("q0"));
  av.step();

  // Slide 6
  var DFA_q4 = DFA.newNode("{q4}", {left:100, top: 230});
  DFA.addEdge(q3_q4, DFA_q4, {weight: "a"});
  av.umsg(Frames.addQuestion("q1"));
  av.step();

  // Slide 7
  var q1_q5_q6 = DFA.newNode("{q1,q5,q6}", {left:200, top: 30});
    //var DFA_q4 = DFA.newNode("{q4}", {left:100, top: 250});
  DFA.addEdge(q3_q4, q1_q5_q6, {weight: "b"});
    //DFA.addEdge(q3_q4, DFA_q4, {weight: "a"});
    //av.step();
    //DFA.hide();
    //av.umsg(Frames.addQuestion("q1"));
    //av.step();
    //DFA.show();
    //av.umsg("Correct.");
    
  //av.umsg("Find transition for {$q1,q5, q6$} with $b$");
  q3_q4.unhighlight();
  q1_q5_q6.highlight();
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  // Slide 8
  var DFA_q3 = DFA.newNode("{q3}", {left:300, top: 30});
  DFA.addEdge(q1_q5_q6, DFA_q3, {weight: "a"});
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  // Slide 9
    //av.umsg("Find transition for {q3} with $a$ and $b$");
  DFA_q3.highlight();
  q1_q5_q6.unhighlight();
  av.umsg(Frames.addQuestion("q4"));
  av.step();
  
  // Slide 10
  av.umsg(Frames.addQuestion("q5"));
  av.step();
    
  // Slide 11
  var q5_q1 = DFA.newNode("{q5, q1}", {left:300, top: 230});
  DFA.addEdge(DFA_q3, q5_q1, {weight: "b"});
    //DFA.hide();
    //av.umsg(Frames.addQuestion("q2"));
    //av.step();
    //DFA.show();
    //av.umsg("Find transition for {q4} with $a$ and $b$");
  DFA_q3.unhighlight();
  DFA_q4.highlight();
  av.umsg(Frames.addQuestion("q6"));
  av.step();
    
  // Slide 12
  var DFA_q6 = DFA.newNode("{q6}", {left:200, top: 230});
  DFA.addEdge(DFA_q4, DFA_q6, {weight: "a"});
  av.umsg(Frames.addQuestion("q7"));
  av.step();
  
  // Slide 13
    //av.umsg("Find transition for {q5, q1} with $a$ and $b$");
  DFA_q4.unhighlight();
  q5_q1.highlight();
  av.umsg(Frames.addQuestion("q8"));
  av.step();
    
  // Slide 14
  DFA.addEdge(q5_q1, DFA_q3, {weight: "a"});
  av.umsg(Frames.addQuestion("q9"));
  av.step();
    
  // Slide 15
  DFA_q6.highlight();
  q5_q1.unhighlight();
  av.umsg(Frames.addQuestion("q10"));
  av.step();
    
  // Slide 16
  av.umsg(Frames.addQuestion("q11"));
  av.step();
    
  // Slide 17
  DFA_q6.unhighlight();
  av.umsg("Finall, we need to determine the final states. Go forward to determine the final state");
  av.step();
    
  // Slide 18
  av.umsg(Frames.addQuestion("q13"));
  av.step();

  // Slide 19
  av.umsg("The highlighted nodes are the state")
  toggleFinal(DFA, q1_q5_q6);
  //toggleFinal(DFA, q5_q1);
  toggleFinal(DFA, DFA_q6);
  q1_q5_q6.highlight();
  //q5_q1.highlight();
  DFA_q6.highlight();
  //av.step();
    
  // Slide 20
  //DFA.hide();
  toggleFinal(DFA, q5_q1);
  q5_q1.highlight();
  av.step();
    
  // Slide 21
  //DFA.show();
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
  av.step();
  //DFA.hide();
  //av.umsg(Frames.addQuestion("q4"));
  
  av.recorded();
});