(function ($) {
    "use strict";

    function randomQuestions(av, jsonFile) {
        var pickNumber01 = Math.floor(Math.random() * Object.keys(jsonFile.FilenameFor01).length);
        var pickNumberab = Math.floor(Math.random() * Object.keys(jsonFile.FilenameForAB).length);
        var filename01 = jsonFile.FilenameFor01;
        var filenameab = jsonFile.FilenameForAB;
        var url01 = jsonFile.Pathway + filename01[pickNumber01] + ".jff";
        var urlab = jsonFile.Pathway + filenameab[pickNumberab] + ".jff";
        var inputFileArray = [url01, urlab];
        var randomFileType = Math.floor(Math.random() * 2).toString();
        var fileInput = jsonFile.InputType[randomFileType].inputs;
        var url = inputFileArray[randomFileType];
        var binaryDFA = new av.ds.FA({left: 10, url: url});
        var acceptor;
        acceptor = new TraverseAcceptor(av, binaryDFA);
        var stringLength = Math.floor(Math.random() * 10) + 1;
        var inputString = [];
        var i;
        for (i = 0; i < stringLength; i++) {
            inputString.push(fileInput[Math.floor(Math.random() * 2).toString()]);
        }
        acceptor.visualize([inputString],
            {left: 500});
    }

    // Publicize the public functions
    var randomInput = {};
    randomInput.randomQuestions = randomQuestions;
    window.RANDOMINPUT = randomInput;

}(jQuery));
