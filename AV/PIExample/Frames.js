$(document).ready(function () {
    "use strict";
    var av_name = "Frames";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("Let’s formally define the concept of a “language”. But first we need some stuff to make them from.");
    av.displayInit();

    //frame 2
    av.umsg(Frames.addQuestion("q1"));
    av.step();

    //frame 3
    av.umsg(Frames.addQuestion("q2"));
    av.step();

    //frame 4
    av.umsg(Frames.addQuestion("q2_2"));
    av.step();

    //frame 5
    av.umsg(Frames.addQuestion("q2_3"));
    av.step();
    
    //frame 6
    av.umsg(Frames.addQuestion("q3"));
    av.step();
    
    //frame 7
    av.umsg(Frames.addQuestion("q3_2"));
    av.step();

    //frame 8
    av.umsg(Frames.addQuestion("q3_3"));
    av.step();

    //frame 9
    av.umsg(Frames.addQuestion("q3_4"));
    av.step();
    
    //frame 10
    av.umsg(Frames.addQuestion("q3_5"));
    av.step();

    //frame 11
    av.umsg(Frames.addQuestion("q4", ));
    av.step();

    //frame 12
    av.umsg(Frames.addQuestion("q5"));
    av.step();

    //frame 13
    av.umsg(Frames.addQuestion("q5_1"));
    av.step();

    //frame 14
    av.umsg(Frames.addQuestion("q6"));
    av.step();

    //frame 15
    av.umsg(Frames.addQuestion("q7"));
    av.step();
    
    //frame 16
    av.umsg(Frames.addQuestion("q7_1"));
    av.step();

    //frame 17
    av.umsg("Sometimes we want to talk about the string that has no characters. If we literally wrote a string with no characters, it would be hard for you to understand what we wrote! So we have a special symbol to use for the empty string: $\\lambda$.");
    av.step();
    
    //frame 18
    av.umsg(Frames.addQuestion("q8_1"));
    av.step();

    //frame 19
    av.umsg(Frames.addQuestion("q8"));
    av.step();

    //frame 20
    av.umsg(Frames.addQuestion("q9"));
    av.step();

    //frame 21
    av.umsg(Frames.addQuestion("q10"));
    av.step();

    //frame 22
    av.umsg(Frames.addQuestion("q11"));
    av.step();

    //frame 23
    av.umsg(Frames.addQuestion("q12"));
    av.step();

    //frame 24
    av.umsg(Frames.addQuestion("q12_1"));
    av.step();

    //frame 25
    av.umsg(Frames.addQuestion("q13"));
    av.step();

    //frame 26
    av.umsg(Frames.addQuestion("q14"));
    av.step();

    //frame 27
    av.umsg(Frames.addQuestion("q15"));
    av.step();

    //frame 28
    av.umsg(Frames.addQuestion("q16"));
    av.step();

    //frame 29
    av.umsg(Frames.addQuestion("q17"));
    av.step();

    //frame 30
    av.umsg(Frames.addQuestion("q18"));
    av.step();

    //frame 31
    av.umsg(Frames.addQuestion("q19"));
    av.step();

    //frame 32
    av.umsg(Frames.addQuestion("q19_1"));
    av.step();

    av.recorded();
});
