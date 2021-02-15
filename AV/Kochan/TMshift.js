/*global JSAV, document */
// Written by Cliff Shaffer

$(document).ready(function() {
    "use strict";
    var av = new JSAV("TMshift");
    var xleft = 250;
    var ytop = 20;

    //Slide 1
    av.umsg("In this slideshow, we will see how a shift machine processes input string 'abc'.<br>" +
        "The following machine is a shift machine that can shift a string to the left:<br>");

    var r = av.label("$R$", {top: 10 + ytop, left: xleft + 120});
    // av.label("$L \\sigma R$", {top: 10 + ytop, left: xleft + 200});
    var l1 = av.label("$L$", {top: 10 + ytop, left: xleft + 200});
    var s = av.label("$\\sigma$", {top: 10 + ytop, left: xleft + 212});
    var r1 = av.label("$R$", {top: 10 + ytop, left: xleft + 220});
    var l = av.label("$>L_{\\#}$", {top: 10 + ytop, left: xleft + 20});
    var h = av.label("$\\overline{\\#}$", {top: -5 + ytop, left: xleft + 160});
    var h1 = av.label("$\\#$", {top: 45 + ytop, left: xleft + 105});
    var l2 = av.label("$L\\#$", {top: 90 + ytop, left: xleft + 115});

    av.g.line(125 + xleft, 50 + ytop, 125 + xleft, 100 + ytop,
        {"stroke-width": 2, "arrow-end":"classic-wide-long"});
    // Horizontal arrow
    av.g.line(140 + xleft, 35 + ytop, 195 + xleft, 35 + ytop,
        {"stroke-width": 2, "arrow-end":"classic-wide-long"});
    // Horizontal arrow
    av.g.line(60 + xleft, 35 + ytop, 115 + xleft, 35 + ytop,
        {"stroke-width": 2, "arrow-end":"classic-wide-long"});
    av.g.polyline([[xleft + 235, 35 + ytop], [xleft + 255, 35 + ytop],
            [xleft + 255, 0 + ytop], [xleft + 125, 0 + ytop],
            [xleft + 125, 25 + ytop]],
        {"stroke-width": 2, "arrow-end":"classic-wide-long"});
    av.displayInit();

    // Slide 2
    av.umsg("Let's make a tape to keep track of this shift machine. The highlighted cell is the head.");
    var tape = av.ds.tape(["#", "#", "a", "b", "c", "#"], 300, 200, "both", 5);
    av.step();

    // Slide 3
    l.css({'color':'red'});
    av.umsg("We start from the $>L_{\\#}$. $L_{\\#}$ means going to the closest space (denoted by #) " +
        "on the left, from the head.");
    tape.highlightPosition("1");
    tape.current = 1;
    av.step();

    // Slide 4
    l.css({'color':'black'});
    r.css({'color':'red'});
    av.umsg("The $R$ in red means moving from the current tape cell to the right cell.");
    tape.moveRight();
    av.step();

    // Slide 5
    r.css({'color':'black'});
    l1.css({'color':'red'});
    h.css({'color':'red'});
    av.umsg("Is the current tape cell a space (i.e. #)?<br>" +
        "No, the current tape cell is 'a', so we follow the $\\overline{\\#}$ direction to go to the $L$ state. <br>" +
        "$L$ means going to one cell on the left.");
    tape.moveLeft();
    av.step();

    // Slide 6
    l1.css({'color':'black'});
    h.css({'color':'black'});
    s.css({'color':'red'});
    av.umsg("Sigma($\\sigma$): Write the letter we just read to the current tape cell. " +
        "<br> We just read 'a', so we need to write 'a' to the cell.");
    tape.arr.value(tape.current, 'a');
    av.step();

    // Slide 7
    s.css({'color':'black'});
    r1.css({'color':'red'});
    av.umsg("The $R$ in red means moving from the current tape cell to the right cell.");
    tape.moveRight();
    av.step();

    // Slide 8
    r1.css({'color':'black'});
    r.css({'color':'red'});
    av.umsg("This $R$ also means moving from the current tape cell to the right cell.");
    tape.moveRight();
    av.step();

    // Slide 9
    r.css({'color':'black'});
    l1.css({'color':'red'});
    h.css({'color':'red'});
    av.umsg("Is the current tape cell a space (i.e. #)?<br>" +
        "No, the current tape cell is 'b', so we follow the $\\overline{\\#}$ direction to go to the $L$ state. <br>" +
        "$L$ means going to one cell on the left.");
    tape.moveLeft();
    av.step();

    // Slide 10
    l1.css({'color':'black'});
    h.css({'color':'black'});
    s.css({'color':'red'});
    av.umsg("Sigma($\\sigma$): Write the letter we just read to the current tape cell. " +
        "<br> We just read 'b', so we need to write 'b' to the cell.");
    tape.arr.value(tape.current, 'b');
    av.step();

    // Slide 11
    s.css({'color':'black'});
    r1.css({'color':'red'});
    av.umsg("The $R$ in red means moving from the current tape cell to the right cell.");
    tape.moveRight();
    av.step();

    // Slide 12
    r1.css({'color':'black'});
    r.css({'color':'red'});
    av.umsg("This $R$ also means moving from the current tape cell to the right cell.");
    tape.moveRight();
    av.step();

    // Slide 13
    r.css({'color':'black'});
    l1.css({'color':'red'});
    h.css({'color':'red'});
    av.umsg("Is the current tape cell a space (i.e. #)?<br>" +
        "No, the current tape cell is 'c', so we follow the $\\overline{\\#}$ direction to go to the $L$ state. <br>" +
        "$L$ means going to one cell on the left.");
    tape.moveLeft();
    av.step();

    // Slide 14
    l1.css({'color':'black'});
    h.css({'color':'black'});
    s.css({'color':'red'});
    av.umsg("Sigma($\\sigma$): Write the letter we just read to the current tape cell. " +
        "<br> We just read 'c', so we need to write 'c' to the cell.");
    tape.arr.value(tape.current, 'c');
    av.step();

    // Slide 15
    s.css({'color':'black'});
    r1.css({'color':'red'});
    av.umsg("The $R$ in red means moving from the current tape cell to the right cell.");
    tape.moveRight();
    av.step();

    // Slide 16
    r1.css({'color':'black'});
    r.css({'color':'red'});
    av.umsg("This $R$ also means moving from the current tape cell to the right cell.");
    tape.moveRight();
    av.step();

    // Slide 17
    r.css({'color':'black'});
    h1.css({'color':'red'});
    l2.css({'color':'red'});
    av.umsg("Is the current tape cell a space (i.e. #)?<br>" +
        "Yes, the current tape cell is #, so we follow the # direction to go to the $L_{\\#}$ state. <br>" +
        "$L_{\\#}$ means going to one cell on the left, and then change the cell to #.");
    tape.moveLeft();
    tape.arr.value(tape.current, "#");
    av.step();

    // Slide 18
    tape.unhighlightCurrent();
    h1.css({'color':'black'});
    l2.css({'color':'black'});
    av.label("Initial Tape: ", {top: 140, left: 180});
    av.label("Final Tape: ", {top: 190, left: 180});
    var tape1 = av.ds.tape(["#", "#", "a", "b", "c", "#"], 300, 155, "both", -2);
    // tape1.unhighlightCurrent();

    av.umsg("We successfully shift the string 'abc' to the left by one tape cell.");
    av.recorded();
});

