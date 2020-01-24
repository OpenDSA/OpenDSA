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

    av.umsg("Testing Set Relations frame"); //not the title just for an example
    //av.umsg("Test222222222`");
    
    av.displayInit();
    av.umsg(injector.injectQuestion("q1", "A relation R over set S is a set of ordered pairs from S."));
    av.step();

    av.umsg(injector.injectQuestion("q2", "If tuple ⟨x,y⟩ is in relation R, we may use the infix notation xRy. We often use relations such as the less than operator (<) on the natural numbers"));
    av.step();
    
    av.umsg(injector.injectQuestion("q3", "Rather than writing the relationship in terms of ordered pairs, we typically use infix notation for such relations"));
    av.step();

    av.umsg(injector.injectQuestion("q4", "Frame: Define the properties of relations as follows, with R a binary relation over set S. 1- R is reflexive if aRa for all a ∈ S."));
    av.step();
    
    av.recorded();
});
