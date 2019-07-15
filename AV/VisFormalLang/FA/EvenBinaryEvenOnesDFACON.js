/*global FiniteAutomaton*/
$(document).ready(function() {
  "use strict";
  var av_name = "EvenBinaryEvenOnesDFACON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryEvenOnesDFA.jff";
  var BinaryDFA = new av.ds.FA({center: true});
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(BinaryDFA, url);
  BinaryDFA.disableDragging();
  av.displayInit();
  av.recorded();
});
