/*global window */

/*
    here are the possible patterns for the randomly generated grammars:

    first, the tokens: random names among  U, V, W, X, Y, Z
       RegExp1:  [a-c]
       RegExp2:  x[a-c]
       RegExp3:  [a-c]x
       RegExp4:  [a-c][d-f]
     where the letters (a,c,d,f,x) are chosen randomly among 
          { 'a', 'b', ... , 'r' } (18 options)
     We can look at each one of the four RegExp options above as having
     this structure:  
                        range1 range2 
     where each range spans at most three characters
           at least one range spans at least two characters
           the other range may span a single character
                 or even no characters at all (RegExp1)
		 
        Each range is encoded as (start_index,width). For example:
	   [a-c] is encoded as (1,3)
	   [b-c] is encoded as (2,2)
           c     is encoded as (3,1)
           ""    is encoded as (0,0)  by convention

    second, the productions:

    case 1: <s> ::= <s> X | Y         pattern: Y through YXXXX
    case 2: <s> ::= X <s> | Y         pattern: Y through XXXXY
    case 3: <s> ::= <s> X Y | Z       pattern: Z through ZXYXYXY
    case 4: <s> ::= X <s> Y | Z       pattern: Z through XXXZYYY
    case 5: <s> ::= X Y <s> | Z       pattern: Z through XYXYXYZ
        <s> is always the same
*/

(function() {
    "use strict";
    
    var grammar;
    var possibleTokens = [ 'U', 'V', 'W', 'X', 'Y', 'Z' ];
    var numCases = 5;
    var thisCase;
    var tokenNames = [];
    var tokenLines = [];
    var numAttempts;
    var numRanges;
    var aAscii = "a".charCodeAt(0);
    var floor = Math.floor;
    var rnd = Math.random;

    function generateTokens(names) {

	var indices = [];  // indices of available letters for tokens
	// since there are at most three tokens and two ranges per token
	// we'll generate 6 ranges
	var ranges = [];
	var startIndex;

	function formatRange(r) {
	    return (r.start === 0 
		    ? "empty"
		    : ( r.width === 1 
			? String.fromCharCode(aAscii + r.start - 1)
			: ("[" + 
			   String.fromCharCode(aAscii + r.start - 1) +
			   "-" +  
			   String.fromCharCode(aAscii + r.start + r.width - 2) +
			   "]")));
	}

	// return the index of a letter such that a w-wide range starting at
	// that letter is possible (b/c the three consecutive letters have
	// not yet been allocated to another range); returns -1 otherwise
        function findStart(w) {
	    var startIndex;
	    var numAttempts = 0;
	    while (true) {
		startIndex = floor(rnd()*indices.length);
		if (numAttempts === 50) {
		    break;
		}
		if (w === 1 && indices[startIndex]) {
		    indices[startIndex] = undefined;
		    break;
		}
		if (w === 2 && 
		    indices[startIndex] &&
		    indices[startIndex+1]) {
		    indices[startIndex] = undefined;
		    indices[startIndex+1] = undefined;		
		    break;
		}
		if (w === 3 && 
		    indices[startIndex] &&
		    indices[startIndex+1] &&
		    indices[startIndex+2]) {
		    indices[startIndex] = undefined;
		    indices[startIndex+1] = undefined;		
		    indices[startIndex+2] = undefined;
		    break;
		}
		numAttempts++;
	    }
	    if (numAttempts === 50) {
		return -1;
	    } else {
		return indices[startIndex];
	    }
	}// findStart function

	// first, generate all available letters (except the last two)
	for(var i = 1; i<=16; i++) {
	    indices.push( i);
	}
	// pick up to 6 random, 3-wide ranges
	for(var r = 1; r<=6; r++) {
	    startIndex = findStart(3);
	    if (startIndex > -1) {
		ranges.push( { "start": startIndex, "width": 3} );	    
     	    } else {
		break;
	    }
	}

	ranges.map( function(r) { console.log( formatRange(r) ); } );
	console.log("found " + ranges.length + " ranges");
	while (ranges.length < 6) {
	    r = rnd();
	    if (r < 0.4) {
		// add an empty range
		ranges.push( { start:0, width: 0} );
	    } else if (r < 0.8) {
		// add a single character
		ranges.push( { start: findStart(1), width: 1} );
	    } else {
		// add a two-wide range
		ranges.push( { start: findStart(2), width: 2} );
	    }
	}
	ranges.map( function(r) { console.log( formatRange(r) ); } );

	console.log(JSON.stringify(ranges));
	for(var i=0; i<names.length; i++) {
	    var regexp = "";
	    

	    tokenLines.push( regexp + 'return "' + names[i] + '"\n'); 
	    
	    //console.log(names[i]);
	}
    }

    var RP4part1 = {

	init: function() {
	    var token1, token2, token3;
	    var index, numTokens;	    
	    // pick third token name (tokens 1 and 2 may be equal to this one)
	    index = floor( rnd() * possibleTokens.length );
	    token3 = possibleTokens[ index ]; 
	    // pick first token name
	    index = floor( rnd() * possibleTokens.length );
	    token1 = possibleTokens[ index ]; 
	    tokenNames.push( token1 );
	    possibleTokens.splice(index,1);
	    // pick second token name distinct from token1
	    index = floor( rnd() * possibleTokens.length );
	    token2 = possibleTokens[ index ]; 
	    tokenNames.push( token2 );
	    possibleTokens.splice(index,1);
	    // remember token3 picked earlier
	    tokenNames.push( token3 );
	    // pick type of grammar called thisCase (see comments above)
	    thisCase = 1 + floor( rnd() * numCases );
	    console.log(thisCase);
	    //thisCase = 5;
	    switch (thisCase) {
		case 1:
		numTokens = 2;
		grammar  = 's\n';
		grammar += '  : "' + token1 + '"\n';
		grammar += '  | s "' + token2 + '"\n';
		grammar += '  ;\n';
		break;
	    case 2:
		numTokens = 2;
		grammar  = 's\n';
		grammar += '  : "' + token1 + '"\n';
		grammar += '  | "' + token2 + '" s\n';
		grammar += '  ;\n';
		break;
	    case 3:
		numTokens = 3;
		grammar  = 's\n';
		grammar += '  : "' + token3 + '"\n';
		grammar += '  | s "' + token1 + '" "' + token2 + '"\n';
		grammar += '  ;\n';
		break;
	    case 4:
		numTokens = 3;
		grammar  = 's\n';
		grammar += '  : "' + token3 + '"\n';
		grammar += '  | "' + token1 + '" s "' + token2 + '"\n';
		grammar += '  ;\n';
		break;
	    case 5:
		numTokens = 3;
		grammar  = 's\n';
		grammar += '  : "' + token3 + '"\n';
		grammar += '  | "' + token1 + '" "' + token2 + '" s\n';
		grammar += '  ;\n';
		break;
	    }
	    if (token3 === token1 || token3 === token2) {
		tokenNames.pop();
	    }
	    
	    generateTokens(tokenNames);

		//console.log(JSON.stringify(possibleTokens));

	    console.log(grammar);
	    console.log(tokenLines);
	}// init function

    };// RP4part1 object

    window.RP4part1 = window.RP4part1 || RP4part1;
}());
