/*global FiniteAutomaton*/
$(document).ready(function() {
  "use strict";
  var av_name = "DFA_noTrapStateCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/DFA_noTrapState.jff";
  var binaryDFA = av.ds.fa();
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(binaryDFA, url);
  binaryDFA.disableDragging();
  av.displayInit();
  av.recorded();
});
