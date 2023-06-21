$(document).ready(function () {
  "use strict";
  var av_name = "RemoveUselessFS";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);

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
  var grammarArray = JSON.parse(grammar);
  var grammarMatrix = new GrammarMatrix( av,grammarArray, {style: "table", left: 10, top: 60});
  grammarMatrix.hide();
  var grammar2 = "[[\"S\",\"→\",\"aB\"],\
                  [\"B\",\"→\",\"Sa\"],\
                  [\"B\",\"→\",\"b\"],\
                  [\"C\",\"→\",\"cBc\"],\
                  [\"C\",\"→\",\"a\"],\
                  [\"D\",\"→\",\"bCb\"],\
                  [\"E\",\"→\",\"b\"]]";
  var grammarArray2 = JSON.parse(grammar2);
  var grammarMatrix2 = new GrammarMatrix( av,grammarArray2, {style: "table", left: 10, top: 140});
  grammarMatrix2.hide();
  var grammar3 = "[[\"S\",\"→\",\"aB\"],\
                  [\"B\",\"→\",\"Sa\"],\
                  [\"B\",\"→\",\"b\"]]";
  var grammarArray3 = JSON.parse(grammar3);
  var grammarMatrix3 = new GrammarMatrix(av,grammarArray3, {style: "table", left: 10, top: 60});
  grammarMatrix3.hide();

  // Frame 1
  av.umsg("Previously we raised the question of what to do when some variables cannot ever lead to a useful derivation. This frameset discusses how to recognize and remove useless productions.");
  av.displayInit();
  
  // Frame 2
  av.umsg(Frames.addQuestion("reachC"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("useless"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("remove"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("impossible"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("alluseless"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("nochange"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("unreachable"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("nonterm"));
  av.step();

  // Frame 10
  av.umsg("We will now show an algorithm for removing both types of useless productions. Since we have two types of useless productions, we will use two steps to remove them.");
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("initv1"));
  grammarMatrix.show();
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("firstiter"));
  var V = new av.ds.array(["","","","","",""], {left: 40, top: 410, indexed: true});
  var ALabel =  av.label("$V_1$",{top: 415, left: 10});
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("seconditer"));
  V.value(0,"B");
  V.value(1,"C");
  V.value(2,"E");
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("lastiter"));
  V.value(3,"S");
  V.value(4,"D");
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("doneiter"));
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("whichprods"));
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("doneyet"));
  grammarMatrix.hide();
  grammarMatrix2.show();
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("howmanyvar"));
  V.hide();
  ALabel.hide();
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("sb"));
  var VDG = new av.ds.FA({left: 120, top: 80, width: 300});
  var S = VDG.addNode({value:"S", left: 0});
  var B = VDG.addNode({value:"B", left: 50});
  var C = VDG.addNode({value:"C", left:100});
  var D = VDG.addNode({value:"D",left:150});
  var E = VDG.addNode({value:"E", left:200});
  grammarMatrix2.highlight(0);
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("bs"));
  VDG.addEdge(S, B, {weight:" "});
  VDG.layout();
  grammarMatrix2.unhighlight(0);
  grammarMatrix2.highlight(1);
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("cb"));
  VDG.addEdge(B, S, {weight:" "});
  grammarMatrix2.unhighlight(1);
  grammarMatrix2.highlight(3);
  VDG.layout();
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("dc"));
  VDG.addEdge(C, B, {weight:" "});
  grammarMatrix2.unhighlight(3);
  grammarMatrix2.highlight(5);
  VDG.layout();
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("whichremove"));
  VDG.addEdge(D, C, {weight:" "});
  grammarMatrix2.unhighlight(5);
  VDG.layout();
  av.step();

  // Frame 24
  av.umsg("The resulting Grammar $G'$ has $L(G)=L(G')$, and $G'$ has no useless productions.");
  grammarMatrix2.hide();
  VDG.hide();
  grammarMatrix3.show();
  av.step();

  // Frame 25
  av.umsg("Finally, How would you implement Part 2 of the algorithm to remove useless productions? How do you know which nodes are accessible from S?");
  grammarMatrix3.hide();
  av.step();

  // Frame 26
  av.umsg("Finally, How would you implement Part 2 of the algorithm to remove useless productions? How do you know which nodes are accessible from S?<br/><br/>The answer is to use a Depth First Search or Breadth First Search graph algorithm.");
  av.step();

  //Frame 27  
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
