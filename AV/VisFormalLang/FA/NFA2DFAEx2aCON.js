$(document).ready(function() {
  "use strict";
  var av_name = "NFA2DFAEx2aCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/NFA2DFA2a.jff";
  var nfa = new av.ds.FA({center: true, url: url});
  av.displayInit();
  av.recorded();
});
