$(document).ready(function() {
  "use strict";
  var av_name = "RegularGrammarFF";
  var av = new JSAV(av_name);
  
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object

  //frame 1
  av.umsg("In this module we will learn about Regular Grammars")
  av.displayInit();
  av.umsg(Frames.addQuestion("q1"));
  av.step();
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
  av.umsg(Frames.addQuestion("q5"));
  av.step();
  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();
  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();
  //frame 8
  av.umsg("Suppose we have the following Grammar $G$ = $(V,T,S,P)$ where, <br> $V$ =  variables(nonterminals) = $A, B, \\ldots Z$ <br>$T$ = $terminals$ = $a,b,\\ldots ,z,0,1,\\ldots 9$ <br>$P$ = productions(rules)<br>$S$ = $start \\ symbol$ <br> $V,T$ and $P$ are finite sets")
  av.step();
  //frame 9
  av.umsg("In this module, we will see what makes a grammar regular.");
  av.step();
  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();
  //frame 11
  av.umsg("$Linear \\ grammar$: A grammar that is linear if has a single variable in the RHS of every production rule. <br> $All \\ productions \\ are \\ of \\ the \\ form$ <br> $A$ $\\rightarrow$ $xB$ <br> $A \\ \\rightarrow Cx$ <br> $A \\ \\rightarrow x$ <br> $where \\ A,B,C \\in V, \\ x \\in \\ T^*$ <br> In this grammar, each production rule has at most one variable on the RHS");
  av.step();
  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();
  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //frame 17
  av.umsg(Frames.addQuestion("q17"));
  av.step();

  //frame 18
  av.umsg("We now have covered<br> Definition: DFA represents regular language <br> Theorem: NFA $\\Longleftrightarrow$ DFA<br> Theorem: RE $\\Longleftrightarrow$ NFA .<br> The next step will be Theorem: DFA $\\Longleftrightarrow$ Regular Grammar");


  av.recorded();
});