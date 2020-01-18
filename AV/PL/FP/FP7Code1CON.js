/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP7Code1CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
//     var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;

    var arrValues = [-1, -8, 4, 3];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
    var arr_label = av.label("ns", {left: leftMargin, top: 0});
    var arr_ret = av.ds.array([4,3], {indexed: false, left: leftMargin, top: 110});
    var arr_ret_label = av.label("keepPositive", {left: leftMargin, top: 70});
    var arr_ret_labela = av.label("returns:", {left: leftMargin, top: 90});
    var arr_ret1 = av.ds.array([-8,4], {indexed: false, left: leftMargin, top: 220});
    var arr_ret_label1 = av.label("keepEven", {left: leftMargin, top: 180});
    var arr_ret_label1a = av.label("returns:", {left: leftMargin, top: 200});
    var map_label = av.label("The filtering abstraction", {left:leftMargin + 280, top:300}).hide();
    var code1 =         [
        "var isPos = function (n) {",
        "  return fp.isGT(n, 0);",
        "};",
        "",
        "var keepPositive = function (ns) {",
        "  if (fp.isNull(ns))",
        "     return [ ];",
        "  else if (isPos(fp.hd(ns)))",
        "     return fp.cons(fp.hd(ns),",
        "                    keepPositive(fp.tl(ns)));",
        "  else",
        "     return keepPositive(fp.tl(ns));",
        "};",
        "keepPositive( [-1, -8, 4, 3] );"
    ];

    
    var pseudo1 = av.code(
        code1,
        {
            relativeTo:arr,
            anchor:'right top',
            myAnchor:'left top',
            left: leftMargin,
            top: 0,
            lineNumbers: false,
            tags: { "pattern": [8,9,10] ,
		    "call": 14
		  }
        }
    );
    
    var code2 =         [
        "var isEven = function (n) {",
        "  return fp.isZero(n % 2);",
        "};",
        "",
        "var keepEven = function (ns) {",
        "  if (fp.isNull(ns))",
        "    return [ ];",
        "  else if (isEven(fp.hd(ns)))",
        "    return fp.cons(fp.hd(ns),",
        "                   keepEven(fp.tl(ns)));",
        "  else",
        "    return keepEven(fp.tl(ns));",
        "};",
        "keepEven( [-1, -8, 4, 3] );"
    ];

    var pseudo2 = av.code(
        code2,
        {
            relativeTo:pseudo1,
            anchor:'right top',
            myAnchor:'left top',
            left: leftMargin,
            top: 0,
            lineNumbers: false,
            tags: { "pattern": [8,9,10],
		    "call": 14
		  }
            
        }
    );
    
    var code3 = [
        "var filter = function (pred,ns) {",
        "  if (fp.isNull(ns))",
        "    return [ ];",
        "  else if (pred(fp.hd(ns)))",
        "    return fp.cons(fp.hd(ns), ",
        "                   filter(pred,fp.tl(ns)));",
        "  else ",
        "    return filter(pred,fp.tl(ns));",
        "}",
	"filter(isPos, [-1, -8, 4, 3] );",
        "filter(function (n) { return fp.isZero(n % 2); },",
	"       [-1, -8, 4, 3] );"
	//"filter(isEven, [-1, -8, 4, 3] );
        ];

    var pseudo3 = av.code(
        code3,
        {
            left: 250,
            top: 320,
            lineNumbers: false,
            tags: { "pattern": [4,5,6],
		    "call1": 10,
		    "call2": [11,12]
		  }
        }
    );
    pseudo3.addClass([0,1,2,3,4,5,6,7,8,9,10,11], "extrawidth");
    pseudo3.hide();


    // Slide 1
    av.umsg('Both keepPositive and keepEven use very similar patterns of computation. Given a list ns, they return a new list by applying a boolean-valued "filtering" function (i.e., isPos for keepPositive and isEven for keepEven) to every element of the given list.  This is done by applying the filtering function to the head of the list and, if that value passes the filter test, then consing it onto what recursion returns from the tail of the list.  This pattern is highlighted in red below.');
    pseudo1.addClass("pattern", "red");
    pseudo2.addClass("pattern", "red");
    pseudo1.hide("call");
    pseudo2.hide("call");
    arr_ret_label.hide();
    arr_ret_labela.hide();
    arr_ret.hide();
    arr_ret_label1.hide();
    arr_ret_label1a.hide();
    arr_ret1.hide();
    av.displayInit();

    // Slide 2
    av.umsg("Highlighted in blue, the call to keepPositive in the code on the left will return the list also highlighted in blue.   Highlighted in green, the call to keepEven in the code on the right will return the list also highlighted in green.");
    arr_ret_label.show();
    arr_ret_labela.show();
    arr_ret.show();
    arr_ret.addClass([0,1,2,3], "arrayblue");
    arr_ret_label1.show();
    arr_ret_label1a.show();
    arr_ret1.show();
    arr_ret1.addClass([0,1,2,3], "arraygreen");
    pseudo1.show("call");
    pseudo1.addClass("call","blue");
    pseudo2.show("call");
    pseudo2.addClass("call","green");
    av.step();

    // Slide 3
    av.umsg('The pattern of computation in each of these two functions is highlighted by the three red lines.    That pattern is: apply a boolean test (that is, a predicate) to the head and, if the test is passed, cons the head onto the return list.   How to capture this pattern in our abstraction?  With functions as first-class values, we can pass in the test to apply as an additional parameter called \'pred\'.  This is done in the filter function that now appears below keepPositive and keepEven.');
    map_label.addClass("emphasize");
    map_label.show();
    pseudo3.show();
    pseudo3.hide("call1");
    pseudo3.hide("call2");
    pseudo3.addClass("pattern","red");
    av.step();

    // Slide 4
    av.umsg("To achieve what keepPositive does, we can pass in the isPos function to filter as indicated in blue below.");
    pseudo3.show("call1");
    pseudo3.addClass("call1","blue");
    av.step();

    // Slide 5
    av.umsg("To achieve what keepEven does, we illustrate passing in an anonymous function instead of the named function isEven.");
    pseudo3.show("call2");
    pseudo3.addClass("call2","green");
    av.step();

    
    av.recorded();
});
