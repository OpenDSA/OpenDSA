/*global TraverseAcceptor*/

// Title: DFA Example Trace: Even Binary Numbers
// Author: Jeffrey Peng; Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization; Code Tracing Presentation
// Keyword: Deterministic Finite Automata
// Natural Language: en
// Programming Language: N/A
/* Description: Visualization of how a DFA would process input strings for the language of even binary numbers. */

$(document).ready(function() {
  "use strict";
  var av_name = "TraceEvenBinaryDFACON";
  var av = new JSAV(av_name);
  var url = "../../../AV/OpenFLAP/machines/FA/EvenBinaryDFACON.jff";
  av.umsg("In this slideshow, we will trace the acceptance or rejection of some strings. The given machine can accept any even number (written in binary notation). You can click on any cell to see the process again starting from the clicked cell");
  av.displayInit();
  var binaryDFA = new av.ds.FA({left: 10, url: url});
  var acceptor = new TraverseAcceptor(av, binaryDFA);
  acceptor.visualize([["0", "0", "1", "0", "1", "0", "0", "1", "0"],
                      ["0", "1", "1", "1"],
                      ["0", "1", "0", "1", "0", "0", "0", "1", "0"]],
                     {left: 500});
  av.recorded();
});
