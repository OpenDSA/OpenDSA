$(document).ready(function () {
    "use strict";
    var av_name = "CFGDerivationsFF";
    var av = new JSAV(av_name,);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;
  
//frame 1
av.umsg("Suppose we have a grammar and we need to build a string by starting from the start variable. This process is named, string derivation");
av.displayInit();
//frame 2
av.umsg("$\\textbf {Definition}$: String derivation is to start at the starting point of the grammar and do replacements until you can do no more replacements.");
av.step();
//frame 3
av.umsg("$\\textbf {Definition}$: String derivation is to start at the starting point of the grammar and do replacements until you can do no more replacements. A variable in the grammar can be replaced by the right hand side of its rule");
av.step();
//frame 4
av.umsg(Frames.addQuestion("q4"));
av.step();
//frame 5
av.umsg(Frames.addQuestion("q5"));
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
av.umsg(Frames.addQuestion("q14"));
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
av.umsg(Frames.addQuestion("q18"));
av.step();
//frame 19
av.umsg("Great. This is how the derivation process goes. But, in all previous examples, the sentential forms have only a single variable each time. So, the task was direct to substitute the existing variable.")
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
av.umsg("Exactly. We have 2 possible orders to perform replacements.");
av.step();
//frame 27
av.umsg(Frames.addQuestion("q27"));
av.step();
//frame 28
av.umsg(Frames.addQuestion("q28"));
av.step();
//frame 29
av.umsg(Frames.addQuestion("q29"));
av.step();
//frame 30
av.umsg(Frames.addQuestion("q30"));
av.step();
//frame 31
av.umsg(Frames.addQuestion("q31"));
av.step();
//frame 32
av.umsg(Frames.addQuestion("q32"));
av.step();
//frame 33
av.umsg(Frames.addQuestion("q33"));
av.step();
//frame 34
av.umsg(Frames.addQuestion("q34"));
av.step();
//frame 35
av.umsg(Frames.addQuestion("q35"));
av.step();
//frame 36
av.umsg(Frames.addQuestion("q36"));
av.step();
//frame 37
av.umsg(Frames.addQuestion("q37"));
av.step();
//frame 38
av.umsg(Frames.addQuestion("q38"));
av.step();
//frame 39
av.umsg("We were successfuly able to derive the string $aacbb$ by following the Leftmost derivation. There is another replacement order.");
av.step();
//frame 40
av.umsg(Frames.addQuestion("q40"));
av.step();
//frame 41
av.umsg(Frames.addQuestion("q41"));
av.step();
//frame 42
av.umsg(Frames.addQuestion("q42"));
av.step();
//frame 43
av.umsg(Frames.addQuestion("q43"));
av.step();
//frame 44
av.umsg(Frames.addQuestion("q44"));
av.step();
//frame 45
av.umsg(Frames.addQuestion("q45"));
av.step();
//frame 46
av.umsg(Frames.addQuestion("q46"));
av.step();
//frame 47
av.umsg(Frames.addQuestion("q47"));
av.step();
//frame 48
av.umsg(Frames.addQuestion("q48"));
av.step();
//frame 49
av.umsg(Frames.addQuestion("q49"));
av.step();
//frame 50
av.umsg(Frames.addQuestion("q50"));
av.step();
//frame 51
av.umsg(Frames.addQuestion("q51"));
av.step();
av.umsg("Now we learned about how to derive a string from a grammar by using sentential forms. In the next module we will see a different method to derive strings.")

av.recorded();
});
