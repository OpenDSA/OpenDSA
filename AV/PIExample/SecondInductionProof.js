$(document).ready(function () {
    "use strict";
    var av_name = "SecondInductionProof";
    var av = new JSAV(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
    interpret = config.interpreter;
    var av;
    var leftAlign = 150;
    var topAlign = 10;
    // Put these here so that the lines will appear on top.
    // This would be better handled by proper use of z-index.
    var p1 = av.g.polyline([[leftAlign + 60, topAlign + 30], [leftAlign + 110, topAlign + 80], [leftAlign + 30, topAlign + 80]]).addClass("highlight");
    p1.hide();
    var p2 = av.g.polyline([[leftAlign + 110, topAlign + 80], [leftAlign + 240, topAlign + 80], [leftAlign + 175, topAlign + 145]]).addClass("highlight");
    p2.hide();
    var p3 = av.g.polyline([[leftAlign + 240, topAlign + 80], [leftAlign + 330, topAlign + 80], [leftAlign + 290, topAlign + 30]]).addClass("highlight");
    p3.hide();
    var p4 = av.g.polyline([[leftAlign + 175, topAlign + 145], [leftAlign + 230, topAlign + 200], [leftAlign + 120, topAlign + 200]]).addClass("highlight");
    p4.hide();
    var p5 = av.g.polyline([[leftAlign + 175, topAlign + 145], [leftAlign + 195, topAlign + 165], [leftAlign + 155, topAlign + 165]]).addClass("highlight");
    p5.hide();
    var p6 = av.g.polyline([[leftAlign + 155, topAlign + 165], [leftAlign + 85, topAlign + 165], [leftAlign + 105, topAlign + 212.5]]).addClass("highlight");
    p6.hide();
    var p7 = av.g.polyline([[leftAlign + 195, topAlign + 165], [leftAlign + 275, topAlign + 165], [leftAlign + 240, topAlign + 210]]).addClass("highlight");
    p7.hide();

    // frame 1
    av.umsg(interpret("sc1"));
    var baseCaseLine = av.g.line(leftAlign, topAlign + 50, leftAlign + 350, topAlign + 50).addClass("thickLine");
    var baseCaseLabel1 = av.label(interpret("lab1"),  {top: topAlign - 25, left: leftAlign + 400}).addClass("largeLabel");
    var baseCaseLabel2 =  av.label(interpret("lab2"),  {top: topAlign + 75, left: leftAlign + 400}).addClass("largeLabel");
    av.displayInit();
    //frame 2
    av.umsg(interpret("sc2"), {preserve: true});
    var baseCaseRect = av.g.rect(leftAlign, topAlign + 50, 350, 50).addClass("highlight");
    av.step();


    //frame 3
    av.umsg(interpret("sc3"));
    baseCaseRect.hide();
    baseCaseLine.hide();
    baseCaseLabel1.hide();
    baseCaseLabel2.hide();
    av.step();

    //frame 4
    av.umsg(interpret("sc4"), {preserve: true});
    av.g.line(leftAlign + 50, topAlign + 20, leftAlign + 250, topAlign + 220).addClass("thickLine");
    av.g.line(leftAlign + 0, topAlign + 80, leftAlign + 350, topAlign + 80).addClass("thickLine");
    av.g.line(leftAlign + 300, topAlign + 20, leftAlign + 100, topAlign + 220).addClass("thickLine");
    var l4 = av.g.line(leftAlign + 0, topAlign + 165, leftAlign + 350, topAlign + 165).addClass("thickLine");
    av.step();

    //frame 5
    av.umsg(interpret("sc5"), {preserve: true});
    l4.hide();
    av.step();


    av.recorded();
});
