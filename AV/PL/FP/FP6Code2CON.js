/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP6Code2CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var offset_for_each_var = 50;
    var offset_between_var_label_and_cell = 20;

    var h = av.ds.array(["Function created by compose"], {indexed: false, left: leftMargin, top: 20}).hide();
    var h_label = av.label("h", {left: leftMargin, top: 0}).hide();
    
    var h4 = av.ds.array(["First 1 added to 4, yielding 5"], {indexed: false, left: leftMargin, top: 20 + offset_for_each_var}).hide();
    var h4_label = av.label("h(4) computation", {left: leftMargin, top: 0 + offset_for_each_var}).hide();
    
//     var arrValues = [3, 2, 5, 8];
//     var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
//     var arr_label = av.label("ns", {left: leftMargin, top: 0});
//     var arr_ret = av.ds.array([4,3,6,9], {indexed: false, left: leftMargin, top: 110});
//     var arr_ret_label = av.label("addBonusPoint", {left: leftMargin, top: 70});
//     var arr_ret_labela = av.label("returns:", {left: leftMargin, top: 90});
//     var arr_ret1 = av.ds.array([6,4,10,16], {indexed: false, left: leftMargin, top: 220});
//     var arr_ret_label1 = av.label("doubleAll", {left: leftMargin, top: 180});
//     var arr_ret_label1a = av.label("returns:", {left: leftMargin, top: 200});
//     var map_label = av.label("The mapping abstraction", {left:leftMargin + 280, top:260}).hide();
    var code1 =         [

        "var compose = function (f,g) {", // 1
        "    return function (x) {",	  // 2
        "       return ???????;",	  // 3
        "       return f( g(x) );",	  // 4
        "    };",			  // 5
        "};",				  // 6
        "",				  // 7
        "var h = compose( function (x) { return x*x; },", // 8
        "                 function (x) { return x+1; });", // 9
	"h(4);"						   // 10

        ];

    
    var pseudo1 = av.code(
        code1,
        {
            lineNumbers: false
        }
    );
    

    // Slide 1
    av.umsg('When we "translate" the definition of compose above into JavaScript, first note that compose is a function that takes in two functions (i.e., f and g) and then uses those to build a new function.');
    pseudo1.hide([4,8,9,10]);
    pseudo1.addClass(3,"red");
    av.displayInit();

    // Slide 2
    av.umsg('The function that is returned from compose is a function that, given x, will first apply g to x and then take that value and apply f to it.');
    pseudo1.hide(3);
    pseudo1.show(4);
    pseudo1.addClass(4,"red");
    av.step();

    // Slide 3
    av.umsg('Suppose that we now give compose the two anonymous functions highlighted below and call h the function returned by compose.');
    pseudo1.removeClass(4, "red");
    pseudo1.show([8,9]);
    pseudo1.addClass([8,9],"red");
    h.show();
    h.addClass(0,"wider");
    h_label.show();
    av.step();

    // Slide 4
    av.umsg('We then apply the function h to 4.');
    pseudo1.show(10);
    pseudo1.addClass(10, "red");
    pseudo1.removeClass([8,9], "red");
    av.step();

    // Slide 5
    av.umsg('By the definition of h, we first apply the "add 1 to x" function to 4.');
    h4.show();
    h4.addClass(0, "wider");
    h4_label.show();
    av.step();
    
    // Slide 5
    av.umsg('By the definition of h, the "square x" function is applied next.');
    h4.value(0,"5 is squared, yielding 25");
    av.step();
    
    av.recorded();
});
