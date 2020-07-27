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
  av.umsg("Suppose that we need to convert a RegEx to a Regualr Grammar.")
  av.displayInit();
  av.umsg("The easiet, but lengthy process, is to <br>1- Convert the RegEx to NFA<br>2- Convert the resulting NFA to Regular Grammar");
  av.step();
  av.umsg("This process is time consuming and error-prone, because it includes a lot of steps and any simple mistake in one step will lead to incorrect result.");
  av.step();
  av.umsg("Another way is to build the Right Regular Grammar directly from the RegEx.");
  av.step();
  av.umsg("Constructing an equivalent Right Regular Grammar from a Regular Expression Algorithm");
  av.step();
  av.umsg("$\\textbf{Single Terminal}$: If the RegEx is simply $a$ ($e$ being any terminal), we can write $G$, with only one production rule $S \\rightarrow$ a (where S is the start symbol), is an equivalent RegEx.");
  av.step();
  av.umsg("$\\textbf{Union Operation}$: If the RegEx is of the form $a + b$, where both $a$ and $b$ are terminals, we can write  $G$, with two production rules $S \\rightarrow a \\mid b$, is an equivalent RegEx.");
  av.step();
  av.umsg("$\\textbf{Concatenation}$: If the RegEx is of the form $a \\cdot b$, where both $a$ and $b$ are terminals, we can write  $G$, with two production rules $S \\rightarrow aA$, $A \\rightarrow b$, is an equivalent RegEx.");
  av.step();
  av.umsg("$\\textbf{Star-Closure}$: If the RegEx is of the form $a^*$, where $a$  is a terminal and $*$  Kleene star closure operation, we can write two production rules in $G$, $S \\rightarrow aS \\mid \\lambda$, is an equivalent RegEx.");
  av.step();
  av.umsg("$\\textbf{Combination of Union and Star Closure}$: If the RegEx is of the form $(a + b)^*$, where both $a$ and $b$ are terminals, we can write three production rules in $G$, $S \\rightarrow aS \\mid bS | \\lambda$, is an equivalent RegEx.");
  av.step();
  av.umsg("$\\textbf{Combination of Concatenation and Star Closure}$: If the RegEx is of the form $(a\\cdot b)^*$, where both $a$ and $b$ are terminals, we can write three production rules in $G$, $S \\rightarrow aA \\mid \\lambda$, $A \\rightarrow bS$, is an equivalent RegEx.");
  av.step();
  av.umsg("Let us see an example. We need to convert $(a+b)^*aa(a+b)^*$. $L(G)$ is any string that has aa.");
  av.step();
  grammerMatrix.show();
  av.umsg("To convert it to a Right Linear Grammar, we start with $(a+b)^*$. Based on the $\\textbf{Combination of Union and Star Closure}$, this part can be converted into, $S \\rightarrow aS \\mid bS \\mid \\lambda$");
  av.step();
  grammerMatrix.modifyProduction(0,0,"$S$");
  grammerMatrix.modifyProduction(0,2,"$aS$");
  grammerMatrix.modifyProduction(1,0,"$S$");
  grammerMatrix.modifyProduction(1,2,"$bS$");
  av.umsg("Since the part $(a+b)^*$ is followed by $aa$, so once $(a+b)^*$ is finished we need to generate the $aa$ part.");
  av.step();
  av.umsg("So the grammar for $(a+b)^*$ will be $S \\rightarrow aS\\mid bS\\mid A$, where the variable $A$ represents the $aa$ part.");
  av.step();
  grammerMatrix.modifyProduction(2,0,"$S$");
  grammerMatrix.modifyProduction(2,2,"$A$");
  av.umsg("Then we need to convert the part $aa$. Based on the step $\\textbf{Concatenation}$, $aa$ can be represented by the production: $A \\rightarrow aaB$, or we can make it into 2 production rules like $A \\rightarrow aX$, and $X\\rightarrow aB$");
  av.step();
  grammerMatrix.modifyProduction(3,0,"$A$");
  grammerMatrix.modifyProduction(3,2,"$aaB$");
  av.umsg("Finally, since after we generate the substring $aa$, we can generate $(a+b)^*$. So, the variable $B$ will represents $(a+b)^*$. The last part productions will be: $B\\rightarrow aB\\mid bB\\mid \\lambda$");
  av.step();
  grammerMatrix.modifyProduction(4,0,"$B$");
  grammerMatrix.modifyProduction(4,2,"$aB$");
  grammerMatrix.modifyProduction(5,0,"$B$");
  grammerMatrix.modifyProduction(5,2,"$bB$");
  grammerMatrix.modifyProduction(6,0,"$B$");
  grammerMatrix.modifyProduction(6,2,"$\\lambda$");
  av.umsg("The resulting Grammar is the Right Regular Grammar for the regular expression $(a+b)^*aa(a+b)^*$");
  av.step();
  av.umsg("If you took a careful look at the process we followed you will notice that we have processed the RegEx from left to right and the result is a Right Linear Grammar.");
  av.step();
  av.umsg("In the following module we will see the same process but for converting RegEx to a Left Linear Grammar.");
  av.step();
  av.umsg("Let us trace how the resulting grammar will generate ($\\textbf{Trace}$) the string $abaabbb$");
  av.step();
  av.umsg("We will start at the $\\textbf{begining}$ of the string. So, the grammar will use the prduction $S\\rightarrow aS$ then the production $S\\rightarrow bS$ to generate the $ab$");
  av.step();
  av.umsg("After the $ab$ we have the substring $aa$. The grammar will use the production $S\\rightarrow A$ then the production $A \\rightarrow bbB$");
  av.step();
  av.umsg("For the last substring $bbb$, the grammar will use the prduction $B\\rightarrow Bb$ 3 times");
  av.step();
  av.umsg("Since we reached the right end of the string, the grammar will terminate with the production $B\\rightarrow \\lambda$");
  av.step();
  av.umsg("We will cover the term $\\textbf{string derivation}$ in detail in chapter 6.");
  
  av.recorded();

});

