// Written by Mostafa Mohammed, Fall 2019
$(document).ready(function() {
  "use strict";
  
  var av_name = "RClearCON";
  var av = new JSAV(av_name, {animationMode: "none"});  
  var url = "../../../AV/VisFormalLang/TM/Machines/TMexample1.jff";
  var tm = new av.ds.TM({width: 600, height: 200, left: 250, url:url});
  av.displayInit();
  av.recorded();
});
