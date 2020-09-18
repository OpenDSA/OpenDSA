$(document).ready(function() {
  "use strict";
  var av_name = "CFLClosurePropertiesFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
    interpret = config.interpreter,
    code = config.code;
  var goNext = false;

  //Frame 1
  av.umsg("We need to sutdy the closure properties of CFLs.");
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
  av.umsg("After these proofs we can say that <br/>Theorem CFL’s are closed under union, concatenation, and star-closure.");
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
  av.umsg("$\\textbf{Theorem:}$ CFL’s are closed under regular intersection. If $L_1$ is CFL and $L_2$ is regular, then $L_1 \\cap L_2$ is CFL");
  //TODO slide show (frame to the regular intersection process)
  av.step();

  //Frame 23
  av.umsg("To decide if CFL is empty<br/>Know how to get rid of useless variables and productions, if there is anything left, then CFL is not empty");
  av.step();

  //Frame 24
  av.umsg("To decide if CFL is infinite<br/>Get rid of useless variables and productions, $\\lambda$-rules, and unit productions. Then if there is a variable that repeats $A \\stackrel{*}{\\Rightarrow} xAy$, then L is infinite");
  av.recorded();
});