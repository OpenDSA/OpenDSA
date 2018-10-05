/*global ODSA */
"use strict";
$(document).ready(function () {
  var av_name = "PumpingLemmaCON";
  var av;
  
  var xoffset = -30;
  var yoffset = 0;
  var circRadius = 20;
  av = new JSAV(av_name);
  MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
  $(".avcontainer").on("jsav-message", function() {
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  });

  //Slide 1 
    av.umsg("Let $L$ be an infinite regular language, and then choose an arbitrary long string $w$, which $w$ in $L$.");   
    var g = av.ds.graph({directed: true});
    var q0 = g.addNode("q0", {left: xoffset, top: yoffset + 100});   
    var q1 = g.addNode("q1", {left: xoffset + 80, top: yoffset + 100});
    var e1 = g.addEdge(q0, q1);
    var qs = g.addNode("qs", {left: xoffset + 160, top: yoffset + 100});
    var e2 = g.addEdge(q1, qs);
    var qt = g.addNode("qt", {left: xoffset + 300, top: yoffset + 100});
    var e3 = g.addEdge(qs, qt);
    var qq = g.addNode(" ",{left: xoffset + 190, top: yoffset});
    var qq2 = g.addNode(" ",{left: xoffset + 280, top: yoffset});
    var e4 = g.addEdge(qq, qs);
    var e5 = g.addEdge(qq2, qq);
    var e6 = g.addEdge(qt, qq2);
    var qn = g.addNode("qn", {left: xoffset + 430, top: yoffset + 98});
    var label1 = av.label("$.......$", {"top": yoffset + 90, "left": xoffset + 340});
    var label2 = av.label("$.............$", {"top": yoffset + 90, "left": xoffset + 430});
    var label3 = av.label("$........$", {"top": yoffset + 60, "left": xoffset + 380}).addClass('rotated');
    var label4 = av.label("$........$", {"top": yoffset + 60, "left": xoffset + 525}).addClass('rotated2');
    var label5 = av.label("$........$", {"top": yoffset - 20, "left": xoffset + 450});
    var label5 = av.label("$..........$", {"top": yoffset + 90, "left": xoffset + 570});
    var label6 = av.label("$|----------------w---------------|$", {"top": yoffset + 170, "left": xoffset + 230});
    var e = g.addEdge(qt, qn);
    qn.addClass('final');
    g.layout();
    av.displayInit();

    //Slide 2
    av.umsg("There exist a constant $m > 0$ such that $|w| > m$. $w$ can be decomposed into three parts as $w = xyz$.")
    var labelxyz = av.label("$|------x------|-----y-----|------z----|$", {"top": yoffset + 140, "left": xoffset + 230});
    var labelyi = av.label("$y$", {"top": yoffset + 50, "left": xoffset + 475});
    av.step();

    //Slide 3
    
    label6.hide();
    av.umsg("There are 3 properties of w: ");
    av.umsg("1. $|xy| \\leq m$ ", {"preserve": true});
    av.umsg("2. $|y| \\geq 1$ ", {"preserve": true});
    av.umsg("3. $xy^iz \\in L$ for all $i \\geq 0$", {"preserve": true});
    var labelm = av.label("$|------------\\leq m----------|$", {"top": yoffset + 170, "left": xoffset + 230});
    av.step();
    av.recorded(); 
    
});

