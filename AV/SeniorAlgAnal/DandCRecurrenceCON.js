/*global ODSA,MathJax */
// Written by Yuhui Lyu and Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "DandCRecurrenceCON";
  var av;
  var circRadius = 13;
  var xoffset = 50;
  var yoffset = 80;
  av = new JSAV(av_name);
  MathJax.Hub.Config({tex2jax: {inlineMath: [["$", "$"], ["\\(", "\\)"]]}});
  $(".avcontainer").on("jsav-message", function() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  });

  // Slide 1
  av.umsg("For a problem of size $n$, we have $cn^k$ units of work plus the amount of work required for $a$ subproblems of size $n/b$ each.");
  av.umsg("<br> $T(n) = aT(n/b) + cn^k$", {preserve: true});
  av.label("<b><u>Amount of Work</u></b>", {top: yoffset - 60, left: xoffset + 450});
  av.label("<b><u>Number of nodes</u></b>", {top: yoffset - 60, left: xoffset + 600});
  av.label("$1$", {top: yoffset - 27, left: xoffset + 650});
  av.label("---------------------------------------------", {top: yoffset - 25, left: xoffset + 260});
  av.label("$cn^k$", {top: yoffset - 27, left: xoffset + 500});
  av.label("$a$",  {top: yoffset - 10, left: xoffset + 150});
  av.label("....", {top: yoffset + 40, left: xoffset + 140});
  av.label("....", {top: yoffset + 40, left: xoffset + 240});
  av.g.circle(xoffset + 200, yoffset, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 100, yoffset + 69, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 200, yoffset + 69, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 300, yoffset + 69, circRadius, {"stroke-width": "2"});
  av.label("$n$", {top: yoffset - 27, left: xoffset + 197});
  av.label("$n/b$", {top: yoffset + 42, left: xoffset + 89});
  av.label("$n/b$", {top: yoffset + 42, left: xoffset + 189});
  av.label("$n/b$", {top: yoffset + 42, left: xoffset + 289});
  av.g.line(xoffset + 200, yoffset + 14, xoffset + 100, yoffset + 55, {"stroke-width": "2"});
  av.g.line(xoffset + 200, yoffset + 14, xoffset + 200, yoffset + 55, {"stroke-width": "2"});
  av.g.line(xoffset + 200, yoffset + 14, xoffset + 300, yoffset + 55, {"stroke-width": "2"});
  av.displayInit();

  // Slide 2
  av.umsg("For each problem of size $n/b$, we have $c(\\frac{n}{b})^k$ units of work for a total of $\\frac{acn^k}{b^k}$ units plus the amount of work required for $a$ subproblems of size $n/b^2$ each.");
  av.umsg("<br> $T(n) = a(aT(n/b^2) + c(\\frac{n}{b})^k) + cn^k$", {preserve: true});
  av.g.line(xoffset + 100, yoffset + 83, xoffset + 100, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 100, yoffset + 83, xoffset + 60, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 100, yoffset + 83, xoffset + 140, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 200, yoffset + 83, xoffset + 200, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 200, yoffset + 83, xoffset + 160, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 200, yoffset + 83, xoffset + 240, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 300, yoffset + 83, xoffset + 300, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 300, yoffset + 83, xoffset + 260, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 300, yoffset + 83, xoffset + 340, yoffset + 125, {"stroke-width": "2"});
  av.label("--------------------------", {top: yoffset + 45, left: xoffset + 350});
  av.label("$\\frac{acn^k}{b^k}$", {top: yoffset + 45, left: xoffset + 500});
  av.label("$a$", {top: yoffset + 45, left: xoffset + 650});
  av.label("$a$", {top: yoffset + 70, left: xoffset + 70});
  av.label("$a$", {top: yoffset + 70, left: xoffset + 170});
  av.label("$a$", {top: yoffset + 70, left: xoffset + 270});
  av.label(".............", {top: yoffset + 140, left: xoffset + 175});
  av.step();

  // Slide 3
  av.umsg("This pattern will continue until we reach a problem of size $1$, where we have $a^m$ subproblems each of which requires $c$ units of work for a total of $a^mc$ units.");
  av.umsg("<br> $T(n) = a^m T(1) + a^{m-1}c(n/b^{m-1})^k + \\cdots + ac(n/b)^k + cn^k$", {preserve: true});
  av.g.circle(xoffset + 20, yoffset + 220, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 110, yoffset + 220, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 200, yoffset + 220, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 290, yoffset + 220, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 380, yoffset + 220, circRadius, {"stroke-width": "2"});
  av.label("-----------------", {top: yoffset + 190, left: xoffset + 400});
  av.label("$a^mc$", {top: yoffset + 190, left: xoffset + 500});
  av.label("$1$", {top: yoffset + 195, left: xoffset + 18});
  av.label("$1$", {top: yoffset + 195, left: xoffset + 108});
  av.label("$1$", {top: yoffset + 195, left: xoffset + 198});
  av.label("$1$", {top: yoffset + 195, left: xoffset + 288});
  av.label("$1$", {top: yoffset + 195, left: xoffset + 378});
  av.label("$a^{m}$", {top: yoffset + 190, left: xoffset + 650});
  av.step();

  // Slide 4
  av.umsg("We end up having $\\log_{b}{n} + 1$ levels with the amount of work at the last level is  $a^mc$.");
  av.label("|---------------- $\\log_{b}{n + 1}$ --------------|", {top: yoffset + 80, left: xoffset - 120}).addClass("rotated");
  av.step();
  av.recorded();
});
