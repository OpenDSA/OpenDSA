//document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');

$(document).ready(function() {
  "use strict";

  var av_name = "EvenBinaryEvenOnesDFACON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryEvenOnesDFA.jff";
  var BinaryDFA = new av.ds.fa({center: true});
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(BinaryDFA,url);
  BinaryDFA.disableDragging();
  av.displayInit();
  av.recorded();
});
