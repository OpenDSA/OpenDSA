$(document).ready(function () {
    "use strict";
    var av_name = "Ambiguity";
    var av = new JSAV(av_name,);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("In the previous chapters, we see that some languages are regular languages, which means that we can define a DFA, NFA, Regular expression, or Regular grammar for them.");
    av.displayInit();

    //frame 2
    av.umsg("$\\textbf {Examples of regular languages}$:<br> keywords in a programming language<br> names of identifiers<br> integers<br> a finite list of miscillaneous symbols: = ;");
    av.step();

    //frame 3
    av.umsg("Then we covered the Pumping Lemma which is a tool to prove that if a language is not regular.");
    av.step();

    //frame 4
    av.umsg("$\\textbf {Examples for Not Regular languages}$:<br> expressions: $((a+b)−c)$<br>block structures ($\\{\\}$ in Java/C++ and begin ... end in Pascal)")
    av.step();

    //frame 5
    av.umsg("$\\textbf {Definition}$: A grammar $G=(V,T,S,P)$ is context-free if all productions are of the form <br> $A \\rightarrow x$<br> where $A \\in V$ and $x \\in (V∪T)^∗$.<br>(T includes $\\lambda$.)")
    av.step();

    //frame 6
    av.umsg("$\\textbf {Definition}$: L is a context-free language (CFL) iff $\\exists$ context-free grammar (CFG) $G$ such that $L=L(G)$.");
    av.step();

    //frame 7
    av.umsg(Frames.addQuestion("q1"));
    av.step();

    //frame 8
    av.umsg(Frames.addQuestion("q2"));
    av.step();

    //frame 9
    av.umsg("$\\textbf {Definition}$: A linear grammar has at most one variable on the right hand side of any production. Thus, right linear and left linear grammars are also linear grammars.");
    av.step();

    //frame 10
    av.umsg(Frames.addQuestion("q3"));
    av.step();

    //frame 11
    av.umsg("$\\textbf {Definition}$: String derivation is to start at the starting point of the grammar and do replacements until you can do no more replacements. A variable in the grammar can be replaced by the right hand side of its rule");
    av.step();

    //i don't know if i should put this as a question or not
    //Example 6.1.3
    // G=({S,A,B},{a,b,c},S,P)
    // S→AcB
    // A→aAa | λ
    // B→Bbb | λ
    // L(G)={a2ncb2m|n,m≥0}
    // Note this is a context-free language and also a regular language.
    // Derivations of aacbb:
    // 1. S⇒A⎯⎯⎯cB⇒aA⎯⎯⎯acB⇒aacB⎯⎯⎯⇒aacB⎯⎯⎯bb⇒aacbb
    // 2. S⇒AcB⎯⎯⎯⇒AcB⎯⎯⎯bb⇒A⎯⎯⎯cbb⇒aA⎯⎯⎯acbb⇒aacbb
    // Note: Next variable to be replaced is underlined.
    // There are more derivations of this.
    // This grammar is not a linear grammar, as there is a choice of which variable to replace.
    

    //frame 6
    av.umsg("$\\textbf {Definition}$: Leftmost derivation: in each step of a derivation, replace the leftmost variable. <br> $\\textbf {Definition}$: Rightmost derivation: in each step of a derivation, replace the rightmost variable. <br> $\\textbf {Derivation Trees}$ (also known as 'parse trees'): A derivation tree represents a derivation, but does not show the order in which productions were applied.");
    av.step();

    //frame 6
    av.umsg("A derivation tree for $G=(V,T,S,P)$:<br>root is labeled $S$ <br>leaves are labeled $x$, where $x\\in T\\cup \\{\\lambda \\}$ <br> nonleaf vertices labeled $A$,$A\\in V$<br> For rule $A\\rightarrow a_1a_2a_3…a_n$, where $A\\in V$,$a_i\\in(T\\cup V\\cup \\{\\lambda \\}$)");
    av.label("...", {left: 450, top: 93});
    av.label("A", {left: 405, top: 4});
    av.label("a\u2081", {left: 280, top: 93});
    av.label("a\u2082", {left: 345, top: 93});
    av.label("a\u2083", {left: 410, top: 93});
    av.label("a\u2099", {left: 490, top: 93});
    av.g.circle(410, 28, 17);
    av.g.circle(285, 120, 17);
    av.g.circle(350, 120, 17);
    av.g.circle(415, 120, 17);
    av.g.circle(495, 120, 17);
    av.g.line(410, 45, 285, 103);
    av.g.line(410, 45, 350, 103);
    av.g.line(410, 45, 415, 103);
    av.g.line(410, 45, 495, 103);
    av.step();

    //frame 6
    av.umsg();
    var bt = av.ds.tree({nodegap: 15});
  bt.root("S");
  var rt = bt.root();
  var lt = bt.newNode("A");
  var lt2 = bt.newNode("A");
  var lt3 = bt.newNode("B");
  var lt4 = bt.newNode("B");
  rt.addChild(lt);
  rt.addChild("c");
  rt.addChild(lt3);
  lt.addChild("a");
  lt.addChild(lt2);
  lt.addChild("a");
  lt2.addChild("λ");
  lt3.addChild(lt4);
  lt3.addChild("b");
  lt3.addChild("b");
  lt4.addChild("λ");
  bt.layout();
    av.step();

    //frame 6
    av.umsg();
    av.step();

    //frame 6
    av.umsg();
    av.step();

    //frame 6
    av.umsg();
    av.step();

    //frame 6
    av.umsg();
    av.step();

    //frame 6
    av.umsg();
    av.step();

    //frame 6
    av.umsg();
    av.step();





    av.recorded();
});
