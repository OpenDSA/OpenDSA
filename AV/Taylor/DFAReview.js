function drawDFA_1(av) {

	//Draw DFA - taken from DFAexampleCON.js
 	  var xStart = 50;
	  var yStart = 80;
	  var label1 = av.label("input tape", {left: xStart + 40, top: yStart - 45});
	  var strings = ["a", "a", "b", "b", "a", "b", "", "", "", "", ""];
//TODO highlight array cell or get tape to clear.
	  //var tape = av.ds.tape(strings, xStart, yStart, "right");
	  // av.ds.array(strings, {left: xStart, top: yStart});
	  var arr = av.ds.array(strings, {left: xStart, top: yStart-10});

	  var line1 = av.g.line(xStart + 80, yStart + 95, xStart + 80, yStart + 35,
		    {"arrow-end": "classic-wide-long"});
	  var label2 = av.label("tape head", {left: xStart + 5, top: yStart + 25});
	  var rectangleHeight = 30;
	  var squareHeight = 90;
	  var squareWidth = 90;
	  var label3 = av.label("current state", {left: xStart + 45, top: yStart + rectangleHeight + 50});
	  var rec = av.g.rect(xStart + 40, yStart + 25 + rectangleHeight + 40, squareWidth, squareHeight);
	  var circle = av.g.circle(xStart + 40 + (squareWidth / 2), yStart + 35 + rectangleHeight + 40 + ((squareHeight - 10) / 2), 30);
	  var line2 = av.g.line(xStart + 40 + (squareWidth / 2), yStart + 155, xStart + 90, yStart + 145,
		    {"arrow-end": "classic-wide-long"});
	  var label4 = av.label("1", {left: xStart + 90, top: yStart + rectangleHeight + 85});
	  var label5 = av.label("0", {left: xStart + 70, top: yStart + rectangleHeight + 85});

	  var label6 = av.label("head moves", {left: xStart + 150, top: yStart + 25});
	  var line3 = av.g.line(xStart + 240, 50 + yStart, 275 + xStart, 50 + yStart,
		    {"arrow-end": "classic-wide-long"});

	var dfaComponents = new Array(label1, label2, label3, label4, label5, label6, line1, line2, line3, circle, rec, arr);
	//tape.clear();
	return dfaComponents;
}

$(document).ready(function () {
    "use strict";
    var av_name = "DFAReview";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1

    av.umsg("Concept Review: The Deterministic Finite Acceptor (DFA)");
    av.displayInit();
    av.step();

    //frame 2
    av.umsg("Below is an example of a DFA."); 
    var dfa1 = drawDFA_1(av); 
    av.step();

    //frame 3
    av.umsg(Frames.addQuestion("q1"));
    av.step();

    //frame 4
    av.umsg(Frames.addQuestion("q2"));
    av.step();

    //frame 5
    av.umsg(Frames.addQuestion("q3"));
    av.step();

    //frame 6
    av.umsg(Frames.addQuestion("q4"));
    av.step();

    //frame 7
    av.umsg(Frames.addQuestion("q5"));
    av.step();

    //frame 8
    av.umsg(Frames.addQuestion("q6"));
    av.step();

    //frame 9
    av.umsg(Frames.addQuestion("q7"));
    av.step();

    //frame 10
    av.umsg("Below is a graphical presentation for a DFA that accepts even binary numbers. Lets put it into the formal defination of a DFA notation: $(Q, \\Sigma, \\delta, Q_0, F)$");
	//Remove DFA 1 from screen
	dfa1.forEach(obj => obj.hide());
	//Add Graphic DFA used in questions
	var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryDFACON.jff";
	var binaryDFA = new av.ds.FA({center: true, url: url});
    av.step();
     
    //frame11
    av.umsg(Frames.addQuestion("q8"));
    av.step();

    //frame 12
    av.umsg(Frames.addQuestion("q9"));
    av.step();

    //frame 13
    av.umsg(Frames.addQuestion("q10"));
    av.step();

    //frame 14
    av.umsg(Frames.addQuestion("q11"));
    av.step();

   //frame 15
   av.umsg("This DFA below is same as the notation: M=$(Q,\\Sigma,\\delta,Q_0,F)$=$(\\{q0,q1\\},\\{0,1\\},\\delta,q_0,\\{q1\\})$");
    av.step();
 
    //frame 16
    av.umsg(Frames.addQuestion("q12"));
    av.step();

    //frame 17
    av.umsg(Frames.addQuestion("q13"));
    av.step();

    //frame 18
    av.umsg(Frames.addQuestion("q14"));
    av.step();

    //frame 19
    av.umsg(Frames.addQuestion("q15"));
    av.step();


    //frame 20
    binaryDFA.hide();
      url = "../../../AV/VisFormalLang/FA/Machines/DFA_noTrapState.jff";
       var notrapDFA = new av.ds.FA({center: true, url: url});

    av.umsg("The below DFA is an incomplete DFA. This means it does not show every possible transition from every state.");
    av.step();

    //frame 21
    av.umsg(Frames.addQuestion("q16"));
    av.step();

    //frame 22
    notrapDFA.hide();
       url = "../../../AV/VisFormalLang/FA/Machines/DFA_withTrapState.jff";
       var trapDFA = new av.ds.FA({center: true, url: url});
    av.umsg("A new state called the trap state can be added. Any transition not defined goes to the trap state. Once the trap state is entered it will never trasition out of the trap state. The changes have been made to the DFA below.");
    av.step();
	
    //frame 22
    av.umsg(Frames.addQuestion("q17"));
    av.step();

    //frame 23 - Last Frame
    av.umsg("Completed.");

    av.recorded();
});
