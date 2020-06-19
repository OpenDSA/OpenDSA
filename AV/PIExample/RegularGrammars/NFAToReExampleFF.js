/*global Minimizer*/
$(document).ready(function() {
    "use strict";
    var av_name = "NFAToReExampleFF";
    var arrow = String.fromCharCode(8594);
    var av = new JSAV(av_name);
    var url = "../../../AV/VisFormalLang/FA/Machines/NFAtoRE.jff";
    var arr = new Array(7);    // arbitrary array size
    for (var i = 0; i < arr.length; i++) {
        arr[i] = ["", arrow, ""];
    }
    var lastRow = 0;
    var grammarMatrix = av.ds.matrix(arr, {style: "table", left: 0, top: 250});
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
  