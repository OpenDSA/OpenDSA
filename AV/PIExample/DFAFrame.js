$(document).ready(function () {
    "use strict";
    var av_name = "DFAFrame";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("Lets start with the simplest of our machines: The Deterministic Finite Acceptor (DFA)");
    av.displayInit();

    //frame 2
    av.umsg(Frames.addQuestion("q1"));
	//Draw DFA - taken from DFAexampleCON.js
	  var xStart = 260;
	  var yStart = 40;
	  av.label("input tape", {left: xStart + 40, top: yStart - 45});
	  var strings = ["a", "a", "b", "b", "a", "b", "", "", "", "", ""];
	  av.ds.tape(strings, xStart, yStart, "right");
	  // av.ds.array(strings, {left: xStart, top: yStart});

	  av.g.line(xStart + 80, yStart + 95, xStart + 80, yStart + 35,
		    {"arrow-end": "classic-wide-long"});
	  av.label("tape head", {left: xStart + 5, top: yStart + 25});
	  var rectangleHeight = 30;
	  var squareHeight = 90;
	  var squareWidth = 90;
	  av.label("current state", {left: xStart + 45, top: yStart + rectangleHeight + 50});
	  av.g.rect(xStart + 40, yStart + 25 + rectangleHeight + 40, squareWidth, squareHeight);
	  av.g.circle(xStart + 40 + (squareWidth / 2), yStart + 35 + rectangleHeight + 40 + ((squareHeight - 10) / 2), 30);
	  av.g.line(xStart + 40 + (squareWidth / 2), yStart + 155, xStart + 90, yStart + 145,
		    {"arrow-end": "classic-wide-long"});
	  av.label("1", {left: xStart + 90, top: yStart + rectangleHeight + 85});
	  av.label("0", {left: xStart + 70, top: yStart + rectangleHeight + 85});

	  av.label("head moves", {left: xStart + 150, top: yStart + 25});
	  av.g.line(xStart + 240, 50 + yStart, 275 + xStart, 50 + yStart,
		    {"arrow-end": "classic-wide-long"});

	  av.displayInit();
	  av.recorded();

    av.step();

    //frame 3
    av.umsg(Frames.addQuestion("q2"));
    av.step();

    //frame 4
    av.umsg(Frames.addQuestion("q3"));
    av.step();

    //frame 5
    av.umsg(Frames.addQuestion("q4"));
    av.step();

    //frame 6
    av.umsg(Frames.addQuestion("q5"));
    av.step();

    //frame 7
    av.umsg(Frames.addQuestion("q6"));
    av.step();

    //frame 8
    av.umsg(Frames.addQuestion("q7"));
    av.step();

    //frame 9
    av.umsg(Frames.addQuestion("Formal Defination for DFA: \n Q is a finite set of states \n is the input alphabet (a finite set) \n :Qx -> Q  A set of transitions like (qi, a)-> qj \n q0 us the initial state (q0 is an element of Q) \n F is the set of all final states") );
    av.step();

    //frame 10
    av.umsg(Frames.addQuestion("q8"));
    av.step();

    //frame 11
    av.umsg(Frames.addQuestion("q9"));
    av.step();

    //frame 12
    av.umsg(Frames.addQuestion("q10"));
    av.step();

    //frame 13
    av.umsg(Frames.addQuestion("q11"));
    av.step();

    //frame 14
    av.umsg(Frames.addQuestion("q12"));
    av.step();

    //frame 15
    av.umsg(Frames.addQuestion("q13"));
    av.step();

    //frame 16
    av.umsg("We interpert the DFA as outputting the value of \"Yes\" on a given input string if the DFA ends the processing of that string in a final state. We say that the DFA outputs \"no\" if it is not in a final state at the end of processing that string.");
    av.step();

    //frame 17
    av.umsg(Frames.addQuestion("q14"));
    av.step();

    av.recorded();
});
