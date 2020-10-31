$(document).ready(function() {
  "use strict";
  var av_name = "DFA_noTrapStateCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/DFA_noTrapState.jff";
  var dfa = new av.ds.FA({url: url});
  av.displayInit();
  av.recorded();
});
