/* global console, fp, PLutils */
(function() {
  "use strict";

    var RP13part5 = {    
	init: function() {

	    var functions = [

    [ "The following function takes in a (flat) list of integers and, after " +
      "you replace the comment made up of question marks with the correct " +
      "answer, is supposed to return the sum of the elements in the input " +
      "list.",
      /* 0: the add function */
function (ns) {
    var h = function (ns,k) {
	if (fp.isNull(ns)) {
	    return k(0);
	} else {
	    return h(fp.tl(ns),
		     function (x) {
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; })
},
      "return k(fp.add(x,fp.hd(ns)));" ,
      "return k(fp.add(fp.hd(x),ns));" ,
      "return fp.add(x,k(fp.hd(ns)));" ,
      "return fp.add(k(x),fp.hd(ns));" 
    ],
   
	    ];// functions array

	    // pick a random input
	    var randomDigit = Math.floor( Math.random() * 10);

	    var list = PLutils.generateRandomList();
	    var integer = Math.floor(Math.random() * 10); 
	    // pick a random function
	    var functionNumber = Math.floor(Math.random() * functions.length); 
	    //functionNumber = 25;
	    var f = functions[ functionNumber ][1];
	    var correctAnswer = functions[ functionNumber ][2];
	    this.initialStatement = functions[ functionNumber ][0];
	    this.option1 = functions[ functionNumber ][3];
	    this.option2 = functions[ functionNumber ][4];
	    this.option3 = functions[ functionNumber ][5];
	    var fStr = f.toString()
		.replace(/\/\*.+\*\//,correctAnswer);
	    var answer;
	    try {
		// compute the answer
		answer = JSON.stringify(eval("var f = " + fStr + "; f(" + 
					     JSON.stringify(list) + ");"));
	    } 
	    catch (e) {
		answer = "error";
	    }
	    this.functionDef = "var f = " + f.toString();
	    this.functionCall = ("f( " + JSON.stringify(list) + " )")
		.split("").join(" ");
	    this.answer = correctAnswer;
	    
	    console.log(answer);
	},// init

	checkAnswer: function (studentAnswer) {
	    return this.answer === studentAnswer.replace(/\s+/g,"");
	}
    };// RP13part5  

    window.RP13part5 = window.RP13part5 || RP13part5;
}());

