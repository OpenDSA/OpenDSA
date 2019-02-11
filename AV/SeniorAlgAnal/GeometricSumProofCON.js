$(document).ready(function() {
  "use strict";
  var av_name = "GeometricSumProofCON";
  var av = new JSAV(av_name);
  var xoffset = 50;
  var yoffset = 20;
  var circRadius = 10;
  MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
  $(".avcontainer").on("jsav-message", function() {
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  });

  // Slide 1
  av.umsg("Proof of sum of a geometric series:");
  av.umsg("<br> Assume that $a \\neq 1$, and let the sum of the first $n + 1$ items a geometric series equal to $s$, which means:", {"preserve": true});
  av.umsg("<br> $s = 1 + a + a^2 + ... + a^n$", {"preserve": true});
  av.displayInit();

  // Slide 2
  av.umsg("Multiply $a$ on the both sides of the equation, we get:");
  av.umsg("<br> $s = 1 + a + a^2 + ... + a^n$", {"preserve": true});
  av.umsg("<br> $as = a + a^2 + a^3 + ... + a^{n + 1}$", {"preserve": true});
  av.step();

  // Slide 3
  av.umsg("Subtract the second equation from the first equation, there are only two elements left, which is $1$ and $a^{n + 1}$");
  av.umsg("<br> $s = 1 + a + a^2 + ... + a^n$", {"preserve": true});
  av.umsg("<br> $as = a + a^2 + a^3 + ... + a^{n + 1}$", {"preserve": true});
  av.umsg("<br> $s - as = 1 - a^{n + 1}$", {"preserve": true});
  var g = av.ds.graph();
  var a1 = g.addNode("$a$", {left: xoffset - 43, top: yoffset - 25}); 
  var a2 = g.addNode("$a^2$", {left: xoffset + 28, top: yoffset - 25}); 
  var an = g.addNode("$a^n$", {left: xoffset + 145, top: yoffset - 25}); 
  var a_1 = g.addNode("$a$", {left: xoffset - 110, top: yoffset + 45}); 
  var a_2 = g.addNode("$a^2$", {left: xoffset - 43, top: yoffset + 45}); 
  var a_n = g.addNode("$a^n$", {left: xoffset + 75, top: yoffset + 45});  
  var l1 = av.g.line(xoffset + 171, yoffset + 22, xoffset + 105, yoffset + 61, {"stroke-width": 1.5});
  var l2 = av.g.line(xoffset + 242, yoffset + 22, xoffset + 171, yoffset + 61, {"stroke-width": 1.5});
  var l3 = av.g.line(xoffset + 360, yoffset + 22, xoffset + 290, yoffset + 61, {"stroke-width": 1.5});
  g.layout();
  var lab1 = av.label("$s \\;\\;=\\;\\;\\;\\; 1 \\;\\;\\;\\;\\; +$", {"top": yoffset - 20, "left": xoffset + 50});
  var lab2 = av.label("$as \\;\\;=$", {"top": yoffset + 50, "left": xoffset + 42});
  var lab3 = av.label("$+$", {"top": yoffset - 20, "left": xoffset + 205});
  var lab4 = av.label("$+ \\;.....\\;+$", {"top": yoffset - 20, "left": xoffset + 275});
  var lab5 = av.label("$+$", {"top": yoffset + 50, "left": xoffset + 133});
  var lab6 = av.label("$+ \\;.....\\;+$", {"top": yoffset + 50, "left": xoffset + 205});
  var lab7 = av.label("$+\\;\\;\\; a^{n + 1}$", {"top": yoffset + 50, "left": xoffset + 322});
  // var c1 = av.g.circle(xoffset + 178, yoffset + 7, circRadius);
  // var c2 = av.g.circle(xoffset + 222, yoffset + 7, circRadius);
  // var c3 = av.g.circle(xoffset + 354, yoffset + 7, circRadius);
  // var c4 = av.g.circle(xoffset + 136, yoffset + 47, circRadius);
  // var c5 = av.g.circle(xoffset + 179, yoffset + 47, circRadius);
  // var c6 = av.g.circle(xoffset + 221, yoffset + 47, circRadius);
  // var c7 = av.g.circle(xoffset + 315, yoffset + 47, circRadius);
  // var l1 = av.g.line(xoffset + 178, yoffset + 17, xoffset + 136, yoffset + 37);
  // var l2 = av.g.line(xoffset + 222, yoffset + 17, xoffset + 178, yoffset + 37);
  // var l3 = av.g.line(xoffset + 265, yoffset + 17, xoffset + 222, yoffset + 37);
  // var l4 = av.g.line(xoffset + 354, yoffset + 17, xoffset + 315, yoffset + 37);
  av.step();

  // Slide 4
  av.umsg("$s(1 - a) = 1 - a^{n + 1}$");
  av.step();

  // Slide 5
  av.umsg("Now we get the final result:");
  av.umsg("<br> $s = \\frac{1 - a^{n + 1}}{(1 - a)}$", {"preserve": true});
  av.recorded();
});
