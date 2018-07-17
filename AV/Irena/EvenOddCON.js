// Written by Irena Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "EvenOddCON";

  var av = new JSAV(av_name);

  // Slide #1
  av.umsg("When evaluating the pair of values c and -c, we get:");

  var spacing = 30;
  var top = 0;
  av.label("$E_a(-c) = E_a(c)$", {left: 357, top: top});
  av.label("and", {left: 395, top: top + spacing});
  av.label("$O_a(-c) = -O_a(c)$", {left: 353, top: top + spacing * 2});

  av.displayInit();

  av.umsg("Examples:");

  top = 120;

  var label1 = av.label("$2x^4 + 5x^2 + 1$ only contains even powers.", {left: 100, top: top});
  var label2 = av.label("Evaluate at 1 and -1:", {left: 100, top: top + spacing});
  var label3 = av.label("$2(1)^4 + 5(1)^2 + 1 = 8$", {left: 100, top: top + spacing * 2.5});
  var label4 = av.label("$2(-1)^4 + 5(-1)^2 + 1 = 8$", {left: 100, top: top + spacing * 3.5});

  av.step();
  var label5 = av.label("$3x^3 + x$ only contains odd powers.", {left: 500, top: top});
  var label6 = av.label("Evaluate at 2 and -2", {left: 500, top: top + spacing});
  var label7 = av.label("$3(2)^3 + (2) = 26$", {left: 500, top: top + spacing * 2.5});
  var label8 = av.label("$3(-2)^3 + (-2) = -26$", {left: 500, top: top + spacing * 3.5});

  av.step();

  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  label5.hide();
  label6.hide();
  label7.hide();
  label8.hide();

  av.umsg("For the full polynomial we get:");
  top = 150;
  av.label("$P_a(c) = E_a(c) + O_a(c)$", {left: 150, top: top});
  av.label("$P_a(-c) = E_a(-c) + O_a(-c)$", {left: 150, top: top + spacing});

  av.step();

  av.umsg("By applying the rules for even and odd powers, the polynomials simplify to:");
  av.label("$P_a(c) = E_a(c) + O_a(c)$", {left: 500, top: top});
  av.label("$P_a(-c) = E_a(-c) - O_a(c)$", {left: 500, top: top + spacing});

  av.g.line(370, top + spacing * 1.5, 450, top + spacing * 1.5, {"stroke-width": 5});
  av.g.line(448, top + spacing * 1.5, 435, top + spacing * 1.5 + 10, {"stroke-width": 5});
  av.g.line(448, top + spacing * 1.5, 435, top + spacing * 1.5 - 10, {"stroke-width": 5});
  av.g.rect(490, top + 8, 180, spacing * 2.3);

  av.step();
  av.umsg("Thus, we only need to compute the even and odd evaluations once to get the polynomial evaluation of c and -c.");

  av.recorded();
});
