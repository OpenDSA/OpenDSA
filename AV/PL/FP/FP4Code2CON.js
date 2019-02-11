/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP4Code2CON";
    var arrValues = [3, 5, 2, 8];
    var av = new JSAV(av_name);

    var leftMargin = 10;
    var arr_cell_offset = 30;
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin + 30, top: 20}).hide();

    var pseudo = av.code(
        [
	    "var split = function (pivot,ns) {", // 1
	    "    return split_helper(?????);",  // 2
	    "    return split_helper(pivot, ns, [ ], [ ]);", // 3
	    "};",						  // 4
	    "var split_helper = function (pivot,ns,smalls,bigs) {", // 5
	    "    if (fp.isNull(ns)) {",				// 6
	    "       return fp.cons(?????);",			// 7
	    "       return fp.cons(smalls,fp.cons(bigs,[]));",	// 8
	    "    } else if (fp.isLT(fp.hd(ns), pivot)) {",		// 9
	    "       return split_helper(pivot, ?????);",		// 10
	    "       return split_helper(pivot, fp.tl(ns), ?????);", // 11
	    "       return split_helper(pivot, fp.tl(ns),", // 12
	    "                           fp.cons(fp.hd(ns), smalls), ?????)", // 13
	    "                           fp.cons(fp.hd(ns), smalls), bigs);", // 14
	    "    } else {",						   // 15
	    "       return split_helper(pivot, ?????);",	// 16
	    "       return split_helper(pivot, fp.tl(ns), ????);", // 17
	    "       return split_helper(pivot, fp.tl(ns),", // 18
	    "                           smalls, ?????)",    // 19
	    "                           smalls, fp.cons(fp.hd(ns),bigs));", // 20
	    "    }",		// 21
	    "};"		// 22
        ],
        {
            lineNumbers: false,
            "tags": {
                "init-hidden": [3,8,11,12,13,14,17,18,19,20],
		"call-ques": 2,
		"call-ans" : 3,
		"else-lt1": 9,
		"else-lt2": 10,
		"else-lt3": 11,
		"else-lt4": 12,
		"else-lt5": 13,
		"else-lt6": 14,
		"else-gt1": 16,
		"else-gt2": 17,
		"else-gt3": 18,
		"else-gt4": 19,
		"else-gt5": 20,
		"else-gt6": 21
            }
        }
    );
    
    // Vertical arrow in step 2
    var arrow1_x = leftMargin + 45;
    var arrow1 = av.g.line(arrow1_x, 15, arrow1_x, 35,
                           {"arrow-end": "classic-wide-long",
                            opacity: 100, "stroke-width": 2});
    arrow1.hide();

    // Label in step 2
    var label_hd = av.label("hd ns", {left: arrow1_x - 16, top: -20}).hide();

    //horizontal arrow in step 2
    var arrow2 = av.g.line(leftMargin + 75, 25, leftMargin + 160, 25,
                           {"arrow-end": "classic-wide-long", opacity: 0,
                            "stroke-width": 2});
    arrow2.hide();
    var label_tl = av.label("tl", {left: leftMargin + 75, top: -20}).hide();

    var pivot  = av.ds.array([4], {indexed: false, left: leftMargin + 40, top: 90});
    var pivotLab = av.label("pivot", {left: leftMargin, top: 94});
    var smallsRet = av.ds.array([3], {indexed: false, left: leftMargin + 40, top: 160});
    smallsRet.hide();
    var smallsReturn = av.label("smalls initially [ ]", {left: leftMargin, top: 164});
    smallsReturn.hide();
    var bigsRet = av.ds.array([5], {indexed: false, left: leftMargin + 40, top: 230});
    bigsRet.hide();
    var bigsReturn = av.label("bigs initially [ ]", {left: leftMargin, top: 234});
    bigsReturn.hide();
    var label_ns = av.label("ns", {left: leftMargin, top: 20});

    // Slide 1
    av.umsg("When using the accumulator pattern, it is the helper function that does the heavy lifting.   The responsibility of the top-level function (here split) is to start the accumulator argument at its correct value.");
    pseudo.hide("init-hidden");
    arr.show();
    av.displayInit();

    // Slide 2
    av.umsg("Since here the accumulator will be a list of two lists, the top-level function calls split_helper with two empty lists for the arguments smalls and bigs.");
    pseudo.hide("call-ques");
    pseudo.show("call-ans");
    pseudo.highlight("call-ans");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    label_ns.hide();
    smallsReturn.show();
    bigsReturn.show();
    av.step();

    // Slide 3
    av.umsg("We recur down the list until ns is passed in as a null list.   Here the head of the list is less than the pivot.");
    pseudo.unhighlight("call-ans");
    pseudo.highlight("else-lt1");
    pseudo.highlight("else-lt2");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    smallsReturn.show();
    av.step();

    // Slide 4
    av.umsg("When we recur on split_helper, the second argument should be the tail of the current list.");
    pseudo.highlight("else-lt1");
    pseudo.hide("else-lt2");
    pseudo.show("else-lt3");
    pseudo.highlight("else-lt3");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    smallsReturn.show();
    av.step();

    // Slide 5 -- This complete the less than call
    av.umsg("When we recur on split_helper, the smalls argument must now include the head of the current list while the bigs argument should not change.");
    pseudo.highlight("else-lt1");
    pseudo.hide("else-lt3");
    pseudo.show("else-lt4");
    pseudo.show("else-lt6");
    pseudo.highlight("else-lt4");
    pseudo.highlight("else-lt6");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    smallsReturn.show();
    av.step();

    // Slide 6
    av.umsg("Keep recurring, moving down the list ns and building up the two-component accumulator appropriately.  On this call, the head of the list is bigger than the pivot.");
    arr.highlight(0);
    arrow1.translate(arr_cell_offset,0);
    arrow2.translatePoint(0,arr_cell_offset,0);
    label_hd.hide();
    label_hd = av.label("hd ns", {left: arrow1_x - 16 + arr_cell_offset, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 75 + arr_cell_offset, top: -20});
    smallsRet.hide();
    smallsRet = av.ds.array([3], {indexed: false, left: leftMargin + 50, top: 160});
    smallsRet.show();
    smallsReturn.hide();
    smallsReturn = av.label("smalls", {left: leftMargin, top: 164});
//     bigsReturn.show();
//     bigsRet.hide();
//     bigsRet = av.ds.array([5], {indexed: false, left: leftMargin + 50, top: 230});
//     bigsRet.show();
//     bigsReturn.hide();
//     bigsReturn = av.label("bigs", {left: leftMargin, top: 234});
//     bigsReturn.show();
    pseudo.unhighlight("else-lt1");
    pseudo.unhighlight("else-lt4");
    pseudo.unhighlight("else-lt6");
    pseudo.highlight("else-gt1");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    av.step();



    // Slide 7
    av.umsg("The second argument on the next recursive call will be the tail of the current list.");
    pseudo.hide("else-gt1");
    pseudo.show("else-gt2");
    pseudo.highlight("else-gt2");
    av.step();


    // Slide 8 -- This completes the GT call
    av.umsg("Because the head of the list is bigger than the pivot, when we recur on split_helper, the smalls argument will not change while the bigs argument will now include the head.");
    //    pseudo.highlight("else-lt1");
    pseudo.hide("else-gt2");
    pseudo.show("else-gt3");
    pseudo.show("else-gt5");
    pseudo.highlight("else-gt3");
    pseudo.highlight("else-gt5");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    av.step();

    // Slide 9
    av.umsg("Keep recurring, moving down the list ns and building up the two-component accumulator appropriately.  On this call, the head of the list is smaller than the pivot, so ...");
    arr.highlight(1);
    arrow1.translate(arr_cell_offset,0);
    arrow2.translatePoint(0,arr_cell_offset,0);
    label_hd.hide();
    label_hd = av.label("hd ns", {left: arrow1_x - 16 + 2 * arr_cell_offset, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 75 + 2 * arr_cell_offset, top: -20});
    smallsRet.hide();
    smallsRet = av.ds.array([3], {indexed: false, left: leftMargin + 50, top: 160});
    smallsRet.show();
    smallsReturn.hide();
    smallsReturn = av.label("smalls", {left: leftMargin, top: 164});
    bigsReturn.show();
    bigsRet.hide();
    bigsRet = av.ds.array([5], {indexed: false, left: leftMargin + 50, top: 230});
    bigsRet.show();
    bigsReturn.hide();
    bigsReturn = av.label("bigs", {left: leftMargin, top: 234});
    bigsReturn.show();
    pseudo.highlight("else-lt1");
    pseudo.highlight("else-lt4");
    pseudo.highlight("else-lt6");
    pseudo.unhighlight("else-gt3");
    pseudo.unhighlight("else-gt5");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    av.step();

    // Slide 10
    av.umsg("Keep recurring, moving down the list ns and building up the two-component accumulator appropriately.  On this call, the head of the list is bigger than the pivot, so ...");
    arr.highlight(2);
    arrow1.translate(arr_cell_offset,0);
    arrow2.translatePoint(0,arr_cell_offset,0);
    arrow2.hide();
    label_hd.hide();
    label_hd = av.label("hd ns", {left: arrow1_x - 16 + 3 * arr_cell_offset, top: -20});
    label_tl.hide();
    smallsRet.hide();
    smallsRet = av.ds.array([2, 3], {indexed: false, left: leftMargin + 50, top: 160});
    smallsRet.show();
    smallsReturn.hide();
    smallsReturn = av.label("smalls", {left: leftMargin, top: 164});
    bigsReturn.show();
    bigsRet.hide();
    bigsRet = av.ds.array([5], {indexed: false, left: leftMargin + 50, top: 230});
    bigsRet.show();
    bigsReturn.hide();
    bigsReturn = av.label("bigs", {left: leftMargin, top: 234});
    bigsReturn.show();
    pseudo.unhighlight("else-lt1");
    pseudo.unhighlight("else-lt4");
    pseudo.unhighlight("else-lt6");
    pseudo.highlight("else-gt3");
    pseudo.highlight("else-gt5");
    arrow1.show();
    label_hd.show();
    av.step();

    // Slide 11
    av.umsg("We've now passed in an empty list for the ns argument.");
    arr.highlight(3);
    arrow1.translate(arr_cell_offset,0);
    arrow2.translatePoint(0,arr_cell_offset,0);
    arrow2.hide();
    label_hd.hide();
    label_hd = av.label("hd ns", {left: arrow1_x - 16 + 4 * arr_cell_offset, top: -20});
    label_tl.hide();
    smallsRet.hide();
    smallsRet = av.ds.array([2, 3], {indexed: false, left: leftMargin + 50, top: 160});
    smallsRet.show();
    smallsReturn.hide();
    smallsReturn = av.label("smalls", {left: leftMargin, top: 164});
    bigsReturn.show();
    bigsRet.hide();
    bigsRet = av.ds.array([8, 5], {indexed: false, left: leftMargin + 50, top: 230});
    bigsRet.show();
    bigsReturn.hide();
    bigsReturn = av.label("bigs", {left: leftMargin, top: 234});
    bigsReturn.show();
    pseudo.highlight(6);
    pseudo.highlight(7);
     pseudo.unhighlight("else-gt3");
     pseudo.unhighlight("else-gt5");
    arrow1.show();
    label_hd.show();
    av.step();

    // Slide 12
    av.umsg("So we use our two accumulator components to build and return a two-element list, having smalls as its first element and bigs as its second.   That is, we return the list [ [2, 3], [8, 5] ].");
    arr.highlight(3);
//     arrow1.translate(arr_cell_offset,0);
//     arrow2.translatePoint(0,arr_cell_offset,0);
    arrow2.hide();
    label_hd.hide();
    label_hd = av.label("hd ns", {left: arrow1_x - 16 + 4 * arr_cell_offset, top: -20});
    label_tl.hide();
    smallsRet.hide();
    smallsRet = av.ds.array([2, 3], {indexed: false, left: leftMargin + 50, top: 160});
    smallsRet.show();
    smallsReturn.hide();
    smallsReturn = av.label("smalls", {left: leftMargin, top: 164});
    bigsReturn.show();
    bigsRet.hide();
    bigsRet = av.ds.array([8, 5], {indexed: false, left: leftMargin + 50, top: 230});
    bigsRet.show();
    bigsReturn.hide();
    bigsReturn = av.label("bigs", {left: leftMargin, top: 234});
    bigsReturn.show();
    pseudo.highlight(6);
    pseudo.hide(7);
    pseudo.show(8);
    pseudo.highlight(8);
    arrow1.show();
    label_hd.show();
    av.step();


    /////////////////////////////////////////////////////////////////////////////////////////////////

    av.recorded();
});
