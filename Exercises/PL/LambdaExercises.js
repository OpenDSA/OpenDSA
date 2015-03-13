var jsav, expr1, str, arr, ans, opt, strArr, ansArr, varArr, optArr, var1, var2, var3, rnd, lightArr, answerArr, guessArr;

var question = {};
var L = LAMBDA;

function pickRndCharacter(c,s) {
    var list = s.split("").map(function (e,i) { return (e===c ? i : -1) ; });
    list = list.filter(function (x) { return x >= 0; });
    return list[L.getRnd(0,list.length-1)];
		       
}
function findMatchingParen(s,index) {
    var s = s.split("");
    var count = 0;
    for(var i=index+1; i<s.length; i++) {
	if (s[i] === ')') {
	    if (count === 0) {
		return i;
	    } else {
		count--;
	    }
	} else {
	    if (s[i] === '(') {
		count++;
	    }
	}
    }
    throw new Error("Could not find closing paren for the one at position " +
		    index + " in " + s);
}
function removeParenPair(s) {
    var openParen = pickRndCharacter('(',s);
    var closeParen = findMatchingParen(s,openParen);
    return s.substring(0,openParen) + s.substring(openParen+1,closeParen) + 
	s.substring(closeParen+1);
}
function removeDot(s) {
    var dot = pickRndCharacter('.',s);
    return s.substring(0,dot) + " " + s.substring(dot+1);
}
function addParens(s) {
    var n = s.length;
    var p1 = L.getRnd(0,n-1);

    var p2 = L.getRnd(0,n-1);
    return s.substring(0,dot) + " " + s.substring(dot+1);
}
function getSyntaxError(minDepth,maxDepth,vs) {
    var s = L.printExp( L.getRndExp(1,minDepth,maxDepth,vs,""));
    var rnd = L.getRnd(1,2);
    switch (rnd) {
    case 1: 
	if (s.indexOf('(') !== -1) {
            console.log("removed parens");
	    s = removeParenPair(s);
	}
	//  leave s unchanged if it does not contain any parens
	break;
    case 2: 
	if (s.indexOf('.') !== -1) {
            console.log("removed dot");
	    s = removeDot(s);
	}
	//  leave s unchanged if it does not contain any dot
	break;
    case 3: 
        console.log("added parens");
	s = addParens(s);
	break;
    }    
    return s;
}
// Initialize Alpha Multiple Choice Exercises.
init_alpha = function()
{
    var vs = "uvwxyz";
    var maxDepth = 10;
    var minDepth = 7;
    var exp;
    if (L.getRnd(0,1) === 0) {
	// syntactically correct lambda exp
	exp = L.printExp( L.getRndExp(1,minDepth,maxDepth,vs,""));
    } else {
	exp = getSyntaxError(minDepth,maxDepth,vs);
    }
    jsav = new JSAV("jsav", {"animationMode": "none"});
    expr1 = jsav.code(exp, {lineNumbers: false});

    question.statement = exp;
}


// Generate incorrect answers for Alpha Choice Exercise.
alphaChoice = function()
{
	return 12;
}

// Return the answer for the current exercise.
genAnswer = function()
{
	return ans;
}
