/*
	Edit Distance (Levenshtein Distance)
	Erich Brungraber
*/

/*
eDistAnim
Creates and animates the matrix rep of the dynamic edit distance algorithm.
*/
var eDistAnim = function(start, end) {
    var startMax = start.length;
    var endMax = end.length;
    var arr = av.ds.array(["",""]);
    var arr2 = av.ds.array([""]);
    var dynArr = [arr, arr2];
    
    for (var i = 0; i < startMax; i++) {
		dynArr[0].value((i + 2), start.charAt(i));
    }
    dynArr[1].value(0, "");
    
	for (var i = 0; i <= startMax; i++) {
		dynArr[1].value((i+1), i);
    }
    
    for (var i = 1; i <= endMax; i++) {
		var tArr = [end.charAt(i-1), i];
		for (var j = 2; j <= startMax + 1; j++) {
			tArr[j] = 0;
		}
		dynArr[i+1] = av.ds.array(tArr);
    }
    
    av.displayInit();
    
    //meat of the code
    var initCol = 2;
    var pRow = 2;
    var pCol = 2;
    
    for (var i = 0; i <= startMax + 1; i++) {		
		dynArr[0].css(i,{"color":"#fff", "background-color": "#000"});
    }
    for (var i = 1; i <= endMax + 1; i++) {
		dynArr[i].css(0, {"color":"#fff", "background-color": "#000"});
    }
    
    for (var j = 2; j <= endMax + 1; j++) {	
		for(var i = 2; i <= startMax + 1; i++) {
			
			dynArr[pRow].css(pCol, {"color": "#0f0", "background-color": "#eee"});
			dynArr[j].css(i, {"color": "#ff0", "background-color": "#f00"});
			
			if (start.charAt(i-2) === end.charAt(j-2)) {
				dynArr[j].value(i, dynArr[j-1].value(i-1));
			} else {
				var del = parseInt(dynArr[j-1].value(i), 10) + 1;
				var ins = parseInt(dynArr[j].value(i-1), 10) + 1;
				var sub = parseInt(dynArr[j-1].value(i-1), 10) + 1;
			
				var min = Math.min(Math.min(sub, ins), del);
				dynArr[j].value(i, min);		
			}
			av.step();
			if (initCol === 2) {
				pCol = 2;
				initCol = -1;
			} else { pCol = i; }
			pRow = j;
		} //end inner for	    
	} //end outer for

	dynArr[endMax+1].css(startMax+1, {"color": "#0f0", "background-color": "#eee"});
	
	av.recorded();
    av.show();
    
	var ans = dynArr[endMax];
    return ans[startMax];
} //end eDistAnim func

/*
testMaker
Prepares the AV for the two inputs:
	1.	array of choices for user to select
	2.	answer grid for user to click in, matching array choice above
*/
var testMaker = function(start, end) {
	
	var array = eDist(start, end);
	var solution = [""];
	var startMax = start.length;
	var endMax = end.length;
	
	//console.log("Creating the solution deep copy.");
	//create solution array, deep copy
	for (var i = 0; i < endMax + 2; i++) {
		var arr = av.ds.array([""]);
		//arr.hide();
		for (var j = 0; j < startMax + 2; j++) {
			arr.value(j, array[i].value(j));
		}
		solution[i] = arr;
	}
	//console.log("Created the solution deep copy.");

	
	console.log("Array size: " + array.length);
	for (var i = 0; i < array.length; i++) {
		//console.log("Inner array " + array[i].size());
		for (var j = 0; j < array[i].size(); j++) {
			console.log(typeof array[i].value(j));
			console.log("" + i + ", " + j + ": " + array[i].value(j));
		}
	}
	
	//creates choices array for user to select by plucking values from answer grid
	var choices = av.ds.array([""]);
	var size = startMax * endMax;
	var count = 0;
	var numChoices = Math.floor(size / 5);
	for (var i = 0; i < numChoices; i++) {
		while (1){
			var row = Math.floor(((endMax - 1) * Math.random()) + 2);
			var col = Math.floor(((startMax - 1) * Math.random()) + 2);
			//console.log("Row: " + typeof row + ", Col: " + typeof col);
			console.log("Row: " + row + ", Col: " + col);
			console.log("Typeof element: " + typeof array[row]);
			if (array[row].value(col) !== "") {
				choices.value(count++, array[row].value(col));
				array[row].value(col, "");
				break;
			}
		}
	}
	
	av.displayInit();
	av.recorded();
	//choices.show();
	for (var i = 0; i < array.length; i++){
		array[i].css({centered: "true"});
	}
	array.show();
	
	
	/* to do
		-create array of choices for user to select      ***done?***
		-create holes in answer grid for user to select  ***done?***
		-figure out clickhandler
		-figure out how to tie the answer grid from the func to the global...might have to make a global.
		-figure out how to pass all of this mess to the kahn check thing...
		-if above fails, deep scan check each cell of grid against the solution, show results.
		-possibly highlight incorrect cells
	
	*/
	
} //end testMaker func

/*
initKA
Creates solution grid with one element missing, and returns an array with the answer & 3 false choices
for use within the Khan Academy interface.  For purposes of verifying the right answer, the fifth element
holds the correct value.
*/
var initKA = function(start, end){
	
	var array = eDist(start, end);
	var startMax = start.length;
	var endMax = end.length;
	var answers = [];
			
	var row = Math.floor(((endMax - 1) * Math.random()) + 2);
	var col = Math.floor(((startMax - 1) * Math.random()) + 2);
	
	answers[0] = array[row].value(col);
	array[row].value(col, "??");
	array[row].css(col, {"color":"#000", "background-color": "#f00"});

	//fill answer array with false choices
	var max = array[endMax+1].value(startMax+1);
	for (var i = 1; i < 4; i++) {
		answers[i] = Math.floor((max + 1) * Math.random());
	}
	
	//duplicate check & removal
	for (var i = 1; i < 4; i++) {
		var a = (i + 1) % 4;
		var b = (i + 2) % 4;
		var c = (i + 3) % 4;
		while (answers[i] === answers[a] || answers[i] === answers[b] || answers[i] === answers[c]) {
			answers[i] = Math.floor((max + 1) * Math.random());
		}
	}
	
	//store the correct answer off
	answers[4] = answers[0];
	
	var temp = [answers[0],answers[1], answers[2],answers[3]];

	/*
	console.log("\n\nIn temp:");
	for (var i = 0; i < 4; i++) {
		console.log("" + i + ": " + temp[i]);
	}*/

	
	//randomize the answers within the returning array
	for (var i = 0; i < 4; i++) {
		while(1){
			var index = Math.floor(4 * Math.random());
			if (temp[index] !== "") {
				answers[i] = temp[index];
				temp[index] = "";
				break;
			}
		}
	}
	
	/*
	console.log("\nCompleted business");
	for (var i = 0; i < 5; i++) {
		console.log("" + i + ": " + answers[i]);
	}*/
	
	av.displayInit();
	av.recorded();
	for(var i = 0; i < array.length; i++) {
		array[i].show();
	}
	return answers;
	
} //end initKA func

/**
 * eDist
 * Returns a constructed matrix to be used with the proficiency exercise.
 */
var eDist = function(start, end) {
    var startMax = start.length;
    var endMax = end.length;
    var arr = av.ds.array(["",""]);
    var arr2 = av.ds.array([""]);
    var dynArr = [arr, arr2];
    
    for (var i = 0; i < startMax; i++) {
		dynArr[0].value((i + 2), start.charAt(i));
    }
    dynArr[1].value(0, "");
    
	for (var i = 0; i <= startMax; i++) {
		dynArr[1].value((i+1), i);
    }
    
    for (var i = 1; i <= endMax; i++) {
		var tArr = [end.charAt(i-1), i];
		for (var j = 2; j <= startMax + 1; j++) {
			tArr[j] = 0;
		}
		dynArr[i+1] = av.ds.array(tArr);
    }    
    
    //meat of the code
    var initCol = 2;
    var pRow = 2;
    var pCol = 2;
    
	/*
    for (var i = 0; i <= startMax + 1; i++) {		
		dynArr[0].css(i,{"color":"#fff", "background-color": "#000"});
    }
    for (var i = 1; i <= endMax + 1; i++) {
		dynArr[i].css(0, {"color":"#fff", "background-color": "#000"});
    }*/
    
    for (var j = 2; j <= endMax + 1; j++) {	
		for(var i = 2; i <= startMax + 1; i++) {
			if (start.charAt(i-2) === end.charAt(j-2)) {
				dynArr[j].value(i, dynArr[j-1].value(i-1));
			} else {
				var del = parseInt(dynArr[j-1].value(i), 10) + 1;
				var ins = parseInt(dynArr[j].value(i-1), 10) + 1;
				var sub = parseInt(dynArr[j-1].value(i-1), 10) + 1;
			
				var min = Math.min(Math.min(sub, ins), del);
				dynArr[j].value(i, min);		
			}
			if (initCol === 2) {
				pCol = 2;
				initCol = -1;
			} else { pCol = i; }
			pRow = j;
		} //end inner for	    
	} //end outer for
	
	//hide the array from the av, so as not to show the answer to the student
	for (var i = 0; i < endMax + 2; i++) {
		dynArr[i].hide();
	}
	
	// av.displayInit();	
	// av.recorded();
    // av.show();
    
    return dynArr;
} //end eDist func

/*
recDist
Creates & animates the recursive call tree for edit distance algo.
*/

var recDistAnim = function(tr,node, start, end) {
    //console.log("foo "+ typeof node.value());
    var tmp = node.value().split(",");
    var i = parseInt(tmp[0]) - 1;
    var j = parseInt(tmp[1]) - 1;
    //console.log("foobar "+ i + " " + j);
    
    //base cases
    if (i === 0) {
		return j;
    }
    if (j === 0) {
		return i;
    }
    //recursive call, start with match check
    if (start.charAt(i) === end.charAt(j)) {
		node.addChild( "" + i + "," + j);
		tr.layout();
		av.step();
		return recDist(tr,node.child(0), start, end);
    } else { //recursively check top-left, top, and left "cells"
		node.addChild( "" + i + "," + j);
		node.addChild( "" + (i+1) + "," + j);
		node.addChild( "" + i + "," + (j+1));
		tr.layout();
		av.step();
		var sub = recDist(tr,node.child(0), start, end) + 1; //substitution
		var ins = recDist(tr,node.child(1), start, end) + 1; //insert
		var del = recDist(tr,node.child(2), start, end) + 1; //delete
	
		return Math.min(Math.min(sub, ins), del);
    }	
} //end recDistAnim func

/*
recDist
Creates the recursive call tree for edit distance algorithm.
*/

var recDist = function(tr,node, start, end) {
    var tmp = node.value().split(",");
    var i = parseInt(tmp[0]) - 1;
    var j = parseInt(tmp[1]) - 1;
    
    //base cases
    if (i === 0) {
		return j;
    }
    if (j === 0) {
		return i;
    }
    //recursive call, start with match check
    if (start.charAt(i) === end.charAt(j)) {
		node.addChild( "" + i + "," + j);
		tr.layout();
		return recDist(tr,node.child(0), start, end);
    } else { //recursively check top-left, top, and left "cells"
		node.addChild( "" + i + "," + j);
		node.addChild( "" + (i+1) + "," + j);
		node.addChild( "" + i + "," + (j+1));
		tr.layout();
		
		var sub = recDist(tr,node.child(0), start, end) + 1; //substitution
		var ins = recDist(tr,node.child(1), start, end) + 1; //insert
		var del = recDist(tr,node.child(2), start, end) + 1; //delete
	
		return Math.min(Math.min(sub, ins), del);
    }	
} //end recDist func
