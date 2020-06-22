$(document).ready(function() {
  "use strict";

  var av_name = "NFAtoRECON";
  var av = new JSAV(av_name);
  var url = "../../../AV/VisFormalLang/Regular/Machines/nfa1.jff";
  av.umsg("Suppose we want to convert the following FA to a Regular Expression")
  av.displayInit();
  var nfa = new av.ds.FA({url: url, top: 10, width: 300, height: 250, left: 0});
  var fatoreController = new FAtoREController(av, nfa, {});
  fatoreController.visualizeConversion({left: 350}, {left: 470, width: 300, height: 250, top:0});
  nfa.layout();
  av.recorded();
});
