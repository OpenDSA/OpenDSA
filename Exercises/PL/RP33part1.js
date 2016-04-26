/* global console, is */
(function() {
  "use strict";

    var arg1, arg2, arg3, p1, p2, p3, hd;
    var variables = [ ["x","y","z"], 
		      ["a","b","c"], 
		      ["f","g","h"], 
		      ["i","j","k"], 
		      ["u","v","w"] ];
    var vs, rnd;
    var index;

    function initRandomParts () {
	index = 5 + Math.floor(5*Math.random());
	vs = variables[ Math.floor(variables.length * Math.random())];
	arg1 = 1 + Math.floor(5 * Math.random());	    
	arg2 = 1 + Math.floor(5 * Math.random());
	arg3 = 1 + Math.floor(5 * Math.random());
	rnd = Math.floor(25 * Math.random());
	switch (rnd) {
	case 0:  hd = 0 ; p1 = "1"; p2= "2"; p3 = "0+1+2"; break;
	case 1:  hd = 0 ; p1 = "2"; p2= "1"; p3 = "0+1+2"; break;
	case 2:  hd = 1 ; p1 = "1"; p2= "2"; p3 = "0+1+2"; break;
	case 3:  hd = 1 ; p1 = "2"; p2= "1"; p3 = "0+1+2"; break;
	case 4:  hd = 2 ; p1 = "1"; p2= "2"; p3 = "0+1+2"; break;
	case 5:  hd = 2 ; p1 = "2"; p2= "1"; p3 = "0+1+2"; break;
	case 6:  hd = 0 ; p1 = "0+1+2"; p2= "1"; p3 = "2"; break;
	case 7:  hd = 0 ; p1 = "0+1+2"; p2= "2"; p3 = "1"; break;
	case 8:  hd = 1 ; p1 = "0+1+2"; p2= "1"; p3 = "2"; break;
	case 9:  hd = 1 ; p1 = "0+1+2"; p2= "2"; p3 = "1"; break;
	case 10: hd = 2 ; p1 = "0+1+2"; p2= "1"; p3 = "2"; break;
	case 11: hd = 2 ; p1 = "0+1+2"; p2= "2"; p3 = "1"; break;
	case 12: hd = 0 ; p1 = "2-1"; p2= "2+3"; p3 = "0"; break;
	case 13: hd = 1 ; p1 = "2-1"; p2= "2+3"; p3 = "0"; break;
	case 14: hd = 2 ; p1 = "2-1"; p2= "2+3"; p3 = "0"; break;
	case 15: hd = 0 ; p1 = "1"; p2= "0+2-1"; p3 = "0"; break;
	case 16: hd = 1 ; p1 = "1"; p2= "0+2-1"; p3 = "0"; break;
	case 17: hd = 2 ; p1 = "1"; p2= "0+2-1"; p3 = "0"; break;
	case 18: hd = 0 ; p1 = "0+1"; p2= "2-0"; p3 = "3+2"; break;
	case 19: hd = 1 ; p1 = "0+1"; p2= "2-0"; p3 = "3+2"; break;
	case 20: hd = 2 ; p1 = "0+1"; p2= "2-0"; p3 = "3+2"; break;
	case 21: hd = 0 ; p1 = "0-1"; p2= "2-0"; p3 = "3-2"; break;
	case 22: hd = 1 ; p1 = "0-1"; p2= "2-0"; p3 = "3-2"; break;
	case 23: hd = 2 ; p1 = "0-1"; p2= "2-0"; p3 = "3-2"; break;
	case 24: hd = 0 ; p1 = "1+0-2"; p2= "2-1"; p3 = "2-0"; break;
	}
    }// initRandomParts function

    function generateCode() {
	var numbers, vars;
	var q1 = p1.replace(/0/g,vs[0]).replace(/1/g,vs[1]).replace(/2/g,vs[2]);
	var q2 = p2.replace(/0/g,vs[0]).replace(/1/g,vs[1]).replace(/2/g,vs[2]);
	var q3 = p3.replace(/0/g,vs[0]).replace(/1/g,vs[1]).replace(/2/g,vs[2]);
	var code = "var helper = function (";	
	code += vs[0] + "," + vs[1] + "," + vs[2] + ") {<br />";  
	code += "    return is.cons( " + vs[hd] + ",<br />";
	code += "                    function () {<br />";
	code += "                         return helper(" + q1 + "," + 
	    q2 + "," + q3;
	code += ");<br />";
	code += "                    }<br />";
	code += "                  );<br />";
	code += "};<br />";
	code += "var seq = helper(" + arg1 + "," + arg2 + "," + arg3 + ");";
	return code;
    }// generateCode function

    var RP33part1 = {    
	init: function() {
	    initRandomParts();
	    var callToSeq = "is.take(seq," + (index+1) + ");";
	    this.index = index + "";
	    this.indexPlusOne = (index+1) + "";
	    this.code = generateCode();
	    this.answer = "" + 
		eval(this.code.replace(/<br \/>/g,"\n") + callToSeq)[index];

	    //console.log(eval(this.code.replace(/<br \/>/g,"\n") + callToSeq));
	    //console.log(this.answer);
	}, //init
	
	checkAnswer: function (studentAnswer) {
	    return this.answer.replace(/\s+/g,"") ===
		studentAnswer.replace(/\s+/g,"");
	}
    };// RP33part1  

    window.RP33part1 = window.RP33part1 || RP33part1;
}());

