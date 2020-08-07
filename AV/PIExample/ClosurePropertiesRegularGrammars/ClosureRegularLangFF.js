$(document).ready(function () {
  "use strict";
  var av_name = "ClosureRegularLangFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
    interpret = config.interpreter, // get the interpreter
    code = config.code;             // get the code object
  var FA = new av.ds.FA({width: 700, height: 300,left: 10, top:0});
  var DFA = new av.ds.FA({width: 700, height: 300,left: 10, top:0});
  var newFA = new av.ds.FA({width: 700, height: 300,left: 10, top:0});
      

  //frame 1
  av.umsg("Now let us study the Regular Properties for Regular Languages. We will start with the known closure properties for Regular Languages.");
  av.displayInit();

  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //frame 5
  av.umsg("Exactly. So, Regular Languages are closed under Union.");
  av.step();
  
  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame 8
  av.umsg("Exactly. So, Regular Languages are closed under Concatenation.");
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //frame 11
  av.umsg("Exactly. So, Regular Languages are closed under Star-closure.");
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();

  //frame 13
  av.umsg("Exactly. So, Regular Languages are closed under complementation.");
  av.step();


  //frame 6 sub
  av.umsg("Now, construct $M′=(Q′,\\sum′,\\delta′,p_0,F_0)$<br> $Q′=(Q×P)$<br> $\\delta$′:<br> $\\delta′((q_i,p_j),a)=(q_k,p_l)$ if <br> $\\delta_1((q_i,a)=qk)\\in M_1$ and $\\delta_2((p_j,a)=pl)\\in M_1$.<br> $F′=\\{(q_i,p_j)\\in Q′ | q_i \\in F_1 and p_j\\in F_2\\}$<br> $w\\in L(M′)\\Leftrightarrow w \\in L_1 \\cap L_2 \\rightarrow$ is closed under intersection");
  av.step();
 
  //frame 6
  av.umsg("In this example, we will create a DFA for the intersectino of two languages.")
  av.step();

  //frame 7
  av.umsg("We begin with DFAs for the languages $L_1 = a^*b$ and $L_2 = aa\\{a|b\\}^*$");
  var q0 = FA.addNode({left: 10, top: 70});
  var q1 = FA.addNode({left: 210, top: 70});
  var q2 = DFA.addNode({left: 410, top: 70});
  var q3 = DFA.addNode({left: 510, top: 70});
  var q4 = DFA.addNode({left: 610, top: 70});

  FA.disableDragging();
  DFA.disableDragging();
  toggleInitial(FA, q0);
  toggleInitial(DFA, q2);
  toggleFinal(FA,q1);
  toggleFinal(DFA,q4);

  FA.addEdge(q0,q0,{weight: "a"});
  FA.addEdge(q0, q1, {weight: "b"});

  DFA.addEdge(q2,q3,{weight: "a"});
  DFA.addEdge(q3, q4, {weight: "a"});
  DFA.addEdge(q4, q4, {weight: "a"});
  DFA.addEdge(q4, q4, {weight: "b"});
  av.step();

  //frame 8
  av.umsg("The DFA for the intersection of the two languages is shown at the bottom");
  var q5 = newFA.addNode({left: 210, top: 270});
  var q6 = newFA.addNode({left: 310, top: 270});
  var q7 = newFA.addNode({left: 410, top: 270});
  var q8 = newFA.addNode({left: 510, top: 270});

  newFA.disableDragging();
  toggleInitial(newFA, q5);
  toggleFinal(newFA,q8);
  newFA.addEdge(q5,q6,{weight: "a"});
  newFA.addEdge(q6, q7, {weight: "a"});
  newFA.addEdge(q7, q7, {weight: "a"});
  newFA.addEdge(q7, q8, {weight: "b"});





  av.recorded();
});
