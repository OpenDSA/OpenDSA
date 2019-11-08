$(document).ready(function(){
    "use strict";
    var av_name = "section133CON";
    var av = new JSAV(av_name);
    var arrow = String.fromCharCode(8594);
    var grammar =  "[[\"<\",\"sentence\",\">\",\"→\",\"<\",\"subject\",\">\", \"<\",\"verb\",\">\",\"<\",\"d.o.\",\">\"],\
    [\"<\",\"verb\",\">\",\"→\",\"<\",\"noun\",\"<\",\"|\",\"<\",\"article\",\">\",\"<\",\"noun\",\">\",],\
    [\"<\",\"d.o.\",\">\",\"→\",\"<\",\"article\",\">\",\"<\",\"noun\",\">\",\"|\",\"<\",\"noun\",\">\",],\
    [\"<\",\"noun\",\">\",\"→\"\"Frits\",\"|\",\"ball\",],\
    [\"<\",\"article\",\">\",\"→\",\"the\",\"|\",\"an\",\"|\",\"a\",]]";
        /****/
    /**<sentence> → <subject><verb><d.o.>
<subject> → <noun> | <article><noun>
<verb> → hit | ran | ate
<d.o.> → <article><noun> | <noun>
<noun> → Fritz | ball
<article>→ the | an | a
 */
var grammerArray = JSON.parse(grammar);
var lastRow = grammerArray.length;
grammerArray.push(["", arrow, ""]);
var grammerMatrix = av.ds.matrix(grammerArray, {style: "table", left: 10});
av.displayInit();
av.umsg("To remove unit productions, we need to identify all unit productions using a dependency graph.")
av.step();
var transformer = new ContextFreeGrammarTransformer(av, grammar);
var newGrammar = transformer.convertToChomsky(grammerMatrix);
av.recorded();
});