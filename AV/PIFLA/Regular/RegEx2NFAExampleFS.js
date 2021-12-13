$(document).ready(function() {
  "use strict";
  var av_name = "RegEx2NFAExampleFS";
  var av = new JSAV(av_name);
  var frames = PIFRAMES.init(av_name);
  
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var fourthFA = new av.ds.FA({width: 900, height: 600, left: 10, top: -50});
  var fFA = new av.ds.FA({width: 900, height: 600, left: 10, top: 0});
  //var DFA = new av.ds.FA({width: 350, height: 300, left: 10, top:250});
  //var separator =  av.g.path(["M", 350, 0, "v", 500].join(","));
  //separator.show();
  
  // Frame 1
  av.umsg("From the previous section, we know how to convert one or two NFAs that represent RegExs into a single NFA that implements an associated RegEx operator. In this frameset, we show the process to convert a RegEx into an NFA.");
  av.displayInit();

  // Frame 2
  av.umsg("But before we follow the steps of converting the RegEx to a NFA, let us think about drawing the NFA directly.");
  av.step();

  // Frame 3
  av.umsg("A possible NFA for $ab^*\+\c$ will be:")
  var url1 = "../../../AV/VisFormalLang/Regular/Machines/ABStarOrC.jff";
  var nfa = new av.ds.FA({left: 0, top: -30, width: 300, url: url1});
  av.step();

  // Frame 4
  av.umsg(frames.addQuestion("nonminDFA"));
  var url2 = "../../../AV/VisFormalLang/Regular/Machines/ABStarOrCDFA.jff";
  var dfa = new av.ds.FA({left: 250, top: 20, width: 300, height: 350, url: url2});
  av.step();

  // Frame 5
  av.umsg(frames.addQuestion("group"));
  av.step();

  // Frame 6
  av.umsg("Correct, the minimized DFA will be the one shown at the bottom.");
  var url3 = "../../../AV/VisFormalLang/Regular/Machines/ABStarOrCMinDFA.jff";
  var minDfa = new av.ds.FA({left: 0, top: 170, url: url3});
  av.step();

  // Frame 7
  av.umsg("Finding the NFA for a RegEx is not trivial for complicated RegEXs. So it might be hard to look at the RegEx and immediately draw the NFA. And then we won't have a DFA, or a minimized DFA. All of this is a bit tedious, even if we are experts at all of the steps. That is why we have tools like OpenFLAP that apply RegEx to NFA to DFA to DFA minimization algorithms to give the NFA or DFA for any RegEx.");
  nfa.hide();
  dfa.hide();
  minDfa.hide();
  av.step();

  //Frame 8
  av.umsg("When OpenFLAP automatically converts a RegEx to a NFA, the resulting NFA does not typically look like the 'intuitive' version. This is because the automated process is a little more complicated.");
  av.step();

  // Frame 9
  av.umsg("To understand how an algorithm can automatically convert a RegEx to a NFA, a lot of the steps are simply building the machine with the transformations for each operator as shown in the previous section. This means doing things like combining two machines to OR them or to AND them.")
  av.step();

  //Frame 10
  av.umsg("To help us with the conversion process, we will use the concept of a Generalized Transition Graph. $\\textbf{Definition}$: A Generalized Transition Graph (GTG) is a transition graph whose edges can be labeled with any regular expression. Thus, it 'generalizes' the standard transition graph.");
  var fourthFA = new av.ds.FA({width: 900, height: 600,left: 10, top:0});
  var factor = 0.6;
  var q11 = fourthFA.addNode({left: 10, top: 100});
  var q12 = fourthFA.addNode({left: 310*factor, top: 100});
  toggleInitial(fourthFA, q11);
  toggleFinal(fourthFA, q12);
  fourthFA.addEdge(q11,q12, {weight: "$ab^* + c$"});
  av.step();

  //Frame 11
  av.umsg("We will convert the this GTG to an NFA");
  av.step();

  //Frame 12
  av.umsg(frames.addQuestion("breakdown"));
  av.step();

  //Frame 13
  av.umsg(frames.addQuestion("deor"));
  av.step();

  //Frame 14
  av.umsg(frames.addQuestion("nextop"));
  var q17 = fourthFA.addNode({left: 810*factor, top: 480});
  var q13 = fourthFA.addNode({left: 310*factor, top: 100});
  var q14 = fourthFA.addNode({left: 610*factor, top: 100});
  var q15 = fourthFA.addNode({left: 310*factor, top: 360});
  var q16 = fourthFA.addNode({left: 610*factor, top: 360});
  fourthFA.removeNode(q12);
  toggleFinal(fourthFA,q17);
  fourthFA.addEdge(q11,q15, {weight: "$\\lambda$"});//q4
  fourthFA.addEdge(q11,q13, {weight: "$\\lambda$"});//q2
  fourthFA.addEdge(q13,q14, {weight: "$ab^*$"});//q3
  fourthFA.addEdge(q15,q16, {weight: "c"});
  fourthFA.addEdge(q16,q17, {weight: "$\\lambda$"});
  fourthFA.addEdge(q14,q17, {weight: "$\\lambda$"});
  av.step();

  // Frame 15
  av.umsg(frames.addQuestion("deconcat"));
  av.step();

  // Frame 16
  av.umsg(frames.addQuestion("pickclose"));
  fourthFA.removeEdge(q13,q14, {weight: "$ab^*$"});
  var q18 = fourthFA.addNode({left: 430*factor, top: 100});
  var q19 = fourthFA.addNode({left: 550*factor, top: 100});
  var q20 = fourthFA.addNode({left: 230*factor, top: 260});
  var q21 = fourthFA.addNode({left: 550*factor, top: 260});
  fourthFA.addEdge(q13,q18, {weight: "$\\lambda$"});
  fourthFA.addEdge(q18,q19, {weight: "a"});
  fourthFA.addEdge(q19,q20, {weight: "$\\lambda$"});
  fourthFA.addEdge(q20,q21, {weight: "$b^*$"});
  fourthFA.addEdge(q21,q14, {weight: "$\\lambda$"});
  av.step();

  // Frame 17
  av.umsg(frames.addQuestion("destar"));
  av.step();

  //Frame 18
  av.umsg(frames.addQuestion("done"));
  var q22 = fourthFA.addNode({left: 350*factor, top: 260});
  var q23 = fourthFA.addNode({left: 450*factor, top: 260});
  fourthFA.removeEdge(q20,q21, {weight: "$b^*$"});
  fourthFA.addEdge(q20, q22, {weight: "$\\lambda$"});
  fourthFA.addEdge(q22, q23, {weight: "b"});
  fourthFA.addEdge(q23, q21, {weight: "$\\lambda$"});
  fourthFA.addEdge(q20,q21, {weight: "$\\lambda$"});
  fourthFA.addEdge(q21,q20, {weight: "$\\lambda$"});
  av.step();

  // Frame 19
  av.umsg("Fortunately, we don't have to do anything for the part of this graph that represents the RegEx for $c$. It is nothing more than what we have: A transition from q4 to q5 on the symbol $c$.");
  av.step();
  
  // Frame 20
  av.umsg("The automation is complete. Here it is, redrawn.");
  fourthFA.removeNode(q11);
  fourthFA.removeNode(q12);
  fourthFA.removeNode(q13);
  fourthFA.removeNode(q14);
  fourthFA.removeNode(q15);
  fourthFA.removeNode(q16);
  fourthFA.removeNode(q17);
  fourthFA.removeNode(q18);
  fourthFA.removeNode(q19);
  fourthFA.removeNode(q20);
  fourthFA.removeNode(q21);
  fourthFA.removeNode(q22);
  fourthFA.removeNode(q23);

  var q24 = fFA.addNode({left: 600*factor, top: 400});//0
  var q25 = fFA.addNode({left: 630*factor, top: 50});//1
  var q26 = fFA.addNode({left: 400*factor, top: 400});//2
  var q27 = fFA.addNode({left: 480*factor, top: 50});//3
  var q28 = fFA.addNode({left: 750*factor, top: 250});//4
  var q29 = fFA.addNode({left: 750*factor, top: 130});//5
  var q30 = fFA.addNode({left: 250*factor, top: 350});//6
  var q31 = fFA.addNode({left: 150*factor, top: 300});//7
  var q32 = fFA.addNode({left: 180*factor, top: 100});//8
  var q33 = fFA.addNode({left: 300*factor, top: 50});//9
  var q34 = fFA.addNode({left: 50*factor, top: 0});//10
  var q35 = fFA.addNode({left: 180*factor, top: 0});//11
  
  toggleInitial(fFA, q24);
  toggleFinal(fFA, q25);

  fFA.addEdge(q24, q28, {weight: "$\\lambda$"});//q0-q4
  fFA.addEdge(q24, q26, {weight: "$\\lambda$"});//q0-q2
  fFA.addEdge(q28, q29, {weight: "c"});//q4-q5
  fFA.addEdge(q29, q25, {weight: "$\\lambda$"});//q5-q1
  fFA.addEdge(q26, q30, {weight: "$\\lambda$"});//q2-q6
  fFA.addEdge(q30, q31, {weight: "a"});//q6-q7
  fFA.addEdge(q31, q32, {weight: "$\\lambda$"});//q7-q8
  fFA.addEdge(q32, q33, {weight: "$\\lambda$"});//q8-q9
  fFA.addEdge(q33, q32, {weight: "$\\lambda$"});//q9-q8
  fFA.addEdge(q33, q27, {weight: "$\\lambda$"});//q9-q3
  fFA.addEdge(q27, q25, {weight: "$\\lambda$"});//q3-q1
  fFA.addEdge(q32, q34, {weight: "$\\lambda$"});//q8-q10
  fFA.addEdge(q34, q35, {weight: "b"});//q10-11
  fFA.addEdge(q35, q33, {weight: "$\\lambda$"});//q11-9
  av.step();

  // Frame 21
  av.umsg("One thing that this example should make clear is that the concept of an NFA is really helpful for our understanding. While every NFA can be replaced by an equivalent DFA, it is a lot easier to understand instuitively the process of converting a RegEx to an NFA than it would be if we had come up with the DFA directly.");
  fFA.removeNode(q24);
  fFA.removeNode(q25);
  fFA.removeNode(q26);
  fFA.removeNode(q27);
  fFA.removeNode(q28);
  fFA.removeNode(q29);
  fFA.removeNode(q30);
  fFA.removeNode(q31);
  fFA.removeNode(q32);
  fFA.removeNode(q33);
  fFA.removeNode(q34);
  fFA.removeNode(q35);
  av.step();

  // Frame 22
  av.umsg("Let us answer the following question. What should we do if we been told to convert a RegEx to a DFA?");
  av.step();

  // Frame 23
  av.umsg("You have a choice. If you know how to draw the DFA directly, then go and draw it without following the lengthy process. If you do not know how to find the DFA inutively, then follow the algorithm to convert the RegEx to the DFA. Better yet, get OpenFLAP to do it for you.");
  av.step();

  // Frame 24
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
