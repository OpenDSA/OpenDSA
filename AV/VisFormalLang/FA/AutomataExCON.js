$(document).ready(function() {
  "use strict";
  var av_name = "AutomataExCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/OpenFLAP/machines/FA/EvenBinaryDFACON.jff";
  var dfa = new av.ds.FA({top: -50, left: 200, center: true, url: url});
  av.displayInit();
  av.recorded();
});
