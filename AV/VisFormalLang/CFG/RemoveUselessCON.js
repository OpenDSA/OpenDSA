$(document).ready(function() {
    "use strict";
    var av_name = "RemoveUselessCON";
    var av = new JSAV(av_name);
    var arrow = String.fromCharCode(8594);
    var grammar = "[[\"S\",\"→\",\"aB\"],[\"B\",\"→\",\"Sa\"],[\"B\",\"→\",\"a\"],[\"C\",\"→\",\"cBc\"],[\"C\",\"→\",\"a\"]]";
    var grammerArray = JSON.parse(grammar);
    var lastRow = grammerArray.length;
    grammerArray.push(["", arrow, ""]);
    var grammerMatrix = av.ds.matrix(grammerArray, {style: "table", left: 10});
    av.displayInit();
    av.umsg("To remove useless productions, we need to check for two things.\n1) Productions that do not produce a terminal string (No infinity loop).\n2) Productions that are not reachable from the start variable. ")
    av.step();
    var transformer = new ContextFreeGrammarTransformer(av, grammar);
    var newGrammar = transformer.removeUseless(grammerMatrix);
    av.recorded();
    });
    