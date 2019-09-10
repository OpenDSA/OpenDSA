$(document).ready(function() {
    "use strict";
    var av_name = "GTGExampleCON";
    var av = new JSAV(av_name, {animationMode: "none"});
    var dfa = new av.ds.FA();
    var s = dfa.addNode({value: "s", left:20, top: 20});
    var f = dfa.addNode({value: "f", left:220, top: 20});

    toggleInitial(dfa, s);
    toggleFinal(dfa,f);
    dfa.addEdge(s, f, {weight: "$ab^*+c$"});
    av.displayInit();
    av.recorded();
  });
  