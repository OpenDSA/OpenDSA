// Written by Jeffrey Peng and Cliff Shaffer, Fall 2019
$(document).ready(function() {
  "use strict";
  
  var av_name = "TManbncnCON";
  var xStart = 50;
  var yStart = 250;
  var av = new JSAV(av_name);

  av.umsg("Here is the graph form for the machine and the intial state of the input tape and the head.");
  var url = "../../../AV/VisFormalLang/TM/Machines/TManbncn.jff";
  var tm = new av.ds.TM({width: 610, height: 375, left: 50, url: url});
  var tape = av.ds.tape(["#", "a", "a", "b", "b", "c", "c", "#", "#"], 370, 300, "both");
  var rect = av.g.rect(350 + xStart, 150 + yStart, 30, 30);
  var p3 = av.g.line(365 + xStart, 150 + yStart, 365 + xStart, 85 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var g = av.g.set(); // A set to hold the tape head graphical objects
  var node = tm.nodes();
  g.push(rect);
  g.push(p3);
  av.displayInit();

  // Slide 2
  av.umsg("We will see how the machine processes input string 'aabbcc'.");
  av.step();

  // Slide 3
  av.umsg("Step 1: Initially, the tape head is scanning the leftmost non-blank tape cell, and the current state is q0");
  node[0].highlight();
  av.step();

  // Slide 4
  av.umsg("Step 2: The current cell value becomes A and the tape head shifts right one cell, scanning a. The current state remains q1.");
  g.translateX(30);
  av.ds.tape(["#", "A", "a", "b", "b", "c", "c", "#", "#"], 370, 300, "both");
  node[0].unhighlight();
  node[1].highlight();
  av.step();
  
  // Slide 5
  av.umsg("Step 3: The current cell value remains the same and the tape head shifts right one cell, scanning b. The current state remains q1.");
  g.translateX(30);
  av.ds.tape(["#", "A", "a", "b", "b", "c", "c", "#", "#"], 370, 300, "both");
  av.step();
  
  // Slide 6
  av.umsg("Step 4: The current cell value becomes B and the tape head shifts right one cell, scanning b. The current state changes to q2.");
  g.translateX(30);
  av.ds.tape(["#", "A", "a", "B", "b", "c", "c", "#", "#"], 370, 300, "both");
  node[1].unhighlight();
  node[2].highlight();
  av.step();
  
  // Slide 7
  av.umsg("Step 5: The current cell value remains the same and the tape head shifts right one cell, scanning c. The current state remains q2.");
  g.translateX(30);
  av.ds.tape(["#", "A", "a", "B", "b", "c", "c", "#", "#"], 370, 300, "both");
  av.step();
  
  // Slide 8
  av.umsg("Step 6: The current cell value becomes C and the tape head shifts left one cell, scanning b. The current state changes to q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
  node[2].unhighlight();
  node[3].highlight();
  av.step();

  //Slide 9
  av.umsg("Step 7: The current cell value remains the same and the tape head shifts left one cell, scanning B. The current state remains q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 10
  av.umsg("Step 8: The current cell value remains the same and the tape head shifts left one cell, scanning a. The current state remains q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 11
  av.umsg("Step 9: The current cell value remains the same and the tape head shifts left one cell, scanning A. The current state remains q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 12
  av.umsg("Step 10: The current cell value remains the same and the tape head shifts right one cell, scanning a. The current state changes to q0.");
  g.translateX(30);
  av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
  node[3].unhighlight();
  node[0].highlight();
  av.step();

  //Slide 13
  av.umsg("Step 11: The current cell value changes to A and the tape head shifts right one cell, scanning B. The current state changes to q1.");
  g.translateX(30);
  av.ds.tape(["#", "A", "A", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
  node[0].unhighlight();
  node[1].highlight();
  av.step();

  //Slide 14
  av.umsg("Step 12: The current cell value remains the same and the tape head shifts right one cell, scanning b. The current state remains q1.");
  g.translateX(30);
  av.ds.tape(["#", "A", "A", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 15
  av.umsg("Step 13: The current cell value remains the same and the tape head shifts right one cell, scanning c. The current state changes to q2.");
  g.translateX(30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "c", "#", "#"], 370, 300, "both");
  node[1].unhighlight();
  node[2].highlight();
  av.step();

  //Slide 16
  av.umsg("Step 14: The current cell value remains the same and the tape head shifts right one cell, scanning c. The current state remains q2.");
  g.translateX(30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "c", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 17
  av.umsg("Step 15: The current cell value becomes C and the tape head shifts left one cell, scanning C. The current state changes to q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "#", "#"], 370, 300, "both");
  node[2].unhighlight();
  node[3].highlight();
  av.step();

  //Slide 18
  av.umsg("Step 16: The current cell value remains the same and the tape head shifts left one cell, scanning B. The current state remains q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 19
  av.umsg("Step 17: The current cell value remains the same and the tape head shifts left one cell, scanning B. The current state remains q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 20
  av.umsg("Step 18: The current cell value remains the same and the tape head shifts left one cell, scanning A. The current state remains q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 21
  av.umsg("Step 19: The current cell value remains the same and the tape head shifts right one cell, scanning B. The current state changes to q0.");
  g.translateX(30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "#", "#"], 370, 300, "both");
  node[3].unhighlight();
  node[0].highlight();
  av.step();

  //Slide 22
  av.umsg("Step 20: The current cell value remains the same and the tape head shifts right one cell, scanning B. The current state changes to q4.");
  g.translateX(30);
  node[0].unhighlight();
  node[4].highlight();
  av.step();

  //Slide 23
  av.umsg("Step 21: The current cell value remains the same and the tape head shifts right one cell, scanning C. The current state remains q4.");
  g.translateX(30);
  av.step();
  
  //Slide 24
  av.umsg("Step 22: The current cell value remains the same and the tape head shifts right one cell, scanning C. The current state remains q4.");
  g.translateX(30);
  av.step();

  //Slide 25
  av.umsg("Step 23: The current cell value remains the same and the tape head shifts right one cell, scanning #. The current state remains q4.");
  g.translateX(30);
  av.step();

  //Slide 26
  av.umsg("Step 24: The current cell value remains the same and the tape head shifts left one cell, scanning C. The current state changes to q5.");
  g.translateX(-30);
  node[4].unhighlight();
  node[5].highlight();
  av.step();

  //Slide 27
  av.umsg("Step 25: The current cell value changes to c and the tape head shifts left one cell, scanning C. The current state remains q5.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "c", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 28
  av.umsg("Step 26: The current cell value changes to c and the tape head shifts left one cell, scanning B. The current state remains q5.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "A", "B", "B", "c", "c", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 29
  av.umsg("Step 27: The current cell value changes to b and the tape head shifts left one cell, scanning B. The current state remains q5.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "A", "B", "b", "c", "c", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 30
  av.umsg("Step 28: The current cell value changes to b and the tape head shifts left one cell, scanning A. The current state remains q5.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "A", "b", "b", "c", "c", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 31
  av.umsg("Step 29: The current cell value changes to a and the tape head shifts left one cell, scanning A. The current state remains q5.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "a", "b", "b", "c", "c", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 32
  av.umsg("Step 30: The current cell value changes to a and the tape head shifts left one cell, scanning #. The current state remains q5.");
  g.translateX(-30);
  av.ds.tape(["#", "a", "a", "b", "b", "c", "c", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 33
  av.umsg("Step 31: The current cell value remains the same and the tape head shifts right one cell, scanning a.");
  g.translateX(30);
  node[5].unhighlight();
  node[6].highlight();
  av.step();

  //Slide 34
  av.umsg("Step 32: There is no transition from state q6 for cell value a, so the machine halts. Since q6 is a final state, the string is accepted.");
  av.step();

  //Slide 35
  av.umsg("We will see how the machine processes input string 'dddddd'.");
  node[6].unhighlight();
  node[0].highlight();
  av.ds.tape(["#", "d", "d", "d", "d", "d", "d", "#", "#"], 370, 300, "both");
  av.step();

  //Slide 36
  av.umsg("Step 1: Initially, the tape head is scanning the leftmost non-blank tape cell, and the current state is q0");
  av.step();

  //Slide 37
  av.umsg("Step 2: There is no transition from state q0 for cell value d, so the machine halts. Since q0 is not a final state, the string is rejected.");
  av.step();
  
  //Slide 38
  av.umsg("We will see how the machine processes input string 'aabbccc'.");
  node[0].highlight();
  av.ds.tape(["#", "a", "a", "b", "b", "c", "c", "c", "#"], 370, 300, "both");
  av.step();

  av.umsg("Step 1: Initially, the tape head is scanning the leftmost non-blank tape cell, and the current state is q0");
  av.step();

  av.umsg("Step 2: The tape head shifts right one cell. The previous cell turns into an A and the current state remains in q1.");
  g.translateX(30);
  av.ds.tape(["#", "A", "a", "b", "b", "c", "c", "c", "#"], 370, 300, "both");
  node[0].unhighlight();
  node[1].highlight();
  av.step();

  av.umsg("Step 3: The tape head shifts right one cell. The tape value stays the same and the current state remains in q1.");
  g.translateX(30);
  av.ds.tape(["#", "A", "a", "b", "b", "c", "c", "c", "#"], 370, 300, "both");
  xStart = xStart + 30;
  av.step();
  
  av.umsg("Step 4: The tape head shifts right one cell.  The previous cell turns into a B and the current state changes to q2.");
  g.translateX(30);
  av.ds.tape(["#", "A", "a", "B", "b", "c", "c", "c", "#"], 370, 300, "both");
  node[1].unhighlight();
  node[2].highlight();
  av.step();

  av.umsg("Step 5: The tape head shifts right one cell to the value of c.  The previous cell stays the same and the current state remains in q2.");
  g.translateX(30);
  av.ds.tape(["#", "A", "a", "B", "b", "c", "c", "c", "#"], 370, 300, "both");
  av.step();

  av.umsg("Step 6: The tape head shifts left one cell to the value of b.  The previous cell stays the same and current state changes to q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
  node[2].unhighlight();
  node[3].highlight();
  av.step();

  av.umsg("Step 7: The tape head shifts left one cell to the value of B.  The previous cell stays the same and current state remains q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
  av.step();

  av.umsg("Step 8: The tape head shifts left one cell to the value of a.  The previous cell stays the same and current state remains q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
  av.step();
  
  av.umsg("Step 9: The tape head shifts left one cell to the value of A.  The previous cell stays the same and current state remains q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
  av.step();
  
  av.umsg("Step 10: The tape head shifts right one cell to the value of a.  The previous cell stays the same and the current state changes in q0.");
  g.translateX(30);
  av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
  node[3].unhighlight();
  node[0].highlight();
  av.step();
  
  av.umsg("Step 11: The tape head shifts right one cell to the value of B.  The previous cell turns into an A and the current state remains in q1.");
  g.translateX(30);
  av.ds.tape(["#", "A", "A", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
  node[0].unhighlight();
  node[1].highlight();
  av.step();
  
  av.umsg("Step 12: The tape head shifts right one cell to the value of b.  The previous cell stays the same and the current state remains in q1.");
  g.translateX(30);
  av.ds.tape(["#", "A", "A", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
  av.step();
  
  av.umsg("Step 13: The tape head shifts right one cell to the value of C.  The previous cell changes to C and the current state changes to to q2.");
  g.translateX(30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "c", "c", "#"], 370, 300, "both");
  node[1].unhighlight();
  node[2].highlight();
  yStart = yStart + 30;
  av.step();
  
  av.umsg("Step 14: The tape head shifts right one cell to the value of c.  The previous cell stays the same and the current state remains in q2.");
  g.translateX(30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "c", "c", "#"], 370, 300, "both");
  av.step();
  
  av.umsg("Step 15: The tape head shifts right one cell to the value of C. The previous cell changes to a value of C and the current state changes q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "c", "#"], 370, 300, "both");
  node[2].unhighlight();
  node[3].highlight();
  av.step();
  
  av.umsg("Step 16: The tape head shifts left one cell to the value of C.  The previous cell turns into a C and the current state changes to q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "c", "#"], 370, 300, "both");
  av.step();
  
  av.umsg("Step 17: The tape head shifts left one cell to the value of B.  The previous cell remains the same and the current state remains in q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "c", "#"], 370, 300, "both");
  av.step();
  
  av.umsg("Step 18: The tape head shifts left one cell to the value of B.  The previous cell remains the same and the current state remains in q3.");
  g.translateX(-30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "c", "#"], 370, 300, "both");
  av.step();
  
  av.umsg("Step 19: The tape head shifts right one cell to the value of B.  The previous cell remains the same and the current state changes to q4.");
  g.translateX(30);
  av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "c", "#"], 370, 300, "both");
  node[3].unhighlight();
  node[0].highlight();
  av.step();
  
  av.umsg("Step 20: The tape head shifts right one cell to the value of B.  The previous cell remains the same and the current state remains q4.");
  g.translateX(30);
  node[0].unhighlight();
  node[4].highlight();
  av.step();
  
  av.umsg("Step 21: The tape head shifts right one cell to the value of C.  The previous cell remains the same and the current state remains q4.");
  g.translateX(30);
  av.step();
  
  av.umsg("Step 22: The tape head shifts right one cell to the value of C.  The previous cell remains the same and the current state remains q4.");
  g.translateX(30);
  av.step();
  
  //Slide 34
  av.umsg("Step 23: There is no transition from state q4 for cell value c, so the machine halts. Since q4 is not a final state, the string is rejected.");
  g.translateX(30);
  av.step();
  
  av.recorded();
});


