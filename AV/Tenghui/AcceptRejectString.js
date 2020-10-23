/*global TraverseAcceptor*/

$(document).ready(function() {
    "use strict";
    var av_name = "AcceptRejectString";
    var av = new JSAV(av_name);
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;
    var obj = interpret("randomJFF");
    //var RDNumber = Math.floor(Math.random() * 4).toString();
    //var filenameList = ["EvenBinaryDFACON", "EvenBinaryEvenOnesDFA", "DFA_noTrapState", "DFA_withTrapState", "NFA2DFA2a", "NFA2DFA2b", "NFA2DFAexample1", "NFA2DFAexample2", "NFAexample1", "NFAexample2", "NFAtoRE", "stminDFA1", "stminDFAE2"];
    var pickNumber = Math.floor(Math.random() * 6);
    var filename = obj.Filename;
    var url = obj.Pathway + filename[pickNumber] + ".jff";
    //var url = "../../../AV/Tenghui/AcceptRejectString" + RDNumber + ".jff";
    //var url = "../../../AV/Tenghui/AcceptRejectString0.jff";
    av.umsg("In this slideshow, we will trace the acceptance or rejections of some strings. The given machine can accept any even number. You can click on any cell to see the process again starting from the clicked cell");
    av.displayInit();
    var binaryDFA = new av.ds.FA({left: 10, url: url});
    var acceptor = new TraverseAcceptor(av, binaryDFA);
    var stringLength = Math.floor(Math.random() * 10) + 1;
    var inputString = [];
    var i;
    var abString= ["a", "b"];
    if (pickNumber === 0 || pickNumber === 1) {
        for (i = 0; i < stringLength; i++) {
            inputString.push(Math.floor(Math.random() * 2).toString());
        }
    }
    else{
        for (i = 0; i < stringLength; i++) {
            inputString.push(abString[(Math.floor(Math.random() * 2).toString())]);
        }
    }
    acceptor.visualize([inputString],
        {left: 500});
    av.recorded();

});
