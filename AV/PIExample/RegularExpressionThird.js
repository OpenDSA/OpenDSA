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
    var newFA = new av.ds.FA({width: 900, height: 300,left: 10, top:0});
    var anotherFA = new av.ds.FA({width: 900, height: 500,left: 10, top:0});
    var fourthFA = new av.ds.FA({width: 900, height: 600,left: 10, top:0});
    var fFA = new av.ds.FA({width: 900, height: 600,left: 10, top:0});
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
    // av.umsg(Frames.addQuestion("q0"));

    // av.step();

    //frame 3
    av.umsg("After applying the NFA to DFA algorithm covered in previous chapter, the resulting DFA will be:");
    var q4 = newFA.addNode({left: 510, top: 120});
    var q5 = newFA.addNode({left: 660, top: 70});
    var q6 = newFA.addNode({left: 660, top: 150});
    var q7 = newFA.addNode({left: 810, top: 150});
    toggleInitial(newFA, q4);
    toggleFinal(newFA, q5);
    toggleFinal(newFA, q6);
    toggleFinal(newFA, q7);

    newFA.addEdge(q4, q5, {weight: "a"});
    newFA.addEdge(q4, q6, {weight: "c"});
    newFA.addEdge(q6, q7, {weight: lambda});
    newFA.addEdge(q7, q7, {weight: "b"});
    q4.highlight();
    q5.highlight();
    q6.highlight();
    q7.highlight();
    

    av.step();

    //frame 4
    av.umsg("Finally, the minimized DFA is");
    q4.unhighlight();
    q5.unhighlight();
    q6.unhighlight();
    q7.unhighlight();
    var q8 = anotherFA.addNode({left: 510, top: 300});
    var q9 = anotherFA.addNode({left: 700, top: 300});
    var q10 = anotherFA.addNode({left: 700, top: 400});

    toggleInitial(anotherFA, q8);
    toggleFinal(anotherFA, q9);
    toggleFinal(anotherFA, q10);
    anotherFA.addEdge(q8, q9, {weight: "a"});
    anotherFA.addEdge(q8, q10, {weight: "c"});
    anotherFA.addEdge(q10, q10, {weight: "b"});
    q8.highlight();
    q9.highlight();
    q10.highlight();

    av.step();

    //frame 4
    av.umsg("You should notice that when OpenFLAP automatically converts the R.E. to a NFA, the resulting NFA does not look like the 'intuitive' version in the diagram above. This is because the automatic process is a little more complicated. To understand how an algorithm can automatically convert an R.E. to a NFA, a lot of the steps are simply building the machine with the transformations in the diagrams shown earlier in this module—such as combining two machines to OR them or to AND them, etc.");
    FA.removeNode(q0);
    FA.removeNode(q1);
    FA.removeNode(q2);
    FA.removeNode(q3);
    newFA.removeNode(q4);
    newFA.removeNode(q5);
    newFA.removeNode(q6);
    newFA.removeNode(q7);
    anotherFA.removeNode(q8);
    anotherFA.removeNode(q9);
    anotherFA.removeNode(q10);
    av.step();

    //frame 5
    av.umsg("$\\textbf{Definition}$: A Generalized Transition Graph (GTG) is a transition graph whose edges can be labeled with any regular expression. Thus, it 'generalizes' the standard transition graph.");
    var q11 = fourthFA.addNode({left: 10, top: 100});
    var q12 = fourthFA.addNode({left: 310, top: 100});
    toggleInitial(fourthFA, q11);
    toggleFinal(fourthFA, q12);
    fourthFA.addEdge(q11,q12, {weight: "$ab^* + c$"});
    av.step();

    //frame 6
    av.umsg("We will convert the above GTG to an NFA");
    av.step();

    //frame 7
    av.umsg("In the beginning, we put the regular expression $ab^* + c$ on a transition between a start state and a final state");
    av.step();

    //frame 8
    av.umsg("De-oring the expression $ab^* + c$ into 2 transitions $ab^*$, and c");
    var q17 = fourthFA.addNode({left: 810, top: 480});
    var q13 = fourthFA.addNode({left: 310, top: 100});
    var q14 = fourthFA.addNode({left: 610, top: 100});
    var q15 = fourthFA.addNode({left: 310, top: 360});
    var q16 = fourthFA.addNode({left: 610, top: 360});
    fourthFA.removeNode(q12);
    toggleFinal(fourthFA,q17);
    fourthFA.addEdge(q11,q15, {weight: "$\\lambda$"});//q4
    fourthFA.addEdge(q11,q13, {weight: "$\\lambda$"});//q2
    fourthFA.addEdge(q13,q14, {weight: "$ab^*$"});//q3
    fourthFA.addEdge(q15,q16, {weight: "c"});
    fourthFA.addEdge(q16,q17, {weight: "$\\lambda$"});
    fourthFA.addEdge(q14,q17, {weight: "$\\lambda$"});
    av.step();

    //frame 9
    av.umsg("De-concatenating the expression $ab^*$ into 2 transitions a and b");
    fourthFA.removeEdge(q13,q14, {weight: "$ab^*$"});
    var q18 = fourthFA.addNode({left: 430, top: 100});
    var q19 = fourthFA.addNode({left: 550, top: 100});
    var q20 = fourthFA.addNode({left: 230, top: 260});
    var q21 = fourthFA.addNode({left: 550, top: 260});
    fourthFA.addEdge(q13,q18, {weight: "$\\lambda$"});
    fourthFA.addEdge(q18,q19, {weight: "a"});
    fourthFA.addEdge(q19,q20, {weight: "$\\lambda$"});
    fourthFA.addEdge(q20,q21, {weight: "$b^*$"});
    fourthFA.addEdge(q21,q14, {weight: "$\\lambda$"});
    av.step();

    //frame 10
    av.umsg("De-staring the expression $b^*$");
    var q22 = fourthFA.addNode({left: 350, top: 260});
    var q23 = fourthFA.addNode({left: 450, top: 260});
    fourthFA.removeEdge(q20,q21, {weight: "$b^*$"});
    fourthFA.addEdge(q20, q22, {weight: "$\\lambda$"});
    fourthFA.addEdge(q22, q23, {weight: "b"});
    fourthFA.addEdge(q23, q21, {weight: "$\\lambda$"});
    fourthFA.addEdge(q20,q21, {weight: "$\\lambda$"});
    fourthFA.addEdge(q21,q20, {weight: "$\\lambda$"});

    av.step();

    //frame 11
    av.umsg("The automation is complete");
    fourthFA.removeNode(q11);
    fourthFA.removeNode(q12);
    fourthFA.removeNode(q13);
    fourthFA.removeNode(q14);
    fourthFA.removeNode(q15);
    fourthFA.removeNode(q16);
    fourthFA.removeNode(q17);
    fourthFA.removeNode(q18);
    fourthFA.removeNode(q19);
    fourthFA.removeNode(q20);
    fourthFA.removeNode(q21);
    fourthFA.removeNode(q22);
    fourthFA.removeNode(q23);

    var q24 = fFA.addNode({left: 600, top: 400});//0
    var q25 = fFA.addNode({left: 630, top: 50});//1
    var q26 = fFA.addNode({left: 400, top: 400});//2
    var q27 = fFA.addNode({left: 480, top: 50});//3
    var q28 = fFA.addNode({left: 750, top: 250});//4
    var q29 = fFA.addNode({left: 750, top: 130});//5
    var q30 = fFA.addNode({left: 250, top: 350});//6
    var q31 = fFA.addNode({left: 150, top: 300});//7
    var q32 = fFA.addNode({left: 180, top: 100});//8
    var q33 = fFA.addNode({left: 300, top: 50});//9
    var q34 = fFA.addNode({left: 50, top: 0});//10
    var q35 = fFA.addNode({left: 180, top: 0});//11
    
    toggleInitial(fFA, q24);
    toggleFinal(fFA, q25);

    fFA.addEdge(q24, q28, {weight: "$\\lambda$"});//q0-q4
    fFA.addEdge(q24, q26, {weight: "$\\lambda$"});//q0-q2
    fFA.addEdge(q28, q29, {weight: "c"});//q4-q5
    fFA.addEdge(q29, q25, {weight: "$\\lambda$"});//q5-q1
    fFA.addEdge(q26, q30, {weight: "$\\lambda$"});//q2-q6
    fFA.addEdge(q30, q31, {weight: "a"});//q6-q7
    fFA.addEdge(q31, q32, {weight: "$\\lambda$"});//q7-q8
    fFA.addEdge(q32, q33, {weight: "$\\lambda$"});//q8-q9
    fFA.addEdge(q33, q32, {weight: "$\\lambda$"});//q9-q8
    fFA.addEdge(q33, q27, {weight: "$\\lambda$"});//q9-q3
    fFA.addEdge(q27, q25, {weight: "$\\lambda$"});//q3-q1
    fFA.addEdge(q32, q34, {weight: "$\\lambda$"});//q8-q10
    fFA.addEdge(q34, q35, {weight: "b"});//q10-11
    fFA.addEdge(q35, q33, {weight: "$\\lambda$"});//q11-9
    av.step();

    //frame12
    av.umsg("One thing that this example should make clear is that the concept of an NFA is really helpful for our understanding. While every NFA can be replaced by an equivalent DFA, it is a lot easier to understand instuitively the process of converting an R.E. to an NFA than it would be if we had come up with the DFA directly.");
    fFA.removeNode(q24);
    fFA.removeNode(q25);
    fFA.removeNode(q26);
    fFA.removeNode(q27);
    fFA.removeNode(q28);
    fFA.removeNode(q29);
    fFA.removeNode(q30);
    fFA.removeNode(q31);
    fFA.removeNode(q32);
    fFA.removeNode(q33);
    fFA.removeNode(q34);
    fFA.removeNode(q35);
    av.step();

    //frame 13
    av.umsg("Finally, here is a slideshow that presents all of the details that an automated process would go through to convert an R.E. to a minimized DFA.");
    av.step();

    

    av.recorded();
});