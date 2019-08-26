$(document).ready(function() {
    "use strict";
  
    var av_name = "PDATrace1";
    var av = new JSAV(av_name);
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter;
    av.displayInit();
    var url = interpret("pda1");
    var inputString = "aaabbb";
    var pda = new av.ds.PDA({width: 600, height: 200, url: url});
    runPDA(pda, inputString, true);
    av.recorded();
  });
