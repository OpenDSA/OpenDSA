$(document).ready(function() {
  "use strict";

  var av_name = "NFAtoREWithQuestionsCON";
  var av = new JSAV(av_name);
  var url = "../../../AV/VisFormalLang/Regular/Machines/nfa1.jff";
  av.umsg("Suppose we want to convert the following FA to a Regular Expression")
  av.displayInit();
  var nfa = new av.ds.FA({url: url, top: 10, width: 300, height: 250, left: 0});
  var fatoreController = new FAtoREController(av, nfa, {});
  var piframesLocations = {top: 10, left: -50};
  visualizeConversionWithQuestions(fatoreController, url, av_name, {top: 300, left: 100}, {left: 0, width: 300, height: 250, top:250}, piframesLocations);
  nfa.layout();
  av.recorded();
});
