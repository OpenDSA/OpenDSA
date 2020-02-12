$(document).ready(function() {
    "use strict";
    var av_name = "RegularExpressionGrammar";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var FA = new av.ds.FA({width: 350, height: 240,left: 10, top:0});
    //var DFA = new av.ds.FA({width: 350, height: 300, left: 10, top:250});
    //var separator =  av.g.path(["M", 350, 0, "v", 500].join(","));
    //separator.show();
    
    // Slide 1
    av.umsg("Recall that we $\\textbf {define}$ the term $\\textbf {regular language}$ to mean the languages that are recognized by a DFA. (Which we know is the same as the languages recognized by an NFA, because we know that every NFA can be converted to a DFA.");
    av.step();
    av.displayInit();

    //frame 2
    av.umsg("Here is an example of NFA that accepts nothing ($\\emptyset$)");
    var q0 = FA.addNode({left: 10, top: 70});
    var q1 = FA.addNode({left: 210, top: 70});
   
    FA.disableDragging();
    toggleInitial(FA, q0);
    toggleFinal(FA, q1);
    q0.highlight();
    q1.highlight();
    av.step();

    //frame 3
    av.umsg("Here is an example of NFA that accepts an empty string ($\\lambda$)");
    FA.addEdge(q0, q1, {weight: "$\\lambda$"});
    av.step();

    //frame 4
    av.umsg("Here is an example of NFA that accepts $a$ $\\in$ $\\Sigma$");
    FA.removeEdge(q0, q1, {weight: "$\\lambda$"});
    FA.addEdge(q0, q1, {weight: "a"});
    av.step();

    //frame 5
    av.umsg("But what about the 'more interesting' regular expressions that are built from AND, OR, and concatenation? Do these all have maching NFAs? If we could find a way to 'simulate' each of these operations with an NFA, then we know that we can construct a machine for any R.E. This idea of 'simulation' is a standard approach to proving such things!");
    FA.removeNode(q0);
    FA.removeNode(q1);
    av.step();

    //frame 6
    av.umsg("Suppose that r and s are R.E. (By induction...) That means that there is an NFA for r and an NFA for s. To help us visualize such things, it helps if we can have a standard way to draw the idea of an arbitrary NFA. And since we want to combine machines together, it will be much easier if we know that the arbitrary machine has one start state and one final state. Well, we already know that all NFAs have a single start state. But not all NFAs have a single final state.");
    av.step();

    //frame 7
    av.umsg("Let's convert an NFA with multiple final states to one with a single final state");
    av.step();

    //frame 8
    av.umsg("Let's suppose that we have a regular expression $r$, we need to find a simple representation for NFA that accepts $r$");
    var s = FA.addNode({left: 10, top: 70});
    var ex1 = FA.addNode({left: 160, top: 70});
    var ex2 = FA.addNode({left: 160, top: 130});
    var ex3 = FA.addNode({left: 160, top: 190});
    var m = FA.addNode({left: 310, top: 70});
    FA.disableDragging();
    toggleInitial(FA, s);
    toggleFinal(FA, m);
    FA.addEdge(ex1, m, {weight: "$\\lambda$"});
    FA.addEdge(ex2, m, {weight: "$\\lambda$"});
    FA.addEdge(ex3, m, {weight: "$\\lambda$"});

    av.step();

    //frame 9
    av.umsg(Frames.addQuestion("q0"));
    av.step();

    //frame 9
    av.umsg("To accept any regular expression $r$, the NFA should start from $s$ and go to $\\textbf {intermediate}$ states until it reaches the final state $f$")
    FA.addEdge(s, ex1, {weight: "$\\lambda$"});
    FA.addEdge(s, ex2, {weight: "$\\lambda$"});
    FA.addEdge(s, ex3, {weight: "$\\lambda$"});
    av.step();

    av.recorded();
});