$(document).ready(function() {
    "use strict";
    var av_name = "REtoFAExampleFF";
    var av = new JSAV(av_name);
    var matrixOptions = {
        left: 10,
        top:0,
        width: 300,
        height: 250
    };
    var grammer = "[[\"S\",\"→\",\"aS\"],\
                    [\"S\",\"→\",\"aA\"],\
                    [\"A\",\"→\",\"bS\"],\
                    [\"A\",\"→\",\"aB\"],\
                    [\"B\",\"→\",\"bS\"],\
                    [\"A\",\"→\",\"λ\"]]";
    var GToFAConverter = new GrammarToFAConverter(av,grammer,matrixOptions);
    av.umsg("Suppose we need to convert this Regular Grammar to an NFA");
    var NFAoptions = {
        top: 250,
        left: 70,
        width: 500,
        height: 250
    };
    av.displayInit();
    //av.umsg("We need a state for each Variable and a final state.")
    //GToFAConverter.convertToFA(NFAoptions);
    gToFAConverterWithQuestion(av_name, GToFAConverter, NFAoptions, {top: 10, left: -50});
    av.step();
    av.recorded();
});
