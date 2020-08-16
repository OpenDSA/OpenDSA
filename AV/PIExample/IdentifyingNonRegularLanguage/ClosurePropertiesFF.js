$(document).ready(function () {
  "use strict";
  var av_name = "ClosurePropertiesFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;

  //frame 1
  av.umsg("The idea is to usw closure properties of regular languages, construct a language that should be regular, but for which you have already shown is not regular. This will lead to a contradiction. Then we can conclude that the language in hand is not regular");
  av.displayInit();

  //frame2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //frame3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame4
  av.umsg("$\\textbf{Proof outlien:}$ Assume $L$ is regular");
  av.step();

  //frame5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //frame6
  av.umsg("$\\textbf{Proof outlien:}$ Assume $L$ is regular<br/>Apply closure properties to $L$ and other regular languages, constructing $L\\prime$ that you know is not regular.<br/>However, $L\\prime$ must be regular (based on the closure properties). This leads to a contradiction. So, $L$ is not regular");
  av.step();

  av.umsg("Let is see 3 examples about this useful technique. We will start with the language we proved using pumping lemma on example 6 above.")
  av.recorded();

});