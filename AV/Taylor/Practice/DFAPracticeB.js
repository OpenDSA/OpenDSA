$(document).ready(function () {
    "use strict";
    var av_name = "DFAPracticeB";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("Practice Concept: Defining a DFA");
    av.displayInit();
    av.step();
    //frame 2
    av.umsg("Here is a graphical presentation for a DFA that accepts even binary numbers.");

	//Add Graphic used in questions
	var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryDFACON.jff";
	var binaryDFA = new av.ds.FA({center: true, url: url});

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
 
    //frame 10 - Last Frame
    av.umsg("Completed.");

    binaryDFA.hide();
    av.recorded();
});
