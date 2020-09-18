$(document).ready(function () {
    "use strict";
    var av_name = "PLExample4FF";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;
  
    //frame 1
    av.umsg("Prove that $L = \\{a^nb^{n+s}c^s | n,s > 0\\}$ is not regular.");
    av.displayInit();
  
    //frame 2
    av.umsg(Frames.addQuestion("q2"));
    av.step();
  
    //frame 3
    av.umsg(Frames.addQuestion("q3"));
    av.step();
  
    //frame 4
    av.umsg(Frames.addQuestion("q4"));
    av.step();
  
    //frame 5
    av.umsg(Frames.addQuestion("q5"));
    av.step();
  
    //frame 6
    av.umsg(Frames.addQuestion("q6"));
    av.step();
  
    //frame 7
    av.umsg(Frames.addQuestion("q7"));
    av.step();
  
    //frame 8
    av.umsg(Frames.addQuestion("q8"));
    av.step();
  
    //frame 9
    av.umsg(Frames.addQuestion("q9"));
    av.step();
  
    //frame 10
    av.umsg(Frames.addQuestion("q10"));
    av.step();
  
    //frame 11
    av.umsg(Frames.addQuestion("q11"));
    av.step();
  
    //frame 12
    av.umsg(Frames.addQuestion("q12"));
    av.step();
  
    //frame 13
    av.umsg(Frames.addQuestion("q13"));
    av.step();
  
    //frame 14
    av.umsg(Frames.addQuestion("q14"));
    av.step();
  
    //frame 15
    av.umsg(Frames.addQuestion("q15"));
    av.step();
  
    //frame 16
    av.umsg(Frames.addQuestion("q16"));
    av.step();
  
    //frame 17
    av.umsg(Frames.addQuestion("q17"));
    av.step();
  
    //frame 18
    av.umsg(Frames.addQuestion("q18"));
    av.step();
  
    //frame 19
    av.umsg(Frames.addQuestion("q19"));
    av.step();
  
    //frame 20
    av.umsg(Frames.addQuestion("q20"));
    av.step();
  
    //frame 21
    av.umsg(Frames.addQuestion("q21"));
    av.step();
  
    //frame 22
    av.umsg(Frames.addQuestion("q22"));
    av.step();
  
    //frame 23
    av.umsg(Frames.addQuestion("q23"));
    av.step();
  
    //frame 24
    av.umsg(Frames.addQuestion("q24"));
    av.step();
  
    av.umsg("Correct. That is why you should always select good strings as possible.");
    av.recorded();
  });