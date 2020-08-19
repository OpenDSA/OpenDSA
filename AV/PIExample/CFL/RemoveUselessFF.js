$(document).ready(function () {
  "use strict";
  var av_name = "RemoveUselessFF";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;

  var arrow = String.fromCharCode(8594);
  var grammar = "[[\"S\",\"→\",\"aB\"],\
                  [\"S\",\"→\",\"bA\"],\
                  [\"A\",\"→\",\"aA\"],\
                  [\"B\",\"→\",\"Sa\"],\
                  [\"B\",\"→\",\"b\"],\
                  [\"C\",\"→\",\"cBc\"],\
                  [\"C\",\"→\",\"a\"],\
                  [\"D\",\"→\",\"bCb\"],\
                  [\"E\",\"→\",\"Aa\"],\
                  [\"E\",\"→\",\"b\"]]";
  var grammerArray = JSON.parse(grammar);
  var grammerMatrix = new GrammarMatrix( av,grammerArray, {style: "table", left: 10, top: 200});
  grammerMatrix.hide();
  var grammar2 = "[[\"S\",\"→\",\"aB\"],\
                  [\"B\",\"→\",\"Sa\"],\
                  [\"B\",\"→\",\"b\"],\
                  [\"C\",\"→\",\"cBc\"],\
                  [\"C\",\"→\",\"a\"],\
                  [\"D\",\"→\",\"bCb\"],\
                  [\"E\",\"→\",\"b\"]]";
  var grammerArray2 = JSON.parse(grammar2);
  var grammerMatrix2 = new GrammarMatrix( av,grammerArray2, {style: "table", left: 10, top: 200});
  grammerMatrix2.hide();
  var grammar3 = "[[\"S\",\"→\",\"aB\"],\
                  [\"B\",\"→\",\"Sa\"],\
                  [\"B\",\"→\",\"b\"]]";
  var grammerArray3 = JSON.parse(grammar3);
  var grammerMatrix3 = new GrammarMatrix(av,grammerArray3, {style: "table", left: 10, top: 200});
  grammerMatrix3.hide();
  //frame 1
  av.umsg("Consider this grammar $S \\rightarrow aB \\mid bA$<br>$A \\rightarrow aA$<br>$B \\rightarrow Sa$<br>$C \\rightarrow cBc \\mid a$<br> What can you say about this grammar?");
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
  av.umsg("As we saw, there are 2 types of useless productions.");
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //frame 11
  av.umsg("Removing useless production algorithm<br/>Since we have 2 types of useless productions, we need 2 steps to remove all of them.");
  av.step();

  //frame 12
  av.umsg("Removing useless production algorithm<br/>Let $G=(V,T,S,P)$<br/>1. Compute $V_1$= {Variables that can derive strings of terminals}");
  av.step();

  //frame 13
  av.umsg("Removing useless production algorithm<br/>Let $G=(V,T,S,P)$<br/>1. Compute $V_1$= {Variables that can derive strings of terminals}<br>$\\quad 1. V_1 = \\emptyset$");
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  grammerMatrix.show();
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  var V = new av.ds.array(["","","","",""], {left: 100, top: 550, indexed: true});
  var ALabel =  av.label("$V_1$",{top:550, left: 50});
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  V.value(0,"B");
  V.value(1,"C");
  V.value(2,"E");
  av.step();

  //frame 17
  av.umsg(Frames.addQuestion("q17"));
  V.value(3,"S");
  V.value(4,"D");
  av.step();

  //frame 18
  av.umsg(Frames.addQuestion("q18"));
  av.step();

  //frame 19
  av.umsg(Frames.addQuestion("q19"));
  av.step();

  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  grammerMatrix.hide();
  grammerMatrix2.show();
  av.step();

  //frame 21
  av.umsg("Removing useless production algorithm<br/>Let $G=(V,T,S,P)$<br/>2. Remove unreachable productions by using Variable Dependency Graph");
  V.hide();
  ALabel.hide();
  av.step();

  //frame 22
  av.umsg(Frames.addQuestion("q22"));
  av.step();

  //frame 23
  av.umsg(Frames.addQuestion("q23"));
  var VDG = new av.ds.FA({left: 120, top: 200, width: 300});
  var S = VDG.addNode({value:"S", left: 0});
  var B = VDG.addNode({value:"B", left: 50});
  var C = VDG.addNode({value:"C", left:100});
  var D = VDG.addNode({value:"D",left:150});
  var E = VDG.addNode({value:"E", left:200});
  grammerMatrix2.highlight(0);
  av.step();

  //frame 24
  av.umsg(Frames.addQuestion("q24"));
  VDG.addEdge(S, B, {weight:" "});
  VDG.layout();
  grammerMatrix2.unhighlight(0);
  grammerMatrix2.highlight(1);
  av.step();

  //frame 25
  av.umsg(Frames.addQuestion("q25"));
  VDG.addEdge(B, S, {weight:" "});
  grammerMatrix2.unhighlight(1);
  grammerMatrix2.highlight(3);
  VDG.layout();
  av.step();

  //frame 26
  av.umsg(Frames.addQuestion("q26"));
  VDG.addEdge(C, B, {weight:" "});
  grammerMatrix2.unhighlight(3);
  grammerMatrix2.highlight(5);
  VDG.layout();
  av.step();

  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  VDG.addEdge(D, C, {weight:" "});
  grammerMatrix2.unhighlight(5);
  VDG.layout();
  av.step();

  //frame 28
  av.umsg("The resulting grammar is the same grammar but without any useless productions");
  grammerMatrix2.hide();
  VDG.hide();
  grammerMatrix3.show();
  av.step();

  //frame 29
  av.umsg("Finally, How would you implement removing useless number (2)? How do you know which nodes are accessible from S?");
  grammerMatrix3.hide();
  av.step();

  //frame 30
  av.umsg("Finally, How would you implement removing useless number (2)? How do you know which nodes are accessible from S?<br/>The answer is to use the Depth First Search or Breadth First Search graph algorithms");
  av.recorded();
});