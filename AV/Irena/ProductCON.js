$(document).ready(function() {
  "use strict";
  var av_name = "ProductCON";

  var av = new JSAV(av_name);
  
  // Slide #1
  av.umsg("The coefficients of the product polynomial can be computed from the"
    + "following outer-product.");

  var ab = av.ds.matrix({rows: 4, columns: 4, left: 500, top: 50});
  var a  = av.ds.matrix([["$a_0$"], ["$a_1$"], ["$a_2$"], ["$a_3$"]],
   {left: 150, top: 50});
  var b = av.ds.matrix([["$b_0$", "$b_1$", "$b_2$", "$b_3$"]], {left: 252, 
    top: 118});

  //Equals
  var ex = 456;
  var ey = 152;
  av.g.line(ex, ey, ex + 15, ey, {"stroke-width": 4});
  av.g.line(ex, ey + 7, ex + 15, ey + 7, {"stroke-width": 4});
  //Multiplication
  var mx = 218;
  var my = 152;
  av.g.line(mx, my, mx + 10, my + 10, {"stroke-width": 4});
  av.g.line(mx, my + 10, mx + 10, my, {"stroke-width": 4});
  av.displayInit();


  // Slide #2
  av.umsg("This means computing the product of each pair of coefficients.");

  ab.value(0, 0, "$a_0$*$b_0$");
  ab.value(0, 1, "$a_0$*$b_1$");
  ab.value(0, 2, "$a_0$*$b_2$");
  ab.value(0, 3, "$a_0$*$b_3$");
  ab.value(1, 0, "$a_1$*$b_0$");
  ab.value(1, 1, "$a_1$*$b_1$");
  ab.value(1, 2, "$a_1$*$b_2$");
  ab.value(1, 3, "$a_1$*$b_3$");
  ab.value(2, 0, "$a_2$*$b_0$");
  ab.value(2, 1, "$a_2$*$b_2$");
  ab.value(2, 2, "$a_2$*$b_2$");
  ab.value(2, 3, "$a_2$*$b_3$");
  ab.value(3, 0, "$a_3$*$b_0$");
  ab.value(3, 1, "$a_3$*$b_1$");
  ab.value(3, 2, "$a_3$*$b_2$");
  ab.value(3, 3, "$a_3$*$b_3$");

  av.step();

  // Slide #3
  var xtext = 515;
  var ytext = 45;
  av.umsg("And then adding the terms.");
  ab.css(0, 0, {"background-color": "#FF5050"});
  av.g.line(xtext + 5, ytext, xtext + 5, ytext + 10, {"stroke-width": 3, stroke: "red"});
  av.g.line(xtext + 11, ytext, xtext + 11, ytext + 10, {"stroke-width": 3, stroke: "red"});
  av.label("$C_0$", {left: xtext});

  av.step();

  av.umsg("And then adding the terms.");
  ab.css(0, 1, {"background-color": "yellow"})
  ab.css(1, 0, {"background-color": "yellow"})
  av.g.line(xtext + 5 + 45, ytext, xtext + 5 + 45, ytext + 10, 
    {"stroke-width": 3, stroke: "yellow"});
  av.g.line(xtext + 11 + 45, ytext, xtext + 11 + 45, ytext + 10, 
    {"stroke-width": 3, stroke: "yellow"});
  av.label("$C_1$", {left: xtext + 45});

  av.step();

  // Slide 4
  av.umsg("And then adding the terms.");

  ab.css(0, 2, {"background-color": "#4696FF"})//blue
  ab.css(1, 1, {"background-color": "#4696FF"})
  ab.css(2, 0, {"background-color": "#4696FF"})
  av.g.line(xtext + 5 + 2*45, ytext, xtext + 5 + 2*45, ytext + 10, 
    {"stroke-width": 3, stroke: "#4696FF"});
  av.g.line(xtext + 11 + 2*45, ytext, xtext + 11 + 2*45, ytext + 10, 
    {"stroke-width": 3, stroke: "#4696FF"});
  av.label("$C_2$", {left: xtext + 2*45});

  ab.css(0, 3, {"background-color": "#BE64FF"})//purple
  ab.css(1, 2, {"background-color": "#BE64FF"})
  ab.css(2, 1, {"background-color": "#BE64FF"})
  ab.css(3, 0, {"background-color": "#BE64FF"})
  av.g.line(xtext + 5 + 3*45, ytext, xtext + 5 + 3*45, ytext + 10, 
    {"stroke-width": 3, stroke: "#BE64FF"});
  av.g.line(xtext + 11 + 3*45, ytext, xtext + 11 + 3*45, ytext + 10, 
    {"stroke-width": 3, stroke: "#BE64FF"});
  av.label("$C_3$", {left: xtext + 3*45});
  
  av.step();

  // Slide 5
  av.umsg("And then adding the terms.");

  ab.css(1, 3, {"background-color": "#32F078"})//green
  ab.css(2, 2, {"background-color": "#32F078"})
  ab.css(3, 1, {"background-color": "#32F078"})
  av.g.line(xtext + 180, ytext + 85, xtext + 190, ytext + 85, 
    {"stroke-width": 3, stroke: "#32F078"});
  av.g.line(xtext + 180, ytext + 85 + 6, xtext + 190, ytext + 85 + 6, 
    {"stroke-width": 3, stroke: "#32F078"});
  av.label("$C_4$", {left: 720, top: 107});

  ab.css(2, 3, {"background-color": "#FF78B4"})//pink
  ab.css(3, 2, {"background-color": "#FF78B4"})
  av.g.line(xtext + 180, ytext + 85 + 45, xtext + 190, ytext + 85 + 45, 
    {"stroke-width": 3, stroke: "#FF78B4"});
  av.g.line(xtext + 180, ytext + 85 + 45 + 6, xtext + 190, ytext + 85  + 45 + 6, 
    {"stroke-width": 3, stroke: "#FF78B4"});
  av.label("$C_5$", {left: 720, top: 152});

  ab.css(3, 3, {"background-color": "#C8C8C8"})
  av.g.line(xtext + 180, ytext + 85 + 45*2, xtext + 190, ytext + 85 + 45*2, {"stroke-width": 3, stroke: "grey"});
  av.g.line(xtext + 180, ytext + 85 + 2*45 + 6, xtext + 190, ytext + 85  + 2*45 + 6, 
    {"stroke-width": 3, stroke: "grey"});
  av.label("$C_6$", {left: 720, top: 197});



  av.recorded();
});
