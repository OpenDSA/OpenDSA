$(document).ready(function () {
  "use strict";
  var av_name = "ClosurePropertiesExample1FF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;

  //frame 1
  av.umsg("We need to prove that $L = \\{a^3b^nc^{n-3} | n > 3 \\}$ is not regular by using the regular languages closure properties.");
  av.displayInit();

  //frame2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //frame3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //frame5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //frame6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //frame7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame8
  av.umsg(Frames.addQuestion("q8"));
  av.step();

  //frame9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  av.umsg("Let us define a homomorphism $h: \\Sigma \\rightarrow \\Sigma^*$.<br/>$h(a) = a\\quad |\\quad h(b) = a\\quad |\\quad h(c) = b$<br/>$h(L) = \\{a^3a^nb^{n-3} | n > 3 \\} = \\{a^{n+3}b^{n-3} | n > 3\\}$<br/>$L\\prime = h(L)\\{b^6\\} = \\{a^{n+3}b^{n+3} | n > 3\\}$<br/>$L_4 = L' \\cup L_3 = \\{a^nb^n | n > 0\\}$.<br/>This is a contradiction. So, $L = \\{a^3b^nc^{n-3} | n > 3 \\}$ is not regular.")
  av.recorded();

});