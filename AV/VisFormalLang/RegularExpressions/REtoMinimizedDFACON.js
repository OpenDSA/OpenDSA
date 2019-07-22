//document.write('<script src="../../../AV/Development/formal_language/fa/Automaton.js"></script>');
//document.write('<script src="../../../DataStructures/FL_resources/paper-core.min.js"></script>');
//document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');
//document.write('<script src="../../../AV/Development/formal_language/regular/Discretizer.js"></script>');
//document.write('<script src="../../../AV/Development/formal_language/regular/REtoFAController.js"></script>');
//document.write('<script src="../../../AV/FLA/resources/underscore-min.js"></script>');
//document.write('<script src="../../../AV/Development/formal_language/fa/Minimizer.js"></script>');
//document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"../../../AV/Development/formal_language/css/FA.css\" />");


$(document).ready(function() {
    "use strict";
  
    var av_name = "REtoMinimizedDFACON";
    var av = new JSAV(av_name);
    var regex = "ab*+c";
    var Width = 500,
        Height = 300;
    av.displayInit();
    av.umsg("In this example, we need to convert the regular expression " + regex + " to a minimized DFA");
    av.step();
    var REtoFA = new REtoFAController(av, regex,{width: Width, height: Height, left: 10}, true);
    var NFA = REtoFA.completeAll();
    av.step();
    av.umsg("The next step is to convert the NFA to DFA");
    av.step();
    var DFA = FiniteAutomaton.convertNFAtoDFA(av, NFA, {left: Width+50, top: 0, width: Width, height: Height}, true);
    av.step();
    av.umsg("Now, we need to minimize the DFA");
    var tree = new av.ds.tree($.extend({width: Width, height: Height, editable: true, left: 10, top: Height + 50}));
    var minimizer = new Minimizer();
    var newGraphDimensions = {
        top: Height + 50, 
        left: Width + 50,
        width: Width,
        height: Height};
    var minimizedDFA = minimizer.minimizeDFA(av, DFA,tree, newGraphDimensions);
    minimizedDFA.disableDragging();
    av.recorded();
});