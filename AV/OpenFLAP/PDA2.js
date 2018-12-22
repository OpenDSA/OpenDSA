// document.write('<script src="../../../AV/Development/formal_language/fa/Automaton.js"></script>');
// document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');
// document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"../../../AV/Development/formal_language/css/FA.css\" />");

$(document).ready(function() {
  "use strict";

  var av_name = "PDA2";
  var av = new JSAV(av_name, {animationMode: "none"});
  
  var radiusS = 20;
  var radiusF = 25;
  
  // machine and final state
  var rect = av.g.rect(260, 30, 240, 300);
  var state1 = av.g.circle(170, 100, radiusS);
  var state2 = av.g.circle(310, 100, radiusS);
  var state3 = av.g.circle(640, 100, radiusS);
  var state3F = av.g.circle(640, 100, radiusF);
  
  //  other states
  var state4 = av.g.circle(440, 80, radiusS);
  var state5 = av.g.circle(440, 150, radiusS);
  var state6 = av.g.circle(440, 220, radiusS);
  var state7 = av.g.circle(370, 85, radiusS);
  var state8 = av.g.circle(350, 200, radiusS);
  
  // arrows
  var arrow1 = av.g.line(110,100,145,100,{"arrow-end": "classic-wide-long"});
  var arrow2 = av.g.line(192,100,285,100,{"arrow-end": "classic-wide-long"});
  var line1 = av.g.polyline([[465, 80], [590, 80], [612, 90]], {"arrow-end": "classic-wide-long"});
  var line2 = av.g.polyline([[465, 150], [590, 150], [612, 110]], {"arrow-end": "classic-wide-long"});
  var line3 = av.g.polyline([[465, 220], [590, 220], [622, 125]], {"arrow-end": "classic-wide-long"});
  var line4 = av.g.polyline([[310, 120], [320, 450], [650, 450], [650, 130]], {"arrow-end": "classic-wide-long"});
  var line5 = av.g.polyline([[360, 218], [380, 390], [600, 390], [635, 130]], {"arrow-end": "classic-wide-long"});
  var line6 = av.g.polyline([[375, 65], [390, 20], [600, 20], [620, 80]], {"arrow-end": "classic-wide-long"});

  // labels  
  av.label("q", {left: 160, top: 75});
  av.label("s", {left: 168, top: 83});
  av.label("M", {left: 310, top: 25});
  av.label("q", {left: 633, top: 75});
  av.label("f", {left: 641, top: 83});
  av.label("λ , z'; zz'", {left: 200, top: 65});
  av.label("λ , z'; λ", {left: 520, top: 45});
  av.label("λ , z'; λ", {left: 520, top: 115});
  av.label("λ , z'; λ", {left: 520, top: 185});
  
  av.label("λ , z'; λ", {left: 500, top: 350});
  av.label("λ , z'; λ", {left: 480, top: 410});
  av.label("λ , z'; λ", {left: 480, top: 0 - 15});
  
  av.displayInit();
  av.recorded();
});