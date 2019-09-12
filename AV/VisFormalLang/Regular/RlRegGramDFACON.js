//Yijing Wu, fall 2019

$(document).ready(function() {
    "use strict";
    var av_name = "RlRegGramDFACON";
    var av = new JSAV(av_name, {animationMode: "none"});
    var url = "../../../AV/VisFormalLang/Regular/Machines/RlRegGramDFACON.jff";
    var RlRegGramDFA = new av.ds.FA({url: url});
    av.displayInit();
    av.recorded();
  });