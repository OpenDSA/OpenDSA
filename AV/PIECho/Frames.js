$(document).ready(function () {
    "use strict";
    var av_name = "Frames";
    var av = new JSAV(av_name);
    var injector = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;
    av.umsg("Let’s formally define the concept of a “language”. But first we need some stuff to make them from.");
    // var q = av.question("TF", "Understand the given information", {correct: true, falseLabel: "No", trueLabel: "Yes"});
    // var answer = q.show();
    // alert(answer);
    av.displayInit();
    av.umsg("Start with the alphabet set. We normally represent an alphabet set with $\\Sigma$. The alphabet set is a set of symbols (typically letters or characters, but it could include any symbols}.");
    av.step();
    av.umsg(injector.injectQuestion("q1"));
    av.step();

    //second frame
    av.umsg("Given some alphabet set $\\Sigma$, a string is a finite sequence of symbols (taken from $\\Sigma$, of course).");
    av.step();
    av.umsg("Suppose we have $\\Sigma = {a, b}$, which of the following are valid strings?");
    av.step();
    av.umsg(injector.injectQuestion("q2"));
    av.step();

    av.umsg(injector.injectQuestion("q2_2"));
    av.step();
    av.umsg(injector.injectQuestion("q2_3"));
    av.step();
    // av.umsg(injector.injectQuestion("q2_2"));
    // av.step();

    //thrid frame
    av.umsg("A language is simply a collection of strings defined over $\\Sigma$.");
    av.step();
    av.umsg(injector.injectQuestion("q3"));
    av.step();
    av.umsg("How about this one?");
    av.step();
    av.umsg(injector.injectQuestion("q3_2"));
    av.step();
    av.umsg("How about this one?");
    av.step();
    av.umsg(injector.injectQuestion("q3_3"));
    av.step();
    av.umsg("How about this one?");
    av.step();
    av.umsg(injector.injectQuestion("q3_4"));
    av.step();
    av.umsg("Good, since a language is just a set of strings, the empty set is a perfectly good language.");
    av.step();
    av.umsg(injector.injectQuestion("q3_5"));
    av.step();

    //fourth frame
    av.umsg("Another definition of a language is a subset of the powerset of $\\Sigma$.");
    av.step();
    av.umsg("Remember from Discrete Math class that a power set of any set is the set of all possible subsets from the given set.");
    av.step();
    av.umsg(injector.injectQuestion("q4"));
    av.step();

    //fifth 
    av.umsg("Useful notations: We usually use these symbols in our book, For symbols in some alphabet $\\Sigma$, we typically use either digits or letters near the start of the common English alphabet: $a,b,c,d,0,1$ For string names (that is, some variable that is meant to refer to a string), we usually use letters near the end of the common English alphabet: $u,v,w,x,y,z$");
    av.step();
    av.umsg(injector.injectQuestion("q5"));
    av.step();

    //fifth second frame
    av.umsg(injector.injectQuestion("q5_1"));
    av.step();

    //sixth frame
    av.umsg("There are some basic string operations we will use a lot.");
    av.step();
    av.umsg("The size of a string is the number of symbols in the string.  We use the operator || to donate the size of the string.");
    av.step();
    av.umsg(injector.injectQuestion("q6"));
    av.step();

    //seventh frame
    av.umsg("Another important operation is string concatenation. The concatenation of two strings $u$, and v is just the string that contains the symbols of $u$ followed by the symbols of $v$. We use the symbol ∘ to represent concatenation:");
    av.step();
    av.umsg("Example : Let $w$=$a1a2...an$, and $v$=$b1b2...bn$ Then, $w∘v$  = $a1a2...anb1b2...bm$$");
    av.step();
    av.umsg(injector.injectQuestion("q7"));
    av.step();
    av.umsg("In reality, we use concatenation so much that we hardly ever want to be that formal. When we mean w∘v, we will normally simply write $wv$ instead.");
    av.step();
    av.umsg(injector.injectQuestion("q7_1"));
    av.step();

    //eight frame
    av.umsg("Sometimes we want to talk about the string that has no characters. If we literally wrote a string with no characters, it would be hard for you to understand what we wrote! So we have a special symbol to use for the empty string: $\\lambda$.");
    av.step();
    av.umsg("Recall, since a language is just a subset of all possible strings, that the empty set of strings is a language: $L$ = {} = <empty set symbol>.");
    av.step();
    av.umsg(injector.injectQuestion("q8_1"));
    av.step();
    av.umsg("Another form of string concatenation is to concatenate a string with itself. Suppose we have a string $v$.  The notation $v34 means concatenate v with itself 3 times. Concatenating a string with itself zero times yields the empty string $\\lambda$");
    av.step();
    av.umsg(injector.injectQuestion("q8"));
    av.step();

    //nineth frame
    av.umsg("Concatenating any string with $\\lambda$  gives the same string. In other words, $\\lambda$ is the concatenation identity. For example, $ab$∘$\\lambda$=$\\lambda$∘$ab$=$ab$");
    av.step();
    av.umsg(injector.injectQuestion("q9"));
    av.step();

    //tenth frame
    av.umsg("Another useful operation is to reverse a string: Reversing a string means to flip it, in other words, write its symbols in reverse order.");
    av.step();
    av.umsg(injector.injectQuestion("q10"));
    av.step();

    //eleventh frame
    av.umsg(injector.injectQuestion("q11"));
    av.step();

    //twelveth frame
    av.umsg("One of the most important operations that we use is the * operator, also called the closure operator. “*” of something means concatenating that something zero or more times. For example, if we have $\\Sigma$ = {a,b}, $\\Sigma$* means the set of strings obtained by concatenating 0 or more symbols from $\\Sigma$. ");
    av.step();
    av.umsg(injector.injectQuestion("q12"));
    av.step();
    av.umsg(injector.injectQuestion("q12_1"));
    av.step();

    //13th frame
    av.umsg("Slightly different from the * operator, sometimes we want to have at least one copy of the thing that we are concatenating. Then we use +. One way of thinking of this: $\\Sigma$+=$\\Sigma$∗−{$\\lambda$}");
    av.step();
    av.umsg(injector.injectQuestion("q13"));
    av.step();

    //14th frame
    av.umsg("Sets. As we see, Languages are sets, so all sets of operations can be applied to them.");
    av.step();
    av.umsg(injector.injectQuestion("q14"));
    av.step();

    //15th frame
    av.umsg("Sets. As we see, Languages are sets, so all sets of operations can be applied to them.");
    av.step();
    av.umsg(injector.injectQuestion("q15"));
    av.step();

    //16th frame
    av.umsg("In languages, $\\Sigma$∗  represents the Universe set $U4.  For, example, the complement of $L1$ will be the set of all strings in $\\Sigma$  except the strings in $L$. in other words,");
    av.step();
    av.umsg(injector.injectQuestion("q16"));
    av.step();

    //17th frame
    av.umsg("Sets concatenation. Concatenating two sets $L1$, and $L2$ means concatenating every string in $L1$ with each string in $L2$.");
    av.step();
    av.umsg(injector.injectQuestion("q17"));
    av.step();

    //18th frame
    av.umsg("Sets concatenation. Concatenating a set zero times will give the set of the empty string $\\lambda$.");
    av.step();
    av.umsg(injector.injectQuestion("q18"));
    av.step();

    //19th frame
    av.umsg("Sets concatenation. Concatenating a set n times means concatenating every string in L with each string in $L$ n times");
    av.step();
    av.umsg(injector.injectQuestion("q19"));
    av.step();
    av.umsg(injector.injectQuestion("q19_1"));
    av.step();

    av.recorded();
    // $(".jsavforward").css("pointer-events", "none");  
    // $(".jsavend").css("pointer-events", "none");  
    // var currnet = 0;
    // var index = 0;
    // $('.jsavforward').click(function() {
    //     if(index === currnet)
    //     $(".jsavforward").css("pointer-events", "none");  
    //     else{
    //     $(".jsavforward").css("pointer-events", "auto");  
    //     index++;
    //     }
    //     });

    // $('.jsavbackward').click(function() {

    //     if(index>0){
    //     index--;
    //     $(".jsavforward").css("pointer-events", "auto");
    //     }
    //     });
    // $('.jsavbegin').click(function() {
    //     $(".jsavforward").css("pointer-events", "auto");  
    //     index=0;
    //     });
    // $('.jsavend').click(function() {
    //     $(".jsavforward").css("pointer-events", "none");  
    //     });
});
