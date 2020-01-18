/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP9Code1CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var closure_x = leftMargin;
    var closure_y = 100;
    var closure_w = 290;
    var closure_h = 280;
//    var offset_for_each_var = 35;
//    var offset_between_var_label_and_cell = 20;

    var ll = av.label("ns", {left: leftMargin, top: 0});
    var l = av.ds.array([2, 3, 5], {indexed: false, left: leftMargin, top: 20});

    //JSAV apparent error.  Whenever later try to reference a rect by
    //its variable name, the debugger told me the var was undefined.
    //Consequently I couldn't do things like toggle their visibility
    //with show and hide
//    var clo5 = av.g.rect(closure_x, closure_y, closure_w, closure_h).hide();
    var lab5 = av.label("k is multiply-by-5 function", {left: closure_x + 10, top: closure_y - 10}).hide();
//    var clo3 = av.g.rect(closure_x+10, closure_y+30, closure_w - 20, closure_h - 40).hide();
    var lab3 = av.label("k is multiply-by-3 function", {left: closure_x + 20, top: closure_y + 20}).hide();
//    var clo2 = av.g.rect(closure_x+20, closure_y+60, closure_w - 40, closure_h - 80).hide();
    var lab2 = av.label("k is multiply-by-2 function", {left: closure_x + 30, top: closure_y + 50}).hide();
//    var cloid = av.g.rect(closure_x+30, closure_y+90, closure_w - 50, closure_h - 120).hide();
    var labid = av.label("k is identity function", {left: closure_x + 40, top: closure_y + 80}).hide();
    var labcps_cont = av.label("Closure of cps_continuation", {left: closure_x + 40, top: closure_y + 150}).hide();
    var code1 =         [

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

    
    var pseudo1 = av.code(
        code1,
        {
            left: leftMargin + 300,
            top: 0,
            lineNumbers: true,
	    tags: {
		"topcall" : 12,
		"basecase": 4,
		"reccall": [6,9],
		"contin": [7,8]
	    }
        }
    );
    

    // Slide 1
    av.umsg('The code for the CPS product3 function appears below.  When programming in the continuation-passing style (CPS), every function takes an extra parameter, namely a continuation.  That parameter is a function that defines the computation that must occur at each stage.');
    l.show();
    
    av.displayInit();

    // S 2
    av.umsg('To start the CPS version of our product function, we call on a helper function called cps_product.  Note from line 2 that cps_product takes a second parameter beyond the list ns.   We call the second parameter, here denoted by k, the continuation.  It is a function and in the top-level call made to cps_product, we "initialize" k to the identity function.   Hence at this level, the closure of cps_product contains a variable k that is the identity function.  As we progress, you will see why that choice was made.');

    var cloid = av.g.rect(closure_x+30, closure_y+90, closure_w - 60, closure_h - 120).show();
    console.log(typeof cloid);
    labid.show();
    labcps_cont.show();
    pseudo1.highlight("topcall");
    av.step();

    // S 3
    av.umsg('As cps_product works with the first element of the list, the recursive call in lines 6-9 executes.   A new continuation is created in lines 7-8.   That continuation, which is passed in for k at the next level, applies the old continuation to the result of a new multiply-by-2 operation.');
    var clo2 = av.g.rect(closure_x+20, closure_y+60, closure_w - 40, closure_h - 80).show();
    pseudo1.unhighlight("topcall");
    pseudo1.highlight("reccall");
    pseudo1.addClass("contin", "red");
    lab2.show();
    l.highlight(0);
    av.step();
    
    // S 4
    av.umsg('As cps_product recurs down the list, it next encounters 3 and again the recursive call in lines 6-9 executes.   A new continuation is created in lines 7-8.   That continuation, which is passed in for k at the next level, applies the old continuation to the result of a new multiply-by-3 operation.');
    var clo3 = av.g.rect(closure_x+10, closure_y+30, closure_w - 20, closure_h - 40).show();
    lab3.show();
    l.unhighlight(0);
    l.highlight(1);
    av.step();
    
    // S 5
    av.umsg('cps_product next encounters the 5 at the end of the list and once more the recursive call in lines 6-9 executes.   A new continuation is created in lines 7-8.   That continuation, which is passed in for k at the next level, applies the old continuation to the result of a new multiply-by-5 operation.');
    var clo5 = av.g.rect(closure_x, closure_y, closure_w, closure_h).show();
    lab5.show();
    l.unhighlight(1);
    l.highlight(2);
    av.step();
    
    // S 6
    av.umsg('We have now reached the base case and are ready to unwind from the recursion at line 4.  In "regular" recursion, which is not tail recursive, we would just return 1, the identity value for the chain of multiplications that occur as we work our way back.   However, in the tail recursive structure of CPS, all we have to do is return the current continuation applied to 1.   That current continuation first will multiply 1 by 5.  But there are deeper continuations nested inside the current continuation, the next of which will take the 5 we have already computed and ...');
    pseudo1.unhighlight("reccall");
    pseudo1.removeClass("contin", "red");
    pseudo1.highlight("basecase");
    lab5.addClass("emphasize");
    l.unhighlight(2);
    av.step();
    
    // S 7
    av.umsg('Multiply by 3, producing 15, which is consequently followed by ...');
    lab5.removeClass("emphasize");
    lab3.addClass("emphasize");
    av.step();
    
    // S 8
    av.umsg('Multiply by 2, producing 30, which is consequently followed by ...');
    lab3.removeClass("emphasize");
    lab2.addClass("emphasize");
    av.step();
    
    // S 9
    av.umsg('An application of the identity function (i.e., the initial value passed in for k from the top-level call) to 30.   The result, which is obviously 30, is the final answer returned by this tail-recursive function.  We now see why it was important to pass in the identity function for k in the original call.');
    lab2.removeClass("emphasize");
    labid.addClass("emphasize");
    av.step();
    
    av.recorded();
});
