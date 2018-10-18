
$(document).ready(function() {
    "use strict";
  
    var av_name = "NFA2DFA2aCON";
    var av = new JSAV(av_name, {animationMode: "none"});
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter;
  
    var url = interpret("fa1");
    var NFA = new av.ds.fa({center: true});
    FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(NFA,url);
    NFA.disableDragging();
    av.displayInit();
    av.recorded();
  });