// Reduction of (MULT TWO THREE) using Church bools
$(document).ready(function() {
    "use strict";
    var av_name = "church_mult";

    var av = new JSAV(av_name);
    var l = av.label("((λm.λn.λf.(m (n f)) λf.λx.(f (f x))) λf.λx.(f (f (f x))))");
    av.umsg("Reduction of (MULT TWO THREE) in Church numerals");
    l.addClass("church");
    av.displayInit();
    av.umsg("First beta-reduce the λm abstraction");
    av.step();
    av.umsg("Next the leftmost innermost λf abstraction");
    l.text("(λn.λf.(λf.λx.(f (f x)) (n f)) λf.λx.(f (f (f x))))");
    av.step();
    av.umsg("Next the λn abstraction");
    l.text("(λn.λf.λx.((n f) ((n f) x)) λf.λx.(f (f (f x))))");
    av.step();
    av.umsg("Next the leftmost innermost λf abstraction");
    l.text("λf.λx.((λf.λx.(f (f (f x))) f) ((λf.λx.(f (f (f x))) f) x))");
    av.step();
    av.umsg("Next the innermost λf abstraction");
    l.text("λf.λx.(λx.(f (f (f x))) ((λf.λx.(f (f (f x))) f) x))");
    av.step();
    av.umsg("Next the innermost λx abstraction");
    l.text("λf.λx.(λx.(f (f (f x))) (λx.(f (f (f x))) x))");
    av.step();
    av.umsg("The innermost λx abstraction");
    l.text("λf.λx.(λx.(f (f (f x))) (f (f (f x))))");
    av.step();

    av.umsg("Yielding SIX");
    l.text("λf.λx.(f (f (f (f (f (f x))))))");
    av.recorded();
});




// ((λm.λn.λf.(m (n f)) λf.λx.(f (f x))) λf.λx.(f (f (f x)))) *
// ((λm.λn.λf.(m (n f)) λf.λx.(f (f x))) λf.λx.(f (f (f x))))
// (λn.λf.(λf.λx.(f (f x)) (n f)) λf.λx.(f (f (f x)))) *
// (λn.λf.(λf.λx.(f (f x)) (n f)) λf.λx.(f (f (f x))))
// (λn.λf.λx.((n f) ((n f) x)) λf.λx.(f (f (f x)))) *
// (λn.λf.λx.((n f) ((n f) x)) λf.λx.(f (f (f x))))
// λf.λx.((λf.λx.(f (f (f x))) f) ((λf.λx.(f (f (f x))) f) x)) *
// λf.λx.((λf.λx.(f (f (f x))) f) ((λf.λx.(f (f (f x))) f) x))
// λf.λx.(λx.(f (f (f x))) ((λf.λx.(f (f (f x))) f) x)) *
// λf.λx.(λx.(f (f (f x))) ((λf.λx.(f (f (f x))) f) x))
// λf.λx.(λx.(f (f (f x))) (λx.(f (f (f x))) x)) *
// λf.λx.(λx.(f (f (f x))) (λx.(f (f (f x))) x))
// λf.λx.(λx.(f (f (f x))) (f (f (f x)))) *
// λf.λx.(λx.(f (f (f x))) (f (f (f x))))
// λf.λx.(f (f (f (f (f (f x))))))

