// Written by Jeffrey Peng, Fall 2019
$(document).ready(function() {
    "use strict";
  
    var av_name = "TManbncnCON";
    var xStart = 50;
    var yStart = 250;
    var av = new JSAV(av_name);

  av.umsg("Here we see a Turing Machine's states and transitions presented in the form of a graph. We also see the tape and the head when beginning to process input string 'aabbcc'.");
  var url = "../../../AV/VisFormalLang/TM/Machines/TManbncn.jff";
  var tm = new av.ds.TM({width: 610, height: 525, left: 50, url: url});
  av.ds.tape(["#", "a", "a", "b", "b", "c", "c", "#", "#"], 370, 300, "both");
  var rect = av.g.rect(350 + xStart, 150 + yStart, 110, 230);
  var c1 = av.label("q0", {left: 370 + xStart, top: 155 + yStart});
  var c2 = av.label("q1", {left: 370 + xStart, top: 185 + yStart});
  var c3 = av.label("q2", {left: 370 + xStart, top: 215 + yStart});
  var c4 = av.label("q3", {left: 370 + xStart, top: 245 + yStart});
  var c5 = av.label("q4", {left: 370 + xStart, top: 275 + yStart});
  var c6 = av.label("q5", {left: 370 + xStart, top: 305 + yStart});
  var c7 = av.label("q6", {left: 370 + xStart, top: 335 + yStart});
  var p3 = av.g.line(365 + xStart, 150 + yStart, 365 + xStart, 85 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var p4 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
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
    av.umsg("Step 2: The tape head shifts right one cell. The previous cell turns into an A and the current state remains in q1.");
    g.translateX(30);
    c1.translateX(30);;
    av.ds.tape(["#", "A", "a", "b", "b", "c", "c", "#", "#"], 370, 300, "both");
    node[0].unhighlight();
    node[1].highlight();
    yStart = yStart + 30;
    xStart = xStart + 30;
    p4.hide();
    var p5 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
      {"arrow-end": "classic-wide-long"});
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    av.step();
  
    // Slide 4
    av.umsg("Step 3: The tape head shifts right one cell. The tape value stays the same and the current state remains in q1.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "A", "a", "b", "b", "c", "c", "#", "#"], 370, 300, "both");
    xStart = xStart + 30;
    p5.translateX(30);
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    av.step();
  
    // Slide 5
    av.umsg("Step 4: The tape head shifts right one cell.  The previous cell turns into a B and the current state changes to q2.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "A", "a", "B", "b", "c", "c", "#", "#"], 370, 300, "both");
    node[1].unhighlight();
    node[2].highlight();
    p5.hide();
    yStart = yStart + 30;
    xStart = xStart + 30;
    var p6 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
      {"arrow-end": "classic-wide-long"});
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    av.step();
  
    // Slide 6
    av.umsg("Step 5: The tape head shifts right one cell to the value of c.  The previous cell stays the same and the current state remains in q2.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "A", "a", "B", "b", "c", "c", "#", "#"], 370, 300, "both");
    xStart = xStart + 30;
    p6.translateX(30);
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    av.step();
  
    // Slide 7
    av.umsg("Step 6: The tape head shifts left one cell to the value of b.  The previous cell stays the same and current state changes to q3.");
    g.translateX(-30);
    c1.translateX(-30);
    av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
    node[2].unhighlight();
    node[3].highlight();
    p6.hide();
    yStart = yStart + 30;
    xStart = xStart - 30;
    var p7 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
      {"arrow-end": "classic-wide-long"});
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    av.step();

    //Slide 8
    av.umsg("Step 7: The tape head shifts left one cell to the value of B.  The previous cell stays the same and current state remains q3.");
    g.translateX(-30);
    c1.translateX(-30);
    av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
    xStart = xStart - 30;
    p7.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    av.step();

    //Slide 9
    av.umsg("Step 8: The tape head shifts left one cell to the value of a.  The previous cell stays the same and current state remains q3.");
    g.translateX(-30);
    c1.translateX(-30);
    av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
    xStart = xStart - 30;
    p7.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    av.step();

    //Slide 10
    av.umsg("Step 9: The tape head shifts left one cell to the value of A.  The previous cell stays the same and current state remains q3.");
    g.translateX(-30);
    c1.translateX(-30);
    av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
    xStart = xStart - 30;
    p7.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    av.step();

    //Slide 11
    av.umsg("Step 10: The tape head shifts right one cell to the value of a.  The previous cell stays the same and the current state changes in q0.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
    node[3].unhighlight();
    node[0].highlight();
    p7.hide();
    yStart = yStart - 90;
    xStart = xStart + 30;
    var p8 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
      {"arrow-end": "classic-wide-long"});
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    av.step();

    //Slide 11
    av.umsg("Step 11: The tape head shifts right one cell to the value of B.  The previous cell turns into an A and the current state remains in q1.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "A", "A", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
    node[0].unhighlight();
    node[1].highlight();
    p8.hide();
    yStart = yStart + 30;
    xStart = xStart + 30;
    var p9 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
      {"arrow-end": "classic-wide-long"});
    p4.translateY(30);
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    av.step();

    //Slide 11
    av.umsg("Step 12: The tape head shifts right one cell to the value of b.  The previous cell stays the same and the current state remains in q1.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "A", "A", "B", "b", "C", "c", "#", "#"], 370, 300, "both");
    xStart = xStart + 30;
    p9.translateX(30);
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    av.step();

    //Slide 11
    av.umsg("Step 13: The tape head shifts right one cell to the value of C.  The previous cell changes to C and the current state changes to to q2.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "A", "A", "B", "B", "C", "c", "#", "#"], 370, 300, "both");
    node[1].unhighlight();
    node[2].highlight();
    p9.hide();
    yStart = yStart + 30;
    xStart = xStart + 30;
    var p10 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
      {"arrow-end": "classic-wide-long"});
    p4.translateY(30);
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    av.step();

    //Slide 11
    av.umsg("Step 14: The tape head shifts right one cell to the value of c.  The previous cell stays the same and the current state remains in q2.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "A", "A", "B", "B", "C", "c", "#", "#"], 370, 300, "both");
    xStart = xStart + 30;
    p10.translateX(30);
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    av.step();

    //Slide 11
    av.umsg("Step 15: The tape head shifts right one cell to the value of C. The previous cell changes to a value of C and the current state changes q3.");
    g.translateX(-30);
    c1.translateX(-30);
    av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "#", "#"], 370, 300, "both");
    node[2].unhighlight();
    node[3].highlight();
    p10.hide();
    yStart = yStart + 30;
    xStart = xStart - 30;
    var p11 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
      {"arrow-end": "classic-wide-long"});
    p4.translateY(30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    av.step();

    av.umsg("Step 16: The tape head shifts left one cell to the value of C.  The previous cell turns into a C and the current state changes to q3.");
    g.translateX(-30);
    c1.translateX(-30);
    av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "#", "#"], 370, 300, "both");
    xStart = xStart - 30;
    p11.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    av.step();

    av.umsg("Step 17: The tape head shifts left one cell to the value of B.  The previous cell remains the same and the current state remains in q3.");
    g.translateX(-30);
    c1.translateX(-30);
    av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "#", "#"], 370, 300, "both");
    xStart = xStart - 30;
    p11.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    av.step();

    av.umsg("Step 18: The tape head shifts left one cell to the value of B.  The previous cell remains the same and the current state remains in q3.");
    g.translateX(-30);
    c1.translateX(-30);
    av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "#", "#"], 370, 300, "both");
    xStart = xStart - 30;
    p11.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    av.step();

    av.umsg("Step 19: The tape head shifts right one cell to the value of B.  The previous cell remains the same and the current state changes to q4.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "#", "#"], 370, 300, "both");
    node[3].unhighlight();
    node[0].highlight();
    p11.hide();
    yStart = yStart - 90;
    xStart = xStart + 30;
    var p12 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
      {"arrow-end": "classic-wide-long"});
    p4.translateY(-90);
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    av.step();

    av.umsg("Step 20: The tape head shifts right one cell to the value of B.  The previous cell remains the same and the current state remains q4.");
    g.translateX(30);
    c1.translateX(30);
    node[0].unhighlight();
    node[4].highlight();
    p12.hide();
    yStart = yStart + 120;
    xStart = xStart + 30;
    var p13 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
      {"arrow-end": "classic-wide-long"});
    p4.translateY(120);
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    av.step();

    av.umsg("Step 21: The tape head shifts right one cell to the value of C.  The previous cell remains the same and the current state remains q4.");
    g.translateX(30);
    c1.translateX(30);
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    xStart = xStart + 30;
    p13.translateX(30);
    av.step();
    
    av.umsg("Step 22: The tape head shifts right one cell to the value of C.  The previous cell remains the same and the current state remains q4.");
    g.translateX(30);
    c1.translateX(30);
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    xStart = xStart + 30;
    p13.translateX(30);
    av.step();

    av.umsg("Step 23: The tape head shifts right one cell to the value of #.  The previous cell remains the same and the current state remains q4.");
    g.translateX(30);
    c1.translateX(30);
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    xStart = xStart + 30;
    p13.translateX(30);
    av.step();

    av.umsg("Step 24: The tape head shifts left one cell to the value of C.  The previous cell remains the same and the current state changes to q5.");
    g.translateX(-30);
    c1.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    node[4].unhighlight();
    node[5].highlight();
    p13.hide();
    yStart = yStart + 30;
    xStart = xStart - 30;
    var p14 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
      {"arrow-end": "classic-wide-long"});
    av.step();

    av.umsg("Step 25: The tape head shifts left one cell to the value of C.  The previous cell changes to c and the current state remains q5.");
    g.translateX(-30);
    c1.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    av.ds.tape(["#", "A", "A", "B", "B", "C", "c", "#", "#"], 370, 300, "both");
    xStart = xStart - 30;
    p14.translateX(-30);
    av.step();

    av.umsg("Step 26: The tape head shifts left one cell to the value of B.  The previous cell changes to a value of c and the current state remains q5.");
    g.translateX(-30);
    c1.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    xStart = xStart - 30;
    p14.translateX(-30);
    av.ds.tape(["#", "A", "A", "B", "B", "c", "c", "#", "#"], 370, 300, "both");
    av.step();

    av.umsg("Step 27: The tape head shifts left one cell to the value of B.  The previous cell changes to a value of b and the current state remains q5.");
    g.translateX(-30);
    c1.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    xStart = xStart - 30;
    p14.translateX(-30);
    av.ds.tape(["#", "A", "A", "B", "b", "c", "c", "#", "#"], 370, 300, "both");
    av.step();

    av.umsg("Step 28: The tape head shifts left one cell to the value of A.  The previous cell changes to a value of b and the current state remains q5.");
    g.translateX(-30);
    c1.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    xStart = xStart - 30;
    p14.translateX(-30);
    av.ds.tape(["#", "A", "A", "b", "b", "c", "c", "#", "#"], 370, 300, "both");
    av.step();

    av.umsg("Step 29: The tape head shifts left one cell to the value of A.  The previous cell changes to a value of a and the current state remains q5.");
    g.translateX(-30);
    c1.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    xStart = xStart - 30;
    p14.translateX(-30);
    av.ds.tape(["#", "A", "a", "b", "b", "c", "c", "#", "#"], 370, 300, "both");
    av.step();

    av.umsg("Step 30: The tape head shifts left one cell to the value of #.  The previous cell changes to a value of a and the current state remains q5.");
    g.translateX(-30);
    c1.translateX(-30);
    c2.translateX(-30);
    c3.translateX(-30);
    c4.translateX(-30);
    c5.translateX(-30);
    c6.translateX(-30);
    c7.translateX(-30);
    xStart = xStart - 30;
    p14.translateX(-30);
    av.ds.tape(["#", "a", "a", "b", "b", "c", "c", "#", "#"], 370, 300, "both");
    av.step();

    av.umsg("Step 31: The tape head shifts right one cell to the value of a.  The previous cell stays the same and the current state changes to q6.");
    g.translateX(30);
    c1.translateX(30);
    c2.translateX(30);
    c3.translateX(30);
    c4.translateX(30);
    c5.translateX(30);
    c6.translateX(30);
    c7.translateX(30);
    p4.translateY(30);
    node[5].unhighlight();
    node[6].highlight();
    p14.hide();
    yStart = yStart + 30;
    xStart = xStart + 30;
    var p15 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
      {"arrow-end": "classic-wide-long"});
    av.step();

    av.umsg("Step 1: Now let's imagine a new situation of 'dddddd' instead");
    node[6].unhighlight();
    node[0].highlight();
    p15.hide();
    av.ds.tape(["#", "d", "d", "d", "d", "d", "d", "#", "#"], 370, 300, "both");
    yStart = yStart - 180;
    var p16 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
      {"arrow-end": "classic-wide-long"});
    av.step();

    av.umsg("Step 2: Since this situtation can't either go to state q1 or state q4, the process ends");
    av.step();
    
    av.umsg("Step 1: The new input string is 'aabbccc'. Initially, the tape head is scanning the leftmost non-blank tape cell, and the current state is q0");
    node[0].highlight();
    av.ds.tape(["#", "a", "a", "b", "b", "c", "c", "c", "#"], 370, 300, "both");
    av.step();

      av.umsg("Step 2: The tape head shifts right one cell. The previous cell turns into an A and the current state remains in q1.");
      g.translateX(30);
      p16.hide();
      c1.translateX(30);;
      av.ds.tape(["#", "A", "a", "b", "b", "c", "c", "c", "#"], 370, 300, "both");
      node[0].unhighlight();
      node[1].highlight();
      yStart = yStart + 30;
      xStart = xStart + 30;
      p4.hide();
      var p5 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
        {"arrow-end": "classic-wide-long"});
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      av.step();

      av.umsg("Step 3: The tape head shifts right one cell. The tape value stays the same and the current state remains in q1.");
      g.translateX(30);
      c1.translateX(30);
      av.ds.tape(["#", "A", "a", "b", "b", "c", "c", "c", "#"], 370, 300, "both");
      xStart = xStart + 30;
      p5.translateX(30);
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      av.step();
    
      av.umsg("Step 4: The tape head shifts right one cell.  The previous cell turns into a B and the current state changes to q2.");
      g.translateX(30);
      c1.translateX(30);
      av.ds.tape(["#", "A", "a", "B", "b", "c", "c", "c", "#"], 370, 300, "both");
      node[1].unhighlight();
      node[2].highlight();
      p5.hide();
      yStart = yStart + 30;
      xStart = xStart + 30;
      var p6 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
        {"arrow-end": "classic-wide-long"});
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      av.step();

      av.umsg("Step 5: The tape head shifts right one cell to the value of c.  The previous cell stays the same and the current state remains in q2.");
      g.translateX(30);
      c1.translateX(30);
      av.ds.tape(["#", "A", "a", "B", "b", "c", "c", "c", "#"], 370, 300, "both");
      xStart = xStart + 30;
      p6.translateX(30);
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      av.step();

      av.umsg("Step 6: The tape head shifts left one cell to the value of b.  The previous cell stays the same and current state changes to q3.");
      g.translateX(-30);
      c1.translateX(-30);
      av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
      node[2].unhighlight();
      node[3].highlight();
      p6.hide();
      yStart = yStart + 30;
      xStart = xStart - 30;
      var p7 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
        {"arrow-end": "classic-wide-long"});
      c2.translateX(-30);
      c3.translateX(-30);
      c4.translateX(-30);
      c5.translateX(-30);
      c6.translateX(-30);
      c7.translateX(-30);
      av.step();

      av.umsg("Step 7: The tape head shifts left one cell to the value of B.  The previous cell stays the same and current state remains q3.");
      g.translateX(-30);
      c1.translateX(-30);
      av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
      xStart = xStart - 30;
      p7.translateX(-30);
      c2.translateX(-30);
      c3.translateX(-30);
      c4.translateX(-30);
      c5.translateX(-30);
      c6.translateX(-30);
      c7.translateX(-30);
      av.step();

      av.umsg("Step 8: The tape head shifts left one cell to the value of a.  The previous cell stays the same and current state remains q3.");
      g.translateX(-30);
      c1.translateX(-30);
      av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
      xStart = xStart - 30;
      p7.translateX(-30);
      c2.translateX(-30);
      c3.translateX(-30);
      c4.translateX(-30);
      c5.translateX(-30);
      c6.translateX(-30);
      c7.translateX(-30);
      av.step();
  
      av.umsg("Step 9: The tape head shifts left one cell to the value of A.  The previous cell stays the same and current state remains q3.");
      g.translateX(-30);
      c1.translateX(-30);
      av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
      xStart = xStart - 30;
      p7.translateX(-30);
      c2.translateX(-30);
      c3.translateX(-30);
      c4.translateX(-30);
      c5.translateX(-30);
      c6.translateX(-30);
      c7.translateX(-30);
      av.step();
  
      av.umsg("Step 10: The tape head shifts right one cell to the value of a.  The previous cell stays the same and the current state changes in q0.");
      g.translateX(30);
      c1.translateX(30);
      av.ds.tape(["#", "A", "a", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
      node[3].unhighlight();
      node[0].highlight();
      p7.hide();
      yStart = yStart - 90;
      xStart = xStart + 30;
      var p8 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
        {"arrow-end": "classic-wide-long"});
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      av.step();
  
      av.umsg("Step 11: The tape head shifts right one cell to the value of B.  The previous cell turns into an A and the current state remains in q1.");
      g.translateX(30);
      c1.translateX(30);
      av.ds.tape(["#", "A", "A", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
      node[0].unhighlight();
      node[1].highlight();
      p8.hide();
      yStart = yStart + 30;
      xStart = xStart + 30;
      var p9 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
        {"arrow-end": "classic-wide-long"});
      p4.translateY(30);
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      av.step();
  
      av.umsg("Step 12: The tape head shifts right one cell to the value of b.  The previous cell stays the same and the current state remains in q1.");
      g.translateX(30);
      c1.translateX(30);
      av.ds.tape(["#", "A", "A", "B", "b", "C", "c", "c", "#"], 370, 300, "both");
      xStart = xStart + 30;
      p9.translateX(30);
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      av.step();
  
      av.umsg("Step 13: The tape head shifts right one cell to the value of C.  The previous cell changes to C and the current state changes to to q2.");
      g.translateX(30);
      c1.translateX(30);
      av.ds.tape(["#", "A", "A", "B", "B", "C", "c", "c", "#"], 370, 300, "both");
      node[1].unhighlight();
      node[2].highlight();
      p9.hide();
      yStart = yStart + 30;
      xStart = xStart + 30;
      var p10 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
        {"arrow-end": "classic-wide-long"});
      p4.translateY(30);
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      av.step();
  
      av.umsg("Step 14: The tape head shifts right one cell to the value of c.  The previous cell stays the same and the current state remains in q2.");
      g.translateX(30);
      c1.translateX(30);
      av.ds.tape(["#", "A", "A", "B", "B", "C", "c", "c", "#"], 370, 300, "both");
      xStart = xStart + 30;
      p10.translateX(30);
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      av.step();
  
      av.umsg("Step 15: The tape head shifts right one cell to the value of C. The previous cell changes to a value of C and the current state changes q3.");
      g.translateX(-30);
      c1.translateX(-30);
      av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "c", "#"], 370, 300, "both");
      node[2].unhighlight();
      node[3].highlight();
      p10.hide();
      yStart = yStart + 30;
      xStart = xStart - 30;
      var p11 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
        {"arrow-end": "classic-wide-long"});
      p4.translateY(30);
      c2.translateX(-30);
      c3.translateX(-30);
      c4.translateX(-30);
      c5.translateX(-30);
      c6.translateX(-30);
      c7.translateX(-30);
      av.step();
  
      av.umsg("Step 16: The tape head shifts left one cell to the value of C.  The previous cell turns into a C and the current state changes to q3.");
      g.translateX(-30);
      c1.translateX(-30);
      av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "c", "#"], 370, 300, "both");
      xStart = xStart - 30;
      p11.translateX(-30);
      c2.translateX(-30);
      c3.translateX(-30);
      c4.translateX(-30);
      c5.translateX(-30);
      c6.translateX(-30);
      c7.translateX(-30);
      av.step();
  
      av.umsg("Step 17: The tape head shifts left one cell to the value of B.  The previous cell remains the same and the current state remains in q3.");
      g.translateX(-30);
      c1.translateX(-30);
      av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "c", "#"], 370, 300, "both");
      xStart = xStart - 30;
      p11.translateX(-30);
      c2.translateX(-30);
      c3.translateX(-30);
      c4.translateX(-30);
      c5.translateX(-30);
      c6.translateX(-30);
      c7.translateX(-30);
      av.step();
  
      av.umsg("Step 18: The tape head shifts left one cell to the value of B.  The previous cell remains the same and the current state remains in q3.");
      g.translateX(-30);
      c1.translateX(-30);
      av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "c", "#"], 370, 300, "both");
      xStart = xStart - 30;
      p11.translateX(-30);
      c2.translateX(-30);
      c3.translateX(-30);
      c4.translateX(-30);
      c5.translateX(-30);
      c6.translateX(-30);
      c7.translateX(-30);
      av.step();
  
      av.umsg("Step 19: The tape head shifts right one cell to the value of B.  The previous cell remains the same and the current state changes to q4.");
      g.translateX(30);
      c1.translateX(30);
      av.ds.tape(["#", "A", "A", "B", "B", "C", "C", "c", "#"], 370, 300, "both");
      node[3].unhighlight();
      node[0].highlight();
      p11.hide();
      yStart = yStart - 90;
      xStart = xStart + 30;
      var p12 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
        {"arrow-end": "classic-wide-long"});
      p4.translateY(-90);
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      av.step();
  
      av.umsg("Step 20: The tape head shifts right one cell to the value of B.  The previous cell remains the same and the current state remains q4.");
      g.translateX(30);
      c1.translateX(30);
      node[0].unhighlight();
      node[4].highlight();
      p12.hide();
      yStart = yStart + 120;
      xStart = xStart + 30;
      var p13 = av.g.line(420 + xStart, 185 + yStart, 390 + xStart, 185 + yStart,
        {"arrow-end": "classic-wide-long"});
      p4.translateY(120);
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      av.step();
  
      av.umsg("Step 21: The tape head shifts right one cell to the value of C.  The previous cell remains the same and the current state remains q4.");
      g.translateX(30);
      c1.translateX(30);
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      xStart = xStart + 30;
      p13.translateX(30);
      av.step();
      
      av.umsg("Step 22: The tape head shifts right one cell to the value of C.  The previous cell remains the same and the current state remains q4.");
      g.translateX(30);
      c1.translateX(30);
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      xStart = xStart + 30;
      p13.translateX(30);
      av.step();
  
      av.umsg("Step 23: The tape head checks if it can go into process q4 or q5, but since it can't go into either state, the turing machine stops.");
      g.translateX(30);
      c1.translateX(30);
      c2.translateX(30);
      c3.translateX(30);
      c4.translateX(30);
      c5.translateX(30);
      c6.translateX(30);
      c7.translateX(30);
      xStart = xStart + 30;
      p13.translateX(30);
      av.step();

    
    av.recorded();
  });
  
  
