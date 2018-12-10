/*global ODSA LAMBDA */

$(document).ready(function() {
    "use strict";
    var av_name = "LC1CON";
    LAMBDA.interpret(av_name,'((^x.x ^x.x) (^x.x ^x.x))',true);
    // getRndExp seems to produce an already parsed exp
    //LAMBDA.interpret(av_name,LAMBDA.getRndExp(1,2,6,"uvwxyz",""),true);
});

