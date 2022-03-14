$(document).ready(function() {
  "use strict";
  var av_name = "CFLClosurePropFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  //Frame 1
  av.umsg("Similar to regular languages, CFLs are closed under certain properties.");
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
  av.umsg("We now know that CFLs are closed under union, concatenation, and star-closure.");
  av.step();

  //Frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  //Frame 5
  av.umsg(Frames.addQuestion("q15"));
  av.step();

  //Frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //Frame 17
  av.umsg(Frames.addQuestion("q17"));
  av.step();

  //Frame 18
  av.umsg(Frames.addQuestion("q18"));
  av.step();

  //Frame 19
  av.umsg(Frames.addQuestion("q19"));
  av.step();

  //Frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();

  //Frame 21
  av.umsg(Frames.addQuestion("q21"));
  av.step();

  //Frame 22
  av.umsg("<b>Theorem:</b> CFLs are closed under regular intersection. If $L_1$ is a CFL and $L_2$ is regular, then $L_1 \\cap L_2$ is a CFL.");
  //TODO Provide the proof for this. See VisFormalLang.
  av.step();

  //Frame 23
  av.umsg("We can recognize if a given CFL just the empty set from its CFG. Simply get rid of useless variables and productions. If there is anything left, then the CFL is not empty.");
  av.step();

  //Frame 24
  av.umsg("We can also recognize if a if CFL is infinite from its CFG. Get rid of useless variables and productions, $\\lambda$-rules, and unit productions. Then if there is a variable with a production that uses that variable on its RHS, such as $A \\stackrel{*}{\\Rightarrow} xAy$, then L is infinite.");
  av.step();

  // Frame
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
