$(document).ready(function () {
  "use strict";

  var av_name = "TMDecidableVSAcceptable";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var xStart = 150;
  var yStart = 0;

  
  

  //frame 1
  av.umsg("Recall that we defined a convention for accepting/rejecting whether an input string is in a specified language");
  av.displayInit();
  
  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame 4
  av.umsg("The key here is that the machine halts (with separate mechanisms for accept or reject).");
  av.step();
  
  //frame 5
  av.umsg(Frames.addQuestion("q5"))
  av.step();

  //frame 6
  av.umsg("Unfortunately, there is a third possible outcome: The machine might go into an infinite loop.");
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame 8
  av.umsg("A language is <b><i>Turing−acceptable</i></b> if there is some Turing machine that accepts it. Means, a TM that accepts all strings in the language.")
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //frame 10
  av.umsg("It is easy to turn any Turing-decidable machine into a Turing-acceptable machine. If the machine would reject the string, then simply go into an infinite loop by moving right regardless of the value of the symbol seen. But, can every Turing-acceptable machine be converted into a Turing-decidable machine?");
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

  //frame 13
  av.umsg("Here is the modified machine: <br>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-------------------------------- <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q &nbsp; &nbsp; σ &nbsp; &nbsp; δ(q,σ,{R,L,S})</i> <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-------------------------------- <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q<sub>0</sub> &nbsp; a &nbsp; &nbsp; (h, a, R)</i> <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q<sub>0</sub> &nbsp; b  &nbsp; &nbsp; (q<sub>0</sub>, b, R)</i>");
  av.step();

  //frame 14
  av.umsg("All that we have done is remove the transition for what to do when a blank symbol is seen. Thus, the machine halts instead of moving to the right (thus starting the infinite loop). <br><br> (You might ask: But what if there is an 'a' to the right of the #? Recall that we only care about the machine's behavior when it begins in a legal start configuration.)");
  av.step();

  //frame 15
  av.umsg("But, we can ask again: Is every Turing-acceptable language Turing decidable? In other words, whenever the Turing-acceptable machine would hang, can we always replace it with logic to trigger a non-existant transition instead? This is known as the <b><i>Halting Problem</i></b>. <br><br> It turns out that we can prove that there are always languages that cannot be converted from Turing-acceptable to Turing-decidable. In other words, we can <b>prove</b> that the Halting Problem is unsolveable.");

  av.recorded();
});
