/*global PIFRAMES */
// Initial draft by ??, Rewritten by Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "NFA2DFAlargeExFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  var NFA = new av.ds.FA({width: 350, height: 240,left: 10, top:0});
  var DFA = new av.ds.FA({width: 350, height: 300, left: 10, top:250});
  //var separator =  av.g.path(["M", 350, 0, "v", 500].join(","));
  //separator.show();

  var q0 = NFA.addNode({left: 10, top: 110});
  var q1 = NFA.addNode({left: 100, top: 10});
  var q2 = NFA.addNode({left: 100, top: 160});
  var q3 = NFA.addNode({left: 200, top: 110});
  var q4 = NFA.addNode({left: 200, top: 160});
  var q5 = NFA.addNode({left: 300, top: 10});
  var q6 = NFA.addNode({left: 300, top: 160});
  NFA.disableDragging();
  toggleInitial(NFA, q0);
  toggleFinal(NFA, q5);
  toggleFinal(NFA, q6);
  NFA.addEdge(q0, q1, {weight: lambda});
  NFA.addEdge(q0, q2, {weight: lambda});
  NFA.addEdge(q1, q3, {weight: "a"});
  NFA.addEdge(q3, q5, {weight: "b"});
  NFA.addEdge(q5, q1, {weight: lambda});
  NFA.addEdge(q2, q4, {weight: "a"});
  NFA.addEdge(q4, q4, {weight: "a"});
  NFA.addEdge(q4, q6, {weight: "b"});

  // Frame 1
  av.umsg("We will work through in detail the process of converting the NFA below to the equivalent DFA");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("start"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("starta"));
  var dfaQ0 = DFA.newNode("{q0,q1,q2}",{left: 10, top: 120});
  toggleInitial(DFA, dfaQ0);
  dfaQ0.highlight();
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("startb"));
  var q3_q4 = DFA.newNode("{q3,q4}", {left:100, top: 30});
  DFA.addEdge(dfaQ0, q3_q4, {weight: "a"});
  q3_q4.highlight();
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("q3q4a"));
  dfaQ0.unhighlight();
  av.step();

  // Frame 6
  var DFA_q4 = DFA.newNode("{q4}", {left:100, top: 160});
  DFA.addEdge(q3_q4, DFA_q4, {weight: "a"});
  DFA_q4.highlight();
  av.umsg(Frames.addQuestion("q3q4b"));
  av.step();

  // Frame 7
  var q1_q5_q6 = DFA.newNode("{q1,q5,q6}", {left:200, top: 30});
  DFA.addEdge(q3_q4, q1_q5_q6, {weight: "b"});
  av.umsg(Frames.addQuestion("q1q5q6a"));
  q3_q4.unhighlight();
  q1_q5_q6.highlight();
  av.step();
  
  // Frame 8
  var DFA_q3 = DFA.newNode("{q3}", {left:300, top: 30});
  DFA.addEdge(q1_q5_q6, DFA_q3, {weight: "a"});
  DFA_q3.highlight();
  av.umsg(Frames.addQuestion("q1q5q6b"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("q3a"));
  q1_q5_q6.unhighlight();
  av.step();
  
  // Frame 10
  av.umsg(Frames.addQuestion("q3b"));
  av.step();
  
  // Frame 11
  var q1_q5 = DFA.newNode("{q1, q5}", {left:330, top: 120});
  DFA.addEdge(DFA_q3, q1_q5, {weight: "b"});
  DFA_q3.unhighlight();
  q1_q5.highlight();
  av.umsg(Frames.addQuestion("q4a"));
  av.step();
  
  // Frame 12
  DFA.addEdge(DFA_q4, DFA_q4, {weight: "a"});
  av.umsg(Frames.addQuestion("q4b"));
  av.step();
  
  // Frame 13
  var DFA_q6 = DFA.newNode("{q6}", {left:200, top: 160});
  DFA.addEdge(DFA_q4, DFA_q6, {weight: "b"});
  DFA_q6.highlight();
  DFA_q4.unhighlight();
  av.umsg(Frames.addQuestion("q1q5a"));
  av.step();
  
  // Frame 14
  DFA.addEdge(q1_q5, DFA_q3, {weight: "a"});
  av.umsg(Frames.addQuestion("q1q5b"));
  av.step();
  
  // Frame 15
  DFA.addEdge(q1_q5, DFA_q3, {weight: "a"});
  q1_q5.unhighlight();
  av.umsg(Frames.addQuestion("q6a"));
  av.step();
  
  // Frame 16
  av.umsg(Frames.addQuestion("q6b"));
  av.step();

  // Frame 17
  av.umsg("Congratulations! We have now created all of the nodes and transitions needed by the DFA.");
  DFA_q6.unhighlight();
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("final"));
  av.step();
  
  // Frame 19
  toggleFinal(DFA, q1_q5_q6);
  toggleFinal(DFA, DFA_q6);
  toggleFinal(DFA, q1_q5);
  q1_q5_q6.highlight();
  q1_q5.highlight();
  DFA_q6.highlight();
  av.umsg("The highlighted nodes are the final states")
  av.step();
  
  // Frame 20
  q1_q5_q6.unhighlight();
  q1_q5.unhighlight();
  DFA_q6.unhighlight();
  av.umsg("An optional step is to rename the DFA state labels.");
  dfaQ0.value("q0");
  q3_q4.value("q1");
  q1_q5_q6.value("q2");
  DFA_q4.value("q3");
  DFA_q3.value("q4");
  q1_q5.value("q5");
  DFA_q6.value("q6");
  DFA.layout();
  av.step();
  
  // Frame 21
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
