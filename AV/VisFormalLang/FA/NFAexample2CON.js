$(document).ready(function() {
  "use strict";
  var av_name = "NFAexample2CON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/NFAexample2.jff"
  var NFA = new av.ds.fa({});
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(NFA,url);
  NFA.disableDragging();
  av.displayInit();
  av.recorded();
});
