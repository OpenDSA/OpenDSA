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
    av.umsg(" Let’s formally define the concept of a “language”. But first we need some stuff to make them from.");
   
    av.step();
    av.umsg("shitshitshitshit")
    av.umsg("Start with the alphabet set. We normally represent an alphabet set with Σ. The alphabet set is a set of symbols (typically letters or characters, but it could include any symbols}.")
    av.step();
    av.umsg(injector.injectQuestion("q1"));
    av.step();

    // //frame 2
    // av.umsg("Given some alphabet set Σ, a string is a finite sequence of symbols (taken from Σ, of course).");
    // av.step();
    // av.umsg(injector.injectQuestion("q2"));
    // av.step();

    // //frame 3
    // av.umsg("A language is simply a collection of strings defined over Σ.");
    // av.step();
    // av.umsg(injector.injectQuestion("q3"));
    // av.step();

    // //frame 4
    // av.umsg("List the power set of {a, b}");
    // av.step();
    // av.umsg(injector.injectQuestion("q4"));
    // av.step();

    // //frame 5
    // av.umsg("Useful notations: We usually use these symbols in our book, For symbols in some alphabet Σ, we typically use either digits or letters near the start of the common English alphabet: a,b,c,d,0,1 For string names (that is, some variable that is meant to refer to a string), we usually use letters near the end of the common English alphabet: u,v,w,x,y,z");
    // av.step();
    // av.umsg(injector.injectQuestion("q5"));
    // av.step();
    
    // av.umsg(injector.injectQuestion("q5_1"));
    // av.step();
    
    // //frame6
    // av.umsg("The size of a string is the number of symbols in the string.  We use the operator || to donate the size of the string.");
    // av.step();
    // av.umsg(injector.injectQuestion("q6"));
    // av.step();

    // //frame7
    // av.umsg(" Another important operation is string concatenation. The concatenation of two strings u, and v is just the string that contains the symbols of u followed by the symbols of v. We use the symbol ∘ to represent concatenation: Example: Let w=a1a2...an, and v=b1b2...bn Then,  w∘v  = a1a2...anb1b2...bm");
    // av.step();
    // av.umsg(injector.injectQuestion("q7"));
    // av.step();
    
    // //fram 8
    // av.umsg("Frame 8: Another form of string concatenation is to concatenate a string with itself. Suppose we have a string v.  The notation v3 means concatenate v with itself 3 times. Concatenating a string with itself zero times yields the empty string λ");
    // av.step();
    // av.umsg(injector.injectQuestion("q8"));
    // av.step();

    // //frame 8-1
    // av.umsg("Frame 9: Recall, since a language is just a subset of all possible strings, that the empty set of strings is a language: L = {} = <empty set symbol>.");
    // av.step();
    // av.umsg(injector.injectQuestion("q8_1"));
    // av.step();
    
    // //frame9
    // av.umsg("***Frame 9: Concatenating any string with λ gives the same string. In other words, λ is the concatenation identity. For example, ab∘λ=λ∘ab=ab");
    // av.step();
    // av.umsg(injector.injectQuestion("q9"));
    // av.step();

    // //frame10
    // av.umsg("***Frame 10: Another useful operation is to reverse a string: Reversing a string means to flip it, in other words, write its symbols in reverse order.");
    // av.step();
    // av.umsg(injector.injectQuestion("q10"));
    // av.step();

    // //frame11
    // av.umsg("let w=abbc, and v=ab. What is |vvRw|");
    // av.step();
    // av.umsg(injector.injectQuestion("q11"));
    // av.step();
    

    // //frame12
    // av.umsg("Frame 12: One of the most important operations that we use is the * operator, also called the closure operator. “*” of something means concatenating that something zero or more times. For example, if we have Σ = {a,b}, Σ* means the set of strings obtained by concatenating 0 or more symbols from Σ.");
    // av.step();
    // av.umsg(injector.injectQuestion("q12"));
    // av.step();

    // av.umsg(injector.injectQuestion("q12_1"));
    // av.step();

    // //frame13
    // av.umsg("Frame 13: Slightly different from the * operator, sometimes we want to have at least one copy of the thing that we are concatenating. Then we use +. One way of thinking of this: Σ+=Σ∗−{λ}");
    // av.step();
    // av.umsg(injector.injectQuestion("q13"));
    // av.step();

    // //frame14
    // av.umsg("***Frame 14: Sets. As we see, Languages are sets, so all sets of operations can be applied to them.");
    // av.step();
    // av.umsg(injector.injectQuestion("q14"));
    // av.step();


    // //frame15
    // av.umsg("Sets. As we see, Languages are sets, so all sets of operations can be applied to them.");
    // av.step();
    // av.umsg(injector.injectQuestion("q15"));
    // av.step();

    // //frame16
    // av.umsg("");
    // av.step();
    // av.umsg(injector.injectQuestion("q16"));
    // av.step();
    
    // //frame17
    // av.umsg("Sets concatenation. Concatenating two sets L1, and L2 means concatenating every string in L1 with each string in L2.");
    // av.step();
    // av.umsg(injector.injectQuestion("q17"));
    // av.step();


    // //frame18
    // av.umsg("Sets concatenation. Concatenating a set zero times will give the set of the empty string λ.");
    // av.step();
    // av.umsg(injector.injectQuestion("q18"));
    // av.step();

    // //frame19
    // av.umsg("Sets concatenation. Concatenating a set n times means concatenating every string in L with each string in L n times.");
    // av.step();
    // av.umsg(injector.injectQuestion("q19"));
    // av.step();


    // av.umsg(injector.injectQuestion("q19_1"));
    // av.step();
    // av.recorded();
});
    
  
