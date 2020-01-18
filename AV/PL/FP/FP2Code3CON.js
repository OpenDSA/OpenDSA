/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP2Code3CON";
    var arrValues = [6, 2, 6, 8, 6];
    var av = new JSAV(av_name);

    var leftMargin = 30;
    var arr_cell_offset = 30;
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20}).hide();

    var pseudo = av.code(
        [
	    "var subst = function (n,o,ns) {",                               //1
	    "           if ( SOME TEST ) {",                             //2
            "           if ( fp.isNull(ns) ) {",                         //3
	    "              return SOMETHING;",                           //4
            "              return [ ];",                                 //5
	    "           } else { ",                                      //6
            "              CHECK IF THE HEAD OF THE LIST MATCHES o",     //7
	    "           } else if ( fp.isEq(fp.hd(ns),o) ) {",             //8
	    "              return fp.cons( n, subst(n,o,fp.tl(ns)) );",     //9
	    "           } else { ",                                      //10
	    "              ????????????????????",                        //11
	    "              return fp.cons( fp.hd(ns), subst(n,o,fp.tl(ns)) );", //12
	    "           }",                                              //13
	    "        }"                                                  //14
        ],
        {
            lineNumbers: false
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

    var arrRet = av.ds.array(["?????"], {indexed: false, left: leftMargin + 40, top: 140});
    //arrRet.addClass(0,"wider");
    arrRet.hide();
    var arr_n = av.ds.array([5], {indexed: false, left: leftMargin, top: 70});
    var arr_o = av.ds.array([6], {indexed: false, left: leftMargin + 100, top: 70});
    //arrRet.hide();
    var label_ns = av.label("ns", {left: leftMargin - 20, top: 20});
    var label_n = av.label("n", {left: leftMargin - 20, top: 70});
    var label_o = av.label("o", {left: leftMargin + 80, top: 70});
    var labelReturn = av.label("Return", {left: leftMargin - 20, top: 110});
    labelReturn.hide();

    // Slide 1
    av.umsg("Following the alternatives in the BNF definition of a list, we want a function that returns a list similar to ns, all occurrences of o having been replaced by n");
    pseudo.hide([3,5,8,9,10,11,12]);
    arr.show();
    av.displayInit();

    // Slide 2
    av.umsg("Just as we did with our earlier sum function when encountering an empty list, we return the starting point for a computation that will be built up as we unwind from any recursion.");
    pseudo.hide(2);
    pseudo.show(3);
    pseudo.hide(4);
    pseudo.show(5);
    pseudo.highlight([3,5]);

    arrow1.hide();
    arrow2.hide();
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 5*arr_cell_offset, top: -20});
    label_tl.hide();
    arr.highlight([0,1,2,3,4]);
    labelReturn.text("Return an empty list");
    labelReturn.show();
    av.step();

    // Slide 3
    arrow1.translate(2*arr_cell_offset,0);
    arrow1.show();
    arrow2.translatePoint(0, 2* arr_cell_offset,0);
    arrow2.show();
    arr.unhighlight([2,3,4]);
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 2*arr_cell_offset, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 45 + 2*arr_cell_offset, top: -20});
    pseudo.hide([6,7]);
    pseudo.show([8,9,10,11]);
    pseudo.unhighlight([3,5]);
    pseudo.highlight([8,9]);
//    arr_n.value(0,5);
    av.umsg("If the head of the current list matches o, then we want n (here 5) at the head of the list being returned from substitution applied recursively on the tail of the list.");
    arrRet.value(0,5); arrRet.value(1,8); arrRet.value(2,5);arrRet.show();
    labelReturn.text("Return n consed onto recursive call");
    av.step();


    // Slide 4
    pseudo.hide([11]);
    pseudo.show([12]);
    pseudo.unhighlight([8,9]);
    pseudo.highlight([10,12]);
    arr.value(2,7);
    av.umsg("If the third entry in ns were 7 instead of 6, then the head of the current list would not match o. So instead of consing n, we want the current head consed onto what is returned from the recursive call.");
    arrRet.value(0,7); arrRet.value(1,8); arrRet.value(2,5);arrRet.show();
    labelReturn.text("Return hd consed onto recursive call");
    av.step();

    // Slide 5
    av.umsg("After all recursive calls unwind, the repeated cons operations that occur during the unwinding yield a final result.");
    arr.unhighlight([0,1,2,3,4]);
    arrow1.translate(-2*arr_cell_offset,0);
    arrow1.show();
    arrow2.translatePoint(0, -2* arr_cell_offset,0);
    arrow2.show();
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 0*arr_cell_offset, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 45 + 0*arr_cell_offset, top: -20});
    labelReturn.text("List returned to top level");
    arrRet.hide();
    var arrRet1 = av.ds.array([5,2,7,8,5], {indexed: false, left: leftMargin, top: 140});
    av.step();

    av.recorded();
});
