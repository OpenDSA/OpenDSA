$(document).ready(function() {
  "use strict";
  var av_name = "EvenBinaryEvenOnesDFACON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryEvenOnesDFA.jff";
  var dfa = new av.ds.FA({center: true, url: url});
  av.displayInit();
  av.recorded();
});
