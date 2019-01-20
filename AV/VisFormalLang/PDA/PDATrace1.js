document.write('<script src="../../../AV/Development/formal_language/fa/PDATraverseAccepter.js"></script>');
document.write('<script src="../../../AV/Development/formal_language/fa/PDAState.js"></script>');
document.write('<script src="../../../AV/Development/formal_language/fa/Stack.js"></script>');

$(document).ready(function() {
    "use strict";
  
    var av_name = "PDATrace1";
    var av = new JSAV(av_name);
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter;
    av.displayInit();
    var url = interpret("pda1");
    var inputString = "aaabbb";
    var pda = new av.ds.pda({width: 600, height: 200});
    PDA.prototype.loadFAFromJFLAPFile.call(pda,url);
    pda.disableDragging();
    var results = run(pda, inputString, true);
    av.recorded();
  });
