// Title: Turing Machines Configurations and Terminology Frameset
// Author: Mostafa Mohammed; Cliff Shaffer
// Institution: Virginia Tech
// Features: Programmed Instruction
// Keyword: Collision Resolution
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow presenting the concept of a configuration for a Turing machine, along with defintions for terms like halting, accepting, and computing. */

$(document).ready(function () {
  "use strict";

  var av_name = "TMInterpretingFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var xStart = 0;
  var yStart = 150;


  // Frame 1
  av.umsg("A <b>configuration</b> for a Turing machine provides enough information to understand its current state of execution on a given string. We use the following notation:$(q, \\underline{a}aba)$<br/><br/>This means that the TM is in state $q$, the tape contains $aaba$, and the read/write head position is on the underlined $a$. Recall that we assume at the start of processing input for any TM, the read/write head position is on the leftmost non-blank character.<br/><br/>Don't forget that the tape is infinite in both directions. So to the left of the leftmost 'a' in this configuration are an infinite number of blank squares, and to the right of the rightmost a is also an infinite number of blank squares.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("infinity"));
  av.step();

  // Frame 3
  av.umsg("A <b>halted configuration</b> occurs when the machine does not find a move from the current state using the current tape symbol. In other words, a TM halts if there is no suitable transition defined in $\\delta$. Note that we never define any transitions out of any Final State. So there is some redundancy when we said earlier that the machine halts when either it is in any Final State, or when there is no current transition. But having two such definitions for halting makes it easy to define the difference between accepting and rejecting a string.");
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("computation"));
  var url = "../../../AV/OpenFLAP/machines/TM/TMexample1.jff";
  var tm = new av.ds.TM({width: 400, height: 150, left: 0, top: 150, url: url});
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("a1"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("a2"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("a3"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("a4"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("adone"));
  av.step();

  // Frame 10
  av.umsg("Now the machine entered a final state and will halt. The computation for the string $aaaa$ is this series of configurations.<br/>$(q_0, \\underline{a}aaa)\\vdash_M(q_0, \\#\\underline{a}aa)$<br/>$\\quad \\quad \\vdash_M(q_0, \\#\\#\\underline{a}a)$<br/>$\\quad \\quad \\vdash_M(q_0, \\#\\#\\#\\underline{a})$<br/>$\\quad \\quad \\vdash_M(q_0, \\#\\#\\#\\#\\underline{\\#})$<br/>$\\quad \\quad \\vdash_M(q_1, \\#\\#\\#\\#\\underline{\\#})$");
  av.step();

  // Frame 11
  av.umsg("By the way, we have been showing configurations with leading spaces. Actually, it is irrelevant how many leading spaces we show, since there are always an infinite number of spaces preceding the first non-space symbol in any string. So configurations $(q_0, \\underline{a}aaa)$ and $(q_0, \\#\\#\\underline{a}aaa)$ are exactly the same. So are $(q_0, \\#\\#\\#\\#\\underline{\\#})$ and $(q_0, \\underline{\\#})$.");
  av.step();

  // Frame 12
  av.umsg("Notation: Given a string $w$, the notation $\\underline{w}$ for a configuration means that the read/write head is scanning the leftmost character in $w$.<br/>$M$ is said to <b>halt</b> on input $w$ iff $(s, \\underline{w})$ yields some <b>halted</b> configuration.<br/>$M$  is said to <b>hang</b> on input $w$ if $(s, \\underline{w})$ yields some <b>hanging</> configuration.");
  tm.hide();
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("hang"));
  var url2 = "../../../AV/OpenFLAP/machines/TM/TMab.jff";
  var graph2 = av.ds.TM({top: 150, width: 400, height: 200, url: url2});
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("hang2"));
  av.step();

  // Frame 15
  graph2.hide();
  av.umsg(Frames.addQuestion("acceptor"));
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("transducer"));
  av.step();

  // Frame 17
  av.umsg("<i>Turing Transducers</i><br/><br/>Formally: Let $f$ be a function from $\\Sigma^*_0$ to $\\Sigma^*_1$. Turing machine $M$ is said to compute $f$ when, for any string $w \\in \\Sigma^*_0$, if $f(w) = u$ then<br/>$\\qquad (s, \\#\\underline{w}) \\vdash^*_M (h, \\#u\\underline{\\#})$<br/>for some state $h \\in F$ (that is, a Final State for $M$).<br/>Such a function $f$ is said to be a <b>Turing-computable function</b>.<br/><br/>Notice that we require the machine to start with the head under the first symbol of the input string, and end in the first space after the output string.");
  av.step();

  // Frame 18
  av.umsg("Here is how we express multiple parameters for a function $f(w_1, ..., w_k) = u$:<br/>$\\qquad (s, \\#\\underline{w_1}\\#w_2\\#...\\#w_k) \\vdash^*_M (h, \\#u\\underline{\\#})$.");
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("unary"));
  av.step();

  // Frame 20
  av.umsg("Here is a Turing machine that increments a unary number. The intial state of the input tape is shown with the head when beginning to process input string '11'.");
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

  // Frame 21
  av.umsg(Frames.addQuestion("first1"));
  node[0].highlight();
  tape.highlightCurrent();
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("next1"));
  g.translateX(30);
  c1.translateX(30);
  c4.translateX(30);
  tape.moveRight();
  c2.translateX(30);
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("end1"));
  g.translateX(30);
  c1.translateX(30);
  c4.translateX(30);
  tape.moveRight();
  c2.translateX(30);
  av.step();

  // Frame 24
  av.umsg(Frames.addQuestion("finish1"));
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

  // Frame 25
  av.umsg("Step 5: The tape head stays on the current cell. The current state changes to $q_2$. Since $q_2$ is a member of the Final State set $F$, the machine immediately halts.");
  node[1].unhighlight();
  av.g.line(230, 290, 200, 312,
              {"arrow-end": "classic-wide-long"});
  newLine.hide();
  node[2].highlight();
  av.step();

  // Frame 26
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
