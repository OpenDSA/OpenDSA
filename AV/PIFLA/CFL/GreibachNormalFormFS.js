$(document).ready(function () {
  "use strict";
  var av_name = "GreibachNormalFormFS";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);

  var arrow = String.fromCharCode(8594);
  var grammar = "[[\"S\",\"→\",\"AB\"],\
                  [\"S\",\"→\",\"Aa\"],\
                  [\"S\",\"→\",\"b\"],\
                  [\"A\",\"→\",\"cA\"],\
                  [\"A\",\"→\",\"c\"],\
                  [\"B\",\"→\",\"Ad\"],\
                  [\"B\",\"→\",\"e\"]]";
  var grammerArray = JSON.parse(grammar);
  var grammerMatrix = new GrammarMatrix( av,grammerArray, {style: "table", left: 10, top: 110});
  grammerMatrix.createRow(["", arrow, ""]);
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
  grammerMatrix.productions.push(["", arrow, ""]);
  for(var i = 7; i<12; i++)
    grammerMatrix.hideRow(i);
  grammerMatrix.hide();

  // Frame 1
  av.umsg("$\\textbf{Definition:}$ A CFG is in Greibach normal form (GNF) if all productions are of the form<br/>$A \\rightarrow ax$<br/>where $x \\in V^*$ and $a \\in T$");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("a"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("x"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("sgram"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("derive"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("cnf"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("whichcnf"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("cnfdef"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("notincnf"));
  grammerMatrix.show();
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("incnf"));
  grammerMatrix.modifyProduction(7,0,"$C_1$");
  grammerMatrix.modifyProduction(7,2,"$a$");
  grammerMatrix.showRow(7);
  //modify old production
  grammerMatrix.modifyProduction(1,2,"$A\\ C_1$");
  grammerMatrix.modifyProduction(8,0,"$C_2$");
  grammerMatrix.modifyProduction(8,2,"$c$");
  grammerMatrix.showRow(8);
  //modify old production
  grammerMatrix.modifyProduction(3,2,"$C_2\\ A$");
  grammerMatrix.modifyProduction(9,0,"$C_3$");
  grammerMatrix.modifyProduction(9,2,"$d$");
  grammerMatrix.showRow(9);
  //modify old production
  grammerMatrix.modifyProduction(5,2,"$A\\ C_3$");
  av.step();

  // Frame 11
  av.umsg("$\\textbf{Theorem:}$ For every CFG $G$ with $\\lambda$ not in L(G), $\\exists$ a grammar in GNF.<br/>1. Rewrite grammar in CNF.<br/>2.Relabel Variables $A_1, A_2, \\ldots A_n$");
  grammerMatrix.modifyProduction(0,0,"$A_1$");
  //S is A1, A is A2, B is A3
  grammerMatrix.modifyProduction(0,2,"$A_2\\ A_3$");
  grammerMatrix.modifyProduction(1,0,"$A_1$");
  //C1 is A4
  grammerMatrix.modifyProduction(1,2,"$A_2\\ A_4$");
  //pro2
  grammerMatrix.modifyProduction(2,0,"$A_1$");
  // pro 3
  grammerMatrix.modifyProduction(3,0,"$A_2$");
  //C2 is A5
  grammerMatrix.modifyProduction(3,2,"$A_5\\ A_2$");
  //pro 4
  grammerMatrix.modifyProduction(4,0,"$A_2$");
  //pro5
  grammerMatrix.modifyProduction(5,0,"$A_3$");
  //C3 is A6
  grammerMatrix.modifyProduction(5,2,"$A_2\\ A_6$");
  //pro 6
  grammerMatrix.modifyProduction(6,0,"$A_3$");
  //pro7
  grammerMatrix.modifyProduction(7,0,"$A_4$");
  //pro 8
  grammerMatrix.modifyProduction(8,0,"$A_5$");
  //pro 9
  grammerMatrix.modifyProduction(9,0,"$A_6$");
  av.step();
  
  // Frame 12
  av.umsg(Frames.addQuestion("leftrecur"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("a5"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("a2"));
  grammerMatrix.highlight(3);
  grammerMatrix.modifyProduction(3,2,"$c\\ A_2$");
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("a1"));
  grammerMatrix.unhighlight(3);
  grammerMatrix.highlight(0);
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("a1b"));
  grammerMatrix.unhighlight(0);
  grammerMatrix.highlight(1);
  grammerMatrix.modifyProduction(0,2,"$c\\ A_2\\ A_3$");
  grammerMatrix.modifyProduction(10,0,"$A_1$");
  grammerMatrix.modifyProduction(10,2,"$c\\ A_3$");
  grammerMatrix.showRow(10);
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("a3"));
  grammerMatrix.unhighlight(1);
  grammerMatrix.highlight(5);
  grammerMatrix.modifyProduction(1,2,"$c\\ A_2\\ A_4$");
  grammerMatrix.modifyProduction(11,0,"$A_1$");
  grammerMatrix.modifyProduction(11,2,"$c\\ A_4$");
  grammerMatrix.showRow(11);
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("done"));
  grammerMatrix.unhighlight(5);
  grammerMatrix.modifyProduction(5,2,"$c\\ A_2\\ A_6$");
  grammerMatrix.modifyProduction(12,0,"$A_3$");
  grammerMatrix.modifyProduction(12,2,"$c\\ A_6$");
  grammerMatrix.showRow(12);
  av.step();

  // Frame 19
  av.umsg("The resulting Grammar is in GNF");
  av.step();

  // Frame 20
  av.umsg("Done. At this point, you should know the forms CNF and GNF, and how to eliminate $\\lambda$ productions, unit productions, useless productions, and left recursion. You do not need to memorize all the rules for transforming, but you should understand what it means and how it is done.");
  av.step();

  // Frame 21
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
