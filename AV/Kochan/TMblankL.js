//slideshow written by Ko Yat Chan
//reference: Turing3CON.js, written by Cliff Shaffer
$(document).ready(function() {
    "use strict";
    var av = new JSAV("TMblankL");
    var xleft = -20;
    //Slide 1
    av.umsg("In this slideshow, we will see how the following machine can find the first blank on the left of its tape.");
    let a = av.label("$>$", {top: 50, left: xleft + 100});
    let l = av.label("$L$", {top: 50, left: xleft + 115});
    let o = av.label("$\\overline{\\#}$", {top: 0, left: xleft + 115});
    let o1= av.label("$\\#$", {top: 35, left: xleft + 160});
    let m = av.label("$M$", {top: 50, left: xleft + 200});
    // Curvy line
    av.g.path(["M", 110 + xleft, 65,
            "C", 100 + xleft, 35,
            150 + xleft, 35,
            120 + xleft, 65].join(","),
        {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    // Horizontal arrow
    av.g.line(140 + xleft, 75, 195 + xleft, 75,
        {"stroke-width": 2, "arrow-end":"classic-wide-long"});

    av.displayInit();

    //Slide 2
    av.umsg("Let's assume the tape below is to keep track of the following machine. <br> The highlighted cell is the head of the tape." +
        "<br> Notice how the tape changes when you walk through the slides.")
    var tape = av.ds.tape(["#", "a", "b", "#", "#"], 150, 125, "both", 3);
    av.step();

    //Slide 3
    a.css({'color':'red'});
    l.css({'color':'red'});
    tape.moveLeft();
    av.umsg("<font color='red'> > </font> is a start sign, so the machine starts from the <font color='red'>$L$</font> machine." +
        "<br><font color='red'>$L$</font>:  moves the head to one position to the left.");
    av.step();


    //Slide 4
    a.css({'color':'black'});
    l.css({'color':'red'});
    o.css({'color':'red'});
    av.umsg("The element of the current head is 'b' rather than a blank (i.e. #), so the machine follows the <font color='red'> $\\overline{\\#}$ </font> direction going back to the <font color='red'>$L$</font> machine."
        + "<br><font color='red'>$L$</font>:  moves the head to one position to the left.");
    tape.moveLeft();
    av.step();

    //Slide 5
    av.umsg("Because the head currently contains 'a' which is not a blank, the machine follows the <font color='red'> $\\overline{\\#}$ </font> direction going back to the <font color='red'>$L$</font> machine."+
        "<br><font color='red'>$L$</font>:  moves the head to one position to the left.");
    tape.moveLeft();
    av.step();

    //Slide 6
    l.css({'color':'black'});
    o.css({'color':'black'});
    m.css({'color':'red'});
    o1.css({'color':'red'});

    av.umsg("The head is now pointing at a blank element, so the machine follows the the <font color='red'> $\\#$ </font> direction going to the <font color='red'>$M$</font> machine, and then performs whatever the <font color='red'>$M$</font> machine does. "
        + "<br>This machine finally finds the first blank on the left of its original head.");
    av.step()

    //Slide 7
    m.css({'color':'black'});
    o1.css({'color':'black'});
    av.umsg("The machine on the right is a shorter form to represent the machine on the left. " +
        "<br> Notice that <font color='red'>$L_{\\#}$</font> means going to the closest blank cell on the left.")
    // Right part
    av.g.line(260 + xleft, 10, 260 + xleft, 100,
        {"stroke-width": 3});
    let a1 = av.label("$>$", {top: 50, left: xleft + 305});
    let l1 = av.label("$L_{\\#}$", {top: 50, left: xleft + 320});
    l1.css({'color':'red'});
    av.label("$M$", {top: 50, left: xleft + 400});
    // Horizontal arrow
    av.g.line(340 + xleft, 75, 395 + xleft, 75,
        {"stroke-width": 2, "arrow-end":"classic-wide-long"});

    av.recorded();
});
