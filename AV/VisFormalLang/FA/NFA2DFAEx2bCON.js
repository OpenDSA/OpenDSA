$(document).ready(function() {
  "use strict";
  var av_name = "NFA2DFAEx2bCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/NFA2DFA2b.jff";
  var nfa = new av.ds.FA({width: 600, height: 200, url: url});
  av.displayInit();
  av.recorded();
});
