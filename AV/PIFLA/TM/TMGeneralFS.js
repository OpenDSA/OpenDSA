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
  av.umsg(Frames.addQuestion("q13"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("q15"));
  var tempTape = av.ds.tape(["", "", "", "", "", "", "", ""], 50, 70, "both");
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  // Frame 7
  av.umsg("The symbols that can appear on the tape are an important part of the definition for a given Turing machine.</br></br>The alphabet of the machine is these symbols that may appear in the input. In addition to the symbols of the alphabet, there is always the blank symbol.");
  tempTape.hide();
  var tape2 = av.ds.tape(["", "a", "a", "a", "a", "", "", ""], 50, 90, "both");
  av.step();

  // Frame 8
  av.umsg("When talking about strings, since a blank is hard to see, we will use # to represent a blank tape square. Note that including # in the alphabet is for convenience only. We want to be able to read our specifications without being confused.");
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("q20"));
  av.step();


  // Frame 10
  av.umsg("A Turing machine is defined as follows. It has a one-dimensional tape, divided into squares. This tape extends infinitely to the left and to the right.<br/>Each square can store one character.<br/>The machine has a single I/O head that at any instant in time is \"on\" one of the squares.");
  tape2.hide();
  var tape = av.ds.tape(["#", "a", "a", "a", "a", "#", "#", "#"], 50, 90, "both");
  var rect = av.g.rect(350 + xStart, 140 + yStart, 110, 80);
  var p3 = av.g.line(365 + xStart, 140 + yStart, 365 + xStart, 80 + yStart, {"arrow-end": "classic-wide-long"});
  tape.highlightPosition(1);
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("q22"));
  var url = "../../../AV/OpenFLAP/machines/TM/TMexample1.jff";
  var tm = new av.ds.TM({width: 400, height: 100, left: 50, top: 270, url: url});
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("q23"));
  var c1 = av.label("q0", {left: 355 + xStart, top: 140 + yStart});
  var c2 = av.label("q1", {left: 355 + xStart, top: 170 + yStart});
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("q24"));
  var p4 = av.g.line(420 + xStart, 190 + yStart, 390 + xStart, 170 + yStart, {"arrow-end": "classic-wide-long"});
  var g = av.g.set(); // A set to hold the tape head graphical objects
  var node = tm.nodes();
  g.push(rect);
  g.push(p3);
  g.push(p4);
  node[0].highlight();
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("q25"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("q26"));
  tape.setCurrentValue("#");
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("q27"));
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("q28"));
  tape.setCurrentValue("#");
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("q29"));
  tape.setCurrentValue("#");
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("q30"));
  tape.setCurrentValue("#");
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("q31"));
  p4.hide();
  var lastArrow = av.g.line(540 + xStart, 190 + yStart, 510 + xStart, 190 + yStart, {"arrow-end": "classic-wide-long"});
  av.step();

  // Frame 21
  av.umsg("Since $q_1$ is a member of the Final State set $F$, the machine immediately halts.");
  node[0].unhighlight();
  node[1].highlight();
  av.step();

  //frame 34
  av.umsg(Frames.addQuestion("q34"));
  lastArrow.hide();
  g.hide();
  c1.hide();
  c2.hide();
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
  av.umsg(Frames.addQuestion("q39"));
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
  av.umsg("Turing machines operate as follows: For $q\\in Q$, $a \\in \\Sigma$ and $\\delta(q,a)=(p,b,m)$, when in state $q$ and scanning $a$, enter state $p$, replace $a$ with $b$, and either move the head left or right, or leave it in place ($m$ is $L$, $R$, or $S$, respectively).");
  tm.hide();
  tape.hide();
  av.step();

  //frame 46
  av.umsg("To do computation, we have to have some conventions about starting and ending the process. The machine stops immediately if (1) it enters any final state, or (2) it is in a state and scans a character for which there is no transition. (Note that there are many ways to define Turing Machines, and some definitions require an explicit reject state. We do not.)");
  av.step();

  //frame 47
  av.umsg("However, this specification is missing something important. Regardless of what input you give it on the tape, it will execute something and eventually halt. But how do we know if the machine has determined that the string is in the language or not?");
  av.step();

  //frame 48
  av.umsg("However, this specification is missing something important. Regardless of what input you give it on the tape, it will execute something and eventually halt. But how do we know if the machine has determined that the string is in the language or not?<br/><br/>The answer is that we use a convention. First, we only care about what happens when the machine starts with the head scanning the first non-blank character.");
  av.step();

  //frame 49
  av.umsg("However, this specification is missing something important. Regardless of what input you give it on the tape, it will execute something and eventually halt. But how do we know if the machine has determined that the string is in the language or not?<br/><br/>The answer is that we use a convention. First, we only care about what happens when the machine starts with the head scanning the first non-blank character.<br/>Second, we use the convention that the string is accepted as being in the language if the machine halts in a Final State, and the string is rejected if the machine halts by following an undefined transition.");
  av.step();

  //frame 50
  av.umsg(Frames.addQuestion("q50"));
  av.step();

  //frame 51
  av.umsg(Frames.addQuestion("q51"));
  av.step();

  //frame 52
  av.umsg("Here is the graphical view of the machine.");
  var url = "../../../AV/OpenFLAP/machines/TM/TMabc.jff";
  var graph1 = av.ds.TM({left: 0, top: 140, width: 450, height: 325, url: url});
  av.step();

  //frame 53
  av.umsg(Frames.addQuestion("q53"));
  var complicatedTape = av.ds.tape(["#", "a", "b", "c", "#", "#", "#"], 100, 90, "both");
  av.step();

  //frame 54
  av.umsg(Frames.addQuestion("q54"));
  complicatedTape.moveRight();
  av.step();

  //frame 55
  av.umsg(Frames.addQuestion("q55"));
  complicatedTape.moveRight();
  av.step();

  //frame 56
  av.umsg(Frames.addQuestion("q56"));
  complicatedTape.moveRight();
  av.step();

  //frame 57
  av.umsg(Frames.addQuestion("q57"));
  av.step();

  //frame 58
  av.umsg(Frames.addQuestion("q58"));
  av.step();

  //frame 59
  av.umsg(Frames.addQuestion("q59"));
  av.step();

  //frame 60
  av.umsg(Frames.addQuestion("q60"));
  av.step();

  //frame 61
  av.umsg(Frames.addQuestion("q61"));
  av.step();

  //frame 62
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
