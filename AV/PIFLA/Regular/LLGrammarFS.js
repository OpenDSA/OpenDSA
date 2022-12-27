$(document).ready(function() {
  "use strict";
  var av_name = "LLGrammarFS";
  var av = new JSAV(av_name);
  var arrow = String.fromCharCode(8594);
  
  var matrixOptions = {
    left: 20,
    top: 50,
    width: 300,
    height: 250
  };
  var grammar =  "[\
    [\"S\",\"→\",\"aS\"],\
    [\"S\",\"→\",\"cB\"],\
    [\"B\",\"→\",\"bB\"],\
    [\"B\",\"→\",\"b\"]\
  ]";
  var grammarArray = JSON.parse(grammar);
  var grammarMatrix = new GrammarMatrix(av, grammarArray, {style: "table", top: 0, left: 30});
  grammarMatrix.hide();
  var NFA = new av.ds.FA({width: 300, height: 260, left: 70, top: 200});
  NFA.hide();

  var NFA2 = new av.ds.FA({width: 300, height: 260, left: 70, top: 200});
  var nodeF2 = NFA2.addNode({left: 30, top: 10, value: "F"});
  var nodeB2 = NFA2.addNode({left: 180, top: 110, value: "B"});
  var nodeS2 = NFA2.addNode({left: 200, top: 190, value: "S"});
  toggleFinal(NFA2, nodeS2);
  toggleInitial(NFA2, nodeF2);
  var edgeSS2 = NFA2.addEdge(nodeS2, nodeS2, {weight: "a"});
  var edgeBB2 = NFA2.addEdge(nodeB2, nodeB2, {weight: "b"});
  var edgeSB2 = NFA2.addEdge(nodeB2, nodeS2, {weight: "c"});
  var edgeBF2 = NFA2.addEdge(nodeF2, nodeB2, {weight: "b"});
  NFA2.hide();
  
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Previously, we saw how to convert an NFA to a right-regular grammar (also known as a right-linear grammar), and how to convert a right-regular rrammar to an NFA. We also defined a regular grammar to be either a right-regular or left-regular grammar. But we have never actually shown that right- and left-regular grammars are equivalent. We will now show how to convert a right-regular grammar to a left-regular grammar.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("language"));
  grammarMatrix.show();
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("states"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("p1"));
  NFA.show();
  grammarMatrix.highlight(0);
  var nodeF = NFA.addNode({left: 30, top: 10, value: "F"});
  var nodeB = NFA.addNode({left: 180, top: 110, value: "B"});
  var nodeS = NFA.addNode({left: 200, top: 190, value: "S"});
  toggleInitial(NFA, nodeS);
  toggleFinal(NFA, nodeF);
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("p2"));
  grammarMatrix.unhighlight(0);
  grammarMatrix.highlight(1);
  var edgeSS = NFA.addEdge(nodeS, nodeS, {weight: "a"});
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("p3"));
  grammarMatrix.unhighlight(1);
  grammarMatrix.highlight(2);
  var edgeSB = NFA.addEdge(nodeS, nodeB, {weight: "c"});
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("p4"));
  grammarMatrix.unhighlight(2);
  grammarMatrix.highlight(3);
  var edgeBB = NFA.addEdge(nodeB, nodeB, {weight: "b"});
  av.step();

  // Frame 8
  av.umsg("This is the equivalent NFA for this regular grammar.");
  grammarMatrix.unhighlight(3);
  var edgeBF = NFA.addEdge(nodeB, nodeF, {weight: "b"});
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("reverse"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("loops"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("SB"));
  edgeSB.addClass("testingLambda");
  edgeSB._label.addClass("testingLambda");
  av.step();

  // Frame 12
  NFA.removeEdge(nodeS, nodeB);
  var edgeBS = NFA.addEdge(nodeB, nodeS, {weight: 'c'});
  av.umsg(Frames.addQuestion("BF"));
  edgeBF.addClass("testingLambda");
  edgeBF._label.addClass("testingLambda");
  av.step();

  // Frame 13
  NFA.removeEdge(nodeB, nodeF);
  var edgeFA = NFA.addEdge(nodeF, nodeB, {weight: 'b'});
  av.umsg(Frames.addQuestion("swapSF"));
  av.step();
  
  // Frame 14
  av.umsg(Frames.addQuestion("onefinal"));
  NFA.hide();
  NFA2.show();  
  av.step();
  
  // Frame 15
  av.umsg("Then resulting NFA (call it $NFA_{rev}$) accepts the reverse of the original Language $L$, so it accepts $L^R$. Recall that $L = a^*cbb^*$, and so $L^R = b^*bca^*$. Convince yourself that this machine is correct.");
  grammarMatrix.hide();
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("rrFB"));
  var grammerMatrix = new GrammarMatrix( av,null, {style: "table", left: 10, top: 0});
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
  av.step();

  // Frame 17
  grammerMatrix.modifyProduction(0,0,"$F$");
  grammerMatrix.modifyProduction(0,2,"$bB$")
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
  av.umsg(Frames.addQuestion("rrSS"));
  av.step();
  
  // Frame 20
  av.umsg(Frames.addQuestion("result"))
  grammerMatrix.modifyProduction(3,0,"$S$");
  grammerMatrix.modifyProduction(3,2,"$aS$")
  grammerMatrix.modifyProduction(4,0,"$S$");
  grammerMatrix.modifyProduction(4,2,"$\\lambda$")
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("revFB"));
  NFA2.hide();
  grammerMatrix.highlight(0);
  av.step();
  
  // Frame 22
  av.umsg(Frames.addQuestion("revBB"));
  grammerMatrix.modifyProduction(0,2,"$Bb$");
  grammerMatrix.unhighlight(0);
  grammerMatrix.highlight(1);
  av.step();
  
  // Frame 23
  av.umsg(Frames.addQuestion("revBS"));
  grammerMatrix.modifyProduction(1,2,"$Bb$")
  grammerMatrix.unhighlight(1);
  grammerMatrix.highlight(2);
  av.step();
  
  // Frame 24
  av.umsg(Frames.addQuestion("revSS"));
  grammerMatrix.modifyProduction(2,2,"$Sc$")
  grammerMatrix.unhighlight(2);
  grammerMatrix.highlight(3);
  av.step();

  // Frame 25
  av.umsg(Frames.addQuestion("resulttype"));
  grammerMatrix.modifyProduction(3,2,"$Sa$")
  av.step();
  
  // Frame 26
  av.umsg("Exactly. The resulting grammar is the left-regular grammar for the original right-linear grammar. Recall that the original grammar is for the language $a^*cbb^*$. Confirm for yourself that this grammar generates this language. (But don't forget that the start symbol is now F!)")
  grammerMatrix.unhighlight(3);
  av.step();
  
  // Frame 27
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
