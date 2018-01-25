// Reduction of true && false using Church bools
$(document).ready(function() {
    "use strict";
    var av_name = "church_bool";

    var av = new JSAV(av_name);
    var l = av.label("((λp.λq.((p q) λx.λy.y) λx.λy.x) λx.λy.y)");
    av.umsg("TRUE AND FALSE in Church booleans");
    l.addClass("church");
    av.displayInit();
    av.umsg("First beta-reduce the λp abstraction");
    av.step();
    av.umsg("Then beta-reduce the leftmost λx abstraction");
    l.text("(λq.((λx.λy.x q) λx.λy.y) λx.λy.y)");
    av.step();
    av.umsg("Then beta-reduce the λy abstraction");
    l.text("(λq.(λy.q λx.λy.y) λx.λy.y)");
    av.step();
    av.umsg("Finally beta-reduce the λq abstraction");
    l.text("(λq.q λx.λy.y)");
    av.step();
    av.umsg("Yielding FALSE");
    l.text("λx.λy.y");
    av.recorded();
});
