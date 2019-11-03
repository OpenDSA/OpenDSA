// Written by Jeffrey Peng, Fall 2019
$(document).ready(function() {
    "use strict";
  
    var av_name = "TMXCON";
    var av = new JSAV(av_name, {animationMode: "none"});
    var url = "../../../AV/TJeffrey/TMXCON.jff";
    av.ds.TM({width: 600, height: 525, url: url});
    av.displayInit();
    av.recorded();
  });
  
  