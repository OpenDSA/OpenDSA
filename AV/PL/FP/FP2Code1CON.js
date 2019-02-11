/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP2Code1CON";
    var arrValues = [3, 2, 5, 8];
    var av = new JSAV(av_name);

    var leftMargin = 10;
    var arr_cell_offset = 30;
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20}).hide();

    var pseudo = av.code(
	[
	    "var sum = function (ns) {",
	    "             if ( SOME TEST ) {",
	    "             if ( fp.isNull(ns) ) {",
	    "                return SOMETHING;",
	    "                return 0;",
	    "             } else {",
	    "                return SOMETHING ELSE;",
	    "                return fp.add( fp.hd(ns), sum(fp.tl(ns)) );",
	    "             }",
	    "          }",
	    ""
	],
	{
	    lineNumbers: false,
	    "tags": {
		"if-some-test": 2,
		"if-test": 3,
		"return-something": 4,
		"return-zero": 5,
		"return-something-else": 7,
		"return-sum": 8
	    }
	}
    );
    
    // Vertical arrow in step 2
    var arrow1_x = leftMargin + 15;
    var arrow1 = av.g.line(arrow1_x, 15, arrow1_x, 35,
                           {"arrow-end": "classic-wide-long",
                            opacity: 100, "stroke-width": 2});
    arrow1.hide();

    // Label in step 2
    var label_hd = av.label("hd", {left: arrow1_x - 16, top: -20}).hide();

    //horizontal arrow in step 2
    var arrow2 = av.g.line(leftMargin + 45, 25, leftMargin + 130, 25,
                           {"arrow-end": "classic-wide-long", opacity: 0,
                            "stroke-width": 2});
    arrow2.hide();
    var label_tl = av.label("tl", {left: leftMargin + 45, top: -20}).hide();

    var arrRet = av.ds.array(["?????"], {indexed: false, left: 100, top: 90});
    arrRet.addClass(0,"wider");
    arrRet.hide();
    var labelReturn = av.label("Return", {left: 35, top: 94});
    labelReturn.hide();

    // Slide 1
    av.umsg("Following the alternatives in the BNF definition of a list, we want a function that returns the sum of the numbers in the list below");
    pseudo.hide([3,5,8]);
    arr.show();
    av.displayInit();

    // Slide 2
    av.umsg("Since the first alternative is an empty list, we fill in SOME TEST in the preceding slide as ...");
    pseudo.hide("if-some-test");
    pseudo.show("if-test");
    pseudo.setCurrentLine("if-test");
    arrow1.show();
    label_hd.show();
    arrow2.show();
    label_tl.show();
    arrRet.show();
    labelReturn.show();
    av.step();

    // Slide 3
    av.umsg("Since the if-test is false, we use the second (non-empty) BNF alternative in the else, which carves up the list into its head and tail, to make a recursive call ");
    arrow2.show();
    label_tl.show();
    pseudo.hide("return-something-else");
    pseudo.show("return-sum");
    pseudo.setCurrentLine("return-sum");
    av.step();


    // Slide 4
    arrow1.translate(arr_cell_offset,0);
    arrow2.translatePoint(0,arr_cell_offset,0);
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + arr_cell_offset, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 45 + arr_cell_offset, top: -20});
    av.umsg("Null list?");
    arr.highlight([0]);
    pseudo.setCurrentLine("if-test");      
    av.step();

    // Slide 5
    av.umsg("The if-test in previous slide was false, so ...");
    pseudo.setCurrentLine("return-sum");
    av.step();

    //Slide 6
    arrow1.translate(arr_cell_offset,0);
    arrow2.translatePoint(0,arr_cell_offset,0);
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 2*arr_cell_offset, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 45 + 2*arr_cell_offset, top: -20});
    av.umsg("Null list?");
    arr.highlight([1]);
    pseudo.setCurrentLine("if-test");      
    av.step();

    // Slide 7
    av.umsg("The if-test in previous slide was false, so ...");
    pseudo.setCurrentLine("return-sum");
    av.step();

    //Slide 8
    arrow1.translate(arr_cell_offset,0);
    arrow2.hide();
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 3*arr_cell_offset, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 45 + 3*arr_cell_offset, top: -20});
    av.umsg("Null list?");
    arr.highlight([2]);
    pseudo.setCurrentLine("if-test");      
    arrRet.value(0,0);
    av.step();

    // Slide 9
    av.umsg("The if-test in previous slide was false, so ...");
    pseudo.setCurrentLine("return-sum");
    av.step();

    //Slide 10
    arrow1.hide();
    arrow2.hide();
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 4*arr_cell_offset, top: -20});
    label_tl.hide();
//     label_tl = av.label("tl", {left: leftMargin + 45 + 3*arr_cell_offset, top: -20});
    av.umsg("Null list?  This time the answer is yes, so return what the sum of entries in a null list is.");
    arr.highlight([3]);
    pseudo.hide("return-something");
    pseudo.show("return-zero");
    pseudo.setCurrentLine("return-zero");
    av.step();


    //Slide 11
    arrow1.show();
    arrow2.hide();
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 3*arr_cell_offset, top: -20});
    label_tl.hide();
    av.umsg("Return the addition of the hd of the list at this level of recursion, plus what was returned from the prior level.");
    arr.unhighlight([3]);
    arrRet.value(0,"8+0");
    pseudo.setCurrentLine("return-sum");
    pseudo.hide("return-something");
    pseudo.show("return-zero");
    av.step();


    //Slide 12
    arrow1.translate(-arr_cell_offset,0);
    arrow1.show();
    arrow2.hide();
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 2*arr_cell_offset, top: -20});
    label_tl.hide();
    av.umsg("Return the addition of the hd of the list at this level of recursion, plus what was returned from the prior level.");
    arr.unhighlight([2]);
    arrRet.value(0,"5+8");
    pseudo.setCurrentLine("return-sum");
    pseudo.hide("return-something");
    pseudo.show("return-zero");
    av.step();

    //Slide 13
    arrow1.translate(-arr_cell_offset,0);
    arrow1.show();
    arrow2.hide();
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 1*arr_cell_offset, top: -20});
    label_tl.hide();
    av.umsg("Return the addition of the hd of the list at this level of recursion, plus what was returned from the prior level.");
    arr.unhighlight([1]);
    arrRet.value(0,"2+13");
    pseudo.setCurrentLine("return-sum");
    pseudo.hide("return-something");
    pseudo.show("return-zero");
    av.step();

    //Slide 14
    arrow1.translate(-arr_cell_offset,0);
    arrow1.show();
    arrow2.hide();
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 0*arr_cell_offset, top: -20});
    label_tl.hide();
    av.umsg("Return the addition of the hd of the list at this level of recursion, plus what was returned from the prior level.");
    arr.unhighlight([0]);
    arrRet.value(0,"3+15");
    pseudo.setCurrentLine("return-sum");
    pseudo.hide("return-something");
    pseudo.show("return-zero");
    av.step();



    // Slide 15
    av.umsg("We are finished, having returned the value 18");
    label_hd.hide();
    arrow1.hide();
    arrRet.value(0,"18");
    pseudo.setCurrentLine(0);
    av.recorded();
});
