//document.write('<script src="../../../AV/Development/formal_language/contextFree/ParseTree.js"></script>');
//document.write('<script src="../../../AV/FLA/resources/u/nderscore-min.js"></script>');

$(document).ready(function() {
"use strict";
var av_name = "ParseTree1CON";
var av = new JSAV(av_name);
var arrow = String.fromCharCode(8594);
var grammar = "[[\"S\",\"→\",\"AcB\"],[\"A\",\"→\",\"aAa\"],[\"A\",\"→\",\"λ\"],[\"B\",\"→\",\"Bbb\"],[\"B\",\"→\",\"λ\"]]";
var grammerArray = JSON.parse(grammar);
grammerArray.length;
grammerArray.push(["", arrow, ""]);
av.ds.matrix(grammerArray, {style: "table", left: 10});
av.umsg("Here is an example that shows how can we build a parse tree for the string $aacbb$ for the given grammar.")
av.displayInit();
var pt = new ParseTreeController(av, grammar, "aacbb", {top: 0, left: 400});
pt.displayTree();

av.recorded();
});
