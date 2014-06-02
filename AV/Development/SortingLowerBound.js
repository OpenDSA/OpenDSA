"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var code;
  function runit() {
    av = new JSAV($(".avcontainer"));
    MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
    $(".avcontainer").on("jsav-message", function() {
      // invoke MathJax to do conversion again
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }); 
    $(".avcontainer").on("jsav-updatecounter", function(){ 
      // invoke MathJax to do conversion again 
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]); 
    }); 
    av.umsg("We will illustrate the Sorting Lower bound proof by showing the resulted decision tree that models the processing of InsertionSort on an array of 3 elements XYZ");	
    av.displayInit();
    av.umsg("There are $6$ possible permutations of the array values XYZ, only one of them represents the sorted array");
    av.label("XYZ", {"top": "-13px", "left": "395px"}).css({'font-size': '16px', "text-align": "center"});
    av.g.rect(360, 2, 100, 20).css({"fill":"orange", "opacity":"0.5"});
    av.g.rect(360, 22, 100, 80);
    av.label("XYZ YZX<br>XZY ZXY<br>YXZ ZYX", {"top": "20px", "left": "380px"}).css({'font-size': '16px', "text-align": "center"});
    av.step();
    av.umsg("The first step in insertion sort is to compare the second element Y with the first element X");
    av.label("$Y < X?$", {"top": "95px", "left": "390px"}).css({'font-size': '12px', "text-align": "center"});
    av.step();
    av.umsg("If Y is less than X, the two values are swapped, and then we will end up having only $3$ permutations");
    var left_branch_1 = av.g.line(360, 100, 300, 140);
    av.label("Yes", {"top": "90px", "left": "310px"}).css({'font-size': '12px', "text-align": "center"});
    av.g.rect(275, 140, 50, 20).css({"fill":"orange", "opacity":"0.5"});
    av.label("YXZ", {"top": "126px", "left": "285px"}).css({'font-size': '16px', "text-align": "center"});
    av.g.rect(275, 160, 50, 80);
    av.label("YXZ<br>YZX<br>ZYX", {"top": "155px", "left": "285px"}).css({'font-size': '16px', "text-align": "center"});
    av.step();
    av.umsg("If Y is not less than X, no swap will occur and we will end up having only $3$ permutations")
    var right_branch_1 = av.g.line(460, 100, 520, 140);
    av.label("No", {"top": "90px", "left": "485px"}).css({'font-size': '12px', "text-align": "center"});
    av.g.rect(495, 140, 50, 20).css({"fill":"orange", "opacity":"0.5"});
    av.label("XYZ", {"top": "126px", "left": "505px"}).css({'font-size': '16px', "text-align": "center"});
    av.g.rect(495, 160, 50, 80);
    av.label("XYZ<br>XZY<br>ZXY", {"top": "155px", "left": "505px"}).css({'font-size': '16px', "text-align": "center"});
    av.step();
    av.umsg("Let us assume for the moment that Y is less than X and so the left branch is taken");
    left_branch_1.css({"stroke-width": 3, "stroke":"red"});
    av.step();
    av.umsg("The third element Z is compared to the second element X");
    av.label("$Z < X?$", {"top": "235px", "left": "275px"}).css({'font-size': '12px', "text-align": "center"});
    av.step();
    av.umsg("Again, there are two possibilities. If Z is less than X, then these items should be swapped and we will end up having $2$ permutations");
    var left_branch_2 = av.g.line(275, 240, 215, 280);
    av.label("Yes", {"top": "230px", "left": "225px"}).css({'font-size': '12px', "text-align": "center"});
    av.g.rect(190, 280, 50, 20).css({"fill":"orange", "opacity":"0.5"});
    av.label("YZX", {"top": "266px", "left": "200px"}).css({'font-size': '16px', "text-align": "center"});
    av.g.rect(190, 300, 50, 40);
    av.label("YZX<br>ZYX", {"top": "287px", "left": "200px"}).css({'font-size': '16px', "text-align": "center"});
    av.step();
    av.umsg("If Z is not less than X, no swap will occur and we will end up having only $1$ permutation and InsertionSort is complete");
    av.g.line(325, 240, 385, 280);
    av.label("No", {"top": "230px", "left": "350px"}).css({'font-size': '12px', "text-align": "center"});
    var leaf1 = av.g.rect(360, 280, 50, 20).css({"fill":"green", "opacity":"0.5"});
    av.label("YXZ", {"top": "266px", "left": "370px"}).css({'font-size': '16px', "text-align": "center"});
    av.step();
    av.umsg("If the left branch was taken, Z is then compared to Y and InsertionSort will be completed regardless of the comparision result");
    left_branch_2.css({"stroke-width": 3, "stroke":"red"});
    av.label("$Z < Y?$", {"top": "335px", "left": "190px"}).css({'font-size': '12px', "text-align": "center"});
    av.g.line(190, 340, 130, 380);
    av.g.line(240, 340, 300, 380);
    av.label("Yes", {"top": "330px", "left": "140px"}).css({'font-size': '12px', "text-align": "center"});
    av.label("No", {"top": "330px", "left": "265px"}).css({'font-size': '12px', "text-align": "center"});
    var leaf2 = av.g.rect(105, 380, 50, 20).css({"fill":"green", "opacity":"0.5"});
    av.label("ZYX", {"top": "366px", "left": "115px"}).css({'font-size': '16px', "text-align": "center"});
    var leaf3 = av.g.rect(275, 380, 50, 20).css({"fill":"green", "opacity":"0.5"});
    av.label("YZX", {"top": "366px", "left": "285px"}).css({'font-size': '16px', "text-align": "center"});
    av.step();
    av.umsg("In the first comparison, if the right branch was taken, the third element Z is then compared to the second element Y");
    left_branch_1.css({"stroke-width": 1, "stroke":"black"});
    left_branch_2.css({"stroke-width": 1, "stroke":"black"});
    right_branch_1.css({"stroke-width": 3, "stroke":"red"});
    av.label("$Z < Y?$", {"top": "230px", "left": "495px"}).css({'font-size': '12px', "text-align": "center"});
    av.step();
    av.umsg("If Z is less than Y, the two values are swapped, and then we will end up having only $2$ permutations")
    var left_branch_3 = av.g.line(495, 240, 435, 280);
    av.label("Yes", {"top": "230px", "left": "445px"}).css({'font-size': '12px', "text-align": "center"});
    av.g.rect(410, 280, 50, 20).css({"fill":"orange", "opacity":"0.5"});
    av.label("XZY", {"top": "266px", "left": "420px"}).css({'font-size': '16px', "text-align": "center"});
    av.g.rect(410, 300, 50, 40);
    av.label("XZY<br>ZXY", {"top": "287px", "left": "420px"}).css({'font-size': '16px', "text-align": "center"});
    av.step();
    av.umsg("If Z is not less than Y, no swap will occur and we will end up having only $1$ permutation and InsertionSort is complete");
    av.g.line(545, 240, 595, 280);
    av.label("No", {"top": "230px", "left": "570px"}).css({'font-size': '12px', "text-align": "center"});
    var leaf4 = av.g.rect(570, 280, 50, 20).css({"fill":"green", "opacity":"0.5"});
    av.label("XYZ", {"top": "266px", "left": "580px"}).css({'font-size': '16px', "text-align": "center"});
    av.step();
    av.umsg("If the left branch was taken, Z is then compared to X and InsertionSort will be completed regardless of the comparision result");
    left_branch_3.css({"stroke-width": 3, "stroke":"red"});
    av.label("$Z < X?$", {"top": "335px", "left": "410px"}).css({'font-size': '12px', "text-align": "center"});
    av.g.line(410, 340, 350, 380);
    av.g.line(460, 340, 520, 380);
    av.label("Yes", {"top": "330px", "left": "360px"}).css({'font-size': '12px', "text-align": "center"});
    av.label("No", {"top": "330px", "left": "495px"}).css({'font-size': '12px', "text-align": "center"});
    var leaf5 = av.g.rect(325, 380, 50, 20).css({"fill":"green", "opacity":"0.5"});
    av.label("ZYX", {"top": "366px", "left": "335px"}).css({'font-size': '16px', "text-align": "center"});
    var leaf6 = av.g.rect(495, 380, 50, 20).css({"fill":"green", "opacity":"0.5"});
    av.label("YZX", {"top": "366px", "left": "505px"}).css({'font-size': '16px', "text-align": "center"});
    av.step();
    right_branch_1.css({"stroke-width": 1, "stroke":"black"});
    left_branch_3.css({"stroke-width": 1, "stroke":"black"});
    av.umsg("Each sorting algorithm will have its own decision tree. Sorting lower bound can be calculated by finding the smallest depth possible for the deepest node in the tree for any sorting algorithm which will depend on the number of nodes in the decision tree");
    av.step();
    av.umsg("Any decision tree must have at least one leaf node for each input permutation. Thus it is guaranteed that the minimum number of nodes in any decision tree will be $n!$. In our case here we have $n=3$ and $3!=6$ leaf nodes");
    leaf1.css({"fill":"red", "opacity":"0.5"});
    leaf2.css({"fill":"red", "opacity":"0.5"});
    leaf3.css({"fill":"red", "opacity":"0.5"});
    leaf4.css({"fill":"red", "opacity":"0.5"});
    leaf5.css({"fill":"red", "opacity":"0.5"});
    leaf6.css({"fill":"red", "opacity":"0.5"});
    av.step();
    av.umsg("Thus, the smallest depth of the deepest node in any decision tree will be $\\log{n!}$, and accordingly any comparision based sorting algorithm will requires $\\Omega(n\\log{n})$ comparisions. Thus, in the worst case, any such sorting algorithm must require $\\Omega(n\\log{n})$ comparisons.");
    av.recorded();   
  }
  function about() {
    var mystring =
    "Sorting Lower Bound Proof\nWritten by Mohammed Fawzy and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more Information, see http://algoviz.org/OpenDSA\nWritten during February, 2014\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
