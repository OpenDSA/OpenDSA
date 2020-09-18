$(document).ready(function () {
  "use strict";
  var av_name = "RemoveUnitFF";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;

  var arrow = String.fromCharCode(8594);
  var grammar = "[[\"S\",\"→\",\"AB\"],\
                  [\"A\",\"→\",\"B\"],\
                  [\"B\",\"→\",\"C\"],\
                  [\"C\",\"→\",\"A\"],\
                  [\"C\",\"→\",\"c\"],\
                  [\"C\",\"→\",\"Da\"],\
                  [\"D\",\"→\",\"A\"]]";
  var grammerArray = JSON.parse(grammar);
  var grammerMatrix = new GrammarMatrix( av,grammerArray, {style: "table", left: 10, top: 150});
  grammerMatrix.hide();
  var grammerMatrix2 = new GrammarMatrix( av,null, {style: "table", left: 300, top: 150});
  grammerMatrix2.createRow(["", arrow, ""]);
  grammerMatrix2.createRow(["", arrow, ""]);
  grammerMatrix2.createRow(["", arrow, ""]);
  grammerMatrix2.createRow(["", arrow, ""]);
  grammerMatrix2.createRow(["", arrow, ""]);
  grammerMatrix2.createRow(["", arrow, ""]);
  grammerMatrix2.createRow(["", arrow, ""]);
  grammerMatrix2.createRow(["", arrow, ""]);
  grammerMatrix2.createRow(["", arrow, ""]);
  grammerMatrix2.createRow(["", arrow, ""]);
  grammerMatrix2.createRow(["", arrow, ""]);
  grammerMatrix2.createRow(["", arrow, ""]);
  grammerMatrix2.createRow(["", arrow, ""]);

  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.productions.push(["", arrow, ""]);
  grammerMatrix2.modifyProduction(0,0,"$S$");
  grammerMatrix2.modifyProduction(0,2,"$AB$");
  grammerMatrix2.modifyProduction(1,0,"$B$");
  grammerMatrix2.modifyProduction(1,2,"$Bb$");
  grammerMatrix2.modifyProduction(2,0,"$C$");
  grammerMatrix2.modifyProduction(2,2,"$c$");
  grammerMatrix2.modifyProduction(3,0,"$C$");
  grammerMatrix2.modifyProduction(3,2,"$Da$");
  for(var i = 4; i<14; i++)
    grammerMatrix2.hideRow(i);
  grammerMatrix2.hide();

  //frame 1
  av.umsg("Last section, we talked about the need to remove unit productions to enhance the membership problem algorithm");
  av.displayInit();
  
  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame 8
  av.umsg("To Remove unit-productions:");
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  grammerMatrix.show();
  av.step();

  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  var VDG = new av.ds.FA({left: 10, top: 400, width: 300});
  var S = VDG.addNode({value:"S", left: 0, top: 10});
  var A = VDG.addNode({value:"A", left: 50, top: 10});
  var B = VDG.addNode({value:"B", left:100, top: 10});
  var C = VDG.addNode({value:"C",left:25, top: 100});
  var D = VDG.addNode({value:"D", left:75, top: 100});
  grammerMatrix.highlight(1);
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  VDG.addEdge(A, B, {weight:" "});
  grammerMatrix.unhighlight(1);
  grammerMatrix.highlight(2);
  VDG.layout();
  av.step();
  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  VDG.addEdge(B, C, {weight:" "});
  grammerMatrix.unhighlight(2);
  grammerMatrix.highlight(3);
  VDG.layout();
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  VDG.addEdge(C, A, {weight:" "});
  grammerMatrix.unhighlight(4);
  grammerMatrix.highlight(6);
  VDG.layout();
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  VDG.addEdge(D, A, {weight:" "});
  grammerMatrix.unhighlight(7);
  VDG.layout();
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  grammerMatrix2.show();
  av.step();

  //frame 17
  av.umsg(Frames.addQuestion("q17"));
  var V = new av.ds.array(["$A \\stackrel{*}{\\Rightarrow} C$","$A \\stackrel{*}{\\Rightarrow} B$", "", "", "","","","",""], {left: 30, top: 550, indexed: true});
  av.step();

  //frame 18
  av.umsg(Frames.addQuestion("q18"));
  V.value(2, "$B \\stackrel{*}{\\Rightarrow} A$");
  V.value(3, "$B \\stackrel{*}{\\Rightarrow} C$");
  V.layout();
  av.step();

  //frame 19
  av.umsg(Frames.addQuestion("q19"));
  V.value(4, "$C \\stackrel{*}{\\Rightarrow} B$");
  V.value(5, "$C \\stackrel{*}{\\Rightarrow} A$");
  V.layout();
  av.step();

  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  V.value(6, "$D \\stackrel{*}{\\Rightarrow} C$");
  V.value(7, "$D \\stackrel{*}{\\Rightarrow} B$");
  V.value(8, "$D \\stackrel{*}{\\Rightarrow} A$");
  V.layout();
  V.highlight(0);
  av.step();

  //frame 21
  av.umsg(Frames.addQuestion("q21"));
  V.unhighlight(0);
  V.highlight(1);
  grammerMatrix2.showRow(4);
  grammerMatrix2.showRow(5);
  grammerMatrix2.modifyProduction(4,0,"$A$");
  grammerMatrix2.modifyProduction(4,2,"$c$");
  grammerMatrix2.modifyProduction(5,0,"$A$");
  grammerMatrix2.modifyProduction(5,2,"$Da$");
  av.step();

  //frame 22
  av.umsg(Frames.addQuestion("q22"));
  V.unhighlight(1);
  V.highlight(2);
  grammerMatrix2.showRow(6);
  grammerMatrix2.modifyProduction(6,0,"$A$");
  grammerMatrix2.modifyProduction(6,2,"$Bb$");
  av.step();

  //frame 23
  av.umsg(Frames.addQuestion("q23"));
  V.unhighlight(2);
  V.highlight(3);
  grammerMatrix2.showRow(7);
  grammerMatrix2.showRow(8);
  grammerMatrix2.modifyProduction(7,0,"$B$");
  grammerMatrix2.modifyProduction(7,2,"$c$");
  grammerMatrix2.modifyProduction(8,0,"$B$");
  grammerMatrix2.modifyProduction(8,2,"$Db$");
  av.step();

  //frame 24
  av.umsg(Frames.addQuestion("q24"));
  V.unhighlight(3);
  V.highlight(4);
  av.step();

  //frame 25
  av.umsg(Frames.addQuestion("q25"));
  V.unhighlight(4);
  V.highlight(5);
  grammerMatrix2.showRow(9);
  grammerMatrix2.modifyProduction(9,0,"$C$");
  grammerMatrix2.modifyProduction(9,2,"$Bb$");
  av.step();

  //frame 26
  av.umsg(Frames.addQuestion("q26"));
  V.unhighlight(5);
  V.highlight(6);
  av.step();

  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  V.unhighlight(6);
  V.highlight(7);
  grammerMatrix2.showRow(10);
  grammerMatrix2.showRow(11);
  grammerMatrix2.showRow(12);
  grammerMatrix2.modifyProduction(10,0,"$D$");
  grammerMatrix2.modifyProduction(10,2,"$Bb$");
  grammerMatrix2.modifyProduction(11,0,"$D$");
  grammerMatrix2.modifyProduction(11,2,"$c$");
  grammerMatrix2.modifyProduction(12,0,"$D$");
  grammerMatrix2.modifyProduction(12,2,"$Da$");
  av.step();

  //frame 28
  av.umsg(Frames.addQuestion("q28"));
  V.unhighlight(7);
  V.highlight(8);
  av.step();

  //frame 2
  av.umsg("We correctly removed all unit productions.");
  V.unhighlight(8);
  V.hide();
  
  av.recorded();


});