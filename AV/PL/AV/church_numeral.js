// Reduction of (SUCC THREE) using Church bools
$(document).ready(function() {
    "use strict";
    var av_name = "church_numeral";

    var av = new JSAV(av_name);
    var l = av.label("(λn.λf.λx.(f ((n f) x)) λf.λx.(f (f (f x))))");
    av.umsg("Reduction of (SUCC THREE) in Church numerals");
    l.addClass("church");
    av.displayInit();
    av.umsg("First beta-reduce the λn abstraction");
    av.step();
    av.umsg("Then beta-reduce the innermost λf abstraction");
    l.text("λf.λx.(f ((λf.λx.(f (f (f x))) f) x))");
    av.step();
    av.umsg("Then beta-reduce the innermost λx abstraction");
    l.text("λf.λx.(f (λx.(f (f (f x))) x))");
    av.step();
    av.umsg("Yielding FOUR");
    l.text("λf.λx.(f (f (f (f x))))");
    av.recorded();
});

// 
// (λn.λf.λx.(f ((n f) x)) λf.λx.(f (f (f x))))
// (λn.λf.λx.(f ((n f) x)) λf.λx.(f (f (f x))))
// λf.λx.(f ((λf.λx.(f (f (f x))) f) x))
// λf.λx.(f ((λf.λx.(f (f (f x))) f) x))
// λf.λx.(f (λx.(f (f (f x))) x))
// λf.λx.(f (λx.(f (f (f x))) x))
// λf.λx.(f (f (f (f x))))
