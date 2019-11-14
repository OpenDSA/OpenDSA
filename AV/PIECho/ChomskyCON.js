$(document).ready(function(){
    "use strict";
    var av_name = "ChomskyCON";
    var av = new JSAV(av_name);
    var arrow = String.fromCharCode(8594);
    var grammar =  "[\
        [\"(sentence)\",\"→\",\"\(subject)(verb)(d.o.)\"],\
        [\"(verb)\",\"→\",\"(noun)|(article)(noun)\"],\
        [\"(d.o.)\",\"→\",\"(article)(noun)|(nounz\"],\
        [\"(noun)\",\"→\",\"Frits|ball\"],\
        [\"(article)\",\"→\",\"the|an|a\"]\
    ]";
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

av.recorded();
});
