$(document).ready(function(){
    "use strict";
    var av_name = "NFAToRE";
    var av = new JSAV(av_name);
    var arrow = String.fromCharCode(8594);
    
    var grammar =  "[\
        [\"S\",\"→\",\"aB\"],\
        [\"S\",\"→\",\"aA\"],\
        [\"A\",\"→\",\"aA\"],\
        [\"A\",\"→\",\"bS\"],\
        [\"A\",\"→\",\"bB\"],\
        [\"B\",\"→\",\"bS\"],\
        [\"B\",\"→\",\"$\lambda$\"]\
    ]";
        /****/
    /**<sentence> → <subject><verb><d.o.>
<subject> → <noun> | <article><noun>
<verb> → hit | ran | ate
<d.o.> → <article><noun> | <noun>
<noun> → Fritz | ball
<article>→ the | an | a
 */
var grammerArray = JSON.parse(grammar);
var lastRow = grammerArray.length;
grammerArray.push(["", arrow, ""]);
var grammerMatrix = av.ds.matrix(grammerArray, {left: 10});

var Frames = PIFRAMES.init(av_name);
// Load the config object with interpreter and code created by odsaUtils.js
var config = ODSA.UTILS.loadConfig({av_name: av_name}),
    interpret = config.interpreter, // get the interpreter
    code = config.code;             // get the code object
var goNext = false;
var FA = new av.ds.FA({width: 900, height: 300,left: 10, top:0});

//frame 1
av.umsg("$\\textbf {Theorem}$: is a regular language if and only if there exists a regular grammar $G$ such that $L=L(G)$. <br> ($\\Longleftarrow$) Given a regular grammar G, construct NFA < such that $L(G) = L(M)$ <br> Make a state for each non-terminal. <br> Make a state on each non-terminal. <br> Make a transition on each terminal in that production rule. <br> Make it final if there is a production without non-terminals. <br> For rules with multiple terminals, need intermediate state");
av.displayInit();

//frame 2
av.umsg("We need a state for each Variable and a final state");
var F = FA.addNode({left: 210, top: 70});
var A = FA.addNode({left: 510, top: 70});
var B = FA.addNode({left: 250, top: 170});
var S = FA.addNode({left: 610, top: 170});

FA.disableDragging();
toggleInitial(FA, S);
toggleFinal(FA, F);
// q0.highlight();
// q1.highlight();
av.step();

//frame 3 
av.umsg("For each production, we need to draw the appropriate transition.");
FA.addEdge(S, B, {weight: "a"});
av.step();

//frame 4
av.umsg("For each production, we need to draw the appropriate transition.");
FA.addEdge(S, A, {weight: "a"});
av.step();

//frame 5
av.umsg("For each production, we need to draw the appropriate transition.");
FA.addEdge(A, A, {weight: "a"});
av.step();

//frame 6
av.umsg("For each production, we need to draw the appropriate transition.");
FA.addEdge(A, S, {weight: "b"});
av.step();

//frame 7
av.umsg("For each production, we need to draw the appropriate transition.");
FA.addEdge(A, B, {weight: "b"});
av.step();

//frame 8
av.umsg("For each production, we need to draw the appropriate transition.");
FA.addEdge(B, S, {weight: "b"});
FA.addEdge(B, F, {weight: "$\\lambda$"});
av.step();

//frame 4
av.umsg("This is the equivalent NFA for this Regular Grammar");




av.recorded();
});
