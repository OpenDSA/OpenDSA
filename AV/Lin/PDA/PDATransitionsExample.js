$(document).ready(function() {
    "use strict";
  
    var av_name = "PDATransitionsExample";
    var av = new JSAV(av_name, {animationMode: "none"});
    var url = "../../../AV/Lin/PDA/Machines/PDATransitionsExample.jff";
    var pda = new av.ds.PDA({width: 600, height: 210, url: url});
    PDA.prototype.loadFAFromJFLAPFile.call(pda,url);
    av.displayInit();
    av.recorded();
  });