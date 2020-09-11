// Written by Danielle Richard as a warm up task for Formal Languages Undergraduate Research Fall 2020

$(document).ready (function() {
    "use strict";

    var av_name = "container";
    var pda = new JSAV(av_name, {animationMode: "none"});

    var miniState = 15;
    var stateRadius = 20;
    var finalRadius = 25;

    // rectangle for the machine
    var machine = pda.g.rect(500, 100, 275, 300);

    // non-final states
    var state_1 = pda.g.circle(400, 200, stateRadius);
    var state_2 = pda.g.circle(550, 200, miniState);
    var state_3 = pda.g.circle(625, 150, miniState);
    var state_4 = pda.g.circle(725, 145, miniState);
    var state_5 = pda.g.circle(725, 245, miniState);
    var state_6 = pda.g.circle(725, 345, miniState);
    var state_7 = pda.g.circle(600, 320, miniState);

    // final state
    var state_1 = pda.g.circle(900, 200, stateRadius);
    var state_1 = pda.g.circle(900, 200, finalRadius);

    // basic arrows
    var arrow_1 = pda.g.line(350, 200, 375, 200, {"arrow-end": "open-wide-long"});
    var arrow_2 = pda.g.line(422, 200, 530, 200, {"arrow-end": "open-wide-long"});

    // complex arrows
    var arrow_3 = pda.g.polyline([[550, 213],[600, 500],[950, 500], [950, 250], [920,220]], {"arrow-end":"open-wide-long"});
    var arrow_4 = pda.g.polyline([[600, 335], [700, 450], [925, 450], [925, 255], [910,225]], {"arrow-end":"open-wide-long"});
    var arrow_5 = pda.g.polyline([[740, 145], [865, 145], [890, 175]], {"arrow-end": "open-wide-long"});
    var arrow_6 = pda.g.polyline([[740, 245], [875, 245], [890, 225]], {"arrow-end": "open-wide-long"});
    var arrow_7 = pda.g.polyline([[740, 345], [885, 345], [900, 227]], {"arrow-end": "open-wide-long"});
    var arrow_8 = pda.g.polyline([[635, 140], [660, 70], [925, 70], [950, 125], [920, 180]], {"arrow-end": "open-wide-long"});

    // start state label
    pda.label("q", {left: 390, top: 180});
    pda.label("s", {left: 400, top: 185});

    // arrow labels
    pda.label("\u03BB ,z'; \u03BB", {left: 750, top: 30});
    pda.label("\u03BB ,z'; \u03BB", {left: 800, top: 100});
    pda.label("\u03BB ,z'; \u03BB", {left: 800, top: 200});
    pda.label("\u03BB ,z'; \u03BB", {left: 800, top: 300});
    pda.label("\u03BB ,z'; \u03BB", {left: 750, top: 410});
    pda.label("\u03BB ,z'; \u03BB", {left: 725, top: 460});

    pda.label("\u03BB ,z';zz'", {left: 440, top: 160});

    // machine label
    pda.label("M", {left: 575, top: 100});

    // final state label
    pda.label("q", {left: 890, top: 180});
    pda.label("f", {left: 900, top: 185});


    pda.displayInit();
    pda.recorded();
});