/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP9Code1CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var closure_x = leftMargin;
    var closure_y = 100;
    var closure_w = 250;
    var closure_h = 280;
//    var offset_for_each_var = 35;
//    var offset_between_var_label_and_cell = 20;

    var ll = av.label("ns", {left: leftMargin, top: 0});
    var l = av.ds.array([2, 3, 5], {indexed: false, left: leftMargin, top: 20}).hide();

    var clo1 = av.g.rect(closure_x, closure_y, closure_w, closure_h);
    var lab5 = av.label("k is multiply-by-5", {left: leftMargin + 30, top: 200});
    var clo2 = av.g.rect(leftMargin+10, 130, 230, 240);
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
            left: leftMargin + 270,
            top: 0,
            lineNumbers: true,
	    tags: {
		"topcall" : 13
	    }
        }
    );
    

    // Slide 1
    av.umsg('Our database is a list of records where each record r is a list whose head is the name of a salesperson and whose tail is a list of their sales.  The sample database on the left below has three such records. Ultimately our answer will be returned by applying reduce to another list of records produced by applying the map operation to each list in the database.   The function we give to the map operation in line 20 is called mapper (lines 3-7).  How should mapper determine the [name, totalSales] pair it must return?');
    l.show();
    av.displayInit();

    
    av.recorded();
});
