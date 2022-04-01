$(document).ready(function () {
  "use strict";

  var av_name = "TMInterpretingFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var xStart = 0;
  var yStart = 150;


  //frame 1
  av.umsg("A <b>configuration</b> for a Turing machine looks like this: <i>(q, <u>a</u>aba)</i><br/><br/>This means that the TM is in state <i>q</i>, the tape contains <i>aaba</i> and the read/write head position is on the underlined 'a'. Recall that we assume at the start of processing input for any TM, the read/write head position is on the leftmost non-blank character.<br/><br/>Don't forget that the tape is infinite in both directions. So to the left of the leftmost 'a' in this configuration is an infinite number of blank squares, and to the right of the rightmost a is also an infinite number of blank squares.");
  av.displayInit();

  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //frame 4
  av.umsg("A <b>halted configuration</b> occurs when the machine does not find a move from the current state using the current tape letter (the current configuration). In other words, a TM halts if there is no $\\delta$ defined. Note that we never define any transitions out of any Final State. So there is some redundancy when we said earlier that the machine halts when either it is in any Final State, or when there is no current transition. But having two such definitions for halting makes it easy to define the difference between accepting and rejecting a string.");
  av.step();

  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  var url = "../../../AV/OpenFLAP/machines/TM/TMexample1.jff";
  var tm = new av.ds.TM({width: 400, height: 150, left: 0, top: 150, url: url});
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame 8
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
  av.umsg("Now the machine entered a final state and will halt. The computation for the string $aaaa$ is this series of configurations.<br/>$(q_0, \\underline{a}aaa)\\vdash_M(q_0, \\underline{\\#}aaa)$<br/>$\\quad \\quad \\vdash_M(q_0, \\#\\underline{\\#}aa)$<br/>$\\quad \\quad \\vdash_M(q_0, \\#\\#\\underline{\\#}a)$<br/>$\\quad \\quad \\vdash_M(q_0, \\#\\#\\#\\underline{\\#})$<br/>$\\quad \\quad \\vdash_M(q_1, \\#\\#\\#\\#\\underline{\\#})$");
  av.step();

  //frame 14
  av.umsg("Notation: Given a string $w$, the notation $\\underline{w}$ for a configuration means that the read/write head is scanning the leftmost character in $w$.<br/>$M$ is said to <b>halt</b> on input $w$ iff $(s, \\underline{w})$ yields some <b>halted</b> configuration.<br/>$M$  is said to <b>hang</b> on input $w$ if $(s, \\underline{w})$ yields some <b>hanging</> configuration.");
  tm.hide();
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  var url2 = "../../../AV/OpenFLAP/machines/TM/TMab.jff";
  var graph2 = av.ds.TM({top: 150, width: 400, height: 200, url: url2});
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //frame 17
  graph2.hide();
  av.umsg(Frames.addQuestion("q17"));
  av.step();

  //frame 18
  av.umsg(Frames.addQuestion("q18"));
  av.step();

  //frame 19
  av.umsg("<i>Turing Transducers</i><br/><br/>Formally: Let $f$ be a function from $\\Sigma^*_0$ to $\\Sigma^*_1$. Turing machine $M$ is said to compute $f$ when, for any string $w \\in \\Sigma^*_0$, if $f(w) = u$ then<br/>$\\qquad (s, \\#\\underline{w}) \\vdash^*_M (h, \\#u\\underline{\\#})$<br/>for some state $h \\in F$ (that is, a Final State for $M$).<br/>Such a function $f$ is said to be a <b>Turing-computable function</b>.");
  av.step();

  //frame 20
  av.umsg("Here is how we express multiple parameters for $f(w_1, ..., w_k) = u$:<br/>$\\qquad (s, \\#\\underline{w_1}\\#w_2\\#...\\#w_k) \\vdash^*_M (h, \\#u\\underline{\\#})$.");
  av.step();

  //frame 21
  av.umsg(Frames.addQuestion("q21"));
  av.step();

  //frame 22
  av.umsg("Here is the graph form for a Turing machine that increments a unary number. The intial state of the input tape is shown with the head when beginning to process input string '11'.");
  var url3 = "../../../AV/OpenFLAP/machines/TM/TMPlusone.jff";
  var tm = new av.ds.TM({width: 400, height: 125, left: 50, url: url3});
  var tape = av.ds.tape(["#", "1", "1", "#", "#"], 50 + xStart, yStart, "both");
  var rect = av.g.rect(60 + xStart, 90 + yStart, 110, 110);
  var c1 = av.label("q0", {left: 70 + xStart, top: 80 + yStart});
  var c2 = av.label("q1", {left: 70 + xStart, top: 115 + yStart});
  var c4 = av.label("q2", {left: 70 + xStart, top: 150 + yStart});
  var p3 = av.g.line(100 + xStart, 90 + yStart, 100 + xStart, 35 + yStart,
                      {"arrow-end": "classic-wide-long"});
  var p4 = av.g.line(130 + xStart, 150 + yStart, 100 + xStart, 125 + yStart,
                      {"arrow-end": "classic-wide-long"});
  var g = av.g.set(); // A set to hold the tape head graphical objects
  var node = tm.nodes();
  g.push(rect);
  g.push(c4);
  g.push(p3);
  g.push(p4);
  g.push(c1);
  g.push(c2);
  av.step();

  // frame 23
  av.umsg(Frames.addQuestion("q23"));
  node[0].highlight();
  tape.highlightCurrent();
  av.step();

  // frame 24
  av.umsg(Frames.addQuestion("q24"));
  g.translateX(30);
  c1.translateX(30);
  c4.translateX(30);
  tape.moveRight();
  c2.translateX(30);
  av.step();

  // frame 25
  av.umsg(Frames.addQuestion("q25"));
  g.translateX(30);
  c1.translateX(30);
  c4.translateX(30);
  tape.moveRight();
  c2.translateX(30);
  av.step();

  // framw 26
  av.umsg(Frames.addQuestion("q26"));
  g.translateX(30);
  c1.translateX(30);
  c4.translateX(30);
  tape.setValueAt(3, "1");
  tape.moveRight();
  var newLine = av.g.line(230, 290, 200, 290,
                          {"arrow-end": "classic-wide-long"});
  p4.hide();
  node[0].unhighlight();
  node[1].highlight();
  c2.translateX(30);
  av.step();

  // frame 27
  av.umsg("Step 5: The tape head stays on the current cell. The current state changes to $q_2$. Since $q_2$ is a member of the Final State set $F$, the machine immediately halts.");
  node[1].unhighlight();
  av.g.line(230, 290, 200, 312,
              {"arrow-end": "classic-wide-long"});
  newLine.hide();
  node[2].highlight();
  av.step();

  // Frame
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
