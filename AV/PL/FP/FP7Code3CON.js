/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP7Code3CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
//     var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;

    var arrValues = [1, 3, 2];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
    var arr_label = av.label("l1", {left: leftMargin, top: 0});
    var arr2Values = [1, 2, 3];
    var arr2 = av.ds.array(arr2Values, {indexed: false, left: leftMargin, top: 70});
    var arr2_label = av.label("l2", {left: leftMargin, top: 50});
    var arr_ret = av.ds.array([0], {indexed: false, left: leftMargin, top: 140}).hide();
    var arr_ret_label = av.label("subRt(l1)", {left: leftMargin, top: 100}).hide();
    var arr_ret_labela = av.label("returns:", {left: leftMargin, top: 120}).hide();
    var arr2_ret = av.ds.array([2], {indexed: false, left: leftMargin, top: 210}).hide();
    var arr2_ret_label = av.label("subRt(l2)", {left: leftMargin, top: 170}).hide();
    var arr2_ret_labela = av.label("returns:", {left: leftMargin, top: 190}).hide();
    var arr_append = av.ds.array([1,3,2,1,2,3], {indexed: false, left: leftMargin, top: 280}).hide();
    var arr_append_ret_label1 = av.label("append(l1,l2)", {left: leftMargin, top: 240}).hide();
    var arr_append_ret_label1a = av.label("returns:", {left: leftMargin, top: 260}).hide();
    var map_label = av.label("The reduceRight abstraction", {left:leftMargin + 280, top:240}).hide();
    var code1 =         [
        "var subRt = function (ns) {",
        "  if (fp.isNull(ns)) {",
        "    return 0;",
        "  } else {",
        "    return fp.sub(fp.hd(ns),",
        "                  subRt(fp.tl(ns)));",
        "  }",
        "};",
        "subRt(l1)",   // 0
        "subRt(l2)"        // 2
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
            tags: { "pattern": [5,6] ,
                    "call1": 9,
		    "call2": 10
                  }
        }
    );
    
    var code2 = 
        [
            "var append = function (l1,l2) {",
            "  if (fp.isNull(l1)) {",
            "    return l2;",
            "  } else {",
            "    return fp.cons(fp.hd(l1),",
            "                   append(fp.tl(l1), l2));",
            "    }",
            "};",
	    "append(l1, l2);"
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
            tags: { "pattern": [5,6],
                    "call": 9
                  }
            
        }
    );
    
    var code3 = [
	"var reduceRight = function (f,ns,acc) {",
	"  if (fp.isNull(ns))",
	"    return acc;",
	"  else ",
	"    return f( fp.hd(ns),",
	"              reduceRight(f,fp.tl(ns),acc) );",
	"};",
	"var subRt = function (ns) {",
	"    return reduceRight(fp.sub, ns, 0); };",
	"var append = function (l1,l2) {",
	"    return reduceRight(fp.cons, l1, l2); };"
        ];

    var pseudo3 = av.code(
        code3,
        {
            left: 250,
            top: 270,
            lineNumbers: false,
            tags: { "pattern": [5,6],
                    "call1": [8,9],
                    "call2": [10,11]
                  }
        }
    );
    pseudo3.addClass([0,1,2,3,4,5,6,7,8,9,10,11, 12, 13, 14, 15, 16], "extrawidth");
    pseudo3.hide();


    // Slide 1
    av.umsg('Both subRt and append use a nearly identical pattern of computation.  They apply an operation (i.e., fp.sub for subRt and fp.cons for append) to the head of the list and the result obtained from a recursive call on the tail of the list.  This pattern is highlighted in red below.');
    pseudo1.addClass("pattern", "red");
    pseudo2.addClass("pattern", "red");
    pseudo1.hide("call1");
    pseudo1.hide("call2");
    pseudo2.hide("call");
    av.displayInit();

    // Slide 2
    av.umsg("Highlighted in blue, the two calls to subRt in the code on the left will return the values also highlighted in blue.   Note that subRt(l1) returns (1 - (3 - (2 - 0))) = 0 because we subtract the result of the recursive call in right-associative order.   Because 0 is returned when the list is empty, 2 - 0 is the first subtraction performed.   Similarly subRt(l2) returns (1 - (2 - (3 - 0))) = 2.");
    arr_ret_label.show();
    arr_ret_labela.show();
    arr_ret.show();
    arr_ret.addClass([0], "arrayblue");
    arr2_ret_label.show();
    arr2_ret_labela.show();
    arr2_ret.show();
    arr2_ret.addClass([0], "arrayblue");
    pseudo1.show("call1");
    pseudo1.addClass("call1","blue");
    pseudo1.show("call2");
    pseudo1.addClass("call2","blue");
    av.step();

    // Slide 3
    av.umsg("Highlighted in green, the call to append in the code on the right will return the list also highlighted in green.");
    arr_append_ret_label1.show();
    arr_append_ret_label1a.show();
    arr_append.show();
    arr_append.addClass([0,1,2,3,4,5], "arraygreen");
    pseudo2.show("call");
    pseudo2.addClass("call","green");
    av.step();

    // Slide 4
    av.umsg('The pattern of computation in each one of these two functions is highlighted by the two red lines.  That pattern is: apply an operation to the head of the list and the result of a recursive call on the tail of the list.  To capture this pattern, we pass in the operation to apply to the head and the result of the recursive call as a function parameter f.  The base case for recursion is handled by the third parameter acc, which is the starting point for the computation.  This is done in the reduceRight function that now appears below.');
    map_label.addClass("emphasize");
    map_label.show();
    pseudo3.show();
    pseudo3.hide("call1");
    pseudo3.hide("call2");
    pseudo3.addClass("pattern","red");
    av.step();

    // Slide 5
    av.umsg("To create the subRt function in merely one instruction, we can pass in the fp.sub function to reduceRight as indicated in blue below.");
    pseudo3.show("call1");
    pseudo3.addClass("call1","blue");
    av.step();

    // Slide 6
    av.umsg('To create the append function in merely one instruction, we can pass in the fp.cons function to reduceRight as indicated in green below.');
    pseudo3.show("call2");
    pseudo3.addClass("call2","green");
    av.step();

    
    av.recorded();
});
