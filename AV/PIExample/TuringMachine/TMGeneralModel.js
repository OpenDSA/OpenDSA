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
  av.umsg(Frames.addQuestion("q20"));
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
  var c1 = av.label("q0", {left: 355 + xStart, top: 145 + yStart});
  var c2 = av.label("q1", {left: 355 + xStart, top: 175 + yStart});
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
  var lastArrow = av.g.line(570 + xStart, 195 + yStart, 540 + xStart, 240, {"arrow-end": "classic-wide-long"});
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
  av.umsg("Turing machines operate as follows: For $q\\in Q$, $a \\in \\Sigma$ and $\\delta(q,a)=(p,b,m)$, when in state $q$ and scanning $a$, enter state $p$, replace $a$ with $b$, and move the head ($m$ is $L$, $R$, or $S$).");
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
  av.umsg("However, this specification is missing something important. Regardless of what input you give it on the tape, it will execute something and eventually halt. But how do we know if the machine has determined that the string is in the language or not?<br/>The answer is that we use a convention. First, we only care about what happens when the machine starts with the head scanning the first non-blank character.");
  av.step();

  //frame 49
  av.umsg("However, this specification is missing something important. Regardless of what input you give it on the tape, it will execute something and eventually halt. But how do we know if the machine has determined that the string is in the language or not?<br/>The answer is that we use a convention. First, we only care about what happens when the machine starts with the head scanning the first non-blank character.<br/>Second, we use the convention that the string is accepted as being in the language if the machine halts in a Final State, and the string is rejected if the machine halts by following an undefined transition.");
  av.step();

  //frame 50
  av.umsg(Frames.addQuestion("q50"));
  av.step();

  //frame 51
  av.umsg(Frames.addQuestion("q51"));
  av.step();

  //frame 52
  av.umsg("Here is the graphical view of the machine.");
  var url = "../../../../AV/VisFormalLang/TM/Machines/TMabc.jff";
  var graph1 = av.ds.TM({left: 100, top: 200, width: 600, height: 325, url: url});
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
  av.umsg("Completed.");
  av.recorded();
});
