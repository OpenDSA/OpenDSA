// Title: Context-Free Language Derivation Trees Example
// Author: Mostafa Mohammed; Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Context-Free Language
// Natural Language: en
// Programming Language: N/A
/* Description: Visualization of a derviation tree from a given context-free grammar. */

$(document).ready(function() {
    "use strict";
    var av_name = "TreeExampleCON";
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
    
