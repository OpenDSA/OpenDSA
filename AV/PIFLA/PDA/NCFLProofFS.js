$(document).ready(function() {
  "use strict";
  var av_name = "NCFLProofFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  //Frame 1
  av.umsg("Now we want to prove that the language $L = \\{a^nb^n: n \\ge 1\\} \\cup \\{a^nb^{2n}: n \\ge 1\\}$ is not a deterministic CFL, and therefore no deterministic PDA can recognize it.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("union"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("DPDA"));
  av.step();

  // Frame 4
  av.umsg("Construct a PDA $M'$ from $M$ as follows:<br/>1. Create two copies of $M$ and name them $M_1$ and $M_2$. The same state in $M_1$ and $M_2$ are called $\\textbf{cousins}$.<br/>2. Remove accept status from accept states in $M_1$, remove initial status from initial state in $M_2$. In our new PDA, we will start in $M_1$ and accept in $M_2$.<br/>3. Outgoing arcs from old accept states in $M_1$, change to end up in the cousin of its destination in $M_2$. This joins $M_1$ and $M_2$ into one PDA. There must be an outgoing arc since you must recognize both $a^nb^n$ and $a^nb^{2n}$. After reading $n$ $b$’s, $M$ must accept if no more $b$’s and continue if there are more $b$’s.<br/></br/>The last change is to modify all transitions that read a $b$ and have their destinations in $M_2$ to read a $c$ instead.");
  av.step();

  // Frame 5
  av.umsg("The result will be a PDA that accepts the language $\\{a^nb^nc^n \\mid n>0\\}$. This language is not a CFL.<br/><br/>(Well, we haven't actually proved yet that $\\{a^nb^nc^n \\mid n>0\\}$ is not a CFL. But trust us for now, we will prove this later. For now, hopefully it makes intuitive sense that a stack is not sufficient to keep track of whether the number of a's, b's, and c's all match.)<br/></br>This is a contradiction, so there is no DPDA for<br/>$L = \\{a^nb^n: n \\ge 1\\} \\cup \\{a^nb^{2n}: n \\ge 1\\}$.");
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("NFADFA"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("CFLDCFL"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("which"));
  av.step();

  // Frame 9
  av.umsg("Based on this information, we now can update our model of the Formal Languages Universe. We now have Regular Languages which are a subset of Deterministic CFL, which in turn are a subset of CFL.");
  //TODO add the figure from VisFormalLang
  av.step();

  //Frame
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
