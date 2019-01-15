// Written by Irena Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "EvenOddCON";
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg("When evaluating the pair of values c and -c, we get:");
  var spacing = 30;
  var Y = 0;
  av.label("$E_a(-c) = E_a(c)$", {left: 357, top: Y});
  av.label("and", {left: 395, top: Y + spacing});
  av.label("$O_a(-c) = -O_a(c)$", {left: 353, top: Y + spacing * 2});
  av.displayInit();

  // Slide 2
  av.umsg("Examples:");
  Y = 120;
  var label1 = av.label("$2x^4 + 5x^2 + 1$ only contains even powers.", {left: 100, top: Y});
  var label2 = av.label("Evaluate at 1 and -1:", {left: 100, top: Y + spacing});
  var label3 = av.label("$2(1)^4 + 5(1)^2 + 1 = 8$", {left: 100, top: Y + spacing * 2.5});
  var label4 = av.label("$2(-1)^4 + 5(-1)^2 + 1 = 8$", {left: 100, top: Y + spacing * 3.5});
  av.step();

  // Slide 3
  var label5 = av.label("$3x^3 + x$ only contains odd powers.", {left: 500, top: Y});
  var label6 = av.label("Evaluate at 2 and -2", {left: 500, top: Y + spacing});
  var label7 = av.label("$3(2)^3 + (2) = 26$", {left: 500, top: Y + spacing * 2.5});
  var label8 = av.label("$3(-2)^3 + (-2) = -26$", {left: 500, top: Y + spacing * 3.5});
  av.step();

  // Slide 4
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  label5.hide();
  label6.hide();
  label7.hide();
  label8.hide();
  av.umsg("For the full polynomial we get:");
  Y = 150;
  av.label("$P_a(c) = E_a(c) + O_a(c)$", {left: 150, top: Y});
  av.label("$P_a(-c) = E_a(-c) + O_a(-c)$", {left: 150, top: Y + spacing});
  av.step();

  // Slide 5
  av.umsg("By applying the rules for even and odd powers, the polynomials simplify to:");
  av.label("$P_a(c) = E_a(c) + O_a(c)$", {left: 500, top: Y});
  av.label("$P_a(-c) = E_a(-c) - O_a(c)$", {left: 500, top: Y + spacing});
  av.g.line(370, Y + spacing * 1.5, 450, Y + spacing * 1.5, {"stroke-width": 5});
  av.g.line(448, Y + spacing * 1.5, 435, Y + spacing * 1.5 + 10, {"stroke-width": 5});
  av.g.line(448, Y + spacing * 1.5, 435, Y + spacing * 1.5 - 10, {"stroke-width": 5});
  av.g.rect(490, Y + 8, 180, spacing * 2.3);
  av.step();

  // Slide 5
  av.umsg("Thus, we only need to compute the even and odd evaluations once to get the polynomial evaluation of c and -c.");
  av.recorded();
});
