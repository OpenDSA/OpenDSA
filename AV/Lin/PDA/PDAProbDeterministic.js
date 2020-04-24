// Written by Cliff Shaffer, Fall 2019, machine by Mostafa Mohammed
$(document).ready(function() {
  "use strict";

  // var av_name = "PDAProbDeterministic";
  // var av = new JSAV(av_name, {animationMode: "none"});
  // var url = "../../../AV/Lin/PDA/Machines/ProbDeterministic.jff";
  // var pda = new av.ds.PDA({width: 600, height: 250, url: url});
  // PDA.prototype.loadFAFromJFLAPFile.call(pda,url);
  // av.displayInit();
  // av.recorded();


  var av_name = "PDAProbDeterministic";
  var av = new JSAV(av_name);
  var url = "../../../AV/Lin/PDA/Machines/ProbDeterministic.jff";
  av.umsg("Let us see the tace for accepting the string $aabbbc$.");
  var inputString = "aabbbc";
  var pda = new av.ds.PDA({width: 600, height: 200, url: url});
  runPDA(pda, inputString, true);
  av.recorded();


  // var av_name = "PDAProbDeterministic";
  // var av = new JSAV(av_name);
  // var url = "../../../AV/Lin/PDA/Machines/PDAProbDeterministic.jff";
  // av.umsg("Let us see the tace for accepting the string $aabbbc$.");
  // var inputString = "aabbbc";
  // var pda = new av.ds.PDA({width: 600, height: 200, url: url});
  // runPDA(pda, inputString, true);
  // av.recorded();
});
