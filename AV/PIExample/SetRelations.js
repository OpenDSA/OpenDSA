$(document).ready(function () {
    "use strict";
    var av_name = "SetRelations";
    var av = new JSAV(av_name);
    var injector = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;
    //av.umsg("Set Relations frame"); //not the title just for an example
    
    av.displayInit();
    av.umsg(injector.injectQuestion("q1", "A relation R over set S is a set of ordered pairs from S."));
    av.step();
    
    
});
