$(document).ready(function () {
    "use strict";
    var av_name = "RLHomomorphFS";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Homomorphism  is a function that replaces each symbol from one alphabet with strings from another alphabet.");
  av.displayInit();

  // Frame 2
  av.umsg("Definition: Let $\\Sigma$, $\\Gamma$ be alphabets. A homomorphism is a function $h : \\Sigma \\rightarrow \\Gamma^*$. In other words, homomorphism is a function that transforms the alphabet set ($\\Sigma$) that underlies a language.");
  av.step();

  // Frame 3
  av.umsg("Example, $\\Sigma=\\{a, b, c\\}$, $\\Gamma = \\{0, 1\\}$.<br/>The homomorphism function is defined as: $h(a) = 11$, $h(b) = 00$, and $h(c) = 0$.<br/>$h(a) = 11$ means that we should replace every $a$ with $11$, and so on.");
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("ex1"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("ex2"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("ex3"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("ex4"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("ex5"));
  av.step();

  // Frame 9
  av.umsg("OK, now hopefully you have a good understanding of how a homomorphism works. Fitting the theme of this module, we want to know if the following is true.<br/><br/>Theorem: Regular languages are closed under homomorphism.");
  av.step();

  // Frame 10
  av.umsg("The proof is straightforward. Suppose we have a regular language $L$ denoted by a RegEx $r$. Changing the letters of $r$ through a homomorphism will give another regular expression. This means that the result is also a regular language.");
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("regex1"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("regex1b"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("regex1c"));
  av.step();
  
  // Frame 14
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
