/*global FiniteAutomaton, Minimizer*/
document.write('<script src="../../../AV/FLA/resources/underscore-min.js"></script>');

$(document).ready(function() {
  "use strict";

  var av_name = "Minimization2CON";
  var av = new JSAV(av_name);
  var url = "../../../AV/VisFormalLang/FA/Machines/stminDFAE2.jff";
  var dfa = new av.ds.FA({top: 0, left: 10, width: 600, height: 450, url:url});
  //FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(dfa, url);
  var mytree = new av.ds.tree({top: 0, left: 650, width: 450, height: 340, editable: true});
  var minm = new Minimizer();
  av.displayInit();
  var newGraphDimensions = { top: 275, left: 635, width: 390, height: 250};
  var minimizedDFA = minm.minimizeDFA(av, dfa, mytree, newGraphDimensions);
  minimizedDFA.disableDragging();
  //dfa.disableDragging();
  av.recorded();
});
