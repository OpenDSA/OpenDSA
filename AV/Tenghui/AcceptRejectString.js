/*global TraverseAcceptor*/

$(document).ready(function() {
    "use strict";
    var av_name = "AcceptRejectString";
    var av = new JSAV(av_name);
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;
    var obj = interpret("randomJFF");
    var pickNumber01 = Math.floor(Math.random() * Object.keys(obj.FilenameFor01).length);
    var pickNumberab = Math.floor(Math.random() * Object.keys(obj.FilenameForAB).length);
    var filename01 = obj.FilenameFor01;
    var filenameab = obj.FilenameForAB;
    var url01 = obj.Pathway + filename01[pickNumber01] + ".jff";
    var urlab = obj.Pathway + filenameab[pickNumberab] + ".jff";
    var inputFileArray = [url01, urlab];
    av.umsg("In this slideshow, we will trace the acceptance or rejections of some strings. The given machine can accept any even number. You can click on any cell to see the process again starting from the clicked cell");
    av.displayInit();
    var randomFileType = Math.floor(Math.random() * 2).toString();
    var fileInput = obj.InputType[randomFileType].inputs;
    var url = inputFileArray[randomFileType];
    var binaryDFA = new av.ds.FA({left: 10, url: url});
    var acceptor = new TraverseAcceptor(av, binaryDFA);
    var stringLength = Math.floor(Math.random() * 10) + 1;
    var inputString = [];
    var i;
    for (i = 0; i < stringLength; i++) {
        inputString.push(fileInput[Math.floor(Math.random() * 2).toString()]);
    }
    acceptor.visualize([inputString],
        {left: 500});
    av.recorded();

});
