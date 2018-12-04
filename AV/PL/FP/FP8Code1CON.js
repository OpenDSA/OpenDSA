/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP8Code1CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var offset_for_each_var = 35;
//    var offset_between_var_label_and_cell = 20;

    var ll = av.label("Lists in DB", {left: leftMargin, top: 0});
    var l1 = av.ds.array(["Smith", 4, 1, 8, 32, 45], {indexed: false, left: leftMargin, top: 20}).hide();
    var l2 = av.ds.array(["Jones", 9, 2, 8, 6, 4], {indexed: false, left: leftMargin, top: 20 + offset_for_each_var}).hide();
    var l3 = av.ds.array(["Green", 4, 4, 6, 1, 12, 8], {indexed: false, left: leftMargin, top: 20 + 2 * offset_for_each_var}).hide();
    
    var ml = av.label("Application of the mapper produces", {left: leftMargin, top: 20 + 3.4 * offset_for_each_var});
    var m1 = av.ds.array(["Smith", 90], {indexed: false, left: leftMargin, top: 20 + 4 * offset_for_each_var}).hide();
    var m2 = av.ds.array(["Jones", 29], {indexed: false, left: leftMargin, top: 20 + 5 * offset_for_each_var}).hide();
    var m3 = av.ds.array(["Green", 35], {indexed: false, left: leftMargin, top: 20 + 6 * offset_for_each_var}).hide();
    
    var rl = av.label("The reducer picks", {left: leftMargin, top: 20 + 7.4 * offset_for_each_var});
    var r1 = av.ds.array(["Smith", 90], {indexed: false, left: leftMargin, top: 20 + 8 * offset_for_each_var}).hide();

    var code1 =         [

	"var bestSalesPerson = function (db) {", // 1
	"  // returns the pair [name, totalSales] for a given record in db", // 2
	"  var mapper = function (r) {", // 3
	"      return [",		 // 4
	"          ???,",		 // 5
	"          fp.hd(r),",		 // 6
	"          ???,",		 // 7
	"          fp.reduce(fp.add, fp.tl(r), 0)", // 8
	"      ];",				    // 9
	"  };",					    // 10
	"  ",					    // 11
	"  // Given two input pairs of the form [name, totalSales], return", // 12
	"  // the one with the largest totalSales", // 13
	"  var reducer = function(p1,p2) {",	    // 14
	"      return ???",			    // 15
	"      return (fp.isGT(fp.hd(fp.tl(p1)), fp.hd(fp.tl(p2)))) ? p1 : p2;", // 16
	"  };",			// 17
	" ",			// 18
	"  // returns [salesPerson, totalSales] with the largest totalSales", // 19
	"  // in the DB",	// 20
	"  return fp.reduce(",	// 21
	"      reducer,",	// 22
	"      fp.map(mapper, db),", // 23
	"      ???",		     // 24
	"      ['dummy', -1]",	     // 25
	"  ); ",		     // 26
	"};"			     // 27

        ];

    
    var pseudo1 = av.code(
        code1,
        {
            left: leftMargin + 250,
            top: 0,
            lineNumbers: false,
	    tags: {
		"mapperques": [5,7],
		"mapperans": [6,8],
		"reducerques": 15,
		"reducerans": 16,
		"accumstartques": 24,
		"accumstartans": 25
	    }
        }
    );
    

    // Slide 1
    av.umsg('.');
    l1.show();
    l1.addClass(0,"wider");
    l2.show();
    l2.addClass(0,"wider");
    l3.show();
    l3.addClass(0,"wider");
    m1.show();
    m1.addClass(0,"wider");
    m2.show();
    m2.addClass(0,"wider");
    m3.show();
    m3.addClass(0,"wider");
    m1.show();
    m1.addClass(0,"wider");
    r1.show();
    r1.addClass(0,"wider");
    pseudo1.hide("mapperans");
    pseudo1.hide("reducerans");
    pseudo1.hide("accumstartans");
    av.displayInit();

    // S 2

    
    av.recorded();
});
