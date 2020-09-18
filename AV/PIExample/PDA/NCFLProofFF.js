$(document).ready(function() {
  "use strict";
  var av_name = "NCFLProofFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
    interpret = config.interpreter,
    code = config.code;
  var goNext = false;
  //Frame 1
  av.umsg("Proof that the language $L = \\{a^nb^n: n \\ge 1\\} \\cup \\{a^nb^{2n}: n \\ge 1\\}$ is not deterministic PDA.");
  av.displayInit();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //Frame 4
  av.umsg("These two can be joined together by a new start state and λ-transitions to create a NPDA for $L$. Thus, $L$ is CFL.");
  av.step();

  //Frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //Frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //Frame 7
  av.umsg("Construct a PDA $M\\prime$ as follows:");
  av.step();

  //Frame 8
  av.umsg("Construct a PDA $M\\prime$ as follows:<br/>1. Create two copies of $M$: $M_1$ and $M_2$. The same state in $M_1$ and $M_2$ are called $\\textbf{cousins}$.");
  av.step();

  //Frame 9
  av.umsg("Construct a PDA $M\\prime$ as follows:<br/>1. Create two copies of $M$: $M_1$ and $M_2$. The same state in $M_1$ and $M_2$ are called $\\textbf{cousins}$.<br/>2. Remove accept status from accept states in $M_1$, remove initial status from initial state in $M_2$. In our new PDA, we will start in $M_1$ and accept in $M_2$.");
  av.step();

  //Frame 10
  av.umsg("Construct a PDA $M\\prime$ as follows:<br/>1. Create two copies of $M$: $M_1$ and $M_2$. The same state in $M_1$ and $M_2$ are called $\\textbf{cousins}$.<br/>2. Remove accept status from accept states in $M_1$, remove initial status from initial state in $M_2$. In our new PDA, we will start in $M_1$ and accept in $M_2$.<br/>3. Outgoing arcs from old accept states in $M_1$, change to end up in the cousin of its destination in $M_2$. This joins $M_1$ and $M_2$ into one PDA. There must be an outgoing arc since you must recognize both $a^nb^n$ and $a^nb^{2n}$. After reading $n$ $b$’s, must accept if no more $b$’s and continue if there are more $b$’s.");
  av.step();

  //Frame 11
  av.umsg("Construct a PDA $M\\prime$ as follows:<br/>1. Create two copies of $M$: $M_1$ and $M_2$. The same state in $M_1$ and $M_2$ are called $\\textbf{cousins}$.<br/>2. Remove accept status from accept states in $M_1$, remove initial status from initial state in $M_2$. In our new PDA, we will start in $M_1$ and accept in $M_2$.<br/>3. Outgoing arcs from old accept states in $M_1$, change to end up in the cousin of its destination in $M_2$. This joins $M_1$ and $M_2$ into one PDA. There must be an outgoing arc since you must recognize both $a^nb^n$ and $a^nb^{2n}$. After reading $n$ $b$’s, must accept if no more $b$’s and continue if there are more $b$’s.<br/>Modify all transitions that read a $b$ and have their destinations in $M_2$ to read a $c$.");
  av.step();

  //Frame 12
  av.umsg("The result will be a PDA tha accepts the language $\\{a^nb^nc^n \\mid n>0\\}$. Which is not CFL. This is a contradiction, so there is no DPDA for $L = \\{a^nb^n: n \\ge 1\\} \\cup \\{a^nb^{2n}: n \\ge 1\\}$");
  av.step();

  //Frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();

  //Frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  //Frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();

  //Frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //Frame 17
  av.umsg("Completed.")
  av.recorded();
});