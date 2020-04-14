$(document).ready(function () {
    "use strict";
    var av_name = "Abmiguity";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("$\\textbf {Reversal}$: $L^R$<br> $\\textbf {Difference}$: $L_1 - L_2$<br> $\\textbf {Right quotient}$:<br> Definition: $\\dfrac {L_1}{L_2} = \\{x | xy \\in L_1 \\ for \\ some \\ y \\in L_2\\}$ <br> In other words, it is prefixs of appropriate strings in $L_1$.");
    av.displayInit();

    av.recorded();
});
