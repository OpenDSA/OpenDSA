$(document).ready(function() {
    "use strict";
    var av_name = "phiREtoNFACON";
    var av = new JSAV(av_name, {animationMode: "none"});
    var url = "../../../AV/VisFormalLang/Regular/Machines/phiRE.jff";
    new av.ds.FA({url: url});
    av.displayInit();
    av.recorded();
  });