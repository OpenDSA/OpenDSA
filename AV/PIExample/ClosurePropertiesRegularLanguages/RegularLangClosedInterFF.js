$(document).ready(function () {
  "use strict";
  var av_name = "RegularLangClosedInterFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;

  //frame 1
  av.umsg("In this module, we will present an algorithm to find the interse intersection and difference operators.");
  av.displayInit();

  //frame 2
  av.umsg("Consider regular languages $L_1$ and $L_2$. Since $L_1$ and $L_2$ are regular language, we know that there exist NFAs $N_1$ and $N_2$ such that $L_1=L(N_1)$ and $L_2=L(N_2)$.");
  av.step();

  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();
  
  //frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  av.step();

  //frame 9
  av.umsg("Let us see an example to create an NFA for the intersectino of two languages $L_1 = a^*b$ and $L_2 = aa\\{a|b\\}^*$")
  av.step();

  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  var FA = new av.ds.FA({width: 200, height: 150,left: 10, top:0});
  var DFA = new av.ds.FA({width: 200, height: 150,left: 10, top:150});
  var newFA = new av.ds.FA({width: 400, height: 300,left: 10, top:300});
  var q0 = FA.addNode({left: 10, top: 50});
  q0.value("1");
  var q1 = FA.addNode({left: 100, top: 50});
  q1.value("2");
  toggleInitial(FA, q0);
  toggleFinal(FA,q1);
  FA.addEdge(q0,q0,{weight: "a"});
  FA.addEdge(q0, q1, {weight: "b"});
  av.step();

  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  var A = DFA.addNode({left: 10, top: 50});
  var B = DFA.addNode({left: 700, top: 50});
  var C = DFA.addNode({left: 140, top: 50});
  A.value("A");
  B.value("B");
  C.value("C");
  toggleInitial(DFA, A);
  toggleFinal(DFA,C);
  DFA.addEdge(A,B,{weight: "a"});
  DFA.addEdge(B, C, {weight: "a"});
  DFA.addEdge(C, C, {weight: "a"});
  DFA.addEdge(C, C, {weight: "b"});
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();

  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  var A1 = newFA.addNode({left: 20, top: 20});
  var B1 = newFA.addNode({left: 110, top: 20});
  var C1 = newFA.addNode({left: 210, top: 20});
  var A2 = newFA.addNode({left: 20, top: 100});
  var B2 = newFA.addNode({left: 110, top: 100});
  var C2 = newFA.addNode({left: 210, top: 100});
  A1.value("(1,A)");
  B1.value("(1,B)");
  C1.value("(1,C)");
  A2.value("(2,A)");
  B2.value("(2,B)");
  C2.value("(2,C)");
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  toggleInitial(newFA, A1);
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  toggleFinal(newFA,C2);
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  newFA.addEdge(A1,B1,{weight: "a"});
  av.step();

  //frame 17
  av.umsg(Frames.addQuestion("q17"));
  av.step();

  //frame 18
  av.umsg(Frames.addQuestion("q18"));
  av.step();

  //frame 19
  av.umsg(Frames.addQuestion("q19"));
  av.step();

  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();

  //frame 21
  av.umsg(Frames.addQuestion("q21"));
  av.step();

  //frame 22
  av.umsg(Frames.addQuestion("q22"));
  newFA.addEdge(B1, C1, {weight: "a"});
  av.step();

  //frame 23
  av.umsg(Frames.addQuestion("q23"));
  av.step();

  //frame 24
  av.umsg(Frames.addQuestion("q24"));
  newFA.addEdge(C1, C1, {weight: "a"});
  av.step();

  //frame 25
  av.umsg(Frames.addQuestion("q25"));
  newFA.addEdge(C1, C2, {weight: "b"});
  av.step();

  //frame 26
  av.umsg(Frames.addQuestion("q26"));
  av.step();

  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  av.step();

  //frame 28
  newFA.removeNode(A2);
  newFA.removeNode(B2);
  newFA.layout();
  av.umsg("The resulting NFA is the $M_{intersection}$");
  av.step();

  //frame 29
  av.umsg("So, whenever you have a question that ask to build an NFA for a Language the aceepts the intersection of 2 languages. You can use the same steps to build the NFA.")
  av.recorded();
  
 
  
  

  
  
  /*//frame 3
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
*/
});
