document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"../../../AV/Development/formal_language/css/FA.css\" />");
$(document).ready(function() {
  "use strict";

  var av_name = "EvenBinaryDFACON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var xPosition = 375;
  var yPosition = 10;
  var length1 = 125;
  var width = 30;
  var BinaryDFA = new av.ds.fa();
  var q0 = BinaryDFA.addNode({left: 50, top: 100});
  var q1 = BinaryDFA.addNode({left: 250, top: 100});
  BinaryDFA.disableDragging();
  toggleInitial(BinaryDFA, q0);
  toggleFinal(BinaryDFA, q1);
  BinaryDFA.addEdge(q0, q1, {weight: "0"});
  BinaryDFA.addEdge(q1, q0, {weight: "1"});
  BinaryDFA.addEdge(q0, q0, {weight: "1"});
  BinaryDFA.addEdge(q1, q1, {weight: "0"});
  BinaryDFA.layout();
  av.displayInit();
  av.recorded();
});