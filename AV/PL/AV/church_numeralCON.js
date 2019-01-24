// Reduction of (SUCC THREE) using Church bools
$(document).ready(function() {
    "use strict";
    var av_name = "church_numeralCON";

    var av = new JSAV(av_name);
    var l = av.label("(λn.λf.λx.(f ((n f) x)) λf.λx.(f (f (f x))))");
    av.umsg("Reduction of (SUCC THREE) in Church numerals");
    l.addClass("church");
    av.displayInit();
    av.umsg("First beta-reduce by applying the λn abstraction highlighted below to λf.λx.(f (f (f x)))");
    l.text("(<span style='color:red'>λn.λf.λx.(f ((n f) x))</span> &nbsp;&nbsp; λf.λx.(f (f (f x))))");
    av.step();
    av.umsg("Doing that β-reduction will yield the following");
    l.text("λf.λx.(f ((λf.λx.(f (f (f x))) f) x))");
    av.step();
    av.umsg("Then beta-reduce the  redex highlighted below");
    l.text("λf.λx.(f (&nbsp;&nbsp <span style='color:red'>(λf.λx.(f (f (f x))) f)</span> &nbsp;&nbsp; x))");
    av.step();
    av.umsg("Doing that β-reduction yields ...");
    l.text("λf.λx.(f (λx.(f (f (f x))) x))");
    av.step();
    av.umsg("Then β-reduce using the innermost redex");
    l.text("λf.λx.(f &nbsp;&nbsp; <span style='color:red'>(λx.(f (f (f x))) x)</span> &nbsp;&nbsp;)");
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
