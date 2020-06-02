/*global FiniteAutomaton*/
$(document).ready(function() {
    "use strict";
    var av_name = "NFAtoDFAFF";
    var av = new JSAV(av_name);
    var nfaURL = "../../../AV/VisFormalLang/FA/Machines/NFAexample1.jff";
    var nfaWidth = 400;
    var fa = new av.ds.FA({left: 10, top: 0, width: nfaWidth, url: nfaURL});
    av.umsg("Let's see a step-by-step conversion of an NFA to a DFA.");
    av.displayInit();
    //FiniteAutomaton.convertNFAtoDFA(av, fa, {left: 10, top: 300, width: 500, height: 350}, true);
    var pIFramesDimensions = {top: 69, left: 590};
    convertToDFAWithQuestions(av, fa, av_name, {left: 10, top: 300, width: 500, height: 350}, true, pIFramesDimensions);
    av.recorded();
  });
  