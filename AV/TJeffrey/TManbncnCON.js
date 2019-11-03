// Written by Jeffrey Peng, Fall 2019
$(document).ready(function() {
    "use strict";
  
    var av_name = "TManbncnCON";
    var av = new JSAV(av_name, {animationMode: "none"});
    var url = "../../../AV/VisFormalLang/TM/Machines/TManbncn.jff";
    av.ds.TM({width: 610, height: 525, url: url});
    av.displayInit();
    av.recorded();
  });
  
  
