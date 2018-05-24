$(document).ready(function() {
  "use strict";
  var av_name = "ProductCON";

  var av = new JSAV(av_name);
  
  // Slide #1
  av.umsg("The coefficients of the product polynomial can be computed from the"
    + "following outer-product.");

  var ab = av.ds.matrix({rows: 4, columns: 4, left: 500, top: 50});
  var a  = av.ds.matrix([["$a_0$"], ["$a_1$"], ["$a_2$"], ["$a_3$"]],
   {left: 100, top: 50});
  var b = av.ds.matrix([["$b_0$", "$b_1$", "$b_2$", "$b_3$"]], {left: 220, 
    top: 125});

  av.g.line(450, 163, 465, 163, {"stroke-width": 4});
  av.g.line(450, 170, 465, 170, {"stroke-width": 4});

  av.g.line(180, 160, 190, 170, {"stroke-width": 4});
  av.g.line(180, 170, 190, 160, {"stroke-width": 4});
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
  av.umsg("And then adding the terms.");
  ab.css(0, 0, {"background-color": "#FF5050"});
  av.g.line(522, 45, 522, 55, {"stroke-width": 3, stroke: "red"});
  av.g.line(528, 45, 528, 55, {"stroke-width": 3, stroke: "red"});
  av.label("$C_0$", {left: 518});

  av.step();

  av.umsg("And then adding the terms.");
  ab.css(0, 1, {"background-color": "yellow"})
   ab.css(1, 0, {"background-color": "yellow"})
  av.g.line(572, 45, 572, 55, {"stroke-width": 3, stroke: "yellow"});
  av.g.line(578, 45, 578, 55, {"stroke-width": 3, stroke: "yellow"});
  av.label("$C_1$", {left: 568});

  av.step();

  // Slide 4
  av.umsg("And then adding the terms.");

  ab.css(0, 2, {"background-color": "#4696FF"})//blue
  ab.css(1, 1, {"background-color": "#4696FF"})
  ab.css(2, 0, {"background-color": "#4696FF"})
  av.g.line(622, 45, 622, 55, {"stroke-width": 3, stroke: "#4696FF"});
  av.g.line(628, 45, 628, 55, {"stroke-width": 3, stroke: "#4696FF"});
  av.label("$C_2$", {left: 618});

  ab.css(0, 3, {"background-color": "#BE64FF"})//purple
  ab.css(1, 2, {"background-color": "#BE64FF"})
  ab.css(2, 1, {"background-color": "#BE64FF"})
  ab.css(3, 0, {"background-color": "#BE64FF"})
  av.g.line(672, 45, 672, 55, {"stroke-width": 3, stroke: "#BE64FF"});
  av.g.line(678, 45, 678, 55, {"stroke-width": 3, stroke: "#BE64FF"});
  av.label("$C_3$", {left: 668});
  
  av.step();

  // Slide 5
  av.umsg("And then adding the terms.");

  ab.css(1, 3, {"background-color": "#32F078"})//green
  ab.css(2, 2, {"background-color": "#32F078"})
  ab.css(3, 1, {"background-color": "#32F078"})
  av.g.line(710, 138, 720, 138, {"stroke-width": 3, stroke: "#32F078"});
  av.g.line(710, 144, 720, 144, {"stroke-width": 3, stroke: "#32F078"});
  av.label("$C_4$", {left: 735, top: 120});

  ab.css(2, 3, {"background-color": "#FF78B4"})//pink
  ab.css(3, 2, {"background-color": "#FF78B4"})
  av.g.line(710, 188, 720, 188, {"stroke-width": 3, stroke: "#FF78B4"});
  av.g.line(710, 194, 720, 194, {"stroke-width": 3, stroke: "#FF78B4"});
  av.label("$C_5$", {left: 735, top: 170});

  ab.css(3, 3, {"background-color": "#C8C8C8"})
  av.g.line(710, 238, 720, 238, {"stroke-width": 3, stroke: "grey"});
  av.g.line(710, 244, 720, 244, {"stroke-width": 3, stroke: "grey"});
  av.label("$C_6$", {left: 735, top: 220});



  av.recorded();
});
