// Written by Ziyou Shang from an image by Susan Rodger
$(document).ready(function() {
    "use strict";
  
    var av_name = "PDADiagram";
    var av = new JSAV(av_name, {animationMode: "none"});
  
    var radiusS = 15;
    var radiusF = 20;
  
    // machine and states that are not final states
    var rect = av.g.rect(260, 30, 200, 280);
    var state1 = av.g.circle(170, 100, radiusS);
    var state2 = av.g.circle(310, 100, radiusS);
    var state3 = av.g.circle(600, 100, radiusS);
  
    // final states
    var state4 = av.g.circle(400, 80, radiusS);
    var state4F = av.g.circle(400, 80, radiusF);
    var state5 = av.g.circle(400, 150, radiusS);
    var state5F = av.g.circle(400, 150, radiusF);
    var state6 = av.g.circle(400, 220, radiusS);
    var state6F = av.g.circle(400, 220, radiusF);
  
    // arrows
    var arrow1 = av.g.line(110,100,145,100,{"arrow-end": "classic-wide-long"});
    var arrow2 = av.g.line(192,100,285,100,{"arrow-end": "classic-wide-long"});
    var line1 = av.g.polyline([[425, 80], [550, 80], [575, 90]], {"arrow-end": "classic-wide-long"});
    var line2 = av.g.polyline([[425, 150], [550, 150], [575, 110]], {"arrow-end": "classic-wide-long"});
    var line3 = av.g.polyline([[425, 220], [550, 220], [585, 125]], {"arrow-end": "classic-wide-long"});
    var line4 = av.g.polyline([[618, 90], [650, 80], [645, 110],[630, 120], [620, 113]], {"arrow-end": "classic-wide-long"});
  
    // labels  
    av.label("q", {left: 160, top: 75});
    av.label("s", {left: 168, top: 83});
    av.label("M", {left: 310, top: 25});
    av.label("q", {left: 300, top: 75});
    av.label("0", {left: 308, top: 83});
    av.label("q", {left: 593, top: 75});
    av.label("f", {left: 601, top: 83});
    av.label("λ , z; zz'", {left: 200, top: 65});
    av.label("λ , x; λ", {left: 480, top: 45});
    av.label("λ , x; λ", {left: 480, top: 115});
    av.label("λ , x; λ", {left: 480, top: 185});
    av.label("λ , x; λ", {left: 660, top: 70});
  
    av.displayInit();
    av.recorded();
  });
  