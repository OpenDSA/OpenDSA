// Reduction of (MULT TWO THREE) using Church bools
$(document).ready(function() {
    "use strict";
    var av_name = "church_multCON";

    var av = new JSAV(av_name);
    var l = av.label("((λm.λn.λf.(m (n f)) λf.λx.(f (f x))) λf.λx.(f (f (f x))))");
    av.umsg("Reduction of ((MULT TWO) THREE) in Church numerals");
    l.addClass("church");
    av.displayInit();
    av.umsg("First β-reduce by applying the λm abstraction highlighted below to λf.λx.(f (f x))");
    l.text("(&nbsp;&nbsp;(<span style='color:red'>λm.λn.λf.(m (n f))</span> λf.λx.(f (f x))) &nbsp;&nbsp; λf.λx.(f (f (f x))))");
    av.step();
    av.umsg("Doing that reduction will yield ...");
    l.text("(λn.λf.(λf.λx.(f (f x)) (n f)) λf.λx.(f (f (f x))))");
    av.step();
    av.umsg("Next β-reduce the leftmost innermost redex");
    l.text("(λn.λf.<span style='color:red'>(λf.λx.(f (f x)) (n f))</span> λf.λx.(f (f (f x))))");
    av.step();
    av.umsg("That reduction yields ...");
    l.text("(λn.λf.λx.((n f) ((n f) x)) λf.λx.(f (f (f x))))");
    av.step();
    av.umsg("Next apply the λn abstraction highlighted below to λf.λx.(f (f (f x)))");
    l.text("(<span style='color:red'>λn.λf.λx.((n f) ((n f) x))</span> λf.λx.(f (f (f x))))");
    av.step();
    av.umsg("That reduction yields ...");
    l.text("λf.λx.((λf.λx.(f (f (f x))) f) ((λf.λx.(f (f (f x))) f) x))");
    av.step();
    av.umsg("Next reduce the leftmost innermost redex highlighted below");
    l.text("λf.λx.(<span style='color:red'>(λf.λx.(f (f (f x))) f)</span> ((λf.λx.(f (f (f x))) f) x))");
    av.step();
    av.umsg("That reduction yields ...");
    l.text("λf.λx.(λx.(f (f (f x))) ((λf.λx.(f (f (f x))) f) x))");
    av.step();
    av.umsg("Next reduce the innermost redex highlighted below");
    l.text("λf.λx.(λx.(f (f (f x))) (<span style='color:red'>(λf.λx.(f (f (f x))) f)</span> x))");
    av.step();
    av.umsg("That reduction yields ...");
    l.text("λf.λx.(λx.(f (f (f x))) (λx.(f (f (f x))) x))");
    av.step();
    av.umsg("Next reduce the innermost redex highlighted below");
    l.text("λf.λx.(λx.(f (f (f x))) <span style='color:red'>(λx.(f (f (f x))) x)</span>)");
    av.step();
    av.umsg("That reduction yields ...");
    l.text("λf.λx.(λx.(f (f (f x))) (f (f (f x))))");
    av.step();
    av.umsg("Reduce the lone remaining β-redex highlighted below");
    l.text("λf.λx.<span style='color:red'>(λx.(f (f (f x))) (f (f (f x))))</span>");
    av.step();

    av.umsg("Finally yielding SIX");
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

