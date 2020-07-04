$(document).ready(function(){
    "use strict";
    var av_name = "GrammarIntroFF";
    var av = new JSAV(av_name);
    var arrow = String.fromCharCode(8594);
    var grammar =  "[\
        [\"&lt;sentence&gt;\",\"→\",\"&lt;subject&gt;&lt;verb&gt;&lt;d.o.&gt;\"],\
        [\"&lt;subject&gt;\",\"→\",\"&lt;noun&gt;|&lt;article&gt;&lt;noun&gt;\"],\
        [\"&lt;verb&gt;\",\"→\",\"hit | ran | ate\"],\
        [\"&lt;d.o.&gt;\",\"→\",\"&lt;article&gt;&lt;noun&gt;|&lt;noun&gt;\"],\
        [\"&lt;noun&gt;\",\"→\",\"Frits | ball\"],\
        [\"&lt;article&gt;\",\"→\",\"the | an | a\"]\
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

//frame 1
av.umsg("let's look at a grammar you can maybe relate to, a grammar for english. This will be a tiny subset of the english language, not complete by far!");
av.displayInit();

//frame 2
av.umsg(Frames.addQuestion("q1"));
av.step();

//frame2_1
av.umsg(Frames.addQuestion("q111"));
av.step();

//frame2_2
av.umsg(Frames.addQuestion("q121"));
av.step();

//frame 3
av.umsg(Frames.addQuestion("q2"));
av.step();

//frame 4
av.umsg(Frames.addQuestion("q2_2"));
av.step();

//frame 5
av.umsg(Frames.addQuestion("q3"));
av.step();

//frame 6
av.umsg(Frames.addQuestion("q4"));
av.step();

//frame 7
av.umsg(Frames.addQuestion("q5"));
av.step();

//frame 8
av.umsg(Frames.addQuestion("q6"));
av.step();

//frame 9
av.umsg(Frames.addQuestion("q7"));
av.step();

//frame 10
av.umsg(Frames.addQuestion("q8"));
av.step();

//frame 11
av.umsg(Frames.addQuestion("q9"));
av.step();

//frame 12
av.umsg(Frames.addQuestion("q10"));
av.step();

//frame 13
av.umsg(Frames.addQuestion("q11"));
av.step();

//frame 14
av.umsg(Frames.addQuestion("q12"));
av.step();

//frame 15
av.umsg(Frames.addQuestion("q13"));
av.step();

//frame 16
av.umsg(Frames.addQuestion("q14"));
av.step();

//frame 17
av.umsg(Frames.addQuestion("q15"));
av.step();

//frame 18
av.umsg("$W⇒z$ means that W derives string z, $W⇒^∗z$ means that W derives string z in 0 or more steps, $W⇒^+z$ means that W derives string z in 1 or more steps ");
av.step();

//frame 19
grammerMatrix.hide();
av.umsg("Given grammar: G=(V,T,S,P) where V is a finite set of variables (nonterminals) T is a finite set of terminals (generally, these are strings). S is the start variable (S∈V) P is a set of productions (rules) in the form x→y means to replace x by y");
av.step();

//frame 20
av.umsg("The symbol L(G) represents the languages described by the Grammar. The formal definition for L(G) is $L(G)= \\{w \\in T{}^{*} \\mid S \\stackrel{*}{\\Rightarrow} w\\}$");
av.step();
//frame 21
av.umsg("Now, try to describe in words: What is the language of the grammar? Answer: It is all strings formed over the alphabet (or set of terminals, note that $T^∗$ is all possible strings over T), SUCH THAT if you start with S (the start symbol in the grammar), you can derive the string.");
av.step();
//frame 22
av.umsg(Frames.addQuestion("q16"));
av.step();
//frame 23
av.umsg(Frames.addQuestion("q17"));
av.step();
//frame 24
av.umsg(Frames.addQuestion("q18"));
av.step();
//frame 25
av.umsg(Frames.addQuestion("q19"));
av.step();
//frame 26
av.umsg(Frames.addQuestion("q20"));
av.step();
//frame 27
av.umsg(Frames.addQuestion("q21"));
av.step();
//frame 28
av.umsg(Frames.addQuestion("q22"));
av.step();
//frame 29
av.umsg(Frames.addQuestion("q23"));
av.step();
//frame 30
av.umsg(Frames.addQuestion("q24"));
av.step();
//frame 31
av.umsg(Frames.addQuestion("q25"));
av.step();
//frame 31
av.umsg("Completed.");
av.step();

av.recorded();
});
