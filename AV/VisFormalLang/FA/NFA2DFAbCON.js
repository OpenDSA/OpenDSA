$(document).ready(function() {
  "use strict";
  var av_name = "NFA2DFAbCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/NFA2DFAexample2.jff";
  var dfa = new av.ds.fa();
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(dfa, url);
  dfa.disableDragging();
  av.displayInit();
  av.recorded();
});
