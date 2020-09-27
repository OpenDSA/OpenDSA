$(document).ready(function () {
  "use strict";

  var av_name = "TMGeneralModel";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;
  var xStart = -270;
  var yStart = 45;

  //frame 1
  av.umsg("So far we have seen a few simple machine types, such as DFA, NFA, PDA, RegEx.");
  av.displayInit();
  
  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();
  
  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  av.step();

  //frame 9
  av.umsg("In its most general form, we can think of everything that a computer does as taking some string as input, and then providing some string as output. Of course, modern peripheral devices like keyboards, mice, and computer monitors give us rich ways to express input strings (perhaps as button presses), and rich ways to interpret output strings (say, as pictures). But it’s not a huge stretch of the imagination to consider computation as converting an input string to an output string.")
  av.step();

  //frame 10
  av.umsg("This concept of converting is far more powerful than simple accepting. A machine that takes an input and provides an output is called a transducer.");
  av.step();

  //frame 11
  av.umsg("In this chapter, we will introduce a simple machine, the $\\textbf{Turing Machine}$, that is a transducer. It is only slightly more complicated than the machines that we have seen so far, and only slightly different in its operation. But these differences are significant. Ultimately, we will see that a Turing Machine can do any computation that even the most sophisticated modern computer can do.");
  av.step();

  //frame 12
  av.umsg("We would like to define a general model of computation that is as simple as possible. The reason is that we want to be able to understand the limits of what is possible in computing, but that is rather hard to do with a complicated definition for a “computer” is. But then, we need to be confident that whatever model we do pick, that it actually represents all of the fundamental capabilities of a $\\textbf{computer}$.");
  av.step();

  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();
  
  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  var tempTape = av.ds.tape(["", "", "", "", "", "", "", ""], 50, 70, "both");
  av.step();
  
  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //frame 17
  av.umsg("The letters that can appear on the tape are an important part of the definition for a given Turing machine.");
  tempTape.hide();
  var tape2 = av.ds.tape(["", "a", "a", "a", "a", "", "", ""], 50, 90, "both");
  av.step();

  //frame 18
  av.umsg("The alphabet of the machine is these letters that may appear in the input. In addition to the letters of the alphabet that can define an input string, there is also the blank character.");
  av.step();

  //frame 19
  av.umsg("When talking about strings, since a blank is hard to see, we will use the # character to represent a blank character. Note that including # in the alphabet is for convenience only. We want to be able to read our specifications without being confused.");
  av.step();

  //frame 20
  av.umsg(Frames.addQuestion("q17"));
  av.step();


  //frame 21
  av.umsg("A Turing machine is defined as follows. It has a one-dimensional tape, divided into squares. This tape extends infinitely to the left and to the right.<br/>Each square can store one character.<br/>The machine has a single I/O head that at any instant in time is \"on\" one of the squares.");
  tape2.hide();
  var tape = av.ds.tape(["#", "a", "a", "a", "a", "#", "#", "#"], 50, 90, "both");
  var rect = av.g.rect(350 + xStart, 150 + yStart, 110, 80);
  var p3 = av.g.line(365 + xStart, 150 + yStart, 365 + xStart, 85 + yStart, {"arrow-end": "classic-wide-long"});
  tape.highlightPosition(1);
  av.step();

  //frame 22
  av.umsg(Frames.addQuestion("q22"));
  var url = "../../../../AV/VisFormalLang/TM/Machines/TMexample1.jff";
  var tm = new av.ds.TM({width: 600, height: 200, left: 50, top:300, url: url});
  av.step();

  //frame 23
  av.umsg(Frames.addQuestion("q23"));
  var c1 = av.label("q0", {left: 355 + xStart, top: 130 + yStart});
  var c2 = av.label("q1", {left: 355 + xStart, top: 160 + yStart});
  av.step();

  //frame 24
  av.umsg(Frames.addQuestion("q24"));
  var p4 = av.g.line(420 + xStart, 195 + yStart, 390 + xStart, 185 + yStart, {"arrow-end": "classic-wide-long"});
  var g = av.g.set(); // A set to hold the tape head graphical objects
  var node = tm.nodes();
  g.push(rect);
  g.push(p3);
  g.push(p4);
  node[0].highlight();
  av.step();
  
  //frame 25
  av.umsg(Frames.addQuestion("q25"));
  av.step();

  //frame 26
  av.umsg(Frames.addQuestion("q26"));
  tape.setCurrentValue("#");
  av.step();

  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  //frame 28
  av.umsg(Frames.addQuestion("q28"));
  tape.setCurrentValue("#");
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  //frame 29
  av.umsg(Frames.addQuestion("q29"));
  tape.setCurrentValue("#");
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  //frame 30
  av.umsg(Frames.addQuestion("q30"));
  tape.setCurrentValue("#");
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  //frame 31
  av.umsg(Frames.addQuestion("q31"));
  tape.setCurrentValue("#");
  tape.moveRight();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  //frame 32
  av.umsg(Frames.addQuestion("q32"));
  node[0].unhighlight();
  node[1].highlight();
  av.step();
  
  //frame 33
  av.umsg(Frames.addQuestion("q33"));
  p4.hide();
  var lastArrow = av.g.line(570 + xStart, 195 + yStart, 540 + xStart, 212 + yStart, {"arrow-end": "classic-wide-long"});
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

  //frame 40
  av.umsg(Frames.addQuestion("q40"));
  av.step();

  //frame 40
  av.umsg(Frames.addQuestion("q40"));
  av.step();

  //frame 40
  av.umsg(Frames.addQuestion("q40"));
  av.step();

  //frame 5
  av.umsg("To do computation, we have to have some conventions about starting and ending the process. The machine stops immediately if (1) it enters any $final$ $state$, or (2) it is in a state and scans a character for which there is no transition. (Note that there are many ways to define Turing Machines, and some definitions require an explicit reject state. We do not.)");
  av.step();
  
  

  av.recorded();
});
