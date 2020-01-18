/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP7Code2CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
//     var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;

    var arrValues = [3, 2, 4, 1];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
    var arr_label = av.label("ns", {left: leftMargin, top: 0});
    var arr_ret = av.ds.array([10], {indexed: false, left: leftMargin, top: 110});
    var arr_ret_label = av.label("sum", {left: leftMargin, top: 70});
    var arr_ret_labela = av.label("returns:", {left: leftMargin, top: 90});
    var arr_ret1 = av.ds.array([1, 4, 2, 3], {indexed: false, left: leftMargin, top: 220});
    var arr_ret_label1 = av.label("reverse", {left: leftMargin, top: 180});
    var arr_ret_label1a = av.label("returns:", {left: leftMargin, top: 200});
    var map_label = av.label("The reduce abstraction", {left:leftMargin + 280, top:250}).hide();
    var code1 =         [
        "var sum = function (ns) {",
        "  var helper = function (ns,a) {",
        "    if (fp.isNull(ns))",
        "      return a;",
        "    else",
        "      return helper(fp.tl(ns), ",
        "                    fp.add(a,fp.hd(ns)));",
        "  };",
        "  return helper(ns,0);",
        "};",
        "sum ( [3, 2, 4, 1] );"

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
            tags: { "pattern": [6,7] ,
                    "call": 11
                  }
        }
    );
    
    var code2 = 
        [
            "var reverse = function (ns) {",
            "  var helper = function (ns,a) {",
            "  if (fp.isNull(ns))",
            "    return a;",
            "   else",
            "     return helper(fp.tl(ns),",
            "                   fp.cons(fp.hd(ns),a));",
            "    };",
            "  return helper(ns,[]);",
            "};",
            "reverse ( [3, 2, 4, 1] );"
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
            tags: { "pattern": [6,7],
                    "call": 11
                  }
            
        }
    );
    
    var code3 = [
        "var reduce = function (f,ns,acc) {",
        "  if (fp.isNull(ns))",
        "    return acc;",
        "  else ",
        "    return reduce(f,fp.tl(ns),",
        "                  f(acc,fp.hd(ns)));",
        "};",
        "var sum = function (ns) { return reduce(fp.add,ns,0); };",
        "var reverse = function (ns) { ",
        "     return reduce(  // flip parameters",
        "                     function (a,n) { ",
        "                        return fp.cons(n,a); },",
	"                     ns, ",
	"                     []",
	"                   ); ",
        "};"

        ];

    var pseudo3 = av.code(
        code3,
        {
            left: 250,
            top: 270,
            lineNumbers: false,
            tags: { "pattern": [5,6],
                    "call1": 8,
                    "call2": [9,10,11,12,13,14,15,16]
                  }
        }
    );
    pseudo3.addClass([0,1,2,3,4,5,6,7,8,9,10,11, 12, 13, 14, 15, 16], "extrawidth");
    pseudo3.hide();


    // Slide 1
    av.umsg('Both sum and reverse have helper functions with an accumulator that use a nearly identical pattern of computation.  That helper function takes an operation (i.e., fp.add for sum and fp.cons for reverse) and updates the accumulator by applying the operation to the head of the list and the accumulator to create a "bigger" accumulator that is passed in to the recursive call.  This pattern is highlighted in red below.');
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
    av.umsg("Highlighted in blue, the call to sum in the code on the left will return the value also highlighted in blue.   Highlighted in green, the call to reverse in the code on the right will return the list also highlighted in green.");
    arr_ret_label.show();
    arr_ret_labela.show();
    arr_ret.show();
    arr_ret.addClass([0], "arrayblue");
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
    av.umsg('The pattern of computation in each one of these two functions is highlighted by the two red lines.    That pattern is: apply an operation to the head of the list and an accumulator to create a "bigger" version of the accumulator as we work our way down the list in the recursive call.   How to capture this pattern in our abstraction?  With functions as first-class values, we can pass in the operation to apply to the head and the accumulator as a function parameter f.  This is done in the reduce function that now appears below.');
    map_label.addClass("emphasize");
    map_label.show();
    pseudo3.show();
    pseudo3.hide("call1");
    pseudo3.hide("call2");
    pseudo3.addClass("pattern","red");
    av.step();

    // Slide 4
    av.umsg("To create the sum function in merely one instruction, we can pass in the fp.add function to reduce as indicated in blue below.");
    pseudo3.show("call1");
    pseudo3.addClass("call1","blue");
    av.step();

    // Slide 5
    av.umsg('To create the reverse function in merely one call to reduce, we can pass in a function to reduce that uses cons as indicated in green below.   There is a small complication in that when reduce applies the operation to the head and accumulator, it uses the accumulator as the first argument.   But fp.cons has its list (the accumulator) as its second argument.   So we must create a function that compensates for this "flip" in the order of parameters.');
    pseudo3.show("call2");
    pseudo3.addClass("call2","green");
    av.step();

    
    av.recorded();
});
