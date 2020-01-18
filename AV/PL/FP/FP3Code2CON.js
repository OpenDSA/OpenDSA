/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP3Code2CON";
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
            "var path = function (n, bst) {", // 1
            "    if (fp.isEq(n,fp.hd(bst))) {", // 2
            "      return [];",                    // 3
            "    } else if (fp.isLT(n, fp.hd(bst))) {", // 4
            "      return fp.cons(0,",                     // 5
            "                     path(n, left(bst))",     // 6
            "                    );",                      // 7
            "    } else {",                             // 8
            "      return fp.cons(1,",                     // 9
            "                     path(n, right(bst))",    // 10
            "                    );",                      // 11
            "    }",                                    // 12
            "};"                                        // 13
        ],
        {
            lineNumbers: false,
            "tags": {
                "equal-return": [2,3],
                "recur-left": 6,
                "LT-return": [5,6,7],
                "recur-right": 10,
                "GT-return": [9,10,11]
            }
            
        }
    );

    // Slide 1
    av.umsg("Suppose that we are looking for 17 in the tree on the left.");
    
    av.displayInit();

    // Slide 2
    av.umsg("Because 17 is greater than 14, which is the head of the current list, we recur on the right to the list whose head is 26");
    pseudo.highlight("recur-right");
    arr.highlight([0,2]);
    arr_r.highlight(0);
    av.step();

    // Slide 3
    av.umsg("Because 17 is less than 26, which is the head of the current list, we recur left to the list whose head is 20");
    pseudo.unhighlight("recur-right");
    pseudo.highlight("recur-left");
    arr.highlight([0,2]);
    arr_r.highlight([0,1]);
    arr_r_l.highlight(0);
    av.step();

    // Slide 4
    av.umsg("Because 17 is less than 20, which is the head of the current list, we recur left to the list whose head is 17");
    pseudo.highlight("recur-left");
    arr.highlight([0,2]);
    arr_r.highlight([0,1]);
    arr_r_l.highlight([0,1]);
    arr_r_l_l.highlight([0]);
    av.step();

    // Slide 5
    av.umsg("Because 17 now matches the head of the current list, we return [ ] for the recursive call made in the prior slide");
    pseudo.unhighlight("recur-left");
    pseudo.highlight("equal-return");
    arr.highlight([0,2]);
    arr_r.highlight([0,1]);
    arr_r_l.highlight([0,1]);
    arr_r_l_l.highlight([0]);
    av.step();

    // Slide 6
    av.umsg("0 is now consed onto the empty list returned from the recursive call on the left subtree, returning the list [0] up the chain of recursive calls");
    pseudo.unhighlight("equal-return");
    pseudo.highlight("LT-return");
    arr.highlight([0,2]);
    arr_r.highlight([0,1]);
    arr_r_l.unhighlight([0,1]);
    arr_r_l.highlight([0]);
    arr_r_l_l.unhighlight([0]);
    av.step();

    // Slide 7
    av.umsg("0 is now consed onto the list [0] returned from the recursive call on the left subtree, returning the list [0,0] up the chain of recursive calls");
    pseudo.unhighlight("equal-return");
    pseudo.highlight("LT-return");
    arr.highlight([0,2]);
    arr_r.unhighlight([1]);
    arr_r.highlight([0]);
    arr_r_l.unhighlight([0]);
    av.step();

    // Slide 8
    av.umsg("1 is now consed onto the list [0, 0] returned from the recursive call on the right subtree, returning the list [1,0,0] to the top level of recursion");
    pseudo.unhighlight("LT-return");
    pseudo.highlight("GT-return");
    arr.unhighlight([0,2]);
    arr_r.unhighlight([0]);
    av.step();


    av.recorded();
});
