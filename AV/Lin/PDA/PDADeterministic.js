// Written by Mostafa Mohammed, Fall 2018
$(document).ready(function() {
  "use strict";

  // var av_name = "PDADeterministic";
  // var av = new JSAV(av_name, {animationMode: "none"});
  // var url = "../../../AV/Lin/PDA/Machines/PDADeterministic.jff";
  // var pda = new av.ds.PDA({width: 600, height: 200, url: url});
  // PDA.prototype.loadFAFromJFLAPFile.call(pda,url);
  // av.displayInit();
  // av.recorded();

  var av_name = "PDADeterministic";
  var av = new JSAV(av_name);
  var url = "../../../AV/Lin/PDA/Machines/PDADeterministic.jff";
  av.umsg("Let us see the tace for accepting the string $aabbb$.");
  var inputString = "aabbb";
  var pda = new av.ds.PDA({width: 600, height: 200, url: url});
  runPDA(pda, inputString, true);
  av.recorded();
});
