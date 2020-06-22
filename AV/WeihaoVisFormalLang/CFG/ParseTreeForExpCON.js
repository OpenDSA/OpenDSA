$(document).ready(function() {
    "use strict";
    var av_name = "ParseTreeForExpCON";
    var av = new JSAV(av_name);
    var arrow = String.fromCharCode(8594);
    var grammar = "[[\"E\",\"→\",\"E+T\"],[\"E\",\"→\",\"T\"],[\"T\",\"→\",\"T*F\"],[\"T\",\"→\",\"F\"],[\"F\",\"→\",\"I\"]\
    ,[\"F\",\"→\",\"(E)\"],[\"I\",\"→\",\"a\"],[\"I\",\"→\",\"b\"]]";
    var grammerArray = JSON.parse(grammar);
    var lastRow = grammerArray.length;
    grammerArray.push(["", arrow, ""]);
    var grammerMatrix = av.ds.matrix(grammerArray, {style: "table", left: 10});
    av.umsg("Here is an example that shows how can we build a parse tree for the string $a+b*a$ for the given grammar.")
    av.displayInit();
    var pt = new ParseTreeController(av, grammar, "a+b*a", {top: 0, left: 400});
    pt.displayTree();
    
    av.recorded();
    });
    