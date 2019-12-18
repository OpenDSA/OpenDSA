$(document).ready(function() {
  "use strict";

  var av_name = "example_7_1_2";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/Ming/example_7_1_2/example_7_1_2_machine.jff";
  var pda = new av.ds.PDA({width: 600, height: 200, url: url});
  PDA.prototype.loadFAFromJFLAPFile.call(pda,url);
  pda.disableDragging();
  av.displayInit();
  av.recorded();
});
