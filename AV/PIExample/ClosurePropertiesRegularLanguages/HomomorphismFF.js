$(document).ready(function () {
    "use strict";
    var av_name = "HomomorphismFF";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

  //frame 1
  av.umsg("Homomorphism  is a function that gives a string for each symbol in that alphabet.");
  av.displayInit();

  //frame 2
  av.umsg("Definition: Let $\\Sigma$, $\\Gamma$ be alphabets. A homomorphism is a function $h : \\Sigma \\rightarrow \\Gamma^*$. In other words, homomorphism is a function that transforms the alphabet set for a language.");
  av.step();

  //frame 3
  av.umsg("Example, \\Sigma=\\{a, b, c\\}, \\Gamma = \\{0,1\\}, the homomorphism function is defined as: $h(a) = 11$, $h(b) = 00$, and $h(c) = 0$.<br/>$h(a) = 11$ means that we should replace every $a$ with $11$, and so on");
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
  av.umsg(Frames.addQuestion("q8"));
  av.step();

  //frame 9
  av.umsg("Theorem: Regular languages are closed under homomorphism.");
  av.step();

  //frame 10
  av.umsg("The proof is straightforward. Suppose we have a regular language $L$ denoted by a RegEx $r$. Changing the letters of $r$ will give another regular expression. This means that the result is alos a regular language.");
  av.step();

  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();

  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();
  
  //frame 14
  av.umsg("Completed.");
  av.recorded();
});