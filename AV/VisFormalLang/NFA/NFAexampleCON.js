document.write('<script src="../../../AV/Development/formal_language/fa/Automaton.js"></script>');
document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"../../../AV/Development/formal_language/css/FA.css\" />");


$(document).ready(function() {
    "use strict";
  
    var av_name = "NFAexampleCON";
    var av = new JSAV(av_name, {animationMode: "none"});
    var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  
    var url = interpret("fa1");
    var NFA = new av.ds.fa();
    FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(NFA,url);
    NFA.disableDragging();
    av.displayInit();
    av.recorded();
  });