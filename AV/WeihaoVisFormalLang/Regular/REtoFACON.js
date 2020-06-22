$(document).ready(function() {
    "use strict";
  
    var av_name = "REtoFACON";
    var av = new JSAV(av_name);
    var matrixOptions = {
        left: 10,
        top:0,
        width: 300,
        height: 250
    };
    var grammer = "[[\"S\",\"→\",\"aB\"],[\"S\",\"→\",\"aA\"],[\"A\",\"→\",\"aA\"],[\"A\",\"→\",\"bS\"],[\"A\",\"→\",\"bB\"],[\"B\",\"→\",\"bS\"],[\"B\",\"→\",\"λ\"]]";
    var GToFAConverter = new GrammarToFAConverter(av,grammer,matrixOptions);
    av.umsg("Suppose we need to convert this Regular Grammar to an NFA");
//    av.step();
    var NFAoptions = {
        top:0,
        left: 200,
        width: 500,
        height: 250
    };
    av.displayInit();
    av.umsg("We need a state for each Variable and a final state.")
    GToFAConverter.convertToFA(NFAoptions);
    av.step();
    av.recorded();
});
