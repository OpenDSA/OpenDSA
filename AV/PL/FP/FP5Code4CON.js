/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP5Code4CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var offset_for_each_var = 50;
    var offset_between_var_label_and_cell = 20;
    var x = av.ds.array(["1"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell}).hide();
    var label_x = av.label("Global x", {left: leftMargin, top: 0}).hide();
    var f = av.ds.array(["Function definition"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + offset_for_each_var}).hide();
    var label_f = av.label("Global f", {left: leftMargin, top: offset_for_each_var}).hide();
    f.addClass(0,"wider");
    var g = av.ds.array(["Function definition"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 2 * offset_for_each_var}).hide();
    var label_g = av.label("Global g", {left: leftMargin, top: 2 * offset_for_each_var}).hide();
    g.addClass(0,"wider");
    var gx = av.ds.array([""], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 3 * offset_for_each_var}).hide();
    var label_gx = av.label("g's x", {left: leftMargin, top: 3 * offset_for_each_var}).hide();

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
    av.umsg("Here we have two non-nested local scopes associated with the functions f and g.");
    pseudo.addClass([2,3,4], "scope1");
    pseudo.addClass([6,7,8,9], "scope2");
    av.displayInit();

    // Slide 2
    av.umsg("When line 1 is loaded into the interpreter, the global variable x is established.");
    pseudo.highlight(1);
    x.show();
    label_x.show();
    av.step();

    // Slide 3
    av.umsg("Lines 2-4 establish the global variable f and associate a function definition with it.");
    pseudo.unhighlight(1);
    pseudo.highlight([2,3,4]);
    f.show();
    label_f.show();
    av.step();

    // Slide 4
    av.umsg("Line 5 changes the value associated with the global variable x.");
    pseudo.unhighlight([2,3,4]);
    pseudo.highlight(5);
    x.value(0,2);
    av.step();

    // Slide 5
    av.umsg("Lines 6-9 establish the global variable g and associate a function definition with it.  The scope of g contains a local variable x.");
    pseudo.unhighlight(5);
    pseudo.highlight([6,7,8,9]);
    g.show();
    label_g.show();
    gx.show();
    label_gx.show();
    av.step();

    // Slide 6
    av.umsg("Line 10 changes the value associated with the global variable x.");
    pseudo.unhighlight([6,7,8,9]);
    pseudo.highlight(10);
    x.value(0,3);
    gx.addClass(0,"inaccessible");
    av.step();

    // Slide 7
    av.umsg("Line 11 calls g.");
    pseudo.highlight(11);
    pseudo.unhighlight(10);
    av.step();

    // Slide 8
    av.umsg("The execution of g starts with line 7.");
    pseudo.unhighlight(11);
    pseudo.highlight(7);
    gx.removeClass(0,"inaccessible");
    gx.value(0,20);
    x.addClass(0,"inaccessible");
    av.step();

    // Slide 9
    av.umsg("Next f is called.  Notice that, at the time of the call, the global x is inaccessible.");
    pseudo.unhighlight(7);
    pseudo.highlight(8);
    av.step();
    
    // Slide 10
    av.umsg("We begin the execution of f.  f was called from g, where there was a local x.   So when we are actually executing f, which x is used: x in the scope from which f was called or x in scope at the time of f's definition?  During f's execution, x in the local scope of g is inaccessible.  Hence the value returned is that currently associated with the global x, namely, 3.");
    pseudo.unhighlight(8);
    pseudo.highlight(3);
    x.removeClass(0,"inaccessible");
    gx.addClass(0,"inaccessible");
    av.step();
    

    av.recorded();
});
