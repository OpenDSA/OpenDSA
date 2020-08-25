$(document).ready(function() {
  "use strict";
  var av_name = "CFLPumpingLemmaFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
    interpret = config.interpreter,
    code = config.code;
  var goNext = false;

  //Frame 1
  av.umsg("We need a tool that helps us to identify if a language is not CFL.");
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

  //Frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //Frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //Frame 7
  av.umsg(Frames.addQuestion("q7"));
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
  av.umsg("Proof (sketch)<br/>There is a CFG $G$ such that $L=L(G)$<br/>Consider the parse tree of a long string in $L$.<br/>For any long string, some nonterminal $N$ must appear twice in the path");
  //TODO add image
  av.step();

  //Frame 17
  av.umsg("Proof (sketch)<br/>There is a CFG $G$ such that $L=L(G)$<br/>Consider the parse tree of a long string in $L$.<br/>For any long string, some nonterminal $N$ must appear twice in the path<br/>$N \\stackrel{*}{\\Rightarrow} vNy$ and $N \\stackrel{*}{\\Rightarrow} x$");
  av.step();

  //Frame 18
  av.umsg("Proof (sketch)<br/>There is a CFG $G$ such that $L=L(G)$<br/>Consider the parse tree of a long string in $L$.<br/>For any long string, some nonterminal $N$ must appear twice in the path<br/>$N \\stackrel{*}{\\Rightarrow} vNy$ and $N \\stackrel{*}{\\Rightarrow} x$<br/>$S \\stackrel{*}{\\Rightarrow} uNz \\stackrel{*}{\\Rightarrow} uvNyz \\stackrel{*}{\\Rightarrow} uvxyz$");
  av.step();

  //Frame 19
  av.umsg("Proof (sketch)<br/>There is a CFG $G$ such that $L=L(G)$<br/>Consider the parse tree of a long string in $L$.<br/>For any long string, some nonterminal $N$ must appear twice in the path<br/>$N \\stackrel{*}{\\Rightarrow} vNy$ and $N \\stackrel{*}{\\Rightarrow} x$<br/>$S \\stackrel{*}{\\Rightarrow} uNz \\stackrel{*}{\\Rightarrow} uvNyz \\stackrel{*}{\\Rightarrow} uvxyz$<br/>By repeating the $v$ and $y$ subtrees, get $N \\stackrel{*}{\\Rightarrow} v^iNy^i \\stackrel{*}{\\Rightarrow} v^ixy^i$");
  //TODO add image
  av.recorded();



});