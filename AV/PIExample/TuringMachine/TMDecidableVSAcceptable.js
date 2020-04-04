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
    av.umsg("Recall that we defined a convention for accepting/rejecting whether an input string is in a specified language: The string is accepted as being in the language if the machine halts in a Final State, and the string is rejected if the machine halts by following an undefined transition. The key here is that the machine halts (with separate mechanisms for accept or reject). <br><br> We define a language to be <b><i>Turing-decidable</i></b> if every string results in one of these two outcomes.");
    av.displayInit();

    //frame 2
    av.umsg("Unfortunately, there is a third possible outcome: The machine might go into an infinite loop.<br><br> We can define another concept: $Turing−acceptable$. We say that machine M accepts a string w if M halts on input w. Then, <br><br> &bull; M accepts a language iff M halts on w iff <i>w ∈ L</i>.<br> &bull; A language is <b><i>Turing−acceptable</i></b> if there is some Turing machine that accepts it.");
    av.step();

    //frame 3
    av.umsg("So, a language is Turing-decidable if it halts on every input, in two different ways so that we can tell if the string is in the language or not. Separately, a language is Turing-acceptable if it halts on strings in the language, and does not halt on strings not in the language. <br><br> It is easy to turn any Turing-decidable machine into a Turing-acceptable machine. If the machine would reject the string, then simply go into an infinite loop by moving right regardless of the value of the symbol seen. But, can every Turing-acceptable machine be converted into a Turing-decidable machine?");
     av.step();

    //frame 4
    av.umsg("Consider this example: Example: <i>Σ<sub>0</sub> = {a,b}, L = {w ∈ Σ<sup>∗</sup><sub>0</sub> : w contains at least one a}.<i> <br>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-------------------------------- <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q &nbsp; &nbsp; σ &nbsp; &nbsp; δ(q,σ,{R,L,S})</i> <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-------------------------------- <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q<sub>0</sub> &nbsp; a &nbsp; &nbsp; (h, a, R)</i> <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q<sub>0</sub> &nbsp; b  &nbsp; &nbsp; (q<sub>0</sub>, b, R)</i> <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q<sub>0</sub> &nbsp; # &nbsp; &nbsp; (q<sub>0</sub>, #, R)</i> <br><br> This machine is Turing-acceptable. It halts if it sees an 'a', and it hangs if there is no 'a'. <br><br> Is this language Turing decidable? Of course. Instead of running right when a # is seen, the machine can halt. Here is the modified machine: <br>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-------------------------------- <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q &nbsp; &nbsp; σ &nbsp; &nbsp; δ(q,σ,{R,L,S})</i> <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-------------------------------- <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q<sub>0</sub> &nbsp; a &nbsp; &nbsp; (h, a, R)</i> <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q<sub>0</sub> &nbsp; b  &nbsp; &nbsp; (q<sub>0</sub>, b, R)</i>");
    av.step();

    //frame 5
    av.umsg("All that we have done is remove the transition for what to do when a blank symbol is seen. Thus, the machine halts instead of moving to the right (thus starting the infinite loop). <br><br> (You might ask: But what if there is an 'a' to the right of the #? Recall that we only care about the machine's behavior when it begins in a legal start configuration.)");
    av.step();

    //frame 6
    av.umsg("But, we can ask again: Is every Turing-acceptable language Turing decidable? In other words, whenever the Turing-acceptable machine would hang, can we always replace it with logic to trigger a non-existant transition instead? This is known as the <b><i>Halting Problem</i></b>. <br><br> It turns out that we can prove that there are always languages that cannot be converted from Turing-acceptable to Turing-decidable. In other words, we can <b>prove</b> that the Halting Problem is unsolveable.");

    av.recorded();
});
