/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP5Code5CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var offset_for_each_var = 50;
    var offset_between_var_label_and_cell = 20;
    var horiz_indentation_for_var = 10;
    var mI = av.ds.array(["Function definition"], {indexed: false, left: leftMargin + horiz_indentation_for_var, top: offset_between_var_label_and_cell}).hide();
    var label_mI = av.label("Global makeIncrementer", {left: leftMargin, top: 0}).hide();
    var i1 = av.ds.array(["Closure that adds 1 to its y argument"], {indexed: false, left: leftMargin + horiz_indentation_for_var, top: offset_between_var_label_and_cell + offset_for_each_var}).hide();
    var label_i1 = av.label("Global incrBy1", {left: leftMargin, top: offset_for_each_var}).hide();
    i1.addClass(0,"wider");
    var i5 = av.ds.array(["Closure that adds 5 to its y argument"], {indexed: false, left: leftMargin + horiz_indentation_for_var, top: offset_between_var_label_and_cell + 2 * offset_for_each_var}).hide();
    var label_i5 = av.label("Global incrBy5", {left: leftMargin, top: 2 * offset_for_each_var}).hide();
    i5.addClass(0,"wider");

    var pseudo = av.code(
        [
	    "var makeIncrementer = function (x) {", // 1
	    "  var incr = function (y)  {return y + x;};", // 2
	    "  return incr;",				  // 3
	    "  return function (y) {return y + x;};  // anonymous function",	  // 4
	    "};",					  // 5
	    "var incrBy1 = makeIncrementer(1);",	  // 6
	    "var incrBy5 = makeIncrementer(5);",	  // 7
	    "incrBy1(10);             ",	  // 8
	    "incrBy5(10);             "	  // 9
        ],
        {
            lineNumbers: false,
            left: 290,
            top: 0
        }
    );
    

    // Slide 1
    av.umsg("makeIncrementer is a function that, when called, will create and return a closure.");
    pseudo.hide(4);
    pseudo.highlight([1,2,3,5]);
    mI.addClass(0,"wider");
    mI.show();
    label_mI.show();
    av.displayInit();

    // Slide 2
    av.umsg("Calling makeIncrementer(1) returns a closure with the locally scoped function parameter x bound to 1");
    pseudo.unhighlight([1,2,3,5]);
    pseudo.highlight(6);
    i1.show();
    label_i1.show();
    av.step();

    // Slide 3
    av.umsg("Similarly, calling makeIncrementer(5) returns a closure with the locally scoped function parameter x bound to 5");
    pseudo.unhighlight(6);
    pseudo.highlight(7);
    i5.show();
    label_i5.show();
    av.step();

    // Slide 4
    av.umsg("When we make the function call incrBy1(10), the 1 in the function's closure is added to 10, returning 11.");
    pseudo.unhighlight(7);
    pseudo.highlight(8);
    av.step();

    // Slide 5
    av.umsg("When we make the function call incrBy5(10), the 5 in the function's closure is added to 10, returning 15.");
    pseudo.unhighlight(8);
    pseudo.highlight(9);
    av.step();

    // Slide 6
    av.umsg("Finally note that makeIncrementer's use of a local variable incr to store a function, which is then returned by using the name of the incr variable, is not necessary.   Instead, the function definition could just be returned in 'anonymous' form.  That is, the one line highlighted in blue could replace the two lines highlighted in red. ");
    pseudo.unhighlight(9);
    pseudo.show(4);
    pseudo.addClass([2,3], "twolines");
    pseudo.addClass([4], "oneline");
    av.step();

    av.recorded();
});
