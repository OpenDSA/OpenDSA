////---Shared Methods---////
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

var av=null;

var maxArrayVal = 25;
var randomIntArray = function(length){
	var array = [];
	array.length = length;
	//console.log("generate random in array of length:"+array.length);
	for(var i=0;i<length;i++)
	{
		array[i] = Math.floor((Math.random() * maxArrayVal) );
	}
	return array;
};

//generates a number from 0->max inclusive
var randNum = function(max){
	return Math.floor((Math.random() * max) );
};

var randomTrueFalse = function(){
	var r = randNum(2);
	return (r==1);
};

//range: [min,max]
var randNumBetween = function(min, max){
	//return Math.floor((Math.random() * max)+min );
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

var correctOption = -1;
var chooseCorrect = function(){
	correctOption = randNum(4);
};

var arrayToString = function(array){
	//console.log("arrayToString with length"+array.length);
	
	var str = "[";
	for(var i=0;i<array.length-1;i++)
	{
		//console.log("i:"+i+" is "+array[i]);
		str+=array[i]+",";
	}
	str+=array[array.length-1]+"]";
	
	return str;
};

var filter = function(array,test){
	var arr = [];
	//console.log("filter param array: "+array);
	//console.log("filter param test: "+test);
	for(var i=0;i<array.length;i++)
	{
		//console.log("filter: i= "+i+" and array val: "+array[i]);
		if(test(array[i]) )
		{
			//console.log("filter: i="+i+" pushing "+array[i]);
			arr.push(array[i]);
		}
	}
	
	return arr;
};

var areArraysTheSame = function(array1,array2){
	if(array1.length!=array2.length)
		return false;

	for(var i=0;i<array1.length;i++)
	{
		if(array1[i]!=array2[i])
			return false;
	}
	return true;
};

var isArrayValid = function(array,test){
	//console.log("is array valid? "+array+" for test: "+test);
	for(var i=0;i<array.length;i++)
	{
		if(!test(array[i]))
			return false;
	}
	return true;
};

var isEven = function(num){
	return ((num%2)==0);
};

var is3Divisble = function(num){
	return ((num%3)==0);
};

var isGreaterThan10 = function(num){
	return num>10;
};

var isBetween6and9 = function(num){
	return ((num>6)&&(num<19));
};


////---FilterList Exercises---///////////////////////////////////////////////////////////


var arraySizes = 5;//size of arrays to work with in this exercise


possibleFunctions = [
		" = (% num 2) 0",
		" = (% num 3) 0",
		"> num 10",
		"&& ((> num 6) (< num 19) )"
	];
var chosenFunc = -1;//which filter function
var chosenCorrectChoice = -1;
var filterInput;
var correctAnswer;
var studentGuess;

var possibleFunctions;

var chooseFunc = function(){
	chosenFunc = randNum(4);
	return chosenFunc;
};

var getChosenFunctionFromInt = function(chosenFunc)
{
	var numGenerator;
	if(chosenFunc==0)
	{
		//get an array of evens
		numGenerator=getRandomEven;
	}
	else if(chosenFunc==1)
	{
		//get an array of numbers divisible by 3
		numGenerator=getRandom3Divisible;
	}
	else if(chosenFunc==2)
	{
		//get an array of numbers > 10
		numGenerator=getRandomGreaterThan10;
	}
	else 
	{
		//get an array of numbers in the range: [7,18] (inclusive)
		numGenerator=getRandomBetween6and19;
	}
	
	return numGenerator;
}

var getTestFunctionFromInt = function(chosenFunc)
{
	var numGenerator;
	if(chosenFunc==0)
	{
		//get an array of evens
		numGenerator=isEven;
	}
	else if(chosenFunc==1)
	{
		//get an array of numbers divisible by 3
		numGenerator=is3Divisble;
	}
	else if(chosenFunc==2)
	{
		//get an array of numbers > 10
		numGenerator=isGreaterThan10;
	}
	else 
	{
		//get an array of numbers in the range: [7,18] (inclusive)
		numGenerator=isBetween6and9;
	}
	
	return numGenerator;
}

//exercise 1 -- choose the correct array given a filter function
var filter1Init = function(){	
	chosenFunc = chooseFunc();
	chosenCorrectChoice = randNum(4);//choose which option is the correct answer, [0->4)
	
	
	av = new JSAV("jsav", {"animationMode": "none"});
	var filterCArray = [
    "int Filter(int num)",
    "{",
    "    return "+possibleFunctions[chosenFunc],
    "}" 
    ];
    var filterCode = av.code(filterCArray);
    var ch = new CodeHighlighter(filterCode, filterCArray.length);
    ch.lineHeight = 32;
    ch.setLabel(av,"Filter test function");
    
    
    var cArray = [
    "List FilterList(List list, function foo)",
    "{",
    "    if( isNull(list) )",
    "        return []",
    "    else if( foo(car(list)) )",
    "        return cons(car(list),FilterList(list,foo) )",
    "    else ",
    "        return FilterList(list,foo)",
    "}" 
    ];
    var code = av.code(cArray);
};



var filter1getACorrectAnswer = function(){

	var ans = [];
	ans.length = arraySizes;
	
	var numGenerator = getChosenFunctionFromInt(chosenFunc);
	
	console.log("generating valid numbers for function #:"+chosenFunc+ "that is: "+numGenerator);
	for(var i=0;i<arraySizes;i++)
	{
		ans[i] = numGenerator();
		console.log("correct value: "+ans[i]);
	}
	
	
	console.log("correct ans array: "+ans);
	correctAnswer = arrayToString( ans );
	console.log("correct array: "+correctAnswer);
	return correctAnswer;
};



//random answers
var currentChoice = 0; //the last choice that needs to be assigned an answer

var filter1Choice = function(){
	
	if(currentChoice==chosenCorrectChoice)//if this is the choice we randomly chose to be the correct one
	{
		currentChoice++;
		return correctAnswer;
	}
	else
	{
		currentChoice++;
		var choice = randomIntArray(arraySizes);
		
		var numGenerator = getTestFunctionFromInt(chosenFunc);
	
		while(isArrayValid(choice,numGenerator) )//while our "wrong" choice is seen as valid, then randomize a new one that isn't
		{
			var choice = randomIntArray(arraySizes);
		}
		
		return arrayToString(choice);
	}
};

//correct answers

var getRandomEven = function(){
	var maxLoops = randNum(Math.floor(maxArrayVal/2) );
	var current = 2;
	for(var i=0;i<=maxLoops;i++)
	{
		current+=2;
	}
	return current;
};

var getRandom3Divisible = function(){
	var maxLoops = randNum(Math.floor(maxArrayVal/3) );
	var current = 3;
	for(var i=0;i<=maxLoops;i++)
	{
		current+=3;
	}
	return current;
};

var getRandomGreaterThan10 = function(){
	return randNumBetween(11,maxArrayVal+1);
};

var getRandomBetween6and19 = function(){
	return randNumBetween(7,19);
};

//exercise 2 -- enter the resultant array given a filter function and an input array
var numChecker;

var filter2Init = function(){
	
	//console.log("filter2init");
	chosenFunc = chooseFunc();
	
	
	av = new JSAV("jsav", {"animationMode": "none"});
	var filterCArray = [
    "int Filter(int num)",
    "{",
    "    return "+possibleFunctions[chooseFunc()],
    "}" 
    ];
    var filterCode = av.code(filterCArray);
    var ch = new CodeHighlighter(filterCode, filterCArray.length);
    ch.lineHeight = 32;
    ch.setLabel(av,"Filter test function");
    
    
    var cArray = [
    "List FilterList(List list, function foo)",
    "{",
    "    if( isNull(list) )",
    "        return []",
    "    else if( foo(car(list)) )",
    "        return cons(car(list),FilterList(list,foo) )",
    "    else ",
    "        return FilterList(list,foo)",
    "}" 
    ];
    var code = av.code(cArray);
    
    filterInput=randomIntArray(arraySizes);
    
    //console.log("filterInput:"+filterInput.length);
    
    var arrayObjList = [
    	new ArrayObj(filterInput,"List","list")
    ];
    var empty = [];
    var vc = new VisualsController(arrayObjList,empty,av);
    vc.visualize();    
};

var filter2getACorrectAnswer = function(){
	//console.log("filter2getAcorrectAnswer");
	var ans = [];
	ans.length = arraySizes;
	
	if(chosenFunc==0)
	{
		//get an array of evens
		numChecker=isEven;
	}
	else if(chosenFunc==1)
	{
		//get an array of numbers divisible by 3
		numChecker=is3Divisble;
	}
	else if(chosenFunc==2)
	{
		//get an array of numbers > 10
		numChecker=isGreaterThan10;
	}
	else 
	{
		//get an array of numbers in the range: [7,18] (inclusive)
		numChecker=isBetween6and9;
	}
	
	//console.log(">10 test "+isGreaterThan10(11) );
	//console.log("choose func: "+chosenFunc+" numChecker out: "+numChecker(9) +" numChecker: "+numChecker);
	
	//console.log("filterInput "+filterInput );
	var fOut = filter(filterInput,numChecker)
	//console.log("fOut: "+fOut);
	ans = arrayToString( fOut  );
	
	correctAnswer = ans;
	
	//console.log("correctAns: "+ans);
	return ans;
	
};



////---MinMax Exercises---///////////////////////////////////////////////////////////
var inputToMax;
var max;
var none = "None Of The Above";
var isNoCorrectChoice=false;

var minmax1Init = function(){
	av = new JSAV("jsav", {"animationMode": "none"});
	
	console.log("minimax1 init");
	
	
	//js array used for init
    inputToMax = randomIntArray(arraySizes);
  	var currentList = inputToMax.slice(0);
    console.log("minimax1: inputToMax and currentList:"+arrayToString(inputToMax)+":"+arrayToString(currentList) );
    chosenCorrectChoice = randNum(3);//choose which option is the correct answer, [0->3) (3 as the last answer is the "None" answer
    isNoCorrectChoice = randomTrueFalse();
	
    correctAnswer=[];
    correctAnswer.push(currentList[0]);
    
    max = currentList[0];
    currentList.shift();
    
    console.log("current list:"+arrayToString(currentList) );
    
    //console.log("is currentList empty? "+currentList);
	//console.log("is inputToMax empty? "+inputToMax);
	
    console.log("Adding: "+max+" to answer from original input:"+inputToMax);
    //correctAnswer.push(max);
    
	for(var i=0;i<currentList.length;i++)
	{
		console.log("current selected: "+currentList[i] );
		n = currentList[i];
		if(n>max)
		{
			correctAnswer.push(n);
			max=n;
			console.log("changing Max: "+max+" to "+n);
		}
	}
    console.log("correct answer:"+arrayToString(correctAnswer) );
    console.log("1. inputToMax:"+arrayToString(inputToMax) );
    //is the error due to being in the wrong "section" of the code for max or min?
    //isBooleanWrong = randomTrueFalse();
    
    //is the current maximum incorrect (we missed a max value in our array).
    //isCurrentMaxWrong = randomTrueFalse();
    
    //code view for main method
    var cArray = [
    "int FindMinMax(List list, boolean findMax)",
    "{",
    "    if( isNull(list) )",
    "        return 0",
    "    else",
    "        return FindMinMaxHelper(cdr(list), findMax, car(list) )",
    "}" 
    ];
    var code = av.code(cArray);
    var highlighter = new CodeHighlighter(code,cArray.length);
    highlighter.lineHeight = 33;
    highlighter.setLabel(av,"FindMinMax Public Method");
    highlighter.highlightCurrent(6);
    
    //code view for helper method
    var cHelperArray = [
    "int FindMinMaxHelper(List list, boolean findMax, int minmax)",
    "{",
    "    if( isNull(list) )",
    "        return minmax",
    "    else if( findMax )",
    "    {",
    "        if( > car(list) minmax )",
    "           return FindMinMaxHelper(cdr(list), findMax, car(list) )",
    "        else ",
    "           return FindMinMaxHelper(cdr(list), findMax, minmax)",
    "    {",
    "    else",
    "    {",
    "        if( > minmax car(list) )",
    "           return FindMinMaxHelper(cdr(list), findMax, car(list) )",
    "        else ",
    "           return FindMinMaxHelper(cdr(list), findMax, minmax)",
    "    {",
    "}" 
    ];
    var helperCode = av.code(cHelperArray);
    
    var helperHighlighter = new CodeHighlighter(helperCode,cHelperArray.length);
    helperHighlighter.lineHeight = 28.3;
    helperHighlighter.setLabel(av,"FindMinMax Private Helper Method");
    helperHighlighter.highlightCurrent(7);
    helperHighlighter.highlightPrevious(5);
    
    var arrays = [
    	new ArrayObj(inputToMax, "Input List", "list")
    ];
    
    var vars = [
    	new VarObj("Find maximum? (findMax)","findmax",true),
    	new VarObj("Current minmax","minmax",max)
    ];
    
    //	console.log("[0] is undefined...");
    
    var visuals = new VisualsController(arrays,vars,av);
    visuals.varLeftOffset = -50;
    visuals.arrayCellHeight = 30;
    visuals.visualize();   
    
};

var hasPlacedNoneOption = false;

var minmax1Choice = function(){
	currentChoice++;
	console.log("currentChoice:"+currentChoice );
	
	if((!isNoCorrectChoice) && ((currentChoice-1)==chosenCorrectChoice))//if this is the choice we randomly chose to be the correct one
	{
		//currentChoice++;
		return arrayToString(correctAnswer);
	}
	else if(currentChoice==4)//if this is the last choice
	{
		return none;
	}
	else
	{
		//use the correctAnswer array and permute it into "viable" answers
		
		//currentChoice++;
		var choice = correctAnswer.slice(0);
		
		while(areArraysTheSame(correctAnswer,choice) )
		{
			var choice = correctAnswer.slice(0);
			var pushOrSwap = randomTrueFalse(); //use to decide wether to add a new # at the end or swap a number with one from the input (after the first element), false is swap, true is push
			var idx = 0;
		
			//ALSO check if the array size isnt the same as the input (an array larger than input is an obv wrong answer so avoid that)
			if((pushOrSwap && (choice.length!=inputToMax.length)) || (choice.length==1) )
			{
			
				//add element to end
				//choose which # from source to add
				idx = randNumBetween(1,inputToMax.length-1);
				//console.log("inputToMax[idx]="+inputToMax[idx]+"idx="+idx);
				choice.push(inputToMax[idx]);
			
			}
			else
			{
				//choose 1 index to swap with element from the inputToMax
				idx = randNumBetween(1,choice.length-1);
			
				//now which idx to grab from the input
				var idxFromInput = randNumBetween(1,inputToMax.length-1);
				//console.log("inputToMax[idxFromInput]="+inputToMax[idxFromInput]+"with idx of:"+idxFromInput);
				choice[idx] = inputToMax[idxFromInput];
			}
		}
		
		return arrayToString(choice);
		
		
	}
	
};

var minmax1getACorrectAnswer = function(){
	//console.log("filter2getAcorrectAnswer");
	
	if(isNoCorrectChoice )
	{
		//correct answer is "none of the above"
		ans = none;
	}
	else
	{
		//then there is a correct answer, so select the correct value progression of the MAX var from its current value
		//console.log("correctAns: "+ans);
		ans = arrayToString(correctAnswer);
	}
	
	return ans;
	
};

//exercise 2 -- enter the resultant array given the findMax boolean and the input array
var isMax = false;

var minmax2Init = function(){
	av = new JSAV("jsav", {"animationMode": "none"});
	
	//console.log("filter2init");
	//js array used for init
    inputToMax = randomIntArray(arraySizes);
    
    chosenCorrectChoice = randNum(3);//choose which option is the correct answer, [0->3) (3 as the last answer is the "None" answer
    isMax = randomTrueFalse();
    //simulate an X # of iterations
    maxItr = randNum(arraySizes);
    correctAnswer=[];
    
    var test;
    if(isMax)
    {
    	test = biggerThan;
    }
    else
    {
    	test = lessThan;
    }
    
    console.log("inputToMax Before:"+inputToMax);
    
    var input = inputToMax.slice(0);
    console.log("inputToMax After:"+inputToMax);
    var maxMin = input[0];
    max = input[0];
    correctAnswer.push(maxMin);
	
	console.log("minMax test:"+test);
	console.log("minMax:"+maxMin);
	for(var i=0;i<input.length;i++)
	{
		n = input.shift();
		console.log("shifted n:"+n+" and input:"+input+" and current maxMin:"+maxMin);
		if(test(n,maxMin))
		{
			correctAnswer.push(n);
			console.log("pushed:"+n+" and correctAnswer:"+correctAnswer);
			maxMin=n;
		}
	}
    
    
    
    //code view for main method
    var cArray = [
    "int FindMinMax(List list, boolean findMax)",
    "{",
    "    if( isNull(list) )",
    "        return 0",
    "    else",
    "        return FindMinMaxHelper(cdr(list), findMax, car(list) )",
    "}" 
    ];
    var code = av.code(cArray);
    var highlighter = new CodeHighlighter(code,cArray.length);
    highlighter.lineHeight = 33;
    highlighter.setLabel(av,"FindMinMax Public Method");
    highlighter.highlightCurrent(6);
    
    //code view for helper method
    var cHelperArray = [
    "int FindMinMaxHelper(List list, boolean findMax, int minmax)",
    "{",
    "    if( isNull(list) )",
    "       return minmax",
    "    else if( findMax )",
    "    {",
    "        if( > car(list) minmax )",
    "           return FindMinMaxHelper(cdr(list), findMax, car(list) )",
    "        else ",
    "           return FindMinMaxHelper(cdr(list), findMax, minmax)",
    "    {",
    "    else",
    "    {",
    "        if( > minmax car(list) )",
    "           return FindMinMaxHelper(cdr(list), findMax, car(list) )",
    "        else ",
    "           return FindMinMaxHelper(cdr(list), findMax, minmax)",
    "    {",
    "}" 
    ];
    var helperCode = av.code(cHelperArray);
    
    var helperHighlighter = new CodeHighlighter(helperCode,cHelperArray.length);
    helperHighlighter.lineHeight = 28.3;
    helperHighlighter.setLabel(av,"FindMinMax Private Helper Method (after "+maxItr+" elements compared)");
    helperHighlighter.highlightCurrent(7);
    helperHighlighter.highlightPrevious(5);
    
    
    var arrays = [
    	new ArrayObj(inputToMax, "List", "list")
    ];
    
    var vars = [
    	new VarObj("Find maximum? (findMax)","findmax",isMax),
    	new VarObj("Current min\max (minmax)","minmax",max)
    ];
    
    //	console.log("[0] is undefined...");
    
    var visuals = new VisualsController(arrays,vars,av);
    visuals.varLeftOffset = 0;
    visuals.arrayCellHeight = 30;
    visuals.visualize();   
};

var minmax2getACorrectAnswer = function(){

	ans = arrayToString(correctAnswer);
	return ans;
};

//test methods
var biggerThan = function(current, max){
	return current > max;
};

var lessThan = function(current, min){
	return current < min;
};

////---MergeSort Exercises---///////////////////////////////////////////////////////////
//Entry Question -- How many calls are their to the MergeSort method? (include the first method call)
//This questions shows if the student understands how MergeSort splits up the input list
var answersUsed = [];

var MergeSort2Init = function(){
	av = new JSAV("jsav", {"animationMode": "none"});
	
	console.log("MergeSort2Init init");
    
    chosenCorrectChoice = randNum(4);//choose which option is the correct answer, [0->3) (3 as the last answer is the "None" answer
	var list = randomIntArray(randNumBetween(2,7));
    correctAnswer=getMergeSortCalls(list);
    
     var sortArray = [
    "List MergeSort(List list)",
    "{",
    "    if( <= ListSize(list) 1)",
    "        return list",
    "    else",
    "        return Merge(   MergeSort(getLeftHalf(list,0,[])),     MergeSort(getRightHalf(list,0, / ListSize(list) 2, ListSize(list), []) )   )",
    "}" 
    ];
    var sortCode = av.code(sortArray);
    
    var sortHighlighter = new CodeHighlighter(sortCode,sortArray.length);
    sortHighlighter.lineHeight = 33;
    sortHighlighter.setLabel(av,"MergeSort Method");
    sortHighlighter.highlightCurrent(1);//first line highlighted
    
    //code view of leftHalfArray
    var getLeftHalf = [
    "List getLeftHalf(List list, int current, List left)",
    "{",
    "    if( isZero(current) )",
    "        return left",
    "    else",
    "        return getLeftHalf(cdr(list), sub1(current), cons(left,car(list)) )",
    "}" 
    ];
    var getLeftHalfCode = av.code(getLeftHalf);
    
    var getLeftHalfHighlighter = new CodeHighlighter(getLeftHalfCode,getLeftHalf.length);
    getLeftHalfHighlighter.lineHeight = 33;
    getLeftHalfHighlighter.setLabel(av,"getLeftHalf Method");
    
    //code view of ListSizeHelper
    var getRightHalf = [
    "List getRightHalf(List list, int current, int mid, int size, List right)",
    "{",
    "    if( < current mid)",
    "        return getRightHalf(cdr(list), add1(current), mid, size, [])",
    "    else if(= current size)",
    "        return right",
    "    else if(< current size)",
    "        return getRightHalf(cdr(list), add1(current), mid, size, cons(right,car(list)) )",
    "}" 
    ];
    var getRightHalfCode = av.code(getRightHalf);
    
    var getRightHalfHighlighter = new CodeHighlighter(getRightHalfCode,getRightHalf.length);
    getRightHalfHighlighter.lineHeight = 31;
    getRightHalfHighlighter.setLabel(av,"getRightHalf Method");
    
    
    //code view of Merge
    var merge = [
    "List Merge(List left, List right, List result)",
    "{",
    "    if( && (!isNull(left)) (!isNull(right)))",
    "        if(<= car(left) car(right))",
    "             return Merge(cdr(left),right,cons(result,car(left)) )",
    "    	 else",
    "             return Merge(left,cdr(right),cons(result,car(right)) )",
    "    else if( (!isNull(left)) )",
    "        return Merge(cdr(left),right,cons(result,car(left)) )",
    "    else if( (!isNull(right)) )",
    "        return Merge(left,cdr(right),cons(result,car(right)) )",
    "    else",
    "        return result",
    "}" 
    ];
    var mergeCode = av.code(merge);
    
    var mergeHighlighter = new CodeHighlighter(mergeCode,merge.length);
    mergeHighlighter.lineHeight = 27;
    mergeHighlighter.setLabel(av,"Merge Method");
    
    
    var arrays = [
    	new ArrayObj(list, "List", "list"),
    	new ArrayObj([], "Left", "left"),
    	new ArrayObj([], "Right", "right"),
    	new ArrayObj([], "Result", "result")
    ];
    
	var vars = [
    ];
    
    
    var visuals = new VisualsController(arrays,vars,av);
    visuals.visualize();
};

var leftHalfOfArray = function(input){
	return input.slice(0,Math.floor(input.length/2) );
};

var rightHalfOfArray = function(input){
	return input.slice(Math.floor(input.length/2) );
};

var getMergeSortCalls = function(input){
	if(input.length<=2)
		return 2;
	else
		return 2 + getMergeSortCalls(leftHalfOfArray(input)) + getMergeSortCalls(rightHalfOfArray(input) );
};

var MergeSort2getACorrectAnswer = function(){
	return correctAnswer;
};

//MC Question -- How many calls are their to the MergeSort method? (include the first method call)
//This questions shows if the student understands how MergeSort splits up the input list

var MergeSort1Init = function(){
	av = new JSAV("jsav", {"animationMode": "none"});
	
	console.log("MergeSort2Init init");
    
    chosenCorrectChoice = randNum(4);//choose which option is the correct answer, [0->3) (3 as the last answer is the "None" answer
	var list = randomIntArray(randNumBetween(2,7));
    correctAnswer=getMergeSortCalls(list);
    
     var sortArray = [
    "List MergeSort(List list)",
    "{",
    "    if( <= ListSize(list) 1)",
    "        return list",
    "    else",
    "        return Merge( MergeSort(getLeftHalf(list,/ ListSize(list) 2,[])),     MergeSort(getRightHalf(list,0, / ListSize(list) 2, ListSize(list), []) )   )",
    "             MergeSort(getRightHalf(list,0, / ListSize(list) 2, ListSize(list), []) )   )",
    "}" 
    ];
    
    var sortCode = av.code(sortArray);
    
    var sortHighlighter = new CodeHighlighter(sortCode,sortArray.length);
    sortHighlighter.lineHeight = 29;
    sortHighlighter.setLabel(av,"MergeSort Method");
    sortHighlighter.highlightCurrent(1);//first line highlighted
    
    //code view of leftHalfArray
    var getLeftHalf = [
    "List getLeftHalf(List list, int current, List left)",
    "{",
    "    if( isZero(current) )",
    "        return left",
    "    else",
    "        return getLeftHalf(cdr(list), sub1(current), cons(left,car(list)) )",
    "}" 
    ];
    var getLeftHalfCode = av.code(getLeftHalf);
    
    var getLeftHalfHighlighter = new CodeHighlighter(getLeftHalfCode,getLeftHalf.length);
    getLeftHalfHighlighter.lineHeight = 33;
    getLeftHalfHighlighter.setLabel(av,"getLeftHalf Method");
    
    //code view of ListSizeHelper
    var getRightHalf = [
    "List getRightHalf(List list, int current, int mid, int size, List right)",
    "{",
    "    if( < current mid)",
    "        return getRightHalf(cdr(list), add1(current), mid, size, [])",
    "    else if(= current size)",
    "        return right",
    "    else if(< current size)",
    "        return getRightHalf(cdr(list), add1(current), mid, size, cons(right,car(list)) )",
    "}" 
    ];
    var getRightHalfCode = av.code(getRightHalf);
    
    var getRightHalfHighlighter = new CodeHighlighter(getRightHalfCode,getRightHalf.length);
    getRightHalfHighlighter.lineHeight = 31;
    getRightHalfHighlighter.setLabel(av,"getRightHalf Method");
    
    
    //code view of Merge
    var merge = [
    "List Merge(List left, List right, List result)",
    "{",
    "    if( && (!isNull(left)) (!isNull(right)))",
    "        if(<= car(left) car(right))",
    "             return Merge(cdr(left),right,cons(result,car(left)) )",
    "    	 else",
    "             return Merge(left,cdr(right),cons(result,car(right)) )",
    "    else if( (!isNull(left)) )",
    "        return Merge(cdr(left),right,cons(result,car(left)) )",
    "    else if( (!isNull(right)) )",
    "        return Merge(left,cdr(right),cons(result,car(right)) )",
    "    else",
    "        return result",
    "}" 
    ];
    var mergeCode = av.code(merge);
    
    var mergeHighlighter = new CodeHighlighter(mergeCode,merge.length);
    mergeHighlighter.lineHeight = 27;
    mergeHighlighter.setLabel(av,"Merge Method");
    
    
    var arrays = [
    	new ArrayObj(list, "List", "list"),
    	new ArrayObj([], "Left", "left"),
    	new ArrayObj([], "Right", "right"),
    	new ArrayObj([], "Result", "result")
    ];
    
	var vars = [
    ];
    
    
    var visuals = new VisualsController(arrays,vars,av);
    visuals.visualize();
};

var MergeSort1getACorrectAnswer = function(){
	return correctAnswer;
};

var MergeSort1Choice = function(){
	currentChoice++;
	
	if((currentChoice-1)==chosenCorrectChoice)//if this is the choice we randomly chose to be the correct one
	{
		return correctAnswer;
	}
	else
	{
		var choice = correctAnswer;
		//generate a number above or below the current answer, check if its been used,if not use it, if so, generate another until it is not used
		
		var delta = randNumBetween(1,5);
		var subDelta = randomTrueFalse();//should we subtract (true) or add (false) the delta
		if(subDelta)
			choice=choice-delta;
		else
			choice=choice+delta;
		
		while((choice<0) || isAnswerUsed(choice) )
		{
			choice = correctAnswer;
			delta = randNumBetween(1,5);
			subDelta = randomTrueFalse();//should we subtract (true) or add (false) the delta
			if(subDelta)
				choice=choice-delta;
			else
				choice=choice+delta;
		}
		
		answersUsed.push(choice);
		
		return choice;
	}
};

////---QuickSort Exercises---///////////////////////////////////////////////////////////
//Entry Question -- What are the arrays for less, equal and greater after the nth iteration with the given pivot? (n is [2,4])

var pivot = 0;
var less = [];
var equal = [];
var greater = [];
    
var n = 0;
var QuickSort2Init = function(){
	av = new JSAV("jsav", {"animationMode": "none"});
	
	console.log("QuickSort2Init init");
    
    chosenCorrectChoice = randNum(4);//choose which option is the correct answer, [0->3) (3 as the last answer is the "None" answer
	
    n = randNumBetween(2,4);
    
    //js array used for init
    var list = randomIntArray(randNumBetween(4,7));
    pivot = list[randNumBetween(0,list.length)];
    less = [];
    equal = [];
    greater = [];
    
    for(var i=0;i<n;i++)
    {
    	if(list[i] < pivot)
    		less.push(list[i]);
    	else if(list[i] = pivot)
    		equal.push(list[i]);
    	else if(list[i] > pivot)
			greater.push(list[i]);    	
    }
    
    correctAnswer=arrayToString(less)+arrayToString(equal)+arrayToString(greater);
    
    //code view of ListSizeHelper
    var sortHelperArray = [
    "List QuicksortHelper(List list)",
    "{",
    "    if( = ListSize(list) 1)",
    "        return list",
    "    else",
    "        return Quicksort(list, [], [], [], randomValueFromArray(list) )",
    "}" 
    ];
    var sortHelperCode = av.code(sortHelperArray);
    
    var sortHelperHighlighter = new CodeHighlighter(sortHelperCode,sortHelperArray.length);
    sortHelperHighlighter.lineHeight = 33;
    sortHelperHighlighter.setLabel(av,"Quicksort Public Helper Method");
    sortHelperHighlighter.highlightCurrent(1);
    
    var sortArray = [
    "List Quicksort(List list, less, equal, greater, pivotVal)",
    "{",
    "    if( > ListSize(list) 0)",
    "        if(< car(list) pivotVal)",
    "			 return Quicksort(cdr(list), cons(less,car(list)),",
    "			 			 equal, greater, pivotVal)",
    "        else if(= car(list) pivotVal)",
    "			 return Quicksort(cdr(list), less,",
    "			 		 cons(equal,car(list)), greater, pivotVal)",
    "        else if(> car(list) pivotVal)",
    "			 return Quicksort(cdr(list), less, equal,",
    "			 			 cons(greater,car(list)), pivotVal)",
    "    else",
    "        return AppendLists( QuicksortHelper(less),",
    "        				 equal, QuicksortHelper(greater) )",
    "}" 
    ];
    var sortCode = av.code(sortArray);
    
    var sortHighlighter = new CodeHighlighter(sortCode,sortArray.length);
    sortHighlighter.lineHeight = 27;
    sortHighlighter.setLabel(av,"Quicksort Method");    
    
    var arrays = [
    	new ArrayObj(list, "Input", "list"),
    ];
    
	var vars = [
		new VarObj("Pivot Val","pivot", pivot),
		new VarObj("N","n", n)
    ];
    
    var visuals = new VisualsController(arrays,vars,av);
    visuals.varLeftOffset = 0;
    visuals.visualize();
};

var QuickSort2getACorrectAnswer = function(){
	return correctAnswer;
};

//MC Question -- Number of calls to the Quicksort method (including the first) given the input list

var isAnswerUsed = function(num){
	
	for(var i=0;i<answersUsed.length;i++)
    {
    	if(answersUsed[i]==num)
    		return true;
    }
    
    return false;
};

var QuickSort1Init = function(){
	av = new JSAV("jsav", {"animationMode": "none"});
	
	console.log("QuickSort1Init init");
    
    chosenCorrectChoice = randNum(4);//choose which option is the correct answer, [0->3) (3 as the last answer is the "None" answer
	
    var list = randomIntArray(randNumBetween(2,7));
    var pivot = list[randNumBetween(0,list.length)];
    
    correctAnswer=countQuicksortMethodCalls(list,pivot);
    
    //code view of ListSizeHelper
    var sortHelperArray = [
    "List QuicksortHelper(List list)",
    "{",
    "    if( = ListSize(list) 1)",
    "        return list",
    "    else",
    "        return Quicksort(list, [], [], [], randomValueFromArray(list) )",
    "}" 
    ];
    var sortHelperCode = av.code(sortHelperArray);
    
    var sortHelperHighlighter = new CodeHighlighter(sortHelperCode,sortHelperArray.length);
    sortHelperHighlighter.lineHeight = 33;
    sortHelperHighlighter.setLabel(av,"Quicksort Public Helper Method");
    sortHelperHighlighter.highlightCurrent(1);
    
    var sortArray = [
    "List Quicksort(List list, less, equal, greater, pivotVal)",
    "{",
    "    if( > ListSize(list) 0)",
    "        if(< car(list) pivotVal)",
    "			 return Quicksort(cdr(list),",
    "			 			cons(less,car(list)), equal, greater, pivotVal)",
    "        else if(= car(list) pivotVal)",
    "			 return Quicksort(cdr(list), less,",
    "			 		 cons(equal,car(list)), greater, pivotVal)",
    "        else if(> car(list) pivotVal)",
    "			 return Quicksort(cdr(list), less,",
    "			 		 equal, cons(greater,car(list)), pivotVal)",
    "    else",
    "        return AppendLists( QuicksortHelper(less),",
    "        		 equal, QuicksortHelper(greater) )",
    "}" 
    ];
    var sortCode = av.code(sortArray);
    
    var sortHighlighter = new CodeHighlighter(sortCode,sortArray.length);
    sortHighlighter.lineHeight = 27;
    sortHighlighter.setLabel(av,"Quicksort Method");    
    
    var arrays = [
    	new ArrayObj(list, "List", "list"),
    	new ArrayObj([], "Less", "less"),
    	new ArrayObj([], "Equal", "equal"),
    	new ArrayObj([], "Greater", "greater")
    ];
    
	var vars = [
		new VarObj("Pivot Val","pivot", pivot)
    ];
    
    var visuals = new VisualsController(arrays,vars,av);
    visuals.visualize();
};

var countQuicksortMethodCalls = function(listSrc, pivot){
	if((listSrc==null) || (listSrc.length==0) )
		return 0;
	
	var list = listSrc.slice(0);
	
	
    var less = [];
    var equal = [];
    var greater = [];
    
    var count = 1;
    
    for(var i=0;i<list.length;i++)
    {
    	if(list[i] < pivot)
    	{
    		less.push(list[i]);
    	}
    	else if(list[i] = pivot)
    	{
    		equal.push(list[i]);
    	}
    	else if(list[i] > pivot)
		{
			greater.push(list[i]);    	
    	}
    	count++;
    }
    
    return count+countQuicksortMethodCalls(less,pivot)+countQuicksortMethodCalls(greater,pivot);
};

var QuickSort1getACorrectAnswer = function(){
	return correctAnswer;
};

var QuickSort1Choice = function(){
	currentChoice++;
	
	if((currentChoice-1)==chosenCorrectChoice)//if this is the choice we randomly chose to be the correct one
	{
		return correctAnswer;
	}
	else
	{
		var choice = correctAnswer;
		//generate a number above or below the current answer, check if its been used,if not use it, if so, generate another until it is not used
		
		var delta = randNumBetween(1,5);
		var subDelta = randomTrueFalse();//should we subtract (true) or add (false) the delta
		if(subDelta)
			choice=choice-delta;
		else
			choice=choice+delta;
		
		while((choice<0) || isAnswerUsed(choice) )
		{
			choice = correctAnswer;
			delta = randNumBetween(1,5);
			subDelta = randomTrueFalse();//should we subtract (true) or add (false) the delta
			if(subDelta)
				choice=choice-delta;
			else
				choice=choice+delta;
		}
		
		answersUsed.push(choice);
		
		return choice;
	}
};
