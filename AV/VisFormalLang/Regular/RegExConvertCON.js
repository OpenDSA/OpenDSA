$(document).ready(function() {
  "use strict";
  var av_name = "RegExConvertCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var url1 = "../../../AV/VisFormalLang/Regular/Machines/RegExCon1.jff";
  var url2 = "../../../AV/VisFormalLang/Regular/Machines/RegExCon2.jff";
  new av.ds.FA({left: 0, url: url1});
  new av.ds.FA({left: 400, url: url2});
  av.displayInit();
  av.recorded();
});
