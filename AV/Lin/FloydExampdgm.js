$(document).ready(function () {
    "use strict";
    var av = new JSAV("FloydExampdgm", {"animationMode": "none"});
    var g = av.ds.graph({width: 300, height: 350,
                           layout: "manual", directed: false});
    var v0 = g.addNode("0", {"left": 0, "top":   100});
    var v1 = g.addNode("1", {"left": 125, "top":   0});
    var v2 = g.addNode("2", {"left": 125, "top":  150});
    var v3 = g.addNode("3", {"left": 250, "top": 100});
    //Node 0 to Node 1
    av.g.path( ["M300 117 A140 140 0 0 1 401 30"].join(","),{"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    //Node 1 to Node 0
    av.g.path( ["M402 35 A140 140 0 0 1 303 120"].join(","),{"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    //Node 0 to Node 2
    av.g.path( ["M307 138 A140 140 0 0 1 402 177"].join(","),{"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});  
    //Node 2 to Node 0
    av.g.path( ["M400 180 A140 140 0 0 1 302 143"].join(","),{"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    //Node 1 to Node 2
    av.g.path( ["M422 48 A170 170 0 0 1 425 167"].join(","),{"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    //Node 2 to Node 1
    av.g.path( ["M410 165 A170 170 0 0 1 410 46"].join(","),{"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    //Node 1 to Node 3
    av.g.path( ["M433 30 A140 140 0 0 1 532 120"].join(","),{"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});  
    //Node 3 to Node 1
    av.g.path( ["M527 127 A140 140 0 0 1 428 40"].join(","),{"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2}); 
    //Node 2 to Node 3
    av.g.path( ["M433 177 A140 140 0 0 1 528 137"].join(","),{"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    //Node 3 to Node 2
    av.g.path( ["M530 143 A140 140 0 0 1 431 181"].join(","),{"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    //Node 0 to Node 3
     av.g.path( ["M298 147 A140 140 0 0 0 537 145"].join(","),{"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});  
    //Node 3 to Node 0
     av.g.path( ["M542 147 A130 130 0 0 1 290 145"].join(","),{"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    //label Node 0 to Node 1
    av.label("1", {left: 328, top: 33, fontsize:22});
    //label Node 1 to Node 3
    av.label("7", {left: 498, top: 35});
    //label Node 1 to Node 0
    av.label("4", {left: 353, top: 58});
    //label Node 3 to Node 1
    av.label("3", {left: 463, top: 59});
    //label Node 2 to Node 1
    av.label("5", {left: 387, top: 87});
    //label Node 1 to Node 2
    av.label( "\u221E" , {left: 436, top: 72}).addClass("largeLabel");
    //label Node 2 to Node 0
    av.label("2", {left: 350, top: 138});
    //label Node 3 to Node 2
    av.label("\u221E", {left: 470, top: 124}).addClass("largeLabel");
    //label Node 0 to Node 3
    av.label("12", {left: 409, top: 180});
    //label Node 0 to Node 2
    av.label("\u221E", {left: 353, top: 100}).addClass("largeLabel");
    //label Node 2 to Node 3
    av.label("11", {left: 466, top: 115});
    //label Node 3 to Node 0
    av.label("\u221E",{left: 411, top: 197}).addClass("largeLabel");
    g.layout();
    av.displayInit();
    av.recorded();
    });
