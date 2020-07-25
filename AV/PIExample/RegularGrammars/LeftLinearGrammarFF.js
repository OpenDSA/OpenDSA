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
 var Frames = PIFRAMES.init(av_name);

  //frame 1
  av.umsg("In previous modules, we studied how to convert an NFA to Right Regular Grammar, and how to convert Right Regular Grammars to NFA. In this module we will learn about converting Right Linear Grammars to Left Regular Grammars");
  av.displayInit();
   //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();
   //frame 3
  av.umsg(Frames.addQuestion("q3"));
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
   //frame 4
  av.umsg(Frames.addQuestion("q4"));
  var NFAoptions = {
    top: 250,
    left: 70,
    width: 500,
    height: 250
  };
  av.step();
   //frame 5
  var NFA = gToFAConverterWithQuestion(av_name, GToFAConverter, NFAoptions, {top: 10, left: -50}).builtDFA;
  NFA.enableDragging();
  av.step();
   //frame 11
  av.umsg(Frames.addQuestion("q11"));
  av.step();
   //frame 12
  var NodeS = NFA.getNodeWithValue('S');
  var NodeA = NFA.getNodeWithValue('A');
  var NodeF = NFA.getNodeWithValue('F');
  var edgeSS = NFA.getEdge(NodeS, NodeS);
  var edgeSA = NFA.getEdge(NodeS, NodeA);
  var edgeAA = NFA.getEdge(NodeA, NodeA);
  var edgeAF = NFA.getEdge(NodeA, NodeF);
  av.umsg(Frames.addQuestion("q12"));
  av.step();
   //frame 13
  av.umsg(Frames.addQuestion("q13"));
  edgeSA.addClass("testingLambda");
  edgeSA._label.addClass("testingLambda");
  av.step();
   //frame 14
  NFA.removeEdge(NodeS, NodeA);
  var edgeAS = NFA.addEdge(NodeA, NodeS, {weight: 'c'});
  av.umsg(Frames.addQuestion("q14"));
  edgeAF.addClass("testingLambda");
  edgeAF._label.addClass("testingLambda");
  av.step();
  //frame 15
  NFA.removeEdge(NodeA, NodeF);
  var edgeFA = NFA.addEdge(NodeF, NodeA, {weight: 'b'});
  av.umsg(Frames.addQuestion("q15"));
  av.step();
  
  //frame 16
  av.umsg("Convert the start state to be the final state.")
  toggleFinal(NFA, NodeS);
  toggleInitial(NFA, NodeS);
  av.step();
  
  //frame 17
  av.umsg(Frames.addQuestion("q17"))
  toggleFinal(NFA, NodeF);
  toggleInitial(NFA, NodeF);
  av.step();
   
  //frame 18
  av.umsg("Then resulting NFA (call it $NFA_{rev}$) will represent the reverse of the original Language, $L^R$.");
  GToFAConverter.grammerMatrix.hide();
  NFA.layout();
  av.step();

  //frame 19
  av.umsg(Frames.addQuestion("q19"));
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
  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();
  //frame 21
  grammerMatrix.modifyProduction(0,0,"$S$");
  grammerMatrix.modifyProduction(0,2,"$aS$")
  av.umsg(Frames.addQuestion("q21"));
  av.step();

  //frame 22 
  grammerMatrix.modifyProduction(1,0,"$A$");
  grammerMatrix.modifyProduction(1,2,"$bA$")
  av.umsg(Frames.addQuestion("q22"));
  av.step();
  
  //frame 23
  grammerMatrix.modifyProduction(2,0,"$A$");
  grammerMatrix.modifyProduction(2,2,"$cS$")
  av.umsg(Frames.addQuestion("q23"));
  av.step();
   
  //frame 24
  grammerMatrix.modifyProduction(3,0,"$F$");
  grammerMatrix.modifyProduction(3,2,"$bA$")
  av.umsg(Frames.addQuestion("q24"))
  av.step();

  //frame 25
  av.umsg("By reversing each production in the resulting Right Linear grammar, we will get the the Left Linear grammar for the reverse of $L^R$. So, we have the Left Linear grammar for $(L^R)^R = L$.");
  av.step();
  
  //frame 26
  av.umsg(Frames.addQuestion("q26"));
  grammerMatrix.highlight(0);
  av.step();
  
  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  grammerMatrix.modifyProduction(0,2,"$Sa$");
  grammerMatrix.unhighlight(0);
  grammerMatrix.highlight(1);
  av.step();
  
  //frame 28
  av.umsg(Frames.addQuestion("q28"));
  grammerMatrix.modifyProduction(1,2,"$Ab$")
  grammerMatrix.unhighlight(1);
  grammerMatrix.highlight(2);
  av.step();
  
  //frame 29
  av.umsg(Frames.addQuestion("q29"));
  grammerMatrix.modifyProduction(2,2,"$Sc$")
  grammerMatrix.unhighlight(2);
  grammerMatrix.highlight(3);
  av.step();
  //frame 30
  av.umsg(Frames.addQuestion("q30"));
  grammerMatrix.modifyProduction(3,2,"$Ab$")
  av.step();
  //frame 31
  av.umsg("Exactly. The resulting Grammar is the Left Linear Grammar for the original Right Linear Grammar.")
  grammerMatrix.unhighlight(3);
  GToFAConverter.grammerMatrix.show();
  av.recorded();
});
