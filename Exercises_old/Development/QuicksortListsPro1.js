//in this proficiency exercise, the student will have to (given an input array and a selected pivot) have to "sort" the input array into the 3 partition arrays

(function ($) 
{
	$(document).ready(function () 
	{
		var settings = new JSAV.utils.Settings($(".jsavsettings"));
		var arrayLayout = settings.add("layout", {"type": "select", "options": {"bar": "Bar", "array": "Array"}, "label": "Array layout: ", "value": "array"});
		var av = new JSAV($('.avcontainer'), {settings: settings});
		av.recorded();
		var tell = function (msg, color) { av.umsg(msg, {color: color}); };
		
		var initial,initialArray, 
		ansArray, arraySize,maxArraySize=5, ansArr;
		
		var smaller,equal,greater;//js arrays
		var smallerArray,equalArray,greaterArray;
		
		var initArrayValueSelectedIdx=-1, pivotVar,pivot, jsavArray,
		lastIdx, lastAction=0;//0 for none, 1 for moved value from less, 2 for moved from equal, 3 for moved from greater
		
		
		// Function to generate the model solution.
		function modelSolution(modeljsav) 
		{
			console.log("modelSolution");
			var modelArray = modeljsav.ds.array(maxArraySize+2);
			var s = [];
			var e = [];
			var g = [];
			
			var initArray = initial.slice(0);
			modeljsav.displayInit();
			
			for(i=1;i<initArray.length;i++)
			{
				if(initArray[i]<pivot)
				{
					s.push(initArray[i]);
				}
				else if(initArray[i]<pivot)
				{
					e.push(initArray[i]);
				}
				else
				{
					g.push(initArray[i]);
				}
				
				initArray.splice(i, 1);//remove first element from the init array copy
				setJsav(modelArray, combineArrays(s,e,g)); //update the model array for grading
				modeljsav.gradeableStep();
			}
			
			return modelArray;
		}

		// Function to initialize the exercise and generate a semi-random expression.
		function init()
		{
			console.log("modelSolution");
			if(equalArray) 
			{
    			equalArray.clear();
    			smallerArray.clear();
    			greaterArray.clear();
    			initialArray.clear();
    			pivot.clear();
  			}
  			
			initial = randomIntArray(maxArraySize);
			pivot = initial[randNumBetween(0,initial.length)];
			pivotVar = av.variable(pivot);
			
			smaller=[" "];
			equal=[" "];
			greater=[" "];
			
			initialArray = av.ds.array(initial);
			smallerArray = av.ds.array(smaller);
			equalArray = av.ds.array(equal);
			greaterArray = av.ds.array(greater);
			
			initialArray.click(initialClickHandler);
			smallerArray.click(smallerClickHandler);
			equalArray.click(equalClickHandler);
			greaterArray.click(greaterClickHandler);
			
			//ensure that after modifying these values that I dont need to reassign the onclick
			var temp = [];
			temp.length = initial.length+2;
			for(var i=0;i<temp.length;i++)
			{
				temp[i] = " ";
			}
			
			jsavArray = av.ds.array(temp, {visible: false});
			return jsavArray;
		}
		
	  function setJsav(jArray, combined) //c = the combined array
	  {
	  		//set the jsav array to the current arrays we have created
	  		//var combined = combineArrays(smaller,equal,greater);
	  		for(var i=0;i<initial.length+2;i++)
	  		{
	  			jArray.value(i," ");
	  		}
	  		
	  		for(var i=0;i<combined.length;i++)
	  		{
	  			jArray.value(i,combined[i]);
	  		}
	  }
		
		
	  function combineArrays(less,equ,great){
	  	var copy = less.slice(0);
	  	copy.push(",");
	  	copy = copy.concat(equ);
	  	copy.push(",");
	  	copy = copy.concat(great);
	  	return copy;
	  };
	  
	  var smallerClickHandler = function(index, e) {
		//if an index in the prior array is selected, then move that value to this array
		if(initArrayValueSelectedIdx>-1)
		{
			//add the selected item  to the smaller array
			//smaller = smallerArray.value.slice(0);
			smaller.push(initialArray.value(initArrayValueSelectedIdx));
			smallerArray.clear();
			smallerArray = av.ds.array(smaller);
			smallerArray.click(smallerClickHandler);
			//remove the element from initial
			//initial = initialArray.value.slice(0);
			initial.splice(initArrayValueSelectedIdx, 1);
			initialArray.clear();
			initialArray = av.ds.array(initial);
			initialArray.click(initialClickHandler);
			//make sure that both are unhighlighted?
			initArrayValueSelectedIdx=-1;
			setJsav(jsavArray,combineArrays(smaller,equal,greater) );
			av.gradeableStep();
		}
	  };
	  
	  var equalClickHandler = function(index, e) {
		//if an index in the prior array is selected, then move that value to this array
		if(initArrayValueSelectedIdx>-1)
		{
			//add the selected item  to the smaller array
			//equal = equalArray.value.slice(0);
			equal.push(initialArray.value(initArrayValueSelectedIdx));
			equalArray.clear();
			equalArray = av.ds.array(equal);
			equalArray.click(equalClickHandler);
			//remove the element from initial
			//temp = initialArray.value.slice(0);
			initial.splice(initArrayValueSelectedIdx, 1)
			initialArray.clear();
			initialArray = av.ds.array(initial);
			initialArray.click(initialClickHandler);
			//make sure that both are unhighlighted?
			initArrayValueSelectedIdx=-1;
			setJsav(jsavArray, combineArrays(smaller,equal,greater) );
			av.gradeableStep();
		}
	  };
	  
	  var greaterClickHandler = function(index, e) {
		//if an index in the prior array is selected, then move that value to this array
		if(initArrayValueSelectedIdx>-1)
		{
			//add the selected item  to the smaller array
			//greater = greaterArray.value.slice(0);
			greater.push(initialArray.value(initArrayValueSelectedIdx));
			greaterArray.clear();
			greaterArray = av.ds.array(greater);
			greaterArray.click(greaterClickHandler);
			//remove the element from initial
			//initial = initialArray.value.slice(0);
			initial.splice(initArrayValueSelectedIdx, 1)
			initialArray.clear();
			initialArray = av.ds.array(initial);
			initialArray.click(initialClickHandler);
			//make sure that both are unhighlighted?
			initArrayValueSelectedIdx=-1;
			setJsav(jsavArray, combineArrays(smaller,equal,greater) );
			av.gradeableStep();
		}
	  };
	  
	  var initialClickHandler = function(index, e) {
	  	  initialArray.highlight(false);//unhighlight all prior cells
		  initialArray.highlight(index);
		  initArrayValueSelectedIdx=index;
		  lastIdx=index;
	  };
		
		// Function to produce text for the "Help" button.
		function help() 
		{
			alert("Help");
		}

		// Function to produce text for the "About" button.
		function about() {
			//replace later
    		var mystring = "Bubble Sort Analysis\nWritten by Mohammed Fawzy and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during February, 2014\nJSAV library version " + JSAV.version();
    		alert(mystring);
  		}

		// Function to check answer once the "Submit" button is pressed.
		function submit()
		{
			/*
			var temp = document.getElementById('answer').value;
			temp = temp.replace(/\s+/g, '');
			document.getElementById('answer').value = "";
			if(position < ansArray.length)
			{
				if(temp == ansArray[position])
				{
					jsavArray.highlight(position);
					jsavArray.unhighlight(position-1);
					exercise.gradeableStep();
					$theExpression.html(initialArray[position]);
					position++;
				} else
				{
					exercise.gradeableStep();
				}
			} else
			{
				exercise.gradeableStep();
			}
			*/
		}
		
		// Function to check answer once the "Done" button is pressed.
		function done()
		{
			if(intial.length!=0)
			{
				alert("There are still more elements to partition!");
				exercise.gradeableStep();
			} else
			{
				jsavArray.highlight();
				exercise.gradeableStep();
				alert("Congratulations! You've finished!");
			}
		}
		
		// Function to fix exercise if an incorrect submission is entered.
		function fixState(modeljsav)
		{
			//reverse last action
			//grab value from array last modified (lastAction) (and remove it)
			//add that to the initial array at the last index (lastIdx)
			//0 for none, 1 for moved value from less, 2 for moved from equal, 3 for moved from greater
			 
			var val = 0;
			
			if(lastAction==1) 
			{
				val = smaller.pop();
			}
			else if(lastAction==2)
			{
				val = equal.pop();
			}
			else if(lastAction==3)
			{
				val = greater.pop();
			}
			
			initial.insert(lastIdx, val);
			
		}
		
		var exercise = 	av.exercise(modelSolution, init, {feedback: "atend",
    modelDialog: {width: 760}, controls: $('.jsavexercisecontrols'), fix: fixState });
    
		exercise.reset();

		$('#help').click(help);
		$('#about').click(about);
		$('#submit').click(submit);
		$('#done').click(done);
	});
}(jQuery));
