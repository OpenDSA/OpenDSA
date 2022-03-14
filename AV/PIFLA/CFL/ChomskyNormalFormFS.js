$(document).ready(function () {
  "use strict";
  var av_name = "ChomskyNormalFormFS";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);
  
  var arrow = String.fromCharCode(8594);
  var grammar = "[[\"S\",\"→\",\"CBcd\"],\
                  [\"B\",\"→\",\"b\"],\
                  [\"C\",\"→\",\"Cc\"],\
                  [\"C\",\"→\",\"e\"]]";
  var grammerArray = JSON.parse(grammar);
  var grammerMatrix = new GrammarMatrix( av,grammerArray, {style: "table", left: 10, top: 75});
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
  for(var i = 4; i<8; i++)
    grammerMatrix.hideRow(i);
  grammerMatrix.hide();

  // Frame 1
  av.umsg("To summarize what we have done so far: We have found algorithms to remove from any CFG the useless productions, $\\lambda$ productions, and unit productions.");
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
  av.umsg("Exactly, so we must follow the order<br/>1. Remove $\\lambda$-productions<br/>2. Remove unit productions<br/>3. Remove useless productions");
  av.step();

  //frame 8
  av.umsg("<b>Definition:</b> A CFG is in <b>Chomsky Normal Form (CNF)</b> if all productions are of the form<br/>$A \\rightarrow BC$ or $A \\rightarrow a$<br/>where $A, B, C \\in V$ and $a \\in T$<br/><br/>Why would you want to put a grammar in this form? Because it is easier to work with in proofs. We won't use this right away, but we will need this later in the semester.");
  av.step();

  //frame 9
  av.umsg("$\\textbf{Theorem:}$ Any CFG $G$ with $\\lambda$ not in L(G) has an equivalent grammar in CNF.");
  av.step();

  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  grammerMatrix.show();
  av.step();

  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  grammerMatrix.highlight(0);
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  grammerMatrix.unhighlight(0);
  grammerMatrix.highlight(2);
  grammerMatrix.showRow(4);
  grammerMatrix.showRow(5);
  grammerMatrix.modifyProduction(4,0,"$C_1$");
  grammerMatrix.modifyProduction(4,2,"$c$");
  grammerMatrix.modifyProduction(5,0,"$C_2$");
  grammerMatrix.modifyProduction(5,2,"$d$");
  //modify old production
  grammerMatrix.modifyProduction(0,2,"$C\\ B\\ C_1\\ C_2$");
  av.step();

  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  grammerMatrix.unhighlight(2);
  grammerMatrix.modifyProduction(6,0,"$C_3$");
  grammerMatrix.modifyProduction(6,2,"$c$");
  //modify old
  grammerMatrix.modifyProduction(2,2,"$C\\ C_3$");
  grammerMatrix.showRow(6);
  //For new step:
  grammerMatrix.highlight(0);
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  grammerMatrix.unhighlight(0);
  grammerMatrix.modifyProduction(0,2,"$C\\ D_1$");
  grammerMatrix.showRow(7);
  grammerMatrix.modifyProduction(7,0,"$D_1$");
  grammerMatrix.modifyProduction(7,2,"$B\\ C_1\\ C_2$");
  grammerMatrix.highlight(2);
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  grammerMatrix.unhighlight(2);
  grammerMatrix.highlight(7);
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  grammerMatrix.unhighlight(7);
  grammerMatrix.modifyProduction(8,0,"$D_2$");
  grammerMatrix.modifyProduction(8,2,"$C_1\\ C_2$");
  grammerMatrix.showRow(8);

  //modify old
  grammerMatrix.modifyProduction(7,2,"$B\\ D_2$");
  av.step();

  //frame 17
  av.umsg("The resulting grammar is in the CNF. This was quite easy once the grammar has had its $\\lambda$$ productions, unit productions, and useless productions removed.");
  av.recorded();
  
});
