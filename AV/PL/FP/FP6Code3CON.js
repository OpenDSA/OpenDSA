/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP6Code3CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var offset_for_each_var = 50;
    var offset_between_var_label_and_cell = 20;

    var n1 = av.ds.array([3], {indexed: false, left: leftMargin, top: 20}).hide();
    var n1_label = av.label("n1", {left: leftMargin, top: 0}).hide();
    
    var n2 = av.ds.array([6], {indexed: false, left: leftMargin, top: 20 + offset_for_each_var}).hide();
    var n2_label = av.label("n2", {left: leftMargin, top: 0 + offset_for_each_var}).hide();
    
    var ret = av.ds.array([3, 4, 5, 6], {indexed: false, left: leftMargin, top: 20 + 2 * offset_for_each_var}).hide();
    var ret_label = av.label("fillIn returns", {left: leftMargin, top: 0 + 2 * offset_for_each_var}).hide();
    
    var cf = av.ds.array(["Curried fillIn function"], {indexed: false, left: leftMargin, top: 20}).hide();
    cf.addClass(0,"wider");
    var cf_label = av.label("countFrom", {left: leftMargin, top: 0}).hide();
    
    var cf3 = av.ds.array(["One-arg function with 3 in its closure"], {indexed: false, left: leftMargin, top: 20 + offset_for_each_var}).hide();
    var cf3_label = av.label("countFrom3To", {left: leftMargin, top: 0 + offset_for_each_var}).hide();
    cf3.addClass(0,"wider");
    
    var cf3t = av.ds.array([3, 4, 5, 6], {indexed: false, left: leftMargin, top: 20 + 2 * offset_for_each_var}).hide();
    var cf3t_label = av.label("countFrom3To returns", {left: leftMargin, top: 0 + 2 * offset_for_each_var}).hide();
    
    var code1 =         [

	"var fillIn = function(n1,n2) {", // 1
	"    if (fp.isEq(n1,n2))",	  // 2
	"        return [n1];",		  // 3
	"    else if (fp.isLT(n1,n2))",	  // 4
	"        return fp.cons(n1, fillIn( fp.add(n1,1), n2));", // 5
	"    else",						  // 6
	"        return fp.cons(n1, fillIn( fp.sub(n1,1), n2));", // 7
	"};",							  // 8
	"",							  // 9
	"var countFrom = curry(fillIn);",  			  // 10
	"var countFrom3To = countFrom(3):",			  // 11
	"countFrom3To( 6 );  ",                   		  // 12
	"curry(fillIn)(3)(6);  // countFrom3To anonymously"	  // 13
        ];

    
    var pseudo1 = av.code(
        code1,
        {
            lineNumbers: false
        }
    );
    

    // Slide 1
    av.umsg('Consider the following function fillIn, which takes two integer arguments.');
    pseudo1.hide([9,10,11,12,13]);
    av.displayInit();

    // S 2
    av.umsg('If n1 < n2, then the highlighted recursive call will count from n1 up to n2, ultimately returning the list indicated below.');
    pseudo1.highlight(5);
    n1.show();
    n1_label.show();
    n2.show();
    n2_label.show();
    ret.show();
    ret_label.show();
    av.step();
   
    // S3
    av.umsg('Conversely if n1 > n2, then the highlighted recursive call will count from n1 down to n2, ultimately returning the list indicated below.');
    pseudo1.unhighlight(5);
    pseudo1.highlight(7);
    n1.value(0,6);
    n2.value(0,3);
    ret.value(0,6);
    ret.value(1,5);
    ret.value(2,4);
    ret.value(3,3);
    av.step();
   
    // S4
    av.umsg('Now suppose that we curry the two-argument fillIn function.  The result is a function of one argument (corresponding to the n1 argument of fillIn) that returns a function of one argument (corresponding to the n2 argument of fillIn).');
    n1.hide();
    n1_label.hide();
    n2.hide();
    n2_label.hide();
    ret.hide();
    ret_label.hide();
    cf.show();
    cf_label.show();
    pseudo1.show([9,10]);
    pseudo1.unhighlight(7);
    pseudo1.highlight(10);
    av.step();

    // S5
    av.umsg('If we next call our curried fillIn function with 3, it will return to us a one-argument function that we can use to fill in a list from 3.  Our curried function has wired 3 into the closure of the one-argument function that is returned.');
    cf3.show();
    cf3_label.show();
    pseudo1.show(11);
    pseudo1.unhighlight(10);
    pseudo1.highlight(11);
    av.step();
    
    // S6
    av.umsg('We can now use the countFrom3To function that curry has created to build a list from the wired-in 3 to any other value.   In the example below, the other value is 6.');
    cf3t.show();
    cf3t_label.show();
    pseudo1.show(12);
    pseudo1.unhighlight(11);
    pseudo1.highlight(12);
    av.step();

    // S7
    av.umsg('Note that, if we wanted to create and use an anonymous version of the countFrom3To function, we could do that by using curry as indicated in the highlighted line below.');
    pseudo1.show(13);
    pseudo1.unhighlight(12);
    pseudo1.highlight(13);

    
    av.recorded();
});
