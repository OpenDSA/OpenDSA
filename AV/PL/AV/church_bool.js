// Reduction of true && false using Church bools
$(document).ready(function() {
    "use strict";
    var av_name = "church_bool";

    var av = new JSAV(av_name);
    var l = av.label("((λp.λq.((p q) λx.λy.y) λx.λy.x) λx.λy.y)");
    l.addClass("church");
    av.displayInit();
    av.step();
    l.text("(λq.((λx.λy.x q) λx.λy.y) λx.λy.y)");
    av.step();
    l.text("(λq.(λy.q λx.λy.y) λx.λy.y)");
    av.step();
    l.text("(λq.q λx.λy.y)");
    av.step();
    l.text("λx.λy.y");
    av.recorded();
});
