/*global TraverseAcceptor*/
$(document).ready(function() {
    "use strict";
    var av_name = "TraceEvenBinaryDFACON";
    var av = new JSAV(av_name);
    var RDNumber = Math.floor(Math.random() * 4).toString();
    var url = "../../../AV/Tenghui/AcceptRejectString" + RDNumber + ".jff";
    //var url = "../../../AV/Tenghui/AcceptRejectString0.jff";
    av.umsg("In this slideshow, we will trace the acceptance or rejections of some strings. The given machine can accept any even number. You can click on any cell to see the process again starting from the clicked cell");
    av.displayInit();
    var binaryDFA = new av.ds.FA({left: 10, url: url});
    var acceptor = new TraverseAcceptor(av, binaryDFA);
    var stringLength = Math.floor(Math.random() * 10) + 1;
    var inputString = [];
    var i;
    for (i = 0; i < stringLength; i++){
        inputString.push(Math.floor(Math.random() * 2).toString());
    }
    acceptor.visualize([inputString],
        {left: 500});
    av.recorded();

});
