$(document).ready(function () {
  "use strict";
  var av_name = "ClosureRegularLangFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
    interpret = config.interpreter, // get the interpreter
    code = config.code;             // get the code object
  
      

  //frame 1
  av.umsg("Now let us study the Regular Properties for Regular Languages. We will start with the known closure properties for Regular Languages.");
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
  av.umsg("Exactly. So, Regular Languages are closed under Union.");
  av.step();
  
  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame 8
  av.umsg("Exactly. So, Regular Languages are closed under Concatenation.");
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //frame 11
  av.umsg("Exactly. So, Regular Languages are closed under Star-closure.");
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();

  //frame 13
  av.umsg("Exactly. So, Regular Languages are closed under complementation.");
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();
  
  //frame 15
  av.umsg("Exactly. So, Regular Languages are closed under reverse.");
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();
  
  //frame 17
  av.umsg(Frames.addQuestion("q17"));
  av.step();
  
  //frame 18
  av.umsg("Exactly. So, Regular Languages are closed under intersection.");
  av.step();

  //frame 19
  av.umsg(Frames.addQuestion("q19"));
  av.step();
  
  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();

  //frame 
  av.umsg("Exactly. So, Regular Languages are closed under difference.");
  av.step();
  
  
  av.umsg("We learned about some easy to proof regular languages closure properties.")
  av.recorded();
});
