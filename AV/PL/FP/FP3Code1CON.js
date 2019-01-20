/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP3Code1CON";
    var av = new JSAV(av_name);

    var leftMargin = 10;
    var topMargin = 20;
    var horizOffset = 100;
    var vertOffset = 50;
    var arr = av.ds.array([14," ", " "], {indexed: false, left: leftMargin, top: topMargin});
    var arr_l = av.ds.array([7,"[ ] ", " "], {indexed: false, left: leftMargin, top: topMargin + vertOffset});
    var arr_r = av.ds.array([26," ", " "], {indexed: false, left: leftMargin + horizOffset, top: topMargin + vertOffset});
    var arr_l_r = av.ds.array([12,"[ ] ", "[ ]"], {indexed: false, left: leftMargin , top: topMargin + 2 * vertOffset});
    var arr_r_l = av.ds.array([topMargin," ", "[ ]"], {indexed: false, left: leftMargin + 100 , top: topMargin + 2 * vertOffset});
    var arr_r_l_l = av.ds.array([17,"[ ] ", "[ ]"], {indexed: false, left: leftMargin + 100 , top: topMargin + 3 * vertOffset});
    var arr_r_r = av.ds.array([31,"[ ] ", "[ ]"], {indexed: false, left: leftMargin + 2 * horizOffset , top: topMargin + 2 * vertOffset});
    var ptr_l = av.pointer("", arr_l,{left: leftMargin + .3 * horizOffset, top: -vertOffset/2});
    var ptr_r = av.pointer("", arr_r,{left: leftMargin - .4 * horizOffset, top: -vertOffset/2});
    var ptr_l_r = av.pointer("", arr_l_r,{left: leftMargin + .6 * horizOffset, top: -vertOffset/2});
    var ptr_r_l = av.pointer("", arr_r_l,{left: leftMargin + .3 * horizOffset, top: -vertOffset/2});
    var ptr_r_l_l = av.pointer("", arr_r_l_l,{left: leftMargin + .3 * horizOffset, top: -vertOffset/2});
    var ptr_r_r = av.pointer("", arr_r_r,{left: leftMargin - .4 * horizOffset, top: -vertOffset/2});
    var pseudo = av.code(
	[
	    "var sumTree = function (tree) {", // 1
	    "    if (??????)",		       // 2
	    "        return ??????;",		       // 3
	    "    if (fp.isNull(tree))",	       // 4
	    "        return 0;",	       // 5
	    "    else if (??????)",	       // 6
	    "        return ??????;",	       // 7
	    "    else if (fp.isList(fp.hd(tree)))", // 8
	    "        return fp.add( ",		    // 9
            "                       sumTree(fp.hd(tree))", // 10
	    "                       sumTree(fp.tl(tree))", // 11
	    "                     );", // 12
	    "    else",
	    "        return ??????;", // 14
	    "        return fp.add( fp.hd(tree),",	     // 15
            "                       sumTree(fp.tl(tree))",   // 16
            "                     );", // 17
	    "}"
	],
	{
	    lineNumbers: false
	}
    );

    // Slide 1
    av.umsg("Essential to developing recursive functions is analyzing, at any level of the recursion, the cases that the function must be prepared to handle and, for each one of those cases, what should be returned to the prior level of recursion.");
    pseudo.hide([4,5,8,9,10,11,12,15,16,17]);
    
    av.displayInit();

    // Slide 2
    av.umsg("When the argument to sumTree is null, as it would be for the highlighted item, then the sum of all the numbers in an empty tree is zero; so that is what we return.");
    pseudo.hide([2,3]);
    pseudo.show([4,5]);
    arr_l.highlight(1);
    av.step();

    // Slide 3
    av.umsg("When the argument to sumTree is a list whose head is also a list, as it would be for the two-element highlighted list, then we must ...");
    pseudo.hide([6,7]);
    pseudo.show([8,9,10,11,12]);
    arr_l.unhighlight(1);
    arr.highlight([1,2]);
    av.step();

    // Slide 4
    av.umsg("... recur to get the sum of the items in the head ...");
//    pseudo.hide([6,7]);
//    pseudo.show([8,9,10,11,12]);
//    arr_l.unhighlight(1);
//    arr.highlight([1,2]);
    pseudo.highlight(10);
    arr.unhighlight(2);
    av.step();

    // Slide 5
    av.umsg(" ... recur to get the sum of the items in the tail, and ...");
//    pseudo.hide([6,7]);
//    pseudo.show([8,9,10,11,12]);
//    pseudo.unhighlight(10);
    pseudo.unhighlight(10);
    pseudo.highlight(11);
    arr.unhighlight([1]);
    arr.highlight([2]);
    av.step();

    // Slide 6
    av.umsg("... finally return the sum of those two sums.");
    pseudo.highlight([9,10,12]);
    arr.highlight([1,2]);
    av.step();

    // Slide 7
    av.umsg("When the argument to sumTree is a list whose head is a number, as it would be for the three-element highlighted list, then we must ... ");
    pseudo.unhighlight([9,10,11,12]);
    arr.unhighlight([1,2]);
    pseudo.hide([14]);
    pseudo.show([15,16,17]);
    arr_r.highlight([0,1,2]);
    av.step();

    // Slide 8
    av.umsg("... recur to get the sum of the items in the tail, which here is a two-element list, and ...");
    pseudo.highlight(16);
    arr_r.unhighlight([0]);
    av.step();

    // Slide 9
    av.umsg("... return the sum of the head (here 26) and what is returned from the recursive call on the tail.");
    pseudo.highlight([15,17]);
    arr_r.highlight([0,1,2]);
    av.step();

    av.recorded();
});
