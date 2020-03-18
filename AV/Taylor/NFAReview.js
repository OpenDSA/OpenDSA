
$(document).ready(function () {
    "use strict";
    var av_name = "NFAReview";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1

    av.umsg("Concept Review: The Non-Deterministic Finite Acceptor (NFA)");
    av.displayInit();
    av.step();



    //frame 2
    av.umsg("Below is an example of a NFA. Notice that unlike a DFA, q0 transitions to q1 and q2 on a."); 
       var url = "../../../AV/VisFormalLang/FA/Machines/NFAexample1.jff";
       var NFA1 = new av.ds.FA({center: true, url: url});
    av.step();

    //frame 3
    av.umsg(Frames.addQuestion("q1"));
    av.step();

    //frame 2
    av.umsg(Frames.addQuestion("q2"));
    av.step();


    //frame 2
    av.umsg(Frames.addQuestion("q3"));
    av.step();

    //frame 2
    av.umsg(Frames.addQuestion("q4"));
    av.step();

  //frame 2
    NFA1.hide();
    av.umsg("NFA also allow the $\\lambda$ transition. A \"free ride\" to another state."); 
       url = "../../../AV/VisFormalLang/FA/Machines/NFAexample2.jff";
       var NFA2 = new av.ds.FA({center: true, url: url});
    av.step();

    //frame 2
    av.umsg(Frames.addQuestion("q5"));
    av.step();


    //frame 2
    av.umsg(Frames.addQuestion("q6"));
    av.step();


    //frame 2
    av.umsg(Frames.addQuestion("q7"));
    av.step();


    //frame 2
    av.umsg(Frames.addQuestion("q8"));
    av.step();


    //frame 2
    av.umsg(Frames.addQuestion("q9"));
    av.step();


    //frame 2
    av.umsg(Frames.addQuestion("q10"));
    av.step();


    //frame 2
    av.umsg(Frames.addQuestion("q11"));
    av.step();


    //frame 2
    av.umsg(Frames.addQuestion("q12"));
    av.step();

    //frame 23 - Last Frame
    av.umsg("Completed.");

    av.recorded();
});
