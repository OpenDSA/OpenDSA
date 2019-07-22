$(document).ready(function() {
  "use strict";

  var av_name = "RegExf2";
  var av = new JSAV(av_name, {animationMode: "none"});
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter;
  var url = interpret("regexp2");

  new av.ds.FA({url:url});
  av.displayInit();
  av.recorded();
});