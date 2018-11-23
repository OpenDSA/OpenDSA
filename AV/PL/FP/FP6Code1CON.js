/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP6Code1CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
//     var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;
//     var glx = av.ds.array(['"outside"'], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell}).hide();
//     var label_glx = av.label("Global x", {left: leftMargin, top: 0}).hide();
//     var f1 = av.ds.array(["Function definition"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + offset_for_each_var}).hide();
//     var label_f1 = av.label("f1", {left: leftMargin, top: offset_for_each_var}).hide();
//     var f1x = av.ds.array(['"inside f1"'], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 2 * offset_for_each_var}).hide();
//     var label_f1x = av.label("f1's x", {left: leftMargin, top: 2 * offset_for_each_var}).hide();
//     var f2 = av.ds.array(["Function definition"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 3 * offset_for_each_var}).hide();
//     var label_f2 = av.label("f2", {left: leftMargin, top: 3 * offset_for_each_var}).hide();

    var arrValues = [3, 2, 5, 8];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
    var arr_label = av.label("ns", {left: leftMargin, top: 0});
    var arr_ret = av.ds.array([4,3,6,9], {indexed: false, left: leftMargin, top: 90});
    var arr_ret_label = av.label("addBonusPoint:", {left: leftMargin, top: 70});
    var arr_ret1 = av.ds.array([6,4,10,16], {indexed: false, left: leftMargin, top: 160});
    var arr_ret_label1 = av.label("doubleAll:", {left: leftMargin, top: 140});
    var code1 =         [
	    "var add1 = function (x) { ",
	    "                 return fp.add(x,1); };",
	    "var addBonusPoint = function (ns) {",
	    "  if (fp.isNull(ns))",
	    "      return [ ];",
	    "  else",
	    "      return fp.cons( ",
	    "               add1(fp.hd(ns)),",
	    "               addBonusPoint(fp.tl(ns)));",
	    "}",
	    "addBonusPoint( [3, 2, 5, 8] );"
        ];

    
    var pseudo1 = av.code(
        code1,
	{
	    relativeTo:arr,
 	    anchor:'right top',
 	    myAnchor:'left top',
	    left: leftMargin,
	    top: 0,
            lineNumbers: false
//             left: leftMargin,
// 	    right: leftMargin,
// 	    top: 0
        }
    );
    
    var code2 =         [
	    "var doubleIt = function (x) { ",
	    "                 return fp.add(x,x); };",
	    "var doubleAll = function (ns) {",
	    "  if (fp.isNull(ns))",
	    "      return [ ];",
	    "  else",
	    "      return fp.cons( ",
	    "               doubleIt(fp.hd(ns)), ",
	    "               doubleAll(fp.tl(ns)));",
	    "}",
	    "doubleAll( [3, 2, 5, 8] );"
        ];

    var pseudo2 = av.code(
	code2,
        {
	    relativeTo:pseudo1,
	    anchor:'right top',
	    myAnchor:'left top',
	    left: leftMargin,
	    top: 0,
	    lineNumbers: false
        }
    );
    
    var code3 = [
	"var doubleIt = function (x) { return fp.add(x,x); };",
	"var map = function (f,ns) {",
	"  if (fp.isNull(ns))",
	"      return [ ];",
	"  else",
	"      return fp.cons(",
	"                 f(fp.hd(ns)), ",
	"                 map(f, fp.tl(ns)));",
	"}",
	"map( doubleIt, [1,2,3,4,5] );",
	"map( function (x) { return x+1; }, [1,2,3,4,5] );"
	];

    var pseudo3 = av.code(
	code3,
        {
 	    left: 250,
	    top: 250,
	    lineNumbers: false
        }
    );
    pseudo3.addClass([0,1,2,3,4,5,6,7,8,9,10,11], "mapfuncwidth");
    pseudo3.hide();


    // Slide 1
    av.umsg("Both addBonusPoint and doubleAll use very similar patterns of computation. Given a list ns, they return a new list by applying a function -- add1 for addBonusPoint and doubleIt for doubleAll -- to every element of the given list.  This is done by calling the function with the head of the list and then using recursion to process the remainder of the list.");
    pseudo1.addClass([8,9], "red");
    pseudo2.addClass([8,9], "red");
    pseudo1.hide(11);
    pseudo2.hide(11);
    arr_ret_label.hide();
    arr_ret.hide();
    arr_ret_label1.hide();
    arr_ret1.hide();
    av.displayInit();

    // Slide 2
    av.umsg("The call, highlighted in blue, to addBonusPoint in the code on the left will return the list also highlighted in blue.   The call, highlighted in green, to doubleAll in the code on the right will return the list also highlighted in blue.");
    arr_ret_label.show();
    arr_ret.show();
    arr_ret.addClass([0,1,2,3], "addBonusPoint");
    arr_ret_label1.show();
    arr_ret1.show();
    arr_ret1.addClass([0,1,2,3], "doubleAll");
    pseudo1.show(11);
    pseudo1.addClass(11,"blue");
    pseudo2.show(11);
    pseudo2.addClass(11,"green");
    av.step();
    
//     // Slide 3
//     av.umsg("The call, highlighted in green, to doubleAll in the code on the right will return the indicated list.");
//     arr_ret.value(0,6);
//     arr_ret.value(1,4);
//     arr_ret.value(2,10);
//     arr_ret.value(3,16);
//     pseudo1.removeClass(11,"blue");
//     pseudo2.show(11);
//     pseudo2.addClass(11,"green");
//     av.step();
    
    av.recorded();
});
