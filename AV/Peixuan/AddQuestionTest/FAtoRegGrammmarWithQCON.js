//document.write('<script src="../../../AV/Development/formal_language/regular/FAtoGrammarConverter.js"></script>');

$(document).ready(function() {
    "use strict";
    var arrow = String.fromCharCode(8594);
    var av_name = "FAtoRegGrammmarWithQCON";
    var av = new JSAV(av_name);
    var url = "../../../AV/VisFormalLang/Regular/Machines/FA1.jff"

    var arr = new Array(5);    // arbitrary array size
    for (var i = 0; i < arr.length; i++) {
        arr[i] = ["", arrow, ""];
    }
    var lastRow = 0;
    var grammarMatrix = av.ds.matrix(arr, {style: "table", left: 350});
    // hide all of the empty rows
    for (var i = lastRow + 1; i < arr.length; i++) {
        grammarMatrix._arrays[i].hide();
    }
    var FA = new av.ds.FA({width: 300, height: 150, left: 10, url: url});
    av.umsg("Suppose we need to convert this NFA to a Regular Grammar");
    var FAtoGrammar = new FAtoGrammarConverter(av, FA);
    av.displayInit();

    //FAtoGrammar.convertToGrammar(grammarMatrix);
    convertToGrammarWithQuestions(av_name, av, FAtoGrammar, grammarMatrix, {top: -10, left: -20});
    //av.step();
    av.umsg("The resulting Grammar is: ");

    av.recorded();
});
