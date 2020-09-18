/*global ODSA, MathJax */
$(document).ready(function() {
  "use strict";
  var av_name = "PumpingLemmaCON";
  var av;
  av = new JSAV(av_name);
  MathJax.Hub.Config({tex2jax: {inlineMath: [["$", "$"], ["\\(", "\\)"]]}});
  $(".avcontainer").on("jsav-message", function() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  });
  var xoffset = 350;
  var yoffset = 0;
  // Slide 1
  av.umsg("Let $L$ be an infinite regular language.");
  av.displayInit();

  // Slide 2
  av.umsg("There exists a constant $m>0$ such that any $w \\in L$ with $|w| \\geq m$ can be decomposed into three parts as $w=xyz$ with:");
  var arrValues = ["x", "y", "z"];
  av.ds.array(arrValues, {left: xoffset, top: yoffset + 50});
  av.label("$\\geq m$", {left: xoffset + 35, top: yoffset + 25});
  var labelw = av.label("$w$: ", {left: xoffset - 50, top: yoffset + 50});
  av.g.line(xoffset + 30, yoffset + 52, xoffset + 2, yoffset + 52,
            {"stroke-width": 1, "arrow-end": "classic-wide-long"});
  av.g.line(xoffset + 65, yoffset + 52, xoffset + 93, yoffset + 52,
            {"stroke-width": 1, "arrow-end": "classic-wide-long"});
  av.step();

  // Slide 3
  av.umsg("There exists a constant $m>0$ such that any $w \\in L$ with $|w| \\geq m$ can be decomposed into three parts as $w=xyz$ with:");
  av.umsg("<br> 1. $|xy| \\leq m$", {preserve: true});
  var labelxy = av.label("$\\leq m$", {left: xoffset + 20, top: yoffset + 90});
  var arrow3 = av.g.line(xoffset + 18, yoffset + 117, xoffset + 2, yoffset + 117,
                         {"stroke-width": 1, "arrow-end": "classic-wide-long"});
  var arrow4 = av.g.line(xoffset + 48, yoffset + 117, xoffset + 61, yoffset + 117,
                         {"stroke-width": 1, "arrow-end": "classic-wide-long"});
  av.step();

  // Slide 4
  av.umsg("There exists a constant $m>0$ such that any $w \\in L$ with $|w| \\geq m$ can be decomposed into three parts as $w=xyz$ with:");
  arrow3.hide();
  arrow4.hide();
  av.umsg("<br> 1. $|xy| \\leq m$", {preserve: true});
  av.umsg("<br> 2. $|y| \\geq 1$", {preserve: true});
  labelxy.hide();
  var labely = av.label("$\\geq 1$", {left: xoffset + 35, top: yoffset + 90});
  av.step();

  // Slide 5
  av.umsg("There exists a constant $m>0$ such that any $w \\in L$ with $|w| \\geq m$ can be decomposed into three parts as $w=xyz$ with:");
  av.umsg("<br> 1. $|xy| \\leq m$", {preserve: true});
  av.umsg("<br> 2. $|y| \\geq 1$", {preserve: true});
  av.umsg("<br> 3. $xy^iz \\in L$  for all $i \\geq 0$", {preserve: true});
  labely.hide();
  labelw.hide();
  labelw = av.label("$w$: ", {left: xoffset - 150, top: yoffset + 50});
  var arrValues1 = ["x", "y", "y", "z"];
  av.ds.array(arrValues1, {left: xoffset, top: yoffset + 150});
  av.label("$xy^2z \\in L$($i = 2$): ",
           {left: xoffset - 150, top: yoffset + 150});
  av.g.line(xoffset + 50, yoffset + 95, xoffset + 50, yoffset + 165,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.label("Pump $1$ time", {left: xoffset + 60, top: yoffset + 110});
  av.g.line(xoffset + 50, yoffset + 195, xoffset + 50, yoffset + 265,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.label("...Pump $i - 1$ times", {left: xoffset + 60, top: yoffset + 210});
  var arrValues2 = ["x", "y", "...", "y", "z"];
  av.ds.array(arrValues2, {left: xoffset, top: yoffset + 250});
  av.label("$xy^iz \\in L$($i \\geq 0$): ",
           {left: xoffset - 150, top: yoffset + 250});
  av.label("$i$ y's", {top: yoffset + 290, left: xoffset + 63});
  av.g.line(xoffset + 58, yoffset + 317, xoffset + 30, yoffset + 317,
            {"stroke-width": 1, "arrow-end": "classic-wide-long"});
  av.g.line(xoffset + 95, yoffset + 317, xoffset + 120, yoffset + 317,
            {"stroke-width": 1, "arrow-end": "classic-wide-long"});
  av.step();

  // Slide 6
  av.umsg("<b>Meaning:</b> Every sufficiently long string in $L$ (the constant m corresponds to the finite number of states in $M$) can be partitioned into three parts such that the middle part can be pumped, resulting in strings that must be in $L$.");
  av.step();

  //Slide 7
  av.umsg("How To Use the Pumping Lemma to prove L is not regular:");
  av.step();

  //Slide 8
  av.umsg("How To Use the Pumping Lemma to prove L is not regular:<br/>It is a proof by contradiction. So, we start with assuming that the language is regular.");
  av.step();

  //Slide 9
  av.umsg("How To Use the Pumping Lemma to prove L is not regular:<br/>It is a proof by contradiction. So, we start with assuming that the language is regular.<br/>Therefore $L$ satisfies the pumping lemma");
  av.step();

  //Slide 10
  av.umsg("How To Use the Pumping Lemma to prove L is not regular:<br/>It is a proof by contradiction. So, we start with assuming that the language is regular.<br/>Therefore $L$ satisfies the pumping lemma.<br/>Choose a long string $w \\in L$, $|w| \\ge m$. The choice of the string is crucial. We must pick a string that will yield a contradiction.");
  av.step();
  
  //Slide 11
  av.umsg("How To Use the Pumping Lemma to prove L is not regular:<br/>It is a proof by contradiction. So, we start with assuming that the language is regular.<br/>Therefore $L$ satisfies the pumping lemma.<br/>Choose a long string $w \\in L$, $|w| \\ge m$. The choice of the string is crucial. We must pick a string that will yield a contradiction.<br/>Show that there is NO division of $w$ into $xyz$ (we must consider all possible divisions) such that $|xy| \\le m$, $|y| \\ge 1$ and $xy^iz \\in L \\forall i \\ge 0$.");
  av.step();

  //Slide 12
  av.umsg("How To Use the Pumping Lemma to prove L is not regular:<br/>It is a proof by contradiction. So, we start with assuming that the language is regular.<br/>Therefore $L$ satisfies the pumping lemma.<br/>Choose a long string $w \\in L$, $|w| \\ge m$. The choice of the string is crucial. We must pick a string that will yield a contradiction.<br/>Show that there is NO division of $w$ into $xyz$ (we must consider all possible divisions) such that $|xy| \\le m$, $|y| \\ge 1$ and $xy^iz \\in L \\forall i \\ge 0$.<br/>If we show that there is NO possible division, then we have a contradiction!");
  av.step();

  //Slide 13
  av.umsg("How To Use the Pumping Lemma to prove L is not regular:<br/>It is a proof by contradiction. So, we start with assuming that the language is regular.<br/>Therefore $L$ satisfies the pumping lemma.<br/>Choose a long string $w \\in L$, $|w| \\ge m$. The choice of the string is crucial. We must pick a string that will yield a contradiction.<br/>Show that there is NO division of $w$ into $xyz$ (we must consider all possible divisions) such that $|xy| \\le m$, $|y| \\ge 1$ and $xy^iz \\in L \\forall i \\ge 0$.<br/>If we show that there is NO possible division, then we have a contradiction!<br/>$\\Rightarrow L$ is not regular.");
  av.step();

  //Slide 14
  av.umsg("Note that, unfortunately, the pumping lemma is one-way: For (some) languages we can use the pumping lemma to prove that they are not regular.");
  av.step();

  //Slide 15
  av.umsg("But we cannot use the pumping lemma to help us prove that a language is regular.");
  av.step();

  //Slide 16
  av.umsg("And the pumping lemma is not a universal solution for determining that a language is non-regular. Its just a tool in the toolbox.");
  av.step();

  //slide 17
  av.umsg("It is important to understand that the pumping lemma says that there is $\\textbf{some}$ way to define the language that meets the criteria. It is not enough to pick your favorite value of $m$ for which the language would not be regular. You have to show that no satisfactory $m$ can exist.");
  av.recorded();
});
