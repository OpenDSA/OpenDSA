$(document).ready(function () {
  "use strict";
  var av_name = "GreibachNormalFormFF";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             //

  var arrow = String.fromCharCode(8594);
  var grammar = "[[\"S\",\"→\",\"AB\"],\
                  [\"S\",\"→\",\"Aa\"],\
                  [\"S\",\"→\",\"b\"],\
                  [\"A\",\"→\",\"cA\"],\
                  [\"A\",\"→\",\"c\"],\
                  [\"B\",\"→\",\"Ad\"],\
                  [\"B\",\"→\",\"e\"]]";
  var grammerArray = JSON.parse(grammar);
  var grammerMatrix = new GrammarMatrix( av,grammerArray, {style: "table", left: 10, top: 200});
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

  av.umsg("$\\textbf{Definition:}$ A CFG is in Greibach normal form (GNF) if all productions are of the form<br/>$A \\rightarrow ax$<br/>where $x \\in V^*$ and $a \\in T$");
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
  av.umsg("$\\textbf{Theorem:}$ For every CFG $G$ with $\\lambda$ not in L(G), $\\exists$ a grammar in GNF");
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  grammerMatrix.show();
  grammerMatrix.highlight(0);
  av.step();

  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  grammerMatrix.unhighlight(0);
  grammerMatrix.highlight(1);
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  grammerMatrix.unhighlight(1);
  grammerMatrix.highlight(2);
  grammerMatrix.modifyProduction(7,0,"$C_1$");
  grammerMatrix.modifyProduction(7,2,"$a$");
  grammerMatrix.showRow(7);
  //modify old production
  grammerMatrix.modifyProduction(1,2,"$A\\ C_1$");
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  grammerMatrix.unhighlight(2);
  grammerMatrix.highlight(3);
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  grammerMatrix.unhighlight(3);
  grammerMatrix.highlight(4);
  grammerMatrix.modifyProduction(8,0,"$C_2$");
  grammerMatrix.modifyProduction(8,2,"$c$");
  grammerMatrix.showRow(8);
  //modify old production
  grammerMatrix.modifyProduction(3,2,"$C_2\\ A$");
  av.step();
  
  //frame 17
  av.umsg(Frames.addQuestion("q17"));
  grammerMatrix.unhighlight(4);
  grammerMatrix.highlight(5);
  av.step();
  
  //frame 18
  av.umsg(Frames.addQuestion("q18"));
  grammerMatrix.unhighlight(5);
  grammerMatrix.highlight(6);
  grammerMatrix.modifyProduction(9,0,"$C_3$");
  grammerMatrix.modifyProduction(9,2,"$d$");
  grammerMatrix.showRow(9);
  //modify old production
  grammerMatrix.modifyProduction(5,2,"$A\\ C_3$");
  av.step();

  //frame 19
  av.umsg(Frames.addQuestion("q19"));
  grammerMatrix.unhighlight(6);
  av.step();

  //frame 20
  av.umsg("$\\textbf{Theorem:}$ For every CFG $G$ with $\\lambda$ not in L(G), $\\exists$ a grammar in GNF.<br/>1. Rewrite grammar in CNF.<br/>2.Relabel Variables $A_1, A_2, \\ldots A_n$ß");
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
  
  //frame 21
  av.umsg(Frames.addQuestion("q21"));
  av.step();

  //frame 22
  av.umsg(Frames.addQuestion("q22"));
  av.step();

  //frame 23
  av.umsg(Frames.addQuestion("q23"));
  grammerMatrix.highlight(3);
  grammerMatrix.modifyProduction(3,2,"$c\\ A_2$");
  av.step();

  //frame 24
  av.umsg(Frames.addQuestion("q24"));
  grammerMatrix.unhighlight(3);
  grammerMatrix.highlight(0);
  av.step();

  //frame 25
  av.umsg(Frames.addQuestion("q25"));
  grammerMatrix.unhighlight(0);
  grammerMatrix.highlight(1);
  grammerMatrix.modifyProduction(0,2,"$c\\ A_2\\ A_3$");
  grammerMatrix.modifyProduction(10,0,"$A_1$");
  grammerMatrix.modifyProduction(10,2,"$c\\ A_3$");
  grammerMatrix.showRow(10);

  av.step();

  //frame 26
  av.umsg(Frames.addQuestion("q26"));
  grammerMatrix.unhighlight(1);
  grammerMatrix.highlight(5);
  grammerMatrix.modifyProduction(1,2,"$c\\ A_2\\ A_4$");
  grammerMatrix.modifyProduction(11,0,"$A_1$");
  grammerMatrix.modifyProduction(11,2,"$c\\ A_4$");
  grammerMatrix.showRow(11);

  av.step();

  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  grammerMatrix.unhighlight(5);
  grammerMatrix.modifyProduction(5,2,"$c\\ A_2\\ A_6$");
  grammerMatrix.modifyProduction(12,0,"$A_3$");
  grammerMatrix.modifyProduction(12,2,"$c\\ A_6$");
  grammerMatrix.showRow(12);
  av.step();

  //frame 28
  av.umsg("The resulting Grammar is in GNF");

  //frame 29
  av.umsg("WHAT YOU SHOULD KNOW: know forms, GNF, CNF, unit production, left recursion, etc. Do not need to memorize rules for transforming, but should understand how to do it.");
  av.recorded();


});