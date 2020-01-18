/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP8Code1CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var offset_for_each_var = 35;
//    var offset_between_var_label_and_cell = 20;

    var ll = av.label("Lists in DB", {left: leftMargin, top: 0});
    var l1 = av.ds.array(["Jones", 9, 2, 8, 6, 4], {indexed: false, left: leftMargin, top: 20}).hide();
    var l2 = av.ds.array(["Smith", 4, 1, 8, 32, 45], {indexed: false, left: leftMargin, top: 20 + offset_for_each_var}).hide();
    var l3 = av.ds.array(["Green", 4, 4, 6, 1, 12, 8], {indexed: false, left: leftMargin, top: 20 + 2 * offset_for_each_var}).hide();
    
    var ml = av.label("Application of the mapper produces", {left: leftMargin, top: 20 + 3.4 * offset_for_each_var}).hide();
    var m1 = av.ds.array(["Jones", 29], {indexed: false, left: leftMargin, top: 20 + 4 * offset_for_each_var}).hide();
    var m2 = av.ds.array(["Smith", 90], {indexed: false, left: leftMargin, top: 20 + 5 * offset_for_each_var}).hide();
    var m3 = av.ds.array(["Green", 35], {indexed: false, left: leftMargin, top: 20 + 6 * offset_for_each_var}).hide();
    
    var rl = av.label("The reducer picks", {left: leftMargin, top: 20 + 7.4 * offset_for_each_var}).hide();
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
            left: leftMargin + 270,
            top: 0,
            lineNumbers: true,
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
    av.umsg('Our database is a list of records where each record r is a list whose head is the name of a salesperson and whose tail is a list of their sales.  The sample database on the left below has three such records. Ultimately our answer will be returned by applying reduce to another list of records produced by applying the map operation to each list in the database.   The function we give to the map operation in line 20 is called mapper (lines 3-7).  How should mapper determine the [name, totalSales] pair it must return?');
    l1.show();
    l1.addClass(0,"wider");
    l2.show();
    l2.addClass(0,"wider");
    l3.show();
    l3.addClass(0,"wider");
    pseudo1.hide("mapperans");
    pseudo1.hide("reducerans");
    pseudo1.hide("accumstartans");
    pseudo1.highlight([23,3, 4, 5, 6, 7, 8, 9]); 
    av.displayInit();

    // S 2
    av.umsg('What should mapper do to each of the lists r that it works on?   It should return a two-element list whose first element is the name of the salesperson, which is the head of r, and whose second element is the sum of the remaining elements of r, that is, the sum of the elements in the tail of r.   We can easily obtain this sum by using reduce to compute it as highlighted in line 6 below.  Thus, the mapper function is actually using reduce at a deeper level to do the work that needs to be done on each list (note that this use of reduce inside  the mapper is not required by MapReduce).');
    m1.show();
    m1.addClass(0,"wider");
    m2.show();
    m2.addClass(0,"wider");
    m3.show();
    m3.addClass(0,"wider");    
    ml.show();
    pseudo1.hide("mapperques");
    pseudo1.show("mapperans");
    pseudo1.unhighlight("mapperans");
    pseudo1.addClass("mapperans","red");
    av.step();

    // S 3
    av.umsg('Given the list of name-sales pairs produced by the mapper, the call to reduce in lines 18-22 that returns the final answer must perform an "accumulation" process that picks the pair with the highest total sales. To do this we use a function called reducer in lines 12-13 that, given two name-sales pairs, will return the pair having the greater sales.   As a starting point for this accumulation, we give reduce a "dummy" pair with a sales total of -1 in line 21.');
    pseudo1.unhighlight([23,3, 4, 5, 6, 7, 8, 9]); 
    pseudo1.unhighlight("mapperans");
    pseudo1.removeClass("mapperans","red");
    pseudo1.show("reducerans");
    pseudo1.show("accumstartans");
    pseudo1.highlight("reducerans");
    pseudo1.highlight("accumstartans");
    pseudo1.highlight([22,14]);
    pseudo1.hide("reducerques");
    pseudo1.hide("accumstartques");
    rl.show();
    r1.show();
    r1.addClass(0,"wider");
    av.step();
    
    // S 4
    av.umsg('Having defined all three arguments to reduce, we merely need to call it to return the answer from bestSalesPerson.  The interplay of the mapping and reducing operations will do all the heavy lifting provided we set up those operations correctly.');
    pseudo1.unhighlight("accumstartans");
    pseudo1.unhighlight([14,16]);
    pseudo1.unhighlight(22);
    pseudo1.show([21, 22, 23, 25, 26]);
    // Pseudocode highlighting gets messed up after a lot of
    // high/unhighlighting.  This seems to reset everything
    pseudo1.unhighlight(0);  
    pseudo1.highlight([21, 22, 23, 25, 26]);
//     pseudo1.addClass([21, 22, 23, 25, 26], "red");
    av.step();
    
    av.recorded();
});
