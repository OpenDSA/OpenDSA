$(document).ready(function () {
  "use strict";
  var av_name = "introToNonRegularFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;

  //frame 1
  av.umsg("How do we prove that a language is regular? We have a number of approaches in our toolbox.");
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
  av.umsg("Correct. but Why?");
  av.step();

  //frame 6
  av.umsg("Correct. but Why?<br/>We can create a regular expression that list all possible (finite) strings. So it is regular.");
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
  av.umsg("Since the number of states is finite, the memory is finite. Further, while a program in a traditional programming language might have one integer (that conceptually at least stores an infinite number of values, even if that is not literally true), a DFA has no such thing.");
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //frame 17
  av.umsg("Yes it is not regular. But Why? An intutive way to determine if a language is not regular is to ask yourself a single question. Does the language require any knid of memory?<br/> if the answer is yes, then the languages is not regular.");
  av.step();

  //frame 18
  av.umsg("In this chapter we will answer a single question. How can we prove that a language is not regular.");
  av.recorded();
});
