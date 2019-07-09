// Written by Yujie Chen, Summer 2019
/*global ODSA */
$(document).ready(function() {
    "use strict";
    var av_name = "SortNotationS1CON";
    // Load the config object with interpreter and code created by odsaUtils.js
    var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
    var av = new JSAV(av_name);
    var arr1;
    var leftAlign = 150;
    var topAlign = 0;
    var labelSet = [];
  
    // Slide 1
    av.umsg(interpret("Slide 1"));  
    arr1 = av.ds.array(["$r_1$", "$r_2$", "$r_3$", "$r_4$", "$r_5$", "$r_6$", "$r_7$"],
                        {left: leftAlign, top: topAlign + 35, indexed: false});
    labelSet.push(av.label("$L$", {left: leftAlign + 95, top: topAlign - 20}).css({"font-size": "22px", "text-align": "center", "font-style": "bold"}));
    av.displayInit();
    av.step();

    // Slide 2
    av.umsg(interpret("Slide 2"));
    arr1 = av.ds.array([3, 1, 7, 6, 4, 8, 0],
                       {left: leftAlign, top: topAlign + 57 + 35, indexed: false});
    av.step();
    
    // Slide 3
    av.umsg(interpret("Slide 3"));
    // av.ds.array(["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    //             {left: leftAlign + 300, top: topAlign + 35, indexed: false});
    labelSet.push(av.label("$L_s$", {left: leftAlign + 375, top: topAlign - 20}).css({"font-size": "22px", "text-align": "center", "font-style": "bold"}));
    av.step();

    // Slide 4
    av.umsg(interpret("Slide 4"));
    av.ds.array(["$r_7$", "$r_2$", "$r_1$", "$r_5$", "$r_4$", "$r_3$", "$r_6$"],
                       {left: leftAlign + 300, top: topAlign + 35, indexed: false});
    av.ds.array([0, 1, 3, 4, 6, 7, 8],
                {left: leftAlign + 300, top: topAlign + 35 + 57, indexed: false});
    av.step();
    av.recorded();
  });
  
  