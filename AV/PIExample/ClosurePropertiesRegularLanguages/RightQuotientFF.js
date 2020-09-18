$(document).ready(function () {
  "use strict";
  var av_name = "RightQuotientFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;

  //frame 1
  av.umsg("The right quotient of $L_1$ with $L_2$ is the set of all strings $x$ where you can pick some element $y$ from $L_2$ and append it to $x$ to get something from $L_1$.");
  av.displayInit();
  
  //frame 2
  av.umsg("That is, $x$ is in the quotient if there is $y$ in $L_2$ for which $xy$ is in $L_1$");
  av.step();

  //frame 3
  av.umsg("The quotient of $L_1$ by $L_2$ is dentoed by $L_1/L_2$.")
  av.step();

  //frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //frame 6
  av.umsg("Exactly, car is the only string for which you can append something from $L_2$ to get something from $L_1$");
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();

  //frame 13
  av.umsg("Theorem: If $L_1$ and $L_2$ are regular, then $L_1 \\backslash L_2$ is regular.");
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  //frame 15
  av.umsg("The algorithm is: for each state $q_i$, if there is a walk labeled with strings $\\in L_2$ to a final state in $M$, we mark $q_i$ as final state.");
  av.step();

  //frame 16
  av.umsg("Let us see an example. Suppose the following DFA for $L_1 = \\{a^nb^m \\mid n\\ge 1,\\ m \\ge 0\\} \\cup \\{ba\\}$. We need to find the DFA for $L_1 \\backslash L_2$ where $L_2 = \\{b^m\\ |\\ m \\ge 1 \\}$.");
  var DFA1 = new av.ds.FA({left: 50, height: 500, url: "../../../AV/PIExample/ClosurePropertiesRegularLanguages/machines/RightQuotient1.jff"});
  var q0 = DFA1.getNodeWithValue("q0");
  var q1 = DFA1.getNodeWithValue("q1");
  var q2 = DFA1.getNodeWithValue("q2");
  var q3 = DFA1.getNodeWithValue("q3");
  var q4 = DFA1.getNodeWithValue("q4");
  var q5 = DFA1.getNodeWithValue("q5");
  av.step();

  //frame 17
  av.umsg(Frames.addQuestion("q17"));
  q0.highlight();
  av.step();

  //frame 18
  av.umsg(Frames.addQuestion("q18"));
  av.step();

  //frame 19
  q0.unhighlight();
  av.umsg(Frames.addQuestion("q19"));
  q1.highlight();
  av.step();

  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();

  //frame 21
  q1.unhighlight();
  av.umsg(Frames.addQuestion("q21"));
  q2.highlight();
  av.step();

  //frame 22
  av.umsg(Frames.addQuestion("q22"));
  av.step();

  //frame 23
  q2.unhighlight();
  av.umsg(Frames.addQuestion("q23"));
  q3.highlight();
  av.step();

  //frame 24
  av.umsg(Frames.addQuestion("q24"));
  av.step();

  //frame 25
  q3.unhighlight();
  av.umsg(Frames.addQuestion("q25"));
  q4.highlight();
  av.step();

  //frame 26
  av.umsg(Frames.addQuestion("q26"));
  av.step();

  //frame 27
  q4.unhighlight();
  av.umsg(Frames.addQuestion("q27"));
  q5.highlight();
  av.step();

  //frame 28
  av.umsg(Frames.addQuestion("q28"));
  av.step();

  //frame 29
  q5.highlight();
  toggleFinal(DFA1, q5);
  av.umsg("The resulting DFA is the DFA for $L_1 \\backslash L_2$");
  av.step();

  //frame 30
  av.umsg("The formal proof is:<br/>For each state $i$ do<br/>$\\ \\ \\ \\ $Make $i$ the start state that represent $L_i\\prime$<br/>$\\ \\ \\ \\ $if $L_i\\prime \\cap L_2 \\ne \\emptyset$ then<br/>$\\ \\ \\ \\ \\ \\ \\ \\ $put $i$ in $F\\prime$ in $M\\prime$<br/>where $M\\prime$ is the DFA for $L_1 \\backslash L_2$")
  DFA1.hide();
  av.step();

  //frame 31
  av.umsg(Frames.addQuestion("q31"));
  av.step();

  //frame 32
  av.umsg("Exactly. Here is the DFA for $L_1$")
  var DFA2 = new av.ds.FA({left: 50, top:50, height: 500, url: "../../../AV/PIExample/ClosurePropertiesRegularLanguages/machines/RightQuotient2.jff"});
  var q00 = DFA2.getNodeWithValue("q0");
  var q11 = DFA2.getNodeWithValue("q1");
  var q22 = DFA2.getNodeWithValue("q2");
  var q33 = DFA2.getNodeWithValue("q3");
  av.step();

  //frame 33
  q00.highlight();
  av.umsg(Frames.addQuestion("q33"));
  av.step();

  //frame 34
  q00.unhighlight();
  q11.highlight();
  av.umsg(Frames.addQuestion("q34"));
  av.step();

  //frame 35
  q11.unhighlight();
  q22.highlight();
  toggleFinal(DFA2, q11);
  av.umsg(Frames.addQuestion("q35"));
  av.step();

  //frame 36
  q22.unhighlight();
  q33.highlight();
  av.umsg(Frames.addQuestion("q36"));
  av.step();

  //frame 37
  av.step("Completed.");
  av.recorded();
});  