$(document).ready(function() {
    "use strict";

    var av_name = "figure";
    var av = new JSAV(av_name, {animationMode: "none"});

    var url = "../../../AV/Youwei/jfigure1.jff";
    var pda = new av.ds.PDA({width: 600, height: 260, url: url});
    PDA.prototype.loadFAFromJFLAPFile.call(pda,url);
    
    //pda.disableDragging();
    av.displayInit();
    av.recorded();
    
  });