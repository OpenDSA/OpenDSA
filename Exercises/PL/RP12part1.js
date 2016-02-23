/* global console, fp, PLutils */
(function() {
  "use strict";

    var RP12part1 = {    
	init: function() {

	    var functions = [

    [ "<span class='string'>db</span> is a list of (flat) integer lists",
      /* 0: add elements plus init. acc. */
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

	    ];// functions array

	    // pick a random input
	    var randomDigit = Math.floor( Math.random() * 10);
	    var randomDigit2 = Math.floor( Math.random() * 10);

	    var list = PLutils.generateRandomListOfLists();
	    console.log(JSON.stringify(list));
	    var integer = Math.floor(Math.random() * 10); 
	    // pick a random function
	    var functionNumber = Math.floor(Math.random() * functions.length); 
	    //functionNumber = 26;
	    var f = functions[ functionNumber ][1];
	    var fStr = f.toString()
		.replace(/randomDigit2/g,randomDigit2)
		.replace(/randomDigit/g,randomDigit) + ";";
	    var params = functions[ functionNumber ][0];
	    var answer;
	    try {
		// compute the answer
		if (f.length===1) {
		    // function has one argument
		    answer = JSON.stringify(eval("var f = " + fStr + "; f(" + 
						 JSON.stringify(list) + ");"));
		} else if (f.length===2) {
		    // function has two argument
		    answer = JSON.stringify(
			eval("var f = " + fStr + "; f(" + integer + "," +
			     JSON.stringify(list) + ");"));
		}
	    } 
	    catch (e) {
		answer = "error";
	    }
	    this.functionDef = "var f = " + fStr;
	    this.params = params;
	    if (f.length===1) {
		this.functionCall = ("f( " + JSON.stringify(list) + " )")
		    .split("").join(" ");
	    } else {
		this.functionCall = ("f( " + integer + "," + 
				     JSON.stringify(list) + " )")
		    .split("").join(" ");
	    }
	    this.answer = answer.replace(/\+/g,"");
	    
	    console.log(answer);
	},// init

	checkAnswer: function (studentAnswer) {
	    return this.answer === studentAnswer.replace(/\s+/g,"");
	}
    };// RP12part1  

    window.RP12part1 = window.RP12part1 || RP12part1;
}());

