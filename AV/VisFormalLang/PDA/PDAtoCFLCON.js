document.write('<script src="../../../AV/Development/formal_language/fa/Automaton.js"></script>');
document.write('<script src="../../../AV/FLA/resources/underscore-min.js"></script>');
document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');
document.write('<script src="../../../AV/Development/formal_language/contextFree/ConvertPDAtoGrammar.js"></script>');

$(document).ready(function() {
    "use strict";
    var av_name = "PDAtoCFLCON";
    var av = new JSAV(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var arrow = String.fromCharCode(8594);
    var grammar = "[[\"S\",\"→\",\"aSA\"],\
                    [\"S\",\"→\",\"aAA\"],\
                    [\"S\",\"→\",\"b\"],\
                    [\"A\",\"→\",\"bBBB\"],\
                    [\"B\",\"→\",\"b\"]]";
    var grammerArray = JSON.parse(grammar);
    var lastRow = grammerArray.length;
    grammerArray.push(["", arrow, ""]);
    var grammerMatrix = av.ds.matrix(grammerArray, {style: "table", left: 10});
    av.displayInit();
    var transformer = new PDAtoGrammarTransformer(av, grammar, grammerMatrix);
    transformer.convertToPDA();
    av.recorded();
});
