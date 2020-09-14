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
    av.umsg("In this section, we will introduce a simple machine, the $\\textbf{Turing Machine}$, that is a transducer. It is only slightly more complicated than the machines that we have seen so far, and only slightly different in its operation. But these differences are significant. Ultimately, we will see that a Turing Machine can do any computation that even the most sophisticated modern computer can do.");
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
