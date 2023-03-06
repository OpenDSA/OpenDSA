$(document).ready(function() {
  "use strict";
  var av_name = "CFLPumpingLemmaFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("For regular languages, we developed a pumping lemma that can help us prove that a language is not regular. While we can't use the same pumping lemma for CFLs, we will see that there is a similar argument to be made that will lead to a CFL pumping lemma that we can make use of to prove certain languages are not CFL.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("CFL"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("notreg"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("anbncj"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("anbncjcfl"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("anbjanbj"));
  av.step();

  // Frame 7
  av.umsg("Note the intuition we used to reason that $L = \\{a^nb^ja^nb^j \\mid n>0, j>0\\}$ is not a CFL. We said that we can't get at the a's that will be below the b's in the stack when we look at the second set of a's. Of course, a different type of memory might let us create a machine that recognizes this language. We will talk about this later. But for now, a stack is what we have. And for the good reason that this is what keeps us to <b>just</b> the CFLs. In other words, its not just a matter of recognizing more languages. We want to keep in sync with what a CFG is capable of. In other words, its not just a matter of not being able to create a PDA for this language. We can't create a CFG for it either!");
  av.step();
  
  // Frame 8
  av.umsg(Frames.addQuestion("notregPL"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("m"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("pumpi"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("finite"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("diffPL"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("2pump"));
  av.step();

  // Frame 14
  av.umsg("Thinking about the stack used by a PDA, conceptually we always need two loops to accept any infinite language. One of them will push an arbitrary number of symbols onto the stack. The other loop will empty the stack, but that cannot remove more than the number of symbols available on the stack at the time. So the lengths of the two loops are related.");
  av.step();

  // Frame 15
  av.umsg("Proof (sketch):<br/>There is a CFG $G$ such that $L=L(G)$.<br/>Consider the parse tree of a long string in $L$.<br/>For any long string, some nonterminal $N$ must appear twice in the path.<br/>$N \\stackrel{*}{\\Rightarrow} vNy$ and $N \\stackrel{*}{\\Rightarrow} x$.<br/><br/>In other words, we have to be able to repeat the production $N \\rightarrow vNy$, and we have to be able to end the loop with the production $N \\rightarrow x$. The has the effect of putting something onto the stack, and later removing it from the stack. Of course, any of $v$, $y$, or $x$ can be $\\lambda$ (but we can't allow both $v$ and $y$ to be $\\lambda$ because we would then have a useless production). And we don't have to take all symbols off the stack. For example, the language $L = \\{a^nb^m \\mid n > m\\}$ is a CFL.");
  // TODO: Can we come up with an image to add here?
  av.step();

  // Frame 16
  av.umsg("Proof (sketch):<br/>There is a CFG $G$ such that $L=L(G)$.<br/>Consider the parse tree of a long string in $L$.<br/>For any long string, some nonterminal $N$ must appear twice in the path.<br/>$N \\stackrel{*}{\\Rightarrow} vNy$ and $N \\stackrel{*}{\\Rightarrow} x$.<br/>$S \\stackrel{*}{\\Rightarrow} uNz \\stackrel{*}{\\Rightarrow} uvNyz \\stackrel{*}{\\Rightarrow} uvxyz$.<br/>By repeatedly pumping $N \\rightarrow vNy$, we get $N \\stackrel{*}{\\Rightarrow} v^iNy^i \\stackrel{*}{\\Rightarrow} v^ixy^i$");
  av.step();

  // Frame 17
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
