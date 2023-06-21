$(document).ready(function () {
  "use strict";
  var av_name = "RemoveUnitFS";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);

  var arrow = String.fromCharCode(8594);
  var grammar = "[[\"S\",\"→\",\"AB\"],\
                  [\"A\",\"→\",\"B\"],\
                  [\"B\",\"→\",\"Bb\"],\
                  [\"B\",\"→\",\"C\"],\
                  [\"C\",\"→\",\"A\"],\
                  [\"C\",\"→\",\"c\"],\
                  [\"C\",\"→\",\"Da\"],\
                  [\"D\",\"→\",\"A\"]]";
  var grammarArray = JSON.parse(grammar);
  var grammarMatrix = new GrammarMatrix( av,grammarArray, {style: "table", left: 10, top: 45});
  grammarMatrix.hide();
  var grammarMatrix2 = new GrammarMatrix( av,null, {style: "table", left: 250, top: 45});
  grammarMatrix2.createRow(["", arrow, ""]);
  grammarMatrix2.createRow(["", arrow, ""]);
  grammarMatrix2.createRow(["", arrow, ""]);
  grammarMatrix2.createRow(["", arrow, ""]);
  grammarMatrix2.createRow(["", arrow, ""]);
  grammarMatrix2.createRow(["", arrow, ""]);
  grammarMatrix2.createRow(["", arrow, ""]);
  grammarMatrix2.createRow(["", arrow, ""]);
  grammarMatrix2.createRow(["", arrow, ""]);
  grammarMatrix2.createRow(["", arrow, ""]);
  grammarMatrix2.createRow(["", arrow, ""]);
  grammarMatrix2.createRow(["", arrow, ""]);
  grammarMatrix2.createRow(["", arrow, ""]);

  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.productions.push(["", arrow, ""]);
  grammarMatrix2.modifyProduction(0,0,"$S$");
  grammarMatrix2.modifyProduction(0,2,"$AB$");
  grammarMatrix2.modifyProduction(1,0,"$B$");
  grammarMatrix2.modifyProduction(1,2,"$Bb$");
  grammarMatrix2.modifyProduction(2,0,"$C$");
  grammarMatrix2.modifyProduction(2,2,"$c$");
  grammarMatrix2.modifyProduction(3,0,"$C$");
  grammarMatrix2.modifyProduction(3,2,"$Da$");
  for(var i = 4; i<14; i++)
    grammarMatrix2.hideRow(i);
  grammarMatrix2.hide();

  // Frame 1
  av.umsg("Next we will consider Unit Productions. These are productions that simply replace one variable with another, such as $A \\Rightarrow B$. When deriving a string, these seem an unnecessary step. Instead of going from $A$ to $B$ and then replacing $B$ with the RHS of one of its rules (such as $B \\Rightarrow bb$), we could simply go there directly with a rule like $A \\Rightarrow bb$. Of couse, this requires that we also replace every other production that has $B$ on its LHS with an equivalent production that has $A$ on its LHS.");
  av.displayInit();
  
  // Frame 2
  av.umsg(Frames.addQuestion("which"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("subst"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("nounit"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("fail"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("lambda"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("star"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("graph"));
  grammarMatrix.show();
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("AB"));
  var VDG = new av.ds.FA({left: 10, top: 345, width: 300});
  var S = VDG.addNode({value:"S", left: 0, top: 0});
  var A = VDG.addNode({value:"A", left: 50, top: 0});
  var B = VDG.addNode({value:"B", left:100, top: 0});
  var C = VDG.addNode({value:"C",left:25, top: 60});
  var D = VDG.addNode({value:"D", left:75, top: 60});
  grammarMatrix.highlight(1);
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("BC"));
  VDG.addEdge(A, B, {weight:" "});
  grammarMatrix.unhighlight(1);
  grammarMatrix.highlight(3);
  VDG.layout();
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("CA"));
  VDG.addEdge(B, C, {weight:" "});
  grammarMatrix.unhighlight(3);
  grammarMatrix.highlight(4);
  VDG.layout();
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("DA"));
  VDG.addEdge(C, A, {weight:" "});
  grammarMatrix.unhighlight(4);
  grammarMatrix.highlight(7);
  VDG.layout();
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("nonunit"));
  VDG.addEdge(D, A, {weight:" "});
  grammarMatrix.unhighlight(7);
  VDG.layout();
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("dfsA"));
  grammarMatrix2.show();
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("dfsB"));
  var V = new av.ds.array(["$A \\stackrel{*}{\\Rightarrow} C$","$A \\stackrel{*}{\\Rightarrow} B$", "", "", "","","","",""], {left: 5, top: 470, indexed: true});
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("dfsC"));
  V.value(2, "$B \\stackrel{*}{\\Rightarrow} A$");
  V.value(3, "$B \\stackrel{*}{\\Rightarrow} C$");
  V.layout();
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("dfsD"));
  V.value(4, "$C \\stackrel{*}{\\Rightarrow} B$");
  V.value(5, "$C \\stackrel{*}{\\Rightarrow} A$");
  V.layout();
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("repAC"));
  V.value(6, "$D \\stackrel{*}{\\Rightarrow} C$");
  V.value(7, "$D \\stackrel{*}{\\Rightarrow} B$");
  V.value(8, "$D \\stackrel{*}{\\Rightarrow} A$");
  V.layout();
  V.highlight(0);
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("repAB"));
  V.unhighlight(0);
  V.highlight(1);
  grammarMatrix2.showRow(4);
  grammarMatrix2.showRow(5);
  grammarMatrix2.modifyProduction(4,0,"$A$");
  grammarMatrix2.modifyProduction(4,2,"$c$");
  grammarMatrix2.modifyProduction(5,0,"$A$");
  grammarMatrix2.modifyProduction(5,2,"$Da$");
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("repBA"));
  V.unhighlight(1);
  V.highlight(2);
  grammarMatrix2.showRow(6);
  grammarMatrix2.modifyProduction(6,0,"$A$");
  grammarMatrix2.modifyProduction(6,2,"$Bb$");
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("repBC"));
  V.unhighlight(2);
  V.highlight(3);
  grammarMatrix2.showRow(7);
  grammarMatrix2.showRow(8);
  grammarMatrix2.modifyProduction(7,0,"$B$");
  grammarMatrix2.modifyProduction(7,2,"$c$");
  grammarMatrix2.modifyProduction(8,0,"$B$");
  grammarMatrix2.modifyProduction(8,2,"$Db$");
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("repCB"));
  V.unhighlight(3);
  V.highlight(4);
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("repCA"));
  V.unhighlight(4);
  V.highlight(5);
  grammarMatrix2.showRow(9);
  grammarMatrix2.modifyProduction(9,0,"$C$");
  grammarMatrix2.modifyProduction(9,2,"$Bb$");
  av.step();

  // Frame 24
  av.umsg(Frames.addQuestion("repDC"));
  V.unhighlight(5);
  V.highlight(6);
  av.step();

  // Frame 25
  av.umsg(Frames.addQuestion("repDB"));
  V.unhighlight(6);
  V.highlight(7);
  grammarMatrix2.showRow(10);
  grammarMatrix2.showRow(11);
  grammarMatrix2.showRow(12);
  grammarMatrix2.modifyProduction(10,0,"$D$");
  grammarMatrix2.modifyProduction(10,2,"$Bb$");
  grammarMatrix2.modifyProduction(11,0,"$D$");
  grammarMatrix2.modifyProduction(11,2,"$c$");
  grammarMatrix2.modifyProduction(12,0,"$D$");
  grammarMatrix2.modifyProduction(12,2,"$Da$");
  av.step();

  // Frame 26
  av.umsg(Frames.addQuestion("repDA"));
  V.unhighlight(7);
  V.highlight(8);
  av.step();

  // Frame 27
  av.umsg("We have now correctly removed all unit productions.");
  V.unhighlight(8);
  V.hide();
  av.step();

  // Frame 28
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
