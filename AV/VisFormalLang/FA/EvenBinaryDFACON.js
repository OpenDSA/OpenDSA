/*global FiniteAutomaton*/
$(document).ready(function() {
  "use strict";
  var av_name = "EvenBinaryDFACON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryDFACON.jff";
  var binaryDFA = av.ds.fa({center: true});
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(binaryDFA, url);
  binaryDFA.disableDragging();
  av.displayInit();
  av.recorded();
});
