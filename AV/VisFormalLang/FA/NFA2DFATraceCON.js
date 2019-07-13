document.write('<script src="../../../AV/FLA/resources/underscore-min.js"></script>');
$(document).ready(function() {
  "use strict";
  var av_name = "NFA2DFATraceCON";
  var av = new JSAV(av_name);
  var injector = PIFRAMES.init(av_name);
  var nfaURL = "../../../AV/VisFormalLang/FA/Machines/NFA2DFA2a.jff";
  var nfaWidth = 400;
  var fa = new av.ds.fa({left: 10, top:0, width: nfaWidth});

  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(fa, nfaURL);
  fa.disableDragging();

  av.umsg("Let's see a step-by-step conversion of an NFA to a DFA.");
  av.displayInit();
  
  var dfa = convertToDFA(av, fa, {left: nfaWidth+50, top: 0, width: 500, height: 350}, true)
  dfa.disableDragging();

  //av.umsg(injector.injectQuestion("q1"));
  //av.step();

  //av.umsg(injector.injectQuestion("q2"));
  //av.step();

  //av.umsg(injector.injectQuestion("q3"));
  //av.step();

  av.recorded();
});
