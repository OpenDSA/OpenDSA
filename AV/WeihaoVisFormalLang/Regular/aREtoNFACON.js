$(document).ready(function() {
    "use strict";
    var av_name = "aREtoNFACON";
    var av = new JSAV(av_name, {animationMode: "none"});
    var url = "../../../AV/VisFormalLang/Regular/Machines/aRE.jff";
    new av.ds.FA({url: url});
    av.displayInit();
    av.recorded();
  });