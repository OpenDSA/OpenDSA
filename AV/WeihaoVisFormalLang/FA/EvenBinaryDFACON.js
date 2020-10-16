$(document).ready(function() {
  "use strict";
  var av_name = "EvenBinaryDFACON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryDFACON.jff";
  var binaryDFA = new av.ds.FA({center: true, url: url});
  av.displayInit();
  av.recorded();
});
