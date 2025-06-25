$(document).ready(function() {
  "use strict";
  var av_name = "NFA2DFAbCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/OpenFLAP/machines/FA/NFA2DFAexample2.jff";
  var nfa = new av.ds.FA({url: url, left: 300, top: -40});
  av.displayInit();
  av.recorded();
});
