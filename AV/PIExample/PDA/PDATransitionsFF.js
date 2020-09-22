$(document).ready(function() {
  "use strict";
  var av_name = "PDATransitionsFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
    interpret = config.interpreter,
    code = config.code;
  var goNext = false;

  av.umsg("In this part, we will study the transition function for Pushdown Automata.")
  av.displayInit();

  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame 4
  av.umsg("Let us take a look for PDA transition. Suppose we have $\\delta(q_0, a, b) = \\{(q_1, b),(q_2, ab), (q_3, \\lambda)\\}$");
  var url = "../../../AV/PIExample/PDA/machines/transitions.jff";
  var PDA = new av.ds.PDA({width: 250, height: 200, url: url});
  var q0 = PDA.getNodeWithValue("q0");
  var q1 = PDA.getNodeWithValue("q1");
  var q2 = PDA.getNodeWithValue("q2");
  var q3 = PDA.getNodeWithValue("q3");
  var edge1 = PDA.getEdge(q0,q1);
  var edge2 = PDA.getEdge(q0,q2);
  var edge3 = PDA.getEdge(q0,q3);
  av.step();

  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  edge1.addClass('yellowedge');
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  edge1.addClass('defauledge');
  edge2.addClass('yellowedge');
  av.step();

  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  edge2.addClass('defauledge');
  edge3.addClass('yellowedge');
  av.step();

  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  edge3.addClass('defauledge');
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();

  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();

  //frame 14
  av.umsg("$\\textbf{Instantaneous Description:}$ To describe the status of a PDA, we use $(q, w, u)$ where $q$ is the current state, $w$ is the remaining portion of the input string, and $u$ is the current contents of the stack");
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

  av.step("Completed.")
  av.recorded();

});