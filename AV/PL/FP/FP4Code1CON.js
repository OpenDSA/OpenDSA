/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP4Code1CON";
    var arrValues = [3, 2, 5, 8];
    var av = new JSAV(av_name);

    var leftMargin = 10;
    var arr_cell_offset = 30;
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin + 30, top: 20}).hide();

    var pseudo = av.code(
        [
	    "var reverse = function (ns) { return reverse_helper(ns, ??? ); }", // 1
	    "var reverse = function (ns) { return reverse_helper(ns, []); }", // 2
            " ", 		// 3
            "var reverse_helper = function (ns,acc) {", // 4
            "    if (fp.isNull(ns))",			// 5
	    "      return ???  ",			// 6
            "      return acc;",			// 7
            "    else",					// 8
            "      return reverse_helper(???,",		// 9
            "      return reverse_helper(fp.tl(ns),", // 10
	    "                            ???);",      // 11
	    "                            fp.cons(fp.hd(ns), acc));", // 12
            "}"			// 13
        ],
        {
            lineNumbers: false,
            "tags": {
                "init-hidden": [2,7,10,12],
		"call-ques": 1,
		"call-ans" : 2,
                "if-ques": 6,
                "if-ans": 7,
                "else-ques1": 9,
                "else-ans1": 10,
                "else-ques2": 11,
                "else-ans2": 12,
		"complete-recur": [10,12]
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

    var arrRet = av.ds.array([3], {indexed: false, left: leftMargin + 30, top: 90});
    arrRet.hide();
    var labelReturn = av.label("acc is initially [ ]", {left: leftMargin, top: 94});
    labelReturn.hide();
    var label_ns = av.label("ns", {left: leftMargin, top: 20});

    // Slide 1
    av.umsg("When using the accumulator pattern, it is the helper function that does the heavy lifting.   The responsibility of the top-level function (here reverse) is to start the accumulator argument at its correct value");
    pseudo.hide("init-hidden");
    arr.show();
    av.displayInit();

    // Slide 2
    av.umsg("Since here the accumulator will be a list, the top-level function calls reverse_helper with an empty list for the acc argument");
    pseudo.hide("call-ques");
    pseudo.show("call-ans");
    pseudo.highlight("call-ans");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    label_ns.hide();
    labelReturn.show();
    av.step();

    // Slide 3
    av.umsg("We recur down the list until ns is passed in as a null list");
    pseudo.hide("call-ques");
    pseudo.show("call-ans");
    pseudo.hide("else-ques1");
    pseudo.show("else-ans1");
    pseudo.unhighlight("call-ans");
    pseudo.highlight("else-ans1");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    labelReturn.show();
    av.step();

    // Slide 4
    av.umsg("Each time we recur, we build up the accumulator by consing the head of the current list onto the accumulator.");
    pseudo.hide("call-ques");
    pseudo.show("call-ans");
    pseudo.unhighlight("else-ans1");
    pseudo.hide("else-ques1");
    pseudo.show("else-ans1");
    pseudo.hide("else-ques2");
    pseudo.show("else-ans2");
    pseudo.highlight("else-ans2");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    labelReturn.show();
    av.step();

    // Slide 5
    av.umsg("And the recursive call is made");
    pseudo.hide("call-ques");
    pseudo.show("call-ans");
    pseudo.unhighlight("else-ans1");
    pseudo.hide("else-ques1");
    pseudo.show("else-ans1");
    pseudo.hide("else-ques2");
    pseudo.show("else-ans2");
    pseudo.highlight("else-ans1");
    pseudo.highlight("else-ans2");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    labelReturn.show();
    av.step();

    // Slide 6
    av.umsg("Keep recurring, moving down the list ns and building up the accumulator");
    arr.highlight(0);
    arrow1.translate(arr_cell_offset,0);
    arrow2.translatePoint(0,arr_cell_offset,0);
    label_hd.hide();
    label_hd = av.label("hd ns", {left: arrow1_x - 16 + arr_cell_offset, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 75 + arr_cell_offset, top: -20});
    arrRet.hide();
    arrRet = av.ds.array([3], {indexed: false, left: leftMargin + 30, top: 90});
    arrRet.show();
    labelReturn.hide();
    labelReturn = av.label("acc", {left: leftMargin, top: 94});
    labelReturn.show();
    pseudo.hide("call-ques");
    pseudo.show("call-ans");
    pseudo.unhighlight("else-ans1");
    pseudo.hide("else-ques1");
    pseudo.show("else-ans1");
    pseudo.hide("else-ques2");
    pseudo.show("else-ans2");
    pseudo.highlight("else-ans1");
    pseudo.highlight("else-ans2");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    labelReturn.show();
    av.step();

    // Slide 7
    av.umsg("Keep recurring, moving down the list ns and building up the accumulator");
    arr.highlight(1);
    arrow1.translate(arr_cell_offset,0);
    arrow2.translatePoint(0,arr_cell_offset,0);
    label_hd.hide();
    label_hd = av.label("hd ns", {left: arrow1_x - 16 + 2*arr_cell_offset, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 75 + 2*arr_cell_offset, top: -20});
    arrRet.hide();
    arrRet = av.ds.array([2, 3], {indexed: false, left: leftMargin + 30, top: 90});
    arrRet.show();
    labelReturn.hide();
    labelReturn = av.label("acc", {left: leftMargin, top: 94});
    labelReturn.show();
    pseudo.hide("call-ques");
    pseudo.show("call-ans");
    pseudo.unhighlight("else-ans1");
    pseudo.hide("else-ques1");
    pseudo.show("else-ans1");
    pseudo.hide("else-ques2");
    pseudo.show("else-ans2");
    pseudo.highlight("else-ans1");
    pseudo.highlight("else-ans2");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    labelReturn.show();
    av.step();

    // Slide 8
    av.umsg("Keep recurring, moving down the list ns and building up the accumulator");
    arr.highlight(2);
    arrow1.translate(arr_cell_offset,0);
    arrow2.translatePoint(0,arr_cell_offset,0);
    label_hd.hide();
    label_hd = av.label("hd ns", {left: arrow1_x - 16 + 3*arr_cell_offset, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 75 + 3*arr_cell_offset, top: -20});
    arrRet.hide();
    arrRet = av.ds.array([5, 2, 3], {indexed: false, left: leftMargin + 30, top: 90});
    arrRet.show();
    labelReturn.hide();
    labelReturn = av.label("acc", {left: leftMargin, top: 94});
    labelReturn.show();
    pseudo.hide("call-ques");
    pseudo.show("call-ans");
    pseudo.unhighlight("else-ans1");
    pseudo.hide("else-ques1");
    pseudo.show("else-ans1");
    pseudo.hide("else-ques2");
    pseudo.show("else-ans2");
    pseudo.highlight("else-ans1");
    pseudo.highlight("else-ans2");
    arrow1.show();
    label_hd.show();
    arrow2.hide();
    label_tl.show();
    labelReturn.show();
    av.step();

    // Slide 9
    av.umsg("ns is finally passed in as a null list.   All the hard work has been done in building up the accumulator; so we merely return its value as the answer.");
    arr.highlight(3);
    arrow1.translate(arr_cell_offset,0);
    arrow2.translatePoint(0,arr_cell_offset,0);
    label_hd.hide();
    label_hd = av.label("hd ns", {left: arrow1_x - 16 + 4*arr_cell_offset, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 75 + 3*arr_cell_offset, top: -20});
    arrRet.hide();
    arrRet = av.ds.array([8, 5, 2, 3], {indexed: false, left: leftMargin + 30, top: 90});
    arrRet.show();
    labelReturn.hide();
    labelReturn = av.label("acc", {left: leftMargin, top: 94});
    labelReturn.show();
    pseudo.hide("call-ques");
    pseudo.show("call-ans");
    pseudo.unhighlight("else-ans1");
    pseudo.hide("else-ques1");
    pseudo.show("else-ans1");
    pseudo.hide("else-ques2");
    pseudo.show("else-ans2");
    pseudo.unhighlight("else-ans1");
    pseudo.unhighlight("else-ans2");
    pseudo.hide("if-ques");
    pseudo.show("if-ans");
    pseudo.highlight("if-ans");
    arrow1.show();
    label_hd.show();
    arrow2.hide();
    label_tl.hide();
    labelReturn.show();
    av.step();

    av.recorded();
});
