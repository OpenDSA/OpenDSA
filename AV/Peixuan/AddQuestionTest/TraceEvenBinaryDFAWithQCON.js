/*global TraverseAcceptor*/
$(document).ready(function() {
  "use strict";
  var av_name = "TraceEvenBinaryDFAWithQCON";
  var av = new JSAV(av_name);
  var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryDFACON.jff";
  av.umsg("In this slideshow, we will trace the acceptance or rejections of some strings. The given machine can accept any even number. You can click on any cell to see the process again starting from the clicked cell");
  av.displayInit();
  var binaryDFA = new av.ds.FA({left: 10, url: url});
  var acceptor = new TraverseAcceptor(av, binaryDFA);
  /*acceptor.visualize([["0", "0", "1", "0", "1", "0", "0", "1", "0"],
                      ["0", "1", "1", "1"],
                      ["0", "1", "0", "1", "0", "0", "0", "1", "0"]],
                     {left: 500});*/
  var piframesLocations = {top: 10, left: -50};
  acceptorVisualizeWithQuestions(av_name, av, acceptor,
                      [["0", "0", "1", "0", "1", "0", "0", "1", "0"],
                      ["0", "1", "1", "1"],
                      ["0", "1", "0", "1", "0", "0", "0", "1", "0"]],
                      {left: 80, top: 260},
                      piframesLocations);
  av.recorded();
});
