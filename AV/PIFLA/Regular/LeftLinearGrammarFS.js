$(document).ready(function() {
  "use strict";
  var av_name = "LeftLinearGrammarFS";
  var av = new JSAV(av_name);
  var arrow = String.fromCharCode(8594); 
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Previously, we saw how to convert an NFA to a right-regular grammar (also known as a right-linear grammar), and how to convert a right-regular rrammar to an NFA. We also defined a regular grammar to be either a right-regular or left-regular grammar. But we have never actually shown that right- and left-regular grammars are equivalent. We will now show how to convert a right-reglar grammar to a left-regular grammar.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("language"));
  var matrixOptions = {
    left: 10,
    top:0,
    width: 300,
    height: 250
  };
  var grammer =  "[\
    [\"S\",\"→\",\"aS\"],\
    [\"S\",\"→\",\"cB\"],\
    [\"B\",\"→\",\"bB\"],\
    [\"B\",\"→\",\"b\"]\
  ]";
  var GToFAConverter = new GrammarToFAConverter(av,grammer,matrixOptions);
  av.step();

  // Frames 3-8
  var NFAoptions = {
    top: 200,
    left: 70,
    width: 300,
    height: 260
  };
  var NFA = gToFAConverterWithQuestion(av_name, GToFAConverter, NFAoptions,
                                       {top: 10, left: -50}).builtDFA;
  NFA.enableDragging();
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("reverse"));
  av.step();

  // Frame 10
  var NodeS = NFA.getNodeWithValue('S');
  var NodeB = NFA.getNodeWithValue('B');
  var NodeF = NFA.getNodeWithValue('F');
  var edgeSS = NFA.getEdge(NodeS, NodeS);
  var edgeSB = NFA.getEdge(NodeS, NodeB);
  var edgeBB = NFA.getEdge(NodeB, NodeB);
  var edgeBF = NFA.getEdge(NodeB, NodeF);
  av.umsg(Frames.addQuestion("loops"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("SB"));
  edgeSB.addClass("testingLambda");
  edgeSB._label.addClass("testingLambda");
  av.step();

  // Frame 12
  NFA.removeEdge(NodeS, NodeB);
  var edgeBS = NFA.addEdge(NodeB, NodeS, {weight: 'c'});
  av.umsg(Frames.addQuestion("BF"));
  edgeBF.addClass("testingLambda");
  edgeBF._label.addClass("testingLambda");
  av.step();

  // Frame 13
  NFA.removeEdge(NodeB, NodeF);
  var edgeFA = NFA.addEdge(NodeF, NodeB, {weight: 'b'});
  av.umsg(Frames.addQuestion("swapSF"));
  av.step();
  
  // Frame 14
  av.umsg(Frames.addQuestion("onefinal"))
  toggleFinal(NFA, NodeS);
//  toggleInitial(NFA, NodeS);
  toggleFinal(NFA, NodeF);
//  toggleInitial(NFA, NodeF);
  av.step();
  
  // Frame 15
  av.umsg("Then resulting NFA (call it $NFA_{rev}$) accepts the reverse of the original Language $L$, so it accepts $L^R$.");
  GToFAConverter.grammerMatrix.hide();
  NFA.layout();
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("nfa2rr"));
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

  // Frame 17
  grammerMatrix.modifyProduction(0,0,"$S$");
  grammerMatrix.modifyProduction(0,2,"$aS$")
  av.umsg(Frames.addQuestion("rrBB"));
  av.step();

  // Frame 18
  grammerMatrix.modifyProduction(1,0,"$B$");
  grammerMatrix.modifyProduction(1,2,"$bB$")
  av.umsg(Frames.addQuestion("rrBS"));
  av.step();
  
  // Frame 19
  grammerMatrix.modifyProduction(2,0,"$B$");
  grammerMatrix.modifyProduction(2,2,"$cS$")
  av.umsg(Frames.addQuestion("rrFB"));
  av.step();
  
  // Frame 20
  grammerMatrix.modifyProduction(3,0,"$F$");
  grammerMatrix.modifyProduction(3,2,"$bB$")
  av.umsg(Frames.addQuestion("result"))
  av.step();

  // Frame 21
  av.umsg("Reversing each production in a right-regular grammar will give a left-regular grammar for the reverse language. So, doing that here will yield the result that we are looking for: a left-regular grammar for $(L^R)^R = L$.");
  av.step();
  
  // Frame 22
  av.umsg(Frames.addQuestion("revSS"));
  grammerMatrix.highlight(0);
  av.step();
  
  // Frame 23
  av.umsg(Frames.addQuestion("revBB"));
  grammerMatrix.modifyProduction(0,2,"$Sa$");
  grammerMatrix.unhighlight(0);
  grammerMatrix.highlight(1);
  av.step();
  
  // Frame 24
  av.umsg(Frames.addQuestion("revBS"));
  grammerMatrix.modifyProduction(1,2,"$Bb$")
  grammerMatrix.unhighlight(1);
  grammerMatrix.highlight(2);
  av.step();
  
  // Frame 25
  av.umsg(Frames.addQuestion("revFB"));
  grammerMatrix.modifyProduction(2,2,"$Sc$")
  grammerMatrix.unhighlight(2);
  grammerMatrix.highlight(3);
  av.step();

  // Frame 26
  av.umsg(Frames.addQuestion("resulttype"));
  grammerMatrix.modifyProduction(3,2,"$Bb$")
  av.step();
  
  // Frame 27
  av.umsg("Exactly. The resulting grammar is the left-regular grammar for the original right-linear grammar.")
  grammerMatrix.unhighlight(3);
  GToFAConverter.grammerMatrix.show();
  av.step();
  
  // Frame 28
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
