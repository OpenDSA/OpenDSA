$(document).ready(function () {
  "use strict";
  var av_name = "TransformGrammarsFS";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("When we use grammars to represent a programming language, they help us to answer the question: Is a given string a syntactically correct program? This is the same thing as asking if the string is in the language of syntactically correct programs.");
  av.displayInit();
  
  // Frame 2
  av.umsg(Frames.addQuestion("membership"));
  av.step();

  // Frame 3
  av.umsg("We have seen that if we can transform a CFG into an equivalent one with no $\\lambda$-productions and no rules like $A \\rightarrow B$, then we could determine if $w$ is in or not in $L(G)$ within $2|w|$ rounds, each step adding a terminal or increasing the length. This step is critical to making the cost of solving the management problem manageable.<br/><br/>In this module, we will look at lots of methods for transforming grammars to meet this goal.");
  av.step();

  // Frame 4
  av.umsg("Specifically, we will look at restrictions on the right hand side of the production rules. We want to be able to automatically transform an arbitrary CFG into an equivalent restricted CFG.");
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("power"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("lambda"));
  av.step();

  // Frame 7
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
  av.umsg(Frames.addQuestion("q13"));
  av.step();

  //frame 14
  av.umsg("A top-down parser (like LL parsing) would want to derive the leftmost terminal as soon as possible. But in the left recursive grammar above, in order to derive a sentential form that has the leftmost terminal, we have to derive a sentential form that has other terminals in it.");
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //frame 17
  av.umsg(Frames.addQuestion("q17"));
  av.step();

  //frame 18
  av.umsg("We will eliminate the left recursion so that we can derive a sentential form with the leftmost terminal and no other terminals.");
  av.step();

  //frame 19
  av.umsg(Frames.addQuestion("q19"));
  av.step();

  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();

  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();

  //frame 21
  av.umsg(Frames.addQuestion("q21"));
  av.step();

  //frame 22
  av.umsg(Frames.addQuestion("q22"));
  av.step();

  //frame 23
  av.umsg(Frames.addQuestion("q23"));
  av.step();

  //frame 24
  av.umsg(Frames.addQuestion("q24"));
  av.step();

  //frame 25
  av.umsg(Frames.addQuestion("q25"));
  av.step();

  //frame 26
  av.umsg(Frames.addQuestion("q26"));
  av.step();

  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  av.step();

  //frame 28
  av.umsg("When you get rid of left-recursion, the grammar is in the appropriate form for a top-down parser, but the grammar has more variables and productions.");
  av.step();

  //frame 29
  av.umsg(Frames.addQuestion("q29"));
  av.step();

  //frame 30
  av.umsg(Frames.addQuestion("q30"));
  av.step();

  av.umsg("We have now seen how to eliminate left recursion form CFGs.");
  av.recorded();


});
