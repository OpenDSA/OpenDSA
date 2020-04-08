$(document).ready(function () {
    "use strict";
    var av_name = "ClosureRegularLang";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
     // Load the config object with interpreter and code created by odsaUtils.js
     var config = ODSA.UTILS.loadConfig({av_name: av_name}),
     interpret = config.interpreter, // get the interpreter
     code = config.code;             // get the code object
    var FA = new av.ds.FA({width: 700, height: 300,left: 10, top:0});
    var DFA = new av.ds.FA({width: 700, height: 300,left: 10, top:0});
    var newFA = new av.ds.FA({width: 700, height: 300,left: 10, top:0});
        

    //frame 1
    av.umsg("Consider regular languages $L_1$ and $L_2$. Since they are regular languages, we know that there exist regular expressions $r_1$ and $r_2$ such that $L_1=L(r_1)$ and $L_2=L(r_2)$.");
    av.displayInit();

    //frame 2
    av.umsg("$r1+r2$ is a regular expression denoting $L_1 \\cup L_2$So, regular languages are closed under union.<br> $r1r2$ is a regular expression denoting $L_1L_2$. So, regular languages are closed under concatenation.<br> $r_1^*$ is a regular expression denoting $L_1^*$. So, regular languages are closed under star-closure.");
    av.step();

    //frame 3
    av.umsg("$\\textbf {Theorem}$: Regular languages are closed under complementation.");
    av.step();
    
    //frame 4
    av.umsg("$\\textbf {Theorem}$:");
    av.step();

    //frame 5
    av.umsg("$\\textbf {Theorem}$:");
    av.step();

    //frame 6
    av.umsg("In this example, we will create a DFA for the intersectino of two languages.")
    av.step();

    //frame 7
    av.umsg("We begin with DFAs for the languages $L_1 = a^*b$ and $L_2 = aa\\{a|b\\}^*$");
    var q0 = FA.addNode({left: 10, top: 70});
    var q1 = FA.addNode({left: 210, top: 70});
    var q2 = DFA.addNode({left: 410, top: 70});
    var q3 = DFA.addNode({left: 510, top: 70});
    var q4 = DFA.addNode({left: 610, top: 70});

    FA.disableDragging();
    DFA.disableDragging();
    toggleInitial(FA, q0);
    toggleInitial(DFA, q2);
    toggleFinal(FA,q1);
    toggleFinal(DFA,q4);

    FA.addEdge(q0,q0,{weight: "a"});
    FA.addEdge(q0, q1, {weight: "b"});

    DFA.addEdge(q2,q3,{weight: "a"});
    DFA.addEdge(q3, q4, {weight: "a"});
    DFA.addEdge(q4, q4, {weight: "a"});
    DFA.addEdge(q4, q4, {weight: "b"});
    av.step();

    //frame 8
    av.umsg("The DFA for the intersection of the two languages is shown at the bottom");
    var q5 = newFA.addNode({left: 210, top: 270});
    var q6 = newFA.addNode({left: 310, top: 270});
    var q7 = newFA.addNode({left: 410, top: 270});
    var q8 = newFA.addNode({left: 510, top: 270});

    newFA.disableDragging();
    toggleInitial(newFA, q5);
    toggleFinal(newFA,q8);
    newFA.addEdge(q5,q6,{weight: "a"});
    newFA.addEdge(q6, q7, {weight: "a"});
    newFA.addEdge(q7, q7, {weight: "a"});
    newFA.addEdge(q7, q8, {weight: "b"});





    av.recorded();
});
