/* global console, fp, PLutils */
(function() {
  "use strict";

    var RP12part1 = {    
	init: function() {

	    var functions = [

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 0: max of mins */
function (db) {   
    var mapper = function (r) {
	return fp.reduce(fp.min,fp.tl(r),fp.hd(r));
    };
    var reducer = function (x,y) {
	return fp.max(x,y);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	-1
    );
}], 


    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 1: max of maxes */
function (db) {   
    var mapper = function (r) {
	return fp.reduce(fp.max,fp.tl(r),fp.hd(r));
    };
    var reducer = function (x,y) {
	return fp.max(x,y);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	-1
    );
}], 


    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 2: min of mins */
function (db) {   
    var mapper = function (r) {
	return fp.reduce(fp.min,fp.tl(r),fp.hd(r));
    };
    var reducer = function (x,y) {
	return fp.min(x,y);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,fp.tl(db)),
	mapper(fp.hd(db))
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 3: min of maxes */
function (db) {   
    var mapper = function (r) {
	return fp.reduce(fp.max,fp.tl(r),fp.hd(r));
    };
    var reducer = function (x,y) {
	return fp.min(x,y);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,fp.tl(db)),
	mapper(fp.hd(db))
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 4: min of sums */
function (db) {   
    var mapper = function (r) {
	return fp.reduce(fp.add,r,0);
    };
    var reducer = function (x,y) {
	return fp.min(x,y);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,fp.tl(db)),
	mapper(fp.hd(db))
    );
}], 


    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 5: max of sums */
function (db) {   
    var mapper = function (r) {
	return fp.reduce(fp.add,r,0);
    };
    var reducer = function (x,y) {
	return fp.max(x,y);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	-1
    );
}], 


    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 6: sum of maxes */
function (db) {   
    var mapper = function (r) {
	return fp.reduce(fp.max,r,-1);
    };
    var reducer = function (x,y) {
	return fp.add(x,y);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	0
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 7: sum of mins */
function (db) {   
    var mapper = function (r) {
	return fp.reduce(fp.min,fp.tl(r),fp.hd(r));
    };
    var reducer = function (x,y) {
	return fp.add(x,y);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	0
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 8: sum of first and then sum of last */
function (db) {   
    var mapper = function (r) {
	return fp.makeList(fp.hd(r),fp.hd(fp.reverse(r)));
    };
    var reducer = function (x,y) {
	return fp.makeList(fp.add(fp.hd(x),fp.hd(y)),
			   fp.add(fp.hd(fp.tl(x)),fp.hd(fp.tl(y)))
			  );
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	fp.makeList(0,0)
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 9: append */
function (db) {   
    var mapper = function (r) {
	return r;
    };
    var reducer = function (x,y) {
	return fp.append(x,y);
    };
    return fp.reduceRight(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 10: append */
function (db) {   
    var mapper = function (r) {
	return r;
    };
    var reducer = function (x,y) {
	return fp.append(x,y);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 11: append of reverse */
function (db) {   
    var mapper = function (r) {
	return r;
    };
    var reducer = function (x,y) {
	return fp.append(y,x);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 


    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 12: reverse of append */
function (db) {   
    var mapper = function (r) {
	return fp.reverse(r);
    };
    var reducer = function (x,y) {
	return fp.append(y,x);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 13: list of mins */
function (db) {   
    var mapper = function (r) {
	return fp.reduce(fp.min,fp.tl(r),fp.hd(r));
    };
    var reducer = function (x,y) {
	return fp.cons(x,y);
    };
    return fp.reduceRight(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 14: list of maxes */
function (db) {   
    var mapper = function (r) {
	return fp.reduceRight(fp.max,fp.tl(r),fp.hd(r));
    };
    var reducer = function (x,y) {
	return fp.cons(x,y);
    };
    return fp.reduceRight(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 


    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 15: reversed list of mins */
function (db) {   
    var mapper = function (r) {
	return fp.reduce(fp.min,fp.tl(r),fp.hd(r));
    };
    var reducer = function (x,y) {
	return fp.cons(y,x);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 16: reversed list of maxes */
function (db) {   
    var mapper = function (r) {
	return fp.reduceRight(fp.max,fp.tl(r),fp.hd(r));
    };
    var reducer = function (x,y) {
	return fp.cons(y,x);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 


    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 17: append removing LE randomDigit */
function (db) {   
    var mapper = function (r) {
	return fp.filter( function (x) { 
	                      return fp.isGT(x,randomDigit); 
	                  }, 
			  r 
                        );
    };
    var reducer = function (x,y) {
	return fp.append(x,y);
    };
    return fp.reduceRight(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 18: append removing GE randomDigit */
function (db) {   
    var mapper = function (r) {
	return fp.filter( function (x) { 
	                      return fp.isLT(x,randomDigit); 
	                  }, 
			  r 
                        );
    };
    var reducer = function (x,y) {
	return fp.append(x,y);
    };
    return fp.reduceRight(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 


    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 19: reverse removing GE randomDigit */
function (db) {   
    var mapper = function (r) {
	return fp.reverse(
	    fp.filter( function (x) { 
	                     return fp.isLT(x,randomDigit); 
	               }, 
		       r 
                     ));
    };
    var reducer = function (x,y) {
	return fp.append(y,x);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 20: reverse removing LE randomDigit */
function (db) {   
    var mapper = function (r) {
	return fp.reverse(
	    fp.filter( function (x) { 
	                     return fp.isGT(x,randomDigit); 
	               }, 
		       r 
                     ));
    };
    var reducer = function (x,y) {
	return fp.append(y,x);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 21: counts how many times (min * randomDigit) is GT the sum */
function (db) {   
    var mapper = function (r) {
	if (fp.isGT(fp.mul(randomDigit,fp.reduce(fp.min,fp.tl(r),fp.hd(r))),
		    fp.reduce(fp.add,r,0))) {
	    return 1;
	} else {
	    return 0;
	}
    };
    var reducer = function (x,y) {
	return fp.add(x,y);
    };
    return fp.reduceRight(
	reducer,
	fp.map(mapper,db),
	0
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 22: counts how many times max > min */
function (db) {   
    var mapper = function (r) {
	if (fp.isGT(fp.reduce(fp.max,fp.tl(r),fp.hd(r)),
		    fp.reduce(fp.min,fp.tl(r),fp.hd(r)))) {
	    return 1;
	} else {
	    return 0;
	}
    };
    var reducer = function (x,y) {
	return fp.add(x,y);
    };
    return fp.reduceRight(
	reducer,
	fp.map(mapper,db),
	0
    );
}], 


    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 23: counts total number of elements */
function (db) {   
    var mapper = function (r) {
	return fp.reduceRight(
                   function (x,y) { return fp.add(1,y); },
                   r,
                   0
               );
    };
    var reducer = function (x,y) {
	return fp.add(x,y);
    };
    return fp.reduceRight(
	reducer,
	fp.map(mapper,db),
	0
    );
}], 

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 24: returns the list of element counts */
function (db) {   
    var mapper = function (r) {
	return fp.reduceRight(
                   function (x,y) { return fp.add(1,y); },
                   r,
                   0
               );
    };
    var reducer = function (x,y) {
	return fp.cons(x,y);
    };
    return fp.reduceRight(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 


    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 25: returns the reversed list of element counts */
function (db) {   
    var mapper = function (r) {
	return fp.reduceRight(
                   function (x,y) { return fp.add(1,y); },
                   r,
                   0
               );
    };
    var reducer = function (x,y) {
	return fp.cons(y,x);
    };
    return fp.reduce(
	reducer,
	fp.map(mapper,db),
	[ ]
    );
}], 

	    ];// functions array

	    // pick a random input
	    var randomDigit = Math.floor( Math.random() * 10);

	    var list = PLutils.generateRandomListOfLists();
	    var integer = Math.floor(Math.random() * 10); 
	    // pick a random function
	    var functionNumber = Math.floor(Math.random() * functions.length); 
	    //functionNumber = 25;
	    var f = functions[ functionNumber ][1];
	    var fStr = f.toString()
		.replace(/randomDigit/g,randomDigit) + ";";
	    var params = functions[ functionNumber ][0];
	    var answer;
	    try {
		// compute the answer
		answer = JSON.stringify(eval("var f = " + fStr + "; f(" + 
					     JSON.stringify(list) + ");"));
	    } 
	    catch (e) {
		answer = "error";
	    }
	    this.functionDef = "var f = " + fStr;
	    this.params = params;
	    this.functionCall = ("f( " + JSON.stringify(list) + " )")
		.split("").join(" ");
	    this.answer = answer;
	    
	    //console.log(answer);
	},// init

	checkAnswer: function (studentAnswer) {
	    return this.answer === studentAnswer.replace(/\s+/g,"");
	}
    };// RP12part1  

    window.RP12part1 = window.RP12part1 || RP12part1;
}());

