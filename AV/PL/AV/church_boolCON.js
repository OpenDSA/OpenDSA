// Reduction of true && false using Church bools

// Title: Reduction of True and False using Church Bools
// Author: David Furcy; Tom Naps
// Institution: UW-Oshkosh
// Features: Algorithm Visualization
// Keyword: Lambda Calculus
// Natural Language: en
// Programming Language: N/A

/* Description: Slideshow visualizing reduction of true and false using Church bools. */

$(document).ready(function() {
    "use strict";
    var av_name = "church_boolCON";

    var av = new JSAV(av_name);
    var l = av.label("((λp.λq.((p q) λx.λy.y) λx.λy.x) λx.λy.y)");
    av.umsg("TRUE AND FALSE in Church Booleans");
    l.addClass("church");
    av.displayInit();
    av.umsg("First beta-reduce the application containing the λp abstraction by applying it to λx.λy.x");
    l.text("(<span style='color:red'>(λp.λq.((p q) λx.λy.y) λx.λy.x)</span> λx.λy.y)");
    av.step();
    av.umsg("With λx.λy.x appropriately substituted for p in the prior λp abstraction, we get ... ");
    l.text("(λq.((λx.λy.x q) λx.λy.y) λx.λy.y)");
    av.step();
    av.umsg("Then reduce the leftmost innermost β-redex highlighted below");
    l.text("(λq.(<span style='color:red'>(λx.λy.x q)</span> λx.λy.y) λx.λy.y)");
    av.step();
    av.umsg("Doing that reduction with the appropriate substitution for x results in ...");
    l.text("(λq.(λy.q λx.λy.y) λx.λy.y)");
    av.step();
    av.umsg("Next reduce the inner β-redex in the λq abstraction");
    l.text("(λq.<span style='color:red'>(λy.q λx.λy.y)</span> λx.λy.y)");
    av.step();
    av.umsg("That reduction will give us ...");
    l.text("(λq.q λx.λy.y)");
    av.step();
    av.umsg("Finally reduce the β-redex that remains, that is, the one starting with the λq abstraction");
    l.text("(λq.q λx.λy.y)");
    av.step();
    av.umsg("This yields what we have defined to be FALSE");
    l.text("λx.λy.y");
    av.step();
    av.recorded();
});
