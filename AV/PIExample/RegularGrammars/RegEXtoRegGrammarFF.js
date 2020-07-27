$(document).ready(function() {
  "use strict";
  var av_name = "RegEXtoRegGrammarFF";
  var av = new JSAV(av_name);
  var arrow = String.fromCharCode(8594); 
  //var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object

  var Frames = PIFRAMES.init(av_name);
  var grammerMatrix = new GrammarMatrix( av,null, {style: "table", left: 10, top: 0});
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.hide();
  //frame 1
  av.umsg("Suppose that we need to convert a RegEx to a Regualr Grammar.");
  av.displayInit();
  //frame 2
  av.umsg("The easiet, but lengthy process, is to <br>1- Convert the RegEx to NFA<br>2- Convert the resulting NFA to Regular Grammar");
  av.step();
  //frame 3
  av.umsg("This process is time consuming and error-prone, because it includes a lot of steps and any simple mistake in one step will lead to incorrect result.");
  av.step();
  //frame 4
  av.umsg("Another way is to build the Right Regular Grammar directly from the RegEx.");
  av.step();
  //frame 5
  av.umsg("Let us construc an algorithm to convert Regular Expressions to Right Regular Grammars");
  av.step();
  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();
  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();
  //frame 8
  av.umsg("Correct.<br/>$\\textbf{Single Terminal}$: If the RegEx is simply $a$ ($a$ being any terminal), we can write $G$, with only one production rule $S \\rightarrow a$ (where S is the start symbol), is an equivalent grammar for the RegEx $r= a$.");
  av.step();
  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();
  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();
  //Frame 11
  av.umsg("Correct.<br/>$\\textbf{Union Operation}$: If the RegEx is of the form $a + b$, where both $a$ and $b$ are terminals, we can write  $G$, with two production rules $S \\rightarrow a \\mid b$, is an equivalent RegEx.");
  av.step();
  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();
  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();
  //frame 14
  av.umsg("Correct.<br/>$\\textbf{Concatenation}$: If the RegEx is of the form $a \\cdot b$, where both $a$ and $b$ are terminals, we can write  $G$, with two production rules $S \\rightarrow aA$, $A \\rightarrow b$, is an equivalent RegEx.");
  av.step();
  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();
  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();
  //frame 17
  av.umsg("Correct.<br/>$\\textbf{Star-Closure}$: If the RegEx is of the form $a^*$, where $a$  is a terminal and $*$  Kleene star closure operation, we can write two production rules in $G$, $S \\rightarrow aS \\mid \\lambda$, is an equivalent RegEx.");
  av.step();
  //frame 18
  av.umsg(Frames.addQuestion("q18"));
  av.step();
  //frame 19
  av.umsg(Frames.addQuestion("q19"));
  av.step();
  //frame 20
  av.umsg("Correct.<br/>$\\textbf{Combination of Union and Star Closure}$: If the RegEx is of the form $(a + b)^*$, where both $a$ and $b$ are terminals, we can write three production rules in $G$, $S \\rightarrow aS \\mid bS | \\lambda$, is an equivalent RegEx.");
  av.step();
  //frame 21
  av.umsg(Frames.addQuestion("q21"));
  av.step();
  //frame 22
  av.umsg(Frames.addQuestion("q22"));
  av.step();
  //frame 23
  av.umsg("Correct.<br/>$\\textbf{Combination of Concatenation and Star Closure}$: If the RegEx is of the form $(a\\cdot b)^*$, where both $a$ and $b$ are terminals, we can write three production rules in $G$, $S \\rightarrow aA \\mid \\lambda$, $A \\rightarrow bS$, is an equivalent RegEx.");
  av.step();
  //frame 24
  av.umsg(Frames.addQuestion("q24"));
  av.step();
  //frame 25
  grammerMatrix.show();
  av.umsg(Frames.addQuestion("q25"));
  av.step();
  //frame 26
  grammerMatrix.modifyProduction(0,0,"$S$");
  grammerMatrix.modifyProduction(0,2,"$aS$");
  grammerMatrix.modifyProduction(1,0,"$S$");
  grammerMatrix.modifyProduction(1,2,"$bS$");
  grammerMatrix.modifyProduction(2,0,"$S$");
  grammerMatrix.modifyProduction(2,2,"$\\lambda$");
  av.umsg(Frames.addQuestion("q26"));
  av.step();
  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  grammerMatrix.highlight(2);
  av.step();
  //frame 28
  av.umsg("Exactly, the grammar for $(a+b)^*$ will be $S \\rightarrow aS\\mid bS\\mid A$, where the variable $A$ represents the $aa$ part.");
  av.step();
  //frame 29
  grammerMatrix.modifyProduction(2,2,"$A$");
  grammerMatrix.unhighlight(2);
  av.umsg(Frames.addQuestion("q29"));
  av.step();
  //frame 30
  grammerMatrix.modifyProduction(3,0,"$A$");
  grammerMatrix.modifyProduction(3,2,"$aaB$");
  av.umsg(Frames.addQuestion("q30"));
  av.step();
  //frame 31
  av.umsg(Frames.addQuestion("q31"));
  av.step();
  //frame 32
  grammerMatrix.modifyProduction(4,0,"$B$");
  grammerMatrix.modifyProduction(4,2,"$aB$");
  grammerMatrix.modifyProduction(5,0,"$B$");
  grammerMatrix.modifyProduction(5,2,"$bB$");
  grammerMatrix.modifyProduction(6,0,"$B$");
  grammerMatrix.modifyProduction(6,2,"$\\lambda$");
  av.umsg("The resulting Grammar is the Right Regular Grammar for the regular expression $(a+b)^*aa(a+b)^*$");
  av.step();
  //frame 33
  av.umsg("If you took a careful look at the process we followed you will notice that we have processed the RegEx from left to right and the result is a Right Linear Grammar.");
  av.step();
  //frame 34
  av.umsg("Let us trace how the resulting grammar will generate ($\\textbf{Trace}$) the string $abaabbb$");
  av.step();
  //frame 35
  av.umsg("We will start at the $\\textbf{begining}$ of the string. So, the grammar will use the prduction $S\\rightarrow aS$ then the production $S\\rightarrow bS$ to generate the $ab$");
  av.step();
  //frame 36
  av.umsg("After the $ab$ we have the substring $aa$. The grammar will use the production $S\\rightarrow A$ then the production $A \\rightarrow bbB$");
  av.step();
  //frame 37
  av.umsg("For the last substring $bbb$, the grammar will use the prduction $B\\rightarrow Bb$ 3 times");
  av.step();
  //frame 38
  av.umsg("Since we reached the right end of the string, the grammar will terminate with the production $B\\rightarrow \\lambda$");
  av.step();
  //frame 39
  av.umsg("We will cover the term $\\textbf{string derivation}$ in detail in chapter 6.");
  av.step();
  //frame 40
  av.umsg("In the following module we will see the same process but for converting RegEx to a Left Linear Grammar.");
  av.recorded();
});

