$(document).ready(function () {
  "use strict";

  var av_name = "TMGeneralFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var xStart = -270;
  var yStart = 45;

  // Frame 1
  av.umsg("We now introduce the <b>Turing Machine</b>. A Turing Machine is a <b>transducer</b>, meaning that it can modify the input tape to generate an output. It is only slightly more complicated than the machines that we have seen so far, and only slightly different in its operation. But these differences are significant. Ultimately, we will see that a Turing Machine can do any computation that even the most sophisticated modern computer can do.");
  av.displayInit();

  // Frame 2
  av.umsg("We would like to define a general model of computation that is as simple as possible. The reason is that we want to be able to understand the limits of what is possible in computing, but that is rather hard to do with a complicated definition for what a 'computer' is. But then, we need to be confident that whatever model we do pick actually represents all of the fundamental capabilities of a computer.");
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("capability"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("read"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("tape"));
  var tempTape = av.ds.tape(["#", "#", "#", "#", "#", "#", "#", "#"], 50, 70, "both");
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("squares"));
  av.step();

  // Frame 7
  av.umsg("The symbols that can appear on the tape are an important part of the definition for a given Turing machine.</br></br>The alphabet of the machine is these symbols that may appear in the input. In addition to the symbols of the alphabet, there is always the blank symbol. Since a blank is hard to seen when we try to talk about input, we don't actually just leave the squares blank. Instead, we use # to represent a blank square on the tape.");
  tempTape.hide();
  var tape2 = av.ds.tape(["#", "a", "a", "a", "a", "#", "#", "#"], 50, 90, "both");
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("blank"));
  av.step();

  // Frame 9
  av.umsg("A Turing machine is defined as follows. It has a one-dimensional tape, divided into squares. This tape extends infinitely to the left and to the right.<br/>Each square can store one character.<br/>The machine has a single I/O head that at any instant in time is \"on\" one of the squares.");
  tape2.hide();
  var tape = av.ds.tape(["#", "a", "a", "a", "a", "#", "#", "#"], 50, 90, "both");
  var rect = av.g.rect(350 + xStart, 140 + yStart, 110, 80);
  var p3 = av.g.line(365 + xStart, 140 + yStart, 365 + xStart, 80 + yStart, {"arrow-end": "classic-wide-long"});
  tape.highlightPosition(1);
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("control"));
  var url = "../../../AV/OpenFLAP/machines/TM/TMexample1.jff";
  var tm = new av.ds.TM({width: 400, height: 100, left: 50, top: 270, url: url});
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("start"));
  var c1 = av.label("q0", {left: 355 + xStart, top: 140 + yStart});
  var c2 = av.label("q1", {left: 355 + xStart, top: 170 + yStart});
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("first"));
  var p4 = av.g.line(420 + xStart, 190 + yStart, 390 + xStart, 170 + yStart, {"arrow-end": "classic-wide-long"});
  var g = av.g.set(); // A set to hold the tape head graphical objects
  var node = tm.nodes();
  g.push(rect);
  g.push(p3);
  g.push(p4);
  node[0].highlight();
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("erase"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("move"));
  tape.setCurrentValue("#");
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("a2"));
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("a3"));
  tape.setCurrentValue("#");
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("a4"));
  tape.setCurrentValue("#");
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("end"));
  tape.setCurrentValue("#");
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("newstate"));
  p4.hide();
  var lastArrow = av.g.line(540 + xStart, 190 + yStart, 510 + xStart, 190 + yStart, {"arrow-end": "classic-wide-long"});
  av.step();

  // Frame 20
  av.umsg("A Turing Machine will halt whenever it reaches a situation where there is no transition that will allow it to continue (that is, the current state has no transition for the current symbol on the tape). Our convention will be that any state marked as final will have no transitions, and so the machine will always halt immediately upon entering a final state. In this example, since $q_1$ is a member of the Final State set $F$, it has no transitions. Thus, the machine immediately halts.");
  node[0].unhighlight();
  node[1].highlight();
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("definition"));
  lastArrow.hide();
  g.hide();
  c1.hide();
  c2.hide();
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("F"));
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("q1"));
  av.step();

  // Frame 24
  av.umsg(Frames.addQuestion("delta"));
  av.step();

  // Frame 25
  av.umsg(Frames.addQuestion("partin"));
  av.step();

  // Frame 26
  av.umsg(Frames.addQuestion("partout"));
  av.step();

  // Frame 27
  av.umsg(Frames.addQuestion("q0"));
  av.step();

  // Frame 28
  av.umsg(Frames.addQuestion("sigma"));
  av.step();

  // Frame 29
  av.umsg(Frames.addQuestion("sigma2"));
  av.step();

  // Frame 30
  av.umsg(Frames.addQuestion("gamma"));
  av.step();

  // Frame 31
  av.umsg(Frames.addQuestion("gamma2"));
  av.step();

  // Frame 32
  av.umsg("Let's summarize what we have learned so far. Turing machines operate as follows: For $q\\in Q$, $a \\in \\Sigma$ and $\\delta(q,a)=(p,b,m)$, when in state $q$ and scanning $a$, enter state $p$, replace $a$ with $b$, and either move the head left or right, or leave it in place ($m$ is $L$, $R$, or $S$, respectively).");
  tm.hide();
  tape.hide();
  av.step();

  // Frame 33
  av.umsg("Turing machines are pretty flexible, and leave us with some decisions to make. To do computation, we have to have some conventions about starting and ending the process. (Note that there are many ways to define Turing Machines, with lots of minor variations related to the tape, the halt conditions, and the conventions around acceptance and computation.)<br/><br/>We previously said that the machine halts immediately if (1) it enters any final state, or (2) it is in a state and scans a character for which there is no transition. (Actually, these are the same thing -- we merely agreed to a convention that a final state will have no transitions.)");
  av.step();

  // Frame 34
  av.umsg("However, we are still missing something important. Regardless of what input you give it on the tape, a machine will execute something. But how do we know if the machine has determined that the string is in the language or not? In a DFA or NFA, the machine started at the first input symbol, and inevitably marched to the end of the string. It then made a decision depending on whether the machine was in a final state or not. The Turing Machine is not as simple.<br/><br/>For computation to make sense, we must adopt some conventions. First, we only care about what happens if the machine starts with the head scanning the first non-blank character.");
  av.step();

  // Frame 35
  av.umsg("However, we are still missing something important. Regardless of what input you give it on the tape, a machine will execute something. But how do we know if the machine has determined that the string is in the language or not? In a DFA or NFA, the machine started at the first input symbol, and inevitably marched to the end of the string. It then made a decision depending on whether the machine was in a final state or not. The Turing Machine is not as simple.<br/><br/>For computation to make sense, we must adopt some conventions. First, we only care about what happens if the machine starts with the head scanning the first non-blank character.<br/>Second, we use the convention that the string is accepted as being in the language if the machine halts in a Final State, and the string is rejected if the machine halts by otherwise following an undefined transition.");
  av.step();

  // Frame 36
  av.umsg(Frames.addQuestion("reg"));
  av.step();

  // Frame 37
  av.umsg(Frames.addQuestion("nochange"));
  av.step();

  // Frame 38
  av.umsg(Frames.addQuestion("abca"));
  var url = "../../../AV/OpenFLAP/machines/TM/TMabc.jff";
  var graph1 = av.ds.TM({left: 0, top: 80, width: 450, height: 325, url: url});
  var complicatedTape = av.ds.tape(["#", "a", "b", "c", "#", "#", "#"], 100, 50, "both");
  av.step();

  // Frame 39
  av.umsg(Frames.addQuestion("abcb"));
  complicatedTape.moveRight();
  av.step();

  // Frame 40
  av.umsg(Frames.addQuestion("abcc"));
  complicatedTape.moveRight();
  av.step();

  // Frame 41
  av.umsg(Frames.addQuestion("abcend"));
  complicatedTape.moveRight();
  av.step();

  // Frame 42
  av.umsg(Frames.addQuestion("abcfinal"));
  av.step();

  // Frame 43
  av.umsg(Frames.addQuestion("abaca"));
  complicatedTape.hide();
  var complicated2Tape = av.ds.tape(["#", "a", "b", "a", "c", "#", "#"], 100, 50, "both");
  av.step();

  // Frame 44
  av.umsg(Frames.addQuestion("abacb"));
  complicated2Tape.moveRight();
  av.step();

  // Frame 45
  av.umsg(Frames.addQuestion("abaca2"));
  complicated2Tape.moveRight();
  av.step();

  // Frame 46
  av.umsg(Frames.addQuestion("fail"));
  av.step();

  // Frame 47
  av.umsg("Congratulations! Frameset completed.");
  complicated2Tape.hide();
  graph1.hide();
  av.recorded();
});
