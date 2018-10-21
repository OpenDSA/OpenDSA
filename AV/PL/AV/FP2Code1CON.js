/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP2Code1CON";
    var arrValues = [3, 2, 5, 8];
    // Load the config object with interpreter and code created by odsaUtils.js
    //   var config = ODSA.UTILS.loadConfig({av_name: av_name}),
    //       interpret = config.interpreter,       // get the interpreter
    //       code = config.code;                   // get the code object
    var av = new JSAV(av_name);

    var leftMargin = 10;
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20}).hide();
    //  var pseudo = av.code(code[0]);

    //    console.log(code);

    var pseudo = av.code(
	[
	    "var sum = function (ns) {",
	    "             if ( SOME TEST ) {",
	    "             if ( fp.isNull(ns) ) {",
	    "                return SOMETHING;",
	    "                return 0;",
	    "             } else {",
	    "                return SOMETHING ELSE;",
	    "                return fp.add( fp.hd(ns), sum(fp.tl(ns) );",
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

    // Label in step 1
    var label_hd = av.label("hd", {left: arrow1_x - 16, top: -20, fontFamily: "Monospace", fontWeight: "bold"}).hide();

    //horizontal arrow in step 2
    var arrow2 = av.g.line(leftMargin + 45, 25, leftMargin + 115, 25,
                           {"arrow-end": "classic-wide-long", opacity: 0,
                            "stroke-width": 2});
    arrow2.hide();
    var label_tl = av.label("tl", {left: leftMargin + 45, top: -20, fontFamily: "Monospace", fontWeight: "bold"}).hide();

    var arrRet = av.ds.array(["?????"], {indexed: false, left: 100, top: 90});
    arrRet.addClass(0,"wider");
    arrRet.hide();
    var labelReturn = av.label("Return", {left: 33, top: 94});
    labelReturn.hide();

    // Slide 1
    av.umsg("Following the alternatives in the BNF definition of a list, we want a function that returns the sum of the numbers in list below");
    //  arr.addClass([5, 6, 7], "unused");
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
//     arrow1.translatePoint(0, 35,0);
//     arrow1.translatePoint(1, 35,0);
    arrow1.translate(35,0);
    arrow2.translatePoint(0,35,0);
//    arrow2.movePoints([[1,leftMargin + 115, 25]]);
    label_hd.hide();
    label_hd = av.label("hd", {left: arrow1_x - 16 + 35, top: -20});
    label_tl.hide();
    label_tl = av.label("tl", {left: leftMargin + 45 + 35, top: -20});
    av.umsg("Insert 23 into array position 0.");
    arr.value(0, 23);
    arr.highlight([0]);
    //arrow2.hide();
    pseudo.setCurrentLine(0);      // Hack until we get multi-line method
    pseudo.unhighlight("forbody");
    pseudo.setCurrentLine("insert");
    //   pseudo.unhighlight(5);
    //   pseudo.setCurrentLine(6);
    av.step();

    // Slide 5
    av.umsg("Increase the list size by 1.");
    pseudo.setCurrentLine("incr");
    //  pseudo.setCurrentLine(6);
    arr.unhighlight([0]);
    av.step();

    // Slide 6
    av.umsg("Thus, the cost to insert into an array-based list in the worst case is $\\Theta(n)$ when there are $n$ items in the list.");
    pseudo.setCurrentLine(0);
    av.recorded();
});
