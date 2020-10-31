$(document).ready(function() {
    "use strict";
  
    var av_name = "GTGtoNFACON";
    var av = new JSAV(av_name);
    var regex = "ab*+c";
    var avWidth = 800,
        avHeight = 500;
    av.umsg("In this example, we will convert the above GTG to an NFA.");
    av.displayInit();
    var REtoFA = new REtoFAController(av, regex,{width: avWidth, height: avHeight, left: 10}, true);
    var NFA = REtoFA.completeAll();
    av.step();
    av.recorded();
});