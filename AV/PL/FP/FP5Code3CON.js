/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP5Code3CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var offset_for_each_var = 50;
    var offset_between_var_label_and_cell = 20;
    var f = av.ds.array(["Function definition"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell}).hide();
    var label_f = av.label("Global f", {left: leftMargin, top: 0}).hide();
    var fx = av.ds.array(["?"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + offset_for_each_var}).hide();
    var label_fx = av.label("f's x", {left: leftMargin, top: offset_for_each_var}).hide();
    var fy = av.ds.array(["?"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 2 * offset_for_each_var}).hide();
    var label_fy = av.label("f's y", {left: leftMargin, top: 2 * offset_for_each_var}).hide();
    var fg = av.ds.array(["Function definition"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 3 * offset_for_each_var}).hide();
    var label_fg = av.label("f's g", {left: leftMargin, top: 3 * offset_for_each_var}).hide();
    var gx = av.ds.array(["?"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 4 * offset_for_each_var}).hide();
    var label_gx = av.label("g's x", {left: leftMargin, top: 4 * offset_for_each_var}).hide();

    var pseudo = av.code(
        [
	    "var f = function (x,y) {", // 1
	    "    var g = function (x) {", // 2
	    "              return x + y; ", // 3
	    "    }",			    // 4
	    "    return g(10*x);  ",	    // 5
	    "}",			    // 6
	    "f(2, 3);"			    // 7
        ],
        {
            lineNumbers: true,
            left: 200,
            top: 0
        }
    );
    

    // Slide 1
    av.umsg("Here we have a local scope associated with function f in lines 1-6.   However, within that scope there is another nested scope associated with the function g in lines 2-4.   As we shall see, the nested scope of g has precedence over that of f when g is defined and called.");
    pseudo.addClass([1,5,6], "scope1");
    pseudo.addClass([2,3,4], "scope2");
    f.addClass(0,"wider");
    f.show();
    label_f.show();
    fx.show();
    label_fx.show();
    fy.show();
    label_fy.show();
    fg.addClass(0,"wider");
    fg.show();
    label_fg.show();
    gx.show();
    label_gx.show();
    av.displayInit();

    //Slide 2 
    av.umsg("When f is called at line 7, 2 is passed in for f's x and 3 for f's y.   f's nested g and g's x are both inaccessible from the point where the call is made.");
    pseudo.highlight(7);
    fg.addClass(0,"inaccessible");
    gx.addClass(0,"inaccessible");
    fx.value(0,2);
    fy.value(0,3);
    av.step();

    //Slide 3 
    av.umsg("The call to f results in a call to g at line 5.   At the time of the call to g, f's x is 2.  Hence that is multiplied by 10 and passed in for g's x.");
    pseudo.unhighlight(7);
    pseudo.highlight(5);
    fg.removeClass(0,"inaccessible");
    gx.removeClass(0,"inaccessible");
    gx.value(0,20);
    av.step();

    //Slide 4 
    av.umsg("The call to g results in the execution of line 3.   When evaluating the expression x + y in line 3, g's x is used because g's scope takes precedence over f's.  f's x is inaccessible within g.  However, since there is no y in g's local scope, the value of y in the scope that encloses g, namely f's scope, is used.   Thus 20 + 3 = 23 is returned to the original call at line 7.");
    pseudo.unhighlight(5);
    pseudo.highlight(3);
    fx.addClass(0, "inaccessible");
    gx.value(0,20);
    fy.highlight(0);
    gx.highlight(0);
    av.step();

    av.recorded();
});
