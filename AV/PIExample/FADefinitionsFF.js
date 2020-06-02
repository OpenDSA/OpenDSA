$(document).ready(function() {
    "use strict";
    var av_name = "FADefinitionsFF";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter,
        code = config.code;
    var goNext = false;
    //Frame 1
    av.umsg("This module will show some important definitions to operations on Finite Acceptors..");
    av.displayInit();
    
    //frame 2
    av.umsg("Before we start the definitions, let us think about a more complecated DFA example");
    av.step();

    //frame 3
    av.umsg("We need to build a DFA that accepts even binary numbers that have an even number of 1's.");
    av.step();

    //frame 4
    av.umsg("Here is the DFA:");
    var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryEvenOnesDFA.jff";
    var dfa = new av.ds.FA({center: true, url: url});
    av.step();

    //frame 3
    av.umsg("As mentioned before, $\\delta$ is the transition function");
    av.step();

    //frame 4
    av.umsg(Frames.addQuestion("q1"));
    av.step();


    //frame 5
    av.umsg(Frames.addQuestion("q2"));
    av.step();

    //frame 6
    av.umsg("Exactly, the operation that is represents this operation called $\\delta^*$. The star in this course means zero or more times. So $\\delta^*$ means: apply the delta function ZERO or MORE times by keep consuming the letters of the given string untill the machine consumes all letters.");
    av.step();

    //frame 7
    av.umsg(Frames.addQuestion("q3"));
    av.step();

    //frame 8
    av.umsg(Frames.addQuestion("q4"));
    av.step();
    
    //frame 9
    av.umsg(Frames.addQuestion("q5"));
    av.step();

    //frame 10
    av.umsg("The formal definition for $\\delta^*(q,wa)=\\delta(\\delta^*(q,w),a)$. This means that the machine tansitions from a state to another by consuming the letters of $w$ and at the end it made the last transition by reading the last letter $a$");
    av.step();

    //frame 11
    av.umsg(Frames.addQuestion("q6"));
    av.step();

    //frame 12
    av.umsg("As you saw, the machine keep applying the $\\delta$ function letter by letter untill no more letters.");
    av.step();

    //frame 13
    dfa.hide();
    av.umsg(Frames.addQuestion("q7"));
    av.step();

    //frame 14
    av.umsg("Power of DFA: Given some class or type of Finite Automata, the set of languages accepted by that class of Finite Automata is called a $\\textit{family}$.");
    av.step();

    //frame 15
    av.umsg("Therefore, the DFAs define a family of languages that they accept.");
    av.step();

    //frame 16
    av.umsg(Frames.addQuestion("q8"));
    av.step();
    //frame 17
    dfa.show();
    av.umsg(Frames.addQuestion("q9"));
    av.step();
    //frame 16
    av.umsg(Frames.addQuestion("q10"));
    av.step();

    //frame 17
    av.umsg("Completed.")

    av.recorded();

});