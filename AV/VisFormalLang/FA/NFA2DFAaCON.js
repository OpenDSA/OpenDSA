$(document).ready(function() {
  "use strict";
  var av_name = "NFA2DFAaCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/OpenFLAP/machines/FA/NFA2DFAexample1.jff";
  var nfa = new av.ds.FA({url: url});
  av.displayInit();
  av.recorded();
});
