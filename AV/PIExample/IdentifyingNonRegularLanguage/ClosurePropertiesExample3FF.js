$(document).ready(function () {
    "use strict";
    var av_name = "ClosurePropertiesExample3FF";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;
  
    //frame 1
    av.umsg("We need to prove that $L_1 = \\{a^nb^na^n\\ |\\ n > 0\\}$ is not regular by using the regular languages closure properties.");
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
    av.umsg("We need to prove that $L_1 = \\{a^nb^na^n\\ |\\ n > 0\\}$ is not regular by using the regular languages closure properties.<br/>Let $L_2 = \\{a^*\\}$<br/>By closure under right quotient $L_3 = L_1 \\backslash L_2 = \\{a^nb^na^p | 0 \\le p \\le n, n > 0\\}$.<br/>By closure under intersection, $L_4 = L_3 \\cap \\{a^{*}b^{*}\\} = \\{a^nb^n | n > 0\\}$.<br/>This is a contradiction. So, $L_1 = \\{a^nb^na^n\\ |\\ n > 0\\}$ is not regular.")
    av.recorded();
  
  });