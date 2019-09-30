$(document).ready(function() {
    "use strict";
    var av_name = "Frames";
    var av = new JSAV(av_name);
    var injector = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;
    av.umsg("Let’s formally define the concept of a “language”. But first we need some stuff to make them from.");
    // var q = av.question("TF", "Understand the given information", {correct: true, falseLabel: "No", trueLabel: "Yes"});
    // var answer = q.show();
    // alert(answer);
    av.step();
    av.umsg("Start with the alphabet set. We normally represent an alphabet set with Σ. The alphabet set is a set of symbols (typically letters or characters, but it could include any symbols}.")
    av.step();
    av.umsg(injector.injectQuestion("q1"));
    av.step();

    //frame 2
    av.umsg("Given some alphabet set Σ, a string is a finite sequence of symbols (taken from Σ, of course).");
    av.step();
    av.umsg(injector.injectQuestion("q2"));
    av.step();

    //frame 3
    av.umsg("A language is simply a collection of strings defined over Σ.");
    av.step();
    av.umsg(injector.injectQuestion("q3"));
    av.step();

    //frame 4

    //frame 5
    av.umsg("Useful notations: We usually use these symbols in our book, For symbols in some alphabet Σ, we typically use either digits or letters near the start of the common English alphabet: a,b,c,d,0,1 For string names (that is, some variable that is meant to refer to a string), we usually use letters near the end of the common English alphabet: u,v,w,x,y,z");
    av.step();
    av.umsg(injector.injectQuestion("q5"));
    av.step();
    
    av.umsg(injector.injectQuestion("q5_1"));
    av.step();
    
    //frame6
    av.umsg("The size of a string is the number of symbols in the string.  We use the operator || to donate the size of the string.");
    av.step();
    av.umsg(injector.injectQuestion("q6"));
    av.step();

    //frame7
    av.umsg("Another important operation is string concatenation. The concatenation of two strings u, and v is just the string that contains the symbols of u followed by the symbols of v. We use the symbol ∘ to represent concatenation:");
    av.step();
    av.umsg("Example: Let w=a1a2...an, and v=b1b2...bn Then,  w∘v  = a1a2...anb1b2...bm");
    av.umsg(injector.injectQuestion("q7"));
    av.step();
    //frame8
    //frame9
    //frame10
    //frame11
    //frame12
    //frame13
    //frame14
    //frame15
    //frame16
    //frame17
    //frame18
    //frame19




    av.recorded();

});
    
  
