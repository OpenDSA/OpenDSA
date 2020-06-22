$(document).ready(function() {
  "use strict";
  var av_name = "NFAexampleCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/NFAexample1.jff";
  var nfa = new av.ds.FA({url: url});
  av.displayInit();
  av.recorded();
});
