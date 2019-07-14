/*global FiniteAutomaton*/
$(document).ready(function() {
  "use strict";
  var av_name = "NFA2DFAEx2aCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/NFA2DFA2a.jff";
  var nfa = av.ds.fa({center: true});
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(nfa, url);
  nfa.disableDragging();
  av.displayInit();
  av.recorded();
});
