$(document).ready(function() {
  "use strict";
  var av_name = "NFA2DFAEx2bCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/NFA2DFA2b.jff";
  var dfa = new av.ds.fa({width: 600, height: 200});
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(dfa, url);
  dfa.disableDragging();
  av.displayInit();
  av.recorded();
});
