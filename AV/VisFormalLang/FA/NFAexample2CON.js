$(document).ready(function() {
  "use strict";
  var av_name = "NFAexample2CON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/NFAexample2.jff";
  var nfa = new av.ds.FA({url: url});
  av.displayInit();
  av.recorded();
});
