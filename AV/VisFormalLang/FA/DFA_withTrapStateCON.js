/*global FiniteAutomaton*/
$(document).ready(function() {
  "use strict";
  var av_name = "DFA_withTrapStateCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/DFA_withTrapState.jff";
  new av.ds.FA({url:url});
  av.displayInit();
  av.recorded();
});
