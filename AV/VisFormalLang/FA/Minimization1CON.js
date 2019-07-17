/*global FiniteAutomaton*/

$(document).ready(function() {
  "use strict";

  var av_name = "Minimization1CON";
  var av = new JSAV(av_name);
  var url = "../../../AV/VisFormalLang/FA/Machines/stminDFA1.jff";
  var dfa = new av.ds.FA({top: 0, left: 10, width: 500, height: 150, url:url});
//  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(dfa, url);
  var mytree = new av.ds.tree({width: 400, height: 340, editable: true, left: 600, top: 0});
  var minm = new Minimizer();
  av.displayInit();
  var newGraphDimensions = {top: 280, left: 535, width: 400, height: 250};
  minm.minimizeDFA(av, dfa, mytree, newGraphDimensions);

  av.recorded();
});
