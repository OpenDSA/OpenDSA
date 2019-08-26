$(document).ready(function() {
    "use strict";
  
    var av_name = "PDADeterministic";
    var av = new JSAV(av_name, {animationMode: "none"});
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter;
  
    var url = interpret("pda1");
    var pda = new av.ds.PDA({width: 600, height: 200});
    PDA.prototype.loadFAFromJFLAPFile.call(pda,url);
    pda.disableDragging();
    av.displayInit();
    av.recorded();
  });