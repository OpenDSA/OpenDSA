/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP3Code1CON";
    var av = new JSAV(av_name);

    var leftMargin = 10;
    var arr = av.ds.array([14," ", " "], {indexed: false, left: leftMargin, top: 20});
    var arr_l = av.ds.array([7,"[ ] ", " "], {indexed: false, left: leftMargin, top: 70});
    var arr_r = av.ds.array([26," ", " "], {indexed: false, left: leftMargin + 100, top: 70});
    var arr_l_r = av.ds.array([12,"[ ] ", "[ ]"], {indexed: false, left: leftMargin , top: 120});
    var arr_r_l = av.ds.array([20," ", "[ ]"], {indexed: false, left: leftMargin + 100 , top: 120});
    var arr_r_l_l = av.ds.array([17,"[ ] ", "[ ]"], {indexed: false, left: leftMargin + 100 , top: 170});
    var arr_r_r = av.ds.array([31,"[ ] ", "[ ]"], {indexed: false, left: leftMargin + 200 , top: 120});
    var pseudo = av.code(
	[
	    "var sumTree = function (tree) {",
	    "    if (fp.isNull(tree))",
	    "        return 0;",
	    "    else if (fp.isList(fp.hd(tree)))",
	    "        return fp.add( sumTree(fp.hd(tree))",
	    "                       sumTree(fp.tl(tree)));",
	    "    else",
	    "        return fp.add( fp.hd(tree), sumTree(fp.tl(tree)));",
	    "}"
	],
	{
	    lineNumbers: false
	}
    );
    
//    var arrRet = av.ds.array(["?????"], {indexed: false, left: 100, top: 90});
//    arrRet.addClass(0,"wider");
//    arrRet.hide();
//    var labelReturn = av.label("Return", {left: 35, top: 94});
//    labelReturn.hide();

    // Slide 1
    av.umsg("Following the alternatives in the BNF definition of a list, we want a function that returns the sum of the numbers in list below");
//    pseudo.hide([3,5,8]);
    
    av.displayInit();

    // Slide 2
    av.recorded();
});
