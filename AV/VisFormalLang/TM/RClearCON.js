// Written by Jeffrey Peng, Fall 2019
$(document).ready(function() {
  "use strict";

  var av_name = "RClearCON";
  var xStart = 150;
  var yStart = 0;
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg("Here we see a Turing Machine's states and transitions presented in the form of a graph. We also see the tape and the head when beginning to process input string 'aaaa'.");
  var url = "../../../AV/VisFormalLang/TM/Machines/TMexample1.jff";
  var tm = new av.ds.TM({width: 600, height: 200, left: 50, url: url});
  av.ds.tape(["#", "a", "a", "a", "a", "#", "#", "#"], 470, 50, "both");
  var rect = av.g.rect(350 + xStart, 150 + yStart, 110, 80);
  var c1 = av.label("q0", {left: 370 + xStart, top: 155 + yStart});
  var c2 = av.label("q1", {left: 370 + xStart, top: 185 + yStart});
  var p3 = av.g.line(365 + xStart, 150 + yStart, 365 + xStart, 85 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var p4 = av.g.line(420 + xStart, 195 + yStart, 390 + xStart, 185 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var g = av.g.set(); // A set to hold the tape head graphical objects
  var node = tm.nodes();
  g.push(rect);
  g.push(p3);
  g.push(p4);
  g.push(c1);
  g.push(c2);
  av.displayInit();

  // Slide 2
  av.umsg("Step 1: Initially, the tape head is scanning the leftmost non-blank tape cell, and the current state is q0");
  node[0].highlight();
  av.step();

  // Slide 3
  av.umsg("Step 2: The tape head shifts right one cell. The previous cell turns into a blank or # and the current state remains in q0.");
  g.translateX(30);
  c1.translateX(30);
  av.ds.tape(["#", "#", "a", "a", "a", "#", "#", "#"], 470, 50, "right");
  c2.translateX(30);
  av.step();

  // Slide 4
  av.umsg("Step 3: The tape head shifts right one cell.  The previous cell turns into a blank or # and the current state remains in q0.");
  g.translateX(30);
  c1.translateX(30);
  av.ds.tape(["#", "#", "#", "a", "a", "#", "#", "#"], 470, 50, "right");
  c2.translateX(30);
  av.step();

  // Slide 5
  av.umsg("Step 4: The tape head shifts right one cell.  The previous cell turns into a blank or # and the current state remains in q0.");
  g.translateX(30);
  c1.translateX(30);
  av.ds.tape(["#", "#", "#", "#", "a", "#", "#", "#"], 470, 50, "right");
  c2.translateX(30);
  av.step();

  // Slide 6
  av.umsg("Step 5: The tape head shifts right one cell to the value of #.  The previous cell turns into a blank or # and the current state remains in q0.");
  g.translateX(30);
  c1.translateX(30);
  av.ds.tape(["#", "#", "#", "#", "#", "#", "#", "#"], 470, 50, "right");
  c2.translateX(30);
  av.step();

  // Slide 7
  av.umsg("Step 6: The tape head stays on the current cell. The current state changes to q1. Since q1 is a member of the Final State set $F$, the machine immediately halts.");
  p4.hide();
  av.g.line(540 + xStart, 195 + yStart, 510 + xStart, 212 + yStart,
            {"arrow-end": "classic-wide-long"});
  node[0].unhighlight();
  node[1].highlight();
  av.recorded();
});
