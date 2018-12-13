// Reduction of true && false using Church bools
$(document).ready(function() {
    "use strict";
    var av_name = "church_bool";

    var av = new JSAV(av_name);
    var l = av.label("((λp.λq.((p q) λx.λy.y) λx.λy.x) λx.λy.y)");
    av.umsg("TRUE AND FALSE in Church booleans");
    l.addClass("church");
    av.displayInit();
    av.umsg("First beta-reduce the application containing the λp abstraction by applying the λp abstraction to λx.λy.x");
    l.text("(&nbsp;&nbsp;&nbsp;(λp.λq.((p q) λx.λy.y)&nbsp;&nbsp;&nbsp; λx.λy.x) λx.λy.y)");
    av.step();
    av.umsg("With λx.λy.x appropriately substituted for p in the prior λp abstraction, we get ... ");
    l.text("(λq.((λx.λy.x q) λx.λy.y) λx.λy.y)");
    av.step();
    av.umsg("Then reduce the leftmost innermost β-redex, that is, the one with the λx abstraction below");
    l.text("(λq.(&nbsp;&nbsp;&nbsp;(λx.λy.x q)&nbsp;&nbsp;&nbsp; λx.λy.y) λx.λy.y)");
    av.step();
    av.umsg("Doing that reduction with the appropriate substitution for x results in ...");
    l.text("(λq.(λy.q λx.λy.y) λx.λy.y)");
    av.step();
    av.umsg("Next in the λq abstraction reduce the inner redex – the one starting with the λy abstraction");
    l.text("(λq.(λy.q λx.λy.y) λx.λy.y)");
    av.step();
    av.umsg("That reduction will give us ...");
    l.text("(λq.q λx.λy.y)");
    av.step();
    av.umsg("Finally beta-reduce the redex that remains, that is, the one starting with λq abstraction");
    l.text("(λq.q λx.λy.y)");
    av.step();
    av.umsg("This yields what we have defined to be FALSE");
    l.text("λx.λy.y");
    av.step();
    av.recorded();
});
