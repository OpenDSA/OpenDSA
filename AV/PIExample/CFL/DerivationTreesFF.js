$(document).ready(function () {
    "use strict";
    var av_name = "DerivationTreesFF";
    var av = new JSAV(av_name,);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;
  
//frame 1
av.umsg("In previous module we covered how to derive a string by using sentential forms. Now we will take another, but visual, derivation method.")
av.displayInit();
//frame 2
av.umsg(Frames.addQuestion("q2"));
av.step();

//frame 3
av.umsg(Frames.addQuestion("q3"));
av.step();

//frame 4
av.umsg(Frames.addQuestion("q4"));
av.step();

//frame 5
av.umsg(Frames.addQuestion("q5"));
av.step();

//frame 6
av.umsg(Frames.addQuestion("q6"));
av.step();

//frame 7
av.umsg("For example, a rule $A\\rightarrow a_1a_2a_3…a_n$, where $A\\in V$,$a_i\\in(T\\cup V\\cup \\{\\lambda \\}$) can be shown as:");
var label = av.label("...", {left: 450, top: 93});
var label2 = av.label("$A$", {left: 405, top: 4});
var label3 = av.label("$a_1$", {left: 280, top: 93});
var label4 = av.label("$a_2$", {left: 345, top: 93});
var label5 = av.label("$a_3$", {left: 410, top: 93});
var label6 = av.label("$a_n$", {left: 490, top: 93});
var c = av.g.circle(410, 28, 17);
var c1 = av.g.circle(285, 120, 17);
var c2 = av.g.circle(350, 120, 17);
var c3 = av.g.circle(415, 120, 17);
var c4 = av.g.circle(495, 120, 17);
var l1 = av.g.line(410, 45, 285, 103);
var l2 = av.g.line(410, 45, 350, 103);
var l3 = av.g.line(410, 45, 415, 103);
var l4 = av.g.line(410, 45, 495, 103);
av.step();

//frame 8
av.umsg(Frames.addQuestion("q8"));
c.hide();
c1.hide();
c2.hide();
c3.hide();
c4.hide();
l1.hide();
l2.hide();
l3.hide();
l4.hide();
label.hide();
label2.hide();
label3.hide();
label4.hide();
label5.hide();
label6.hide();

var tr = av.ds.tree({nodegap: 15});
var root_s_1 = tr.root("S");
var A_1 = tr.newNode("A");
var A_2 = tr.newNode("A");
var a_1 = tr.newNode("a");
var a_2 = tr.newNode("a");
var B_1 = tr.newNode("B");
var c_1 = tr.newNode("c");
var r1 = root_s_1.addChild(A_1);
var r2 = root_s_1.addChild(c_1);
var r3 = root_s_1.addChild(B_1);
A_1.addChild(a_1);
A_1.addChild(A_2);
A_1.addChild(a_2);

tr.layout();
av.step();


//frame 9
av.umsg(Frames.addQuestion("q9"));
av.step();

//frame 10
av.umsg(Frames.addQuestion("q10"));
av.step();

//frame 11
av.umsg(Frames.addQuestion("q11"));
A_2.addChild(tr.newNode("$\\lambda$"));
B_1.addChild(tr.newNode("$\\lambda$"));
tr.layout();
av.step();

//frame 12
av.umsg(Frames.addQuestion("q12"));
av.step();

//frame 13
av.umsg(Frames.addQuestion("q13"));

/*
//frame 9
av.umsg("$\\textbf {Membership}$: Given CFG $G$ and string $w\\in \\sum^*$, is $w\\in L(G)$? <br> If we can find a derivation of $w$, then we would know that $w$ is in L(G).")
tr.hide();
av.step();

//frame 10
av.umsg(Frames.addQuestion("q6"));
av.step();

//frame 11
av.umsg("$\\textbf {Exhaustive Search Algorithm}$ <br> If you were to run this in OpenFLAP, it takes a LONG time, but eventually accepts. The problem is that this approach is rather inefficient since it is using an exhaustive search for all ways of expanding from the start symbol. <br> For all $i=1,2,3,…$ <br>Examine all sentential forms yielded by $i$ substitutions");
av.step();

//frame 12
av.umsg("Is $abbab\\in L(G)$? <br> $i=1$<br> 1. $S\\Rightarrow SS$ <br> 2. $S\\Rightarrow aSa$<br> 3. $S\\Rightarrow$<br> 4. $S\\Rightarrow \\lambda$ <br> i=2 <br>1. $S\\Rightarrow SS \\Rightarrow SS$S<br> 2. $S\\Rightarrow SS\\Rightarrow aSaS$<br3. $S\\Rightarrow SS\\Rightarrow bS$<br> 4. $S\\Rightarrow SS\\Rightarrow S$ <br> 5. $S\\Rightarrow aSa\\Rightarrow aSSa$ <br> When $i=6$ we will find the derivation of $w$. <br> $\\textbf {\\{S$\\Rightarrow$ SS$\\Rightarrow$ aSaS$\\Rightarrow$ aSSaS$\\Rightarrow$ abSaS$\\Rightarrow $abba$\\Rightarrow $abbab\\}}$");
av.step();

//frame 13
av.umsg("Yet, what if $w$ is not in $L(G)$? We want to consider special forms of context free grammars such that we can determine when strings are or are not in the language. It turns out to be easy take a context-free grammar and convert it into a special form that makes it easier to test membership.")
av.step();

//frame 14
av.umsg("Theorem: If CFG G does not contain rules of the form<br>    $A\\rightarrow \\lambda$<br>    $A\\rightarrow B$<br>    where A,B∈V, then we can determine if $w\\in L(G)$ or if $w\\notin L(G)$.<br>    $\\textbf {Proof}$: Consider <br>        1. length of sentential forms <br>    2. number of terminal symbols in a sentential form <br>    Either 1 or 2 increases with each derivation.<br> Derivation of string $w$ in $L(G)$ takes $\\le 2|w|$ times through loop in the exhaustive algorithm.<br> Thus, if there are $>2|w|$ times through loop, then $w\\notin L(G)$.");
av.step();

//frame 15
av.umsg("Let $L2=L1−\\{\\lambda \\}$. $L2=L(G)$ where $G$ is:<br>   $ S\\rightarrow SS | aa | aSa | b$ <br>    NOTE that this grammar is in the correct form for the theorem.<br> Show $baaba\\notin L(G)$. <br>  $i=1$<br>    1. $S\\Rightarrow SS$ <br>    2. $S\\Rightarrow aSa$<br>    3. $S\\Rightarrow aa$<br>    4. $S\\Rightarrow b$<br> $i=2$<br>    1. $S\\Rightarrow SS\\Rightarrow SSS$ <br>    2. $S\\Rightarrow SS\\Rightarrow aSaS$<br>    3. $S\\Rightarrow SS\\Rightarrow aaS$<br>    4. $S\\Rightarrow SS\\Rightarrow bS$<br>    5. $S\\Rightarrow aSa\\Rightarrow aSSa$ <br>    6. $S\\Rightarrow aSa\\Rightarrow aaSaa$<br>    7. $S\\Rightarrow aSa\\Rightarrow aaaa$<br>    8. $S\\Rightarrow aSa\\Rightarrow aba$<br> With each substitution, either there is at least one more terminal or the length of the sentential form has increased.<br>    So after we process the loop for i=10, we can conclude that baaba is not in $L(G)$.")
av.step();

//frame 16
av.umsg("Definition: Simple grammar (or s-grammar) has all productions of the form: <br>    $A\\rightarrow ax$ <br>where $A\\in V$, $a\\in T$, and $x\\in V^∗$ AND any pair (A,a) can occur in at most one rule.<br>    If you use the exhaustive search method to ask if $w\\in L(G)$, where $G$ is an s-grammar, the number of terminals increases with each step.")
av.step();
av.umsg("Completed");
*/
av.recorded();
});