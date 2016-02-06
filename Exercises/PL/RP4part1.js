/* global window */

(function() {
    "use strict";

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

    case 1: <s> ::= X | <s> Y         pattern: X through XYYYY
    case 2: <s> ::= X | Y <s>         pattern: Y through XXXXY
    case 3: <s> ::= <s> X Y | Z       pattern: Z through ZXYXYXY
    case 4: <s> ::= X <s> Y | Z       pattern: Z through XXXZYYY
    case 5: <s> ::= X Y <s> | Z       pattern: Z through XYXYXYZ
        <s> is always the same
*/
    
    var grammar, tokenLines, options, answer;

    var possibleTokenNames;
    var numCases = 5;
    var thisCase;
    var tokenNames;
    var numAttempts;
    var aAscii = "a".charCodeAt(0);
    var floor = Math.floor;
    var rnd = Math.random;
    var tokens;
    var numOptions = 5;
    var validStrings;
    var invalidStrings;
    
    function generateTokens() {

	var indices = [];  // indices of available letters for tokens
	// since there are at most three tokens and two ranges per token
	// we'll generate 6 ranges
	var ranges = [];
	var startIndex;
	var randNum, numEmpty;

	var tmp, i;

	function formatRange(r) {
	    return (r.start === 0 ? 
		    "empty" : ( r.width === 1 ?
			'"' + String.fromCharCode(aAscii + r.start - 1) + '"' :
			("[" + 
			   String.fromCharCode(aAscii + r.start - 1) +
			   "-" +  
			   String.fromCharCode(aAscii + r.start + r.width - 2) +
			   "]")));
	}// formatRange inner function

	// return the index of a letter such that a w-wide range starting at
	// that letter is easy to find (b/c the w consecutive letters have
	// not yet been allocated to another range); returns -1 otherwise
        function findStart(w) {
	    var start, startIndex;
	    var numAttempts = 0;
	    while (true) {
		start = floor(rnd()*indices.length);
		if (numAttempts === 50) {
		    break;
		}
		if (w === 1 && indices[start]) {
		    startIndex = indices[start];
		    indices[start] = undefined;
		    break;
		}
		if (w === 2 && 
		    indices[start] &&
		    indices[start+1]) {
		    startIndex = indices[start];
		    indices[start] = undefined;
		    indices[start+1] = undefined;		
		    break;
		}
		if (w === 3 && 
		    indices[start] &&
		    indices[start+1] &&
		    indices[start+2]) {
		    startIndex = indices[start];
		    indices[start] = undefined;
		    indices[start+1] = undefined;		
		    indices[start+2] = undefined;
		    break;
		}
		numAttempts++;
	    }
	    if (numAttempts === 50) {
		return -1;
	    } else {
		return startIndex;
	    }
	}// findStart inner function

	function findFirstAvailableRange(max) {
	    var width, start;
	    for(var i = 0; i < indices.length; i++) {
		if (indices[i]) {
		    width = 1;
		    start = indices[i];
		    indices[i++] = undefined;
		    while (indices[i] && width<max) {
			indices[i] = undefined;
			i++;
			width++;
		    }
		    return { start: start, width: width };
		}
	    }
	    // should never get here because there should always at least
	    // one letter available (not yet included in any other range)
	}// findFirstAvailableRange inner function

	function joinRanges(r1,r2) {
	    var r1Start, r1End, r2Start, r2End;
	    var r1Meetr2, r2Meetr1;
	    var tmp;
	    r1Start = r1.charAt(1);
	    if (r1.charAt(0) === '"') {  // r1 is just one letter
		r1End = r1Start;
	    } else {
		r1End = r1.charAt(3); // r1 is an actual range
	    }
	    r2Start = r2.charAt(1);
	    if (r2.charAt(0) === '"') {  // r2 is just one letter
		r2End = r2Start;
	    } else {
		r2End = r2.charAt(3); // r2 is an actual range
	    }
	    r1Meetr2 = (r2Start.charCodeAt(0) - r1End.charCodeAt(0)) === 1;
	    r2Meetr1 = (r1Start.charCodeAt(0) - r2End.charCodeAt(0)) === 1;
	    if (r1Meetr2) {
		return "[" + r1Start + "-" + r2End + "]";
	    } else if (r2Meetr1) {
		return "[" + r2Start + "-" + r1End + "]";
	    } else {
		if (r1.charAt(0) === '"' && r2.charAt(0) === '"') { 
		    return r1.substring(0,2) + r2.substring(1,3);
		} else {
		    return r1 + r2;
		}
	    }
	}//joinRanges inner function

	tokens = [];
	// first, generate all available letters
	for(i = 1; i<=18; i++) {
	    indices.push(i);
	}
	// pick 6 random ranges
	numEmpty = 0;
	for(var r = 1; r<=6; r++) {
	    randNum = rnd();
	    if (randNum < 0.3) {
		startIndex = findStart(3);
		if (startIndex > -1) {
		    ranges.push( { "start": startIndex, "width": 3} );	    
     		} else {
		    break;
		}
	    } else if (randNum < 0.5) {
		ranges.push( findFirstAvailableRange(1) );
		// startIndex = findSingle();
		// ranges.push( { "start": startIndex, "width": 1} );	    
	    } else if (numEmpty < 3 && randNum < 0.8) {
		ranges.push( { "start": 0, "width": 0} );
		numEmpty++;
	    } else {
 		startIndex = findStart(2);
		if (startIndex > -1) {
		    ranges.push( { "start": startIndex, "width": 2} );	    
     		} else {
		    break;
		}
	    }
	}
	while (ranges.length < 6) {
	    var range = findFirstAvailableRange(3);
	    ranges.push( range );
	}		
	// eliminate empty ranges
	ranges = ranges.filter( function(r) { return r.start>0; } );
/*
	if (ranges.length <3) {
            // we should never here
	    console.log( "******************** NOoooO!!! *************");
	}
*/	
	// assign ranges to the tokens	
	tokens.push({ name: tokenNames[0], regexp: formatRange(ranges[0]) });
	tokens.push({ name: tokenNames[1], regexp: formatRange(ranges[1]) });
	ranges.splice(0,2); // delete the ranges just assigned
	if (tokenNames.length === 3) {
	    tokens.push({ name: tokenNames[2], 
			  regexp: formatRange(ranges[0]) });
	    ranges.splice(0,1); // delete the range just assigned
	}
	
	for(i=0; i<tokens.length; i++) {
	    if (ranges.length > 0 && rnd()<0.5) {
		tokens[i].regexp = joinRanges( tokens[i].regexp,
					       formatRange(ranges[0]) );
		ranges.splice(0,1);
	    }
	}
	tokenLines = [];
	// note that tokens.length must equal 2 or 3
	for(i=0; i<tokens.length; i++) {
	    tmp = tokens[i].regexp.replace(/"(\w)"/g,"[$1]");
	    // above: replace "a" with [a] for Jison regexp syntax (not sure why)
	    while (tmp.length < 22) {
		tmp += " ";
	    }
	    tokenLines.push(  tmp + '{ return "' + 
			      tokens[i].name + '";           }\n');
	}
    }// generateTokens

    function generateCharacterInRange(range) {
	// range is of the form:  "[f-l]"
	var first = range.charCodeAt(1);
	var last = range.charCodeAt(3);
	return String.fromCharCode(floor(rnd() * (last - first + 1)) + first);
    }// generateCharacterInRange function

    function generateStringFromToken(token) {
	var regexp = token.regexp;
	var result = "";
	var cStart = regexp.indexOf('"');  // start of "..." part of regexp
	var rStart = regexp.indexOf('[');  // start of "[ ... ]" part of regexp	
	var r2Start; // start of second "[ ... ]" part of regexp	
	var firstRange, secondRange;
	if (rStart === -1) {  // no range in regexp
	    return regexp.substring(1,regexp.length-1); // strip off quotes
	} else {  // at least one range in regexp
	    r2Start = regexp.indexOf("[",rStart+1);
	    if (cStart === -1) {  // regexp contains only one or two ranges
		if (r2Start === -1) { // regexp is one range
		    return generateCharacterInRange(regexp);
		} else { // regexp has the form: [?-?][?-?]
		    firstRange = regexp.substring(0,r2Start);
		    secondRange = regexp.substring(r2Start);
		    return generateCharacterInRange(firstRange) +
			generateCharacterInRange(secondRange);
		}	    
	    } else { // regex contains one constant and one range
		if (cStart < rStart) { // regexp has the form: "???"[?-?]
		    firstRange = regexp.substring(rStart);
		    return regexp.substring(1,regexp.indexOf('"',1)) +
			generateCharacterInRange(firstRange);
		} else { // regexp has the form: [?-?]"???"
		    firstRange = regexp.substring(0,cStart);
		    return generateCharacterInRange(firstRange) +
			regexp.substring(cStart+1, regexp.length-1); 
		}
	    }
	}
	// should never get here
    }// generateStringFromToken method

    function generateStringFromPattern(pattern) {
	var result = "";
	for(var i=0; i<pattern.length; i++) {
	    result += generateStringFromToken( tokens[ pattern.charAt(i)] );
	}
	return result;
    } //generateString function

    function generateStrings() {
	var patterns;
	var antipatterns;
	var str;
	var numValid;
	switch (thisCase) {
	case 1:
	    // <s> ::= 0 | <s> 1         pattern: 0 through 01111
	    patterns = ["01", "011", "0111","01111" ];
	    antipatterns = [ "10", "010", "110","0110" ];
	    break;
	case 2:
	    // <s> ::= 0 | 1 <s>         pattern: 0 through 11110
	    patterns = ["10", "110", "1110","11110" ];
	    antipatterns = [ "01", "010", "1011","11101" ];
	    break;
	case 3:
	    // <s> ::= 2 | <s> 0 1       pattern: 2 through 20101
	    patterns = ["2", "201", "20101" ];
	    antipatterns = [ "21", "210", "01012" ];
	    break;
	case 4:
	    // <s> ::= 2 | 0 <s> 1       pattern: 2 through 00211
	    patterns = ["2", "021", "00211","0002111" ];
	    antipatterns = [ "01", "210", "0021", "002111"];
	    break;
	case 5:
	    // <s> ::= 2 | 0 1 <s>       pattern: 2 through 01012
	    patterns = ["2", "012", "01012", "0101012" ];
	    antipatterns = [ "01", "201", "0102", "01011" ];
	    break;
	}// switch
	validStrings = [];
	invalidStrings = [];	
	numValid = floor( rnd() * (numOptions+1) );
	/*
	console.log("Correct answer: " + numValid);
	*/
	while (validStrings.length < numValid) {
	    // generate valid strings
	    str = generateStringFromPattern(
		patterns[ floor(rnd()*patterns.length) ]);
	    if (validStrings.indexOf(str) === -1) {
		validStrings.push(str);
	    }
	}
	while (validStrings.length + invalidStrings.length < numOptions) {
	    // generate invalid strings
	    str = generateStringFromPattern(
		antipatterns[ floor(rnd()*antipatterns.length) ]);
	    if (invalidStrings.indexOf(str) === -1) {
		invalidStrings.push(str);
	    }
	}	    
    }// generateStrings function

    var RP4part1 = {

	// this function initializes the following variables with random values:
	//     tokenLines: the (lexical structures) regular expressions/tokens
	//     grammar: the (phrase structure) productions
	//     options:
        //     answer:
	init: function() {
	    var token1, token2, token3;
	    var index, numTokens;	    
	    var correct = [], incorrect = [];

	    function shuffle(array){
		for(var j, x, i = array.length; 
		    i; 
		    j = Math.floor(Math.random() * i), 
		    x = array[--i], array[i] = array[j], array[j] = x) {  
		    // block added for jshint
		    var dummy = 1; 
		}
		return array;
	    }
	    tokenNames = [];
	    possibleTokenNames = [ 'U', 'V', 'W', 'X', 'Y', 'Z' ];

	    // pick first token name
	    index = floor( rnd() * possibleTokenNames.length );
	    token1 = possibleTokenNames[ index ]; 
	    tokenNames.push( token1 );
	    possibleTokenNames.splice(index,1);
	    // pick second token name
	    index = floor( rnd() * possibleTokenNames.length );
	    token2 = possibleTokenNames[ index ]; 
	    tokenNames.push( token2 );
	    possibleTokenNames.splice(index,1);
	    // pick third token name
	    index = floor( rnd() * possibleTokenNames.length );
	    token3 = possibleTokenNames[ index ]; 
	    tokenNames.push( token3 );
	    possibleTokenNames.splice(index,1);

	    // pick type of grammar called thisCase (see comments above)
	    thisCase = 1 + floor( rnd() * numCases );
	    switch (thisCase) {
		case 1:
		numTokens = 2;
		tokenNames.pop();
		grammar  = 's\n';
		grammar += '  : "' + token1 + '"\n';
		grammar += '  | s "' + token2 + '"\n';
		grammar += '  ;';
		break;
	    case 2:
		numTokens = 2;
		tokenNames.pop();
		grammar  = 's\n';
		grammar += '  : "' + token1 + '"\n';
		grammar += '  | "' + token2 + '" s\n';
		grammar += '  ;';
		break;
	    case 3:
		numTokens = 3;
		grammar  = 's\n';
		grammar += '  : "' + token3 + '"\n';
		grammar += '  | s "' + token1 + '" "' + token2 + '"\n';
		grammar += '  ;';
		break;
	    case 4:
		numTokens = 3;
		grammar  = 's\n';
		grammar += '  : "' + token3 + '"\n';
		grammar += '  | "' + token1 + '" s "' + token2 + '"\n';
		grammar += '  ;';
		break;
	    case 5:
		numTokens = 3;
		grammar  = 's\n';
		grammar += '  : "' + token3 + '"\n';
		grammar += '  | "' + token1 + '" "' + token2 + '" s\n';
		grammar += '  ;';
		break;
	    }
	    	    
	    generateTokens();
	    generateStrings();

/*
	    console.log("valid:");
	    console.log(validStrings);
	    console.log("invalid:");
	    console.log(invalidStrings);
*/

	    // export to the HTML page
	    this.tokenLines = tokenLines.join("");
	    this.productions = grammar;
	    this.strings =
		"<li>" +
		shuffle(validStrings.concat(invalidStrings))
		.join("<li>\n<li>") +
		"</li>\n";
	    this.answer = validStrings.length;

	}// init function

    };// RP4part1 object

    window.RP4part1 = window.RP4part1 || RP4part1;
}());

