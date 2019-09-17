//Odd Numbers Traces
$(document).ready(function() {
  "use strict";
  var av_name = "MachineTraceCON";
  var av = new JSAV(av_name);
  var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryDFACON.jff";
  av.umsg("In this example, we see how the machine head moves over the tape when processing input string '100'. Step 1: Initially, the tape head is at the leftmost tape cell with character '1', and the current state is q0");
  av.displayInit();
  var binaryDFA = new av.ds.FA({left: 10, url: url});
  var acceptor = new MachineTraverseAcceptor(av, binaryDFA);
  acceptor.visualize([["1", "0", "0", "", "","",""]],
                     {left: 450, top: 4});
  av.recorded();
});