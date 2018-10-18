document.write('<script src="../../../AV/Development/formal_language/fa/Automaton.js"></script>');
document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"../../../AV/Development/formal_language/css/FA.css\" />");
$(document).ready(function() {
  "use strict";
  var av_name = "EvenBinaryDFACON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;

  var url = interpret("fa1");
  var BinaryDFA = new av.ds.fa({center: true});
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(BinaryDFA,url);
  BinaryDFA.disableDragging();
  av.displayInit();
  av.recorded();
});
