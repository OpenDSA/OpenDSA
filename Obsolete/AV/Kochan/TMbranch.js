//slideshow written by Ko Yat Chan
//reference: Turing1CON.js, written by Cliff Shaffer
$(document).ready(function() {
    "use strict";
    var av = new JSAV("TMbranch");
    var xleft = 250;
    //Slide 1
    av.umsg("In this slideshow, we will see how branching works between machines:");
    let m1 = av.label("$>M_1$", {top: 10, left: xleft + 100});
    av.label("$M_2$", {top: 10, left: xleft + 200});
    let m3 = av.label("$M_3$", {top: 90, left: xleft + 115});
    av.label("$a$", {top: -5, left: xleft + 160});
    let b = av.label("$b$", {top: 50, left: xleft + 110});
    // Vertical arrow
    av.g.line(125 + xleft, 50, 125 + xleft, 100,
        {"stroke-width": 2, "arrow-end":"classic-wide-long"});
    // Horizontal arrow
    av.g.line(140 + xleft, 35, 195 + xleft, 35,
        {"stroke-width": 2, "arrow-end":"classic-wide-long"});
    av.displayInit();

    //Slide 2
    av.umsg("Let's make a tape to keep track of the following machine. <br> The highlighted cell is the head of the tape.")
    var tape = av.ds.tape(["#", "a", "b", "#", "#"], 325, 150, "both", 3);
    av.step();

    //Slide 3
    m1.css({'color':'red'});
    av.umsg("<font color='red'> > </font> is a start sign, so the machine starts from the <font color='red'>$M_1$</font> machine." +
        "<br> Let's assume <font color='red'>$M_1$</font> moves the head of the tape to one position on the left and then reads the element in the cell." +
        "<br> Notice how the tape just changed on this slide.");
    tape.moveLeft();
    av.step()

    //Slide 4
    m1.css({'color':'black'});
    av.umsg("Because the machine just read 'b' from $M_1$, so it needs to follow the <font color='red'>$b$</font> direction to <font color='red'>$M_3$</font>." +
        "<br> Finally, it will perform whatever the <font color='red'>$M_3$</font> machine does.");
    b.css({'color':'red'});
    m3.css({'color':'red'});
    av.recorded();
});
