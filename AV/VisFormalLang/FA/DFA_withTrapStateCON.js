$(document).ready(function() {
  "use strict";
  var av_name = "DFA_withTrapStateCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/OpenFLAP/machines/FA/DFA_withTrapState.jff";
  var dfa = new av.ds.FA({url: url});
  av.displayInit();
  av.recorded();
});
