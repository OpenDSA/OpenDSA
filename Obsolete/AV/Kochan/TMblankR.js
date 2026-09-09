//slideshow written by Ko Yat Chan
//reference: Turing2CON.js, written by Cliff Shaffer
$(document).ready(function() {
    "use strict";
    var av = new JSAV("TMblankR");
    var xleft = 300;
    //Slide 1
    av.umsg("In this slideshow, we will see how the following machine can find the first blank on the right of its tape.");
    let a = av.label("$>$", {top: 50, left: xleft + 100});
    let r = av.label("$R$", {top: 50, left: xleft + 115});
    let o = av.label("$\\overline{\\#}$", {top: 0, left: xleft + 115});

    // Curvy line
    av.g.path(["M", 110 + xleft, 65,
            "C", 100 + xleft, 35,
            150 + xleft, 35,
            120 + xleft, 65].join(","),
        {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    av.displayInit();

    //Slide 2
    av.umsg("Let's assume the tape below is to keep track of the following machine. <br> The highlighted cell is the head of the tape." +
        "<br> Notice how the tape changes when you walk through the slides.")
    var tape = av.ds.tape(["#", "a", "b", "#", "#"], 325, 150, "both", 0);
    av.step();

    //Slide 3
    a.css({'color':'red'});
    r.css({'color':'red'});
    tape.moveRight();
    av.umsg("<font color='red'> > </font> is a start sign, so the machine starts from the <font color='red'>$R$</font> machine." +
        "<br><font color='red'>$R$</font>:  moves the head to one position to the right.");
    av.step();

    //Slide 4
    a.css({'color':'black'});
    r.css({'color':'red'});
    o.css({'color':'red'});
    av.umsg("Because the head currently contains 'a' which is not a blank (i.e. #), the machine follows the <font color='red'> $\\overline{\\#}$ </font> direction going back to the <font color='red'>$R$</font> machine."+
        "<br><font color='red'>$R$</font>:  moves the head to one position to the right.");
    tape.moveRight();
    av.step();

    //Slide 5
    av.umsg("The element of the current head is 'b' rather than '#', so the machine follows the <font color='red'> $\\overline{\\#}$ </font> direction going back to the <font color='red'>$R$</font> machine."
    + "<br><font color='red'>$R$</font>:  moves the head to one position to the right.");
    tape.moveRight();
    av.step();

    //Slide 6
    r.css({'color':'black'});
    o.css({'color':'black'});
    av.umsg("The head is now pointing at a blank element, so the machine stops."
        + "<br>This machine finally finds the first blank on the right of its original head.");
    var tape = av.ds.tape(["#", "a", "b", "#", "#"], 325, 150, "both", 0);

    av.recorded();
});
