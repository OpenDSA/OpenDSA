// Written by Jeffrey Peng, Fall 2019
$(document).ready(function() {
  "use strict";

  var av_name = "TMabcCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/TM/Machines/TMabc.jff";
  av.ds.TM({width: 600, height: 325, url: url});
  av.displayInit();
  av.recorded();
});
