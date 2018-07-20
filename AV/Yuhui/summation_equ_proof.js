$(document).ready(function() {
  "use strict";
  var av_name = "summation_equ_proof";
  var av = new JSAV(av_name);
  var xoffset = 50;
  var yoffset = 30;
  var circRadius = 10;
  MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
  $(".avcontainer").on("jsav-message", function() {
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  });
  //Slide 1
  av.umsg("Proof of Equation 5:");
  av.umsg("<br> Assume that $a \\neq 1$, and let the sum of the first $n + 1$ items a geometric series equal to $s$, which means:", {"preserve": true});
  av.umsg("<br> $s = 1 + a + a^2 + ... + a^n$", {"preserve": true});

  av.displayInit();
  //Slide 2
  av.umsg("Proof of Equation 5:");
  av.umsg("<br> Multiply $a$ on the both sides of the equation, we get:", {"preserve": true});
  av.umsg("<br> $s = 1 + a + a^2 + ... + a^n$", {"preserve": true});
  av.umsg("<br> $as = a + a^2 + a^3 + ... + a^{n + 1}$", {"preserve": true});
  av.step();
  //Slide 3
  av.umsg("Proof of Equation 5:");
  av.umsg("<br> Subtract the second equation from the first equation, there are only two elements left, which is $1$ and $a^{n + 1}$", {"preserve": true});
  av.umsg("<br> $s = 1 + a + a^2 + ... + a^n$", {"preserve": true});
  av.umsg("<br> $as = a + a^2 + a^3 + ... + a^{n + 1}$", {"preserve": true});
  av.umsg("<br> $s - as = 1 - a^{n + 1}$", {"preserve": true});
  var lab1 = av.label("$s \\;\\;=\\;\\; 1 \\;\\; +\\;\\; a \\;\\;+\\;\\; a^2\\;\\; + \\;\\;\\;..........\\;\\;+\\;\\; a^n$", {"top": yoffset, "left": xoffset + 90});
  var lab2 = av.label("$as \\;\\;=\\;\\; a \\;\\; +\\;\\; a^2 \\,\\,+\\:\\, a^3\\;\\; + \\;\\;.....\\;+\\;\\;a^n \\;+\\;\\; a^{n + 1}$", {"top": yoffset + 40, "left": xoffset + 82});
  var c1 = av.g.circle(xoffset + 178, yoffset + 28, circRadius);
  var c2 = av.g.circle(xoffset + 223, yoffset + 28, circRadius);
  var c3 = av.g.circle(xoffset + 353, yoffset + 28, circRadius);
  var c4 = av.g.circle(xoffset + 178, yoffset + 68, circRadius);
  var c5 = av.g.circle(xoffset + 223, yoffset + 68, circRadius);
  var c6 = av.g.circle(xoffset + 136, yoffset + 68, circRadius);
  var c7 = av.g.circle(xoffset + 315, yoffset + 68, circRadius);
  var l1 = av.g.line(xoffset + 178, yoffset + 36, xoffset + 136, yoffset + 58);
  var l2 = av.g.line(xoffset + 223, yoffset + 36, xoffset + 178, yoffset + 58);
  var l3 = av.g.line(xoffset + 265, yoffset + 36, xoffset + 223, yoffset + 58);
  var l4 = av.g.line(xoffset + 353, yoffset + 36, xoffset + 315, yoffset + 58);
  av.step();
  //Slide 4
  av.umsg("Proof of Equation 5:");
  av.umsg("<br> Subtract the second equation from the first equation, we get:", {"preserve": true});
  av.umsg("<br> $s = 1 + a + a^2 + ... + a^n$", {"preserve": true});
  av.umsg("<br> $as = a + a^2 + a^3 + ... + a^{n + 1}$", {"preserve": true});
  av.umsg("<br> $s - as = 1 - a^{n + 1}$", {"preserve": true});
  av.umsg("<br> $s(1 - a) = 1 - a^{n + 1}$", {"preserve": true});
  av.step();
  //Slide 5
  av.umsg("Proof of Equation 5:");
  av.umsg("<br> Now we get the final result:", {"preserve": true});
  av.umsg("<br> $s = 1 + a + a^2 + ... + a^n$", {"preserve": true});
  av.umsg("<br> $as = a + a^2 + a^3 + ... + a^{n + 1}$", {"preserve": true});
  av.umsg("<br> $s - as = 1 - a^{n + 1}$", {"preserve": true});
  av.umsg("<br> $s(1 - a) = 1 - a^{n + 1}$", {"preserve": true});
  av.umsg("<br> $s = \\frac{1 - a^{n + 1}}{(1 - a)}$", {"preserve": true});
  av.recorded();
});
