document.write('<script src="../../../AV/Development/formal_language/regular/FAtoREController.js"></script>');

$(document).ready(function() {
    "use strict";
  
    var av_name = "NFAtoRECON";
    var av = new JSAV(av_name);
    var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
    var url = interpret("fa1");
    av.displayInit();
    av.umsg("Suppose we want to convert the following FA to a Regular Expression")
    var NFA = new av.ds.fa({width: 300, height: 250, left: 10});
    FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(NFA,url);
    var fatoreController = new FAtoREController(av, NFA, {});
    fatoreController.visualizeConversion({left: 350}, {left: 570, width: 350, height: 250, top:0});
    var regex = "ab*+c";
    var Width = 500,
        Height = 300;

    av.recorded();
});