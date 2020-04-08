$(document).ready(function(){
    "use strict";
    var av_name = "RightLinearRG";
    var av = new JSAV(av_name);
    var arrow = String.fromCharCode(8594);
    
    var grammar =  "[\
    ]";
        /****/
    /**<sentence> → <subject><verb><d.o.>
<subject> → <noun> | <article><noun>
<verb> → hit | ran | ate
<d.o.> → <article><noun> | <noun>
<noun> → Fritz | ball
<article>→ the | an | a
 */

var Frames = PIFRAMES.init(av_name);
// Load the config object with interpreter and code created by odsaUtils.js
var config = ODSA.UTILS.loadConfig({av_name: av_name}),
interpret = config.interpreter, // get the interpreter
code = config.code;             // get the code object
var goNext = false;
var FA = new av.ds.FA({width: 900, height: 300,left: 10, top:0});

var grammerArray = JSON.parse(grammar);
var lastRow = grammerArray.length;
grammerArray.push(["", arrow, ""]);
var grammerMatrix = av.ds.matrix(grammerArray, {left: 10});

//frame 1
av.umsg("$\\textbf {Theorem}$: L is a regular language if and only if there exists a regular grammar G such that $L=L(G)$.<br> ($\\Longrightarrow$) Given a DFA $M$, construct regular grammar $G$ such taht $L(G)=L(M)$ <br> The process is pretty much the same as when we made an NFA from RGG <br> Each DFA state gets a non-terminal. <br> Each transition gets a production rule.<br> Construct the Regular Grammar for the NFA");
av.displayInit();

/**
 * [\"S\",\"→\",\"aA\"],\
        [\"A\",\"→\",\"bA\"],\
        [\"A\",\"→\",\"aS\"],\
        [\"A\",\"→\",\"$\lambda$\"]\
 */

//frame 2
av.umsg("We need a state for each Variable and a final state");
grammar = "[\
    [\"S\",\"→\",\"aA\"],\
]";
// var F = FA.addNode({left: 210, top: 70});
// var A = FA.addNode({left: 510, top: 70});
// var B = FA.addNode({left: 250, top: 170});
// var S = FA.addNode({left: 610, top: 170});

// FA.disableDragging();
// toggleInitial(FA, S);
// toggleFinal(FA, F);
//some how the f is not coming up as a final node
//F.highlight();
// q1.highlight();
av.step();

av.recorded();
});
