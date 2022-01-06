$(document).ready(function(){
  "use strict";
  var av_name = "RGtoNFAFS";
  var av = new JSAV(av_name);
  
  var grammar =  "[\
      [\"S\",\"→\",\"aB\"],\
      [\"S\",\"→\",\"aA\"],\
      [\"A\",\"→\",\"aA\"],\
      [\"A\",\"→\",\"bS\"],\
      [\"A\",\"→\",\"bB\"],\
      [\"B\",\"→\",\"bS\"],\
      [\"B\",\"→\",\"λ\"]\
  ]";

  var grammerArray = JSON.parse(grammar);
  var grammerMatrix = new GrammarMatrix(av, grammerArray, {top: 50, left: 0});

  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var goNext = false;
  var FA = new av.ds.FA({width: 500, height: 250, left: 0, top: 30});
  grammerMatrix.hide();

  // Frame 1
  av.umsg("We want to prove that for any regular language, there is a regular grammar that describes it. We will use our regular approach of proving two representations are equivalent by constructing a way to convert between them. So, we prove this equivalence:<br>1 - For any right-linear grammar there is an equivalent NFA. This will mean that regular grammars don't accept more than regular languages.<br/>2 - For any NFA, there is a right-linear grammar. This will mean that all regular languages can be represented by a regular grammar.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("right"));
  grammerMatrix.show();
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("states"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("start"));
  var factor = 0.6;
  var A = FA.addNode({left: 300, top: 70, value: "A"});
  var B = FA.addNode({left: 450, top: 190, value: "B"});
  var S = FA.addNode({left: 150, top: 190, value: "S"});
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("S2aB"));
  toggleInitial(FA, S);
  grammerMatrix.highlight(0);
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("S2aA"));
  grammerMatrix.unhighlight(0);
  FA.addEdge(S, B, {weight: "a"});
  grammerMatrix.highlight(1);
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("A2aA"));
  grammerMatrix.unhighlight(1);
  grammerMatrix.highlight(2);
  FA.addEdge(S, A, {weight: "a"});
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("A2bS"));
  grammerMatrix.unhighlight(2);
  grammerMatrix.highlight(3);
  FA.addEdge(A, A, {weight: "a"});
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("A2bB"));
  grammerMatrix.unhighlight(3);
  grammerMatrix.highlight(4);
  FA.addEdge(A, S, {weight: "b"});
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("B2bS"));
  grammerMatrix.unhighlight(4);
  grammerMatrix.highlight(5);
  FA.addEdge(A, B, {weight: "b"});
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("lambda"));
  grammerMatrix.unhighlight(5);
  grammerMatrix.highlight(6);
  FA.addEdge(B, S, {weight: "b"});
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("multiple"));
  toggleFinal(FA, B);
  grammerMatrix.unhighlight(6);
  grammerMatrix.modifyProduction(0,2,"abB");
  grammerMatrix.highlight(0);
  av.step();

  // Frame 13
  FA.disableDragging();
  av.umsg("This is the equivalent NFA for this Regular Grammar");
  FA.removeEdge(S,B);
  var D = FA.addNode({left: 300, top: 140, value: "D"});
  FA.addEdge(S, D, {weight: "a"});
  FA.addEdge(D, B, {weight: "b"});
  av.step();

  av.umsg("We have now completed the first step in our proof that regular grammars an represent all regular languages. We proved that a NFA can be constructed to accept the language represented by any right-linear grammar.");
  av.recorded();
});
