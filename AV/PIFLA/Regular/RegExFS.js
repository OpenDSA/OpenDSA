/*global PIFRAMES */
/* Written by ?? and Cliff Shaffer */
$(document).ready(function() {
  "use strict";
  var av_name = "RegExFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("This slideshow presents the definition and some examples for a RegEx.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("Start"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("Operators"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("Concat"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("ConcatStr"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("star"));
  av.step();
  
  // Frame 7
  av.umsg(Frames.addQuestion("alla"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("ab"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("abstrings"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("evena"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("onea"));
  av.step();

  // Frame 12
  av.umsg("Here is the complete definition for regular expressions on some alphabet $\\Sigma$.<br/><br/>1. <b>Base Cases:</b>$\\lambda$ and $a$ $\\in$ $\\Sigma$ are RE.<br/>2. If $r$ and $s$ are RE, then $(r)$, $r + s$, $rs$, and $r^∗$ are RE.<br/>3. $r$ is a RE if and only if it can be derived from (1) with a finite number of applications of (2).");
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("regexstrings"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("buildregex"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("moreex"));
  av.step();

  // Frame 16
  av.umsg("Now that we have a concrete definition for the regular expressions themselves, it is easy to define the set of languages that can be defined by regular expressions.");
  av.step();

  // Frame 17
  av.umsg("<b>Definition:</b> $L(r)$ is the language denoted by regular expression $r$.<br/><b>Base Cases:</b> 1. $\\emptyset$, {$\\lambda$}, and $\\{a\\in \\Sigma\\}$ are each languages denoted by some RE.<br/>2. If $r$ and $s$ are RE, then<br/>$\\ \\ L(r + s) = L(r) \\cup L(s)$<br/>$\\ \\ L(rs) = L(r) \\cdot L(s)$<br/>$\\ \\ L((r)) = L(r)$<br/>$\\ \\ L((r)*) = L((r)^*)$");
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("empty"));
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("abcstar"));
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("precedence"));
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("plus"));
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("oddaevenb"));
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("hasempty"));
  av.step();

  // Frame 24
  av.umsg(Frames.addQuestion("has3as"));
  av.step();

  // Frame 25
  av.umsg(Frames.addQuestion("numbers"));
  av.step();

  // Frame 26
  av.umsg(Frames.addQuestion("finite"));
  av.step();

  // Frame 27
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
