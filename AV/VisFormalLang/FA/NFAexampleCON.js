/*global FiniteAutomaton*/
$(document).ready(function() {
  "use strict";
  var av_name = "NFAexampleCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/NFAexample1.jff";
  var nfa = av.ds.fa();
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(nfa, url);
  nfa.disableDragging();
  av.displayInit();
  av.recorded();
});
