//document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');

$(document).ready(function() {
  "use strict";

  var av_name = "EvenBinaryEvenOnesDFACON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var xPosition = 375;
  var yPosition = 10;
  var length1 = 125;
  var width = 30;
  var BinaryDFA = new av.ds.fa();
  var q0 = BinaryDFA.addNode({left: 50, top: 50});
  var q1 = BinaryDFA.addNode({left: 250, top: 50});
  var q2 = BinaryDFA.addNode({left: 200, top: 150});
  var q3 = BinaryDFA.addNode({left: 350, top: 50});
  BinaryDFA.disableDragging();
  toggleInitial(BinaryDFA, q0);
  toggleFinal(BinaryDFA, q1);
  BinaryDFA.addEdge(q0, q1, {weight: "0"});
  BinaryDFA.addEdge(q1, q1, {weight: "0"});
  BinaryDFA.addEdge(q1, q2, {weight: "1"});
  BinaryDFA.addEdge(q0, q2, {weight: "1"});
  BinaryDFA.addEdge(q2, q2, {weight: "0"});
  BinaryDFA.addEdge(q3, q2, {weight: "1"});
  BinaryDFA.addEdge(q2, q3, {weight: "1"});
  BinaryDFA.addEdge(q3, q1, {weight: "0"});
  BinaryDFA.layout();
  av.displayInit();
  av.recorded();
});