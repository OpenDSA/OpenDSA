document.write('<script src="../../../AV/Development/formal_language/fa/Automaton.js"></script>');
document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');
document.write('<script src="../../../AV/Development/formal_language/fa/Minimizer.js"></script>');
document.write('<script src="../../../AV/FLA/resources/underscore-min.js"></script>');
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"../../../AV/Development/formal_language/css/FA.css\" />");


$(document).ready(function() {
    "use strict";
  
    var av_name = "Minimization1CON";
    var av = new JSAV(av_name);
    var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
    var url = interpret("fa1");
    var DFA = new av.ds.fa({width: 500, height: 250, left: 10});
    FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(DFA,url);
    var tree = new av.ds.tree($.extend({width: '450px', height: 340, editable: true, left: 500 + (340 / 3), top: 0}));
    var minimizer = new Minimizer();
    av.displayInit();
    var newGraphDimensions = {
        top: 275, 
        left: 10,
        width: 950,
        height: 500};
    var minimizedDFA = minimizer.minimizeDFA(av, DFA,tree, newGraphDimensions);
    minimizedDFA.disableDragging();
    DFA.disableDragging();
    av.recorded();
});