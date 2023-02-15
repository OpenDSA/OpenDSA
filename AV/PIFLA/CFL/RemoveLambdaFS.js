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
  
  // Frame 2
  av.umsg(Frames.addQuestion("lambda"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("nochange"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("change"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("gendirect"));
  grammerMatrix.show();
  var V = new av.ds.array(["",""], {left: 30, top: 300, indexed: true});
  var ALabel =  av.label("$V_n$",{top:305, left: 10});
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("nomore"));
  V.value(0,"A");
  V.value(1,"B");
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("allvar"));
  V.hide();
  ALabel.hide();
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("copy"));
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
  
  // Frame 9
  av.umsg(Frames.addQuestion("S1"));
  grammerMatrix2.modifyProduction(0,0,"$S$");
  grammerMatrix2.modifyProduction(0,2,"$AcB$");
  grammerMatrix2.modifyProduction(1,0,"$A$");
  grammerMatrix2.modifyProduction(1,2,"$aAa$");
  grammerMatrix2.modifyProduction(2,0,"$B$");
  grammerMatrix2.modifyProduction(2,2,"$Bbb$");
  grammerMatrix.highlight(0);
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("S2"));
  grammerMatrix2.modifyProduction(3,0,"$S$");
  grammerMatrix2.modifyProduction(3,2,"$cB$");
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("S3"));
  grammerMatrix2.modifyProduction(4,0,"$S$");
  grammerMatrix2.modifyProduction(4,2,"$Ac$");
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("A1"));
  grammerMatrix2.modifyProduction(5,0,"$S$");
  grammerMatrix2.modifyProduction(5,2,"$c$");
  grammerMatrix.unhighlight(0);
  grammerMatrix.highlight(1);
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("B1"));
  grammerMatrix2.modifyProduction(6,0,"$A$");
  grammerMatrix2.modifyProduction(6,2,"$aa$");
  grammerMatrix.unhighlight(1);
  grammerMatrix.highlight(3);
  av.step();

  // Frame 14
  av.umsg("The resulting grammar represents the same language, but has no $\\lambda$ productions.");
  grammerMatrix2.modifyProduction(7,0,"$B$");
  grammerMatrix2.modifyProduction(7,2,"$bb$");
  grammerMatrix.unhighlight(3);
  av.step();

  // Frame 15
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
