$(document).ready(function() {
"use strict";
var av_name = "RemoveLambdaCON";
var av = new JSAV(av_name);
var arrow = String.fromCharCode(8594);
var grammar = "[[\"S\",\"→\",\"AcB\"],[\"A\",\"→\",\"aAa\"],[\"A\",\"→\",\"λ\"],[\"B\",\"→\",\"Bbb\"],[\"B\",\"→\",\"λ\"]]";
var grammerArray = JSON.parse(grammar);
var lastRow = grammerArray.length;
grammerArray.push(["", arrow, ""]);
var grammerMatrix = av.ds.matrix(grammerArray, {style: "table", left: 10});
av.umsg("Suppose we need to remove $\\lambda$ productions form the following grammar" )
av.displayInit();
var transformer = new ContextFreeGrammarTransformer(av, grammar);
var newGrammar = transformer.removeLambda(grammerMatrix);
av.recorded();
});
