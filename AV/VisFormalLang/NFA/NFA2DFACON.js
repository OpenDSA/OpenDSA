$(document).ready(function() {
    "use strict";
  
    var av_name = "NFA2DFACON";
    var av = new JSAV(av_name, {animationMode: "none"});
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter;
  
    var url1 = interpret("fa1");
    var url2 = interpret("fa2");
    var NFAa = new av.ds.fa({center: true});
    FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(NFAa,url1);
    NFAa.disableDragging();
    var NFAb = new av.ds.fa({center: true});
    FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(NFAb,url2);
    NFAb.disableDragging();
    av.displayInit();
    av.recorded();
  });