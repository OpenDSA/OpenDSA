$(document).ready(function () {
    "use strict";
    var av_name = "AmbiguitySecond";
    var av = new JSAV(av_name,);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("$\\textbf {Definition}$: A CFG $G$ is ambiguous if $\\exists$ some $w\\in L(G)$ which has two distinct derivation trees.");
    av.displayInit();

    //frame 2
    av.umsg("Expression grammar<br> $G=(\\{E,I\\},\\{a,b,+,∗,(,)\\},E,P)$,$P$=<br> $E \\rightarrow E+E | E*E | (E) | I$ <br>    $I\\rightarrow a | b$ <br> Derivation of $a+b∗a$ is:<br> $E\\Rightarrow \\underline{E}+E\\Rightarrow \\underline{I}+E\\Rightarrow a+\\underline{E}\\Rightarrow a+\\underline{E}*E\\Rightarrow a+\\underline{I}*E\\Rightarrow a+b*\\underline{E}\\Rightarrow a+b*\\underline{I}\\Rightarrow a+b*a$<br> Corresponding derivation tree is:");
    var tr = av.ds.tree({nodegap: 15, left: 250, top: 100});
    var root_s_1 = tr.root("E");
    var E_1 = tr.newNode("E");
    var E_2 = tr.newNode("E");
    var E_3 = tr.newNode("E");
    var E_4 = tr.newNode("E");
    var I_1 = tr.newNode("I");
    var I_2 = tr.newNode("I");
    var I_3 = tr.newNode("I");
    var a_1 = tr.newNode("a");
    var a_2 = tr.newNode("a");
    var b_1 = tr.newNode("b");
    var plus = tr.newNode("+");
    var multiple = tr.newNode("*");
    var r1 = root_s_1.addChild(E_1);
    var r2 = root_s_1.addChild(plus);
    var r3 = root_s_1.addChild(E_2);
    var r4 = E_1.addChild(I_1);
    var r5 = I_1.addChild(a_2);
    var r6 = E_2.addChild(E_3);
    var r7 = E_2.addChild(multiple);
    var r8 = E_2.addChild(E_4);
    var r9 = E_3.addChild(I_2);
    var r10 = I_2.addChild(b_1);
    var r11 = E_4.addChild(I_3);
    var r12 = I_3.addChild(a_1);
    
    tr.layout();
    av.step();

    //frame 3
    av.umsg("Derivation trees of expressions are evaluated bottom up. So if a=2 and b=4, then the 'result' of this expression is 2+(4*2)=10.<br> Another derivation of a+b*a is:<br> $E\\Rightarrow \\underline{E}*E\\Rightarrow \\underline{E}+E*E\\Rightarrow \\underline{I}+E*E\\Rightarrow a+\\underline{E}*E\\Rightarrow a+\\underline{I}*E\\Rightarrow a+b*\\underline{E}\\Rightarrow a+b*\\underline{I}\\Rightarrow a+b*a$<br> Corresponding derivation tree is:");
    tr.hide();
    var tr2 = av.ds.tree({nodegap: 15, left: 250, top: 100});
    var root_s = tr2.root("E");
    var E1 = tr2.newNode("E");
    var E2 = tr2.newNode("E");
    var E3 = tr2.newNode("E");
    var E4 = tr2.newNode("E");
    var I1 = tr2.newNode("I");
    var I2 = tr2.newNode("I");
    var I3 = tr2.newNode("I");
    var a1 = tr2.newNode("a");
    var a2 = tr2.newNode("a");
    var b1 = tr2.newNode("b");
    var plu = tr2.newNode("+");
    var mult = tr2.newNode("*");
    var r13 = root_s.addChild(E1);
    var r14 = root_s.addChild(mult);
    var r15 = root_s.addChild(E2);
    var r16 = E2.addChild(I1);
    var r17 = I1.addChild(a2);
    var r18 = E1.addChild(E3);
    var r19 = E1.addChild(plu);
    var r20 = E1.addChild(E4);
    var r21 = E3.addChild(I2);
    var r22 = I2.addChild(b1);
    var r23 = E4.addChild(I3);
    var r24 = I3.addChild(a1);
    
    tr2.layout();

    av.step();

    //frame 4
    av.umsg("Rewrite the grammar as an unambiguous grammar. (Specifically, with the meaning that multiplication has higher precedence than addition.) <br> $E\\rightarrow E+T$ | $T$<br>    $T\\rightarrow T∗*$ | $F$<br>  $F\\rightarrow I$ | $(E)$<br>$I\\rightarrow a$ | $b$ <br>There is only one derivation tree for $a+b∗a$:")
    tr2.hide();
    var tr3 = av.ds.tree({nodegap: 15, left: 250, top: 100});
    var root_E = tr3.root("E");
    var E = tr3.newNode("E");
    
    var T = tr3.newNode("T");
    var mul = tr3.newNode("*");
    var pl = tr3.newNode("+");
    var TT = tr3.newNode("T");
    var TTT = tr3.newNode("T");
    var F = tr3.newNode("F");
    var FF = tr3.newNode("F");
    var FFF = tr3.newNode("F");
    var I = tr3.newNode("I");
    var II = tr3.newNode("I");
    var III = tr3.newNode("I");
    var a = tr3.newNode("a");
    var aa = tr3.newNode("a");
    var b = tr3.newNode("b");
    var r25 = root_E.addChild(E);
    var r26 = root_E.addChild(pl);
    var r27 = root_E.addChild(T);
    var r28 = E.addChild(TT);
    var r29 = TT.addChild(FF);
    var r30 = FF.addChild(II);
    var r31 = II.addChild(aa);
    var r32 = T.addChild(TTT);
    var r33 = T.addChild(mul);
    var r34 = T.addChild(F);
    var r35 = TTT.addChild(FFF);
    var r36 = FFF.addChild(III);
    var r37 = III.addChild(b);
    var r38 = F.addChild(I);
    var r39 = I.addChild(a);
    // tr3.layout();
    tr3.layout();
    av.step();

    //frame 5
    av.umsg("Try to get a derivation tree with the other meaning of $a+b*c$, when * is closer to the root of the tree.<br> $E\\Rightarrow T\\Rightarrow T*F...$ Then the only way to include a '+' before the multiplication is if the addition is enclosed in parenthesis. Thus, there is only one meaning that is accepted.")

    av.step();

    //frame 6
    av.umsg("$\\textbf {Definition}$: If $L$ is CFL and $G$ is an unambiguous CFG such that $L=L(G)$, then $L$ is unambiguous.");
    tr3.hide();
    av.step();

    //frame 7
    av.umsg("Backus-Naur Form of a grammar:<br> Nonterminals are enclosed in brackets <><br> For '$\\rightarrow$' use instead '::='");
    av.step();

    //frame 8
    av.umsg("$\\textbf {Sample C++ Program}$:<br>main () {<br> int a;     int b;   int sum;<br> a = 40;    b = 6;   sum = a + b;<br> cout << 'sum is '<< sum << endl;<br>}");
    av.step();

    //frame 9
    av.umsg("$\\textbf {'Attempt' to write a CFG for C++ in BNF}$ (Note: <program> is start symbol of grammar.)<br> \&lt;program&gt;\ ::= main() \&lt;block&gt;\ <br> \&lt;block&gt;\ ::= $\\{\&lt;stmt-list&gt;\\\}$ <br> \&lt;stmt-list&gt;\ ::=  \&lt;stmt&gt;\ |  \&lt;stmt&gt;\  \&lt;stmt-list&gt;\ |  \&lt;decl&gt;\ |  \&lt;decl&gt;\  \&lt;stmt-list&gt;\ <br>  \&lt;decl&gt;\ ::= int \&lt;id&gt;\  ; | double \&lt;id&gt;\  ;<br> \&lt;stmt&gt;\ ::= \&lt;asgn-stmt&gt;\ |\&lt;cout-stmt&gt;\ <br> \&lt;asgn-stmt&gt;\ ::= \&lt;id&gt;\ <br> \&lt;expr&gt;\ ::= \&lt;expr&gt;\ + \&lt;expr&gt;\ | \&lt;expr&gt;\ * \&lt;expr&gt;\ | ( \&lt;expr&gt;\ ) | \&lt;id&gt;\ cout \&lt;out-list&gt;\ <br> \&lt;cout-stmt&gt;\ ::= cout \&lt;out-list&gt;\ <br> etc., Must expand all nonterminals!<br> So a derivation of the program test would look like: <br> \&lt;program&gt;\ $\\Rightarrow$ main() \&lt;block&gt;\ <br> $\\Rightarrow$ main() $\\{\&lt;stmt-list&gt;\ \\}$ <br> $\\Rightarrow$ main() $\\{\&lt;decl&gt;\ \&lt;stmt-list&gt;\ \\}$ <br> $\\Rightarrow$ main() $\\{int \&lt;id&gt;\ \&lt;stmt-list&gt;\ \\}$ <br> $\\Rightarrow$ main() $\\{int a \&lt;stmt-list&gt;\ \\}$ <br> $\\Rightarrow$ complete C++ program");
    av.step();

    //frame 10
    av.umsg("$\\textbf {More on CFG for C++}$ <br>    Last time we 'attempted' to write a CFG for C++, it is possible to write a CFG that recognizes all syntactically correct C++ programs, but there is a problem that the CFG also accepts incorrect programs. For example, it can't recognize that it is an error to declare the same variable twice, once as an integer and once as a char.<br> We can write a CFG G such that L(G)={syntactically correct C++ programs}.<br>But note that $\\{semantically correct C++ programs\\} \\subset L(G)$.<br> Another example: Can't recognize if formal parameters match actual parameters in number and type:<br>declare: int Sum(int a, int b, int c) ...<br> call: newsum = Sum(x,y);");
    av.step();

    // //frame 11
    // av.umsg("$\\textbf {Definition}$: String derivation is to start at the starting point of the grammar and do replacements until you can do no more replacements. A variable in the grammar can be replaced by the right hand side of its rule");
    // av.step();

    // //i don't know if i should put this as a question or not
    // //Example 6.1.3
    // // G=({S,A,B},{a,b,c},S,P)
    // // S→AcB
    // // A→aAa | λ
    // // B→Bbb | λ
    // // L(G)={a2ncb2m|n,m≥0}
    // // Note this is a context-free language and also a regular language.
    // // Derivations of aacbb:
    // // 1. S⇒A⎯⎯⎯cB⇒aA⎯⎯⎯acB⇒aacB⎯⎯⎯⇒aacB⎯⎯⎯bb⇒aacbb
    // // 2. S⇒AcB⎯⎯⎯⇒AcB⎯⎯⎯bb⇒A⎯⎯⎯cbb⇒aA⎯⎯⎯acbb⇒aacbb
    // // Note: Next variable to be replaced is underlined.
    // // There are more derivations of this.
    // // This grammar is not a linear grammar, as there is a choice of which variable to replace.
    

    // //frame 6
    // av.umsg("$\\textbf {Definition}$: Leftmost derivation: in each step of a derivation, replace the leftmost variable. <br> $\\textbf {Definition}$: Rightmost derivation: in each step of a derivation, replace the rightmost variable. <br> $\\textbf {Derivation Trees}$ (also known as 'parse trees'): A derivation tree represents a derivation, but does not show the order in which productions were applied.");
    // av.step();

    // //frame 6
    // av.umsg("A derivation tree for $G=(V,T,S,P)$:<br>root is labeled $S$ <br>leaves are labeled $x$, where $x\\in T\\cup \\{\\lambda \\}$ <br> nonleaf vertices labeled $A$,$A\\in V$<br> For rule $A\\rightarrow a_1a_2a_3…a_n$, where $A\\in V$,$a_i\\in(T\\cup V\\cup \\{\\lambda \\}$)");
    // var label = av.label("...", {left: 450, top: 93});
    // var label2 = av.label("A", {left: 405, top: 4});
    // var label3 = av.label("a\u2081", {left: 280, top: 93});
    // var label4 = av.label("a\u2082", {left: 345, top: 93});
    // var label5 = av.label("a\u2083", {left: 410, top: 93});
    // var label6 = av.label("a\u2099", {left: 490, top: 93});
    // var c = av.g.circle(410, 28, 17);
    // var c1 = av.g.circle(285, 120, 17);
    // var c2 = av.g.circle(350, 120, 17);
    // var c3 = av.g.circle(415, 120, 17);
    // var c4 = av.g.circle(495, 120, 17);
    // var l1 = av.g.line(410, 45, 285, 103);
    // var l2 = av.g.line(410, 45, 350, 103);
    // var l3 = av.g.line(410, 45, 415, 103);
    // var l4 = av.g.line(410, 45, 495, 103);
    // av.step();

    // av.umsg(Frames.addQuestion("q4"));
    // c.hide();
    // c1.hide();
    // c2.hide();
    // c3.hide();
    // c4.hide();
    // l1.hide();
    // l2.hide();
    // l3.hide();
    // l4.hide();
    // label.hide();
    // label2.hide();
    // label3.hide();
    // label4.hide();
    // label5.hide();
    // label6.hide();
    // // var tr = av.ds.tree({nodegap: 15});
    // // var root_s_1 = tr.root("s");
    // // var A_1 = tr.newNode("A");
    // // var A_2 = tr.newNode("A");
    // // var a_1 = tr.newNode("a");
    // // var a_2 = tr.newNode("a");
    // // var B_1 = tr.newNode("B");
    // // var c_1 = tr.newNode("c");
    // // var r1 = root_s_1.addChild(A_1);
    // // var r2 = root_s_1.addChild(c_1);
    // // var r3 = root_s_1.addChild(B_1);
    // // A_1.addChild(a_1);
    // // A_1.addChild(A_2);
    // // A_1.addChild(a_2);
    
    // // tr.layout();
    // av.step();

    // //frame 7
    // av.umsg(Frames.addQuestion("q5"));
    // av.step();

    // //frame 8
    // av.umsg("A partial derivation tree that has root S (so it is a sentential form):");
    // av.step();

    // //frame 9
    // av.umsg("$\\textbf {Membership}$: Given CFG $G$ and string $w\\in \\sum^*$, is $w\\in L(G)$? <br> If we can find a derivation of $w$, then we would know that $w$ is in L(G).")
    // tr.hide();
    // av.step();

    // //frame 10
    // av.umsg(Frames.addQuestion("q6"));
    // av.step();

    // //frame 11
    // av.umsg("$\\textbf {Exhaustive Search Algorithm}$ <br> If you were to run this in OpenFLAP, it takes a LONG time, but eventually accepts. The problem is that this approach is rather inefficient since it is using an exhaustive search for all ways of expanding from the start symbol. <br> For all $i=1,2,3,…$ <br>Examine all sentential forms yielded by $i$ substitutions");
    // av.step();

    // //frame 12
    // av.umsg("Is $abbab\\in L(G)$? <br> $i=1$<br> 1. $S\\Rightarrow SS$ <br> 2. $S\\Rightarrow aSa$<br> 3. $S\\Rightarrow$<br> 4. $S\\Rightarrow \\lambda$ <br> i=2 <br>1. $S\\Rightarrow SS \\Rightarrow SS$S<br> 2. $S\\Rightarrow SS\\Rightarrow aSaS$<br3. $S\\Rightarrow SS\\Rightarrow bS$<br> 4. $S\\Rightarrow SS\\Rightarrow S$ <br> 5. $S\\Rightarrow aSa\\Rightarrow aSSa$ <br> When $i=6$ we will find the derivation of $w$. <br> $\\textbf {\\{S$\\Rightarrow$ SS$\\Rightarrow$ aSaS$\\Rightarrow$ aSSaS$\\Rightarrow$ abSaS$\\Rightarrow $abba$\\Rightarrow $abbab\\}}$");
    // av.step();

    // //frame 13
    // av.umsg("Yet, what if $w$ is not in $L(G)$? We want to consider special forms of context free grammars such that we can determine when strings are or are not in the language. It turns out to be easy take a context-free grammar and convert it into a special form that makes it easier to test membership.")
    // av.step();

    // //frame 14
    // av.umsg("Theorem: If CFG G does not contain rules of the form<br>    $A\\rightarrow \\lambda$<br>    $A\\rightarrow B$<br>    where A,B∈V, then we can determine if $w\\in L(G)$ or if $w\\notin L(G)$.<br>    $\\textbf {Proof}$: Consider <br>        1. length of sentential forms <br>    2. number of terminal symbols in a sentential form <br>    Either 1 or 2 increases with each derivation.<br> Derivation of string $w$ in $L(G)$ takes $\\le 2|w|$ times through loop in the exhaustive algorithm.<br> Thus, if there are $>2|w|$ times through loop, then $w\\notin L(G)$.");
    // av.step();

    // //frame 15
    // av.umsg("Let $L2=L1−\\{\\lambda \\}$. $L2=L(G)$ where $G$ is:<br>   $ S\\rightarrow SS | aa | aSa | b$ <br>    NOTE that this grammar is in the correct form for the theorem.<br> Show $baaba\\notin L(G)$. <br>  $i=1$<br>    1. $S\\Rightarrow SS$ <br>    2. $S\\Rightarrow aSa$<br>    3. $S\\Rightarrow aa$<br>    4. $S\\Rightarrow b$<br> $i=2$<br>    1. $S\\Rightarrow SS\\Rightarrow SSS$ <br>    2. $S\\Rightarrow SS\\Rightarrow aSaS$<br>    3. $S\\Rightarrow SS\\Rightarrow aaS$<br>    4. $S\\Rightarrow SS\\Rightarrow bS$<br>    5. $S\\Rightarrow aSa\\Rightarrow aSSa$ <br>    6. $S\\Rightarrow aSa\\Rightarrow aaSaa$<br>    7. $S\\Rightarrow aSa\\Rightarrow aaaa$<br>    8. $S\\Rightarrow aSa\\Rightarrow aba$<br> With each substitution, either there is at least one more terminal or the length of the sentential form has increased.<br>    So after we process the loop for i=10, we can conclude that baaba is not in $L(G)$.")
    // av.step();

    // //frame 16
    // av.umsg("Definition: Simple grammar (or s-grammar) has all productions of the form: <br>    $A\\rightarrow ax$ <br>where $A\\in V$, $a\\in T$, and $x\\in V^∗$ AND any pair (A,a) can occur in at most one rule.<br>    If you use the exhaustive search method to ask if $w\\in L(G)$, where $G$ is an s-grammar, the number of terminals increases with each step.")
    // av.step();



    av.recorded();
});
