/*global TraverseAcceptor*/

$(document).ready(function() {
    "use strict";
    var av_name = "AcceptRejectString";
    var config = ODSA.UTILS.loadConfig(
        {av_name: av_name, json_path: "/AV/Tenghui/AcceptRejectString.json"}),
        interpret = config.interpreter;
    var av = new JSAV(av_name);
    var obj = interpret("randomJFF");

    av.umsg("In this slideshow, we will trace the acceptance or rejections of some strings. The given machine can accept any even number. You can click on any cell to see the process again starting from the clicked cell");
    av.displayInit();

    RANDOMINPUT.randomQuestions(av, obj);

    av.recorded();

});
