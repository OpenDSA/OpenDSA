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
    av.umsg("We would like to define a general model of computation that is as simple as possible. The reason is that we want to be able to understand the limits of what is possible in computing, but that is rather hard to do with a complicated definition for a \"computer\" is. But then, we need to be confident that whatever model we do pick, that it actually represents all of the fundamental capabilities of a \"computer\".<br> <br> \"State machines\" are simple to understand. There are a number of different state machines, with a range of capabilities. We will discuss a particular one, called a $Turing$ $machine$. As we define \"capability\", the key is ability, not efficiency. <br> <br> The necessary capabilities for any such \"machine\" are these: <br> - Read <br> - Write <br> - Compute");
    av.displayInit();
    
    //frame 2
    av.umsg("A Turing machine is defined as follows. It has a one-dimensional tape, divided into squares. This tape extends infinitely to the left and to the right. Each square can store one character. The machine has a single I/O head that at any instant in time is \"on\" one of the squares. The control unit of the machine is defined by a set of abstract $states$. At any given instant, the machine is said to be \"in\" one of the states, and has a set of actions that can be performed when in that state. From the current state, the machine will read the symbol on the current square, and will then do the following (depending on the value of the symbol that it sees): <br> 1. Overwrite that symbol with a new symbol, <br> 2. Move the tape head either left (L), right (R), or stay (S)");
    av.step();
    
    //frame 3
    av.umsg("The letters that can appear on the tape are an important part of the definition for a given Turing machine. The alphabet of the machine is these letters that may appear in the input. In addition to the letters of the alphabet that can define an input string, there is also the blank character. When talking about strings, since a blank is hard to see, we will use the # character to represent a blank character. Note that including # in the alphabet is for convenience only. We want to be able to read our specifications without being confused.");
    av.step();
    
    //frame 4
    av.umsg("The input to the machine is the initial contents of the tape, which is described by listing all of the tape squares from the leftmost non-blank tape cell to the rightmost non-blank tape cell. Naturally, there must be a finite number of non-blank symbols on the tape. And the input string might have some blank squares in between the non-blank squares that define the input.");
    av.step();
    
    //frame 5
    av.umsg("Now, we know that at any instant the machine is in some state, and that the input head is under some square on the tape. The machine reads the symbol, and responds by going to some state (possibly the current state, possibly another state), writing some letter onto the square (possibly the same letter as is currently in the square, possibly another), and then moving the head either one square left, one square right, or leaving the head in the current square. That is everything that the machine can do.");
    av.step();
    
    //frame 6
    av.umsg("To do computation, we have to have some conventions about starting and ending the process. The machine stops immediately if (1) it enters any $final$ $state$, or (2) it is in a state and scans a character for which there is no transition. (Note that there are many ways to define Turing Machines, and some definitions require an explicit reject state. We do not.)");
    av.step();
    
    av.umsg("Here we see a Turing Machine's states and transitions presented in the form of a graph. We also see the tape and the head when beginning to process input string 'aaaa'.");
    var url = "../../../AV/VisFormalLang/TM/Machines/TMexample1.jff";
    var tm = new av.ds.TM({width: 600, height: 200, left: 50, url: url});
    av.ds.tape(["#", "a", "a", "a", "a", "#", "#", "#"], 470, 50, "both");
    var rect = av.g.rect(350 + xStart, 150 + yStart, 110, 80);
    var c1 = av.label("q0", {left: 370 + xStart, top: 155 + yStart});
    var c2 = av.label("q1", {left: 370 + xStart, top: 185 + yStart});
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
    av.g.line(540 + xStart, 195 + yStart, 510 + xStart, 212 + yStart, {"arrow-end": "classic-wide-long"});
    node[0].unhighlight();
    node[1].highlight();
    
    av.recorded();
});
