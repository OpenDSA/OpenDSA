$(document).ready(function() {
  "use strict";

  var av_name = "REtoMinimizedDFACON";
  var av = new JSAV(av_name);
  var regex = "ab*+c";
  var avWidth = 500,
      avHeight = 300;
  av.umsg("In this example, we will convert the regular expression " + regex + " to a minimized DFA.");
  av.displayInit();
  var REtoFA = new REtoFAController(av, regex,{width: avWidth, height: avHeight, left: 10}, true);
  var NFA = REtoFA.completeAll();
  av.step();
  av.umsg("The next step is to convert the NFA to DFA");
  av.step();
  var DFA = FiniteAutomaton.convertNFAtoDFA(av, NFA, {left: avWidth + 50, top: 20, width: avWidth, height: avHeight}, true);
  av.step();
  av.umsg("Now, we will minimize the DFA");
  var tree = new av.ds.tree($.extend({width: avWidth, height: avHeight, editable: true, left: 10, top: avHeight + 50}));
  var minimizer = new Minimizer();
  var newGraphDimensions = {
    top: avHeight + 50,
    left: avWidth + 50,
    width: avWidth,
    height: avHeight};
  var minimizedDFA = minimizer.minimizeDFA(av, DFA,tree, newGraphDimensions);
  minimizedDFA.enableDragging();
  av.recorded();
});
