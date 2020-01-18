/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP6Code1CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
//     var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;

    var arrValues = [3, 2, 5, 8];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
    var arr_label = av.label("ns", {left: leftMargin, top: 0});
    var arr_ret = av.ds.array([4,3,6,9], {indexed: false, left: leftMargin, top: 110});
    var arr_ret_label = av.label("addBonusPoint", {left: leftMargin, top: 70});
    var arr_ret_labela = av.label("returns:", {left: leftMargin, top: 90});
    var arr_ret1 = av.ds.array([6,4,10,16], {indexed: false, left: leftMargin, top: 220});
    var arr_ret_label1 = av.label("doubleAll", {left: leftMargin, top: 180});
    var arr_ret_label1a = av.label("returns:", {left: leftMargin, top: 200});
    var map_label = av.label("The mapping abstraction", {left:leftMargin + 280, top:260}).hide();
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
	"var map = function (f,ns) {",
	"  if (fp.isNull(ns))",
	"      return [ ];",
	"  else",
	"      return fp.cons(",
	"                 f(fp.hd(ns)), ",
	"                 map(f, fp.tl(ns)));",
	"}",
	"var add1 = function (x) { return fp.add(x,1); };",
	"map( add1, [3,2,5,8] );",
	"map( function (x) { return fp.add(x,x); }, [3,2,5,8] );"
	];

    var pseudo3 = av.code(
	code3,
        {
 	    left: 250,
	    top: 285,
	    lineNumbers: false
        }
    );
    pseudo3.addClass([0,1,2,3,4,5,6,7,8,9,10,11], "mapfuncwidth");
    pseudo3.hide();


    // Slide 1
    av.umsg("Both addBonusPoint and doubleAll use very similar patterns of computation. Given a list ns, they return a new list by applying a function (i.e., add1 for addBonusPoint and doubleIt for doubleAll) to every element of the given list.  This is done by calling the function with the head of the list and then consing that result onto what recursion returns from the tail of the list.  This pattern is highlighted in red below.");
    pseudo1.addClass([7,8,9], "red");
    pseudo2.addClass([7,8,9], "red");
    pseudo1.hide(11);
    pseudo2.hide(11);
    arr_ret_label.hide();
    arr_ret_labela.hide();
    arr_ret.hide();
    arr_ret_label1.hide();
    arr_ret_label1a.hide();
    arr_ret1.hide();
    av.displayInit();

    // Slide 2
    av.umsg("Highlighted in blue, the call to addBonusPoint in the code on the left will return the list also highlighted in blue.   Highlighted in green, the call to doubleAll in the code on the right will return the list also highlighted in green.");
    arr_ret_label.show();
    arr_ret_labela.show();
    arr_ret.show();
    arr_ret.addClass([0,1,2,3], "addBonusPoint");
    arr_ret_label1.show();
    arr_ret_label1a.show();
    arr_ret1.show();
    arr_ret1.addClass([0,1,2,3], "doubleAll");
    pseudo1.show(11);
    pseudo1.addClass(11,"blue");
    pseudo2.show(11);
    pseudo2.addClass(11,"green");
    av.step();

    // Slide 3
    av.umsg('The pattern of computation in each one of these two functions is highlighted by the three red lines.    That pattern is: apply an operation (add1 or doubleIt) to the head and then recur on the tail.   How to capture this pattern in our abstraction?  With functions as first-class values, we can pass in the operation to apply as an additional parameter f.  This is done in the function that now appears below addBonusPoint and doubleAll.   Because the pattern is called the "mapping pattern", we call the function map.');
    map_label.addClass("emphasize");
    map_label.show();
    pseudo3.show();
    pseudo3.hide([9, 10, 11]);
    pseudo3.addClass([5,6,7],"red");
    av.step();

    // Slide 4
    av.umsg("To achieve what addBonusPoint does, we can pass in the add1 function to map as indicated in blue below.");
    pseudo3.show([9,10]);
    pseudo3.addClass([9,10],"blue");
    av.step();

    // Slide 5
    av.umsg("To achieve what doubleAll does, we use a different strategy highlighted in green below.   This strategy passes in an anonymous function instead of the named function doubleIt.  Passing in a function parameter as an anonymous function is a frequently used technique in functional programming.");
    pseudo3.show([11]);
    pseudo3.addClass([11],"green");
    av.step();

    
    av.recorded();
});
