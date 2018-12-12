/* global document, console, $, JSAV, LAMBDA */

(function ($) {
    "use strict";
    var av;

    // Helper functions

    function infiniteLoop(reduction) { return reduction[0].length > 1; }
    function tooLong(reduction) { 
	return 35 < reduction.map(function (x) { return x[0].length; })
	    .reduce(function(a,b) { return Math.max(a,b);} , -1);
    }
    function sameReduction(r1,r2) {
	if (r1.length !== r2.length) {
	    return false;
	} else {
	    for(var i=1; i<r1.length; i++) {
		if (r1[i][0] !== r2[i][0]) {
		    return false;
		}
	    }
	    return true;
	}
    }

    var vars = "uvxyz";
    var numSteps = 3;  // minimum number of reductions in this exercise
    var e;


    var order = "applicative";	// Toggle if want normal
    var theExp = [];
    var normalRed, applicativeRed;

    function genExp () {
	var theExpLocal = [];
	var normalRed, applicativeRed;
	while (theExpLocal.length < numSteps+1 || theExpLocal.length > numSteps+2) {
	    e = LAMBDA.getRndExp(1,2,6,vars,"");
	    normalRed = LAMBDA.reduceToNormalForm(e,"normal");
	    applicativeRed = LAMBDA.reduceToNormalForm(e,"applicative");   
	    if (order === "normal") {
		if ( infiniteLoop(normalRed) ||
		     sameReduction(normalRed,applicativeRed) ||
		     tooLong(normalRed) ) {
		    theExpLocal = [];
		} else {
		    theExpLocal = normalRed;
		}
	    } else { // applicative order
		if ( infiniteLoop(applicativeRed) ||
		     sameReduction(normalRed,applicativeRed) ||
		     tooLong(applicativeRed) ) {
		    theExpLocal = [];
		} else {
		    theExpLocal = applicativeRed;
		}
	    }
	}
	theExpLocal = theExpLocal.map(function(a) { return a[0]; });
	theExpLocal = theExpLocal.map(function (x) { return x.replace(/\u03BB/g,'^');}); 
	return theExpLocal;
    };


    // Initially, upon load
    theExp = genExp();

    //////////////////////////////// parseTree3_grammar now has the parser
    

    function runitna() {
	ODSA.AV.reset(true);
	
// 	JSAV.init();
// 	JSAV.ext.SPEED = 500;
// 	var av;

	//     // Use this instatiation for embedding in standalone parseTree1.html file
	// //    av = new JSAV($("#parseTree"));
	//     //////////////////////////////////////////////////////
	// 
	//     // Use this instatiation for embedding as inlineav in RST file
	//     var av_name = "parseTree3a";
	//     var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;
	//     av = new JSAV(av_name);
	//     //////////////////////////////////////////////////////

//	av = new JSAV($('.avcontainer'));
	// Used this for loading from stanalone HTML page
	var av_name = $('.avcontainer');
	theExp = genExp();
	console.log($('.avcontainer'));
	LAMBDA.interpret(av_name,theExp[0],"applicative");
    };	

    function runitnn() {
	ODSA.AV.reset(true);
	
	// Used this for loading from stanalone HTML page
	var av_name = $('.avcontainer');
	theExp = genExp();
	console.log($('.avcontainer'));
	LAMBDA.interpret(av_name,theExp[0],"normal");
    };	

    function runitpa() {
	ODSA.AV.reset(true);
	
	// Used this for loading from stanalone HTML page
	var av_name = $('.avcontainer');
	//	theExp = genExp();
	console.log($('.avcontainer'));
	LAMBDA.interpret(av_name,theExp[0],"applicative");
    };	

    function runitpn() {
	ODSA.AV.reset(true);
	
	// Used this for loading from stanalone HTML page
	var av_name = $('.avcontainer');
//	theExp = genExp();
	console.log($('.avcontainer'));
	LAMBDA.interpret(av_name,theExp[0],"normal");
    };	

    function about() {
	alert("Generate a lambda expression and beta-reduce until it is in beta-normal form");
    };
    
    function help() {
	alert("Choose a new expression or apply a different order to the previous expression");
    };
    
    // Connect action callbacks to the HTML entities
    $('#about').click(about);
    $('#runitna').click(runitna);
    $('#runitnn').click(runitnn);
    $('#runitpa').click(runitpa);
    $('#runitpn').click(runitpn);
    $('#help').click(help);
    $('#reset').click(ODSA.AV.reset);
}(jQuery));

//});
