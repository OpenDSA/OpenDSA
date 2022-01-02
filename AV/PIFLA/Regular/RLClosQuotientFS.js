$(document).ready(function () {
  "use strict";
  var av_name = "RLClosQuotientFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("The right quotient of $L_1$ with $L_2$ (written $L_1\\backslash L_2$) is the set of all strings $x$ where you can pick some element $y$ from $L_2$ and append it to $x$ to get something from $L_1$.<br/><br/>That is, $x$ is in the quotient set if there is $y$ in $L_2$ for which $xy$ is in $L_1$");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("ex1"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("ex1b"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("ex2"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("ex2b"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("ex3"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("ex4"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("lambda"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("complexex"));
  av.step();

  // Frame 10
  av.umsg("OK, now we hope that you have a good understanding of how right quotient works. So now we are ready to tackle what we are here for.<br/><br/>Theorem: If $L_1$ and $L_2$ are regular, then $L_1 \\backslash L_2$ is regular.");
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("different"));
  av.step();

  // Frame 12
  av.umsg("We want to construct $M'$ using the following idea: For each state $q_i$, if there is a walk labeled with strings $\\in L_2$ to a final state in $M$, we mark $q_i$ as final state.");
  av.step();

  // Frame 13
  av.umsg("Let us see an example. Suppose the following DFA for $L_1 = \\{a^nb^m \\mid n\\ge 1,\\ m \\ge 0\\} \\cup \\{ba\\}$. We need to find the DFA for $L_1 \\backslash L_2$ where $L_2 = \\{b^m\\ |\\ m \\ge 1 \\}$. Note that in this machine, $q4$ is the trap state, and does not strictly need to be shown (nor will it help the algorithm).");
  var DFA1 = new av.ds.FA({left: 50, height: 500, url: "../../../AV/OpenFLAP/machines/Regular/RightQuotient1.jff"});
  var q0 = DFA1.getNodeWithValue("q0");
  var q1 = DFA1.getNodeWithValue("q1");
  var q2 = DFA1.getNodeWithValue("q2");
  var q3 = DFA1.getNodeWithValue("q3");
  var q4 = DFA1.getNodeWithValue("q4");
  var q5 = DFA1.getNodeWithValue("q5");
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("q0"));
  q0.highlight();
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("q0final"));
  av.step();

  // Frame 16
  q0.unhighlight();
  av.umsg(Frames.addQuestion("q1"));
  q1.highlight();
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("q1final"));
  av.step();

  // Frame 18
  q1.unhighlight();
  av.umsg(Frames.addQuestion("q2"));
  q2.highlight();
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("q2final"));
  av.step();

  // Frame 20
  q2.unhighlight();
  av.umsg(Frames.addQuestion("q3"));
  q3.highlight();
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("q3final"));
  av.step();

  // Frame 22
  q3.unhighlight();
  av.umsg(Frames.addQuestion("q4"));
  q4.highlight();
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("q4final"));
  av.step();

  // Frame 24
  q4.unhighlight();
  av.umsg(Frames.addQuestion("q5"));
  q5.highlight();
  av.step();

  // Frame 25
  av.umsg(Frames.addQuestion("q5final"));
  av.step();

  // Frame 26
  q5.highlight();
  toggleFinal(DFA1, q5);
  av.umsg("The resulting DFA (after we update the final state set as determined by the algorithm) is $M' = L_1 \\backslash L_2$");
  av.step();

  // Frame 27
  av.umsg("A full statement of the algorithm is:<br/>For each state $i$ do<br/>$\\ \\ \\ \\ $Make $i$ the start state that represents $L_i'$<br/>$\\ \\ \\ \\ $if $L_i' \\cap L_2 \\ne \\emptyset$ then<br/>$\\ \\ \\ \\ \\ \\ \\ \\ $put $i$ in $F'$ of $M'$<br/>where $M'$ is the DFA for $L_1 \\backslash L_2$")
  DFA1.hide();
  av.step();

  // Frame 28
  av.umsg(Frames.addQuestion("lastex"));
  av.step();

  // Frame 29
  av.umsg("Here is the DFA for $L_1 = \\{a^*baa^*\\}$.")
  var DFA2 = new av.ds.FA({left: 50, top:50, height: 500, url: "../../../AV/OpenFLAP/machines/Regular/RightQuotient2.jff"});
  var q00 = DFA2.getNodeWithValue("q0");
  var q11 = DFA2.getNodeWithValue("q1");
  var q22 = DFA2.getNodeWithValue("q2");
  var q33 = DFA2.getNodeWithValue("q3");
  av.step();

  // Frame 30
  q00.highlight();
  av.umsg(Frames.addQuestion("q0again"));
  av.step();

  // Frame 31
  q00.unhighlight();
  q11.highlight();
  av.umsg(Frames.addQuestion("q1again"));
  av.step();

  // Frame 32
  q11.unhighlight();
  q22.highlight();
  toggleFinal(DFA2, q11);
  av.umsg(Frames.addQuestion("q2again"));
  av.step();

  // Frame 33
  q22.unhighlight();
  q33.highlight();
  av.umsg(Frames.addQuestion("q3again"));
  av.step();

  // Frame 34
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});  
