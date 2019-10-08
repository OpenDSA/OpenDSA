// Written by Jeffrey Peng, Fall 2019
$(document).ready(function() {
    "use strict";

    var av_name = "TuringMachinesExample2CON";
    var av = new JSAV(av_name, {animationMode: "none"});
    var url = "../../../AV/VisFormalLang/TM/Machines/TMexample2.jff";
    var tm = new av.ds.TM({width: 600, height: 325, url:url});
    av.displayInit();
    av.recorded();
  });
