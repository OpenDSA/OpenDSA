// Written by Irena Shaffer and Alexandru Cioaca
$(document).ready(function() {
  "use strict";
  var av_name = "ProductCON";
  var av = new JSAV(av_name);

  var color1 = "#cc709b";
  var color2 = "#b2a432";
  var color3 = "#b5f5ff";
  var color4 = "#fff5a6";
  var color5 = "#b28d9f";
  var color6 = "#74b0c2";
  var color7 = "#c3d36e";

  // Slide 1
  av.umsg("First, let's look at the details of how the standard process works. " +
          "The coefficients of polynomials A and B can be stored as vectors.");
  var Apoly = av.label("$a_0 + a_1x + a_2x^2 + a_3x^3$", {left: 200});
  var Bpoly = av.label("$b_0 + b_1x + b_2x^2 + b_3x^3$", {left: 500});
  var a1 = av.ds.matrix([["$a_0$", "$a_1$", "$a_2$", "$a_3$"]],
                        {left: 180, top: 50});
  var b1 = av.ds.matrix([["$b_0$", "$b_1$", "$b_2$", "$b_3$"]], {left: 480,
    top: 50});
  av.displayInit();

  // Slide 2
  av.umsg("The brute-force way to compute the coefficients of the product polynomial " +
          "is to compute the product of the vertical vector A and horizontal vector B.");
  a1.hide();
  b1.hide();
  Apoly.hide();
  Bpoly.hide();

  var yStart = 50;
  var mid = 90 + yStart;
  var ab = av.ds.matrix({rows: 4, columns: 4, left: 500, top: yStart});
  av.ds.matrix([["$a_0$"], ["$a_1$"], ["$a_2$"], ["$a_3$"]], {left: 150, top: yStart});
  av.ds.matrix([["$b_0$", "$b_1$", "$b_2$", "$b_3$"]], {left: 252, top: mid - 22});


  ab = av.ds.matrix({rows: 4, columns: 4, left: 500, top: 50});
  av.ds.matrix([["$a_0$"], ["$a_1$"], ["$a_2$"], ["$a_3$"]], {left: 150, top: 50});
  av.ds.matrix([["$b_0$", "$b_1$", "$b_2$", "$b_3$"]], {left: 252, top: 118});

  //Equals
  var ex = 456;
  av.g.line(ex, mid + 12, ex + 15, mid + 12, {"stroke-width": 4});
  av.g.line(ex, mid + 19, ex + 15, mid + 19, {"stroke-width": 4});
  //Multiplication
  var mx = 218;
  av.g.line(mx, mid + 10, mx + 10, mid + 20, {"stroke-width": 4});
  av.g.line(mx, mid + 20, mx + 10, mid + 10, {"stroke-width": 4});
  av.step();

  // Slide 3
  av.umsg("This means computing the product of each pair of coefficients. " +
    "This requires $n^2$ multiplication operations.");
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

  // Slide 4
  var xtext = 515;
  var ytext = 45;
  av.umsg("Then adding the terms to get the coefficients of polynomial C.");
  ab.css(0, 0, {"background-color": color1});
  av.g.line(xtext + 5, ytext, xtext + 5, ytext + 10, {"stroke-width": 3, stroke: color1});
  av.g.line(xtext + 11, ytext, xtext + 11, ytext + 10, {"stroke-width": 3, stroke: color1});
  av.label("$c_0$", {left: xtext});
  av.step();

  // Slide 5
  ab.css(0, 1, {"background-color": color2});
  ab.css(1, 0, {"background-color": color2});
  av.g.line(xtext + 5 + 45, ytext, xtext + 5 + 45, ytext + 10,
            {"stroke-width": 3, stroke: color2});
  av.g.line(xtext + 11 + 45, ytext, xtext + 11 + 45, ytext + 10,
            {"stroke-width": 3, stroke: color2});
  av.label("$c_1$", {left: xtext + 45});
  av.step();

  // Slide 6
  ab.css(0, 2, {"background-color": color3});//blue
  ab.css(1, 1, {"background-color": color3});
  ab.css(2, 0, {"background-color": color3});
  av.g.line(xtext + 5 + 2 * 45, ytext, xtext + 5 + 2 * 45, ytext + 10,
            {"stroke-width": 3, stroke: "#82b0b8"});
  av.g.line(xtext + 11 + 2 * 45, ytext, xtext + 11 + 2 * 45, ytext + 10,
            {"stroke-width": 3, stroke: "#82b0b8"});
  av.label("$c_2$", {left: xtext + 2 * 45});
  ab.css(0, 3, {"background-color": color4});//purple
  ab.css(1, 2, {"background-color": color4});
  ab.css(2, 1, {"background-color": color4});
  ab.css(3, 0, {"background-color": color4});
  av.g.line(xtext + 5 + 3 * 45, ytext, xtext + 5 + 3 * 45, ytext + 10,
            {"stroke-width": 3, stroke: "#ded557"});
  av.g.line(xtext + 11 + 3 * 45, ytext, xtext + 11 + 3 * 45, ytext + 10,
            {"stroke-width": 3, stroke: "#ded557"});
  av.label("$c_3$", {left: xtext + 3 * 45});
  av.step();

  // Slide 7
  ab.css(1, 3, {"background-color": color5});
  ab.css(2, 2, {"background-color": color5});
  ab.css(3, 1, {"background-color": color5});
  av.g.line(xtext + 180, ytext + 85, xtext + 190, ytext + 85,
            {"stroke-width": 3, stroke: color5});
  av.g.line(xtext + 180, ytext + 85 + 6, xtext + 190, ytext + 85 + 6,
            {"stroke-width": 3, stroke: color5});
  av.label("$c_4$", {left: 720, top: 107});
  ab.css(2, 3, {"background-color": color6});
  ab.css(3, 2, {"background-color": color6});
  av.g.line(xtext + 180, ytext + 85 + 45, xtext + 190, ytext + 85 + 45,
            {"stroke-width": 3, stroke: color6});
  av.g.line(xtext + 180, ytext + 85 + 45 + 6, xtext + 190, ytext + 85  + 45 + 6,
            {"stroke-width": 3, stroke: color6});
  av.label("$c_5$", {left: 720, top: 152});
  ab.css(3, 3, {"background-color": color7});
  av.g.line(xtext + 180, ytext + 85 + 45 * 2, xtext + 190, ytext + 85 + 45 * 2, {"stroke-width": 3, stroke: color7});
  av.g.line(xtext + 180, ytext + 85 + 2 * 45 + 6, xtext + 190, ytext + 85  + 2 * 45 + 6,
            {"stroke-width": 3, stroke: color7});
  av.label("$c_6$", {left: 720, top: 197});
  av.label("$(a_0 + a_1x + a_2x^2 + a_3x^3)*(b_0 + b_1x + b_2x^2 + b_3x^3) = c_0 + c_1x + c_2x^2 + c_3x^3 + c_4x^4 + c_5x^5 + c_6x^6$",
           {left: 130, top: 255});
  av.step();

  // Slide 8
  av.umsg("Done this way, multiplying two $n−1$ -degree polynomials A and B takes " +
          "$\\Omega (n^2)$ coefficient multiplications.");
  av.recorded();
});
