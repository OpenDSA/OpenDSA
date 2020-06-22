$(document).ready(function() {
"use strict";
var av_name = "DFAFF";
var av = new JSAV(av_name);
var Frames = PIFRAMES.init(av_name);
var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
	interpret = config.interpreter,
	code = config.code;
var goNext = false;

//Crearte a sample DFA using Tape
        //Draw DFA - taken from DFAexampleCON.js
           var xStart = 50;
          var yStart = 80;
          var label1 = av.label("input tape", {left: xStart + 40, top: yStart - 45});
          var strings = ["a", "a", "b", "b", "a", "b", "", "", "", "", ""];
//TODO highlight array cell or get tape to clear.
          var tape = av.ds.tape(strings, xStart, yStart, "right");
           //av.ds.array(strings, {left: xStart, top: yStart});
          //var arr = av.ds.array(strings, {left: xStart, top: yStart-10});
          tape.highlightPosition(2);
          var line1 = av.g.line(xStart + 80, yStart + 95, xStart + 80, yStart + 35,
                    {"arrow-end": "classic-wide-long"});
          var label2 = av.label("tape head", {left: xStart + 5, top: yStart + 25});
          var rectangleHeight = 30;
          var squareHeight = 90;
          var squareWidth = 90;
          var label3 = av.label("current state", {left: xStart + 45, top: yStart + rectangleHeight + 50});
          var rec = av.g.rect(xStart + 40, yStart + 25 + rectangleHeight + 40, squareWidth, squareHeight);
          var circle = av.g.circle(xStart + 40 + (squareWidth / 2), yStart + 35 + rectangleHeight + 40 + ((squareHeight - 10) / 2), 30);
          var line2 = av.g.line(xStart + 40 + (squareWidth / 2), yStart + 155, xStart + 90, yStart + 145,
                    {"arrow-end": "classic-wide-long"});
          var label4 = av.label("1", {left: xStart + 90, top: yStart + rectangleHeight + 85});
          var label5 = av.label("0", {left: xStart + 70, top: yStart + rectangleHeight + 85});

          var label6 = av.label("head moves", {left: xStart + 150, top: yStart + 25});
          var line3 = av.g.line(xStart + 240, 50 + yStart, 275 + xStart, 50 + yStart,
                    {"arrow-end": "classic-wide-long"});

        var dfaComponents = new Array(label1, label2, label3, label4, label5, label6, line1, line2, line3, circle, rec);
//Frame 1
av.umsg("We start with the simplest of our machines: The Deterministic Finite Acceptor (DFA). This machine can process an input string (shown on a tape) from left to right. There is a control unit (with states), behavior defined for what to do when in a given state and with a given symbol on the current square of the tape. All that we can \"do\" is change state before going to the next letter to the right. That is, an acceptor does not modify the contents of the tape.");
av.displayInit();
//Frame 2
av.umsg(Frames.addQuestion("q1"));
av.step();
//Frame 3
av.umsg("Correct! A DFA can only start at the left (the first letter of the input string) and move to the right (the last letter of the input string). ");
av.step();
//Frame 4
av.umsg(Frames.addQuestion("q3"));
av.step();
//Frame 5
av.umsg("Correct! A DFA can not modfiy the tape. It can only look at it or \"read\" it.");
av.step();
//Frame 6
av.umsg(Frames.addQuestion("q2"));
av.step();
//Frame 7
av.umsg(Frames.addQuestion("q5"));
av.step();
//Frame 8
av.umsg(Frames.addQuestion("q6"));
av.step();
//Frame 9
av.umsg(Frames.addQuestion("q7"));
av.step();
//Hide tape
tape.hide();
dfaComponents.forEach(obj => obj.hide());
//Frame 10
av.umsg(Frames.addQuestion("text"));
av.step();
//Frame 11
av.umsg(Frames.addQuestion("q4"));
av.step();
//Add New DFA from link
var urlbinaryDFA="../../../AV/VisFormalLang/FA/Machines/EvenBinaryDFACON.jff";
var binaryDFA= new av.ds.FA({center:true , url:urlbinaryDFA});
//Frame 12
av.umsg("Below is a graphical presentation for a DFA that accepts even binary numbers. Lets match it to terms in the formal defination of a DFA: $(Q, \\Sigma, \\delta, Q_0, F)$");
av.step();
//Frame 13
av.umsg(Frames.addQuestion("q8"));
av.step();
//Frame 14
av.umsg(Frames.addQuestion("q9"));
av.step();
//Frame 15
av.umsg("Correct! Remeber that even though we only have one final state in this example. $F$ is a SET of ALL states that are final states.");
av.step();
//Frame 16
av.umsg(Frames.addQuestion("q10"));
av.step();
//Frame 17
av.umsg(Frames.addQuestion("q11"));
av.step();
//Frame 18
av.umsg("For some machine M, the DFA below is same as the notation: M=$(Q,\\Sigma,\\delta,Q_0,F)$=$(\\{q0,q1\\},\\{0,1\\},\\delta,q_0,\\{q1\\})$");
av.step();
//Frame 19
av.umsg(Frames.addQuestion("q12"));
av.step();
//Frame 20
av.umsg(Frames.addQuestion("q13"));
av.step();
//Frame 21
av.umsg(Frames.addQuestion("q14"));
av.step();
//Frame 22
av.umsg(Frames.addQuestion("q15"));
av.step();
binaryDFA.hide();
//Add A new graphical DFA with no Trap State
var urllinknoTrapDFA="../../../AV/VisFormalLang/FA/Machines/DFA_noTrapState.jff";
var linknoTrapDFA= new av.ds.FA({center:true , url:urllinknoTrapDFA});
//Frame 23
av.umsg("The below DFA is an incomplete DFA. This means it does not show every possible transition from every state.");
av.step();
//Frame 24
av.umsg(Frames.addQuestion("q21"));
av.step();
linknoTrapDFA.hide();
//Add A new graphical DFA with no Trap State
var urllinkTrapDFA="../../../AV/VisFormalLang/FA/Machines/DFA_withTrapState.jff";
var linkTrapDFA= new av.ds.FA({center:true , url:urllinkTrapDFA});
//Frame 25
av.umsg("A new state called the trap state can be added. Any transition not defined goes to the trap state. Once the trap state is entered it will never trasition out of the trap state. The changes have been made to the DFA below.");
av.step();
//Frame 26
av.umsg(Frames.addQuestion("q22"));
av.step();
//Frame 27
av.umsg("Correct! Since incomplete DFAs can easily be turned complete by adding a trap state, we often leave them in thier incomplete forms to make it simpler to read.");
av.step();
linkTrapDFA.hide();
//Frame 28
av.umsg("Algorithm for DFA: <br /> Start in 'start state' with input on tape <br />q = current state <br />s = current symbol on tape <br />while (s != blank) do <br />  q = $\\delta$(q,s)  <br />   s = next symbol to the right on tape  <br /> if q $\\in$ F then accept");
av.step();
//Frame 29
av.umsg(Frames.addQuestion("text11"));
av.step();
binaryDFA.show();
//Setup DFA for questions following
 xStart = -100;
 yStart = 150;

  var node = binaryDFA.nodes();
  tape = av.ds.tape([1, 0, 0, "", "", "", ""], 300 + xStart, yStart + 20, "right", 0);
 var rect = av.g.rect(300 + xStart, 100 + yStart, 110, 80);
  var c1 = av.label("q0", {left: 320 + xStart, top: 105 + yStart});
  var c2 = av.label("q1", {left: 320 + xStart, top: 135 + yStart});
  var p3 = av.g.line(315 + xStart, 100 + yStart, 315 + xStart, 55 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var p4 = av.g.line(370 + xStart, 145 + yStart, 340 + xStart, 135 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var g = av.g.set(); // A set to hold the tape head graphical objects
var p10 = av.g.line(400 + xStart, 145 + yStart, 370 + xStart, 165 + yStart,
                      {"arrow-end": "classic-wide-long"});
  g.push(p10);
  g.push(rect);
  g.push(p3);
  g.push(p4);
  g.push(c1);
  g.push(c2);
p3.hide();
p4.hide();
p10.hide();
//Frame 30
av.umsg(Frames.addQuestion("q16"));
av.step();
//Highlight for step 1
p3.show();
p4.show();
  node[0].highlight();
//Frame 31
av.umsg(Frames.addQuestion("q17"));
av.step();
//Step 2 transitions
g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  tape.moveRight();
//Frame 32
av.umsg(Frames.addQuestion("q18"));
av.step();
//Step 3 Transitions
node[0].unhighlight();
  node[1].highlight();
  p4.hide();
  p10.show();
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  tape.moveRight();
//Frame 33
av.umsg(Frames.addQuestion("q19"));
av.step();
//Step 4: Transitions
  g.translateX(30);
  c2.translateX(30);
  c1.translateX(30);
  tape.moveRight();
//Frame 34
av.umsg("Step 4: The tape head shifts right one cell. The current state remains in q1. ");
av.step();
//Frame 35
av.umsg(Frames.addQuestion("q20"));
av.step();
//Frame 36
av.umsg("Since the current state is a final state, the string is accepted as being in the language.");
av.step();
//Frame 37
av.umsg("Complete.");
av.step();

av.recorded();
});
