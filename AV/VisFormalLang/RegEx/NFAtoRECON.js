$(document).ready(function() {
  "use strict";

  var av_name = "NFAtoRECON";
  var av = new JSAV(av_name);
  var url = "../../../AV/VisFormalLang/RegEx/Machines/nfa1.jff";
  av.umsg("Suppose we want to convert the following FA to a Regular Expression")
  av.displayInit();
  var NFA = new av.ds.FA({width: 300, height: 250, left: 10});
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(NFA, url);
  var fatoreController = new FAtoREController(av, NFA, {});
  fatoreController.visualizeConversion({left: 350}, {left: 570, width: 350, height: 250, top:0});
  av.recorded();
});
