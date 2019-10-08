// Written by Mostafa Mohammed, Fall 2019
$(document).ready(function() {
    "use strict";
    
    var av_name = "RClearCON";
    var xStart = 150;
    var yStart = 0;
    var av = new JSAV(av_name);  
    av.umsg("In this example, we see how the machine head moves over the tape when processing input string 'aaaa'.");
    var url = "../../../AV/VisFormalLang/TM/Machines/TMexample1.jff";
    var tm = new av.ds.TM({width: 600, height: 200, left: 50, url:url});
    av.ds.tape(["a", "a", "a", "a", "#", "#", "#"], 500, 50, "right");
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
 
    
    av.umsg("Step 1: Initially, the tape head is at the leftmost tape cell with character 'a', and the current state is q0");
    node[0].highlight();
    av.step();


    av.umsg("Step 2: The tape head shifts right one cell. The previous cell turns into a blank or # and the current state remains in q0.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "a", "a", "a", "#", "#", "#"], 500, 50, "right");
    c2.translateX(30);
    av.step();

    av.umsg("Step 3: The tape head shifts right one cell.  The previous cell turns into a blank or # and the current state remains in q0.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "#", "a", "a", "#", "#", "#"], 500, 50, "right");
    c2.translateX(30);
    av.step();

    av.umsg("Step 4: The tape head shifts right one cell.  The previous cell turns into a blank or # and the current state remains in q0.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "#", "#", "a", "#", "#", "#"], 500, 50, "right");
    c2.translateX(30);
    av.step();

    av.umsg("Step 5: The tape head shifts right one cell to the value of #.  The previous cell turns into a blank or # and the current state remains in q0.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "#", "#", "#", "#", "#", "#"], 500, 50, "right");
    c2.translateX(30);
    av.step();

    av.umsg("Step 6: The tape head shifts right one cell. The current state changes to q0.");
    p4.hide();
    var p10 = av.g.line(570 + xStart, 195 + yStart, 540 + xStart, 212 + yStart,
        {"arrow-end": "classic-wide-long"});
    node[0].unhighlight();
    node[1].highlight();
    g.translateX(30);
    c1.translateX(30);
    c2.translateX(30);
    av.recorded();
  });