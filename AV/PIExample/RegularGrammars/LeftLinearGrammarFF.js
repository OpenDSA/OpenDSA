$(document).ready(function() {
  "use strict";
  var av_name = "LeftLinearGrammarFF";
  var av = new JSAV(av_name);
  var arrow = String.fromCharCode(8594); 
  //var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object

  //frame 1
  av.umsg("In previous modules, we studied how to convert an NFA to Right Regular Grammar, and how to convert Right Regular Grammars to NFA. In this module we will learn about converting Right Linear Grammars to Left Regular Grammars");
  av.displayInit();
  av.umsg("We will construct an algorithm to convert any Right Linear grammar to a Left Linear grammar.");
  av.step();
  av.umsg("During the construction of the algorithm, we will convert the following grammr to Left Linear Grammar.");
  var matrixOptions = {
    left: 10,
    top:0,
    width: 300,
    height: 250
};
  var grammer =  "[\
    [\"S\",\"→\",\"aS\"],\
    [\"S\",\"→\",\"cA\"],\
    [\"A\",\"→\",\"bA\"],\
    [\"A\",\"→\",\"b\"]\
  ]";
  var GToFAConverter = new GrammarToFAConverter(av,grammer,matrixOptions);
  av.step();
  av.umsg("Since the Language $L$ has a Right Linear grammar, we can follow ``NFA from Regular Grammar'' proof in the previous modules to construct an NFA for the language.");
  var NFAoptions = {
    top: 250,
    left: 70,
    width: 500,
    height: 250
  };
  av.step();
  var NFA = gToFAConverterWithQuestion(av_name, GToFAConverter, NFAoptions, {top: 10, left: -50}).builtDFA;
  NFA.enableDragging();
  av.step();
  av.umsg("The next step in our algorithm is to REVERSE the NFA. This means that we need to filp all transitions and swap the start and final states.");
  av.step();
  var NodeS = NFA.getNodeWithValue('S');
  var NodeA = NFA.getNodeWithValue('A');
  var NodeF = NFA.getNodeWithValue('F');
  var edgeSS = NFA.getEdge(NodeS, NodeS);
  var edgeSA = NFA.getEdge(NodeS, NodeA);
  var edgeAA = NFA.getEdge(NodeA, NodeA);
  var edgeAF = NFA.getEdge(NodeA, NodeF);
  av.umsg("Since SS and AA edges are a loop, so reversing them will give the same edges.");
  av.step();
  av.umsg("Reverse $\\delta(S, c) = A$.");
  NFA.removeEdge(NodeS, NodeA);
  var edgeAS = NFA.addEdge(NodeA, NodeS, {weight: 'c'});
  edgeAS.addClass("testingLambda");
  edgeAS._label.addClass("testingLambda");
  av.step();
  av.umsg("Reverse $\\delta(A, b) = F$.");
  NFA.removeEdge(NodeA, NodeF);
  edgeAS.removeClass("testingLambda");
  edgeAS._label.removeClass("testingLambda");
  var edgeFA = NFA.addEdge(NodeF, NodeA, {weight: 'b'});
  edgeFA.addClass("testingLambda");
  edgeFA._label.addClass("testingLambda");
  av.step();
  edgeFA.removeClass("testingLambda");
  edgeFA._label.removeClass("testingLambda");
  av.umsg("Convert the start state to be the final state.")
  toggleFinal(NFA, NodeS);
  toggleInitial(NFA, NodeS);
  av.step();
  av.umsg("Convert the final state to be the initital state.")
  toggleFinal(NFA, NodeF);
  toggleInitial(NFA, NodeF);
  av.step();
  av.umsg("Then resulting NFA (call it $NFA_{rev}$) will represent the reverse of the original Language, $L^R$.");
  GToFAConverter.grammerMatrix.hide();
  NFA.layout();
  av.step();
  av.umsg("We can follow the ``RR Grammar from DFA'' proof from the slides to get the right linear grammar for $NFA_{rev}$. Thus, we have the right linear grammar for $L^R$.");
  var grammerMatrix = new GrammarMatrix( av,null, {style: "table", left: 10, top: 0});
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.createRow(["", arrow, ""]);
  
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  
  av.step();
  av.umsg("For the transition $\\delta(S, a) = S$ the right Gramamr will be $S\\rightarrow aS$");
  av.step();
  grammerMatrix.modifyProduction(0,0,"$S$");
  grammerMatrix.modifyProduction(0,2,"$aS$")
  av.umsg("For the transition $\\delta(A, b) = A$ the right Gramamr will be $A\\rightarrow bA$");
  av.step();
  grammerMatrix.modifyProduction(1,0,"$A$");
  grammerMatrix.modifyProduction(1,2,"$bA$")
  av.umsg("For the transition $\\delta(A, c) = S$ the right Gramamr will be $A\\rightarrow cS$");
  av.step();
  grammerMatrix.modifyProduction(2,0,"$A$");
  grammerMatrix.modifyProduction(2,2,"$cS$")
  av.umsg("For the transition $\\delta(F, b) = A$ the right Gramamr will be $F\\rightarrow cA$");
  av.step();
  grammerMatrix.modifyProduction(3,0,"$F$");
  grammerMatrix.modifyProduction(3,2,"$bA$")
  av.umsg("By reversing each production in the resulting Right Linear grammar, we will get the the Left Linear grammar for the reverse of $L^R$. So, we have the Left Linear grammar for $(L^R)^R = L$.");
  av.step();
  av.umsg("Reversing $S\\rightarrow aS$ will give $S\\rightarrow Sa$");
  grammerMatrix.highlight(0);
  av.step();
  av.umsg("Reversing $S\\rightarrow aS$ will give $S\\rightarrow Sa$");
  grammerMatrix.modifyProduction(0,2,"$Sa$")
  av.step();
  av.umsg("Reversing $A\\rightarrow bA$ will give $A\\rightarrow Ab$");
  grammerMatrix.unhighlight(0);
  grammerMatrix.highlight(1);
  av.step();
  av.umsg("Reversing $A\\rightarrow bA$ will give $A\\rightarrow Ab$");
  grammerMatrix.modifyProduction(1,2,"$Ab$")
  av.step();
  av.umsg("Reversing $A\\rightarrow cS$ will give $A\\rightarrow Sc$");
  grammerMatrix.unhighlight(1);
  grammerMatrix.highlight(2);
  av.step();
  av.umsg("Reversing $A\\rightarrow cS$ will give $S\\rightarrow Sc$");
  grammerMatrix.modifyProduction(2,2,"$Sc$")
  av.step();
  av.umsg("Reversing $F\\rightarrow bA$ will give $F\\rightarrow Ab$");
  grammerMatrix.unhighlight(2);
  grammerMatrix.highlight(3);
  av.step();
  av.umsg("Reversing $F\\rightarrow bA$ will give $F\\rightarrow Ab$");
  grammerMatrix.modifyProduction(3,2,"$Ab$")
  av.step();
  av.umsg("The resulting Grammar is the Left Linear Grammar for the original Right Linear Grammar.")
  grammerMatrix.unhighlight(3);
  GToFAConverter.grammerMatrix.show();
  av.recorded();

});
