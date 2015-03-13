var jsav, expr1, str, arr, ans, opt, strArr, ansArr, varArr, optArr, var1, var2, var3, rnd, lightArr, answerArr, guessArr;

var question = {};

// Initialize Alpha Multiple Choice Exercises.
init_alpha = function()
{
    var L = LAMBDA;
    var vs = "uvwxyz";
    var maxDepth = 10;
    var minDepth = 7;

    question.statement = L.printExp( L.getRndExp(1,minDepth,maxDepth,vs,""));

    jsav = new JSAV("jsav", {"animationMode": "none"});
    expr1 = jsav.code(question.statement, {lineNumbers: false});
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
