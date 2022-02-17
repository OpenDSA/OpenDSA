$(document).ready(function () {
  "use strict";
  var av_name = "CFGDerivationsFS";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);
  
  // Frame 1
  av.umsg("Suppose we have a grammar show that a given string can be derived from it. This process is named <b>string derivation</b>.<br/><br/>String derivation begins with the start symbol for the grammar and does replacements on variables until there are no more variables to replace. At each step, a variable is replaced by the right hand side of some production rule.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("anbn"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("anbnreg"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("grammartype"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("derivation"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("sentential"));
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
  av.umsg(Frames.addQuestion("q14"));
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
  av.umsg(Frames.addQuestion("q18"));
  av.step();
  //frame 19
  av.umsg("Great. This is how the derivation process goes. But, in all previous examples, the sentential forms have only a single variable each time. So, the only choice was to directly substitute the existing variable.<br/><br/>(By the way, so far we have ignored the issue of how we decide which production rule to use in our derivation to get the string that we want. But that will be an issue to address later.)")
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
  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  av.step();
  //frame 28
  av.umsg(Frames.addQuestion("q28"));
  av.step();
  //frame 29
  av.umsg(Frames.addQuestion("q29"));
  av.step();
  //frame 30
  av.umsg(Frames.addQuestion("q30"));
  av.step();
  //frame 31
  av.umsg(Frames.addQuestion("q31"));
  av.step();
  //frame 32
  av.umsg(Frames.addQuestion("q32"));
  av.step();
  //frame 33
  av.umsg(Frames.addQuestion("q33"));
  av.step();
  //frame 34
  av.umsg(Frames.addQuestion("q34"));
  av.step();
  //frame 35
  av.umsg(Frames.addQuestion("q35"));
  av.step();
  //frame 36
  av.umsg(Frames.addQuestion("q36"));
  av.step();
  //frame 37
  av.umsg(Frames.addQuestion("q37"));
  av.step();
  //frame 38
  av.umsg(Frames.addQuestion("q38"));
  av.step();
  //frame 39
  av.umsg("We were successfuly able to derive the string $aacbb$ by following the Leftmost derivation. There is another replacement order.");
  av.step();
  //frame 40
  av.umsg(Frames.addQuestion("q40"));
  av.step();
  //frame 41
  av.umsg(Frames.addQuestion("q41"));
  av.step();
  //frame 42
  av.umsg(Frames.addQuestion("q42"));
  av.step();
  //frame 43
  av.umsg(Frames.addQuestion("q43"));
  av.step();
  //frame 44
  av.umsg(Frames.addQuestion("q44"));
  av.step();
  //frame 45
  av.umsg(Frames.addQuestion("q45"));
  av.step();
  //frame 46
  av.umsg(Frames.addQuestion("q46"));
  av.step();
  //frame 47
  av.umsg(Frames.addQuestion("q47"));
  av.step();
  //frame 48
  av.umsg(Frames.addQuestion("q48"));
  av.step();
  //frame 49
  av.umsg(Frames.addQuestion("q49"));
  av.step();
  //frame 50
  av.umsg(Frames.addQuestion("q50"));
  av.step();
  //frame 51
  av.umsg(Frames.addQuestion("q51"));
  av.step();
  av.umsg("Now we learned about how to derive a string from a grammar by using sentential forms. Next we will see a different method to derive strings.")
  av.recorded();
});
