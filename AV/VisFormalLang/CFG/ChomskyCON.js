$(document).ready(function() {
    "use strict";
    var av_name = "ChomskyCON";
    var av = new JSAV(av_name);
    var arrow = String.fromCharCode(8594);
     var grammar ="[[\"S\",\"→\",\"CBcd\"],\
    [\"B\",\"→\",\"b\"],\
    [\"C\",\"→\",\"Cc\"],\
    [\"C\",\"→\",\"e\"]]";
    var grammerArray = JSON.parse(grammar);
    var lastRow = grammerArray.length;
    grammerArray.push(["", arrow, ""]);
    var grammerMatrix = av.ds.matrix(grammerArray, {style: "table", left: 10});
    av.umsg("To remove unit productions, we need to identify all unit productions using a dependency graph.")
    av.displayInit();
    var transformer = new ContextFreeGrammarTransformer(av, grammar);
    var newGrammar = transformer.convertToChomsky(grammerMatrix);
    av.recorded();
    });
    
