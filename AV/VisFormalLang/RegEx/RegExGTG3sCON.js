$(document).ready(function() {
  "use strict";
  var av_name = "RegExGTG3sCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/RegEx/Machines/RegExGTG3s.jff";
  var dfa = new av.ds.FA({url: url});
  av.displayInit();
  av.recorded();
});
