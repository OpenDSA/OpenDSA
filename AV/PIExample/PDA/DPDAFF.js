$(document).ready(function() {
    "use strict";
    var av_name = "DPDAFF";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter,
      code = config.code;
    var goNext = false;
    //Frame 1
  av.umsg("Since we started this chapter we only talk about Non-deterministic Pushdown Automata (NPDA).");
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
  av.umsg("Definition: $L$ is a deterministic context-free language (DCFL) if and only if there exists a deterministic PDA $M$ such that $L=L(M)$");
  av.step();

  //Frame 8
  av.umsg("Let us see some examples for PDAs and determine if each one is deterministic or nondeterministic based on those two conditions.")
  av.step();

  //Frame 9
  av.umsg(Frames.addQuestion("q9"));
  var url = "../../../AV/PIExample/PDA/machines/PDAExample1.jff";
  var PDA = new av.ds.PDA({width: 500, height: 200, left:-20, url: url});
  av.step();

  //Frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //Frame 11
  av.umsg(Frames.addQuestion("q11"));
  PDA.hide();
  url = "../../../AV/PIExample/PDA/machines/WWrPDA.jff";
  var PDA2 = new av.ds.PDA({width: 500, height: 200, left:-20, url: url});
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
  av.umsg("$\\textbf{Definition:}$ a language is Deterministic Context Free Language if it is accepted by a Deterministic PDA");
  PDA2.hide();
  av.step();

  //Frame 16
  av.umsg(Frames.addQuestion("q16"));
  PDA.show();
  av.step();

  //Frame 17
  av.umsg("Now, this fact that we have a PDA that is not deterministic certainly $\\textbf{does not prove}$ that $L = \\{ww^R | w\\in{\\Sigma}^{+}\\}, \\Sigma = \\{a, b\\}$ is not a deterministic CFL.");
  PDA.hide();
  av.step();

  //Frame 18
  av.umsg("But, there are CFL’s that are not deterministic. And we will see that this is one of them. This makes intuitive sense. How can we, deterministically, know when to switch from $w$ to $w^R$ when scanning from left to right through the input?");
  av.step();

  //Frame 19
  av.umsg("Example for Nondeterministic CFL (we call them CFL in general).<br/>$L = \\{a^nb^n|n \\ge 1\\} \\cup \\{a^nb^{2n}| n\\ge 1\\}$ is a CFL and not a DCFL");
  av.step();

  //Frame 20
  av.umsg("Example for Nondeterministic CFL (we call them CFL in general).<br/>$L = \\{a^nb^n|n \\ge 1\\} \\cup \\{a^nb^{2n}| n\\ge 1\\}$ is a CFL and not a DCFL<br/>Obviously, both languages are CFL. And obviously, their union is CFL");
  av.step();

  //Frame 21
  av.umsg(Frames.addQuestion("q21"));
  av.step();

  //Frame 22
  av.umsg(Frames.addQuestion("q22"));
  av.step();

  //Frame 23
  av.umsg("Below is a way to prove that a language is not DCFL.");
  av.recorded();

});