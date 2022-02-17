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
  var grammerArray = JSON.parse(grammar);
  var grammerMatrix = new GrammarMatrix( av,grammerArray, {style: "table", left: 10, top: 100});
  grammerMatrix.hide();
  var grammar2 = "[[\"S\",\"→\",\"aB\"],\
                  [\"B\",\"→\",\"Sa\"],\
                  [\"B\",\"→\",\"b\"],\
                  [\"C\",\"→\",\"cBc\"],\
                  [\"C\",\"→\",\"a\"],\
                  [\"D\",\"→\",\"bCb\"],\
                  [\"E\",\"→\",\"b\"]]";
  var grammerArray2 = JSON.parse(grammar2);
  var grammerMatrix2 = new GrammarMatrix( av,grammerArray2, {style: "table", left: 10, top: 190});
  grammerMatrix2.hide();
  var grammar3 = "[[\"S\",\"→\",\"aB\"],\
                  [\"B\",\"→\",\"Sa\"],\
                  [\"B\",\"→\",\"b\"]]";
  var grammerArray3 = JSON.parse(grammar3);
  var grammerMatrix3 = new GrammarMatrix(av,grammerArray3, {style: "table", left: 10, top: 100});
  grammerMatrix3.hide();

  // Frame 1
  av.umsg("Consider this grammar:<br/>$S \\rightarrow aB \\mid bA$<br>$A \\rightarrow aA$<br>$B \\rightarrow Sa$<br>$C \\rightarrow cBc \\mid a$<br> What can you say about this grammar?");
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
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //frame 10
  av.umsg("We will now show an algorithm for removing both types of useless productions. Since we have two types of useless productions, we will use two steps to remove them.");
  av.step();

  //frame 11
  av.umsg(Frames.addQuestion("q14"));
  grammerMatrix.show();
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q15"));
  var V = new av.ds.array(["","","","","",""], {left: 40, top: 450, indexed: true});
  var ALabel =  av.label("$V_1$",{top: 455, left: 10});
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

  //frame 22
  av.umsg(Frames.addQuestion("q22"));
  V.hide();
  ALabel.hide();
  av.step();

  //frame 23
  av.umsg(Frames.addQuestion("q23"));
  var VDG = new av.ds.FA({left: 120, top: 130, width: 300});
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
  av.umsg("The resulting Grammar $G'$ has $L(G)=L(G')$, and $G'$ has no useless productions.");
  grammerMatrix2.hide();
  VDG.hide();
  grammerMatrix3.show();
  av.step();

  //frame 29
  av.umsg("Finally, How would you implement Part 2 of the algorithm to remove useless productions? How do you know which nodes are accessible from S?");
  grammerMatrix3.hide();
  av.step();

  //frame 30
  av.umsg("Finally, How would you implement Part 2 of the algorithm to remove useless productions? How do you know which nodes are accessible from S?<br/><br/>The answer is to use a Depth First Search or Breadth First Search graph algorithm.");
  av.recorded();
});
