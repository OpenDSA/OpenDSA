document.write('<script src="../../../AV/Development/formal_language/regular/FAtoGrammarConverter.js"></script>');

$(document).ready(function() {
    "use strict";
  
    var av_name = "FAtoRegGrammmarCON";
    var av = new JSAV(av_name);
    var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
    var url = interpret("fa1");
    av.displayInit();
    var arr = new Array(5);    // arbitrary array size
    for (var i = 0; i < arr.length; i++) {
        arr[i] = ["", arrow, ""];
    }
    lastRow = 0;
    var grammarMatrix = av.ds.matrix(arr, {style: "table", left: 350});
    // hide all of the empty rows
    for (var i = lastRow + 1; i < arr.length; i++) {
        grammarMatrix._arrays[i].hide();
    }
    var FA = new av.ds.FA({width: 300, height: 150, left: 10});
    FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(FA,url);
    av.umsg("Suppose we need to convert this NFA to a Regular Grammar");
    var FAtoGrammar = new FAtoGrammarConverter(av, FA);
    
    
    FAtoGrammar.convertToGrammar(grammarMatrix);
    av.step();
    av.umsg("The resulting Grammar is: ");
    
    av.recorded();
});