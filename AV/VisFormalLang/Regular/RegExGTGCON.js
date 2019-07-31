$(document).ready(function() {
  "use strict";
  var av_name = "RegExGTGCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/Regular/Machines/RegExGTG.jff";
  var dfa = new av.ds.FA({url: url});
  av.displayInit();
  av.recorded();
});
