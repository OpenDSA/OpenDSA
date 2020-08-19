$(document).ready(function () {
  "use strict";
  var av_name = "TransformGrammarsFF";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;

  //frame 1
  av.umsg("We use grammars to represent a programming language. Want to know: Is a given string (or program x) valid (syntactically correct)? Same as asking if it is in the language");
  av.displayInit();
  
  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame 4
  av.umsg("To enhance our grammars, we will look at lots of methods for transforming grammars. Some will be forms that are easier to work with, some are easier to use in proofs.");
  av.step();

  //frame 5
  av.umsg("What do we mean by tramsforming grammars is to restrict the grammars such that<br/>1)We can process efficiently");
  av.step();

  //frame 6
  av.umsg("Specifically, we will look at restrictions on the right hand side of the production rules. We want to be able to automatically transform an arbitrary CFG into an equivalent restricted CFG.");
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
  av.umsg("A top-down parser (like LL parsing) would want to derive the leftmost terminal as soon as possible. But in the left recursive grammar above, in order to derive a sentential form that has the leftmost terminal, we have to derive a sentential form that has other terminals in it.");
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
  av.umsg("We will eliminate the left recursion so that we can derive a sentential form with the leftmost terminal and no other terminals.");
  av.step();

  //frame 19
  av.umsg(Frames.addQuestion("q19"));
  av.step();

  //frame 20
  av.umsg(Frames.addQuestion("q20"));
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

  //frame 25
  av.umsg(Frames.addQuestion("q25"));
  av.step();

  //frame 26
  av.umsg(Frames.addQuestion("q26"));
  av.step();

  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  av.step();

  //frame 28
  av.umsg("When you get rid of left-recursion, the grammar is in the appropriate form for a top-down parser, but the grammar has more variables and productions.");
  av.step();

  //frame 29
  av.umsg(Frames.addQuestion("q29"));
  av.step();

  //frame 30
  av.umsg(Frames.addQuestion("q30"));
  av.step();

  av.umsg("In this module we saw how to eliminate left recursion form CFGs");
  av.recorded();


});