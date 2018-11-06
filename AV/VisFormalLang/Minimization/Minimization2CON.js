$(document).ready(function() {
    "use strict";
  
    var av_name = "Minimization2CON";
    var av = new JSAV(av_name);
    var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
    var url = interpret("fa1");
    var DFA = new av.ds.fa({width: 600, height: 450, left: 10});
    FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(DFA,url);
    var tree = new av.ds.tree($.extend({width: '450px', height: 340, editable: true, left: 550 + (340 / 3), top: 0}));
    var minimizer = new Minimizer();
    av.displayInit();
    var newGraphDimensions = {
        top: 475, 
        left: 10,
        width: 900,
        height: 250};
    var minimizedDFA = minimizer.minimizeDFA(av, DFA,tree, newGraphDimensions);
    minimizedDFA.disableDragging();
    DFA.disableDragging();
    av.recorded();
});