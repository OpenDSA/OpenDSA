/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP5Code2CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var offset_for_each_var = 50;
    var offset_between_var_label_and_cell = 20;
    var glx = av.ds.array([10], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell}).hide();
    var label_glx = av.label("Global x", {left: leftMargin, top: 0}).hide();
    var f = av.ds.array(["Function definition"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + offset_for_each_var}).hide();
    var label_f = av.label("f", {left: leftMargin, top: offset_for_each_var}).hide();
    var fy = av.ds.array([10], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 2 * offset_for_each_var}).hide();
    var label_fy = av.label("f's y", {left: leftMargin, top: 2 * offset_for_each_var}).hide();
    var fx = av.ds.array([20], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 3 * offset_for_each_var}).hide();
    var label_fx = av.label("f's x", {left: leftMargin, top: 3 * offset_for_each_var}).hide();

    var pseudo = av.code(
        [
	    "var x = 10;",	// 1
	    "var f = function(y) { ", // 2
	    "           console.log(y);", // 3
	    "           if (true) {",	  // 4
	    "                var x = 20;   ", // 5
	    "           }",		      // 6
	    "           console.log(x);",     // 7
	    "};",			      // 8
	    "f(x);    "			      // 9
        ],
        {
            lineNumbers: true,
            left: 200,
            top: 0
        }
    );
    

    // Slide 1
    av.umsg("Here we have one local scope associated with function f in lines 2-8");
    pseudo.addClass([2, 3, 4, 5, 6, 7, 8], "scope1");
    av.displayInit();

    //Slide 2
    av.umsg('When line 1 is read into the interpreter, a variable x is established in the global scope and the value 10 is associated with it.');
    pseudo.highlight(1);
    label_glx.show();
    glx.show();
    av.step();
    
    //Slide 3
    av.umsg("When the definition of f in lines 2-8 is read into the interpreter, a variable f is established in the global scope and a value, namely the definition of the function, is associated with it.  In the local scope of the function's definition, we have the parameter y and the declared variable x.");
    pseudo.unhighlight(1);
    label_f.show();
    f.addClass(0,"wider");
    f.show();
    glx.addClass(0,"inaccessible");
    av.step();
    
    // Slide 4
    av.umsg('In line 9, f is called, passing in the value of the global x for the y parameter of the function.');
    fy.show();
    label_fy.show();
    glx.removeClass(0,"inaccessible");
    pseudo.highlight(9);
    av.step();

    //Slide 5
    av.umsg('As we begin the execution of f, the first value output to the console is the 10 that has been associated with y.');
    pseudo.unhighlight(9);
    pseudo.highlight(3);
    glx.addClass(0,"inaccessible");
    av.step();

    // Slide 6
    av.umsg('The if statement executes with a true condition, resulting in the declaration of the variable x in the local scope of f.');
    pseudo.highlight([4,5,6]);
    pseudo.unhighlight(3);
    fx.show();
    label_fx.show();
    av.step();

    // Slide 7
    av.umsg('When x is output on line 12, we will see the value of the "hoisted" x in the local scope of f.   That is, 20 will be output.');
    pseudo.unhighlight([4,5,6]);
    pseudo.highlight(7);
    av.step();

    
    av.recorded();
});
