/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP9Code2CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
//     var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;

//     var arrValues = [3, 2, 5, 8];
//     var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
//     var arr_label = av.label("ns", {left: leftMargin, top: 0});
//     var arr_ret = av.ds.array([4,3,6,9], {indexed: false, left: leftMargin, top: 110});
//     var arr_ret_label = av.label("addBonusPoint", {left: leftMargin, top: 70});
//     var arr_ret_labela = av.label("returns:", {left: leftMargin, top: 90});
//     var arr_ret1 = av.ds.array([6,4,10,16], {indexed: false, left: leftMargin, top: 220});
//     var arr_ret_label1 = av.label("doubleAll", {left: leftMargin, top: 180});
//     var arr_ret_label1a = av.label("returns:", {left: leftMargin, top: 200});
//     var map_label = av.label("The mapping abstraction", {left:leftMargin + 280, top:260}).hide();
    var code1 =         [
	"var product1 = function(ns) {", // 1
	"  if (fp.isNull(ns)) {",	 // 2
	"    return 1;",		 // 3
	"  } else {",			 // 4
	"    return fp.mul(fp.hd(ns),",	 // 5
	"                  product1(fp.tl(ns)));", // 6
	"  }",					   // 7
	"}"					   // 8
        ];

    
    var pseudo1 = av.code(
        code1,
	{
// 	    relativeTo:arr,
//  	    anchor:'right top',
//  	    myAnchor:'left top',
	    left: leftMargin,
	    top: 0,
            lineNumbers: true
        }
    );
    
    //    pseudo1.addClass([0,1,2,3,4,5,6,7,8], "smaller");
    var code2 =         [
	"var product2 = function (ns) {", // 1
	"  var helper = function (ns,a) {", // 2
	"    if (fp.isNull(ns))  {",	    // 3
	"      return a;",		    // 4
	"    } else {",			    // 5
	"      return helper(fp.tl(ns), ",  // 6
	"                    fp.mul(a,fp.hd(ns)));", // 7
	"    }",				     // 8
	"  };",					     // 9
	"  return helper(ns,1);",		     // 10
	"}"
    ];

    var pseudo2 = av.code(
	code2,
        {
	    relativeTo:pseudo1,
	    anchor:'right top',
	    myAnchor:'left top',
	    left: leftMargin + 30,
	    top: 0,
	    lineNumbers: true
        }
    );
    
    var code3 = [
	"var product3 = function (ns) {", // 
	"  var cps_product = function (ns,k) {", // 2
	"    if (fp.isNull(ns)) {",		 // 3
	"       return k(1);",			 // 4
	"    } else {",				 // 5
	"       return cps_product(fp.tl(ns),",	 // 6
	"                          function (x) {", // 7
	"                             return k(fp.mul(x,fp.hd(ns)));", // 8
	"                          });",			       // 9
	"    }",						       // 10
	"  };",							       // 11
	"  return cps_product(ns, function (x) { return x; });",       // 12
	"}"							       // 13
	];

    var pseudo3 = av.code(
	code3,
        {
// 	    relativeTo:pseudo2,
// 	    anchor:'right top',
// 	    myAnchor:'left top',
	    left: leftMargin + 175,
	    top: 250,
	    lineNumbers: true
        }
    );
    pseudo3.addClass([0,1,2,3,4,5,6,7,8,9,10,11,12,13], "extrawidth");
//     pseudo3.hide();


    // Slide 1
    av.umsg('product1 is "straightforward" recursion that is not tail recursive because a multiplication occurs after we return from the recursive call in lines 5-6.  Because multiplication occurs after we start to unwind from recursion, the base case in lines 2-3 returns the identity element for multiplication, namely 1.  Because it is not tail recursive, TCO could not be performed on product 1.');
    pseudo1.highlight([2,3,5,6]);
    av.displayInit();

    av.umsg('product2 is tail-recursive because it uses the accumulator technique.  The multiplication occurs within the second argument to the recursive call in lines 6-7.  This second argument is the accumulator and, because the multiplication takes place before we start unwinding from recursion, all we have to do upon reaching the base case in lines 3-4 is return the already computed answer.  Unlike product1, the computations occur as we descend into recursion, not as we unwind from recursion.  TCO could be performed on product2.');
    pseudo2.highlight([3,4,6,7]);
    av.step();

    av.umsg('Like product2, product3 is tail recursive, and thus TCO could be performed on it.  However, unlike product2, product3 does not perform a multiplication inside the second argument of the recursive call in lines 6-9.  Instead that second argument is now a function (the continuation) that wraps the necessary multiplication inside its definition.  product3 is "building up" a function definition in its second argument whereas product2 built up a numeric value.');
    pseudo3.highlight([6,7,8,9]);
    av.step();

    av.umsg('When we reach the base case of product3 in lines 3-4, instead of merely returning an already computed numeric value, we must call the function we have defined with all those multiplications nested inside it, initially passing in 1, the identity element for multiplication.  So although the computations occur as we begin unwinding from recursion, they are all performed in one function call, namely the call to the continuation that we have built up.   No computations are performed after returning from the call to cps_product in lines 6-9.');
    pseudo3.highlight([3,4]);
    
    av.recorded();
});
