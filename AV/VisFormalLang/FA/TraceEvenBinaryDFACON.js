document.write('<script src="../../../AV/Development/formal_language/fa/TraverseAccepter.js"></script>');

$(document).ready(function() {
  "use strict";
  var av_name = "TraceEvenBinaryDFACON";
  var av = new JSAV(av_name);
  var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryDFACON.jff";
  av.umsg("In this slideshow, we will trace the acceptance or rejections of some strings. The given machine can accept any even number. You can click on any cell to see the process again starting from the clicked cell")
  av.displayInit();
  var BinaryDFA = new av.ds.fa({left: 10});
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(BinaryDFA,url);
  BinaryDFA.disableDragging();
  var acceptor = new TraversAcceptor(av, BinaryDFA);
  acceptor.visualize(["0 0 1 0 1 0 0 1 0".split(' '), "0 1 1 1".split(' '), "0 1 0 1 0 0 0 1 0".split(' ')], {left: 500});
  av.recorded();
});
