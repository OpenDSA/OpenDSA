$(document).ready(function() {
    "use strict";
    var av_name = "RemoveUselessCON";
    var av = new JSAV(av_name);
    var arrow = String.fromCharCode(8594);
    var grammar = "[[\"S\",\"→\",\"aB\"],\
                    [\"S\",\"→\",\"bA\"],\
                    [\"A\",\"→\",\"aA\"],\
                    [\"B\",\"→\",\"Sa\"],\
                    [\"B\",\"→\",\"b\"],\
                    [\"C\",\"→\",\"cBc\"],\
                    [\"C\",\"→\",\"a\"],\
                    [\"D\",\"→\",\"bCb\"],\
                    [\"E\",\"→\",\"Aa\"],\
                    [\"E\",\"→\",\"b\"]]";
    var grammerArray = JSON.parse(grammar);
    var lastRow = grammerArray.length;
    grammerArray.push(["", arrow, ""]);
    var grammerMatrix = av.ds.matrix(grammerArray, {style: "table", left: 10});
    av.umsg("Suppose we need to remove the useless productions for the following grammar.");
    av.displayInit();
    var transformer = new ContextFreeGrammarTransformer(av, grammar);
    var newGrammar = transformer.removeUseless(grammerMatrix);
    av.recorded();
    });
    