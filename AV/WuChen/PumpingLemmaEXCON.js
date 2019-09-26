/*global ODSA */
"use strict";
$(document).ready(function () {
    var av_name = "PumpingLemmaEXCON";
    var av;
    av = new JSAV(av_name);
    MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
    $(".avcontainer").on("jsav-message", function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    });
    //Slide 1
    av.umsg("Let $n = m$, we get an arry $a^mb^m$.");
    var arrValues = ["a", "a", "...", "a", "b", "...", "b", "b"];
    var arr = av.ds.array(arrValues);
    var labelab = av.label("$|----m---|----m----|$", {"left": 305, "top": 50});
    av.displayInit();

    //Slide 2
    av.step();  
    
    av.umsg("Since $|xy| \\leq m$, $y$ only contains $a$. So if we pump $y$, the string will have more $a$.");
    var labelxyz = av.label("$|----xy---|----z-----|$",{"left": 305, "top": 100});
    av.step();

    //Slide 3 
    arr.hide();
    labelab.hide();  
    labelxyz.hide(); 
    av.umsg("If $L$ is an regular langauge, then $xy^2z$ should also be in $L$. However, it is easy to see that string will have more $a$ than $b$ if we pump $y$, which violates the rule of language, contradication! So $L = a^nb^n$ is not regular.");
    var arrValues2 = ["a", "a", "...", "a", "a", "...", "a", "b", "...", "b", "b"];
    var labelaab = av.label("$|------->m-------|----m----|$", {"left": 260, "top": 50});
    var labelxyy = av.label("$|-------xyy-------|----z----|$", {"left": 260, "top": 100});
    var arr2 = av.ds.array(arrValues2);
    av.step();
    av.recorded(); 
    
});

