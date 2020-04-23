// Written by Cliff Shaffer, Fall 2019, machine by Mostafa Mohammed
$(document).ready(function() {
  "use strict";

  var av_name = "PDANonDeterministic";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/PDA/Machines/NonDeterministicPDA.jff";
  var pda = new av.ds.PDA({width: 600, height: 210, url: url});
  PDA.prototype.loadFAFromJFLAPFile.call(pda,url);
  av.displayInit();
  av.recorded();
});
