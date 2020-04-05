$(document).ready(function() {
    "use strict";
    var av_name = "RegularGrammar";
    var av = new JSAV(av_name);
    
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("$\\textbf {Regular Grammars}$ (RegEx or R.E.) are another way to describe regular languages. $\\textbf {Regular Grammar}$ is a special typr of grammar and let's see what makes a grammar regular.");
    av.displayInit();

    //frame 2
    av.umsg("Suppose we have the following Grammar $G$ = $(V,T,S,P)$ where, <br> $V$ = $variables(nonterminals)$ = $A, B, ...Z$<br> $T$ = $terminals$ = $a,b,...,z,0,1,...9$ <br> $S$ = $start \\ symbol$ <br> $P$ = $productions(rules)$<br> $V,T$ and $P$ are finite sets")
    av.step();

    //frame 3
    av.umsg("$Linear \\ grammar$: A grammar that is linear if has a single variable in the RHS of every production rule. <br> $All \\ productions \\ are \\ of \\ the \\ form$ <br> $A$ $\\rightarrow$ $xB$ <br> $A \\ \\rightarrow Cx$ <br> $A \\ \\rightarrow x$ <br> $where \\ A,B,C \\in V, \\ x \\in \\ T^*$ <br> In this grammar, each production rule has at most one variable on the RHS");
    av.step();

    //frame 4
    av.umsg("$Right-linear \\ grammar$ is a special case of linear grammar.If a grammar is linear and any variable, if it exists, always occurs at the right end of the RHS, then the grammar is called a Right-linear grammar. For example, the grammar: <br> $A \\ \\rightarrow xB$ <br> $A \\ \\rightarrow xC$<br> $A \\ \\rightarrow y$<br> $where \\ A,B,C \\in V \\ and \\ x,y \\in T^*$");
    av.step();

    //frame 5
    av.umsg("$Left-linear \\ grammar$ is the same as $Right-linear \\ grammar$, but the occurance of any variable, if it exists, is at the begining of each production RHS. For example, <br> $A \\ \\rightarrow Bx$ <br> $A \\ \\rightarrow Cy$ <br> $A \\ \\rightarrow x$ <br> $where \\ A,B,C \\in V \\ x,y \\in T^*$");
    av.step();

    //frame 6
    av.umsg(Frames.addQuestion("q0"));
    av.step();

    //frame 7
    av.umsg(Frames.addQuestion("q1"));
    av.step();

    //frame 8
    av.umsg("We now have covered<br> Definition: DFA represents regular language <br> Theorem: NFA $\\Longleftrightarrow$ DFA<br> Theorem: RE $\\Longleftrightarrow$ NFA .<br> The next step will be Theorem: $\\Longleftrightarrow$ regular grammar");
    av.step();

    //frame 9


    av.recorded();
});