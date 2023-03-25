$(document).ready(function() {
  "use strict";
  var av_name = "CFLPumpingLemmaFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  //Frame 1
  av.umsg("For regular languages, we developed a pumping lemma that can help us prove that a language is not regular. While we can't use the same pumping lemma for CFLs, we will see that there is a similar argument to be made that will lead to a CFL pumping lemma that we can make use of to prove certain languages are not CFL.");
  av.displayInit();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //Frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //Frame 4
  av.umsg(Frames.addQuestion("q4a"));
  av.step();

  //Frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //Frame 8
  av.umsg(Frames.addQuestion("q8"));
  av.step();

  //Frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //Frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //Frame 11
  av.umsg(Frames.addQuestion("q11"));
  av.step();

  //Frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();

  //Frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  //Frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();

  //Frame 16
  av.umsg("Proof (sketch)<br/>There is a CFG $G$ such that $L=L(G)$<br/>Consider the parse tree of a long string in $L$.<br/>For any long string, some nonterminal $N$ must appear twice in the path.");
  //TODO add image
  av.step();

  //Frame 17
  av.umsg("Proof (sketch)<br/>There is a CFG $G$ such that $L=L(G)$<br/>Consider the parse tree of a long string in $L$.<br/>For any long string, some nonterminal $N$ must appear twice in the path.<br/>$N \\stackrel{*}{\\Rightarrow} vNy$ and $N \\stackrel{*}{\\Rightarrow} x$<br/>In other words, we have to be able to repeat the production $N \\rightarrow vNy$, and we have to be able to end the loop with the production $N \\rightarrow x$. Of course, any of $v$, $y$, or $x$ can be $\\lambda$ (but we can't allow both $v$ and $y$ to be $\\lambda$ because we would then have a useless production).");
  av.step();

  //Frame 18
  av.umsg("Proof (sketch)<br/>There is a CFG $G$ such that $L=L(G)$<br/>Consider the parse tree of a long string in $L$.<br/>For any long string, some nonterminal $N$ must appear twice in the path<br/>$N \\stackrel{*}{\\Rightarrow} vNy$ and $N \\stackrel{*}{\\Rightarrow} x$<br/>$S \\stackrel{*}{\\Rightarrow} uNz \\stackrel{*}{\\Rightarrow} uvNyz \\stackrel{*}{\\Rightarrow} uvxyz$");
  av.step();

  //Frame 19
  av.umsg("Proof (sketch)<br/>There is a CFG $G$ such that $L=L(G)$<br/>Consider the parse tree of a long string in $L$.<br/>For any long string, some nonterminal $N$ must appear twice in the path<br/>$N \\stackrel{*}{\\Rightarrow} vNy$ and $N \\stackrel{*}{\\Rightarrow} x$<br/>$S \\stackrel{*}{\\Rightarrow} uNz \\stackrel{*}{\\Rightarrow} uvNyz \\stackrel{*}{\\Rightarrow} uvxyz$<br/>By repeating pumping $N \\rightarrow vNy$, we get $N \\stackrel{*}{\\Rightarrow} v^iNy^i \\stackrel{*}{\\Rightarrow} v^ixy^i$");
  //TODO add image
  av.step();

  // Frame
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
