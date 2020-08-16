$(document).ready(function () {
    "use strict";
    var av_name = "ClosurePropertiesExample2FF";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;
  
    //frame 1
    av.umsg("We need to prove that $L = \\{a^nb^ma^{m}\\ |\\ m \\ge 0, n \\ge 0 \\}$ is not regular by using the regular languages closure properties.");
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
    av.umsg("Assume $L$ is regular<br.> $L_1 = \\{ bb^{*}aa^{*}\\}$<br/>Let $L_2 = L \\cap L_1 = \\{b^na^n \\mid n > 0\\}$<br/>Define a homomorphism $h: \\Sigma \\rightarrow \\Sigma^*$ as $h(a) = b\\quad |\\quad h(b) = a$<br/>$h(L_2) = \\{a^nb^n | n>0 \\}$.<br/>This is a contradiction. So, $L = \\{a^nb^ma^{m}\\ |\\ m \\ge 0, n \\ge 0 \\}$ is not regular.")
    av.recorded();
  
  });