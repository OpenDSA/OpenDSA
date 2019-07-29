$(document).ready(function() {
  "use strict";
  var av_name = "RegExf3b";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url = "../../../AV/VisFormalLang/FA/Machines/reg_exp_fig3b.jff";
  new av.ds.FA({url:url});
  av.displayInit();
  av.recorded();
});
