/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP5Code4CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var offset_for_each_var = 50;
    var offset_between_var_label_and_cell = 20;
    var x = av.ds.array(["?"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell}).hide();
    var label_x = av.label("Global x", {left: leftMargin, top: 0}).hide();
    var f = av.ds.array(["Function Definition"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + offset_for_each_var}).hide();
    var label_f = av.label("Global f", {left: leftMargin, top: offset_for_each_var}).hide();
    f.addClass(0,"wider");
    var g = av.ds.array(["Function definition"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 2 * offset_for_each_var}).hide();
    var label_g = av.label("Global g", {left: leftMargin, top: 2 * offset_for_each_var}).hide();
    g.addClass(0,"wider");
    var gx = av.ds.array([20], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 3 * offset_for_each_var}).hide();
    var label_gx = av.label("g's x", {left: leftMargin, top: 3 * offset_for_each_var}).hide();
    gx.addClass(0,"inaccessible");

    var pseudo = av.code(
        [
	    "var x = 1;",	// 1
	    "var f = function () {", // 2
	    "           return x;",  // 3
	    "}   ",		     // 4
	    "x = 2;",		     // 5
	    "var g = function () {", // 6
	    "           var x = 20; ", // 7
	    "           return f();",  // 8
	    "}",		       // 9
	    "x = 3;",		       // 10
	    "g();   "		       // 11
        ],
        {
            lineNumbers: true,
            left: 200,
            top: 0
        }
    );
    

    // Slide 1
    av.umsg("Here we have two non-nested local scopes associated with the function f and g.");
    pseudo.addClass([2,3,4], "scope1");
    pseudo.addClass([6,7,8,9], "scope2");
    av.displayInit();


    av.recorded();
});
