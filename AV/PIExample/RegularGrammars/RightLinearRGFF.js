$(document).ready(function() {
  "use strict";
  var arrow = String.fromCharCode(8594);
  var av_name = "RightLinearRGFF";
  var av = new JSAV(av_name);
  var url = "../../../AV/VisFormalLang/Regular/Machines/FA1.jff"
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter;

  var grammerMatrix = new GrammarMatrix( av,null, {style: "table", left: 10, top: 300});
  var FA = new av.ds.FA({width: 300, height: 150, left: 10, url: url});
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
  //frame 1
  av.umsg("Last module we learned how to convert any Regular Grammar to NFA.");  
  av.displayInit();
  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();
  //frame 3
  av.umsg("Exactly, we need to prove the other way to be able to say that both are equivalent.");  
  av.step();
  //frame 4
  av.umsg("Theorem: $L$ is a regular language if and only if there exists a regular grammar $G$ such that $L=L(G)$.");
  av.step();
  //frame 5
  av.umsg("Suppose we need to convert this NFA to a Regular Grammar");
  FA.show();
  av.step();
  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();
  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();
  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  av.step();
  //frame 9
  av.umsg("Let us convert the NFA to RRG.");
  grammerMatrix.show();
  av.step();
  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();
  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  av.step();
  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  grammerMatrix.modifyProduction(0,0,"$Q_0$");
  grammerMatrix.modifyProduction(0,2,"$aQ_1$");
  av.step();
  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  grammerMatrix.modifyProduction(1,0,"$Q_1$");
  grammerMatrix.modifyProduction(1,2,"$bQ_1$");
  av.step();
  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  grammerMatrix.modifyProduction(2,0,"$Q_1$");
  grammerMatrix.modifyProduction(2,2,"$aQ_0$");
  av.step();
  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();
  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  grammerMatrix.modifyProduction(3,0,"$Q_1$");
  grammerMatrix.modifyProduction(3,2,"$\\lambda$");
  av.step();
  //frame 17
  av.umsg(Frames.addQuestion("q17"));
  av.step();
  av.step("Now we added new tool to deal with Regular Languages. Completed.")
  av.recorded();
});
