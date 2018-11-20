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
	    "addBonusPoint( [1,2,3,4,5] );"
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
	    "doubleAll( [1,2,3,4,5] );"
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
 	    left: 300,
	    top: 250,
	    lineNumbers: false
        }
    );
    


    // Slide 1
    av.umsg("Here we have two local scopes -- one associated with function f1 in lines 2-5 and one associated with function f2 in lines 7-10.");
//    pseudo3.addClass("test");
    av.displayInit();

    
    av.recorded();
});
