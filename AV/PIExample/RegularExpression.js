$(document).ready(function() {
    "use strict";
    var av_name = "RegularExpression";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("$\\textbf {Regular expression}$ (RegEx or R.E.) is a \n way to specify a set of strings that defines a language.");
    av.displayInit();

    //frame 2
    av.umsg(Frames.addQuestion("q0"));
    av.step();

    //frame 3
    av.umsg(Frames.addQuestion("q1"));
    av.step();

    //frame 4
    av.umsg("Definition: $\\textbf {1.}$ Given $\\Sigma$, $\\emptyset$, $\\lambda$, and $a$ $\\in$ $\\Sigma$ are R.E. $\\textbf {2.}$ If r and s are regular expressions, then $r$ $+$ $s$, $rs$, $r^∗$ are R.E. $\\textbf {3.}$ r is a R.E if and only if it can be derived from (1) with a finite number of applications of (2)");
    av.step();



    
    av.recorded();
});