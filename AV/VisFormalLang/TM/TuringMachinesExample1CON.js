$(document).ready(function() {
    "use strict";
  
    var av_name = "TuringMachinesExample1CON";
    var av = new JSAV(av_name, {animationMode: "none"});  
    var url = "../../../AV/VisFormalLang/TM/Machines/TMexample1.jff";
    var tm = new av.ds.TM({width: 600, height: 200, url:url});
    av.displayInit();
    av.recorded();
  });