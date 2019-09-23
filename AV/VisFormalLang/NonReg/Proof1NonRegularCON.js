/*global ODSA */
"use strict";
$(document).ready(function () {
  var av_name = "Proof1NonRegularCON";
  var av;
  
  var xoffset = -30;
  var yoffset = 0;
  var circRadius = 20;
  av = new JSAV(av_name);
  MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
  $(".avcontainer").on("jsav-message", function() {
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  });

  // Slide 1
  av.umsg("Suppose that $L_2$ is regular");
  av.displayInit();

  // Slide 2 
  av.umsg("If $L_2$ is regular then there exists a DFA $M$ that recognizes $L_2$.");
  var g = av.ds.graph({directed: true});
  
  var q0 = g.addNode("q0", {left: xoffset, top: yoffset + 100});   
  var q1 = g.addNode("q1", {left: xoffset + 80, top: yoffset + 100});
  var e1 = g.addEdge(q0, q1);
  var arrow1 = av.g.line(307, 130, 408, 130, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow2 = av.g.line(510, 130, 625, 130, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow3 = av.g.line(150, 130, 195, 130, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var qn = g.addNode("qn", {left: xoffset + 430, top: yoffset + 98});
  qn.addClass('final');
  var label = av.label("$.............$", {"top": yoffset + 100, "left": xoffset + 450});
  var labelM = av.label("$M$", {"top": yoffset, "left": xoffset + 450});
  g.layout();
  av.step();

  // Slide 3
  av.umsg("$M$ has a finite number of states, say $k$ states.");
  var labelK = av.label("$k$", {"top": yoffset + 73, "left": xoffset + 450});
  var arrowK1 = av.g.line(xoffset + 440, yoffset + 100, xoffset + 240, yoffset + 100, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrowK2 = av.g.line(xoffset + 470, yoffset + 100, xoffset + 670, yoffset + 100, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.step();

  // Slide 4
  av.umsg("Consider a long string $a^kb^k \\in L_2$. The key point is that this string has more characters than there are states in the machine.");
  var arrValues = ["a", "a", "...", "a", "b", "...", "b", "b"];
  var arr = av.ds.array(arrValues);
  var labelab1 = av.label("$k$", {"left": xoffset + 390, "top": yoffset + 250});
  var labelab2 = av.label("$k$", {"left": xoffset + 512, "top": yoffset + 250});
  var arrowa1 = av.g.line(xoffset + 380, yoffset + 278, xoffset + 340, yoffset + 278, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrowa2 = av.g.line(xoffset + 408, yoffset + 278, xoffset + 455, yoffset + 278, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrowb1 = av.g.line(xoffset + 500, yoffset + 278, xoffset + 455, yoffset + 278, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrowb2 = av.g.line(xoffset + 533, yoffset + 278, xoffset + 575, yoffset + 278, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.step();
  
  // Slide 5
  arrow2.hide();
  arrow1.hide();
  arrowK1.hide();
  arrowK2.hide();
  labelM.hide();
  labelK.hide();
  label.hide();
  
  var arrow4 = av.g.line(320, 230, 210, 148, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow5 = av.g.line(350, 230, 290, 148, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow7 = av.g.line(307, 130, 347, 130, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var label1 = av.label("$........$", {"top": yoffset + 100, "left": xoffset + 385});
  var arrow8 = av.g.line(407, 130, 447, 130, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var qi = g.addNode("qi", {left: xoffset + 250, top: yoffset + 100});
  var arrow = av.g.line(477, 130, 527, 130, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var label2 = av.label("$.......$", {"top": yoffset + 100, "left": xoffset + 565});
  
  
  var arrow9 = av.g.line(580, 130, 626, 130, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow10 = av.g.line(410, 230, 560, 140, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow11 = av.g.line(380, 230, 463, 148, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.umsg("Since there are $k$ states and $k$ a's (followed by some b's), some state $i$ in $M$ must be reached more than once when following the path of $a^k$.");
  av.step();

  // Slide 6
  av.umsg("In that case, there is a loop with one or more a's (say $t$ a's for some $t \\geq 1$) along the path.");
  var labela = av.label("$t$ a's", {"top": yoffset + 45, "left": xoffset + 480});
  var label3 = av.label("...", {"top": yoffset, "left": xoffset + 485});
  var qi1 = g.addNode(" ", {left: xoffset + 200, top: yoffset});
  var qi2 = g.addNode(" ", {left: xoffset + 300, top: yoffset});
  var e2 = g.addEdge(qi, qi2);
  var e3 = g.addEdge(qi1, qi);
  var e4 = av.g.line(497, 30, 472, 30, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var e5 = av.g.line(452, 30, 426, 30, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  g.layout();
  av.step();

  // Slide 7
  av.umsg("Suppose we start at the initial state, traverse the same path for $a^kb^k$, but we traverse the loop of a's one additional time.");
  av.step();

  // Slide 8
  av.umsg("We will end up in the same final state that $a^kb^k$ did, but our actual number of a's is $a^{k + t}$.");
  arr.hide();
  arrowa1.hide();
  arrowa2.hide();
  arrowb1.hide();
  arrowb2.hide();
  arrow10.hide();
  arrow11.hide();
  labelab1.hide();
  labelab2.hide();
  arrow4.hide();
  arrow5.hide();
  var arrValues2 = ["a", "a", "...", "a", "a", "...", "a", "b", "...", "b", "b"];
  var arr2 = av.ds.array(arrValues2);
  var labelaab1 = av.label("$k + t$", {"left": xoffset + 382, "top": yoffset + 250});
  var labelaab2 = av.label("$k$", {"left": xoffset + 557, "top": yoffset + 250});
  var arrowKt1 = av.g.line(xoffset + 372, yoffset + 277, xoffset + 293, yoffset + 277, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrowKt2 = av.g.line(xoffset + 420, yoffset + 277, xoffset + 500, yoffset + 277, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrowKt3 = av.g.line(xoffset + 550, yoffset + 277, xoffset + 500, yoffset + 277, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrowKt4 = av.g.line(xoffset + 573, yoffset + 277, xoffset + 620, yoffset + 277, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow12 = av.g.line(280, 230, 210, 148, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow13 = av.g.line(310, 230, 290, 148, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow14 = av.g.line(380, 230, 460, 148, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow15 = av.g.line(460, 230, 560, 140, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.step();

  // Slide 9
  av.umsg("Therefore, the string $a^{k+t}b^k$ is accepted by $M$, but this string is not in $L_2$. Contradiction!");
  av.step();

  // Slide 10
  av.umsg("This must happen no matter what machine we created that can accept $a^kb^k$. Thus, $L_2$ is not regular.");
  av.step();

  // Slide 11
  av.umsg("This is an example of the Pigeonhole Principle. The Pigeonhole Principle states that, given $n$ pigeonholes and $n+1$ pigeons, when all of the pigeons go into the holes we can be sure that at least one hole contains more than one pigeon.");
  arr2.hide();
  labelaab1.hide();
  labelaab2.hide();
  labela.hide();
  label1.hide();
  label2.hide();
  label3.hide();
  arrow.hide();
  arrow1.hide();
  arrow2.hide();
  arrow3.hide();
  arrow7.hide();
  arrow8.hide();
  arrow9.hide();
  arrow12.hide();
  arrow13.hide();
  arrow14.hide();
  arrow15.hide();
  arrowKt1.hide();
  arrowKt2.hide();
  arrowKt3.hide();
  arrowKt4.hide();
  q0.hide();
  q1.hide();
  qi.hide();
  qn.hide();
  qi1.hide();
  qi2.hide();    
  e1.hide();
  e2.hide();
  e3.hide();
  e4.hide();
  e5.hide();
  var p1 = g.addNode("1", {left: xoffset + 50, top: yoffset + 100});  
  var p2 = g.addNode("2", {left: xoffset + 150, top: yoffset + 100}); 
  var pi =  g.addNode("i", {left: xoffset + 250, top: yoffset + 100}); 
  var pn = g.addNode("n", {left: xoffset + 350, top: yoffset + 100});  
  var pn1 = g.addNode("n+1", {left: xoffset + 450, top: yoffset + 100}); 
  var h1 = g.addNode("1", {left: xoffset + 50, top: yoffset + 200});  
  var h2 = g.addNode("2", {left: xoffset + 150, top: yoffset + 200}); 
  var hi = g.addNode("i", {left: xoffset + 250, top: yoffset + 200}); 
  var hn = g.addNode("n", {left: xoffset + 350, top: yoffset + 200});
  g.addEdge(p1, h1);
  g.addEdge(p2, h2);
  g.addEdge(pn, hn);
  g.addEdge(pi, hi);
  var labelp1 = av.label("$.........$", {"left": 390, "top": 100});
  var labelp2 = av.label("$.........$", {"left": 490, "top": 100});
  var labelph1 = av.label("$.........$", {"left": 390, "top": 200});
  var labelph2 = av.label("$.........$", {"left": 490, "top": 200});
  var labelpg = av.label("Pigeon: ", {"left": 100, "top": 100});
  var labelpg = av.label("Pigeonholes: ", {"left": 100, "top": 200});
  var arrowph = av.g.line(664, 148, 470, 218, {"stroke-width": 1.5, "arrow-end": "classic-wide-long"});
  g.layout();
  av.step();

  // Slide 12
  av.umsg("In our case, the number of a's are the pigeons, and the states in the DFA are the pigeonholes. We can't distinguish the various possibilities for the number of a's, so we can't verify that they properly match the number of b's.");
  av.recorded(); 
});
