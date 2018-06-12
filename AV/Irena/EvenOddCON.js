$(document).ready(function() {
  "use strict";
  var av_name = "EvenOddCON";

  var av = new JSAV(av_name);
  
  // Slide #1
  av.umsg("When evaluating the pair of values c and -c, we get:");

  var even = av.label("$E_a(-c) = E_a(c)$", {left: 357, top: 0});
  var and  = av.label("and", {left: 395, top: 30});
  var odd = av.label("$O_a(-c) = -O_a(c)$", {left: 353, top: 60});

  av.displayInit();

  av.umsg("Examples:");

  var label1 = av.label("$2x^4 + 5x^2 + 1$ is an even polynomial.", {left: 100, top: 150});
  var label2 = av.label("Evaluate at 1 and -1:", {left: 100, top: 190});
  var label3 = av.label("$2(1)^4 + 5(1)^2 + 1 = 8$", {left: 100, top: 250});
  var label4 = av.label("$2(-1)^4 + 5(-1)^2 + 1 = 8$", {left: 100, top: 300});

  av.step();
  var label5 = av.label("$3x^3 + x$ is an odd polynomial.", {left: 500, top: 150});
  var label6 = av.label("Evaluate at 2 and -2", {left: 500, top: 190});
  var label7 = av.label("$3(2)^3 + (2) = 26$", {left: 500, top: 250});
  var label8 = av.label("$3(-2)^3 + (-2) = -26$", {left: 500, top: 300});

  av.step();

  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  label5.hide();
  label6.hide();
  label7.hide();
  label8.hide();

  av.umsg("");
  av.label("Therefore: ", {left: 375, top: 150})
  av.label("$P_a(c) = E_a(c) + O_a(c)$", {left: 342, top: 200});
  av.label("$P_a(-c) = E_a(c) - O_a(c)$", {left: 337, top: 230});
  av.g.rect(325, 200, 173, 80);

  av.step();
  av.umsg("Thus, we only need to compute the even and odd evaluations once to get the polynomial evaluation of c and -c.");

  av.recorded();
});
