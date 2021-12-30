$(document).ready(function() {
  "use strict";
  var arrow = String.fromCharCode(8594);
  var av_name = "NFAtoRGFS";
  var av = new JSAV(av_name);
  var url = "../../../AV/VisFormalLang/Regular/Machines/FA1.jff"
  var Frames = PIFRAMES.init(av_name);

  var FA = new av.ds.FA({top: -70, width: 300, height: 100, left: 10, url: url});
  var grammerMatrix = new GrammarMatrix( av,null, {style: "table", left: 10, top: 100});
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.createRow(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.productions.push(["", arrow, ""]);
  grammerMatrix.hide();
  FA.hide();

  // Frame 1
  av.umsg("Our second step in proving that a regular grammars can represent exactly the set of regular languages is to show that we can convert any NFA to a regular grammar. In particular, we will convert to a right-linear grammar.");   av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("RRG"));
  av.step();

  // Frame 3
  av.umsg("Let's see how we convert this NFA to a RRG.");
  FA.show();
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("states"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("rules"));
  av.step();

  // Frame 6
  av.umsg("We will convert this NFA to a RRG.");
  grammerMatrix.show();
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("start"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("Q0aQ1"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("Q1bQ1"));
  grammerMatrix.modifyProduction(0, 0, "$Q_0$");
  grammerMatrix.modifyProduction(0, 2, "$aQ_1$");
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("Q1aQ0"));
  grammerMatrix.modifyProduction(1,0,"$Q_1$");
  grammerMatrix.modifyProduction(1,2,"$bQ_1$");
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("final"));
  grammerMatrix.modifyProduction(2,0,"$Q_1$");
  grammerMatrix.modifyProduction(2,2,"$aQ_0$");
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("lambda"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("done"));
  grammerMatrix.modifyProduction(3,0,"$Q_1$");
  grammerMatrix.modifyProduction(3,2,"$\\lambda$");
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("equiv"));
  av.step();

  // Frame 15
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
