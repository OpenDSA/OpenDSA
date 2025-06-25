$(document).ready(function() {
  "use strict";
  var av_name = "EvenBinaryDFACON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/OpenFLAP/machines/FA/EvenBinaryDFACON.jff";
  var dfa = new av.ds.FA({url: url, top: -50, left: 200});
  av.displayInit();
  av.recorded();
});
