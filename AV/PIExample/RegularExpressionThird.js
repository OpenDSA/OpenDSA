$(document).ready(function() {
    "use strict";
    var av_name = "RegularExpressionThird";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var FA = new av.ds.FA({width: 700, height: 300,left: 10, top:0});
    //var DFA = new av.ds.FA({width: 350, height: 300, left: 10, top:250});
    //var separator =  av.g.path(["M", 350, 0, "v", 500].join(","));
    //separator.show();
    
    // Slide 1
    av.umsg("In this slide, we will convert the NFA that accepts $ab^*\+\c$ to a minimized DFA");
    var q0 = FA.addNode({left: 10, top: 120});
    var q1 = FA.addNode({left: 160, top: 70});
    var q2 = FA.addNode({left: 160, top: 170});
    var q3 = FA.addNode({left: 280, top: 70});
    FA.disableDragging();
    toggleInitial(FA, q0);
    toggleFinal(FA, q2);
    toggleFinal(FA, q3);

    FA.addEdge(q0, q1, {weight: "a"});
    FA.addEdge(q0, q2, {weight: "c"});
    FA.addEdge(q1, q3, {weight: lambda});
    FA.addEdge(q3, q3, {weight: "b"});
    

    av.step();
    av.displayInit();

    //frame 2
    av.umsg(Frames.addQuestion("q0"));

    av.step();

    //frame 3
    av.umsg("testing");
    var q4 = FA.addNode({left: 510, top: 120});
    var q5 = FA.addNode({left: 660, top: 70});
    toggleInitial(FA, q4);
    toggleFinal(FA, q5);

    av.step();



    av.recorded();
});