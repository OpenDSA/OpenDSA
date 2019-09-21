// Odd Numbers Traces
//By Jeffrey Peng
$(document).ready(function() {
  "use strict";
  var av_name = "MachineTraceCON";
  //  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  //      interpret = config.interpreter;

  // Load the config object with interpreter and code created by odsaUtils.js
  var av;

  av = new JSAV(av_name);

  // Slide 0
  //Creates a bunch of JSAV objects and then grabs the nodes and highlights the first one

  var xStart = 150;
  var yStart = 0;
  av.umsg("In this example, we see how the machine head moves over the tape when processing input string '100'. Step 1: Initially, the tape head is at the leftmost tape cell with character '1', and the current state is q0");
  var p1 = av.label("1)", {left: 270 + xStart, top: 0 + yStart});
  var tapes = av.ds.tape([1, 0, 0, "", "", "", ""], 300 + xStart, yStart + 20, "right");
  var c0 = av.g.rect(300 + xStart, 100 + yStart, 110, 80);
  var c1 = av.label("q0", {left: 320 + xStart, top: 105 + yStart});
  var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryDFACON.jff";
  var c2 = av.label("q1", {left: 320 + xStart, top: 135 + yStart});
  var p3 = av.g.line(315 + xStart, 100 + yStart, 315 + xStart, 55 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var p4 = av.g.line(370 + xStart, 145 + yStart, 340 + xStart, 135 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var g = av.g.set(); 
  var binaryDFA = new av.ds.FA({left: 10, url: url});
  var acceptor = new TraverseAcceptor(av, binaryDFA);
  var node = binaryDFA.nodes();
  node[0].highlight();
  g.push(c0);
  g.push(p3);
  g.push(c1);
  g.push(c2);
  av.displayInit();

  // Slide 2
  // Move the JSAV objects right 30 units
  av.umsg("Step 2: The tape head shifts right one cell. The current state remains in q0.");
  var p5 = av.label("2)", {left: 270 + xStart, top: 0 + yStart});
  p1.hide();
  p4.translateX(30);
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  // Slide 3
  //Moves JSAV objects right 30 unites while unhighlighting node[0], and then highlight node[1]
  p4.hide();
  av.umsg("Step 3: The tape head shifts right one cell. The current state changes to q1.");
  var p8 = av.label("3)", {left: 270 + xStart, top: 0 + yStart});
  node[0].unhighlight();
  node[1].highlight();
  p5.hide();
  var p10 = av.g.line(400 + xStart, 145 + yStart, 370 + xStart, 165 + yStart,
                      {"arrow-end": "classic-wide-long"});
  p10.translateX(30);
  g.translateX(30);
  c1.translateX(30);
  c2.translateX(30);
  av.step();

  // Slide 4
  av.umsg("Step 4: The tape head shifts right one cell. The current state remains in q1. Since the last character of the string has now been processed, the machine is done with this input.");
  av.label("4)", {left: 270 + xStart, top: 0 + yStart});
  p8.hide();
  p10.translateX(30);
  g.translateX(30);
  c2.translateX(30);
  c1.translateX(30);
  av.step();
  av.recorded();
});
