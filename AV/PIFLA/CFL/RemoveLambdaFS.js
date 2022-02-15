$(document).ready(function () {
  "use strict";
  var av_name = "RemoveLambdaFS";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);

  var arrow = String.fromCharCode(8594);
  var grammar = "[[\"S\",\"→\",\"AcB\"],\
                  [\"A\",\"→\",\"aAa\"],\
                  [\"A\",\"→\",\"λ\"],\
                  [\"B\",\"→\",\"Bbb\"],\
                  [\"B\",\"→\",\"λ\"]]";
  var grammerArray = JSON.parse(grammar);
  var grammerMatrix = new GrammarMatrix( av,grammerArray, {style: "table", left: 10, top: 90});
  grammerMatrix.hide();

  // Frame 1
  av.umsg("Previously we saw that we need to remove lambda productions to avoid running into an infinite loop when using brute force expansion of the derivation tree if the string is not in the language of the grammar.");
  av.displayInit();
  
  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  grammerMatrix.show();
  var V = new av.ds.array(["",""], {left: 30, top: 300, indexed: true});
  var ALabel =  av.label("$V_n$",{top:305, left: 10});
  av.step();

  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  V.value(0,"A");
  V.value(1,"B");
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  V.hide();
  ALabel.hide();
  av.step();

  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  var grammerMatrix2 = new GrammarMatrix( av,null, {style: "table", left: 250, top: 90});
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
  av.step();
  
  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  grammerMatrix2.modifyProduction(0,0,"$S$");
  grammerMatrix2.modifyProduction(0,2,"$AcB$");
  grammerMatrix2.modifyProduction(1,0,"$A$");
  grammerMatrix2.modifyProduction(1,2,"$aAa$");
  grammerMatrix2.modifyProduction(2,0,"$B$");
  grammerMatrix2.modifyProduction(2,2,"$Bbb$");
  grammerMatrix.highlight(0);
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  grammerMatrix2.modifyProduction(3,0,"$S$");
  grammerMatrix2.modifyProduction(3,2,"$cB$");
  av.step();

  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  grammerMatrix2.modifyProduction(4,0,"$S$");
  grammerMatrix2.modifyProduction(4,2,"$Ac$");
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  grammerMatrix2.modifyProduction(5,0,"$S$");
  grammerMatrix2.modifyProduction(5,2,"$c$");
  grammerMatrix.unhighlight(0);
  grammerMatrix.highlight(1);
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  grammerMatrix2.modifyProduction(6,0,"$A$");
  grammerMatrix2.modifyProduction(6,2,"$aa$");
  grammerMatrix.unhighlight(1);
  grammerMatrix.highlight(3);
  av.step();

  //frame 16

  av.umsg("Done. The resulting grammar has no $\\lambda$ productions");
  grammerMatrix2.modifyProduction(7,0,"$B$");
  grammerMatrix2.modifyProduction(7,2,"$bb$");
  grammerMatrix.unhighlight(3);
  av.recorded();

});
