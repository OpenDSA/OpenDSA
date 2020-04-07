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
    var xStart = 150;
    var yStart = 0;

    //frame 1
    av.umsg("\"State machines\" are simple to understand. There are a number of different state machines, with a range of capabilities. We will discuss a particular one, called a $Turing$ $machine$. As we define \"capability\", the key is ability, not efficiency.");
    av.displayInit();

    //frame 2
    av.umsg(Frames.addQuestion("q1"));
    av.step();
    
    //frame 3
    av.umsg(Frames.addQuestion("q2"));
    av.step();
    
    //frame 4
    av.umsg(Frames.addQuestion("q3"));
    av.step();

    //frame 5
    av.umsg("To do computation, we have to have some conventions about starting and ending the process. The machine stops immediately if (1) it enters any $final$ $state$, or (2) it is in a state and scans a character for which there is no transition. (Note that there are many ways to define Turing Machines, and some definitions require an explicit reject state. We do not.)");
    av.step();
    
    //frame 6
    av.umsg("Here we see a Turing Machine's states and transitions presented in the form of a graph. We also see the tape and the head when beginning to process input string 'aaaa'.");
    var url = "../../../../AV/VisFormalLang/TM/Machines/TMexample1.jff";
    var tm = new av.ds.TM({width: 600, height: 200, left: 50, url: url});
    av.ds.tape(["#", "a", "a", "a", "a", "#", "#", "#"], 470, 50, "both");
    var rect = av.g.rect(350 + xStart, 150 + yStart, 110, 80);
    var c1 = av.label("q0", {left: 355 + xStart, top: 130 + yStart});
    var c2 = av.label("q1", {left: 355 + xStart, top: 160 + yStart});
    var p3 = av.g.line(365 + xStart, 150 + yStart, 365 + xStart, 85 + yStart, {"arrow-end": "classic-wide-long"});
    var p4 = av.g.line(420 + xStart, 195 + yStart, 390 + xStart, 185 + yStart, {"arrow-end": "classic-wide-long"});
    var g = av.g.set(); // A set to hold the tape head graphical objects
    var node = tm.nodes();
    g.push(rect);
    g.push(p3);
    g.push(p4);
    g.push(c1);
    g.push(c2);
    av.step();

    // Slide 7
    av.umsg("Step 1: Initially, the tape head is scanning the leftmost non-blank tape cell, and the current state is q0");
    node[0].highlight();
    av.step();

    // Slide 8
    av.umsg("Step 2: The tape head shifts right one cell. The previous cell turns into a blank or # and the current state remains in q0.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "#", "a", "a", "a", "#", "#", "#"], 470, 50, "right");
    c2.translateX(30);
    av.step();

    // Slide 9
    av.umsg("Step 3: The tape head shifts right one cell.  The previous cell turns into a blank or # and the current state remains in q0.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "#", "#", "a", "a", "#", "#", "#"], 470, 50, "right");
    c2.translateX(30);
    av.step();

    // Slide 10
    av.umsg("Step 4: The tape head shifts right one cell.  The previous cell turns into a blank or # and the current state remains in q0.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "#", "#", "#", "a", "#", "#", "#"], 470, 50, "right");
    c2.translateX(30);
    av.step();

    // Slide 11
    av.umsg("Step 5: The tape head shifts right one cell to the value of #.  The previous cell turns into a blank or # and the current state remains in q0.");
    g.translateX(30);
    c1.translateX(30);
    av.ds.tape(["#", "#", "#", "#", "#", "#", "#", "#"], 470, 50, "right");
    c2.translateX(30);
    av.step();

    // Slide 12
    av.umsg("Step 6: The tape head stays on the current cell. The current state changes to q1. Since q1 is a member of the Final State set $F$, the machine immediately halts.");
    p4.hide();
    av.g.line(540 + xStart, 195 + yStart, 510 + xStart, 212 + yStart, {"arrow-end": "classic-wide-long"});
    node[0].unhighlight();
    node[1].highlight();
    

    av.recorded();
});
