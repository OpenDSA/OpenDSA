/*global ODSA */
"use strict";
$(document).ready(function () {
    var av_name = "PumpingLemma";
    var av;
    av = new JSAV(av_name);
    MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
    $(".avcontainer").on("jsav-message", function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    });
    var xoffset = 350;
    var yoffset = 0;
    //Slide 1
    av.umsg("Let $L$ be an infinite regular language.");
    av.displayInit();

    //Slide 2
    av.umsg("There exists a constant $m>0$ such that any $w \\in L$ with $|w| \\geq m$ can be decomposed into three parts as $w=xyz$ with:");
    var arrValues = ["x", "y", "z"];
    var arr = av.ds.array(arrValues, {"left": xoffset, "top": yoffset + 50});
    var labelm = av.label("$|-- \\geq m--|$", {"left": xoffset, "top": yoffset + 25});
    var labelw = av.label("$w$: ", {"left": xoffset - 50, "top": yoffset + 50});
    av.step();  
    
    //Slidw 3
    av.umsg("1. $|xy| \\leq m$");
    var labelxy = av.label("$xy \\leq m$",{"left": xoffset + 10, "top": yoffset + 90});
    av.step();

    //Slide 4 
    av.umsg("2. $|y| \\geq 1$");
    labelxy.hide();
    var labely = av.label("$|y| \\geq 1$",{"left": xoffset + 25, "top": yoffset + 90});
    av.step();

    //Slide 5
    av.umsg("3. $xy^iz \\in L$  for all $i \\geq 0$");
    labely.hide();
    labelm.hide();
    labelw.hide();
    labelw = av.label("$w$: ", {"left": xoffset - 150, "top": yoffset + 50});
    var arrValues1 = ["x", "y", "y", "z"];
    var arr1 = av.ds.array(arrValues1, {"left": xoffset, "top": yoffset + 150});
    var labelxyz = av.label("$xy^2z \\in L$($i = 2$): ",{"left": xoffset - 150, "top": yoffset + 150});
    var arrow1 = av.g.line(xoffset + 50, yoffset + 95, xoffset + 50, yoffset + 165, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
    var labelp1 = av.label("Pump $1$ time", {"left": xoffset + 60, "top": yoffset + 110});
    var arrow2 = av.g.line(xoffset + 50, yoffset + 195, xoffset + 50, yoffset + 265, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
    var labelp2 = av.label("...Pump $i - 1$ times", {"left": xoffset + 60, "top": yoffset + 210});
    var arrValues2 = ["x", "y","...", "y", "z"];
    var arr2 = av.ds.array(arrValues2, {"left": xoffset, "top": yoffset + 250});
    var labelxyz2 = av.label("$xy^iz \\in L$($i \\geq 0$): ",{"left": xoffset - 150, "top": yoffset + 250});
    av.step();

    //Slide 6
    av.umsg("Meaning: Every sufficiently long string in $L$ (the constant m corresponds to the finite number of states in $M$) can be partitioned into three parts such that the middle part can be pumped, resulting in strings that must be in $L$.");
    av.step();

    //Slide 7
    arr.hide();
    arr1.hide();
    arr2.hide();
    arrow1.hide();
    arrow2.hide();
    labelxyz.hide();
    labelxyz2.hide();
    labelp1.hide();
    labelp2.hide();
    labelw.hide();
    av.umsg("How To Use the Pumping Lemma to prove $L$ is not regular: Proof by Contradication.");
    av.step();

    //Slide 8
    av.umsg("Assume $L$ is regular. Therefore $L$ satisfies the pumping lemma. Choose a long string $w \\in L$, $|w| \\geq m$. (The choice of the string is crucial. We must pick a string that will yield a contradiction).");
    av.umsg(" Show that there is NO division of $w$ into $xyz$ (must consider all possible divisions) such that $|xy| \\leq m$, $|y| \\geq 1$ and $xy^iz \\in L$ for all $i \\geq 0$. The pumping lemma does not hold.", {"preserve": true});
    av.step();

    //Slide 9
    av.umsg("Contradiction! So $L$ is not regular.");
    av.recorded(); 
    
});

