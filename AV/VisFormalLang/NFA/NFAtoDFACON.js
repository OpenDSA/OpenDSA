document.write('<script src="../../../AV/FLA/resources/underscore-min.js"></script>');
$(document).ready(function() {
  "use strict";
  var av_name = "NFAtoDFACON";
  var av = new JSAV(av_name);
  var injector = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var nfaURL = interpret("fa1");
  var nfaWidth = 400;
  var FA = new av.ds.fa({left: 10, top:0, width: nfaWidth});

  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(FA,nfaURL);
  FA.disableDragging();
  var DFA = convertToDFA(av, FA, {left: nfaWidth+50, top: 0, width: 500, height: 350}, true)
  DFA.disableDragging();

  //av.umsg(injector.injectQuestion("q1"));
  //av.step();

  //av.umsg(injector.injectQuestion("q2"));
  //av.step();

  //av.umsg(injector.injectQuestion("q3"));
  //av.step();

  av.recorded();

 
});
