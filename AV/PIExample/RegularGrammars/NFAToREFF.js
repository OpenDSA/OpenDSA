$(document).ready(function(){
  "use strict";
  var av_name = "NFAToREFF";
  var av = new JSAV(av_name);
  var arrow = String.fromCharCode(8594);
  
  var grammar =  "[\
      [\"S\",\"→\",\"aB\"],\
      [\"S\",\"→\",\"aA\"],\
      [\"A\",\"→\",\"aA\"],\
      [\"A\",\"→\",\"bS\"],\
      [\"A\",\"→\",\"bB\"],\
      [\"B\",\"→\",\"bS\"],\
      [\"B\",\"→\",\"$\lambda$\"]\
  ]";

  var grammerArray = JSON.parse(grammar);

  var grammerMatrix = new GrammarMatrix(av, grammerArray, {top: 50, left: 0});

  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;
  var FA = new av.ds.FA({width: 600, height: 200,left: 0, top:300});
  grammerMatrix.hide();
  //frame 1
  av.umsg("In this module we will prove that any NFA can be converted to a Right Linear Grammar.");
  av.displayInit();
  av.umsg(Frames.addQuestion("q2"));
  av.step();
  av.umsg(Frames.addQuestion("q3"));
  av.step();
  av.umsg("To prove that for any Regular Language there is a Regular Grammar describes it, we should prove 2 things.");
  av.step();
  av.umsg("To prove that for any Regular Language there is a Regular Grammar describes it, we should prove 2 things. <br>1- For any Regular Grammar there is a DFA/NFA");
  av.step();
  av.umsg("To prove that for any Regular Language there is a Regular Grammar describes it, we should prove 2 things. <br>1- For any Regular Grammar there is a DFA/NFA.<br/>2- For any DFA/NFA, there is a RIGHT Linear grammar");
  av.step();
  av.umsg(Frames.addQuestion("q7"));
  grammerMatrix.show();
  av.step();
  av.umsg(Frames.addQuestion("q8"));
  av.step();
  av.umsg(Frames.addQuestion("q9"));
  var factor = 0.6;
  var A = FA.addNode({left: 510*factor, top: 70, value: "A"});
  var B = FA.addNode({left: 250*factor, top: 170, value: "B"});
  var S = FA.addNode({left: 610*factor, top: 170, value: "S"});
  av.step();
  av.umsg(Frames.addQuestion("q10"));
  toggleInitial(FA, S);
  grammerMatrix.highlight(0);
  av.step();
  av.umsg(Frames.addQuestion("q11"));
  grammerMatrix.unhighlight(0);
  FA.addEdge(S, B, {weight: "a"});
  grammerMatrix.highlight(1);
  av.step();
  av.umsg(Frames.addQuestion("q12"));
  grammerMatrix.unhighlight(1);
  grammerMatrix.highlight(2);
  FA.addEdge(S, A, {weight: "a"});
  av.step();
  av.umsg(Frames.addQuestion("q13"));
  grammerMatrix.unhighlight(2);
  grammerMatrix.highlight(3);
  FA.addEdge(A, A, {weight: "a"});
  av.step();
  av.umsg(Frames.addQuestion("q14"));
  grammerMatrix.unhighlight(3);
  grammerMatrix.highlight(4);
  FA.addEdge(A, S, {weight: "b"});
  av.step();
  av.umsg(Frames.addQuestion("q15"));
  grammerMatrix.unhighlight(4);
  grammerMatrix.highlight(5);
  FA.addEdge(A, B, {weight: "b"});
  av.step();
  av.umsg(Frames.addQuestion("q16"));
  grammerMatrix.unhighlight(5);
  grammerMatrix.highlight(6);
  FA.addEdge(B, S, {weight: "b"});
  av.step();
  av.umsg(Frames.addQuestion("q17"));
  toggleFinal(FA, B);
  grammerMatrix.unhighlight(6);
  grammerMatrix.modifyProduction(0,2,"abB");
  grammerMatrix.highlight(0);
  av.step();
  //frame 2

  FA.disableDragging();
  av.umsg("This is the equivalent NFA for this Regular Grammar");
  FA.removeEdge(S,B);
  var D = FA.addNode({left: 450*factor, top: 150, value: "D"});
  FA.addEdge(S, D, {weight: "a"});
  FA.addEdge(D, B, {weight: "b"});
  av.step();
  av.umsg("We completed the first step in our proof");
  av.recorded();
});
