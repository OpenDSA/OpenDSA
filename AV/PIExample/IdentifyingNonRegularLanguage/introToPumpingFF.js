$(document).ready(function () {
  "use strict";
  var av_name = "introToPumpingFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;

  //frame 1
  av.umsg("In the previous proof, we introduce the concept of $ \\textbf{pumping}$ the string as we go around the loop. Loops are how we get infinite languages. They are also how we lose count or otherwise lose the ability to distinguish various properties of the string being processed");
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
  av.umsg("Let us say that the part captured by the NFA before the loop is denoted by $w_1$, the part captured by loop is denoted by $v$, and the part captured after the cycle is denoted by $w_2$.");
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
  av.umsg("In next module we will study about Pumping Lemma.");
  av.recorded();
});