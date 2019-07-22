$(document).ready(function() {
  "use strict";

  var av_name = "RegExf3b";
  var av = new JSAV(av_name, {animationMode: "none"});
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter;
  var url = "../../../AV/VisFormalLang/FA/Machines/reg_exp_fig3b.jff";

  new av.ds.FA({url:url});
  av.displayInit();
  av.recorded();
});