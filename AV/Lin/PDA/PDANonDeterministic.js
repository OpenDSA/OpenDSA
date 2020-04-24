// Written by Cliff Shaffer, Fall 2019, machine by Mostafa Mohammed
$(document).ready(function() {
  "use strict";

  // var av_name = "PDANonDeterministic";
  // var av = new JSAV(av_name, {animationMode: "none"});
  // var url = "../../../AV/Lin/PDA/Machines/NonDeterministicPDA.jff";
  // var pda = new av.ds.PDA({width: 600, height: 210, url: url});
  // PDA.prototype.loadFAFromJFLAPFile.call(pda,url);
  // av.displayInit();
  // av.recorded();

  var av_name = "PDANonDeterministic";
  var av = new JSAV(av_name);
  var url = "../../../AV/Lin/PDA/Machines/NonDeterministicPDA.jff";
  av.umsg("Let us see the tace for accepting the string $aabbbb$.");
  var inputString = "aabbbb";
  var pda = new av.ds.PDA({width: 600, height: 200, url: url});
  runPDA(pda, inputString, true);
  av.recorded();
});
