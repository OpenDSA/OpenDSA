// Written by Cliff Shaffer, Fall 2019, machine by Mostafa Mohammed
$(document).ready(function() {
  "use strict";

  var av_name = "PDAProbDeterministic";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/PDA/Machines/ProbDeterministic.jff";
  var pda = new av.ds.PDA({width: 600, height: 250, url: url});
  PDA.prototype.loadFAFromJFLAPFile.call(pda,url);
  av.displayInit();
  av.recorded();
});
