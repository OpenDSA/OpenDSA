// Even Numbers Acceptor: Trace
// Jeffrey Peng, Fall 2019
$(document).ready(function() {
  "use strict";
  var av_name = "MachineTraceCON";
  var av = new JSAV(av_name);

  // Slide 1
  var xStart = 150;
  var yStart = 0;
  av.umsg("In this example, we see how the machine head moves over the tape when processing input string '100'.");
  var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryDFACON.jff";
  var binaryDFA = new av.ds.FA({left: 10, url: url});
  var node = binaryDFA.nodes();
  var tape = av.ds.tape([1, 0, 0, "", "", "", ""], 300 + xStart, yStart + 20, "right", 0);
  var rect = av.g.rect(300 + xStart, 100 + yStart, 110, 80);
  var c1 = av.label("q0", {left: 320 + xStart, top: 105 + yStart});
  var c2 = av.label("q1", {left: 320 + xStart, top: 135 + yStart});
  var p3 = av.g.line(315 + xStart, 100 + yStart, 315 + xStart, 55 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var p4 = av.g.line(370 + xStart, 145 + yStart, 340 + xStart, 135 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var g = av.g.set(); // A set to hold the tape head graphical objects
  g.push(rect);
  g.push(p3);
  g.push(p4);
  g.push(c1);
  g.push(c2);
  av.displayInit();

  // Slide 2
  av.umsg("Step 1: Initially, the tape head is at the leftmost tape cell with character '1', and the current state is q0");
  node[0].highlight();
  av.step();

  // Slide 3
  // Move the tape head objects right 30 units
  av.umsg("Step 2: The tape head shifts right one cell. The current state remains in q0.");
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  tape.moveRight();
  av.step();

  // Slide 4
  av.umsg("Step 3: The tape head shifts right one cell. The current state changes to q1.");
  node[0].unhighlight();
  node[1].highlight();
  p4.hide();
  var p10 = av.g.line(400 + xStart, 145 + yStart, 370 + xStart, 165 + yStart,
                      {"arrow-end": "classic-wide-long"});
  g.push(p10);
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  tape.moveRight();
  av.step();

  // Slide 5
  av.umsg("Step 4: The tape head shifts right one cell. The current state remains in q1. Since the last character of the string has now been processed, the machine is done with this input. Since the current state is a final state, the string is accepted as being in the language.");
  g.translateX(30);
  c2.translateX(30);
  c1.translateX(30);
  tape.moveRight();
  av.recorded();
});
