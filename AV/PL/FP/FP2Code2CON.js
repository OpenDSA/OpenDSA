/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP2Code2CON";
    var arrValues = [3, 2, 5, 8];
    var av = new JSAV(av_name);

    var leftMargin = 30;
    var arr_cell_offset = 30;
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20}).hide();

    var pseudo = av.code(
        [
	    "var isMember = function (n,ns) {",                                 //1
	    "                  if ( SOME TEST ) {",                             //2
            "                  if ( fp.isNull(ns) ) {",                         //3
	    "                     return SOMETHING;",                           //4
            "                     return false;",                               //5
	    "                  } else { ",                                      //6
            "                     CHECK IF THE HEAD OF THE LIST MATCHES n",     //7
	    "                  } else if ( fp.isEq(fp.hd(ns), n) ) {",             //8
	    "                     return true;",                                //9
	    "                  } else { ",                                      //10
	    "                     WE STILL DO NOT KNOW",                        //11
            "                     return isMember( n, fp.tl(ns) );",            //12
	    "                  }",                                              //13
	    "               }"                                                  //14
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

    var arrRet = av.ds.array(["?????"], {indexed: false, left: leftMargin + 40, top: 110});
    arrRet.addClass(0,"wider");
    var arr_n = av.ds.array([6], {indexed: false, left: leftMargin, top: 70});
    //arrRet.hide();
    var label_ns = av.label("ns", {left: leftMargin - 20, top: 20});
    var label_n = av.label("n", {left: leftMargin - 20, top: 70});
    var labelReturn = av.label("Return", {left: leftMargin - 20, top: 110});
//    labelReturn.hide();

    // Slide 1
    av.umsg("Following the alternatives in the BNF definition of a list, we want a function that determines whether n is a member of the list ns");
    pseudo.hide([3,5,8,9,10,11,12]);   // deleted 13
    arr.show();
    av.displayInit();

    // Slide 2
//    av.umsg("Since the first alternative is an empty list, we fill in SOME TEST in the preceding slide as ...");
    pseudo.hide(2);
    pseudo.show(3);
    pseudo.hide(4);
    pseudo.show(5);
    pseudo.highlight([3,5]);

    arrow1.hide();
    arrow2.hide();
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 4*arr_cell_offset, top: -20});
    label_tl.hide();
    av.umsg("As indicated by the highlighted items, if we've worked our way through the list to the point where ns is null (that is, there is no head) and we haven't encountered n, then ...");
    arr.highlight([0,1,2,3]);
    arrRet.value(0,false);
    av.step();

    // Slide 3
    arrow1.translate(2*arr_cell_offset,0);
    arrow1.show();
    arrow2.translatePoint(0, 2* arr_cell_offset,0);
    arrow2.show();
    arr.unhighlight([2,3]);
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 2*arr_cell_offset, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 45 + 2*arr_cell_offset, top: -20});
    pseudo.hide([6,7]);
    pseudo.show([8,9,10,11]);
    pseudo.unhighlight([3,5]);
    pseudo.highlight([8,9]);
    arr_n.value(0,5);
    av.umsg("If the head of the current list matches n, then we can return true and we're done.");
    arrRet.value(0,"true");
    av.step();


    // Slide 4
    pseudo.hide([11]);
    pseudo.show([12]);
    pseudo.unhighlight([8,9]);
    pseudo.highlight([10,12]);
    arr_n.value(0,6);
    av.umsg("If the head of the current list does not match n, then we need to recur on the tail of the list.");
    arrRet.value(0,"????");
    av.step();

    av.recorded();
});
